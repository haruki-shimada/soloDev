import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/recipe">レシピアプリ</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/recipe">レシピ一覧</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/recipe/search">レシピ検索</Link>
                        </li>
                        {/* 他のページへのリンクを追加 */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
