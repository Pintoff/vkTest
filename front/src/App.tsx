import { createBrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/UI/Header';
import Main from './components/Main';
import LikedCats from './components/LikedCats';
import './index.css';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

export const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <div>
            <Header />
            <Main />
          </div>
        </PrivateRoute>
      ),
    },
    {
      path: '/cats/liked',
      element: (
        <PrivateRoute>
          <div>
            <Header />
            <LikedCats />
          </div>
        </PrivateRoute>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/login" />,
    },
  ]);  
