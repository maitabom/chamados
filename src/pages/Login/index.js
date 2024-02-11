import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

import "./login.css";

import logo from "../../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logon, loadingAuth } = useContext(AuthContext);

  async function handleLogon(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await logon(email, password);
    }
  }

  return (
    <div className="Login">
      <main>
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>
        <form onSubmit={handleLogon}>
          <h1>Controle de Acesso</h1>
          <input
            type="text"
            placeholder="Digite o seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Digite a sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{loadingAuth ? "Aguarde" : "Entrar"}</button>
        </form>
        <Link to="/register">Criar uma conta</Link>
      </main>
    </div>
  );
}

export default Login;
