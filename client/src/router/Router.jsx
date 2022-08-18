import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Section1 from '../pages/home/Section1';
import Section2 from '../pages/home/Section2';
import Section3 from '../pages/home/Section3';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={[<Section1 />, <Section2 />, <Section3 />]} />
    </Routes>
  );
}
