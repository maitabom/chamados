import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { auth, database } from "../services/firebase";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@tickets.user");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function logon(email, password) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(database, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          name: docSnap.data().name,
          email: value.user.email,
          avatar: docSnap.data().avatar,
        };

        setUser(data);
        setLoadingAuth(false);
        storageUser(data);

        toast.success("Login efetuado com sucesso! Bem-vindo ao sistema!");
        navigate("/dashboard");
      })
      .then((error) => {
        console.error(error);
        setLoadingAuth(false);
      });
  }

  async function logoff() {
    await signOut(auth);
    localStorage.removeItem("@tickets.user");
    setUser(null)
  }

  async function register(name, email, password) {
    setLoadingAuth(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        await setDoc(doc(database, "users", uid), {
          name: name,
          avatar: null,
        }).then(() => {
          let data = {
            uid: uid,
            name: name,
            email: value.user.email,
            avatar: null,
          };

          setLoadingAuth(false);
          setUser(data);
          storageUser(data);

          toast.success(
            "Registro efetuado com sucesso! Seja bem-vindo ao sistema!"
          );

          navigate("/dashboard");
        });
      })
      .catch((error) => {
        alert(error);
        console.error(error);
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@tickets.user", JSON.stringify(data));
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, loadingAuth, logon, logoff, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
