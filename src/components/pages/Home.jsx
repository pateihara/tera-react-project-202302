import React, { useState, useEffect } from "react";
import logo from "../../images/logo.svg";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch("https://63cf09718a780ae6e6710dbe.mockapi.io/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setIsloading(false);
      });
  }, []);

  return isLoading ? (
    <h1>loading...</h1>
  ) : (
    <div className="home center">
      <div className="home__logo">
        <img src={logo} className="responsive" alt="" />
      </div>
      <select className="home__select-users">
        {users
          .sort((a, b) => a.fn.localeCompare(b.fn))
          .map((user) => (
            <option value={user.id} key={user.id}>
              {user.fn} {user.ln}
            </option>
          ))}
      </select>
      <button className="button-primary">Entrar</button>
    </div>
  );
}
