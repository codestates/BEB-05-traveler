import React, { useState, useRef } from 'react';
import { Button, Card, Image, Typography } from 'antd';
import { theme } from '../../style/theme.js';

const { Text, Title } = Typography;

function ImageUpload({ file, setFile, setImgType }) {
  const [enable, setEnable] = useState(true);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise((resolve) => {
      reader.onload = () => {
        setEnable(false);
        setFile(reader.result);
        resolve();
      };
    });
  };

  const saveFileImage = (e) => {
    const contentType = 'image/' + e.target.files[0]['name'].split('.').pop();
    setImgType(contentType);
    encodeFileToBase64(e.target.files[0]);
  };

  const deleteFileImage = () => {
    setFile(process.env.PUBLIC_URL + '/noImage.png');
  };

  const selectFile = useRef('');

  return (
    <main className="container">
      <div>
        <Title style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}` }}>
          {'이미지 편집'}
        </Title>
        <Text type="secondary">{' (파일 형식: png, jpg, jepg)'}</Text>
      </div>
      <input
        type="file"
        accept="image/jpg, image/png, image/jpeg"
        style={{ display: 'none' }}
        ref={selectFile}
        onChange={saveFileImage}
      />
      <Button onClick={() => selectFile.current.click()}>파일 업로드</Button>
      <Button disabled={enable} onClick={deleteFileImage}>
        삭제
      </Button>
      <Card size="large">
        <Image src={file} style={{ width: '100%', display: 'flex' }} />
      </Card>
    </main>
  );
}

export default ImageUpload;
