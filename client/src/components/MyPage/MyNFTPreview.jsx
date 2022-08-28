import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
import { Input, Row, Col, Card, Image, Button, Typography } from 'antd';
import { theme } from '../../style/theme';

const { Title, Text } = Typography;

function MyNFTPreview({ collectionData, sellBool }) {
  const [Img, setImg] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
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
    console.log(response, '응답');
    setImg(`https://ipfs.io/ipfs/${response.data.image.split('//')[1]}`);
    setName(response.data.name);
    setDesc(response.data.description);
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
            // style={{ objectFit: 'cover', height: 350 }}
          />
        }
      >
        <div style={{ fontSize: `${theme.fs_3}`, width: '100%', textAlign: 'right' }}>
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
              <div style={{ width: '100%' }}>
                <div>{`Price: ${collectionData.price}`}</div>
                <BTNWrapper>
                  <Button shape="round" style={{ margin: 'auto', display: 'inline-block' }}>
                    {'등록 취소'}
                  </Button>
                </BTNWrapper>
              </div>
            ) : (
              <div style={{ width: '100%' }}>
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
                  <Input type="text" style={{ width: '20%', height: '20px' }} />
                  <span
                    style={{
                      display: 'inline-block',
                      textAlign: 'right',
                      paddingLeft: '30%',
                    }}
                  >
                    <Button shape="round">등록</Button>
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

const Summary = styled.span`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

export default MyNFTPreview;
