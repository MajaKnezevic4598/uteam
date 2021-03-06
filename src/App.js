import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import UserInfo from "./components/UserInfo";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { UserContextProvider } from "./context/UserContex";
import { QuestionContextProvider } from "./context/QuestionContex";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserContextProvider>
          <QuestionContextProvider>
            <AuthContextProvider>
              <Header />
              <UserInfo />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/sidebar/*" element={<SideBar />} />
                </Route>
              </Routes>
            </AuthContextProvider>
          </QuestionContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
