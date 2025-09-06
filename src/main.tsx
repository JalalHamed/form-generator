import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components';
import './global.css';
import { Form, FormGenerator, FormsList } from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<FormsList />} />
          <Route path='/generate-form' element={<FormGenerator />} />
          <Route path='forms/:id' element={<Form />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
