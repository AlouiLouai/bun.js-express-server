'use client';

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
  className?: SchoolYear; // ClassName is now an enum of SchoolYear
  setLink: React.Dispatch<React.SetStateAction<string>>;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  setCategory?: React.Dispatch<React.SetStateAction<Category | undefined>>;
  setClassName?: React.Dispatch<React.SetStateAction<SchoolYear | undefined>>;
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
}: FormSaveProductFieldsProps) {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
          placeholder="Enter product description"
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category || ''}
          onChange={(e) => setCategory && setCategory(e.target.value as Category)}
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
        <label htmlFor="className" className="block text-sm font-medium text-gray-700">
          Class Year
        </label>
        <select
          id="className"
          value={className || ''}
          onChange={(e) => setClassName && setClassName(e.target.value as SchoolYear)}
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
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
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
        <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
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
    </div>
  );
}

export default FormSaveProductFields;
