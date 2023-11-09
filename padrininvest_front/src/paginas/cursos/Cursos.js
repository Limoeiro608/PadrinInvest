import './assets/Style.css';
import ReactPlayer from 'react-player';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import CompNav from '../../componentes/CompNav/CompNav';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Compcursos from '../../componentes/compcursos/Compcursos';

function Cursos() {
    return (
        <div className='cursos__container'>
            <div>
                <CompNav/>
            </div>
            <div>
                <Compcursos curso="1"/> 
            </div>
        </div>
    );
}

export default Cursos;