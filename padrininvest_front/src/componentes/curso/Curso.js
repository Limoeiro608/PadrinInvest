import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import iniciante from "./assets/iniciante.png";
import avancado from "./assets/avancado.png";
import Api from '../../services/Api';
import { useNavigate } from 'react-router-dom';

function Curso() {

    const navigate = useNavigate();
    const[logado, setLogado] = useState(false)
    useEffect(() => {
        const checkJwt = async () => {
            let jwt = localStorage.getItem('auth')
            if (jwt != null && jwt != undefined && jwt != ''){
                let res = await Api.checkjwt(jwt);
                console.log(res)
                if(!res.sucess){
                  localStorage.setItem('auth', '')
                  setLogado(false)
                } else{
                    if(!res.valid){
                        localStorage.setItem('auth', '')
                        setLogado(false)
                    } else{
                        setLogado(true)
                    }
                }
            } else{
                console.log('nao logado')
                setLogado(false)
            }
        }

        checkJwt();
    }, [])

    return (
        <Container className='curso__container'>
            <Row className='curso__espaco'>
                <Col>
                    <span className='curso__titulo'>Cursos <IoIosArrowDroprightCircle className='curso__arrow'/></span>
                </Col>
            </Row>
            <div className={ !logado && ('curso__naologado')}>
                <Row className='curso__texto'>
                    <Col xxl={4} xl={4} lg={4} md={6} sm={6} xs={12}>
                        <img className='curso__video' src={iniciante} alt='video' onClick={ !logado ? () => navigate('/login') : () => navigate('/cursos')}/>
                    </Col>
                    <Col xxl={4} xl={4} lg={4} md={6} sm={6} xs={12}>
                        <img className='curso__video' src={avancado} alt='video' onClick={ !logado ? () => navigate('/login') : () => navigate('/cursos2')}/>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default Curso;