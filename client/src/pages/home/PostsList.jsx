import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import PostsPreview from './PostsPreview';
import styled from 'styled-components';

function PostsList({ collectionData }) {
  useEffect(() => {}, [collectionData]);
  return (
    <Lists>
      <Row gutter={[16, 16]}>
        {collectionData.map((_, idx) => {
          return (
            <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
              <PostsPreview collectionData={_}></PostsPreview>
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

export default PostsList;
