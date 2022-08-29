import { Form, Typography, Upload } from 'antd';

import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';

const { Title: _Title, Paragraph: _Paragraph } = Typography;

function UploadImage({ beforeUpload, handleChange, image, uploadButton }) {
  return (
    <MainTitle>
      <>
        <Title level={3}>Import Image, Video or Audio</Title>
        <Paragraph>
          File types supported: JPG,PNG, GIF, SVG, MP3, WAV, MP4. Max size: 50MB MB
        </Paragraph>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload
            action="/upload.do"
            listType="picture-card"
            rules={[
              {
                required: true,
                message: 'This field is required.',
              },
            ]}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            maxCount={1}
            image={image}
          >
            {uploadButton}
          </Upload>
        </Form.Item>
      </>
    </MainTitle>
  );
}

const Title = styled(_Title)`
  color: ${theme.very_dark_blue_line} !important;
`;

const Paragraph = styled(_Paragraph)`
  color: ${theme.very_dark_blue_line} !important;
`;

const MainTitle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');
  padding-top: 20px;
  font-weight: 400;
  font-family: 'Aboreto', cursive;
  font-family: 'Noto Sans KR', sans-serif;
`;

export default UploadImage;
