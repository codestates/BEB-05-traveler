import { Image, Row } from 'antd';
import React from 'react';
import mainImg from '../../../src/asset/imgs/Recent_NFTs.png';

function Section3() {
  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <Image src={mainImg} alt="main image" preview={false} />
    </Row>
  );
}

export default Section3;