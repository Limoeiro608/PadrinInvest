import './assets/Style.css';
import ReactPlayer from 'react-player';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Accordion from 'react-bootstrap/Accordion';
import Api from '../../services/Api';
import { useNavigate } from 'react-router-dom';

function Compcursos(props) {

    const now = 60;

    const navigate = useNavigate();

    const [aulas, setAulas] = useState([]);
    const [urlVideo, setUrlVideo] = useState('');
    const [tituloVideo, setTituloVideo] = useState('');
    const [assistidos, setAssistidos] = useState([])

    useEffect(() => {

        const checkJwt = async () => {
            let jwt = localStorage.getItem('auth')
            if (jwt != null && jwt != undefined && jwt != ''){
                let res = await Api.checkjwt(jwt);
                console.log(res)
                if(!res.sucess){
                    localStorage.setItem('auth', '')
                    alert("Faça o login para continuar");
                    navigate('/login');
                } else{
                    if(!res.valid){
                        localStorage.setItem('auth', '')
                        alert("Faça o login para continuar");
                        navigate('/login');
                    } else{
                        getAulas();
                    }
                }
            } else{
                alert("Faça o login para continuar");
                navigate('/login');
            }
        }

        checkJwt();

        const getAulas = async () => {
            let jwt = localStorage.getItem('auth');
            let id = props.curso;
            let res = await Api.getaulas(jwt, id);
            console.log(res)
            if(!res.sucess){
                alert("Ocorreu um erro ao buscar as aulas!");
                navigate('/');
            } else {
                if(res.classroom.length <= 0){
                    alert("Nenhuma aula cadastrada");
                    navigate('/');
                    return;
                }
                setAulas(res.classroom);
                console.log(res.classroom[0].class_url)
                setUrlVideo(res.classroom[0].class_url)
                setTituloVideo(res.classroom[0].class_tittle);
                console.log(res.classroom);

                let aul = await Api.getassistido(jwt, id);
                console.log(aul);
                setAssistidos(aul);
                changeAssistidos(aul);
            }
        }

        console.log(urlVideo)
    }, [])

    function mudarvideo(class_url, class_tittle, id){
        console.log(class_url)

        marcarAssistido(id);

        setUrlVideo(class_url)
        console.log(id)
        /*if(id == 1){
            setUrlVideo(class_url) 
        } else {
            setUrlVideo(class_url.split("&list")[0]);
        }*/
        setTituloVideo(class_tittle);
    }

    function marcarAssistido(id){
        console.log(id);
        let uid = 'check__' + id;
        document.getElementById(uid).checked = 'true';
        setarAulas(id);
    }

    async function setarAulas(id){
        let jwt = localStorage.getItem('auth');
        let cursoid = props.curso;
        let res = await Api.setaulas(jwt, id, cursoid);
        console.log(res);
    }

    function changeAssistidos(aul){
        console.log(aul);
        if(aul.sucess){
            if(aul.result.length > 0){
                for(var i = 0; i < aul.result.length; i++){
                    console.log(aul.result[i])
                    let uid = 'check__' + aul.result[i];
                    console.log();
                    if(document.getElementById(uid) != null && document.getElementById(uid) != undefined && document.getElementById(uid) != ''){
                        document.getElementById(uid).checked = 'true';
                    }
                }
            }
        }
        
    }

    return (
        <Container fluid='md' className='cursos__fundo'>
            <Row>
                <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                    <div className='cursos__tituloAula'>
                            <span>{(props.curso) == "1" ? "Fundamentos do Investidor" : "Investidor Inteligente"}</span>
                    </div>
                    <div className='cursos__descAula'>
                            <span>{(props.curso) == "1" ? "Este módulo é o ponto de partida ideal para quem busca equilibrar suas finanças, livrar-se das dívidas e construir um futuro financeiro sólido. Junte-se a nós para dar os primeiros passos em direção a um caminho de independência financeira e sucesso nos investimentos." : "Este módulo é ideal para aqueles que desejam levar seus conhecimentos financeiros para o próximo nível, aproveitando ao máximo seu patrimônio e trabalhando em direção à independência financeira. Junte-se a nós para explorar estratégias avançadas de investimento e construir o futuro financeiro que você deseja."}</span>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className='cursos__tamanho' xxl={8} xl={8} lg={8} md={12} sm={12} xs={12}>
                    <div id="divAula" className='cursos__video'>
                        <ReactPlayer className='cursos__videoPlayer'
                            controls='true'
                            url={urlVideo}
                            width='100%'
                            height='100%'
                        />
                    </div><br />
                    <div className='cursos__titulo'>
                        <span>{tituloVideo}</span>
                    </div>
                    
                </Col>
                <Col className='cursos__progressoTamanho' xxl={4} xl={4} lg={4} md={12} sm={12} xs={12}>
                    <Row className='cursos__distancia'>
                       {/*<div className='cursos__progresso'>
                            <p>Progresso do curso:</p>
                            <ProgressBar now={now} label={`${now}%`} />
                        </div>*/}
                        <div className='cursos__lista'>
                            {aulas.map(({class_description, class_tittle, class_url, id}) => (
                                <Accordion className='cursos_aulas'>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header><input type='radio' id={'check__' + id} onChange={() => marcarAssistido(id)} className='check__aula' />{class_tittle}</Accordion.Header>
                                        <Accordion.Body>
                                            <span>{class_description}</span><br /><br />
                                            <span className='cursos__assistir' onClick={() => mudarvideo(class_url, class_tittle, id)}>Assistir Aula</span>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
        );
}

export default Compcursos;