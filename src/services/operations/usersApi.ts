import { usersEndPoints } from "@/services/apis";
import { fetchApi } from "@/services/fetchApi";
import { AllUsersRs } from "@/types/apis/usersApiRs";

export const allUsersApi = async (limit = "50", skip = "0"): Promise<AllUsersRs | null> => {
  const resData = await fetchApi("GET", usersEndPoints.ALL_USERS, null, null, { limit: limit, skip: skip });
  return resData;
};
