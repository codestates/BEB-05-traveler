import { Image, Row } from 'antd';
import React from 'react';
import mainImg from '../../../src/asset/imgs/haha.png';
import styled from 'styled-components';
import { theme } from '../../style/theme';

function Section1() {
  return <Image src={mainImg} alt="main image" preview={false} />;
}

export default Section1;
