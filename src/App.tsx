import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
