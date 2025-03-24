import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SWRConfig } from "swr";
import axios from "axios";

const clientId =
  "964624037841-7ch6uqho2s76sqgfp01kq4pme36lcp4e.apps.googleusercontent.com";
  const fetcher=async(url)=>{
const response =await axios.get(url)
return response.data
  }
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <SWRConfig value={{fetcher}}>
        <App />
      </SWRConfig>
    </GoogleOAuthProvider>
  </StrictMode>
);
