import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PostsPreview({ collectionData }) {

  return (
    <Link to={`/posts/${collectionData.post_id}`}>
      <PreviewImage>
        <Card
          key={collectionData.post_id}
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
