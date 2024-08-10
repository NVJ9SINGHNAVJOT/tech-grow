import { CurrentUser } from "@/redux/slices/authSlice";

export type LogInRs = CurrentUser & { token: string; refreshToken: string };
