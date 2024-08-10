import { AllProductsRs } from "@/types/apis/productApiRs";
import { fetchApi } from "@/services/fetchApi";
import { postEndPoints } from "@/services/apis";
import { Product } from "@/redux/slices/productSlice";

export const allProductsApi = async (limit = "50", skip = "0"): Promise<AllProductsRs | null> => {
  const resData: AllProductsRs = await fetchApi("GET", postEndPoints.ALL_PRODUCTS, null, null, {
    limit: limit,
    skip: skip,
  });
  return resData;
};

export const addProductApi = async (data: Product): Promise<Product | null> => {
  const resData: Product = await fetchApi("POST", postEndPoints.ADD_PRODUCT, data, {
    "Content-Type": "application/json",
  });
  return resData;
};

export const updateProductApi = async (data: Product): Promise<Product | null> => {
  // below code is using any for dummy json api's
  const id = data.id;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data as any).id = undefined;
  const resData: Product = await fetchApi("PATCH", postEndPoints.ALL_PRODUCTS + `/${id}`, data, {
    "Content-Type": "application/json",
  });
  return resData;
};

export const deleteProductApi = async (
  id: number
): Promise<(Product & { isDeleted: boolean; deletedOn: string }) | null> => {
  const resData: Product & { isDeleted: boolean; deletedOn: string } = await fetchApi(
    "DELETE",
    postEndPoints.ALL_PRODUCTS + `/${id}`
  );
  return resData;
};
