import { Result, Row, Col, Card, Image, Button, Typography} from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {WalletOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import mainImg from '../../../src/asset/dummy/image1.jpeg';
import mainImg2 from '../../../src/asset/dummy/image2.jpg';
import mainImg3 from '../../../src/asset/dummy/image3.png';
import mainImg4 from '../../../src/asset/dummy/image4.png';
import mainImg5 from '../../../src/asset/dummy/image5.png';

const image_array = [mainImg, mainImg2, mainImg3, mainImg4, mainImg5,mainImg, mainImg2, mainImg3, mainImg4, mainImg5];
const { Title } = Typography;

const returnBtn = (btnName) => {
    return (
        <Button shape="round" style={{margin:'auto',display:'inline-block'}}>{btnName}</Button>
    );
}

const returnNFTs = (image_array,btnName) => {
    return(
        <List>
            <Row gutter={[16, 16]}>
                {image_array.map((_, idx) => {
                    return (
                        <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
                        <Link to={`/posts/${idx+1}`}>
                        <PreviewImage>
                        <Card
                            hoverable
                            cover={
                            <Image
                                alt="collection-card"
                                src={image_array[idx]}
                                preview={false}
                                style={{ objectFit: 'cover', height: 350 }}
                            />
                            }
                        >
                            <Card.Meta
                                title={`NFT${idx} title`} 
                                style={{display: 'flex', width:500}}
                                description={
                                    <BTNWrapper>
                                        {returnBtn(btnName)}
                                    </BTNWrapper>
                                } 
                            />
                        </Card>
                        </PreviewImage>
                        </Link>
                        </Col>
                    );
                })}
            </Row>
        </List>
    );
}

const returnTitle = (text) => {
    return (
        <TitleFont>
            <Title
            style={{
                marginBottom: `${theme.space_2}`,
                marginTop: `${theme.space_2}`,
                fontSize: `${theme.fs_12}`,
                fontWeight: `${theme.fw_700}`,
                color: '#575E89',
            }}
            >
                {text}
            </Title>
        </TitleFont>
    );
}

function MP_sec2() {
    const { Meta } = Card;
    return (
        <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
            <div style={{width:'100%'}}>
                <TitleFont>
                    <Title
                    style={{
                        marginBottom: `${theme.space_2}`,
                        fontSize: `${theme.fs_14}`,
                        fontWeight: `${theme.fw_700}`,
                        color: `${theme.very_dark_blue_line}`,
                    }}
                    >
                    {"My NFT 🌄"}
                    </Title>
                </TitleFont>
            </div>
            {returnTitle("NFT for sale")}
            {returnNFTs(image_array,"등록 취소")}
            {returnTitle("NFT not for sale")}
            {returnNFTs(image_array,"판매 등록")}
        </Row>
    );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

const List = styled.div`
  padding-right: 20px;
  padding-left: 20px;
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