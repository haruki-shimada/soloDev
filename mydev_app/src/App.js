import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import RecipeDetail from './RecipeDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Recipe />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
