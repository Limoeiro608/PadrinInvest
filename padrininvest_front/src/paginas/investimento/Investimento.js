import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import CompNav from '../../componentes/CompNav/CompNav';
import { CompInvestimento } from '../../componentes/compinvestimentos/CompInvestimento';
import { Grafico } from '../../componentes/graficodeinvestimento/Grafico';

function Investimento() {
    return (
        <div className='investimentos__container'>
            <div>
                < CompNav/>
            </div>
            <div>
                < CompInvestimento/>
            </div>
        </div>
    );
}

export default Investimento;
