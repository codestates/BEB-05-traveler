import { Col, Row, Typography, Input, Button} from 'antd';
import {PushpinOutlined, EnvironmentOutlined} from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import ImageUpload from './ImageUpload.jsx';
import { useLocation } from 'react-router-dom';
import { theme } from '../../style/theme.js';
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

function PostEdit() {
    const ref = useRef(null);
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    // 서버로부터 가져오는 부분
    const location = useLocation();
    const post_id = location.pathname.split("/").pop();

    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [addr, setAddr] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState(process.env.PUBLIC_URL + "/noImage.png");
    const [postOwner, setPostOwner] = useState("");

    const getPost = async () => {
        console.log("get post by post id")
        axios
        .get(`http://localhost:4000/board/post/${post_id}`,{
        })
        .then((res) => {
            const postObject = res.data.data[0];
            setPostOwner(postObject.user_id);
            setTitle(postObject.title);
            setPlace(postObject.place_name);
            setAddr(postObject.place_address);
            setContent(postObject.content);
            const enc = new TextDecoder("utf-8");
            let arr;
            if (postObject.image) {arr = new Uint8Array(postObject.image.data.data)};
            setFile(arr ? enc.decode(arr) : process.env.PUBLIC_URL + "/noImage.png");
        });
    }

    useEffect(() => {
        getPost();
    },[]);

    // 이미지타입
    const [imgType, setImgType] = useState('image/png'); //initial value

    const [editTitle,setEditTitle] = useState(false);
    const [editPlace, setEditPlace] = useState(false);
    const [editAddr, setEditAddr] = useState(false);
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

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:4000/board/post_update",{
                post_id : post_id,
                user_id : postOwner,
                title : title,
                content : content,
                image : {
                    data: file,
                    contentType: imgType
                },
                place_name: place,
                place_address: addr,
            })
            .then((res) => {
                if (res.status == 200){
                    window.alert("수정 완료!");
                    window.location.reload();
                } else {
                    console.log(res);
                    window.alert("수정 실패");
                    window.location.reload();
                }
            });
        };

    return (
        <Row justify="center" align="middle">
        <Col xs={24} xl={16}>
            <Row gutter={[8, 8]} type="flex">
                <ImageUpload file={file} setFile={setFile} setImgType={setImgType}/>
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
                    <Button onClick={onSubmit}>수정 완료</Button>
                </div>
            </Row>
        </Col>
        </Row>
    );
}

export default PostEdit;
