import { Result, Row } from 'antd';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import { Typography, Space, List, Image, Tag } from 'antd';
import { useLocation } from 'react-router-dom';


const { Title } = Typography;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const item_list = (list) => {
  let array = [];

  for (let i=0; i<list.length; i++) {
      let el = list[i];
      const enc = new TextDecoder("utf-8");
      let arr;
      if (el.image) {arr = new Uint8Array(el.image.data.data)};
      let obj = {
          idx: el.post_id,
          title: el.title,
          image: arr ? enc.decode(arr) : process.env.PUBLIC_URL + "/noImage.png",
          place_name: el.place_name,
          place_address: el.place_address,
          created_at: el.created_at,
          content: el.content,
      };
      array.push(obj);
  }
  return array;
};
function MP_sec1() {
  const location = useLocation();
  const user = location;
  const userObject = user.state

  const [postList, setPostList] = useState([]);
  const getPosts = async () => {
    console.log("get post by id")
    axios
      .get("http://localhost:4000/board/postbyid",{
        headers: {authorization: userObject["token"]}
      })
      .then((res) => {
        setPostList(res.data.data);
      });
  }
  
  useEffect(() => {
    getPosts();
  },[]);
  
  const data = item_list(postList);
  return (
    <div>
      <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
        <TitleFont>
          <Title
            style={{
              marginBottom: `${theme.space_5}`,
              fontSize: `${theme.fs_14}`,
              fontWeight: `${theme.fw_700}`,
              color: `${theme.very_dark_blue_line}`,
            }}
          >
            {'My Posts 🗂'}
          </Title>
        </TitleFont>
        <ListWrapper>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <a href={'http://localhost:3000/posts/edit/' + item.idx}>
                    <IconText icon={EditOutlined} text="수정" />
                  </a>,
                  <IconText icon={DeleteOutlined} text="삭제" />,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a
                      href={'http://localhost:3000/posts/' + item.idx}
                      style={{ fontSize: '18px', color: '#464646' }}
                    >
                      {item.title}
                    </a>
                  }
                  avatar={<Image src={item.image} width={272} alt="logo" preview={true} />}
                  description={
                    <>
                      <div>{item.created_at}</div>
                      <div>
                        <IconText icon={PushpinOutlined} text={item.place_name} />
                      </div>
                      <div>
                        <IconText icon={EnvironmentOutlined} text={item.place_address} />
                      </div>
                    </>
                  }
                />
                <div style={{ fontSize: `${theme.fs_5}` }}>{item.content}</div>
              </List.Item>
            )}
          />
        </ListWrapper>
      </Row>
    </div>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.65);
  margin-right: 20px;
  margin-left: 20px;
  padding-left: 200px;
  padding-right: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default MP_sec1;
