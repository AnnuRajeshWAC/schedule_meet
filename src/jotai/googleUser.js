import { atom } from "jotai";
const getUserFromLocalStorage = () => {
    try {
      const data = localStorage.getItem("user");
      return data ? JSON.parse(data) : { isLogin: false }; 
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return { isLogin: false }; 
    }
  }
  export const userAtom=atom(getUserFromLocalStorage()||{isLogin:false},(get,set,newUser)=>{
    if(newUser){
        localStorage.setItem('user',JSON.stringify(newUser))
        set(userAtom,newUser)

    }
})