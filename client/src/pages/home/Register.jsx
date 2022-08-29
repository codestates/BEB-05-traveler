//https://e2e2e2.tistory.com/21
import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 8,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 10,
    },
  },
};
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return { value, onChange };
};

const Register = ({ handleJoinOk, setJoinID, setJoinPW, setJoinName }) => {
  const use_id = useInput('');
  const pw = useInput('');
  const nickname = useInput('');

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  // 아이디 유효성 검사, 아이디 길이 4~12, 영문+숫자
  const validateID = useCallback((_, value) => {
    if (!value) {
      return Promise.reject(new Error('아이디는 필수 항목입니다.'));
    }
    if (/\s/.test(value)) {
      return Promise.reject(new Error('아이디는 공백을 포함 할 수 없습니다.'));
    }
    const idregExp = /[^a-zA-Z0-9]{4,12}$/;
    if (idregExp.test(value)) {
      return Promise.reject(new Error('아이디는 영문 대소문자와 숫자 4~12자리로 입력 해야합니다.'));
    }
    return Promise.resolve();
  }, []);

  // 비밀번호 유효성 검사, 비밀번호 길이 8~15 영,숫자, ?!/~@#$%^ 가능
  const validatePW = useCallback((_, value) => {
    if (!value) {
      return Promise.reject(new Error('비밀번호는 필수 항목입니다.'));
    }
    if (/\s/.test(value)) {
      return Promise.reject(new Error('비밀번호는 공백을 포함 할 수 없습니다.'));
    }
    const idregExp = /[^a-zA-Z0-9?!/~@#$%^]{8,15}$/;
    if (idregExp.test(value)) {
      return Promise.reject(new Error('아이디는 영문 대소문자와 숫자 4~15자리로 입력 해야합니다.'));
    }
    return Promise.resolve();
  }, []);

  // 닉네임 유효성 검사, 닉네임 길이 2~20, 한,영,숫자 가능
  const validateNickname = useCallback((_, value) => {
    if (!value) {
      return Promise.reject(new Error('닉네임은 필수 항목입니다.'));
    }
    if (/\s/.test(value)) {
      return Promise.reject(new Error('닉네임은 공백을 포함 할 수 없습니다.'));
    }

    let nicknameLength = 0;
    for (let i = 0; i < value.length; i += 1) {
      const char = value.charAt(i);
      if (char.charCodeAt(0).toString(16).length > 3) {
        nicknameLength += 2;
      } else {
        nicknameLength += 1;
      }
    }
    if (nicknameLength < 2 || nicknameLength >= 20) {
      return Promise.reject(
        new Error('닉네임 한글1~10자, 영문 및 숫자 2~20자까지 입력가능합니다.')
      );
    }

    const regExp = /[^a-zA-Z0-9가-힣_]/;
    if (regExp.test(value)) {
      return Promise.reject(new Error('닉네임은 한글, 영문, 숫자, _ 만 사용할 수 있습니다.'));
    }
    return Promise.resolve();
  }, []);

  return (
    <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <Form.Item name="user_id" label="아이디" hasFeedback rules={[{ validator: validateID }]}>
        <Input
          placeholder="영문 + 숫자 조합 (4~12자)"
          value={use_id.value}
          onChange={use_id.onChange}
          onChange={(e) => {
            setJoinID(e.target.value);
          }}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        tooltip="영문 + 숫자 + 특수문자(?/~!@#$%^) 조합 (8~15자)"
        rules={[{ validator: validatePW }]}
        onChange={(e) => {
          setJoinPW(e.target.value);
        }}
        hasFeedback
      >
        <Input.Password
          placeholder="영문 + 숫자 + 특수문자 조합 (8~15자)"
          value={pw.value}
          onChange={pw.onChange}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 재입력"
        dependencies={['password']}
        hasFeedback
        rules={[
          { message: '비밀번호를 재입력 하세요.' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="비밀번호 재입력" />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="닉네임"
        tooltip="활동명을 정해주세요."
        hasFeedback
        rules={[
          {
            validator: validateNickname,
          },
        ]}
        onChange={(e) => {
          setJoinName(e.target.value);
        }}
      >
        <Input
          placeholder="한글1~10자, 영문 및 숫자 2~20자"
          value={nickname.value}
          onChange={nickname.onChange}
          allowClear
        />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={handleJoinOk}>
          가입하기
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
