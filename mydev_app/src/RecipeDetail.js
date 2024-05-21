import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/recipe/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRecipe(data);
            })
            .catch(error => {
                console.error('Error fetching recipe detail:', error);
            });
    }, [id]);

    if (!recipe) {
        return <div>Loading...</div>;
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
            </div>
        </div>
    );
}

export default RecipeDetail;
