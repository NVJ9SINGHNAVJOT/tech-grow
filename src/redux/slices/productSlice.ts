import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  thumbnail: string;
  images: string[];
};

// only "asc" | "desc" to be used for sortOrderMaintainer key values
const sortOrderMaintainer = {
  ids: "asc",
  prices: "asc",
  stocks: "asc",
  ratings: "asc",
};

interface ProductState {
  products: Product[];
}

const initialState = {
  products: [],
} satisfies ProductState as ProductState;

const loadingSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((prev) => prev.id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        }
        return product;
      });
    },
    sortProductsById(state) {
      if (sortOrderMaintainer.ids === "asc") {
        state.products = state.products.sort((a, b) => a.id - b.id);
      } else {
        state.products = state.products.sort((a, b) => b.id - a.id);
      }
      sortOrderMaintainer.ids = sortOrderMaintainer.ids === "asc" ? "desc" : "asc";
    },
    sortProductsByPrices(state) {
      if (sortOrderMaintainer.prices === "asc") {
        state.products = state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products = state.products.sort((a, b) => b.price - a.price);
      }
      sortOrderMaintainer.prices = sortOrderMaintainer.prices === "asc" ? "desc" : "asc";
    },
    sortProductsByStocks(state) {
      if (sortOrderMaintainer.stocks === "asc") {
        state.products = state.products.sort((a, b) => a.stock - b.stock);
      } else {
        state.products = state.products.sort((a, b) => b.stock - a.stock);
      }
      sortOrderMaintainer.stocks = sortOrderMaintainer.stocks === "asc" ? "desc" : "asc";
    },
    sortProductsByRatings(state) {
      if (sortOrderMaintainer.ratings === "asc") {
        state.products = state.products.sort((a, b) => a.rating - b.rating);
      } else {
        state.products = state.products.sort((a, b) => b.rating - a.rating);
      }
      sortOrderMaintainer.ratings = sortOrderMaintainer.ratings === "asc" ? "desc" : "asc";
    },
  },
});

export const {
  setProducts,
  removeProduct,
  updateProduct,
  sortProductsById,
  sortProductsByPrices,
  sortProductsByStocks,
  sortProductsByRatings,
} = loadingSlice.actions;
export default loadingSlice.reducer;
