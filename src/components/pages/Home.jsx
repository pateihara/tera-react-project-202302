import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import AppLoading from "../organisms/AppLoading";

export default function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  console.log("currentUser", currentUser);

  useEffect(() => {
    fetch("https://63cf09718a780ae6e6710dbe.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsloading(false);
      });
  }, []);

  const hadleUserChange = (event) => setCurrentUser(event.target.value);
  const handleSubmit = () => {
    navigate(`/users/${currentUser}`);
  };

  return isLoading ? (
    <AppLoading />
  ) : (
    <div className="home center">
      <div className="home__logo">
        <img src={logo} className="responsive" alt="" />
      </div>
      <select onChange={hadleUserChange} className="home__select-users">
        <option value="">Selecione um usuário</option>
        {users
          .sort((a, b) => a.fn.localeCompare(b.fn))
          .map((user) => (
            <option value={user.id} key={user.id}>
              {user.fn} {user.ln}
            </option>
          ))}
      </select>
      {!!currentUser && (
        <button onClick={handleSubmit} className="button-primary">
          Entrar
        </button>
      )}
    </div>
  );
}
