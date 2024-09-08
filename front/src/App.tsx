import { createBrowserRouter } from 'react-router-dom';
import Header from './components/UI/Header';
import Main from './components/Main';
import LikedCats from './components/LikedCats';
import './index.css';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <Header />
                <Main/>
            </div>
        ),
    },
    {
        path: '/cats/liked',
        element: (
            <div>
                <Header />
                <LikedCats />
            </div>
        ),
    },
]);

