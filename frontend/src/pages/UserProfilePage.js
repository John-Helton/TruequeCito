import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

const UserProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userProducts, setUserProducts] = useState([]);
  const [exchangeProposals, setExchangeProposals] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    // Fetch user products
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserProducts(response.data);
      } catch (error) {
        console.error("Error fetching user products", error);
      }
    };

    // Fetch exchange proposals
    const fetchExchangeProposals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/exchanges/user",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setExchangeProposals(response.data);
      } catch (error) {
        console.error("Error fetching exchange proposals", error);
      }
    };

    fetchUserData();
    fetchUserProducts();
    fetchExchangeProposals();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <FontAwesomeIcon icon={faUser} /> Información del Usuario
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FontAwesomeIcon icon={faExchangeAlt} /> Propuestas de Intercambio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
          <h2>Información del Usuario</h2>
          <div className="user-info">
            <p>Nombre: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>

          <h2>Productos Publicados</h2>
          <div className="user-products">
            {userProducts.map((product) => (
              <div key={product._id} className="card mb-3">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img src={product.image} className="card-img" alt={product.title} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <p className="card-text">{product.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2>Propuestas de Intercambio</h2>
          <div className="exchange-proposals">
            {exchangeProposals.map((proposal) => (
              <div key={proposal._id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">Propuesta de {proposal.fromUser.name}</h5>
                  <p className="card-text">
                    Producto ofrecido: {proposal.offeredProduct.title}
                  </p>
                  <p className="card-text">
                    Producto solicitado: {proposal.requestedProduct.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
