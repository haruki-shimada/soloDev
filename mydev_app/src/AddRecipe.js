import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const [ingredients, setIngredients] = useState([{ Iname: '', amount: '' }]);
    const postUrl = 'http://localhost:8080/recipe/create';
    const navigate = useNavigate();

    const submitRecipe = (formData) => {
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
    };

    const createRecipe = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newRecipe = {
            name: formData.get('name'),
            minute: parseInt(formData.get('minute')),
            process: formData.get('process'),
            ingredients: ingredients
        };

        // 入力検証
        const isValid = newRecipe.ingredients.every(ingredient => ingredient.Iname.trim() !== '' && ingredient.amount.trim() !== '');
        if (!isValid) {
            alert('すべての材料名と分量を入力してください。');
            return;
        }

        submitRecipe(newRecipe);
    };

    const handleInputChange = (index, event) => {
        const values = [...ingredients];
        values[index][event.target.name] = event.target.value;
        setIngredients(values);
    };

    const addLine = () => {
        setIngredients([...ingredients, { Iname: '', amount: '' }]);
    };

    const handleRemoveLine = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    return (
        <div>
            <form onSubmit={createRecipe}>
                <ul>
                    <label>
                        料理名：
                        <input type="text" name="name" required />
                    </label>
                    <label>
                        所要時間（分）：
                        <input type="number" name="minute" required />
                    </label>
                    <label>
                        作り方：
                        <input type="text" name="process" required />
                    </label>
                    <label>
                        材料：
                        <table name="ingredients">
                            <thead>
                                <tr>
                                    <th scope="col">材料名</th>
                                    <th scope="col">分量</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((ingredient, index) => (
                                    <tr key={index}>
                                        <td><input type="text" name="Iname" value={ingredient.Iname} onChange={event => handleInputChange(index, event)} /></td>
                                        <td><input type="text" name="amount" value={ingredient.amount} onChange={event => handleInputChange(index, event)} /></td>
                                        <td><button type="button" onClick={() => handleRemoveLine(index)}>削除</button></td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td onClick={addLine}>追加</td>
                                </tr>
                            </tbody>
                        </table>
                    </label>
                </ul>
                <button type="submit">登録</button>
            </form>
        </div>
    );
}

export default AddRecipe;
