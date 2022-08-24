import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../../style/theme';
import { Row, Card, List, Image, Space, Typography } from 'antd';
import postlist from '../../../src/asset/dummy/fakeposts';
import { FormOutlined } from '@ant-design/icons';

const { Title } = Typography;

const item_list = (list) => {
  let array = [];

  for (let i = 0; i < list.length; i++) {
    let el = list[i];
    let obj = {
      idx: `${i + 1}`,
      title: el.title,
      image: process.env.PUBLIC_URL + '/' + el.image,
      place_name: el.place_name,
      place_address: el.place_address,
      created_at: el.created_at,
      content: el.content,
    };
    array.push(obj);
  }
  return array;
};

const data = item_list(postlist.concat(postlist));
const { Meta } = Card;

const idx = (i) => {
  let result = Number(i) % 5;
  if (result === 0) {
    return 5;
  } else {
    return result;
  }
};

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

function Posts() {
  return (
    <Row justify="center" align="middle" wrap={true}>
      <Link to={'/posts/create'}>
        <button>
          <ButtonWrapper>
            <img src={process.env.PUBLIC_URL + '/sky.png'} style={{ width: '100%' }} />
            <ButtonText0>
              <ButtonText1>{'당신의 이야기를 들려주세요.'}</ButtonText1>
              <div
                style={{
                  color: `${theme.sky_blue}`,
                  fontSize: `${theme.fs_10}`,
                  fontWeight: `${theme.fw_300}`,
                }}
              >
                <IconText icon={FormOutlined} text="작성하기" />
              </div>
            </ButtonText0>
          </ButtonWrapper>
        </button>
      </Link>
      <TitleFont>
        <Title
          style={{
            marginTop: `${theme.space_7}`,
            marginBottom: `${theme.space_7}`,
            fontSize: `${theme.fs_14}`,
            fontWeight: `${theme.fw_700}`,
            color: `${theme.very_dark_blue_line}`,
          }}
        >
          Posts 🗂
        </Title>
      </TitleFont>
      <ListWrapper>
        <List
          grid={{
            gutter: 16,
            column: 4,
          }}
          pagination={{ onChange: (page) => {}, pageSize: 8 }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Link to={`/posts/${idx(item.idx)}`}>
                <PreviewImage>
                  <Card
                    style={{ width: '336px' }}
                    key={item.idx}
                    hoverable
                    cover={
                      <Image
                        alt="collection-card"
                        src={item.image}
                        preview={false}
                        style={{ objectFit: 'cover', height: 350 }}
                      />
                    }
                  >
                    <Meta title={item.title} description={item.place_name} />
                  </Card>
                </PreviewImage>
              </Link>
            </List.Item>
          )}
        />
      </ListWrapper>
    </Row>
  );
}

const ButtonText1 = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Nanum+Brush+Script&display=swap');
  font-family: 'Nanum Brush Script', cursive;
  font-size: ${theme.fs_19};
  font-weight: ${theme.fw_700};
  color: ${theme.very_dark_blue_line};
`;

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const ButtonText0 = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const PreviewImage = styled.span`
  width: 100%;
`;

const ListWrapper = styled.div`
  padding-right: 20px;
  padding-left: 20px;
  width: 100%;
`;

export default Posts;
