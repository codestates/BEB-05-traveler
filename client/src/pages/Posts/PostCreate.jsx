import { Col, Row, Typography, Input, Button} from 'antd';
import {PushpinOutlined, EnvironmentOutlined} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import ImageUpload from './ImageUpload.jsx';
import { theme } from '../../style/theme.js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

function PostCreate() {
    const location = useLocation();

    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null); 

    const [title, setTitle] = useState("제목");
    const [editTitle,setEditTitle] = useState(false);
    const [place, setPlace] = useState("장소 이름");
    const [editPlace, setEditPlace] = useState(false);
    const [addr, setAddr] = useState("장소 주소");
    const [editAddr, setEditAddr] = useState(false);
    const [content, setContent] = useState("내용");
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

    //DB post 요청
    const [file, setFile] = useState(process.env.PUBLIC_URL + "/noImage.png");
    const [imgType, setImgType] = useState('image/png'); //initial value

    const onSubmit = async (e) => {
        const user_id = location.state.userInfo.user_id;
        e.preventDefault();

        if (user_id === '') {window.alert("로그인 필요")}
        else {
            axios
            .post("http://localhost:4000/board/newpost",{
                title : title,
                content : content,
                image : {
                    data: file,
                    contentType: imgType
                },
                place_name: place,
                place_address: addr,
            },{headers:{authorization: location.state.token}})
            .then((res) => {
                if (res.status == 200){
                    window.alert("작성 완료!");
                    window.location.reload();
                } else {
                    console.log(res);
                    window.alert("작성 실패");
                    window.location.reload();
                }
            });
        }
    };


  return (
    <Row justify="center" align="middle">
      <Col xs={24} xl={16}>
        <Row gutter={[8, 8]} type="flex">
            <ImageUpload file={file} setFile={setFile} setImgType={setImgType}/>
            <div style={{paddingLeft: '10px', paddingRight:'10px'}}>
                <div ref={ref} style={{paddingBottom:'7px'}}>
                    {editTitle ? (
                        <Input type="text" placeholder='제목' value={title} style={{width: '100%'}} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
                    ) : (
                        <Text onClick={() => editTitleOn()} style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_8}`, color: '#424242'}}>{title}</Text>
                    )};
                </div>
                <div ref={ref1}>
                    {editPlace ? (
                        <Input type="text" placeholder='장소 이름' value={place} style={{width: '100%'}} onChange={(e) => handleChange2(e)} onKeyDown={handleKeyDown2} />
                    ) : (
                        <Text onClick={() => editPlaceOn()} type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><PushpinOutlined style={{paddingTop: '4px'}}/>&nbsp;{place}</Text>
                    )};
                </div>
                <div ref={ref2}>
                    {editAddr ? (
                        <Input type="text" placeholder='장소 주소' value={addr} style={{width: '100%'}} onChange={(e) => handleChange3(e)} onKeyDown={handleKeyDown3} />
                    ) : (
                        <Text onClick={() => editAddrOn()} type="secondary" style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_5}`}}><EnvironmentOutlined style={{paddingTop: '4px'}}/>&nbsp;{addr}</Text>
                    )};
                </div>
                <div ref={ref3} style={{paddingTop:'7px'}}>
                    {editContent ? (
                        <TextArea rows={4} cols={140} placeholder='내용' value={content} onChange={(e) => handleChange4(e)} onKeyDown={handleKeyDown4} />
                    ) : (
                        <Text onClick={() => editContentOn()} style={{ width: '100%', display: 'inline', fontSize: `${theme.fs_6}`, marginTop:'10px'}}>{content}</Text>
                    )};
                </div>
            </div>
            <div style={{width: '100%',paddingLeft: '10px', paddingTop:'30px', textAlign:'center'}}>
                <Button onClick={onSubmit}>작성 완료</Button>
            </div>
            {/* 이미지 버퍼로부터 가져오는 테스트 */}
        </Row>
      </Col>
    </Row>
  );
}

export default PostCreate;
