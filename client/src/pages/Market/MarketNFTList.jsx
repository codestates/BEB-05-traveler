import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import MarketNFTPreivew from './MarketNFTPreview';

function MarketNFTList({ collectionData, token }) {
  useEffect(() => {}, [collectionData]);
  return (
    <Row gutter={[16, 16]}>
      {collectionData.map((_, idx) => {
        return (
          <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
            <MarketNFTPreivew collectionData={_} token={token}></MarketNFTPreivew>
          </Col>
        );
      })}
    </Row>
  );
}

export default MarketNFTList;
