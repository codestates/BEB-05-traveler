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
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import styled from 'styled-components';
import eth from '../../asset/imgs/eth_icon.png';

const { Text } = Typography;
const { Title } = Typography;
const { Meta } = Card;

function NFTDetail() {
  const pa = useParams();
  const [num, setNum] = useState('');
  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('1 ETH');
  useEffect(() => {
    getNFTInfo();
  }, [collectionData]);

  const onBuy = async () => {
    alert('구매구매');
  };

  const getNFTInfo = async () => {
    setNum(pa.content_id);
    const response = await Axios.get(collectionData[pa.content_id - 1].link);

    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
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
                    <Title keyboard style={{ marginTop: 20, marginBottom: 20 }}>
                      NFT#{num}
                    </Title>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Text type="primary" style={{ marginTop: 20, fontSize: 20 }}>
                      owned by {name}
                    </Text>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Text type="primary" style={{ marginBottom: 40, fontSize: 20 }}>
                      <EyeOutlined /> 1.5K views
                      <HeartFilled style={{ color: '#EE4B2B', marginLeft: 20 }} /> 67 favorites
                    </Text>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Col flex={'1 1 10%'}>
                      <Image src={eth} alt="main image" preview={false} style={{ width: 70 }} />
                    </Col>
                    <Col flex={'1 1 90%'}>
                      <Text
                        type="primary"
                        style={{
                          marginTop: 30,
                          marginBottom: 20,
                          fontSize: 40,
                          font: '',
                        }}
                      >
                        Current Price: {price}
                      </Text>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]} type="flex">
                    <Button
                      danger
                      size="large"
                      type="primary"
                      onClick={onBuy}
                      style={{
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
  margin-top: 100px;
  margin-bottom: 100px;
`;

export default NFTDetail;
