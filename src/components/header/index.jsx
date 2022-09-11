import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useSelector } from "react-redux";
import instance from "../../axios/global";
import logoWhite from "../../images/logo_white.png";

function Header() {
  const data = useSelector((state) => {
    return state.data.tokenable;
  });

  const handleLogout = () => {
    instance.delete("/logout").then(() => {
      localStorage.removeItem("Authorization");
      window.location.reload();
    });
  };

  return (
    <nav className="w-full justify-between text-center items-center flex h-30 bg-gray-800 px-2 sm:px-4 py-2.5">
      <span className="text-white">
        Bem vindo,
        <br />
        {data.name}
      </span>
      <span>
        <img src={logoWhite} alt="Logo" width="80px" />
      </span>
      <button onClick={() => handleLogout()}>
        <AiOutlineLogout style={{ color: "white", fontSize: "32px" }} />
      </button>
    </nav>
  );
}
export default Header;
