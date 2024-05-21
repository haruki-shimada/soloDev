import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Recipe from './Recipe';
import RecipeDetail from './RecipeDetail';
import SearchBox from './SearchBox';

function App() {
    return (
        <Routes>
            <Route exact path="/recipe" element={<Recipe />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/search" element={<SearchBox />} />
        </Routes>
    );
}

export default App;
