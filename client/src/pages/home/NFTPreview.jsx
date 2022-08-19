import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';

function PostsPreview({ collectionData }) {
  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  useEffect(() => {
    getNFTInfo();
  }, [collectionData]);

  const getNFTInfo = async () => {
    console.log(collectionData);
    const response = await Axios.get(collectionData.link);

    console.log(response.data.image);

    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
  };

  return (
    <PreviewImage>
      <Card
        key={collectionData.name}
        hoverable
        cover={
          <Image
            alt="collection-card"
            src={Img}
            preview={false}
            style={{ objectFit: 'cover', height: 350 }}
          />
        }
      >
        <Meta title={name} description={desc} />
      </Card>
    </PreviewImage>
  );
}

const PreviewImage = styled.span`
  width: 100%;
`;

export default PostsPreview;
