import { useState } from "react";
import { Link } from "react-router-dom";

import "./register.css";

import logo from "../../assets/logo.png";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
    }
  }

  return (
    <div className="Login">
      <main>
        <div className="login-area">
          <img src={logo} alt="Logo do sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Registrar</h1>
          <input
            type="text"
            placeholder="Digite o seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
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
          <button type="submit">Cadastrar</button>
        </form>
        <Link to="/">Já possui uma conta? Faça um login</Link>
      </main>
    </div>
  );
}

export default Register;
