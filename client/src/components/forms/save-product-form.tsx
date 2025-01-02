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
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
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

      <div>
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

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          value={product.category || ''}
          onChange={(e) => updateField('category', e.target.value as Category)}
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

      <div>
        <label
          htmlFor="className"
          className="block text-sm font-medium text-gray-700"
        >
          Class Year
        </label>
        <select
          id="className"
          value={product.className || ''}
          onChange={(e) =>
            updateField('className', e.target.value as SchoolYear)
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select class year</option>
          {Object.values(SchoolYear).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

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

      <div>
        <label
          htmlFor="logo"
          className="block text-sm font-medium text-gray-700"
        >
          Logo
        </label>
        <input
          type="text"
          id="logo"
          value={product.logo}
          onChange={(e) => updateField('logo', e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Enter product logo URL"
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
