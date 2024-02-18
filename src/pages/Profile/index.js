import { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import { database, storage } from "../../services/firebase";

import avatarDefault from "../../assets/avatar.png";

import "./profile.css";

function Profile() {
  const { user, storageUser, setUser, logoff } = useContext(AuthContext);

  const [avatar, setAvatar] = useState(user && user.avatar);
  const [nome, setNome] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatar(URL.createObjectURL(image));
      } else {
        alert("Envia uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      const docRef = doc(database, "users", user.uid);
      await updateDoc(docRef, { name: nome }).then(() => {
        let data = {
          ...user,
          name: nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Atualizado com sucesso!");
      });
    } else if (nome !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

    uploadBytes(uploadRef, imageAvatar).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        let urlFoto = url;

        const docRef = doc(database, "users", user.uid);

        await updateDoc(docRef, {
          avatar: urlFoto,
          name: nome,
        }).then(() => {
          let data = {
            ...user,
            name: nome,
            avatar:urlFoto
          };

          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso!");
        });
      });
    });
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatar == null ? (
                <img
                  src={avatarDefault}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                />
              ) : (
                <img
                  src={avatar}
                  alt="Foto do perfil"
                  width={250}
                  height={250}
                />
              )}
            </label>
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              placeholder="Seu nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              placeholder="Seu e-mail"
              disabled
            />

            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button onClick={() => logoff()} className="logout-btn" type="button">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
