import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Section1 from '../pages/home/Section1';
import Section2 from '../pages/home/Section2';
import Section3 from '../pages/home/Section3';
import NotAuthorized from '../pages/NotAuthorized';
import MyPage from '../pages/MyPage/MyPage';
import MP_sec1 from '../pages/MyPage/MP_sec1';
import MP_sec2 from '../pages/MyPage/MP_sec2';
import Posts from '../pages/Posts/Posts';
import Market from '../pages/Market/Market';
import Create from '../pages/Create/Create';
import PostDetail from '../pages/Posts/PostDetail';
import PostEdit from '../pages/Posts/PostEdit';
import PostCreate from '../pages/Posts/PostCreate';
import NFTDetail from '../pages/Market/NFTDetail';

export default function Router({ token, userInfo }) {
  return (
    <Routes>
      <Route
        path="/"
        element={[
          <Section1 />,
          <Section2 state={{ token: token, userInfo: userInfo }} />,
          <Section3 />,
        ]}
      />
      <Route path="/posts" element={[<Posts />]} />
      <Route path="/posts/:content_id" element={<PostDetail />} />
      <Route path="posts/edit/:content_id" element={[<PostEdit />]} />
      <Route path="posts/create" element={[<PostCreate />]} />
      <Route path="/mypage" element={[<MyPage />, <MP_sec1 />, <MP_sec2 />]} />
      <Route path="/create" element={[<Create />]} />
      <Route path="/market" element={[<Market />]} />
      <Route path="/market/:content_id" element={<NFTDetail />} />
    </Routes>
  );
}
