'use client';

import { useState, FormEvent, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { upload } from '@vercel/blob/client';
import FormSaveProductFields from './save-product-form';
import { DocumentUploadForm } from './document-upload-form';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { saveProductAction } from '@/lib/features/products/productActions';
import { setProduct } from '@/lib/features/products/productSlice';
import { BackgroundGradient } from '@/components/ui/background-gradient';

export default function MultiStepFormCreateDocument() {
  const dispatch = useAppDispatch();
  const { product, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );
  const [step, setStep] = useState(1);

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

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle File Upload
  async function handleFileUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);

    if (file) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload-doc',
          onUploadProgress: (progressEvent) =>
            setProgress(progressEvent.percentage),
        });

        dispatch(setProduct({ ['link']: blob.url }));
        toast({
          title: 'Success!',
          description: 'File uploaded successfully!',
        });
        reset();
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
  async function handleProductSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await dispatch(saveProductAction(product)).unwrap(); // Dispatch save action
      toast({
        title: 'Product Created!',
        description: 'Your product has been saved successfully.',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err.message || 'An error occurred while saving.',
      });
    }
  }

  return (
    <BackgroundGradient className="rounded-[22px] max-w-[100vw] p-4 sm:p-10 bg-white dark:bg-zinc-900">
      {step === 1 && (
        <DocumentUploadForm
          file={file}
          setFile={setFile}
          preview={preview}
          setPreview={setPreview}
          handleFileUpload={handleFileUpload}
          isUploading={isUploading}
          progress={progress}
        />
      )}

      {step === 2 && (
        <FormSaveProductFields
          product={{
            ...product,
            link: product.link,
            niveau: product.niveau,
            category: product.category,
            description: product.description,
            price: Number(product.price),
            title: product.title,
          }}
          updateField={(field, value) =>
            dispatch(setProduct({ [field]: value }))
          }
          handleSubmit={handleProductSubmit}
        />
      )}

      <div className="flex justify-center mt-6">
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
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
          >
            Next
          </button>
        )}
        {/* Display Loading or Error */}
        {loading && <p>Saving product...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>
    </BackgroundGradient>
  );
}
