import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

function Dashboard() {
  const {logoff} = useContext(AuthContext)

  async function handleLogoff() {
    await logoff()
  }

  return (
    <div>
      <Header/>
      <h1>Página de Painel</h1>
      <button onClick={handleLogoff}>Sair</button>
    </div>
  );
}

export default Dashboard;
