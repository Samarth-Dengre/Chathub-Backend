import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";
import LandingPage from "./pages/LandingPage";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
          <Route path="/chathub" element={<LandingPage/>} />
          <Route path="/users/id=:id" element={<UserProfile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
