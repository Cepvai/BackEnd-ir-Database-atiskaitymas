import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import BookCard from "../ul/molecules/BookCard";

const StyledSection = styled.section`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    input, select {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
      width: 220px;
    }

    label {
      display: flex;
      align-items: center;
      font-size: 0.9rem;
    }

    input[type="checkbox"] {
      width: auto;
      margin-right: 10px;
    }

    .suggestions {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      max-height: 150px;
      overflow-y: auto;
      width: 220px;
      z-index: 1000;
    }

    .suggestion {
      padding: 10px;
      cursor: pointer;
    }

    .suggestion:hover {
      background-color: #f0f0f0;
    }
  }

  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    
    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 15px;
      margin: 0 5px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #0056b3;
      }

      &:focus {
        outline: none;
        background-color: #0056b3;
      }
    }
  }
`;

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [filters, setFilters] = useState({
    title: '',
    genres: [],
    yearFrom: '',
    yearTo: '',
    inStock: false,
    sortBy: 'rating',
    order: 'asc',
    page: 1,
  });
  const [genreInput, setGenreInput] = useState(""); 
  const [suggestions, setSuggestions] = useState([]); 

  const genreOptions = ['Fiction', 'Classic', 'Literature', 'Adventure', 'Philosophy', 'Cyberpunk', 'Science', 'Historica', 'Thriller', 'Mystery', 'Coming of Age', 'Post-Apocalyptic']; // Fiksuotas žanrų sąrašas

  const fetchBooks = useCallback(async () => {
    const params = new URLSearchParams({ ...filters, genres: filters.genres.join(",") }).toString();
    try {
      const response = await fetch(`http://localhost:5500/books?${params}`);
      const data = await response.json();
      console.log("Gautos knygos:", data);
      setBooks(data.books || []);
      setTotalBooks(data.totalBooks || 0);
    } catch (error) {
      console.error("Klaida gaunant knygas:", error);
    }
  }, [filters]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleGenreInputChange = (e) => {
    const value = e.target.value;
    setGenreInput(value);

    if (value.length > 0) {
      const filteredSuggestions = genreOptions.filter(genre =>
        genre.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleGenreSelect = (genre) => {
    setFilters((prev) => ({
      ...prev,
      genres: [...prev.genres, genre],
    }));
    setGenreInput(""); 
    setSuggestions([]);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <StyledSection>
      <h1>Visos Knygos</h1>

      {/* Filtrų forma */}
      <form>
        <input 
          type="text" 
          name="title" 
          placeholder="Ieškoti pagal pavadinimą..." 
          onChange={handleFilterChange} 
        />

        {/* Žanrų "autocomplete" laukas */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={genreInput}
            placeholder="Įveskite žanrą..."
            onChange={handleGenreInputChange}
          />
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleGenreSelect(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <input 
          type="number" 
          name="yearFrom" 
          placeholder="Metai nuo..." 
          onChange={handleFilterChange} 
        />
        <input 
          type="number" 
          name="yearTo" 
          placeholder="Metai iki..." 
          onChange={handleFilterChange} 
        />
        <label>
          <input 
            type="checkbox" 
            name="inStock" 
            onChange={handleFilterChange} 
          /> 
          Tik turimos knygos
        </label>
        <select name="sortBy" onChange={handleFilterChange}>
          <option value="rating">Reitingas</option>
          <option value="year">Metai</option>
          <option value="pages">Puslapių kiekis</option>
        </select>
        <select name="order" onChange={handleFilterChange}>
          <option value="asc">Didėjančia tvarka</option>
          <option value="desc">Mažėjančia tvarka</option>
        </select>
      </form>

      {/* Knygų sąrašas */}
      <div className="book-list">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))
        ) : (
          <p>Knygų nerasta.</p>
        )}
      </div>

      {/* Puslapiavimo kontrolė */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(totalBooks / 10) }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </StyledSection>
  );
};

export default AllBooks;
