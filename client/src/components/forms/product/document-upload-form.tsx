'use client';
import { toast } from '@/hooks/use-toast';
import { FormEvent, useState } from 'react';
import ProgressBar from '../../ProgressBar';

interface FormDocumentUploadFieldProps {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    preview: string | null;
    setPreview: React.Dispatch<React.SetStateAction<string | null>>;
    handleFileUpload: (e: FormEvent<HTMLFormElement>) => void;
    isUploading: boolean;
    progress: number;
}

export function DocumentUploadForm({
    file,
    setFile,
    preview,
    setPreview,
    handleFileUpload,
    isUploading,
    progress,
}: FormDocumentUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file: File) => {
    // Check for supported file types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: 'destructive',
        title: 'Failed!',
        description: `We only accept PDF, DOC, or DOCX files!`,
      });
      return;
    }

    if (file.size / 1024 / 1024 > 50) {
      toast({
        variant: 'destructive',
        title: 'Failed!',
        description: `File size too big (max 50MB)`,
      });
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleFileUpload}>
      <h2 className="text-xl font-semibold">Step 1: Upload a File</h2>
      <label
        htmlFor="file-upload"
        className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer?.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
        />
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
        <div
          className={`${
            dragActive ? 'border-2 border-black' : ''
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            preview
              ? 'bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md'
              : 'bg-white opacity-100 hover:bg-gray-50'
          }`}
        >
          <svg
            className={`${dragActive ? 'scale-110' : 'scale-100'} h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Upload icon</title>
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
            <path d="M12 12v9" />
            <path d="m16 16-4-4-4 4" />
          </svg>
          <p className="mt-2 text-center text-sm text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Max file size: 50MB
          </p>
          <span className="sr-only">File upload</span>
        </div>
        <p className="text-gray-600">Click or drag a file to upload.</p>
        {preview && <p className="text-sm text-gray-500 mt-2">{file?.name}</p>}
      </label>
      <button
        type="submit"
        className="px-4 py-2 bg-gray-600 text-white rounded-md"
      >
        Upload and continue
      </button>
      {isUploading && <ProgressBar value={progress} />}
    </form>
  );
}
