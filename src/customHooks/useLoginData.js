import { useAtom } from "jotai";
import { userAtom } from "../jotai/googleUser";
import { jwtDecode } from "jwt-decode";
import useSWR from "swr";
import { toast } from "react-toastify";

export const useLoginData = () => {
  const [, setvalue] = useAtom(userAtom);
  const { data: admins, isLoading } = useSWR(
    `${import.meta.env.VITE_BASE_URL}/admin`,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }
  );

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const admin = admins.data.find((item) => item.email === decoded.email);
    if (decoded.hd === "webandcrafts.in" || decoded.hd === "webandcrafts.com") {
      if (admin) {
        setvalue({
          isLogin: true,
          name: decoded.given_name + " " + decoded.family_name,
          email: decoded.email,
          imgUrl: decoded.picture,
          designation: admin.designation,
        });
      } else {
        setvalue({
          isLogin: true,
          name: decoded.given_name + " " + decoded.family_name,
          email: decoded.email,
          imgUrl: decoded.picture,
        });
      }
    } else {
      toast.error("please login with your company mail");
    }
  };
  const handleError = () => {
    return null;
  };
  return { handleSuccess, admins, handleError, isLoading };
};
