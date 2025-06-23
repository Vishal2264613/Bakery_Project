import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";

const DropdownUser = ({ closeMenu }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  return (
    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1">
        {user ? (
          <>
            <a
              href="/account-settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Account Settings
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log Out
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default DropdownUser;
