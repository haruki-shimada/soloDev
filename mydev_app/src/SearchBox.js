import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function SearchBox() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length === 0) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const response = await fetch(`http://localhost:8080/recipe/search?searchWord=${query}`);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [query]);

    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/recipe/${id}`);
    };

    return (
        <div className="container mt-4">
            <div className="form-group">
                <label htmlFor="searchInput">Search Recipes:</label>
                <input
                    type="text"
                    id="searchInput"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {suggestions.length > 0 && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Recipe Name</th>
                            <th>Time (minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestions.map((recipe) => (
                            <tr key={recipe.id} onClick={() => handleRowClick(recipe.id)}>
                                <td>{recipe.id}</td>
                                <td>{recipe.name}</td>
                                <td>{recipe.minute}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchBox;
