import { Col, Image, Row, Space, Typography } from 'antd';
import React, {useState} from 'react';
import collectionData from '../../asset/dummy/fakeposts.js';
import {PushpinOutlined, EnvironmentOutlined, UserOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

function PostDetail() {
  const location = useLocation();
  console.log(location);
  
  const pa = useParams();
  const filteredData = collectionData.filter((res) => res.content_id === pa.content_id);
  const title = filteredData[0].title;
  const place = filteredData[0].place_name;
  const address = filteredData[0].place_address;
  const content = filteredData[0].content;
  const nickname = filteredData[0].user_id;   // 나중에 nickname으로 변경!
  const time = filteredData[0].created_at;
  const image = process.env.PUBLIC_URL + "/" +filteredData[0].image;
  const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
  );
  // post의 수정 권한이 있는 경우만 수정, 삭제 버튼 보이도록 할 예정
  const [visible, setVisible] = useState(true);


  return (
    // <Row justify="left" align="middle">
    //   <Wrapper>
    //     <TextWrapper>
    //       <Col flex={2}>
    //         <Space direction="vertical">
    //           <TitleFont style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_8}`, color: '#424242'}}>{title}</TitleFont>
    //           <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><PushpinOutlined style={{paddingTop: '4px'}}/>&nbsp;{place}</Text>
    //           <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><EnvironmentOutlined style={{paddingTop: '4px'}}/>&nbsp;{address}</Text>
    //         </Space>
    //       </Col>
    //     </TextWrapper>
    //     <CardWrapper>
    //       <Col flex={3} style={{width: '800px', paddingTop:'10px', paddingBottom: '10px'}}>
    //         <Image src={image} style={{paddingBottom:'10px', objectFit: 'cover'}}/>
    //         <div style={{textAlign: 'left', whiteSpace: 'nowrap'}}>
    //           <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><UserOutlined style={{paddingTop: '4px'}}/>&nbsp;{nickname}</Text>
    //           <Text type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}>&ensp;&ensp;{time}</Text>
    //         </div>
    //         <div style={{textAlign: 'left'}}>
    //           <Text style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_6}`, marginTop:'10px'}}>{content}</Text>
    //         </div>
    //         <div style={{textAlign: 'right', whiteSpace: 'nowrap'}} visible={visible}>
    //           <a href={"http://localhost:3000/posts/edit/"+ pa.content_id}><IconText icon={EditOutlined} text="수정" /></a>
    //           <Space>&ensp;&ensp;</Space>
    //           <IconText icon={DeleteOutlined} text="삭제" />
    //         </div>
    //       </Col>
    //     </CardWrapper>
    //   </Wrapper>
    // </Row>
  1);
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

