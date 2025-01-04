'use client';
import MultiStepFormCreateDocument from '@/components/forms/product/document-multistep-form';
import React from 'react';

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center text-xl text-gray-500 p-8">
        <MultiStepFormCreateDocument />
      </div>
    </div>
  );
}
