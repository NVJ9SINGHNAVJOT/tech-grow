import ProductCard from "@/components/core/dashboard/ProductCard";
import { setProducts } from "@/redux/slices/productSlice";
import { setUsers } from "@/redux/slices/usersSlice";
import { allProductsApi } from "@/services/operations/productApi";
import { allUsersApi } from "@/services/operations/usersApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const dashMenu = ["OverView", "Products", "Users", "Add Product", "Settings"];

const Dashboard = () => {
  const [dashDataLoading, setDashDataLoading] = useState<boolean>(true);
  const [toggleProduct, setToggleProduct] = useState<boolean>(false);
  const [menu, setMenu] = useState<string>(dashMenu[0]);
  const navigate = useNavigate();

  const menuHandler = (value: string) => {
    if (value === "Add Product") {
      setToggleProduct(true);
      return;
    }
    setMenu(value);
    if (value === "OverView") {
      navigate(`/dashboard`);
      return;
    }
    navigate(`/dashboard/${value.toLowerCase()}`);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await Promise.all([allProductsApi(), allUsersApi()]);
      if (!response[0] || !response[1]) {
        toast.error("Error getting dashboard data");
        return;
      }
      dispatch(setProducts(response[0].products));
      dispatch(setUsers(response[1].users));
      setDashDataLoading(false);
    })();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full min-w-minContent">
      {/* left menu section*/}
      <section
        className="ct-dashboard-sidebar flex h-full w-[8rem] items-center overflow-y-auto 
      text-white md:w-[11rem] lg:w-[14rem]"
      >
        <div className="flex h-full w-full flex-col justify-center gap-y-5 py-16 font-be-veitnam-pro">
          {dashMenu.map((value, index) => {
            return (
              <div
                onClick={() => menuHandler(value)}
                key={index}
                className={` ${menu === value && "bg-black"} ${menu !== value && "hover:bg-richblack-900"} 
                  group relative flex h-12 min-h-8 w-full cursor-pointer items-center overflow-hidden px-4 
                  py-1 text-[1rem] transition-all ease-in-out md:px-6 md:py-2 md:text-xl lg:px-10 lg:py-3`}
              >
                <span
                  className={`${menu !== value && "group-hover:scale-[1.05]"} absolute z-10 mx-auto min-h-fit 
                    min-w-fit transition-all delay-0 ease-linear`}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* dashboard outlet */}
      <section
        className="min-h-full w-[calc(100vw-8rem)] overflow-y-auto bg-grayblack md:w-[calc(100vw-11rem)] 
      lg:w-[calc(100vw-14rem)]"
      >
        {dashDataLoading === true ? (
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="flex h-5/6 w-10/12 animate-pulse items-center justify-center rounded-xl 
            bg-richblack-900 text-center text-4xl text-white"
            >
              <p>Loading...</p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </section>
      {toggleProduct === true && <ProductCard setProductCard={setToggleProduct} />}
    </div>
  );
};

export default Dashboard;
