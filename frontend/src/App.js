import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Main from "./components/main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
