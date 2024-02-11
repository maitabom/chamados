import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const {logoff} = useContext(AuthContext)

  async function handleLogoff() {
    await logoff()
  }

  return (
    <div>
      <h1>Página de Painel</h1>
      <button onClick={handleLogoff}>Sair</button>
    </div>
  );
}

export default Dashboard;
