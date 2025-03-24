import { useAtom } from "jotai";
import { userAtom } from "../jotai/googleUser";
import { useState } from "react";

export const useNavData=()=>{
    const [user, setUser] = useAtom(userAtom);
    const [isOpen, setOpen] = useState(false);
    const handleLogout = () => {
      setUser({
        isLogin: false,
        name: "",
        email: "",
        imgUrl: "",
      });
      setOpen(false);
    };
    return {user,isOpen,setOpen,handleLogout}
  }