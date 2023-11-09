import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Nav, Form } from 'react-bootstrap';
import 'semantic-ui-css/semantic.min.css'
import { Input } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
import Modal from 'react-bootstrap/Modal';
import { GoPlusCircle } from "react-icons/go";
import { CiCircleRemove } from 'react-icons/ci';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import Api from '../../services/Api';
import { useNavigate } from 'react-router-dom';
import { Chart } from "react-google-charts";


export function CompInvestimento() {

        const navigate = useNavigate();
        const [busca, setBusca] = useState([]);
        const [totInvest, setTotInvest] = useState('0');
        const [show, setShow] = useState(false);
        const [show2, setShow2] = useState(false);
        const [tempAcao, setTempAcao] = useState('');
        const [tempVal, setTempVal] = useState('');
        const [tempTotal, setTempTotal] = useState(0);
        const [acoes, setAcoes] = useState([]);
        const [grafAcao, setGrafAcao] = useState("");
        const [dataJs, setDataJs] = useState('');
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
                        alert("Faça o login para continuar");
                        navigate('/login');
                    } else{
                        if(!res.valid){
                            localStorage.setItem('auth', '')
                            alert("Faça o login para continuar");
                            navigate('/login');
                        } else{
                            console.log("logado");

                            let busca = await Api.getinfo(jwt, tempAcao);
                            console.log(busca)
                            if(busca.result){
                                setAcoes(busca.result);
                                calcTotal(busca.result)
                            }
                            
                        }
                    }
                } else{
                    alert("Faça o login para continuar");
                    navigate('/login');
                }
            }
    
            checkJwt();
        }, [])

        function calcTotal(busca){
            let arr = new Array();
            for(var i in busca){
                let val = Number(busca[i].valorPago) * Number(busca[i].cotacao);
                arr.push(val);
            }
            console.log(arr);
            var sum = arr.reduce(function(accumulator,value){
                return accumulator + value
            },0);
            console.log(sum);
            console.log();
            setTotInvest(new Intl.NumberFormat("pt-BR").format(sum.toFixed(2)))
        }

        function buscar(){
            let val = document.getElementById('buscaAcao').value;
            console.log(val);
            if(val.length < 5){
                alert("Adicione uma ação válida");
                setBusca([]);
            } else {
                if(val.indexOf("ibov") != -1){
                    alert("Adicione uma ação válida");
                } else {
                    getAcao(val);
                }
                
            }
        }

        async function getAcao(val){
            let jwt = localStorage.getItem('auth');
            let res = await Api.getacao(jwt, val);
            console.log(res);
            if(!res.sucess){
                alert('Ocorreu um erro ao buscar a ação, tente novamente.');
            } else {
                console.log("res foi true")

                if(res.price != null && res.price != undefined && res.price != ""){
                    let act = [{'preco': res.price, 'stock': res.stock, 'nome': res.longName}];
                    setBusca(act);
                } else {
                    alert('Não foi possível localizar esta ação.');
                    setBusca([]);
                }
            }
        }

        const handleClose = () => setShow(false);
        const handleClose2 = () => {
            setGrafAcao("");
            setShow2(false);
        }
        const handleShow = () => {
            let data = new Date();
            let dia = ''+ data.getDate() + '';
            console.log(dia);
            dia = (dia.length == 1) ? '0' + dia : dia;
            let mes = '' + (data.getMonth() + 1) + '';
            console.log(mes);
            mes = (mes.length == 1) ? '0' + mes : mes;
            let newdata = data.getFullYear() + "-" + mes + "-" + dia;
            console.log(newdata)
            setDataJs(newdata);
            setShow(true);
        }
        const handleShow2 = (acao) => {
            setGrafAcao(acao)
            setShow2(true);
        }

        function adicionarAcao(acao, preco){
            console.log(acao);
            setTempAcao(acao);
            console.log(preco);
            setTempVal(preco)
            setTempTotal(preco);
            handleShow()
        }

        const atualiza = (e) => {
            let val = e.target.value;
            if(Number(val) > 0){
                console.log("Entrou");
                let total = Number(tempVal) * Number(val);
                console.log(total);
                setTempTotal(new Intl.NumberFormat("pt-BR").format(total));
            } else {
                console.log("Não entrou");
                setTempTotal(0);
            }
        }

        const atualiza2 = (e) => {
            let val = document.getElementById('txtQTD').value;
            if(Number(val) > 0){
                console.log("Entrou");
                let total = Number(tempVal) * Number(val);
                console.log(total);
                setTempTotal(new Intl.NumberFormat("pt-BR").format(total));
            } else {
                console.log("Não entrou");
                setTempTotal(0);
            }
        }

        const atualizaVal = (e) => {
            setTempVal(e.target.value);
        }

        async function salvarAcao(){
            console.log("Salvou");

            let cot = document.getElementById('txtQTD').value;
            let dat = document.getElementById('txtData').value;
            console.log(dat);

            if((cot != "" && cot != undefined && cot != null) && (tempVal != "" && tempVal != undefined && tempVal != null) && (dat != "" && dat != undefined && dat != null)){
                if(Number(cot) > 0 && Number(tempVal) > 0){
                    let jwt = localStorage.getItem('auth');
                    console.log(tempVal)
                    let res = await Api.setacao(jwt, tempAcao, cot, tempVal, dat);
                    console.log(res);
                    if(res.save){
                        handleClose();
                        document.getElementById('txtQTD').value = '';
                        setTempAcao('');
                        setTempTotal('0');
                        setTempVal('');
                        alert("Ação salva com sucesso")

                        let busca = await Api.getinfo(jwt, '');
                        console.log(busca)
                        if(busca.sucess){
                            setAcoes(busca.result)
                            calcTotal(busca.result)
                        }

                    } else {
                        handleClose();
                        document.getElementById('txtQTD').value = '';
                        setTempAcao('');
                        setTempTotal('0');
                        setTempVal('');
                        alert("Erro: " + res.created);
                    }
                } else {
                    alert("Preencha os campos corretamente");
                }
            } else {
                alert("Preencha os campos corretamente");
            }
            
        }

        async function deleteStock(id){
            let jwt = localStorage.getItem('auth');
            let res = await Api.deleteacao(jwt, id);
            console.log(res);
            if(res.sucess){
                alert("Ação deletada com sucesso.");
                let busca = await Api.getinfo(jwt, '');
                console.log(busca)
                if(busca.sucess){
                    setAcoes(busca.result)
                    calcTotal(busca.result)
                }
            } else {
                alert("Não foi possível deletar esta ação. Tente novamente mais tarde.");
            }
        }

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

        async function grafico(acao, range){
            console.log(acao, range)
            let jwt = localStorage.getItem('auth');
            let res = await Api.historico(jwt, acao, range);
            handleClose2();
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
                setOptGraf({
                    title: "Ação: "+ acao,
                    series: {
                        0: { color: '#860EBE' }
                    }
                })
            } else {
                alert("Não foi possível buscar informações desta ação. Tente novamente mais tarde.")
            }
            
        }

        const atualizaData = (e) => {
            setDataJs(e.target.value);
        }
        
        
        return(    
            <Container>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar Ação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <p>Adicionar ação {tempAcao} ao monitoramento</p>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <div className='tabela__campos'>
                                    <label htmlFor="txtData">Data</label>
                                    <input className='form-control' type="date" id='txtData' value={dataJs} onChange={atualizaData} />
                                </div>
                            </Col>
                            <Col>
                                <div className='tabela__campos'>
                                    <label htmlFor="txtValor">Valor pago</label>
                                    <input className='form-control' type="number" id='txtValor' onChange={atualizaVal} value={tempVal} onBlur={atualiza2}/>
                                </div>
                            </Col>
                            <Col>
                                <div className='tabela__campos'>
                                    <label htmlFor="txtQTD">Quantidade</label>
                                    <input className='form-control' type="number" id='txtQTD' onBlur={atualiza} />
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <span>Valor investido: <strong>R$ {tempTotal}</strong></span>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={salvarAcao}>
                        Salvar
                    </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show2} onHide={handleClose2} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Buscar Histórico</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <p>Selecione o periodo de consulta:</p>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <div className='tabela__campos'>
                                    <Form.Select name="txtRange" id="txtRange">
                                        <option value="5d" selected>5 Dias</option>
                                        <option value="1mo">1 Mês</option>
                                        <option value="3mo">3 Meses</option>
                                    </Form.Select>
                                </div>
                            </Col>
                        </Row>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => grafico(grafAcao, document.getElementById("txtRange").value)}>
                        Buscar
                    </Button>
                    </Modal.Footer>
                </Modal>
                
                <Row className='investimentos__tamanho'>
                    <span className='investimentos__text'>Buscar Investimentos</span>
                     <Input className ='tabela__inputPesquisa' id="buscaAcao" action={{content: 'Buscar', onClick: () => buscar()}} placeholder='Buscar investimentos...' />
                            <Col>
                                <Table celled fixed singleLine>
                                    <Table.Header style={{textAlign: 'center'}}>
                                    <Table.Row>
                                        <Table.HeaderCell>Ação</Table.HeaderCell>
                                        <Table.HeaderCell>Valor</Table.HeaderCell>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>Adicionar</Table.HeaderCell>
                                    </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                    {busca.map(({preco, stock, nome}) => (
                                        <Table.Row>
                                            <Table.Cell>{stock}</Table.Cell>
                                            <Table.Cell>R$ {new Intl.NumberFormat("pt-BR").format(preco)}</Table.Cell>
                                            <Table.Cell>{nome}</Table.Cell>
                                            <Table.Cell>
                                                <div className='tabela__icons' onClick={() => adicionarAcao(stock, preco)}><GoPlusCircle/></div>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                    </Table.Body>
                                </Table>
                            </Col>
                    </Row>
                    <br />
                    <br />
                    <Row className='investimentos__tamanho'>
                        <span className='investimentos__text'>Meus investimentos</span><br />
                        <span>Total investido: <strong style={{color: '#860EBE'}}>R$ {totInvest}</strong></span><br /><br />
                        <Col>
                            <Table celled fixed singleLine>
                                <Table.Header style={{textAlign: 'center'}}>
                                <Table.Row>
                                    <Table.HeaderCell>Ação</Table.HeaderCell>
                                    <Table.HeaderCell>Data da compra</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Pago</Table.HeaderCell>
                                    <Table.HeaderCell>Quantidade</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Investido</Table.HeaderCell>
                                    <Table.HeaderCell>Acompanhar</Table.HeaderCell>
                                    <Table.HeaderCell>Remover</Table.HeaderCell>
                                </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                {acoes.map(({stock, cotacao, valorPago, id, date}) => (
                                    <Table.Row>
                                        <Table.Cell>{stock}</Table.Cell>
                                        <Table.Cell>{date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]}</Table.Cell>
                                        <Table.Cell>R$ {new Intl.NumberFormat("pt-BR").format(valorPago)}</Table.Cell>
                                        <Table.Cell>{cotacao}</Table.Cell>
                                        <Table.Cell>R$ {new Intl.NumberFormat("pt-BR").format((valorPago * cotacao))}</Table.Cell>
                                        <Table.Cell>
                                            <div className='tabela__icons' onClick={() => handleShow2(stock)}><IoSearchCircleOutline /></div>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className='tabela__icons' onClick={() => deleteStock(id) }><CiCircleRemove /></div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                                </Table.Body>
                            </Table>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col className='grafico'>
                            <span className='grafico__titulo'>Meus investimentos</span>
                            <Chart
                            chartType="LineChart"
                            data={grafData}
                            options={optGraf}
                            width={"100%"}
                            height={"400px"}
                            />
                        </Col>
                    </Row>
                    <br />
                    <br />
            </Container>
    );
}
