import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import RecipeDetail from './RecipeDetail';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Recipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
    );
}

export default App;
