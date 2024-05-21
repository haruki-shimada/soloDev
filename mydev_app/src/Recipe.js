import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function Recipe() {
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    console.log("call useEffect START");
    fetch('http://localhost:8080/recipe').then(response => {
      response.json().then(value => {
        // ※２
        console.log(value);
        setRecipe(value);
      })
    })
      .catch(error => {
        console.log(error);
        setRecipe([]);
      });

    console.log("call useEffect END");
    return () => { };
  }, []);
  // レシピデータを再取得する関数
  // const fetchRecipeData = () => {
  //   fetch('http://localhost:8080/recipe')
  //     .then(response => response.json())
  //     .then(recipe => {
  //       setRecipe(recipe);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching recipe data:', error);
  //       setRecipe([]);
  //     });
  // }

  const recipeData = recipe && recipe.map((recipe, index) => {
    return (
      <tr key={index}>
        <td>{recipe.id}</td>
        <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
        <td>{recipe.minute}</td>
      </tr>);
  })

  // const jumpDetail = (recipeId) => {
  //   fetch(`http://localhost:8080/recipe/${recipeId}`)
  //     .then(response => {
  //       response.json().then(() => {

  //       })
  //     })
  //     .catch(error => {
  //       console.error('Error fetching recipe detail:', error);
  //     });
  // };

  return (
    <div className="App">
      <h3>レシピ一覧</h3>
      <table border="1" id="recipeAll">
        <thead>
          <tr>
            <th>ID</th>
            <th>料理名</th>
            <th>所要時間</th>
          </tr>
        </thead>
        <tbody>
          {recipeData}
        </tbody>
      </table>
    </div>
  );
}

export default Recipe;
