import React from "react";
import { useDispatch } from "react-redux";
import authservices from "../../AppwriteAuthentication/auth_service";
import { logout } from "../../store/AuthSlice";
function LogOutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authservices
      .logOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log("error from logoutButton", error);
      });
  };
  return (
    <button
      className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
