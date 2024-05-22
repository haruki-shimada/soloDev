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
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h3>新規レシピ投稿</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={createRecipe}>
                        <div className="form-group">
                            <label htmlFor="name">料理名</label>
                            <input type="text" className="form-control" id="name" name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="minute">所要時間（分）</label>
                            <input type="number" className="form-control" id="minute" name="minute" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="process">作り方</label>
                            <textarea className="form-control" id="process" name="process" required></textarea>
                        </div>
                        <div className="form-group">
                            <label>材料</label>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">材料名</th>
                                        <th scope="col">分量</th>
                                        <th scope="col">操作</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingredients.map((ingredient, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Iname"
                                                    value={ingredient.Iname}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="amount"
                                                    value={ingredient.amount}
                                                    onChange={event => handleInputChange(index, event)}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleRemoveLine(index)}
                                                >
                                                    削除
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={addLine}
                                            >
                                                追加
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">登録</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRecipe;
