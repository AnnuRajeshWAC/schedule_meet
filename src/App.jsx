import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyCalender from "./components/MyCalender";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "./jotai/googleUser";
import Login from "./components/Login";
import { Navigate } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
function App() {
  const [value] = useAtom(userAtom);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={!value?.isLogin ? <Login /> : <Navigate to="/calender" />}
          />
          <Route
            path="/calender"
            element={value?.isLogin ? <MyCalender /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
