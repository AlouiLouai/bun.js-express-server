'use client';

import { Category, SchoolYear } from '@/types/product';
import { FormEvent } from 'react';

interface FormSaveProductFieldsProps {
  product: {
    link: string;
    logo: string;
    description: string;
    price: number;
    title: string;
    userId?: number;
    category?: Category;
    className?: SchoolYear;
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
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Save Product</h2>

      {/* Product Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Product Details</h3>

        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={product.title}
            onChange={(e) => updateField('title', e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product title"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            value={product.description}
            onChange={(e) => updateField('description', e.target.value)}
            required
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product description"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-gray-600">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={product.price}
            onChange={(e) => updateField('price', Number(e.target.value))}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product price"
          />
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Additional Information
        </h3>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <select
            id="category"
            value={product.category || ''}
            onChange={(e) =>
              updateField('category', e.target.value as Category)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {Object.values(Category).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="className"
            className="text-sm font-medium text-gray-600"
          >
            Class Year
          </label>
          <select
            id="className"
            value={product.className || ''}
            onChange={(e) =>
              updateField('className', e.target.value as SchoolYear)
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select class year</option>
            {Object.values(SchoolYear).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Links and Logo Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Links and Logo</h3>

        <div className="flex flex-col gap-1">
          <label htmlFor="link" className="text-sm font-medium text-gray-600">
            Link
          </label>
          <input
            type="url"
            id="link"
            value={product.link}
            onChange={(e) => updateField('link', e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product link"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="logo" className="text-sm font-medium text-gray-600">
            Logo
          </label>
          <input
            type="text"
            id="logo"
            value={product.logo}
            onChange={(e) => updateField('logo', e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Enter product logo URL"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Product
      </button>
    </form>
  );
}

export default FormSaveProductFields;
