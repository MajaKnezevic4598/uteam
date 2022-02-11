import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
            <Route element={<ProtectedRoutes />}>
              <Route path="/sidebar/*" element={<SideBar />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
