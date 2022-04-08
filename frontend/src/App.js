import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen"
import LoginScreen from "./screens/LoginScreen/LoginScreen"
import MyNotes from "./screens/MyNotes/MyNotes"
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen"
import ResetPasswordRequest from "./screens/ResetPasswordRequest/ResetPasswordRequest";
import { useState } from "react";
import ResetPassword from "./screens/ResetPassword/ResetPassword";

const App = () => {
  const [search, setSearch] = useState("")

  return(
  <Router>
    <Header setSearch={(s)=> setSearch(s)}/>
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/myNotes" element={<MyNotes search={search} />} exact />
        <Route path="/register" element={<RegisterScreen/>} exact />
        <Route path="/login" element={<LoginScreen/>} exact />
        <Route path="/profile" element={<ProfileScreen/>} exact />
        <Route path="/password-reset" element={<ResetPasswordRequest/>} exact />
        <Route path="/reset/:id/:token" element={<ResetPassword/>} exact />
      </Routes>
    </main>
    <Footer />
  </Router>
)}

export default App;
