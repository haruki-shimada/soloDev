import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Recipe() {
  const [recipe, setRecipe] = useState();
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  useEffect(() => {
    fetch('http://localhost:8080/recipe')
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => {
        console.error('Error fetching recipe data:', error);
        setRecipe([]);
      });
  }, []);


  const renderRecipe = () => {
    if (!recipe) return null;

    return recipe.map((recipeItem, index) => (
      <tr key={index} className="recipe-row" style={{ fontFamily: 'Arial, sans-serif' }} onClick={() => handleRowClick(recipeItem.id)}>
        <td>{recipeItem.id}</td>
        <td>{recipeItem.name}</td>
        <td>{recipeItem.minute}</td>
      </tr>
    ));
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">レシピ一覧</h3>
      <table className="table table-hover mt-3">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">料理名</th>
            <th scope="col">所要時間</th>
          </tr>
        </thead>
        <tbody>{renderRecipe()}</tbody>
      </table>
    </div>
  );
}

export default Recipe;
