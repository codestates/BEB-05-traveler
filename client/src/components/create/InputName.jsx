import { Form, Input, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const { Title: _Title } = Typography;

function InputName({ setName }) {
  return (
    <MainTitle>
      <>
        <Title level={3}>Name *</Title>
        <Form.Item
          name={'name'}
          rules={[
            {
              required: true,
              message: 'This field is required.',
            },
          ]}
        >
          <Input
            placeholder="E.g. This is a title"
            size="large"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Item>
      </>
    </MainTitle>
  );
}

const MainTitle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  padding-top: 20px;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Title = styled(_Title)`
  color: ${theme.very_dark_blue_line} !important;
`;

export default InputName;
