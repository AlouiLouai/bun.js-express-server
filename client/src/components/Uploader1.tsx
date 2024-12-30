'use client';
import { useState, FormEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';
import { FormSaveProductFields } from './forms/save-product-form';
import FileUploader from './uploads/FileUploader';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';
import { saveProductAction } from '@/lib/features/products/productActions';

enum Category {
  MATH = 'MATH',
  SCIENCE = 'SCIENCE',
}

enum SchoolYear {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
}

export default function Uploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [link, setLink] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [className, setClassName] = useState<SchoolYear | undefined>(undefined);

  function reset() {
    setIsUploading(false);
    setFile(null);
    setLink('');
    setLogo('');
    setDescription('');
    setPrice(0);
    setTitle('');
    setCategory(undefined);
    setClassName(undefined);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview('');
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    // Step 1: Upload file first
    if (file) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload-doc', // Adjust according to your backend API
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.percentage);
          },
        });

        toast({
          variant: 'default',
          title: 'File uploaded!',
          description: `Your file has been uploaded to ${blob.url}!`,
        });

        // Step 2: Save product after successful file upload
        saveProductAction({
          link: blob.url,
          logo,
          description,
          price,
          title,
          category,
          class: className, // Ensure you are using the correct field name here
        });

        reset();
      } catch (error) {
        if (error instanceof Error) {
          toast({
            variant: 'destructive',
            title: 'File upload failed',
            description: `Try re-uploading the file!`,
          });
        } else {
          throw error;
        }
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: `Please upload a file before submitting!`,
      });
    }
  }

  return (
    <main className={cn('flex flex-col gap-6')}>
      <form onSubmit={handleSubmit}>
        <FileUploader
          preview={preview}
          setFile={setFile}
          setPreview={setPreview}
        />
        <FormSaveProductFields
          link={link}
          logo={logo}
          description={description}
          price={price}
          title={title}
          category={category}
          className={className}
          setLink={setLink}
          setLogo={setLogo}
          setDescription={setDescription}
          setPrice={setPrice}
          setTitle={setTitle}
          setCategory={setCategory}
          setClassName={setClassName}
        />
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
