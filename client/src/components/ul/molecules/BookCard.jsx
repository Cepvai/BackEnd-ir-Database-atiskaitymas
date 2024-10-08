import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledBookCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  font-family: "Gill Sans", "Trebuchet MS", sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
  }

  .book-info {
    font-size: 0.9rem;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 10px;
    color: #555;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

const BookCard = ({ book }) => {
  const { _id, title, description, author, genres, pages, publishDate, rating, imageUrl } = book;
  const navigate = useNavigate();

  const getPartialDescription = (desc) => {
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  const handleReadMore = () => {
    navigate(`/books/${_id}`, { replace: false });
  };

  return (
    <StyledBookCard>
      {imageUrl && <img src={imageUrl} alt={title} />}

      <h3>{title}</h3>
      <div className="book-info">
        <span>Autorius: {author}</span>
        <span>Žanrai: {genres.join(", ")}</span>
        <span>Puslapių skaičius: {pages}</span>
        <span>Išleidimo data: {new Date(publishDate).toDateString()}</span>
        <span>Reitingas: {rating}</span>
      </div>
      <p>{getPartialDescription(description)}</p>
      <button onClick={handleReadMore}>Skaityti daugiau</button>
    </StyledBookCard>
  );
};

export default BookCard;
