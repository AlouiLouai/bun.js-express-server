'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/IProduct'

type ProductModalProps = {
  product: Partial<Product>
  isOpen: boolean
  onClose: () => void
}

export default function ProductCardModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    // Here you would typically call an API to update the like status
  }

  const handleAddToCart = () => {
    // Here you would typically call an API to add the item to the cart
    console.log('Added to cart:', product.title)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={product.link || '/avatar.png'}
              alt={product.title || 'Product image'}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {product.niveau}
            </Badge>
          </div>
          <DialogDescription className="text-base">
            {product.description}
          </DialogDescription>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product?.price?.toFixed(2)}
            </span>
            <div className="flex space-x-2">
              <Button
                size="icon"
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                <Heart className={isLiked ? "fill-current" : ""} />
              </Button>
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

