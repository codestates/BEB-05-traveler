import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { Input, Card, Image, Button, Typography } from 'antd';
import { theme } from '../../style/theme';
import axios from 'axios';

const { Text } = Typography;

function MyNFTPreview({ collectionData, sellBool, token }) {
  console.log(token, 'hihihihihi');
  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  useEffect(() => {
    getNFTInfo();
    console.log(sellBool);
    console.log(collectionData, sellBool, '다음은 여기');
  }, []);

  const [visible, setVisible] = useState(true);

  const handleClick1 = (e) => {
    setVisible(false);
  };

  const getNFTInfo = async () => {
    const response = await Axios.get(collectionData.link);
    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
  };

  const onAddToMarket = async () => {
    const res = await axios.post(
      'http://localhost:4000/token/sellnft',
      { token_id: collectionData.content_id, price: price },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  };

  const cancelMarket = async () => {
    const res = await axios.post(
      'http://localhost:4000/token/cancelsale',
      { token_id: collectionData.content_id, price: price },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  };

  return (
    <PreviewImage>
      <Card
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
        <div>
          <Link to={`/market/${collectionData.content_id}`}>
            <Text type="secondary" underline={true}>
              상세보기
            </Text>
          </Link>
        </div>
        <Card.Meta
          style={{ width: '100%' }}
          title={
            <div style={{ display: 'flex' }}>
              <span>{name}</span>
            </div>
          }
          description={
            sellBool ? (
              <div>
                <div>{`Price: ${collectionData.price}`}</div>
                <BTNWrapper>
                  <Button
                    shape="round"
                    style={{ margin: 'auto', display: 'inline-block' }}
                    onClick={cancelMarket}
                  >
                    {'등록 취소'}
                  </Button>
                </BTNWrapper>
              </div>
            ) : (
              <div>
                <div style={visible ? { display: 'none' } : {}}>
                  <Text
                    type="secondary"
                    style={{
                      width: '100%',
                      display: 'inline',
                      fontSize: `${theme.fs_3}`,
                    }}
                  >
                    {'가격 입력 : '}
                  </Text>
                  <Input
                    type="text"
                    style={{ width: '20%', height: '20px' }}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                  <span
                    style={{
                      display: 'inline-block',
                      textAlign: 'right',
                      paddingLeft: '30%',
                    }}
                  >
                    <Button shape="round" onClick={onAddToMarket}>
                      등록
                    </Button>
                  </span>
                </div>
                <BTNWrapper style={visible ? {} : { display: 'none' }}>
                  <Button
                    shape="round"
                    style={{ margin: 'auto', display: 'inline-block' }}
                    onClick={handleClick1}
                  >
                    {'판매 등록'}
                  </Button>
                </BTNWrapper>
              </div>
            )
          }
        />
      </Card>
    </PreviewImage>
  );
}

const PreviewImage = styled.div`
  width: 100%;
`;

const BTNWrapper = styled.div`
  display: flex;
  width: 500;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-left: 100px;
  margin-right: 25px;
`;

export default MyNFTPreview;
