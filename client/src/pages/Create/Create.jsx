import { Row, Col, Divider, Form } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../style/theme';
import * as CreateComp from '../../components/create';

function Create() {
  return (
    <Row justify="center" align="middle">
      <Col flex="0 1 800px">
        <Form>
          <CreateComp.CreatePageTitle />
          <CreateComp.UploadImage />
          <CreateComp.InputName />
          <CreateComp.InputDesctiption />
          <Divider />
          <CreateComp.ButtonMint />
        </Form>
      </Col>
    </Row>
  );
}

export default Create;
