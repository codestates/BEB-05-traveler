import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import MyNFTPreview from './MyNFTPreview';
import styled from 'styled-components';

function MyNFTList({ collectionData, sellBool, token }) {
  console.log(collectionData, sellBool, token, '중간단계');
  useEffect(() => {}, [collectionData]);
  return (
    <Lists>
      <Row gutter={[16, 16]}>
        {collectionData.map((_, idx) => {
          return (
            <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
              <MyNFTPreview token={token} sellBool={sellBool} collectionData={_}></MyNFTPreview>
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

export default MyNFTList;
