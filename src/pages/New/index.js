import { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/auth";
import { database } from "../../services/firebase";

import Header from "../../components/Header";
import Title from "../../components/Title";

import "./new.css";

function New() {
  const { user } = useContext(AuthContext);

  const [customers, setCustomers] = useState([]);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [complemento, setComplemento] = useState("");
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");

  useEffect(() => {
    async function loadCustomers() {
      await getDocs(collection(database, "customers"))
        .then((snapshot) => {
          let lista = [];
          if (snapshot.docs.size === 0) {
            setCustomers([{}]);
            setLoadCustomer(false);
          } else {
            snapshot.forEach((doc) => {
              lista.push({
                id: doc.id,
                name: doc.data().name,
              });
            });

            setCustomers(lista);
            setLoadCustomer(false);
          }
        })
        .catch((error) => {
          toast.error(error);
          setLoadCustomer(false);
          setCustomers([{}]);
        });
    }

    loadCustomers();
  }, []);

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value);
  }

  async function handleRegister(e) {
    e.preventDefault();
    let customer = customers[customerSelected];

    await addDoc(collection(database, "tickets"), {
      created: new Date(),
      cliente: customer.name,
      clieteId: customer.id,
      assunto: assunto,
      complemento: complemento,
      status: status,
      user: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrado com sucesso!");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((error) => {
        toast.error(error);
      });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlus size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>

            {loadCustomer ? (
              <select>
                <option>Carregando...</option>
              </select>
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((item, index) => {
                  return (
                    <option key={index} value={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="status"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>
              <input
                type="radio"
                name="status"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Em progresso</span>
              <input
                type="radio"
                name="status"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              value={complemento}
              placeholder="Descreva o seu problema"
              onChange={(e) => setComplemento(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
