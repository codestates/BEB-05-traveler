import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import PostsPreview from './PostsPreview';
import styled from 'styled-components';

function PostsList({ collectionData, state}) {
  useEffect(() => {}, [collectionData,state]);
  const token = state.token;
  const userInfo = state.userInfo;
  return (
    <Lists>
      <Row gutter={[16, 16]}>
        {collectionData.map((_, idx) => {
          return (
            <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
              <PostsPreview collectionData={_} state={{token : token, userInfo : userInfo}}></PostsPreview>
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
