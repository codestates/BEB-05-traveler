import { Row, Col, Divider, Form } from 'antd';
import React, { useState } from 'react';
import * as CreateComp from '../../components/create';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Create() {
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [loadings, setLoadings] = useState([]);

  const location = useLocation();
  const user = location;

  const onMint = async () => {
    // setLoadings((prevLoadings) => {
    //   const newLoadings = [...prevLoadings];
    //   newLoadings[1] = true;
    //   return newLoadings;
    // });
    console.log('hihi', image, user.state.token);
    const formData = new FormData();
    console.log('name', name, description);
    formData.append('img', image);
    formData.append('img', name);
    formData.append('img', description);

    const headers = {
      Authorization: `JWT ${user.state.token}`,
      'Content-Type': 'multipart/form-data',
    };
    const res = await axios.post('http://localhost:4000/token/mint', formData, { headers });
    console.log(res);

    // setTimeout(() => {
    //   setLoadings((prevLoadings) => {
    //     const newLoadings = [...prevLoadings];
    //     newLoadings[1] = false;
    //     return newLoadings;
    //   });
    // }, 10);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    setImage(info.file.originFileObj);
    setLoading(false);
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.

    //   setImage(info.file.originFileObj);
    //   // setLoading(false);
    // }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <Row justify="center" align="middle">
      <Col flex="0 1 800px">
        <Form>
          <CreateComp.CreatePageTitle />
          <CreateComp.UploadImage
            beforeUpload={beforeUpload}
            handleChange={handleChange}
            image={image}
            uploadButton={uploadButton}
          />
          <CreateComp.InputName setName={setName} />
          <CreateComp.InputDesctiption setDescription={setDescription} />
          <Divider />
          <CreateComp.ButtonMint loading={loadings[1]} onMint={onMint} />
        </Form>
      </Col>
    </Row>
  );
}

export default Create;
