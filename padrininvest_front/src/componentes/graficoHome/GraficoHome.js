import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button,} from 'react-bootstrap';
import { Chart } from "react-google-charts";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import Api from '../../services/Api';
import { FcLock, FcUnlock } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

export const data = [
    ["Language", "Speakers (in millions)"],
    ["German", 5.85],
    ["French", 1.66],
    ["Italian", 0.316],
    ["Romansh", 0.0791],
    ];

export const options = {
    legend: "none",
    pieSliceText: "label",
    title: "",
    pieStartAngle: 100,
};

export function GraficoHome() {

    const navigate = useNavigate();

    const [logado, setLogado] = useState(false);
    const [acoes, setAcoes] = useState(['bbas3', 'vale3', 'petr4', 'b3sa3', 'egie3']);
    const [tempTitulo, setTempTitulo] = useState('');
    const [grafData, setGrafData] = useState([
        ["Task", "Valor de fechamento em reais"],
        ["null", 0]
    ]);
    const [optGraf, setOptGraf] = useState({
        title: "Ação: ",
        series: {
            0: { color: '#860EBE' }
        }
    });

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
                        checkIbov(jwt);
                    }
                }
            } else{
                console.log('nao logado')
                setLogado(false)
            }
        }

        checkJwt();

        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function formatDate(date) {
            return [
              padTo2Digits(date.getDate()),
              padTo2Digits(date.getMonth() + 1),
              date.getFullYear(),
            ].join('/');
        }

        function random_item(items){
            return items[Math.floor(Math.random()*items.length)];
        }

        async function checkIbov(jwt){

            const acc = random_item(acoes);
            setTempTitulo(acc.toUpperCase()); 
            console.log(tempTitulo)

            setOptGraf({
                title: "Ação: " + acc.toUpperCase(),
                series: {
                    0: { color: '#860EBE' }
                }
            });
            
            let res = await Api.historico(jwt, acc, '3mo');
            console.log(res);
            if(res.sucess){
                let arrayData = '[["Task", "Valor de fechamento em reais"]';
                const tam = res.brapi[0].historicalDataPrice.length
                for(var i = 0; i < tam; i++){
                    arrayData += ',["' + formatDate(new Date(res.brapi[0].historicalDataPrice[i].date * 1000)) + '",' + res.brapi[0].historicalDataPrice[i].close + ']';
                }
                arrayData += "]";
                console.log(arrayData);
                let arr = JSON.parse(arrayData);
                console.log(arr);
                setGrafData(arr);
            } else {
                setGrafData([
                    ["Task", "Valor de fechamento em reais"],
                    ["null", 0]
                ]);
            }
        }

    }, [])


    return (
        <Container>
            <Row>
                <Col className='graficoHome__tamanho'>
                <span className='graficoHome__titulo' onClick={ !logado ? () => navigate('/login') : () => navigate('/investimentos')}>Investimentos<IoIosArrowDroprightCircle className='curso__arrow'/></span>
                    <div className={ !logado && ('graficoHome__naologado') }>
                        <Chart
                            chartType="LineChart"
                            data={grafData}
                            options={optGraf}
                            width={"100%"}
                            height={"400px"}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
        );
}
