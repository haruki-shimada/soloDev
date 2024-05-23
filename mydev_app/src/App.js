import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import Recipe from './Recipe';
import RecipeDetail from './RecipeDetail';
import SearchBox from './SearchBox';
import EditRecipe from './editRecipe';

// ページの遷移が出来るようになっている。
// 遷移というより「パスに応じてマウントするコンポーネントを選択できるようになっている」
// というほうが正確？
function App() {
    return (
        <Routes>
            <Route exact path="/recipe" element={<Recipe />} />
            <Route exact path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/recipe/search" element={<SearchBox />} />
            <Route path="/recipe/create" element={<AddRecipe />} />
            <Route path="/recipe/:id/edit" element={<EditRecipe />} />
        </Routes>
    );
}

export default App;
