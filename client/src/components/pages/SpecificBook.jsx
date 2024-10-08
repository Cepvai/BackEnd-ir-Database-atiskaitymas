import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const StyledBookPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Gill Sans", "Trebuchet MS", sans-serif;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .book-info {
    width: 60%;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    background-color: #f9f9f9;
  }

  .book-details {
    margin-top: 20px;
    font-size: 1rem;
    line-height: 1.6;

    span {
      font-weight: bold;
    }
  }

  .description {
    margin-top: 15px;
    font-style: italic;
  }
`;

const SpecificBook = () => {
  const { id } = useParams(); // Gauti knygos ID iš URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:5500/books/${id}`);
        const data = await response.json();
        console.log("Gauta knygos informacija:", data); // Patikriname, ar gauname duomenis
        setBook(data);
        setLoading(false);
      } catch (error) {
        console.error("Klaida gaunant knygą:", error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) {
    return <p>Kraunama...</p>;
  }

  if (!book) {
    return <p>Knyga nerasta.</p>;
  }

  const { title, author, description, genres = [], pages, publishDate, rating } = book;

  return (
    <StyledBookPage>
      <h1>{title}</h1>
      <div className="book-info">
        <div className="book-details">
          <p><span>Autorius:</span> {author}</p>
          <p><span>Žanrai:</span> {genres.length > 0 ? genres.join(", ") : "Nėra žanrų"}</p>
          <p><span>Puslapių skaičius:</span> {pages}</p>
          <p><span>Išleidimo data:</span> {new Date(publishDate).toLocaleDateString()}</p>
          <p><span>Reitingas:</span> {rating}</p>
        </div>
        <p className="description">{description}</p>
      </div>
    </StyledBookPage>
  );
};

export default SpecificBook;
