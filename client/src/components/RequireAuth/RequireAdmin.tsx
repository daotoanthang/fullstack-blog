import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

type Props = { children: ReactElement };

const RequireAdmin = ({ children }: Props) => {
  const currentUser = useSelector(
    (state: any) => state.auth.login?.currentUser
  );

  return currentUser?.userInfo.role === 1 ? children : <Navigate to="/" />;
};

export default RequireAdmin;
