'use client';

import { useState, type FormEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';

export default function Uploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  function reset() {
    setIsUploading(false);
    setFile(null);
    setName('');
    setEmail('');
    setDescription('');
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  }

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

  function handleFileChange(file: File) {
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
  }

  return (
    <main className={cn('flex flex-col gap-6')}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Enter file description"
            />
          </div>
        </div>
        <div>
          <div className="space-y-1 mb-4">
            <h2 className="text-xl font-semibold">Upload a file</h2>
          </div>
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
                className={`${
                  dragActive ? 'scale-110' : 'scale-100'
                } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
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
            {preview && (
              <div className="preview-container">
                <p className="text-center text-sm">{file?.name}</p>
              </div>
            )}
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              id="file-upload"
              name="file"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(event) => {
                const file = event.currentTarget?.files?.[0];
                if (file) {
                  handleFileChange(file);
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          {isUploading && <ProgressBar value={progress} />}

          <button
            type="submit"
            disabled={isUploading || !file}
            className="border-black bg-black text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          >
            <p className="text-sm">Upload</p>
          </button>

          <button
            type="reset"
            onClick={reset}
            disabled={isUploading || !file}
            className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}

