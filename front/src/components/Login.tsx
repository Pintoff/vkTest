import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/login', {
        login,
        password,
      });
      const { token } = response.data;
      loginUser(token);
      navigate('/');
    } catch (error) {
      setError('Неверный логин или пароль');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/user', {
        login,
        password,
      });
      const { token } = response.data;
      loginUser(token);
      navigate('/');
    } catch (error) {
      setError('Ошибка регистрации: пользователь с таким логином уже существует');
    }
  };

  return (
    <form className="login-form">
      <div>
        <label>Логин:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>Зайти</button>
      <button type="button" onClick={handleRegister}>Зарегистрироваться</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default Login;