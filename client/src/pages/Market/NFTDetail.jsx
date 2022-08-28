import { Card, Col, Image, Row, Space, Typography, Button, Avatar, Switch } from 'antd';
import {
  HeartTwoTone,
  CheckCircleTwoTone,
  SmileTwoTone,
  EyeOutlined,
  HeartFilled,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import collectionData from '../../asset/dummy/fakeNFT';
import Axios from 'axios';
import styled from 'styled-components';
import eth from '../../asset/imgs/ethereum-icon-2.jpg';
import { theme } from '../../style/theme';
import axios from 'axios';

import { useLocation } from 'react-router-dom';

const { Text } = Typography;
const { Title } = Typography;
const { Meta } = Card;

function NFTDetail() {
  const location = useLocation();
  const user = location;

  const [num, setNum] = useState('');
  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    getNFTInfo();
  }, [collectionData]);

  const onBuy = async () => {
    const res = await axios.post(
      'http://localhost:4000/token/buynft',
      {
        token_id: user.state.collectionData.token_id,
        user_id: user.state.collectionData.user_id,
        price: user.state.collectionData.price,
      },
      {
        headers: { authorization: `Bearer ${user.state.token}` },
      }
    );
  };

  const getNFTInfo = async () => {
    setNum(user.state.collectionData.token_id);
    const response = await Axios.get(user.state.collectionData.token_uri);

    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
    setPrice(user.state.collectionData.price);
    setUsername(user.state.collectionData.user_id);
  };
  return (
    <Lists>
      <Row justify="center" align="middle">
        <Col xs={24} xl={16}>
          <Row gutter={[8, 8]} type="flex">
            <Col flex={'1 1 40%'} align="center">
              <Card
                style={{ width: 500 }}
                cover={<img alt="example" src={Img} />}
                actions={[
                  <SmileTwoTone key="setting" />,
                  <HeartTwoTone twoToneColor="#eb2f96" />,
                  <CheckCircleTwoTone twoToneColor="#52c41a" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={name}
                  description={desc}
                />
              </Card>
            </Col>
            <Col flex={'1 1 60%'}>
              <Card>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Row gutter={[8, 8]} type="flex">
                    <Title keyboard style={{ marginLeft: 20, marginTop: 20, marginBottom: 20 }}>
                      NFT#{num}
                    </Title>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Text type="primary" style={{ marginLeft: 20, marginTop: 20, fontSize: 20 }}>
                      owned by {username}
                    </Text>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Text type="primary" style={{ marginLeft: 20, marginBottom: 40, fontSize: 20 }}>
                      <EyeOutlined /> 1.5K views
                      <HeartFilled style={{ color: '#EE4B2B', marginLeft: 20 }} /> 67 favorites
                    </Text>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Col flex={'1 1 10%'}>
                      <Image src={eth} alt="main image" preview={false} style={{ width: 90 }} />
                    </Col>
                    <Col flex={'1 1 90%'}>
                      <Price>
                        <Text>Current Price: {price}</Text>
                      </Price>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Button
                      danger
                      size="large"
                      type="primary"
                      onClick={onBuy}
                      style={{
                        marginLeft: 20,
                        marginTop: 60,
                        marginBottom: 20,
                        fontFamily: 'sans-serif',
                        fontSize: 20,
                      }}
                    >
                      NFT 구매
                    </Button>
                  </Row>
                </Space>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Lists>
  );
}

const Lists = styled.div`
  margin-top: 180px;
  margin-bottom: 150px;
`;

const Price = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: ${theme.fw_700};
  color: ${theme.black};
  letter-spacing: -1px;
  white-space: nowrap;
  font-size: ${theme.fs_13};
`;

export default NFTDetail;
