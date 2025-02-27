import { BrowserRouter, Routes, Route } from "react-router";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from "./pages/Home";
import Todos from "./pages/Todos";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
  </BrowserRouter>
  );
};

export default App;