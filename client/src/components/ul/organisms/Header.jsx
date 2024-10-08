import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 2px solid #e9ecef;

  .logo {
    display: flex;
    align-items: center;
    
    img {
      max-height: 50px; 
      margin-right: 15px;
    }

    h1 {
      font-size: 1.5rem;
      color: #333;
    }
  }

  nav {
    ul {
      display: flex;
      list-style-type: none;
      gap: 20px;
      
      li {
        a {
          text-decoration: none;
          color: #007bff;
          font-size: 1.1rem;
          transition: color 0.3s;

          &:hover {
            color: #0056b3;
          }
        }
      }
    }
  }
`;

const Header = () => {
  const logoUrl = "https://www.mab.lt/wp-content/uploads/2021/04/Logas_3.png"; 

  return (
    <HeaderWrapper>
      <div className="logo">
        <img src={logoUrl} alt="Bibliotekos logotipas" />
        <h1>Biblioteka</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Pradžia</Link></li>
          <li><Link to="/books">Knygos</Link></li>
        </ul>
      </nav>
    </HeaderWrapper>
  );
};

export default Header;
