import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Homepage from "./Pages/Homepage";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Homepage />}></Route>
      <Route path={"/login"} element={<Login />}></Route>
      <Route path={"/signup"} element={<Signup />}></Route>
    </Routes>
  );
};

export default App;
