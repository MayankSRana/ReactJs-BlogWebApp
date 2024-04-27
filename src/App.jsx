import "./App.css";
import { useDispatch } from "react-redux";
import authservices from "./AppwriteAuthentication/auth_service";
import { useEffect, useState } from "react";
import { login, logout } from "./store/AuthSlice";
import Loading from "./components/Loading/Loading";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authservices
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => console.log("error from use effect login", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>{loading ? <Loading /> : <Outlet />}</main>
      <Footer />
    </>
  );
}

export default App;
