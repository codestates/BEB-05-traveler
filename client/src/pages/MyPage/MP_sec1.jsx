import { Modal, Row, Button } from 'antd';
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
import { Link, useLocation } from 'react-router-dom';

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
    if (user.state.token !== ''){
      console.log("get post by id")
      axios
        .get("http://localhost:4000/board/postbyid",{
          headers: {authorization: userObject["token"]}
        })
        .then((res) => {
          setPostList(res.data.data);
        });
    }
  }
  
  useEffect(() => {
    getPosts();
  },[]);

  // 삭제 모달 관련
  const [visible, setVisible] = useState(false);
  const showModal = () => {setVisible(true);};
  const handleOk = (e) => {};
  const handleCancel = (e) => {};
  const [postId, setPostId] = useState();
  const onDelete = () => {
    console.log("delete", postId);
    axios
      .post("http://localhost:4000/board/post_delete",{
        post_id: postId
      },{
        headers: {authorization: userObject["token"]}
      })
      .then((res) => {
        console.log("응답");
        if (res.status === 200) {window.alert("삭제 완료 되었습니다."); window.location.reload();}
        else {window.alert("삭제 실패 되었습니다."); window.location.reload();}
      });
  }
  
  const data = item_list(postList);
  return (
    <div>
        <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" shape="round" onClick={() => {onDelete(); setVisible(false);}}>
              삭제
            </Button>,
            <Button key="submit" shape="round" onClick={()=>{setVisible(false)}}>
              취소
            </Button>,
          ]}
      >
        <p>해당 게시물을 삭제 하시겠습니까? 게시글 삭제시 지급된 토큰이 반환 됩니다.</p>
      </Modal>
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
            style={{width: '100%'}}
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
                  <Link to={'/posts/edit/' + item.idx} state={userObject}>
                    <IconText icon={EditOutlined} text="수정" />
                  </Link>,
                  <button onClick={(e)=>{e.preventDefault(); showModal(); setPostId(item.idx);}}>
                  <IconText icon={DeleteOutlined} text="삭제" />
                  </button>
                ]}
              >
                <List.Item.Meta
                  title={
                    <Link
                      to={'/posts/' + item.idx}
                      state={userObject}
                      style={{ fontSize: '18px', color: '#464646' }}
                    >
                      {item.title}
                    </Link>
                  }
                  avatar={<Image src={item.image} width={500} alt="logo" preview={true} />}
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
  width: 100%;
  overflow:hiddlen; 
  word-break:break-all;
`;

const ListWrapper = styled.div`
  width: 100%;
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
