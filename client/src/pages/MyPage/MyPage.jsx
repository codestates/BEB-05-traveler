import { Result, Row, Form, Input, Button, Select, Typography, Avatar, Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import { ContactsOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

function MyPage() {
  const location = useLocation();
  const user = location;

  const navigate = useNavigate();
  useEffect(() => {
    if (user.state.token === '') {
      window.alert("로그인이 필요한 페이지 입니다.")
      navigate('/');
  }
  },[]);

  const [userInfo, setUserInfo] = useState({
    user_id: '',
    nickname: '',
    address: '',
    token_amount: '',
    eth_amount: '',
    waiting_time: '',
    created_at: '',
  });

  const { Title } = Typography;
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

  const [numOfPosts, setNumOfPosts] = useState(0);
  const getPostNum = async () => {
    if (user.state.token !== '') {
      axios
        .get('http://localhost:4000/board/postbyid', {
          headers: { authorization: user.state.token },
        })
        .then((res) => {
          setNumOfPosts(res.data.data.length);
        });
    }
  };

  const getUserInfo = async () => {
    axios
      .get('http://localhost:4000/user/info', {
        headers: { authorization: user.state.token },
      })
      .then((userinfo) => {
        setUserInfo({
          user_id: userinfo.data.data.user_id,
          nickname: userinfo.data.data.nickname,
          address: userinfo.data.data.address,
          token_amount: userinfo.data.data.token_amount,
          eth_amount: userinfo.data.data.eth_amount,
          waiting_time: userinfo.data.data.waiting_time,
          created_at: userinfo.data.data.created_at,
        });
      });
  };

  useEffect(() => {
    getPostNum();
    getUserInfo();
  }, []);

  // 토큰 전송 part
  const [transType, setTransType] = useState("");
  const [inputType, setInputType] = useState("");
  const [toInfo, setToInfo] = useState(""); //ID or 닉네임 or 주소
  const [numInfo, setNumInfo] = useState(""); // 전송량 or NFT_id

  const tokenClick = (e) => {
    e.preventDefault();
    setTransType('토큰');
    setInputType("전송량");
  }
  const nftClick = (e) => {
    e.preventDefault();
    setTransType('NFT')
    setInputType("토큰 id");
  }

  const selInput = (val) => {
    if (val === "0") {return 'ID'}
    if (val === "1") {return '닉네임'}
    if (val === "2") {return '주소'}
  }

  const handleInput1 = (e) => {setToInfo(e.target.value);};
  const handleInput2 = (e) => {setNumInfo(Number(e.target.value));};

  const showForm = (val) => {
    if (val) {
      return (
        <Form
          name="transfer"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label={selInput(val)} name={selInput(val)} rules={[{ required: true, message: `${selInput(val)}를 입력하세요.` }]}>
            <Input onChange={(e) => handleInput1(e)} />
          </Form.Item>

          <Form.Item
            label={inputType}
            name={transType==="NFT" ? "nft_id" : "amount"}
            rules={[{ required: true, message: `${inputType}을 입력하세요.`}]}
          >
            <Input onChange={(e) => handleInput2(e)} />
          </Form.Item>
          <Button type="primary" shape="round" htmlType="submit" onClick={handleTransfer}>
            {`${transType} 전송`}
          </Button>
        </Form>
      );
    } else {return <div></div>}
  };


  const showSelect = () => {
    return (
      <Select
        placeholder="전송 방법 선택"
        style={{
          width: 200,
          marginTop: 0,
          marginBottom: 20,
        }}
        onChange={handleChange}
      >
        <Option value="0">ID로 전송</Option>
        <Option value="1">닉네임으로 전송</Option>
        <Option value="2">주소로 전송</Option>
      </Select>
    );
  }

  // POST 요청 부분!!
  const handleTransfer = () => {
    const obj = optionVal==="0" ? {user_id: toInfo} : optionVal==="1" ? {nickname: toInfo} : {recipient: toInfo};
    if (toInfo === "" || numInfo === "" || numInfo === NaN){
      window.alert("입력값을 확인하세요!")
    }
    else {
      const req_header = {headers : {authorization: `Bearer ${user.state.token}`}};
      console.log("무엇을 전송:",transType);
      if (transType === "토큰") {
        let req_body = {
          amount: numInfo,
          ...obj
        };
        console.log("req body",req_body);
        axios
        .post('http://localhost:4000/token/transfer_20', req_body, req_header)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res);
            window.alert("토큰 전송 완료!");
            window.location.reload();
          }
          else {window.alert("토큰 전송 실패!");window.location.reload();}
        });
      }
      if (transType === "NFT") {
        console.log(`${transType}을 전송함`)
        let req_body = {
          token_id: numInfo,
          ...obj
        };
        console.log("req body",req_body);
        axios
        .post('http://localhost:4000/token/transfer_721', req_body, req_header)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            window.alert("NFT 전송 완료!");
            window.location.reload();
          }
          else {window.alert("NFT 전송 실패!");
          window.location.reload();
        }
        });
      };
    }
  }

  return (
    <div>
      <Row gutter={[8, 8]} justify="left" align="middle" wrap={true}>
        <Wrapper>
          <TitleFont>
            <Title
              style={{
                marginTop: `${theme.space_5}`,
                marginBottom: `${theme.space_3}`,
                fontSize: `${theme.fs_12}`,
                fontWeight: `${theme.fw_700}`,
                color: `${theme.very_dark_blue_line}`,
              }}
            >
              <Avatar size={140} icon={<ContactsOutlined />} />
              <div style={{ paddingTop: '40px' }}>
                {userInfo.nickname}&ensp;({userInfo.user_id})
              </div>
              <div style={{ paddingTop: '15px', fontSize: `${theme.fs_9}` }}>
                {`게시글 수 : ${numOfPosts}`}&ensp;
                {`보유 NFT 수 : `} {userInfo.token_amount}
              </div>
              <div style={{ paddingTop: '15px', fontSize: `${theme.fs_9}`, whiteSpace: 'nowrap' }}>
                {`내 주소 : `} {userInfo.address}
              </div>
              <div style={{ paddingTop: '15px', fontSize: `${theme.fs_9}` }}>
                {`토큰 잔액: `} {userInfo.eth_amount}
              </div>
            </Title>
          </TitleFont>

          <ElWrapper>
            <>
              <div style={{paddingBottom:'20px'}}>
                <Button shape="round" onClick={tokenClick}>{"토큰 전송"}</Button>
                &ensp;&ensp;&ensp;&ensp;
                <Button shape="round" onClick={nftClick}>{"NFT 전송"}</Button>
              </div>
              {transType === "" ? <div></div> : showSelect()}
            </>
            {showForm(optionVal)}
          </ElWrapper>
        </Wrapper>
      </Row>
    </div>
  );
}

const TitleFont = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Aboreto&family=Noto+Sans+KR:wght@100&display=swap');

  text-align: center;
  font-weight: 400;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Wrapper = styled.div`
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.65);
  width: 100%;
  margin-top: 100px;
  margin-right: 20px;
  margin-left: 20px;
  padding-left: 200px;
  padding-right: 200px;
  padding-top: 0px;
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
  margin-bottom: 30px;
`;

export default MyPage;