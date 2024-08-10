import { UserData } from "@/redux/slices/usersSlice";

export type AllUsersRs = {
  users: UserData[];
  total: number;
  skip: number;
  limit: number;
};
