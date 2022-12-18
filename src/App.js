import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CurrencyConverterPage from './pages/CurrencyСonverterPage';
import QuizPage from './pages/QuizPage';
import PhotoGrammPage from './pages/PhotoGrammPage';
import Layout from './pages/Layout';

export default function App() {
  return (
    <main className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='/converter' element={<CurrencyConverterPage />} />
            <Route path='/quiz' element={<QuizPage />} />
            <Route path='/photogramm' element={<PhotoGrammPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </main >
  );
}