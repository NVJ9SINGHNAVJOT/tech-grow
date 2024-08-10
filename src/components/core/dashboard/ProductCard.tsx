import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { Product, updateProduct } from "@/redux/slices/productSlice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { useForm } from "react-hook-form";
import { addProductApi, updateProductApi } from "@/services/operations/productApi";
import { useDispatch } from "react-redux";

const validFiles = ["image/jpeg", "image/jpg", "image/png"];

const checkFiles = (files: FileList): string[] => {
  const newUrls: string[] = [];
  for (const file of files) {
    if (file.size > 5 * 1024 * 1024) {
      return [];
    } else if (!validFiles.includes(file.type)) {
      return [];
    }
    newUrls.push(URL.createObjectURL(file));
  }
  return newUrls;
};

type ProductCardProps = {
  product?: Product;
  setProductCard: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductCard = (props: ProductCardProps) => {
  const [newImages, setNewImages] = useState<string[]>([]);
  const mediaFilesInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm<Product>({
    defaultValues: props.product ? props.product : {},
  });

  const handleMediaFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return [];
    }

    if (files.length > 5) {
      toast.info("Max 5  files are allowed");
      if (mediaFilesInputRef.current) {
        mediaFilesInputRef.current.value = "";
      }
      return;
    }

    const checkedFiles = checkFiles(files);

    if (checkedFiles.length === 0) {
      toast.info("Invlaid media files");
    } else {
      setNewImages(checkedFiles);
    }

    if (mediaFilesInputRef.current) {
      mediaFilesInputRef.current.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 5) {
      toast.info("Max 5 media files are allowed");
      return;
    }
    const droppedFiles = checkFiles(event.dataTransfer.files);

    if (droppedFiles.length === 0) {
      toast.info("Invalid media files");
      return;
    }
    setNewImages(droppedFiles);
  };

  const productHandler = async (data: Product) => {
    // new product
    if (props.product === undefined) {
      if (newImages.length === 0) {
        toast.info("Product Images requires");
        return;
      }
      props.setProductCard(false);
      const tid = toast.loading("Adding product");
      const response = await addProductApi(data);
      toast.dismiss(tid);

      if (!response) {
        toast.error("Error while adding product");
        return;
      }

      toast.success("New Product added");
      return;
    }

    // update product
    const prevData = props.product;
    // check if no new data is for product update then return
    if (
      prevData.title === data.title.trim() &&
      prevData.price === data.price &&
      prevData.description === data.description.trim() &&
      prevData.category === data.category.trim() &&
      prevData.stock === data.stock &&
      prevData.brand === data.brand &&
      prevData.discountPercentage === data.discountPercentage
    ) {
      return;
    }
    props.setProductCard(false);
    const id = data.id;
    const tid = toast.loading("Updating product");
    const response = await updateProductApi(data);
    toast.dismiss(tid);

    if (!response) {
      toast.error("Error while updating product");
      return;
    }
    data.id = id;
    dispatch(updateProduct(data));
    toast.success("Product updated");
  };

  useEffect(() => {
    if (props.product) {
      setNewImages(props.product.images);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-[1000] flex h-screen w-screen min-w-minContent max-w-maxContent 
    items-center justify-center overflow-y-auto bg-transparent backdrop-blur-[40px]"
    >
      <section className="relative flex items-center justify-center gap-x-12">
        <MdOutlineCancelPresentation
          onClick={() => props.setProductCard(false)}
          className="absolute -right-20 -top-20 h-8 w-11 cursor-pointer fill-white hover:fill-slate-300"
        />
        {/* images */}
        <div className="relative h-[28rem] w-52 md:w-72 lg:w-96">
          {newImages.length !== 0 ? (
            <div className="h-full w-full">
              <Swiper
                pagination={true}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper h-full w-full"
              >
                {newImages.map((url, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="flex h-full w-full items-center justify-center">
                        <img alt="Loading..." src={url} className="aspect-auto max-h-full w-auto max-w-full" />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          ) : (
            <div
              className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center 
              gap-y-1 self-center rounded-lg bg-neutral-950 px-4 text-white transition-all ease-linear 
              hover:bg-opacity-80"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => mediaFilesInputRef.current?.click()}
            >
              <input
                ref={mediaFilesInputRef}
                className="absolute hidden h-0 w-0"
                type="file"
                multiple
                accept=".jpg ,.jpeg, .png, .mp4, .webm, .oog"
                placeholder=""
                onChange={handleMediaFiles}
              />
              <div className="mb-4 text-2xl">Drop Images</div>
              <div className="text-xs">Images (jpeg, jpg, png)</div>
              <p className="text-wrap text-center text-xs">Max files 5 and each file can be of max size 5mb</p>
            </div>
          )}
        </div>
        {/* data */}
        <form
          onSubmit={handleSubmit(productHandler)}
          className="w-[16rem] rounded-lg bg-white p-6 md:w-[20rem] lg:w-[27rem]"
        >
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Title</label>
              <input
                {...register("title", {
                  required: true,
                  pattern: /^(?=.*\S).+$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Price</label>
              <input
                {...register("price", {
                  required: true,
                  pattern: /^[1-9]\d{0,1}\.\d{1,2}$|^[1-9]\d{0,1}$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block pb-1 text-sm font-semibold text-gray-600">Description</label>
            <input
              {...register("description", {
                required: true,
                pattern: /^(?=.*\S).+$/,
              })}
              type="text"
              className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
            />
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Category</label>
              <input
                {...register("category", {
                  required: true,
                  pattern: /^(?=.*\S).+$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>

            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Stock</label>
              <input
                {...register("stock", {
                  required: true,
                  pattern: /^[1-9]\d{0,1}\.\d{1,2}$|^[1-9]\d{0,1}$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Brand</label>
              <input
                {...register("brand", {
                  pattern: /^(?=.*\S).+$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>
            <div className="flex flex-col">
              <label className="block pb-1 text-sm font-semibold text-gray-600">Discount</label>
              <input
                {...register("discountPercentage", {
                  required: true,
                  pattern: /^[1-9]\d{0,1}\.\d{1,2}$|^[1-9]\d{0,1}$/,
                })}
                type="text"
                className="mb-5 mt-1 w-full rounded-lg border px-3 py-2 text-sm text-black outline-blue-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="group relative mx-auto mt-4 flex h-12 w-10/12 cursor-pointer items-center justify-center 
            overflow-hidden rounded-md bg-sky-800 p-2 text-sky-50 duration-500 hover:border-sky-600"
          >
            <div
              className="absolute z-10 h-48 w-48 rounded-full bg-sky-900 transition-all delay-150 duration-500 
            ease-in-out group-hover:scale-150 group-hover:delay-75"
            ></div>
            <div
              className="absolute z-10 h-40 w-40 rounded-full bg-sky-800 transition-all delay-150 duration-500 
            ease-in-out group-hover:scale-150 group-hover:delay-100"
            ></div>
            <div
              className="absolute z-10 h-32 w-32 rounded-full bg-sky-700 transition-all delay-150 duration-500 
            ease-in-out group-hover:scale-150 group-hover:delay-150"
            ></div>
            <div
              className="absolute z-10 h-24 w-24 rounded-full bg-sky-600 transition-all delay-150 duration-500 
            ease-in-out group-hover:scale-150 group-hover:delay-200"
            ></div>
            <div
              className="absolute z-10 h-16 w-16 rounded-full bg-sky-500 transition-all delay-150 duration-500 
            ease-in-out group-hover:scale-150 group-hover:delay-300"
            ></div>
            <p className="z-10 font-semibold text-white">{props.product ? "Update Product" : "Create Product"}</p>
          </button>
        </form>
      </section>
    </div>
  );
};

export default ProductCard;
