'use client';
import { FormEvent, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';

interface FileUploaderProps {
  preview: string | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

export function FileUploader({
  setFile,
  preview,
  setPreview,
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  function reset() {
    setIsUploading(false);
    setFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  }

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    if (file) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload-doc',
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage);
          },
        });

        toast({
          variant: 'default',
          title: 'File uploaded!',
          description: `Your file has been uploaded to ${blob.url}!`,
        });
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'File upload failed',
            description: `Try re-upload the file !`,
          });
        } else {
          throw error;
        }
      }

      reset();
    }
  }

  return (
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
      <form onSubmit={handleSubmit}>
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
      </form>
      {preview && (
        <div className="preview-container">
          <p className="text-center text-sm">{preview}</p>
        </div>
      )}
    </label>
    
  );
}

export default FileUploader;
