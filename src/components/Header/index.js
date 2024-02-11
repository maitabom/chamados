import { useContext } from "react";
import { Link } from "react-router-dom";
import {FiHome, FiUser, FiSettings} from "react-icons/fi"

import { AuthContext } from "../../contexts/auth";

import avatarDefault from "../../assets/avatar.png";

import "./header.css"

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatar === null ? avatarDefault : user.avatar}
          alt="Foto do usuário"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#FFF" size={24}/> Dashboard
      </Link>
      <Link to="/customers">
        <FiUser color="#FFF" size={24}/> Clientes
      </Link>
      <Link to="/profile">
        <FiSettings color="#FFF" size={24}/> Perfil
      </Link>
    </div>
  );
}

export default Header;
