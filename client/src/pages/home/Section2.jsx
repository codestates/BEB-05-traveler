import { Row, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import PostsList from './PostsList';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import axios from 'axios';


const item_list = (list) => {
  let array = [];

  for (let i = 0; i < list.length; i++) {
    let el = list[i];
    const enc = new TextDecoder('utf-8');
    let arr;
    if (el.image) {
      arr = new Uint8Array(el.image.data.data);
    }
    let obj = {
      idx: el.post_id,
      title: el.title,
      image: arr ? enc.decode(arr) : process.env.PUBLIC_URL + '/noImage.png',
      place_name: el.place_name,
      place_address: el.place_address,
      created_at: el.created_at,
      content: el.content,
    };
    array.push(obj);
  }
  return array;
};

const { Title } = Typography;
<<<<<<< HEAD
function Section2({ userInfo }) {
=======
function Section2({state}) {
>>>>>>> c9477c1c5ad9a489bfcd88aa897487c028c324a9
  const [postList, setPostList] = useState([]);
  const getPosts = async () => {
    console.log('get', userInfo);
    axios.get('http://localhost:4000/').then((res) => {
      setPostList(res.data.data.postInfo);
    });
  };

  useEffect(() => {
    getPosts();
<<<<<<< HEAD
  }, []);
=======
  },[state]);
>>>>>>> c9477c1c5ad9a489bfcd88aa897487c028c324a9

  const token = state.token;
  const userInfo = state.userInfo;
  const data = item_list(postList);

  return (
    <Row justify="center" align="middle" wrap={true}>
      <TitleFont>
        <Title
          style={{
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.brown}`,
          }}
        >
          Recent Posts
        </Title>
      </TitleFont>
      <List>
        <PostsList collectionData={data} state={{token: token, userInfo: userInfo}}/>
      </List>
    </Row>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Do+Hyeon&family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Do Hyeon', sans-serif;
  font-family: 'Nanum Pen Script', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  border-top: 0.1rem dotted black;
  padding-top: 40px;
  text-decoration: underline overline #decfac;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Section2;
