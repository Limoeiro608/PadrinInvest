import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Icon, Input } from 'semantic-ui-react';
import CompNav from '../../componentes/CompNav/CompNav';
import Card from "../../componentes/cards/Card";
import Curso from "../../componentes/curso/Curso";
import { GraficoHome } from '../../componentes/graficoHome/GraficoHome';

function Inicio(){
    return (
            <Container fluid className='noticias__container'>
                <Row>
                    <CompNav/>
                </Row>
                <Row>
                    <Col>
                        <Card/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Curso/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <GraficoHome/>
                    </Col>
                </Row>
            </Container>
    )
}

export default Inicio;