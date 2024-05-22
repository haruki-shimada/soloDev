import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const DeleteUrl = `http://localhost:8080/recipe/${id}/delete`;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/recipe/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRecipe(data)
            })
            .catch(error => {
                console.error('Error fetching recipe detail:', error);
            });
    }, []);

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const deleteRecipe = () => {
        fetch(DeleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log(`Response status: ${res.status}`); // ステータスコードをログに出力
            if (!res.ok) {
                navigate("/recipe");
            }
        }).catch(err => {
            console.error("something wrong " + err)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2>{recipe.name}</h2>
                    <p>ID: {recipe.id}</p>
                    <p>Process: {recipe.process}</p>
                    <p>Time: {recipe.minute} minutes</p>
                </div>
                <div className="col-md-6">
                    <h3>Ingredients:</h3>
                    <ul className="list-group">
                        {recipe.amounts.map(amount => (
                            <li key={amount.id} className="list-group-item">
                                {amount.name}: {amount.amount}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <button onClick={() => deleteRecipe()} name='deleteButton'>削除</button>
                </div>
            </div>
        </div >
    );
}

export default RecipeDetail;
