'use client';

import { useState, FormEvent } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';
import ProgressBar from './ProgressBar';
import FormSaveProductFields from './forms/save-product-form';

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

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState({
    blobUrl: '',
    title: '',
    description: '',
    price: '',
    category: Category.MATH,
    className: SchoolYear.FIRST,
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset Function
  function reset() {
    setIsUploading(false);
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  }

  // Handle File Upload
  async function handleFileUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsUploading(true);

    if (file) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload-doc',
          onUploadProgress: (progressEvent) =>
            setProgress(progressEvent.percentage),
        });

        setProduct((prev) => ({ ...prev, blobUrl: blob.url }));
        toast({
          title: 'Success!',
          description: 'File uploaded successfully!',
        });
        setStep(2); // Move to next step
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Upload failed',
          description: 'Please try again.',
        });
      } finally {
        reset();
      }
    }
  }

  // Handle Form Submission
  function handleProductSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Simulate saving the product
    console.log('Product saved:', product);
    toast({
      title: 'Product Created!',
      description: 'Your product has been saved successfully.',
    });
  }

  return (
    <div className="space-y-6">
      {step === 1 && (
        <form onSubmit={handleFileUpload}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Step 1: Upload a File</h2>
            <label
              htmlFor="file-upload"
              className="group flex flex-col items-center justify-center border-dashed border-2 rounded-md py-6 cursor-pointer"
            >
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
              <p className="text-gray-600">Click or drag a file to upload.</p>
              {preview && (
                <p className="text-sm text-gray-500 mt-2">{file?.name}</p>
              )}
            </label>
            {isUploading && <ProgressBar value={progress} />}
          </div>
          <button
            type="submit"
            disabled={isUploading || !file}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Upload and Continue
          </button>
        </form>
      )}

      {step === 2 && (
        <FormSaveProductFields
          link={product.blobUrl}
          logo="aaaa"
          description={product.description}
          price={Number(product.price)}
          title={product.title}
          setLink={(url: string) =>
            setProduct((prev) => ({ ...prev, blobUrl: url }))
          }
          setLogo={(logo) => console.log('Logo setter logic', logo)}
          setDescription={(description: string) =>
            setProduct((prev) => ({ ...prev, description }))
          }
          setPrice={(price) =>
            setProduct({ ...product, price: price.toString() })
          }
          setTitle={(title: string) =>
            setProduct((prev) => ({ ...prev, title }))
          }
          setCategory={(category) =>
            setProduct({ ...product, category: category as Category })
          }
          setClassName={(className) =>
            setProduct({ ...product, className: className as SchoolYear })
          }
          handleSubmit={handleProductSubmit}
        />
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Back
          </button>
        )}
        {step < 2 && (
          <button
            onClick={() => setStep((prev) => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
