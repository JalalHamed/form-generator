import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import './global.css';
import { FormGenerator, FormsList } from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<FormsList />} />
          <Route path='/generate-form' element={<FormGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
