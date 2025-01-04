'use client';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category, Level } from '@/types/product';
import { useState } from 'react';

type FilterState = {
  category: string;
  level: string;
  minPrice?: number;
  maxPrice?: number;
  search: string;
};

type NavbarProps = {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
};

export default function Navbar({ filters, onFilterChange }: NavbarProps) {
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleDebouncedSearch = (value: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      onFilterChange({ search: value });
    }, 300); // Adjust debounce time as needed
    setDebounceTimeout(timeout);
  };

  const handleRemoveFilter = (filterType: keyof FilterState) => {
    onFilterChange({ [filterType]: '' });
  };

  const handleResetSearch = () => {
    onFilterChange({ search: '' });
  };

  return (
    <nav className="mb-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          {filters.category ? (
            <div className="flex items-center gap-2 bg-blue-700 text-white py-1 px-3 rounded-full">
              <span>{filters.category}</span>
              <button
                className="text-white"
                onClick={() => handleRemoveFilter('category')}
              >
                &#x2715;
              </button>
            </div>
          ) : (
            <Select
              value={filters.category}
              onValueChange={(value) => onFilterChange({ category: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Category.MATH}>Math</SelectItem>
                <SelectItem value={Category.SCIENCE}>Science</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Level Filter */}
        <div className="flex items-center gap-2">
          {filters.level ? (
            <div className="flex items-center gap-2 bg-blue-700 text-white py-1 px-3 rounded-full">
              <span>{filters.level}</span>
              <button
                className="text-white"
                onClick={() => handleRemoveFilter('level')}
              >
                &#x2715;
              </button>
            </div>
          ) : (
            <Select
              value={filters.level}
              onValueChange={(value) => onFilterChange({ level: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Level.FIRST}>First</SelectItem>
                <SelectItem value={Level.SECOND}>Second</SelectItem>
                <SelectItem value={Level.THIRD}>Third</SelectItem>
                <SelectItem value={Level.FOURTH}>Fourth</SelectItem>
                <SelectItem value={Level.FIFTH}>Fifth</SelectItem>
                <SelectItem value={Level.SIXTH}>Sixth</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Price Filter */}
        <Input
          type="number"
          placeholder="Min Price"
          className="w-[120px]"
          value={filters.minPrice || ''}
          onChange={(e) =>
            onFilterChange({
              minPrice: parseFloat(e.target.value) || undefined,
            })
          }
        />
        <Input
          type="number"
          placeholder="Max Price"
          className="w-[120px]"
          value={filters.maxPrice || ''}
          onChange={(e) =>
            onFilterChange({
              maxPrice: parseFloat(e.target.value) || undefined,
            })
          }
        />

        {/* Search Filter */}
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-[200px]"
            defaultValue={filters.search}
            onChange={(e) => handleDebouncedSearch(e.target.value)}
          />
          {filters.search && (
            <button className="text-red-500" onClick={handleResetSearch}>
              &#x2715;
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
