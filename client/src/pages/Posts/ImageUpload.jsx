import React, { useState, useRef, useEffect} from 'react';
import {Button,Card,Image,Typography} from 'antd';
import styled from 'styled-components';
import { theme } from '../../style/theme.js';

const { Text, Title } = Typography;

function ImageUpload({defaultImg}) {
    const [imageSrc, setImageSrc] = useState(defaultImg);
    const [enable,setEnable] = useState(true);

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);

        return new Promise((resolve) => {
            reader.onload = () => {
                setEnable(false);
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    const saveFileImage =  (e) => {
        encodeFileToBase64(e.target.files[0]);
    };

    const deleteFileImage = () => {
        setImageSrc(process.env.PUBLIC_URL + "/noImage.png");
    };

    const selectFile = useRef("");

    return (
        <main className="container">
        <div>
            <Title style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}>{"이미지 편집"}</Title>
            <Text type="secondary">{" (파일 형식: png, jpg, jepg)"}</Text>
        </div>
        <input  
            type="file" 
            accept="image/jpg, image/png, image/jpeg"
            style={{display:'none'}}
            ref={selectFile}
            onChange={saveFileImage} 
        />
        <Button onClick={() => selectFile.current.click()}>파일 업로드</Button>
        <Button
            disabled={enable}
            onClick={deleteFileImage}
        >
            삭제
        </Button>
        <Card size="large">
            <Image src={imageSrc} style={{ width: '100%', display: 'flex'}} />
        </Card>
        </main>
    );
}

const AppStyle = styled.div`
  margin: 0 8px 0 8px;
  label {
    display: inline-block;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default ImageUpload;