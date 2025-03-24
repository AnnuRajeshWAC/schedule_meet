import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import { useLoginData } from "../customHooks/useLoginData";
import { ToastContainer } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const { handleSuccess, handleError, isLoading } = useLoginData();
  if (isLoading) return <Spinner />;
  return (
    <div className="container mx-auto mt-32 py-12 ">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      <ToastContainer />
    </div>
  );
};

export default Login;
