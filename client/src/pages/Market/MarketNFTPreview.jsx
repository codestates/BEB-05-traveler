import { Card, Image } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';

function MarketNFTPreivew({ collectionData }) {
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
    <Link to={`/market/${collectionData.content_id}`}>
      <PreviewImage>
        <Card
          key={collectionData.name}
          hoverable
          cover={<Image alt="collection-card" src={Img} preview={false} style={{ height: 500 }} />}
        >
          <Summary>
            <Meta title={name} description={desc} />
          </Summary>
        </Card>
      </PreviewImage>
    </Link>
  );
}

const PreviewImage = styled.div`
  width: 100%;
`;

const Summary = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

export default MarketNFTPreivew;
