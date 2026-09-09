"use client";

import { useRef, useState } from "react";
import type { Question } from "@/types/questionnaire";

type UploadStatus = "idle" | "uploading" | "error";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

type FileUploadFieldProps = {
  question: Question;
  uploadedFiles: string[];
  onChange: (value: string[]) => void;
  inputId: string;
  describedBy?: string;
};

export function FileUploadField({ question, uploadedFiles, onChange, inputId, describedBy }: FileUploadFieldProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage(null);

    const files = Array.from(fileList);
    const oversized = files.find((file) => file.size > MAX_FILE_SIZE);
    if (oversized) {
      setErrorMessage(`Το αρχείο "${oversized.name}" ξεπερνά το όριο των 4 MB. Χρησιμοποιήστε τον σύνδεσμο του shared folder γι' αυτό.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setStatus("uploading");

    try {
      const uploadedNames: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("questionId", question.id);
        formData.append("uploadTarget", question.uploadTarget ?? "root");

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error ?? "Το αρχείο δεν ανέβηκε.");
        }

        const data = (await response.json()) as { fileName: string };
        uploadedNames.push(data.fileName);
      }

      onChange([...uploadedFiles, ...uploadedNames]);
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Κάτι πήγε στραβά κατά το ανέβασμα.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeFile(fileName: string) {
    onChange(uploadedFiles.filter((name) => name !== fileName));
  }

  return (
    <div aria-describedby={describedBy} className="flex flex-col gap-4">
      <label
        htmlFor={inputId}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-input bg-card px-6 py-8 text-center transition-colors hover:border-primary/50 ${
          status === "uploading" ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <span className="font-heading text-base font-bold text-foreground">
          {status === "uploading" ? "Ανέβασμα σε εξέλιξη..." : "Επιλέξτε αρχεία ή σύρετέ τα εδώ"}
        </span>
        <span className="text-sm text-muted-foreground">Έως 4 MB ανά αρχείο{question.multiple ? " · πολλά αρχεία επιτρέπονται" : ""}</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={question.accept}
          multiple={question.multiple}
          onChange={(event) => handleFiles(event.target.files)}
          className="sr-only"
        />
      </label>

      {errorMessage ? (
        <p role="alert" className="text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      ) : null}

      {uploadedFiles.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {uploadedFiles.map((fileName) => (
            <li
              key={fileName}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground"
            >
              <span className="truncate">{fileName}</span>
              <button
                type="button"
                onClick={() => removeFile(fileName)}
                className="shrink-0 text-sm font-medium text-muted-foreground underline-offset-2 hover:text-destructive hover:underline"
              >
                Αφαίρεση
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
