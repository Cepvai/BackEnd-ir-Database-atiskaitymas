import React from 'react';
import styled from 'styled-components';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 80px - 60px);
  padding: 20px;
  background-color: #f9f9f9;

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #555;
    margin-top: 20px;
  }

  a {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  a:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <div className="content">
      <h1>Sveiki atvykę į biblioteką</h1>
      <p>Tyrinėkite įvairias knygas iš skirtingų žanrų.</p>
      <a href="/books">Naršykite knygas</a>
      </div>
    </StyledHome>
  );
};

export default Home;
