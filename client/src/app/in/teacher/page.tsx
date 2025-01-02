'use client';
import MultiStepFormCreateDocument from '@/components/forms/product/document-multistep-form';
import React from 'react';

export default function Page() {
  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
      <div className="flex gap-2 flex-1 overflow-y-auto">
        <MultiStepFormCreateDocument />
      </div>
    </div>
  );
}
