import { Result, Row, Form, Input, Button, Select} from 'antd';
import React, {useState} from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import {DollarOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const address = "0x12B345f752DAD296371A07EA86931096E7f9BdEb";
const amount = 1000;
const { Option } = Select;

function MyPage() {
  const [optionVal, setOptionVal] = useState(null);

  const handleChange = (value) => {
    setOptionVal(value);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showForm = (value) => {
    if (value === "0"){
      return(
        <Form
        name="transfer"
        labelCol={{span: 8}}
        wrapperCol={{span: 8}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
          label="ID"
          name="ID"
          rules={[{required: true,message: 'ID를 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="전송량"
          name="amount"
          rules={[{required: true,message: '전송량을 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          전송
        </Button>
        </Form>
      )
    }
    if (value === "1") {
      return(
        <Form
        name="transfer"
        labelCol={{span: 8}}
        wrapperCol={{span: 8}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
          label="닉네임"
          name="Nick"
          rules={[{required: true,message: '닉네임을 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="전송량"
          name="amount"
          rules={[{required: true,message: '전송량을 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          전송
        </Button>
        </Form>
      )
    }
    if (value === "2") {
      return(
        <Form
        name="transfer"
        labelCol={{span: 8}}
        wrapperCol={{span: 8}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
          label="주소"
          name="Add"
          rules={[{required: true,message: '주소를 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="전송량"
          name="amount"
          rules={[{required: true,message: '전송량을 입력하세요.'}]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          전송
        </Button>
        </Form>
      )
    }
  }

  return (
    <div>
      <div style={{textAlign: "center"}}><Title>닉네임님의 페이지 &#40;ID: abcd123&#41;</Title></div>
      <Row gutter={[8, 8]} justify="center" align="middle" wrap={true}>
        <Result icon={<DollarOutlined />} title="========== My Token ==========" />
        <Wrapper>
          <ElWrapper>
            <h1>{`내 주소: ${address}`}</h1>
          </ElWrapper>
          <ElWrapper>
            <h1>{`토큰 잔액: ${amount}`}</h1>
          </ElWrapper>
          <ElWrapper>
          <>
            <Select
              placeholder="타인에게 전송하기"
              style={{
                width: 200,
                marginBottom: 30
              }}
              onChange={handleChange}
            >
              <Option value="0">ID로 전송</Option>
              <Option value="1">닉네임으로 전송</Option>
              <Option value="2">주소로 전송</Option>
            </Select>
          </>
          {showForm(optionVal)}
          </ElWrapper>
        </Wrapper>
      </Row>
    </div>
  );
}

const Title = styled.span`
  font-size: ${theme.fs_11};
  font-weight: ${theme.fw_700};
  color: ${theme.very_dark_blue_line};
`;

const Wrapper = styled.div`
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  background-color: rgba( 255, 255, 255, 0.65 );
  width: 100%;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ElWrapper = styled.div`
  text-align: center;
  display: block;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  width: 100%;
`;


export default MyPage;
