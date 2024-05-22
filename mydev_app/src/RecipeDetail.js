import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [memo, setMemo] = useState('');
    const [showMemoList, setShowMemoList] = useState(false);
    const DeleteUrl = `http://localhost:8080/recipe/${id}/delete`;
    const navigate = useNavigate();
    const url = `http://localhost:8080/recipe/${id}`;
    const feedbackUrl = `http://localhost:8080/recipe/${id}/feedback`;

    useEffect(() => {
        console.log("fetch実行前");
        fetch(url)
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

    const createMemo = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newMemo = {
            description: formData.get('newmemo')
        }
        console.log("RecipeDetailの37行目です。" + newMemo.description);
        writeMemo(newMemo);
    };

    const writeMemo = (newMemo) => {
        fetch(feedbackUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMemo)
        }).then(res => {
            if (res.ok) {
                setMemo('');
            }
        }).catch(err => {
            console.error("\n\n\n\n\nメモの追加でエラー発生");
        });
    }

    const deleteRecipe = () => {
        fetch(DeleteUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            console.log(`Response status: ${res.status}`); // ステータスコードをログに出力
            if (res.ok) {
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
                    <button onClick={() => setShowMemoList(!showMemoList)} name='toggleMemoButton'>メモを見る</button>
                </div>
            </div>
            {showMemoList &&
                <div>
                    <h3>メモ一覧</h3>
                    <details>
                        <summary>メモを書く</summary>
                        <form onSubmit={createMemo}>
                            <textarea value={memo} onChange={(e) => setMemo(e.target.value)} name='newmemo' required />
                            <button type='submit'>メモを投稿</button>
                        </form>
                    </details>
                    <ul>
                        {recipe.feedbackList.map((memo, index) => (
                            <li key={index}>{memo.uploadDate}：{memo.description}</li>
                        ))}
                    </ul>
                </div>
            }
        </div >
    );
}

export default RecipeDetail;
