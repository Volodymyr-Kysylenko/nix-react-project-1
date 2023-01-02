import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import CurrencyConverterPage from './pages/CurrencyСonverterPage';
import QuizPage from './pages/QuizPage';

import PhotoGrammPage from './pages/PhotoGrammPage';

export default function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='converter' element={<CurrencyConverterPage />} />
            <Route path='quiz' element={<QuizPage />} />
            <Route path='photogramm' element={<PhotoGrammPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}