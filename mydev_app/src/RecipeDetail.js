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
        <div>
            <h2>{recipe.name}</h2>
            <p>ID: {recipe.id}</p>
            <p>Process: {recipe.process}</p>
            <p>Time: {recipe.minute} minutes</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.amounts.map(amount => (
                    <li key={amount.id}>
                        {amount.name}: {amount.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipeDetail;
