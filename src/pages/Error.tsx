import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-around gap-x-4 
    bg-grayblack md:flex-row"
    >
      <p className="mx-4 text-[10rem] font-bold tracking-wider text-white lg:text-[12rem]">404</p>

      <div className="mx-4 flex flex-col items-center text-white">
        <h2 className="my-2 text-center text-2xl font-bold">
          Looks like you've found the doorway to the great nothing
        </h2>
        <p className="my-2 text-center">Sorry about that! Please visit our hompage to get where you need to go.</p>
        <button
          className="md mt-16 w-auto rounded border px-8 py-4 text-center transition-all ease-in-out 
          hover:bg-white hover:text-black"
          onClick={() => navigate("/")}
        >
          Take me there!
        </button>
      </div>
    </div>
  );
};

export default Error;
