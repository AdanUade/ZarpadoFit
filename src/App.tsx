import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UploadPhoto } from "./pages/UploadPhoto";
import { VirtualTryOn } from "./pages/VirtualTryOn";
import { Profile } from "./pages/Profile";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload-photo" element={<UploadPhoto />} />
        <Route path="/virtual-try-on" element={<VirtualTryOn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};
