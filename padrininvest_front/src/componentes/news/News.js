import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import imagem from './assets/imagem.png';
import Api from '../../services/Api';
import { useNavigate } from 'react-router-dom';

function News() {

    const navigate = useNavigate();

    const [noticias, setNoticias] = useState([])
    const [pagina, setPagina] = useState(1);
    const [qtdpag, setQtdPag] = useState([1]);
    const [noticiasexibir, setNoticiasExibir] = useState([])
    const [pagAtual, setPagAtual] = useState(1);

        useEffect(() => {
            const getnoticias = async () => {
                let res = await Api.noticias();
                console.log(res)

                let arrayNoticias = new Array();

                for(var i = 0; i < 100; i++){
                    if(res.items[i]['editorias'].indexOf("economicas") != -1){

                        let img = res.items[i]['imagens'].split('":"')[1];
                        img = img.split('",')[0]
                        img = img.split("\/");
                        console.log(img);
                        let img2 = "";
                        for(var j = 0; j < img.length; j++){

                            if(j == 0){
                                img2 += img[j].replace('\\', "") + "/";
                            } else if(j < (img.length-1)){
                                img2 += img[j].replace("//", "").replace('\\', "") + "/";
                            } else {
                                img2 += img[j].replace("//", "");
                            }
                            
                        }
                        
                        console.log(img2);
                        
                        let temp = {
                            titulo: res.items[i]['titulo'], 
                            desc: res.items[i]['introducao'], 
                            img: "https://ibge.gov.br/" + img2, 
                            link: res.items[i]['link']
                        }

                        console.log(temp);
                        arrayNoticias.push(temp);

                    }
                }

                console.log(arrayNoticias);
                setNoticias(arrayNoticias);

                exibirNoticias(1, arrayNoticias);

                let pag = new Array();
                for(var i = 1; i <= Math.round(arrayNoticias.length / 8); i++){
                    pag.push(i);
                }

                console.log();
                setQtdPag(pag);
            }
            getnoticias();
        }, [])

        const paginar = (e) => {
            console.log(e.target.id);
            setPagina(e.target.id);
            setPagAtual(e.target.id);
            exibirNoticias(e.target.id, noticias);
        }

        const exibirNoticias = (pag, noti) => {
            console.log("PAGINA ATUAL: ", pag);
            let ate = (pag * 8) - 1;
            let de = (ate - 8) + 1;
            console.log(de, ate);

            let exibir = new Array();
            for(var i = de; i <= ate; i++){
                if(i < noti.length){
                    exibir.push(noti[i]);
                }
            }
            console.log(exibir)
            setNoticiasExibir(exibir);
        }

    return (
        <Container>
            <Row>
                <Col className='noticias__titulo'>
                    <span>Notícias</span>
                </Col>
            </Row>
            {noticiasexibir.map(({titulo, desc, img, link}) => 
            <Row>
                <Col xxl={4} xl={4} lg={4} md={6} sm={12} xs={12} className='card__noticiasAjst'>
                    <div className='card__noticiasImg'> 
                        <img src={img} alt= 'noticia'/>
                    </div>
                </Col>
                <Col xxl={8} xl={8} lg={8} md={6} sm={12} xs={12} className='card__noticiasAjst'>
                    <div className='news__titulo'>{titulo}</div>
                    <div className='news__info'>{desc}</div>
                    <div className='news__btn'><a href={link} target='_blank'><button>Ver mais</button></a></div>
                </Col>
            </Row>)}
            <Row>
                <Col className='noticias__colpag'>
                    {qtdpag.map((e) => 
                        <span className={ (e == pagAtual) ? 'noticias__pag atual' : 'noticias__pag' } id={e} onClick={paginar}>{e}</span>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default News;