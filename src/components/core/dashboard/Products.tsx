import { useAppSelector } from "@/redux/store";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import ProductCard from "@/components/core/dashboard/ProductCard";
import {
  Product,
  removeProduct,
  sortProductsById,
  sortProductsByPrices,
  sortProductsByRatings,
  sortProductsByStocks,
} from "@/redux/slices/productSlice";
import { deleteProductApi } from "@/services/operations/productApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Products = () => {
  const [toggleProduct, setToggleProduct] = useState<boolean>(false);
  const [updateProduct, setUpdateProduct] = useState<Product>();
  const products = useAppSelector((state) => state.product.products);
  const [productDeleting, setProductDeleting] = useState<number[]>([]);
  const dispatch = useDispatch();

  const deleteProduct = async (id: number) => {
    const tid = toast.loading("Deleting product");
    setProductDeleting((prev) => {
      return [...prev, id];
    });

    const response = await deleteProductApi(id);
    toast.dismiss(tid);

    if (!response || !response.isDeleted) {
      toast.error("Error while deleting product");
      setProductDeleting((prev) => prev.filter((prevId) => prevId !== id));
      return;
    }

    dispatch(removeProduct(id));
    toast.success("Product deleted");
  };

  return (
    <div className="w-full overflow-y-auto bg-gray-50 px-3 text-white">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full px-8 text-left text-sm text-gray-500 rtl:text-right">
          <thead className="font-roboto-condensed text-[0.8rem] font-semibold uppercase text-gray-700">
            <tr>
              <th
                onClick={() => dispatch(sortProductsById())}
                scope="col"
                className="group relative cursor-pointer py-3 pl-2"
              >
                Id
                <span
                  className="absolute -bottom-5 -left-1 z-10 hidden rounded-lg bg-black px-2 py-1 
                font-sans text-[0.6rem] text-white group-hover:block"
                >
                  sort
                </span>
              </th>
              <th scope="col" className="min-w-16 py-3 pl-2">
                Image
              </th>
              <th scope="col" className="py-3 pl-2">
                Title
              </th>
              <th scope="col" className="hidden w-[20rem] py-3 pl-2 lg:block">
                description
              </th>
              <th scope="col" className="py-3 pl-2">
                Category
              </th>
              <th
                onClick={() => dispatch(sortProductsByPrices())}
                scope="col"
                className="group relative cursor-pointer py-3 pl-2"
              >
                Price
                <span
                  className="absolute -bottom-5 left-[0.1rem] z-10 hidden rounded-lg bg-black px-3 
                py-1 font-sans text-[0.6rem] text-white group-hover:block"
                >
                  sort
                </span>
              </th>
              <th
                onClick={() => dispatch(sortProductsByStocks())}
                scope="col"
                className="group relative cursor-pointer py-3 pl-2"
              >
                Stock
                <span
                  className="absolute -bottom-5 left-[0.1rem] z-10 hidden rounded-lg bg-black px-3
                 py-1 font-sans text-[0.6rem] text-white group-hover:block"
                >
                  sort
                </span>
              </th>
              <th scope="col" className="py-3 pl-2">
                Brand
              </th>
              <th
                onClick={() => dispatch(sortProductsByRatings())}
                scope="col"
                className="group relative cursor-pointer py-3 pl-2"
              >
                Ratings
                <span
                  className="absolute -bottom-5 left-[0.4rem] z-10 hidden rounded-lg bg-black px-3
                 py-1 font-sans text-[0.6rem] text-white group-hover:block"
                >
                  sort
                </span>
              </th>
              <th scope="col" className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index} className="border-b bg-white text-xs hover:bg-gray-50">
                  <td className="py-4 pl-2 font-semibold text-gray-900 dark:text-white">{product.id}</td>
                  <td className="py-4 pl-2">
                    <img
                      src={product.images[0]}
                      className="aspect-auto max-h-full w-16 min-w-16 max-w-full md:w-32"
                      alt="Loading.."
                    />
                  </td>
                  <td className="py-4 pl-2 text-xs font-semibold text-gray-900">{product.title}</td>
                  <td className="hidden py-4 pl-2 text-xs lg:block">{product.description}</td>
                  <td className="py-4 pl-2 font-semibold text-gray-900">{product.category}</td>
                  <td className="py-4 pl-2">{product.price}</td>
                  <td className={`py-4 pl-2 ${product.stock < 10 && "text-red-500"}`}>{product.stock}</td>
                  <td className="py-4 pl-2">{product.brand ? product.brand : "Unknown"}</td>
                  <td className="py-4 pl-2">{product.rating}</td>
                  <td className="px-5">
                    <button
                      type="button"
                      onClick={() => {
                        setUpdateProduct(product);
                        setToggleProduct(true);
                      }}
                      className="group relative mb-7"
                    >
                      <RxUpdate
                        className="aspect-square size-5 scale-[1.25] cursor-pointer hover:fill-lime-400 
                      hover:opacity-100"
                      />
                      {/* tooltip for update */}
                      <div
                        className="opacity-0 transition-all duration-300 ease-in group-hover:block 
                      group-hover:opacity-100"
                      >
                        <div
                          className="pointer-events-none absolute top-[55%] flex -translate-x-[8rem] 
                        -translate-y-1/2 items-center rounded-sm text-center text-sm text-slate-300 transition-all 
                        duration-500 ease-in-out before:-top-2 group-hover:-translate-x-[5.7rem]"
                        >
                          <div>
                            <div
                              className="cursor-pointer items-center rounded-md bg-lime-950 fill-lime-400 
                            duration-100 active:border"
                            >
                              <p
                                className="text-nowrap px-2 py-[0.20rem] text-[0.8rem] font-bold leading-4 
                              text-lime-400"
                              >
                                Update
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      disabled={productDeleting.includes(product.id)}
                      onClick={() => deleteProduct(product.id)}
                      className="group relative"
                    >
                      <MdDeleteForever className="aspect-square size-5 scale-[1.25] cursor-pointer fill-red-400" />
                      {/* tooltip for delete */}
                      <div
                        className="opacity-0 transition-all duration-300 ease-in group-hover:block 
                      group-hover:opacity-100"
                      >
                        <div
                          className="pointer-events-none absolute top-[55%] flex -translate-x-[8rem] 
                        -translate-y-1/2 items-center rounded-sm text-center text-sm text-slate-300 
                        transition-all duration-500 ease-in-out before:-top-2 group-hover:-translate-x-[5rem]"
                        >
                          <div>
                            <div
                              className="cursor-pointer items-center rounded-md bg-red-950 fill-red-400 
                            duration-100 active:border"
                            >
                              <p className="text-nowrap px-2 py-[0.20rem] text-[0.8rem] font-bold leading-4 text-red-400">
                                Delete
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {toggleProduct === true && <ProductCard setProductCard={setToggleProduct} product={updateProduct} />}
    </div>
  );
};

export default Products;
