import UserByAgeLine from "@/components/core/dashboard/charts/UserByAgeLine";

const Users = () => {
  return (
    <div className="ct-user w-full flex justify-center items-center overflow-y-auto h-full bg-white p-6 backdrop-blur-sm ">
      <UserByAgeLine />
    </div>
  );
};

export default Users;
