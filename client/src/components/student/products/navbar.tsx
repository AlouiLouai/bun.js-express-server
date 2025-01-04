"use client";
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Category, Level } from '@/types/product';

type NavbarProps = {
  onFilter: (filters: {
    category?: string;
    level?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) => void;
}

export default function Navbar({ onFilter }: NavbarProps) {
  const [category, setCategory] = useState<string>()
  const [level, setLevel] = useState<string>()
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()
  const [search, setSearch] = useState<string>('')

  const handleFilter = () => {
    onFilter({ category, level, minPrice, maxPrice, search })
  }

  return (
    <nav className="mb-8 p-4 bg-gray-100 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center">
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Category.MATH}>math</SelectItem>
            <SelectItem value={Category.SCIENCE}>science</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setLevel(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={Level.FIFTH}>first</SelectItem>
            <SelectItem value={Level.SECOND}>second</SelectItem>
            <SelectItem value={Level.THIRD}>third</SelectItem>
            <SelectItem value={Level.FOURTH}>fourth</SelectItem>
            <SelectItem value={Level.FIFTH}>fifth</SelectItem>
            <SelectItem value={Level.SIXTH}>sixith</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Min Price"
          className="w-[120px]"
          onChange={(e) => setMinPrice(parseFloat(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Max Price"
          className="w-[120px]"
          onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
        />
        <Input
          type="text"
          placeholder="Search"
          className="w-[200px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleFilter}>Apply Filters</Button>
      </div>
    </nav>
  )
}

