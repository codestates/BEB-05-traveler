import { Card, Col, Image, Row, Space, Typography, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import collectionData from '../../asset/dummy/fakeNFT';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const { Text } = Typography;

function NFTDetail() {
  const pa = useParams();
  console.log(pa, 'yoyoyoyo');
  // const filteredData = collectionData.filter((res) => res.content_id === pa.content_id);
  // console.log(filteredData);

  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  useEffect(() => {
    getNFTInfo();
  }, [collectionData]);

  const onBuy = async () => {
    alert('구매구매');
  };

  const getNFTInfo = async () => {
    console.log(collectionData[pa - 1]);
    const response = await Axios.get(collectionData[pa.content_id - 1].link);

    console.log(response.data.image);

    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
  };
  return (
    <Row justify="center" align="middle">
      <Col xs={24} xl={16}>
        <Row gutter={[8, 8]} type="flex">
          <Col flex={'1 1 70%'}>
            <Card size="large">
              <Image src={Img} />
            </Card>
            <Text type="secondary">{desc}</Text>
          </Col>
          <Col flex={'1 1 30%'}>
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary">{name}</Text>
                <Button type="primary" onClick={onBuy}>
                  NFT 구매
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default NFTDetail;
