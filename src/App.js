import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import RoutesApp from "./routes";
import { AuthProvider } from "./contexts/auth";

import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3141}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
