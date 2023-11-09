import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import CompNav from '../../componentes/CompNav/CompNav';
import News from '../../componentes/news/News';

function Noticias() {
    return (
        <Container fluid className='noticias__container'>
                    <Row>
                        < CompNav/>
                    </Row>
                <Row>
                    <Col>
                        < News/>
                    </Col>
                </Row>
        </Container>
    )
}

export default Noticias;