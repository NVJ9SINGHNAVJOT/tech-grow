import { LogInData } from "@/pages/Login";
import { authEndPoints } from "@/services/apis";
import { fetchApi } from "@/services/fetchApi";
import { LogInRs } from "@/types/apis/authApiRs";

export const logInApi = async (data: LogInData): Promise<LogInRs | null> => {
  const resData: LogInRs = await fetchApi("POST", authEndPoints.LOGIN, data, {
    "Content-Type": "application/json",
  });
  return resData;
};
