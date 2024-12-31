'use client';

import { FormEvent } from 'react';

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

interface FormSaveProductFieldsProps {
  link: string;
  logo: string;
  description: string;
  price: number;
  title: string;
  userId?: number;
  category?: Category;
  className?: SchoolYear;
  setLink: (url: string) => void;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
  setDescription: (url: string) => void;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setTitle: (url: string) => void;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  setCategory?: (url: Category) => void;
  setClassName?: (url: SchoolYear) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void; // Add the handleSubmit prop
}

export function FormSaveProductFields({
  link,
  logo,
  description,
  price,
  title,
  category,
  className,
  setLink,
  setLogo,
  setDescription,
  setPrice,
  setTitle,
  setCategory,
  setClassName,
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
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
          value={category || ''} // Set a fallback value for category
          onChange={(e) =>
            setCategory && setCategory(e.target.value as Category)
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
        >
          <option value="">Select category</option>
          {Object.values(Category).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {category && (
          <p className="mt-2 text-sm text-gray-600">Selected Category: {category}</p>
        )}
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
          value={className || SchoolYear.FIRST} // Set a fallback value for className
          onChange={(e) =>
            setClassName && setClassName(e.target.value as SchoolYear)
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
        {className && (
          <p className="mt-2 text-sm text-gray-600">Selected Class Year: {className}</p>
        )}
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
          value={link}
          onChange={(e) => setLink(e.target.value)}
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
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
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
