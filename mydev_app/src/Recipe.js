import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Recipe() {
  const [recipe, setRecipe] = useState();
  const navigate = useNavigate();

  // クリックしたときに呼び出される関数で、各レシピの詳細ページに飛ぶ。
  const handleRowClick = (id) => {
    navigate(`/recipe/${id}`);
  };
  const getRecipesUrl = 'http://localhost:8080/recipe';

  // サーバからレシピ一覧をとってくる
  useEffect(() => {
    fetch(getRecipesUrl)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => {
        console.error('Error fetching recipe data:', error);
        setRecipe([]);
      });
  }, []);

  // レシピをひとつずつ一行にまとめてレンダリングするための関数。
  // 行丸ごとクリック可能にしている。
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
