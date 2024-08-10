const Home = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center bg-grayblack">
      <div className="relative h-96 w-72 overflow-hidden rounded-xl bg-[#3d3c3d] drop-shadow-xl">
        <div
          className="absolute inset-0.5 z-[1] flex flex-col items-center justify-center 
        gap-y-8 rounded-xl bg-[#323132] px-5 text-center text-2xl text-white opacity-90"
        >
          <span className="font-be-veitnam-pro text-4xl">TechGrow</span>
          <p>In Action we believe.</p>
        </div>
        <div className="absolute -left-1/2 -top-1/2 h-96 w-72 bg-white blur-[50px]"></div>
      </div>
    </div>
  );
};

export default Home;
