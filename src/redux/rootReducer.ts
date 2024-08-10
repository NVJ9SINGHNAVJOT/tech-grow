import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import productReducer from "@/redux/slices/productSlice";
import usersReducer from "@/redux/slices/usersSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
