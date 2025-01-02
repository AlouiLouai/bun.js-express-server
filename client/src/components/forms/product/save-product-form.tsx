'use client';

import { Category, Level } from '@/types/product';
import { FormEvent } from 'react';

interface FormSaveProductFieldsProps {
  product: {
    link: string;
    description: string;
    price: number;
    title: string;
    category?: Category;
    niveau?: Level;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateField: (field: string, value: any) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function FormSaveProductFields({
  product,
  updateField,
  handleSubmit,
}: FormSaveProductFieldsProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <h2 className="text-xl font-semibold">Step 2: Complete Metadata</h2>
      {/* Title and Price in the same row */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={product.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter product title"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => updateField('price', Number(e.target.value))}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter product price"
          />
        </div>
      </div>

      {/* Description in a separate row */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={product.description}
          onChange={(e) => updateField('description', e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Enter product description"
        />
      </div>

      {/* Category and Class in the same row */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={product.category || ''}
            onChange={(e) => updateField('category', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Select category</option>
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="className"
            className="block text-sm font-medium text-gray-700"
          >
            Class Year
          </label>
          <select
            id="className"
            value={product.niveau || ''}
            onChange={(e) => updateField('niveau', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="">Select class year</option>
            {Object.values(Level).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Link in a separate row */}
      <div>
        <label
          htmlFor="link"
          className="block text-sm font-medium text-gray-700"
        >
          Link
        </label>
        <input
          type="url"
          id="link"
          value={product.link}
          onChange={(e) => updateField('link', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Enter product link"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Save Product
      </button>
    </form>
  );
}

export default FormSaveProductFields;
