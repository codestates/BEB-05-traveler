import { Result, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {EditOutlined, DeleteOutlined, PushpinOutlined, EnvironmentOutlined} from '@ant-design/icons';
import {Typography, Space, List,Image, Tag} from 'antd';
import postlist from '../../../src/asset/dummy/fakeposts';

const item_list = (list) => {
    let array = [];

    for (let i=0; i<list.length; i++) {
        let el = list[i];
        let obj = {
            idx: `${i+1}`,
            title: el.title,
            avatar: process.env.PUBLIC_URL + el.image,
            place_name: el.place_name,
            place_address: el.place_address,
            created_at: el.created_at,
            content: el.content,
        };
        array.push(obj);
    }
    return array;
}

const data = item_list(postlist);

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function MP_sec1() {
    const { Title } = Typography;
    return (
    <div>
        <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
            <TitleFont>
                <Title
                    style={{
                        marginBottom: `${theme.space_5}`,
                        fontSize: `${theme.fs_14}`,
                        fontWeight: `${theme.fw_700}`,
                        color: `${theme.very_dark_blue_line}`,
                    }}
                    >
                    {"My Posts 🗂"}
                </Title>
            </TitleFont>
            <ListWrapper>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                        <a href={"http://localhost:3000/posts/edit/"+ item.idx}><IconText icon={EditOutlined} text="수정" /></a>,
                        <IconText icon={DeleteOutlined} text="삭제" />,
                        ]}
                    >
                        <List.Item.Meta
                            title={<a href={"http://localhost:3000/posts/"+item.idx} style={{fontSize:'18px', color:'#464646'}}>{item.title}</a>}
                            avatar={<Image src={item.avatar} width={272} alt="logo" preview={true} />}
                            description = {
                                <>  
                                    <div>{item.created_at}</div>
                                    <div><IconText icon={PushpinOutlined} text={item.place_name}/></div>
                                    <div><IconText icon={EnvironmentOutlined} text={item.place_address}/></div>
                                </>
                            }
                        />
                        <div style={{fontSize: `${theme.fs_5}`,}}>
                            {item.content}
                        </div>
                    </List.Item>
                    )}
                />
            </ListWrapper>
        </Row>
    </div>
    );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
`;


const ListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  background-color: rgba( 255, 255, 255, 0.65 );
  margin-right: 20px;
  margin-left: 20px;
  padding-left: 200px;
  padding-right: 200px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default MP_sec1;