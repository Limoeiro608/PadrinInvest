import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { Chart } from "react-google-charts";


export const data = [
  ["x", "Acao X", "Acao Y"],
  [0, 0, 0],
  [1, 10, 5],
  [2, 23, 15],
  [3, 17, 9],
  [4, 18, 10],
  [5, 9, 5],
  [6, 11, 3],
  [7, 27, 19],
];

export const options = {
  hAxis: {},
  vAxis: {},
  series: {
    1: { curveType: "function" },
  },
};

export function Grafico() {
  return (
  <Container>
    <Row>
      <Col className='grafico'>
        <span className='grafico__titulo'>Meus investimentos</span>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={data}
          options={options}
        />
      </Col>
    </Row>
  </Container>
  );
}

