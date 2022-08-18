import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import { useEffect, useState } from 'react';
import mainImg from '../../../src/asset/dummy/image1.jpeg';
import mainImg2 from '../../../src/asset/dummy/image2.jpg';
import mainImg3 from '../../../src/asset/dummy/image3.png';
import mainImg4 from '../../../src/asset/dummy/image4.png';

function PostsPreview({ collectionData }) {
  const image_array = [mainImg, mainImg2, mainImg3, mainImg4];

  return (
    <Card
      key={collectionData.name}
      hoverable
      cover={
        <Image
          alt="collection-card"
          src={image_array[collectionData.content_id - 1]}
          preview={false}
          style={{ objectFit: 'cover', width: 500, height: 300 }}
        />
      }
    >
      <Meta title={collectionData.title} description={collectionData.place_name} />
    </Card>
  );
}

export default PostsPreview;
