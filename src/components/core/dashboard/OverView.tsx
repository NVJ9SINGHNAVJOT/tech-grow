import { useAppSelector } from "@/redux/store";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import ProductsBrandPie from "@/components/core/dashboard/charts/ProductsBrandPie";
import GenderPie from "@/components/core/dashboard/charts/GenderPie";
import ProductRating from "@/components/core/dashboard/charts/ProductRatingArea";
import OverAllRatingsBar from "@/components/core/dashboard/charts/OverAllRatingsBar";

const OverView = () => {
  const users = useAppSelector((state) => state.users.users);
  const products = useAppSelector((state) => state.product.products);

  return (
    <div className="w-full overflow-y-auto px-7">
      {/* top data container*/}
      <section className="ct-dashboard-top mt-5 flex items-center justify-between rounded-lg py-6 text-white">
        <div className="mx-7 flex gap-x-2 rounded-lg">
          <span className="rounded-xl bg-blue-600 p-1 ring-2">
            <FaUsers className="size-20" />
          </span>
          <div className="my-2 flex flex-col justify-between">
            <span className="text-snow-200">Total Users</span>
            <span className="text-2xl font-semibold">{users.length}</span>
          </div>
        </div>

        <div className="mx-7 flex gap-x-2 rounded-lg">
          <span className="rounded-xl bg-white p-1 ring-2">
            <AiOutlineProduct className="size-20 fill-blue-500" />
          </span>
          <div className="my-2 flex flex-col justify-between">
            <span className="text-snow-200">Total Products</span>
            <span className="text-2xl font-semibold">{products.length}</span>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="mt-10 flex w-full flex-wrap justify-evenly gap-8">
        <ProductsBrandPie />
        <GenderPie />
      </section>

      <section className="mt-10 w-full">
        <ProductRating />
      </section>

      <section className="mt-16 w-full">
        <OverAllRatingsBar />
      </section>
    </div>
  );
};

export default OverView;
