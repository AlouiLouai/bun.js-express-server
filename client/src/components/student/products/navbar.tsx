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
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineReload,
} from 'react-icons/ai';

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

  const [search, setSearch] = useState(filters.search);

  const handleDebouncedSearch = (value: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      onFilterChange({ search: value });
    }, 300);
    setDebounceTimeout(timeout);
  };

  const handleRemoveFilter = (filterType: keyof FilterState) => {
    onFilterChange({ [filterType]: '' });
  };

  const handleResetSearch = () => {
    setSearch('');
    onFilterChange({ search: '' });
  };

  const handleResetAllFilters = () => {
    setSearch('');
    onFilterChange({
      category: '',
      level: '',
      minPrice: undefined,
      maxPrice: undefined,
      search: '',
    });
  };

  return (
    <nav className="mb-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          {filters.category ? (
            <div className="flex items-center gap-2 bg-slate-950 text-white py-1 px-3 rounded-full">
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
            <div className="flex items-center gap-2 bg-slate-950 text-white py-1 px-3 rounded-full">
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
        <div className="relative w-[200px]">
          <Input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search} // Controlled value
            onChange={(e) => {
              setSearch(e.target.value); // Update local state on change
              handleDebouncedSearch(e.target.value); // Handle debounce
            }}
          />
          <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {search && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={handleResetSearch} // Clear input and reset filter state
            >
              <AiOutlineClose />
            </button>
          )}
        </div>

        {/* Reset All Filters Button */}
        <button
          className="flex items-center gap-2 bg-slate-950 text-white py-1 px-3 rounded-full hover:bg-red-600 transition-all"
          onClick={handleResetAllFilters}
        >
          <AiOutlineReload /> Reset All Filters
        </button>
      </div>
    </nav>
  );
}
