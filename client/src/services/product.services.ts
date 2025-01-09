import HttpClient from '@/lib/http';
import { Product, ProductDisplayStudent } from '@/types/product';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export default class ProductService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_BASE_URL);
  }

  public async saveProduct(productData: Partial<Product>): Promise<Product> {
    return this.httpClient.post<Product>(`/product/save`, productData);
  }

  public async getAllProductsForStudent(
    page: number
  ): Promise<{ products: ProductDisplayStudent[] }> {
    return this.httpClient.get<{ products: ProductDisplayStudent[] }>(
      `/product/getAll?page=${page}`
    );
  }
}
