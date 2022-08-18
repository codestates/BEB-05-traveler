import { Card, Col, Image, Row, Space, Typography } from 'antd';
import React from 'react';
import collectionData from '../../asset/dummy/fakeposts.js';
import { useParams } from 'react-router-dom';
import mainImg from '../../../src/asset/dummy/image1.jpeg';
import mainImg2 from '../../../src/asset/dummy/image2.jpg';
import mainImg3 from '../../../src/asset/dummy/image3.png';
import mainImg4 from '../../../src/asset/dummy/image4.png';

const { Text } = Typography;

function PostDetail() {
  const pa = useParams();
  const filteredData = collectionData.filter((res) => res.content_id === pa.content_id);
  console.log(filteredData.title);

  const image_array = [mainImg, mainImg2, mainImg3, mainImg4];

  return (
    <Row justify="center" align="middle">
      <Col xs={24} xl={16}>
        <Row gutter={[8, 8]} type="flex">
          <Col flex={'1 1 30%'}>
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary">{filteredData[0].title}</Text>
              </Space>
            </Card>
          </Col>
          <Col flex={'1 1 70%'}>
            <Card size="large">
              <Image src={image_array[pa.content_id - 1]} style={{ width: '100%' }} />
            </Card>
            <Text type="secondary">{filteredData[0].content}</Text>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default PostDetail;
