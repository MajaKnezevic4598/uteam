import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import { AuthContextProvider } from "./context/AuthContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sidebar/*" element={<SideBar />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
