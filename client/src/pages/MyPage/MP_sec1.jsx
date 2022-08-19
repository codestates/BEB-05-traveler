import { Result, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {FormOutlined, EditOutlined, DeleteOutlined, PushpinOutlined, EnvironmentOutlined} from '@ant-design/icons';
import { Button, Space, List,Image, Tag} from 'antd';
import postlist from '../../../src/asset/dummy/fakeposts';

const item_list = (list) => {
    let array = [];

    for (let i=0; i<list.length; i++) {
        let el = list[i];
        let obj = {
            href: `http://localhost:3000/posts/${i+1}`,
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
  return (
    <div>
        <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
            <Result icon={<FormOutlined />} title="========== My Posts ==========" />
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
                        <IconText icon={EditOutlined} text="수정" />,
                        <IconText icon={DeleteOutlined} text="삭제" />,
                        ]}
                    >
                        <List.Item.Meta
                            title={<a href={item.href} style={{fontSize:'18px', color:'#464646'}}>{item.title}</a>}
                            avatar={<Image src={item.avatar} width={272} alt="logo" preview={true} />}
                            description = {
                                <>  
                                    <div>{"created at: " + item.created_at}</div>
                                    <div><IconText icon={PushpinOutlined} text={item.place_name}/></div>
                                    <div><IconText icon={EnvironmentOutlined} text={item.place_address}/></div>
                                </>
                            }
                        />
                        {item.content}
                    </List.Item>
                    )}
                />
            </ListWrapper>
        </Row>
    </div>
    
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  background-color: rgba( 255, 255, 255, 0.65 );
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export default MP_sec1;