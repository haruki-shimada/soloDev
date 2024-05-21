import React from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {

    const postUrl = 'http://localhost:8080/recipe/create';
    const navigate = useNavigate();

    const AddRecipe = (formData) => {
        fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.ok) {
                navigate("/recipe");
            }
        }).catch(err => {
            console.error("Failed to create new recipe.");
        });
    }

    const createRecipe = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newRecipe = {
            name: formData.get('name'),
            minute: parseInt(formData.get('minute')),
            process: formData.get('process')
        };
        AddRecipe(newRecipe);
    }

    return (
        <div>
            <form onSubmit={createRecipe}>
                <label>
                    料理名：
                    <input type="text" name="name" required />
                </label>
                <label>
                    所要時間（分）
                    <input type="number" name="minute" required />
                </label>
                <label>
                    作り方
                    <input type="text" name="process" required />
                </label>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}

export default AddRecipe;