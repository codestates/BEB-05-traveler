import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import NFTPreview from './NFTPreview';
import styled from 'styled-components';

function NFTList({ collectionData }) {
  console.log(collectionData, 'yyoyoyoyo');
  useEffect(() => {}, [collectionData]);
  return (
    <Lists>
      <Row gutter={[16, 16]}>
        {collectionData.map((_, idx) => {
          return (
            <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
              <NFTPreview collectionData={_}></NFTPreview>
            </Col>
          );
        })}
      </Row>
    </Lists>
  );
}

const Lists = styled.div`
  padding-right: 20px;
  padding-left: 20px;
`;

export default NFTList;
