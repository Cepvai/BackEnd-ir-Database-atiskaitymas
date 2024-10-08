import React from "react";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  padding: 20px 0;
  border-top: 2px solid #e9ecef;
  text-align: center;
  font-family: "Gill Sans", "Trebuchet MS", sans-serif;
  font-size: 0.9rem;
  
  .copyright {
    margin-bottom: 10px;
    color: #6c757d;
  }

  .social-icons {
    margin-bottom: 15px;
    
    a {
      margin: 0 10px;
      font-size: 1.5rem;
      color: #007bff;
      transition: color 0.3s;
      
      &:hover {
        color: #0056b3;
      }
    }
  }

  .location {
    font-size: 1rem;
    margin-bottom: 5px;

    p {
      margin: 5px 0;
    }
  }

  .working-hours {
    font-size: 1rem;
    
    p {
      margin: 5px 0;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="copyright">
        © {new Date().getFullYear()} Martyno Mažvydo biblioteka. Visos teisės saugomos.
      </div>
      
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
      </div>
      
      <div className="location">
        <p><strong>Adresas:</strong> Gedimino pr. 51, Vilnius, Lietuva</p>
      </div>
      
      <div className="working-hours">
        <p><strong>Darbo laikas:</strong></p>
        <p>Pirmadienis - Penktadienis: 09:00 - 18:00</p>
        <p>Šeštadienis: 10:00 - 16:00</p>
        <p>Sekmadienis: Nedirbame</p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
