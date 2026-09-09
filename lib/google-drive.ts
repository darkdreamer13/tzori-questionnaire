import { google } from "googleapis";
import { Readable } from "node:stream";

const ROOT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

let cachedImagesFolderId: string | null = null;

function getAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Η σύνδεση με το Google Drive δεν είναι ρυθμισμένη.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"]
  });
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
    spaces: "drive"
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
    fields: "id"
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

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [parentId]
    },
    media: {
      mimeType,
      body: Readable.from(buffer)
    },
    fields: "id, webViewLink"
  });

  if (!response.data.id) {
    throw new Error("Το ανέβασμα στο Google Drive απέτυχε.");
  }

  return {
    fileId: response.data.id,
    webViewLink: response.data.webViewLink ?? null
  };
}
