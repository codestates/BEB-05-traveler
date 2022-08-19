import { Result, Row, Col, Card, Image, Button, Pagination} from 'antd';
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

function MP_sec2() {
    const { Meta } = Card;
    return (
        <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
            <Result icon={<WalletOutlined />} title="========== My NFTs ==========" />
            <List>
                <Row gutter={[16, 16]}>
                    {image_array.map((_, idx) => {
                        return (
                            <Col xs={12} xl={6} key={Symbol(idx + 1).toString()}>
                            <Link to={`/posts/${idx+1}`}>
                            <Card
                                hoverable
                                cover={
                                <Image
                                    alt="collection-card"
                                    width={100}
                                    src={image_array[idx]}
                                    preview={false}
                                    style={{ objectFit: 'cover', width: 500, height: 300 }}
                                />
                                }
                            >
                                <Meta
                                    title={`NFT${idx} title`} 
                                    style={{display: 'flex', width:500}}
                                    description={
                                        <BTNWrapper>
                                            <Button shape="round" style={{margin:'auto',display:'inline-block'}}>판매 등록</Button>
                                        </BTNWrapper>
                                    } 
                                />
                            </Card>
                            </Link>
                            </Col>
                        );
                    })}
                </Row>
            </List>
        </Row>
    );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin
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

export default MP_sec2;