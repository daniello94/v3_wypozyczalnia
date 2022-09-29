import {
  Routes,
  Route,
  Link,
  Navigate,
  useLocation
} from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

import style from "./style/Menu.module.scss"
import LoginEmpoyee from "./routes/LoginEmployee";
import LoginClient from "./routes/LoginClient";
import MyData from "./routes/MyData";
import SignUpClient from "./routes/SignUpClient";
import SignUpEmployee from "./routes/SignUpEmployee";
import MachinesAdd from "./routes/MachinesAdd";
import VivesMachines from "./routes/VivesMachines";
import VivesOrder from "./routes/VivesOrder";
import Contact from "./routes/Contact";
import ListData from "./routes/ListData";

export default function App() {
  const [userData, setUser] = useState(
    JSON.parse(localStorage.getItem('user'))
  );

  axios.defaults.headers.common["x-auth-token"] = userData ? userData.jwt : "";

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!userData) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return children;
  };

  function viveRole() {
    if (userData.user.role === 'employe') {
      return "employe"
    } else if (userData.user.role === 'admin') {
      return "admin"
    }
  };

  const logOut = () => {
    localStorage.clear();
    setInterval();
  };

  return (
    <div>
      <nav className={style.mainMenu}>
        <ul>

          {!userData && (
            <li>
              <Link
                className={style.myItm}
                to="/client">
                Strefa Klienta
              </Link>
            </li>
          )}

          {!userData && (
            <li>
              <Link
                className={style.myItm}
                to="/employee">
                Strefa Pracownika
              </Link>
            </li>
          )}

          {userData && userData.user.role === 'admin' && (
            <li>
              <Link
                className={style.myItm}
                to="/signUpEmployee">
                Dodaj Pracownika
              </Link>
            </li>
          )}

          {userData && userData.user.role === 'admin' && (
            <li>
              <Link
                className={style.myItm}
                to="/list">
                Użytkownicy serwisu
              </Link>
            </li>
          )}

          {userData && userData.user.role === viveRole() && (
            <li>
              <Link
                className={style.myItm}
                to="/machinesAdd">
                Dodaj nowy przedmiot
              </Link>
            </li>
          )}

          {userData && (
            <li>
              <Link
                className={style.myItm}
                to={`/MyData/${userData.user._id}`}>
                Moje Dane
              </Link>
            </li>
          )}

          {userData && (
            <li>
              <Link
                className={style.myItm}
                to="/">
                Nasze Maszyny
              </Link>
            </li>
          )}

          <li>
            <Link
              className={style.myItm}
              to="/contact">
              Kontakt
            </Link>
          </li>

          {userData && userData.user.role === viveRole() && (
            <li>
              <Link
                className={style.myItm}
                to="/vivesOrder">
                Zapytania
              </Link>
            </li>
          )}

          {userData && (
            <li>
              <Link
                className={style.myItm}
                to="/"
                onClick={logOut}>
                Wyloguj
              </Link>
            </li>
          )}

        </ul>
      </nav>

      <Routes>

        <Route
          path="/client"
          element={
            <LoginClient
              userData={userData}
              setUser={setUser}
            />
          } />

        <Route
          path="/employee"
          element={<LoginEmpoyee
            userData={userData}
            setUser={setUser}
          />
          } />

        <Route
          path="/signupClient"
          element={<SignUpClient />
          } />

        <Route path="/signUpEmployee"
          element={<SignUpEmployee />
          } />

        <Route
          path="/machinesAdd"
          element={<MachinesAdd />
          } />

        <Route
          path="/list"
          element={<ListData />
          } />

        <Route
          path="/"
          element={<VivesMachines
            dataUser={userData} />
          } />

        <Route
          path="/contact"
          element={<Contact
            dataUser={userData} />
          } />

        <Route
          path="/vivesOrder"
          element={<VivesOrder />
          } />

        <Route path="/MyData/:id"
          element={
            <ProtectedRoute>
              <MyData
                userData={userData}
                setUser={setUser}
              />
            </ProtectedRoute>
          } />

      </Routes>

    </div>
  );
};
