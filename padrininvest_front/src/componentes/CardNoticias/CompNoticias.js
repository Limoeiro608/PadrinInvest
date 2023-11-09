import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Api from '../../services/Api';

function CompNoticias() {

    const [noticias, setNoticias] = useState([
        {
            "titulo": "Produção industrial nacional tem variação de 0,4% em agosto",
            "desc": "Desempenho da indústria farmacêutica impactou no resultado do mês - Foto: Freepik A indústria do país apresentou uma variação positiva de 0,4% na passagem de julho para agosto, eliminando parte da queda de 0,6% verificada no mês anterior. Na comparação...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-BR_thumb-Freepik.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38016-producao-industrial-nacional-tem-variacao-de-0-4-em-agosto.html"
        },
        {
            "titulo": "Produção industrial tem variação de 0,4% em agosto",
            "desc": "Em agosto de 2023, a produção industrial nacional variou 0,4% frente a julho, na série com ajuste sazonal. Em relação a agosto de 2022, o avanço foi de 0,5%. Frente a igual período de 2022, a indústria acumula taxa negativa no ano (-0,3%). O acumulado...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/PIM-PF-BR_Release1.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38015-producao-industrial-tem-variacao-de-0-4-em-agosto.html"
        },
        {
            "titulo": "84,9% das indústrias de médio e grande porte utilizaram tecnologia digital avançada",
            "desc": "Mais de 90% das empresas que utilizaram robótica o fizeram na área de produção - Foto: Freepik Em 2022, 84,9% (8.134) das 9.586 empresas industriais com 100 ou mais pessoas ocupadas utilizaram pelo menos uma tecnologia digital avançada, sendo a...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/PINTEC_thumb.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37973-84-9-das-industrias-de-medio-e-grande-porte-utilizaram-tecnologia-digital-avancada.html"
        },
        {
            "titulo": "Preços na indústria sobem 0,92% em agosto, após seis meses de queda",
            "desc": "Refino de petróleo respondeu por 0,72 pontos percentuais na variação de 0,92% do IPP em agosto - Foto: André Mota de Souza/Ag Petrobras  Os preços da indústria subiram 0,92% em agosto frente a julho, voltando ao campo positivo depois de seis meses de...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/IPP_THUMB_AndreMottadeSouza_AgPetrobras.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37970-precos-na-industria-sobem-0-92-em-agosto-apos-seis-meses-de-queda.html"
        },
        {
            "titulo": "Índice de Preços ao Produtor (IPP) é de 0,92% em agosto",
            "desc": "Em agosto de 2023, os preços da indústria variaram 0,92% frente a julho, voltando ao campo positivo depois de seis meses. Nessa comparação, 12 das 24 atividades industriais tiveram variações positivas de preço. O acumulado no ano foi de -6,32%, a...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/IPP_Release.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/37969-indice-de-precos-ao-produtor-ipp-e-de-0-92-em-agosto.html"
        },
        {
            "titulo": "Valor de produção da silvicultura e da extração vegetal cresce 11,9% e atinge recorde de R$ 33,7 bilhões",
            "desc": "Área plantada da silvicultura somou 9,5 milhões de hectares, dos quais 77,3% são de eucalipto, e valor de produção atingiu R$ 27,4 bilhões - Foto: Fernando Dias/Ascom-Sepadr O Valor da produção florestal atingiu o recorde de R$ 33,7 bilhões, com alta de...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/PEVS_THUMB_Fernando-Dias-Ascom-Sepadr.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37963-valor-de-producao-da-silvicultura-e-da-extracao-vegetal-cresce-11-9-e-atinge-recorde-de-r-33-7-bilhoes.html"
        },
        {
            "titulo": "IPCA-15 fica em 0,35% em setembro, influenciado pela alta da gasolina",
            "desc": "Gasolina subiu 5,18%, e foi o maior impacto individual (0.25 p.p.) no índice de setembro - Foto: Helena Pontes/Agência IBGE Notícias A prévia da inflação ficou em 0,35% em setembro, 0,07 ponto percentual (p.p.) acima da taxa registrada em agosto (0,28%)....",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/IPCA15_THUMB_Helena-Pontes.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37947-ipca-15-fica-em-0-35-em-setembro-influenciado-pela-alta-da-gasolina.html"
        },
        {
            "titulo": "IPCA-15 é de 0,35% em setembro e IPCA-E é de 0,56%",
            "desc": "O Índice Nacional de Preços ao Consumidor Amplo-15 (IPCA-15) foi de 0,35% em setembro, ficando 0,07 ponto percentual acima da taxa de agosto (0,28%). No ano, o IPCA-15 acumula alta de 3,74% e, em 12 meses, de 5,00%, acima dos 4,24% nos 12 meses...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/IPCA15_Release.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/37946-ipca-15-e-de-0-35-em-setembro-e-ipca-e-e-de-0-56.html"
        }
    ])
    const [pagina, setPagina] = useState(1);
    const [qtdpag, setQtdPag] = useState([1]);
    const [noticiasexibir, setNoticiasExibir] = useState([
        {
            "titulo": "Produção industrial nacional tem variação de 0,4% em agosto",
            "desc": "Desempenho da indústria farmacêutica impactou no resultado do mês - Foto: Freepik A indústria do país apresentou uma variação positiva de 0,4% na passagem de julho para agosto, eliminando parte da queda de 0,6% verificada no mês anterior. Na comparação...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_10/PIM-BR_thumb-Freepik.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/38016-producao-industrial-nacional-tem-variacao-de-0-4-em-agosto.html"
        },
        {
            "titulo": "Produção industrial tem variação de 0,4% em agosto",
            "desc": "Em agosto de 2023, a produção industrial nacional variou 0,4% frente a julho, na série com ajuste sazonal. Em relação a agosto de 2022, o avanço foi de 0,5%. Frente a igual período de 2022, a indústria acumula taxa negativa no ano (-0,3%). O acumulado...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/PIM-PF-BR_Release1.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/38015-producao-industrial-tem-variacao-de-0-4-em-agosto.html"
        },
        {
            "titulo": "84,9% das indústrias de médio e grande porte utilizaram tecnologia digital avançada",
            "desc": "Mais de 90% das empresas que utilizaram robótica o fizeram na área de produção - Foto: Freepik Em 2022, 84,9% (8.134) das 9.586 empresas industriais com 100 ou mais pessoas ocupadas utilizaram pelo menos uma tecnologia digital avançada, sendo a...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/PINTEC_thumb.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37973-84-9-das-industrias-de-medio-e-grande-porte-utilizaram-tecnologia-digital-avancada.html"
        },
        {
            "titulo": "Preços na indústria sobem 0,92% em agosto, após seis meses de queda",
            "desc": "Refino de petróleo respondeu por 0,72 pontos percentuais na variação de 0,92% do IPP em agosto - Foto: André Mota de Souza/Ag Petrobras  Os preços da indústria subiram 0,92% em agosto frente a julho, voltando ao campo positivo depois de seis meses de...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/IPP_THUMB_AndreMottadeSouza_AgPetrobras.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37970-precos-na-industria-sobem-0-92-em-agosto-apos-seis-meses-de-queda.html"
        },
        {
            "titulo": "Índice de Preços ao Produtor (IPP) é de 0,92% em agosto",
            "desc": "Em agosto de 2023, os preços da indústria variaram 0,92% frente a julho, voltando ao campo positivo depois de seis meses. Nessa comparação, 12 das 24 atividades industriais tiveram variações positivas de preço. O acumulado no ano foi de -6,32%, a...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/IPP_Release.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/37969-indice-de-precos-ao-produtor-ipp-e-de-0-92-em-agosto.html"
        },
        {
            "titulo": "Valor de produção da silvicultura e da extração vegetal cresce 11,9% e atinge recorde de R$ 33,7 bilhões",
            "desc": "Área plantada da silvicultura somou 9,5 milhões de hectares, dos quais 77,3% são de eucalipto, e valor de produção atingiu R$ 27,4 bilhões - Foto: Fernando Dias/Ascom-Sepadr O Valor da produção florestal atingiu o recorde de R$ 33,7 bilhões, com alta de...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/PEVS_THUMB_Fernando-Dias-Ascom-Sepadr.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37963-valor-de-producao-da-silvicultura-e-da-extracao-vegetal-cresce-11-9-e-atinge-recorde-de-r-33-7-bilhoes.html"
        },
        {
            "titulo": "IPCA-15 fica em 0,35% em setembro, influenciado pela alta da gasolina",
            "desc": "Gasolina subiu 5,18%, e foi o maior impacto individual (0.25 p.p.) no índice de setembro - Foto: Helena Pontes/Agência IBGE Notícias A prévia da inflação ficou em 0,35% em setembro, 0,07 ponto percentual (p.p.) acima da taxa registrada em agosto (0,28%)....",
            "img": "https://ibge.gov.br/images/agenciadenoticias/estatisticas_economicas/2023_09/IPCA15_THUMB_Helena-Pontes.jpg",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37947-ipca-15-fica-em-0-35-em-setembro-influenciado-pela-alta-da-gasolina.html"
        },
        {
            "titulo": "IPCA-15 é de 0,35% em setembro e IPCA-E é de 0,56%",
            "desc": "O Índice Nacional de Preços ao Consumidor Amplo-15 (IPCA-15) foi de 0,35% em setembro, ficando 0,07 ponto percentual acima da taxa de agosto (0,28%). No ano, o IPCA-15 acumula alta de 3,74% e, em 12 meses, de 5,00%, acima dos 4,24% nos 12 meses...",
            "img": "https://ibge.gov.br/images/agenciadenoticias/releases/IPCA15_Release.png",
            "link": "http://agenciadenoticias.ibge.gov.br/agencia-sala-de-imprensa/2013-agencia-de-noticias/releases/37946-ipca-15-e-de-0-35-em-setembro-e-ipca-e-e-de-0-56.html"
        }
    ])
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

            exibirNoticias(1);

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
        exibirNoticias(e.target.id);
    }

    const exibirNoticias = (pag) => {
        console.log("PAGINA ATUAL: ", pag);
        let ate = (pag * 8) - 1;
        let de = (ate - 8) + 1;
        console.log(de, ate);

        let exibir = new Array();
        for(var i = de; i <= ate; i++){
            if(i < noticias.length){
                exibir.push(noticias[i]);
            }
        }
        console.log(exibir)
        setNoticiasExibir(exibir);
    }

  return (
        <Container className='card__noticias'>
            <Row>
                <Col className='noticias__titulo'>
                    <span>Notícias</span>
                </Col>
            </Row>
            <Row>
                {noticiasexibir.map(({titulo, desc, img, link}) => 
                    <Col className='card__tamanho' xxl={3} xl={3} lg={3} md={6} sm={6} xs={12} >
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={img} />
                            <Card.Body>
                                <Card.Title>{titulo}</Card.Title>
                                <Card.Text>
                                    {desc}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            <Row>
                <Col className='noticias__colpag'>
                    {qtdpag.map((e) => 
                        <span className={ (e == pagAtual) ? 'noticias__pag atual' : 'noticias__pag' } id={e} onClick={paginar}>{e}</span>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
export default CompNoticias;