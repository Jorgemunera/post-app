import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import {App} from '../containers/App';
import { NewPost } from '../containers/NewPost';

const Router = () => {
    return (
        <BrowserRouter>
        <NavBar/>
            <Routes>
                <Route exact path='/' Component={App}/>
                <Route exact path='/new-post' Component={NewPost}/>
            </Routes>
        </BrowserRouter>
    );
}

export {Router}