import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Product } from '@/types/product';

type ProductModalProps = {
  product: Partial<Product>;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductCardModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.title}</DialogTitle>
          <DialogDescription>
            <span className="text-sm text-gray-600 mb-2 block">
              {product.category} | {product.niveau}
            </span>
            <span className="text-lg font-bold mb-4 block">
              ${product?.price?.toFixed(2)}
            </span>
            <span className="block">{product.description}</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
