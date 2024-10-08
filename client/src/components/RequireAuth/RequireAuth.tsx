import { useDispatch, useSelector, UseSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";

import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { loginSuccess } from "../../redux/authSlice";
import { jwtDecode } from "jwt-decode";

type Props = {
  children: ReactElement;
};

const RequireAuth = ({ children }: Props) => {
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );

  return currentUser === null ? <Navigate to="/" /> : children;
};

export default RequireAuth;
