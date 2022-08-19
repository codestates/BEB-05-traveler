import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Section1 from '../pages/home/Section1';
import Section2 from '../pages/home/Section2';
import Section3 from '../pages/home/Section3';
import NotAuthorized from '../pages/NotAuthorized';
import MyPage from '../pages/MyPage/MyPage';
import Posts from '../pages/Posts/Posts';
import Market from '../pages/Market/Market';
import Create from '../pages/Create/Create';
import PostDetail from '../pages/Posts/PostDetail';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={[<Section1 />, <Section2 />, <Section3 />]} />
      <Route path="/posts" element={[<Posts />, <NotAuthorized />]} />
      <Route path="/posts/:content_id" element={<PostDetail />} />
      <Route path="/mypage" element={[<MyPage />, <NotAuthorized />]} />
      <Route path="/create" element={[<Create />]} />
      <Route path="/market" element={[<Market />, <NotAuthorized />]} />
    </Routes>
  );
}
