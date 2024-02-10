import { useState, createContext, useEffect } from "react";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, serUser] = useState(null);

  function logon(email, password) {
    alert("Logou")
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, logon }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
