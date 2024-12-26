import { AllProducts } from '@/components/products/all-product';
import { StudentSideBar } from './side-bar';

export default function Student() {
  return (
    <StudentSideBar>
      <AllProducts />
    </StudentSideBar>
  );
}
