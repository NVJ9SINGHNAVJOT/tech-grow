import { Product } from "@/redux/slices/productSlice";

export type AllProductsRs = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};
