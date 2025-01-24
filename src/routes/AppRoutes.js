import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../Layout/MainLayout';
import { Products } from '../pages/Products';
import { Categories } from '../pages/Categories';
import Units from '../pages/Units';

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
