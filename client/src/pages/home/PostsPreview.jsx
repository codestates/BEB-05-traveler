import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PostsPreview({ collectionData, state }) {
  useEffect(() => {}, [collectionData,state]);
  const token = state.token;
  const userInfo = state.userInfo;

  return (
    
    <Link to={`/posts/${collectionData.idx}`} state={{token: token, userInfo: userInfo}}>
      <PreviewImage>
        <Card
          key={collectionData.idx}
          hoverable
          cover={
            <Image
              alt="collection-card"
              src={collectionData.image}
              preview={false}
              style={{ height: 350 }}
            />
          }
        >
          <Meta title={collectionData.title} description={collectionData.place_name} />
        </Card>
      </PreviewImage>
    </Link>
  );
}

const PreviewImage = styled.span`
  width: 100%;
`;

export default PostsPreview;
