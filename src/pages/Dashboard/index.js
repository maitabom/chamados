import { useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import {
  collection,
  getDocs,
  orderBy,
  limit,
  startAfter,
  query,
} from "firebase/firestore";

import { database } from "../../services/firebase";

import Title from "../../components/Title";
import Header from "../../components/Header";

import "./dashboard.css";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  async function updateState(snapshot) {
    const isCollectionEmpty = snapshot.size === 0;

    if (!isCollectionEmpty) {
      let lista = [];

      snapshot.forEach((element) => {
        lista.push({
          id: element.id,
          assunto: element.data().assunto,
          cliente: element.data().cliente,
          clientId: element.data().clieteId,
          created: element.data().created,
          createdFormat: format(element.data().created.toDate(), "dd/MM/yyyy"),
          status: element.data().status,
          complemento: element.data().complemento,
        });
      });

      setTickets((tickets) => [...tickets, ...lista]);
    } else {
      setIsEmpty(true);
    }
  }

  useEffect(() => {
    async function loadTickets() {
      const q = query(
        collection(database, "tickets"),
        orderBy("created", "desc"),
        limit(10)
      );
      const qs = await getDocs(q);
      await updateState(qs);

      setLoading(false);
    }

    loadTickets();
  }, []);

  if (loading) {
    return (
      <div>
        <Header/>
        <div className="content">
          <Title name="Chamados">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Chamados">
          <FiMessageSquare size={25} />
        </Title>
        <Link to="/new" className="novo-chamado">
          <FiPlus color="#fff" size={25} /> Novo Chamado
        </Link>

        {tickets.length === 0 ? (
          <div className="container dashboard">
            <h2>Nenhum chamado encontrado.</h2>
          </div>
        ) : (
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
              {tickets.map((item, index) => {
                return (
                  <tr key={index}>
                    <td data-label="Cliente">{item.cliente}</td>
                    <td data-label="Assunto">{item.assunto}</td>
                    <td data-label="Status">
                      <span
                        className="badge"
                        style={{ backgroundColor: "#999" }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td data-label="Cadastrado">{item.createdFormat}</td>
                    <td>
                      <button
                        className="action"
                        style={{ backgroundColor: "#3583f6" }}
                      >
                        <FiSearch color="#fff" size={17} />
                      </button>
                      <button
                        className="action"
                        style={{ backgroundColor: "#f6a935" }}
                      >
                        <FiEdit2 color="#fff" size={17} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
