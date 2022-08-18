import { Result, Image, Row } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
import mainImg from '../../../src/asset/imgs/Recent_NFTs.png';

function Section3() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <Result icon={<SmileOutlined />} title="Great, we have done all the operations!" />
      <Image src={mainImg} alt="main image" preview={false} />
    </Row>
  );
}

export default Section3;
