import { Input, Row, Col, Card, Image, Button, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { WalletOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

import mainImg from '../../../src/asset/dummy/image1.jpeg';
import mainImg2 from '../../../src/asset/dummy/image2.jpg';
import mainImg3 from '../../../src/asset/dummy/image3.png';
import mainImg4 from '../../../src/asset/dummy/image4.png';
import mainImg5 from '../../../src/asset/dummy/image5.png';

const { Title, Text } = Typography;

const returnTitle = (text) => {
  return (
    <TitleFont>
      <Title
        style={{
          marginBottom: `${theme.space_7}`,
          fontSize: `${theme.fs_14}`,
          fontWeight: `${theme.fw_700}`,
          color: `${theme.brown}`,
        }}
      >
        {text}
      </Title>
    </TitleFont>
  );
};

function MP_sec2({ state }) {
  const [collectionData1, setCollectionData1] = useState([]);
  const [nftInfo1, setNftInfo1] = useState([]);
  const [collectionData2, setCollectionData2] = useState([]);
  const [nftInfo2, setNftInfo2] = useState([]);

  const getNFTs = async () => {
    axios
      .get('http://localhost:4000/user/info', {
        headers: { authorization: state.token },
      })
      .then((res) => {
        console.log(res.data);
        setCollectionData1(res.data.user_nftInfo_sell);
        setCollectionData2(res.data.user_nftInfo_notsell);
      });
  };

  const getNFTInfo = async (collectionData, func) => {
    console.log('NFT 정보 찾기');
    const infoList = [];
    for (let i = 0; i < collectionData.length; i++) {
      axios.get(collectionData[i].link).then((res) => {
        console.log(res.data);
        const info = {
          img: `https://ipfs.io/ipfs/${res.data.image.split('//')[1]}`,
          name: res.data.name,
          desc: res.data.description,
          price: collectionData[i].price,
          content_id: collectionData[i].token_id,
        };
        infoList.push(info);
        func(infoList);
      });
    }
  };

  useEffect(() => {
    getNFTs();
    getNFTInfo(collectionData1, setNftInfo1);
    getNFTInfo(collectionData2, setNftInfo2);
  }, [state]);

  const { Meta } = Card;
  // 판매 등록 버튼 visible
  const [visible, setVisible] = useState(true);

  // 판매 등록 버튼 click handle 함수
  const handleClick1 = (e) => {
    setVisible(false);
  };

  const returnNFTs = (image_array, SellBool) => {
    console.log('hihi return NFTS');
    return (
      <List>
        <Row gutter={[16, 16]}>
          {image_array.map((nft, idx) => {
            return (
              <Col xs={12} xl={6}>
                <PreviewImage>
                  <Card
                    hoverable
                    cover={
                      <Image
                        alt="collection-card"
                        src={nft.img}
                        preview={false}
                        style={{ objectFit: 'cover', height: 350 }}
                      />
                    }
                  >
                    <div style={{ fontSize: `${theme.fs_3}`, width: '100%', textAlign: 'right' }}>
                      <Link to={`/market/${nft.content_id}`}>
                        <Text type="secondary" underline={true}>
                          상세보기
                        </Text>
                      </Link>
                    </div>
                    <Card.Meta
                      style={{ width: '100%' }}
                      title={
                        <div style={{ display: 'flex' }}>
                          <span>{nft.name}</span>
                        </div>
                      }
                      description={
                        SellBool ? (
                          <div style={{ width: '100%' }}>
                            <div>{`Price: ${nft.price}`}</div>
                            <BTNWrapper>
                              <Button
                                shape="round"
                                style={{ margin: 'auto', display: 'inline-block' }}
                              >
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
              </Col>
            );
          })}
        </Row>
      </List>
    );
  };

  return (
    <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
      <div style={{ width: '100%' }}>
        <TitleFont>
          <Title
            style={{
              marginBottom: `${theme.space_2}`,
              fontSize: `${theme.fs_14}`,
              fontWeight: `${theme.fw_700}`,
              color: `${theme.very_dark_blue_line}`,
            }}
          >
            {'My NFT 🌄'}
          </Title>
        </TitleFont>
      </div>
      {returnTitle('NFT for sale')}
      {returnNFTs(nftInfo1, true)}
      {returnTitle('NFT not for sale')}
      {returnNFTs(nftInfo2, false)}
    </Row>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  border-top: 0.1rem dotted black;
  padding-top: 40px;
  text-decoration: underline overline #decfac;
`;

const List = styled.div`
  //   padding-right: 20px;
  //   padding-left: 20px;
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

const PreviewImage = styled.span`
  width: 100%;
`;

export default MP_sec2;
