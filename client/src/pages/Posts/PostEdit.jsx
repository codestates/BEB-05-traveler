import { Col, Row, Typography, Input, Button} from 'antd';
import {PushpinOutlined, EnvironmentOutlined} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import collectionData from '../../asset/dummy/fakeposts.js';
import { useParams } from 'react-router-dom';
import ImageUpload from './ImageUpload.jsx';
import mainImg from '../../../src/asset/dummy/image1.jpeg';
import mainImg2 from '../../../src/asset/dummy/image2.jpg';
import mainImg3 from '../../../src/asset/dummy/image3.png';
import mainImg4 from '../../../src/asset/dummy/image4.png';
import { theme } from '../../style/theme.js';

const { Text } = Typography;
const { TextArea } = Input;

function PostEdit() {
  const pa = useParams();
  const filteredData = collectionData.filter((res) => res.content_id === pa.content_id);
  const image_array = [mainImg, mainImg2, mainImg3, mainImg4];
  
  const ref = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [title, setTitle] = useState(filteredData[0].title);
  const [editTitle,setEditTitle] = useState(false);
  const [place, setPlace] = useState(filteredData[0].place_name);
  const [editPlace, setEditPlace] = useState(false);
  const [addr, setAddr] = useState(filteredData[0].place_address);
  const [editAddr, setEditAddr] = useState(false);
  const [content, setContent] = useState(filteredData[0].content);
  const [editContent, setEditContent] = useState(false);

  const editTitleOn = () => {setEditTitle(true);};
  const editPlaceOn = () => {setEditPlace(true);};
  const editAddrOn = () => {setEditAddr(true);};
  const editContentOn = () => {setEditContent(true)};

  const handleChange = (e) => {setTitle(e.target.value);};
  const handleChange2 = (e) => {setPlace(e.target.value);};
  const handleChange3 = (e) => {setAddr(e.target.value);};
  const handleChange4 = (e) => {setContent(e.target.value);};

  const handleKeyDown = (e) => {if (e.key === "Enter") {setEditTitle(!editTitle)}};
  const handleKeyDown2 = (e) => {if (e.key === "Enter") {setEditPlace(!editPlace)}};
  const handleKeyDown3 = (e) => {if (e.key === "Enter") {setEditAddr(!editAddr)}};
  const handleKeyDown4 = (e) => {if (e.key === "Enter") {setEditContent(!editContent)}};

  const handleClickOutside = (e) => {
    if (editTitle == true && !ref.current.contains(e.target)) {setEditTitle(false)}
    if (editPlace == true && !ref1.current.contains(e.target)) {setEditPlace(false)}
    if (editAddr == true && !ref2.current.contains(e.target)) {setEditAddr(false)}
    if (editContent == true && !ref3.current.contains(e.target)) {setEditContent(false)}
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
  });

  return (
    <Row justify="center" align="middle">
      <Col xs={24} xl={16}>
        <Row gutter={[8, 8]} type="flex">
            <ImageUpload defaultImg={image_array[pa.content_id - 1]} />
            <div style={{paddingLeft: '10px', paddingRight:'10px'}}>
                <div ref={ref} style={{paddingBottom:'7px'}}>
                    {editTitle ? (
                        <Input type="text" value={title} style={{width: '30%'}} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                    ) : (
                        <Text onClick={() => editTitleOn()} style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_8}`, color: '#424242'}}>{title}</Text>
                    )};
                </div>
                <div ref={ref1}>
                    {editPlace ? (
                        <Input type="text" value={place} style={{width: '30%'}} onChange={(e) => handleChange2(e)} onKeyDown={handleKeyDown2} />
                    ) : (
                        <Text onClick={() => editPlaceOn()} type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><PushpinOutlined style={{paddingTop: '4px'}}/>&nbsp;{place}</Text>
                    )};
                </div>
                <div ref={ref2}>
                    {editAddr ? (
                        <Input type="text" value={addr} style={{width: '30%'}} onChange={(e) => handleChange3(e)} onKeyDown={handleKeyDown3} />
                    ) : (
                        <Text onClick={() => editAddrOn()} type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><EnvironmentOutlined style={{paddingTop: '4px'}}/>&nbsp;{addr}</Text>
                    )};
                </div>
                <div ref={ref3} style={{paddingTop:'7px'}}>
                    {editContent ? (
                        <TextArea rows={4} cols={140} value={content} onChange={(e) => handleChange4(e)} onKeyDown={handleKeyDown4} />
                    ) : (
                        <Text onClick={() => editContentOn()} style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_6}`, marginTop:'10px'}}>{content}</Text>
                    )};
                </div>
            </div>
            <div style={{width: '100%',paddingLeft: '10px', paddingTop:'30px', textAlign:'center'}}>
                <Button>수정 완료</Button>
            </div>
        </Row>
      </Col>
    </Row>
  );
}

export default PostEdit;
