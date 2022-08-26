import { Col, Image, Row, Space, Typography } from 'antd';
import React, {useState, useEffect} from 'react';
import {PushpinOutlined, EnvironmentOutlined, UserOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const { Text } = Typography;

function PostDetail() {
  const location = useLocation();
  const user = location.state;
  const post_id = location.pathname.split("/").pop();

  const [postObject, setPostObject] = useState({
    title: '',
    place_name: '',
    place_address: '' ,
    content: '',
    user_id: '',
    created_at: '',
  });

  const getPost = async () => {
    console.log("get post by post id")
    axios
      .get(`http://localhost:4000/board/post/${post_id}`,{
      })
      .then((res) => {
        setPostObject(res.data.data[0]);
      });
  }


  useEffect(() => {
    getPost();
  },[]);

  const title = postObject.title;
  const place = postObject.place_name;
  const address = postObject.place_address;
  const content = postObject.content;
  const nickname = postObject.user_id;   // 나중에 nickname으로 변경!
  const time = postObject.created_at;
  const enc = new TextDecoder("utf-8");
  let arr;
  if (postObject.image) {arr = new Uint8Array(postObject.image.data.data)};
  const image = arr ? enc.decode(arr) : process.env.PUBLIC_URL + "/noImage.png"

  const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
  );
  
  const onDelete = () => {
    axios
      .post("http://localhost:4000/board/post_delete",{
        post_id: post_id
      },{
        headers: {authorization: user.token}
      })
      .then((res) => {
        console.log(res);
      });
  }
    
  return (
    <Row justify="left" align="middle">
      <Wrapper>
        <TextWrapper>
          <Col flex={2}>
            <Space direction="vertical">
              <TitleFont style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_8}`, color: '#424242'}}>{title}</TitleFont>
              <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><PushpinOutlined style={{paddingTop: '4px'}}/>&nbsp;{place}</Text>
              <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><EnvironmentOutlined style={{paddingTop: '4px'}}/>&nbsp;{address}</Text>
            </Space>
          </Col>
        </TextWrapper>
        <CardWrapper>
          <Col flex={3} style={{width: '800px', paddingTop:'10px', paddingBottom: '10px'}}>
            <Image src={image} style={{paddingBottom:'10px', objectFit: 'cover'}}/>
            <div style={{textAlign: 'left', whiteSpace: 'nowrap'}}>
              <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><UserOutlined style={{paddingTop: '4px'}}/>&nbsp;{nickname}</Text>
              <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}>&ensp;&ensp;{time}</Text>
            </div>
            <div style={{textAlign: 'left'}}>
              <Text style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_6}`, marginTop:'10px'}}>{content}</Text>
            </div>
            {user.userInfo.user_id === nickname & user.userInfo.user_id !== '' ?
              <div style={{textAlign: 'right', whiteSpace: 'nowrap'}}>
                <Link to={"/posts/edit/"+ post_id} state={location.state}><IconText icon={EditOutlined} text="수정" /></Link>
                <Space>&ensp;&ensp;</Space>
                <button onClick={onDelete}><IconText icon={DeleteOutlined} text="삭제" /></button>
              </div>
              : <div></div>
            }
          </Col>
        </CardWrapper>
      </Wrapper>
    </Row>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 40px;
  margin-right: 20px;
  margin-left: 20px;
  padding-left: 20px;
  padding-right: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
`;


const TextWrapper = styled.div`
  color: ${theme.very_dark_blue_line};
  z-index: 1000;
  a:link,
  a:visited,
  a:active,
  a:hover {
    text-decoration: none;
    color: ${theme.very_dark_blue_line};
  }
  text-align: center;
  height: 100%;
  margin-right: 20px;
`;

const CardWrapper = styled.div`
  color: ${theme.very_dark_blue_line};
  z-index: 1000;
  a:link,
  a:visited,
  a:active,
  a:hover {
    text-decoration: none;
    color: ${theme.very_dark_blue_line};
  }
  width: 90%;
  display : flex;
  border-left: 1px solid;
  padding-left: 30px;
  text-align: center;
`;


const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Sunflower&display=swap');
  font-family: 'Sunflower', sans-serif;

  text-align: center;
  font-weight: 400;
`;

export default PostDetail;

