import { google } from "googleapis";
import { Readable } from "node:stream";

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID?.trim();

let cachedImagesFolderId: string | null = null;

function normalizePrivateKey(rawKey: string): string {
  let key = rawKey.trim();

  // Strip a single layer of surrounding quotes, in case the value was pasted
  // with the quote characters from a JSON export or a .env file.
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1).trim();
  }

  // Convert escaped newlines (from single-line env values) into real newlines,
  // and normalize Windows-style line endings.
  key = key.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim();

  const isValidPem = /^-----BEGIN (RSA )?PRIVATE KEY-----\n[\s\S]+\n-----END (RSA )?PRIVATE KEY-----$/.test(key);

  if (!isValidPem) {
    throw new Error(
      "Το GOOGLE_PRIVATE_KEY δεν έχει έγκυρη μορφή PEM. Επικολλήστε ξανά την τιμή του πεδίου \"private_key\" από το JSON key file του service account, χωρίς επιπλέον εισαγωγικά."
    );
  }

  return key;
}

function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) {
    throw new Error("Η σύνδεση με το Google Drive δεν είναι ρυθμισμένη.");
  }

  const privateKey = normalizePrivateKey(rawPrivateKey);

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"]
  });
}

function describeGoogleApiError(error: unknown): string {
  if (error && typeof error === "object") {
    const withResponse = error as { response?: { data?: { error?: { message?: string; errors?: { message?: string }[] } } }; message?: string };
    const apiMessage =
      withResponse.response?.data?.error?.message ?? withResponse.response?.data?.error?.errors?.[0]?.message;
    if (apiMessage) return apiMessage;
    if (withResponse.message) return withResponse.message;
  }
  return String(error);
}

function getDriveClient() {
  return google.drive({ version: "v3", auth: getAuth() });
}

async function getImagesFolderId(): Promise<string> {
  if (cachedImagesFolderId) return cachedImagesFolderId;
  if (!ROOT_FOLDER_ID) {
    throw new Error("Ο φάκελος Google Drive δεν έχει οριστεί.");
  }

  const drive = getDriveClient();

  const existing = await drive.files.list({
    q: `'${ROOT_FOLDER_ID}' in parents and name = 'images' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: "files(id, name)",
    spaces: "drive",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true
  });

  const found = existing.data.files?.[0];
  if (found?.id) {
    cachedImagesFolderId = found.id;
    return found.id;
  }

  const created = await drive.files.create({
    requestBody: {
      name: "images",
      mimeType: "application/vnd.google-apps.folder",
      parents: [ROOT_FOLDER_ID]
    },
    fields: "id",
    supportsAllDrives: true
  });

  if (!created.data.id) {
    throw new Error("Δεν ήταν δυνατή η δημιουργία του φακέλου images στο Google Drive.");
  }

  cachedImagesFolderId = created.data.id;
  return created.data.id;
}

export async function uploadFileToDrive({
  buffer,
  fileName,
  mimeType,
  uploadTarget
}: {
  buffer: Buffer;
  fileName: string;
  mimeType: string;
  uploadTarget: "root" | "images";
}): Promise<{ fileId: string; webViewLink: string | null }> {
  if (!ROOT_FOLDER_ID) {
    throw new Error("Ο φάκελος Google Drive δεν έχει οριστεί.");
  }

  const drive = getDriveClient();
  const parentId = uploadTarget === "images" ? await getImagesFolderId() : ROOT_FOLDER_ID;

  let response;
  try {
    response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [parentId]
      },
      media: {
        mimeType,
        body: Readable.from(buffer)
      },
      fields: "id, webViewLink",
      supportsAllDrives: true
    });
  } catch (error) {
    throw new Error(`Google Drive API: ${describeGoogleApiError(error)}`);
  }

  if (!response.data.id) {
    throw new Error("Το ανέβασμα στο Google Drive απέτυχε.");
  }

  return {
    fileId: response.data.id,
    webViewLink: response.data.webViewLink ?? null
  };
}
