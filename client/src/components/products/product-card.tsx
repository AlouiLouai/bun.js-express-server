import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
}

export function ProductCard({ name, description, image }: ProductCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="aspect-square overflow-hidden rounded-md">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex space-x-2 bg-black bg-opacity-70 p-2 rounded-md">
          <Button variant="secondary" size="sm">
            Preview
          </Button>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
