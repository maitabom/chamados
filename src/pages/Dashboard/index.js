import { useContext } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import Title from "../../components/Title";
import Header from "../../components/Header";

import "./dashboard.css";

function Dashboard() {
  const { logoff } = useContext(AuthContext);

  async function handleLogoff() {
    await logoff();
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Chamados">
          <FiMessageSquare size={25} />
        </Title>
        <Link to='/new' className="novo-chamado">
          <FiPlus color="#fff" size={25} /> Novo Chamado
        </Link>
        <table>
          <thead>
            <tr>
              <th scope="col">Cliente</th>
              <th scope="col">Assunto</th>
              <th scope="col">Status</th>
              <th scope="col">Cadastrado em</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Cliente">Mercado do Tião</td>
              <td data-label="Assunto">Lorem ipsum</td>
              <td data-label="Status">
                <span className="badge" style={{backgroundColor: "#999"}}>Em aberto</span>
              </td>
              <td data-label="Cadastrado">12/12/2021</td>
              <td>
                <button className="action" style={{backgroundColor: '#3583f6'}}>
                  <FiSearch color="#fff" size={17}/>
                </button>
                <button className="action" style={{backgroundColor: '#f6a935'}}>
                  <FiEdit2 color="#fff" size={17} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
