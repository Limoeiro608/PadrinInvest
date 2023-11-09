import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Icon, Input } from 'semantic-ui-react';
import { FiMail } from "react-icons/fi";
import { BiSolidKey } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import ReactCodeInput from 'react-code-input';
import Api from '../../services/Api'; 

function Reset(){

    const navigate = useNavigate();

    useEffect(() => {
        const checkJwt = async () => {
            let jwt = localStorage.getItem('auth')
            if (jwt != null && jwt != undefined && jwt != ''){
                let res = await Api.checkjwt(jwt);
                console.log(res)
                if(!res.sucess){
                    localStorage.setItem('auth', '')
                } else{
                    if(!res.valid){
                        localStorage.setItem('auth', '')
                    } else{
                        navigate('/')
                    }
                }
            } else{
                console.log('nao logado')
            }
        }

        checkJwt();
    }, [])
    
    const [reset, setReset] = useState(true);
    const [code, setCode] = useState(false);
    const [update, setUpdate] = useState(false);
    const [pinCode, setPinCode] = useState('');
    const [mail, setMail] = useState('');

    const enviarCodigo = () => {
        let email = document.getElementById('txtEmail').value;
        if (email=='' || email==null || email==undefined) {
            alert('Necessario informar o endereco de e-mail.')
            return;
        } else {
            if (email.indexOf('@')==-1 || email.indexOf('@')==(email.length-1)) {
                alert('Informe um e-mail valido.')
                return; 
            }
        }
        execSendCode(email)
        console.log('Enviou')
        };
    async function execSendCode(email) {
        let res = await Api.sendcode(email)
        console.log(res)
            if(!res.sucess_code) {
                alert('Nao foi possivel enviar o codigo: Tente novamente mais tarde.')
                return;
            } else {
                setMail(email)
                setReset(false)
                setCode(true)
            }
        }
        const validarCodigo = () => {
            console.log(pinCode);
            if(pinCode != null && pinCode != undefined && pinCode != ""){
                if(pinCode.length >= 6){
                    validarLogin();
                } else {
                    alert("Preencha o código corretamente");
                }
            } else {
                alert("Preencha o código corretamente");
            }
        }
    async function validarLogin(){
        let res = await Api.validatecode(pinCode)
        console.log(res)
        if(!res.sucess) {
            alert('Ocorreu um erro ao validar o codigo: Tente novamente mais tarde.')
            return;
        } else {
            if(res.valid) {
                setCode(false)
                setUpdate(true)
            } else {
                alert('O codigo informado e invalido ou expirou.')
            }
        } 
    }
        const atualizarSenha = () => {
            //navigate('/')
            let senha = document.getElementById('txtSenha').value;
            let confSenha = document.getElementById('txtConfSenha').value;
            if (senha=='' || senha==null || senha==undefined) {
                alert('Necessario informar a senha.')
                return;
            } else {
                if (senha.length < 6) {
                    alert('Necessario ter 6 caracteres ou mais.')
                    return;
                }
            }
            if (confSenha=='' || confSenha==null || confSenha==undefined) {
                alert('Necessario informar a confirmacao de senha.')
                return;
            } else {
                if (confSenha != senha) {
                    alert('As senha precisam ser iguais.')
                    return;
                }
            }

        execUpdateSenha(senha)
        
        }
    async function execUpdateSenha(senha){
        let res = await Api.updatesenha(pinCode, senha)
        console.log(res)
        if(!res.sucess) {
            alert('Nao foi possivel redefinir a senha: Tente novamente mais tarde.')
            setUpdate(false)
            setCode(true)
            execSendCode(mail)
        } else {
            alert('Senha alterada com sucesso: Efetue o login')
            navigate('/login')
        }

    }
        const handlePinChange = pinCode => {
            setPinCode(pinCode);
        }
        

    return (
        <Container fluid className='reset__container'>
            <Col className='reset__fundo' xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}>
                <div className='reset__titulo'>
                    <h1>Recuperar Senha</h1>
                </div>
                <div className='reset__descricao'>
                    {reset && (<span>Preencha seu e-mail para recuperar a senha</span>)}
                    {code && (<span>Informe o codigo enviado para {mail}</span>)}
                    {update && (<span>Informe a nova senha:</span>)}
                </div>
                <div className='reset__campos'>
                    { reset && (<Input id='txtEmail' iconPosition='left' className='reset__input' type='email' placeholder='E-mail'> 
                        <Icon><FiMail className='reset__icon' /></Icon>
                        <input />
                    </Input>) }
                    { code && (<div className='reset__codigo'>
                        <ReactCodeInput 
                            id='pinCode'
                            type='number'
                            fields={6}
                            onChange={handlePinChange}
                            value={pinCode}
                        /> <br/>
                        <span onClick={() => execSendCode(mail)} className='login__info'>Reenviar Código</span>
                    </div>)}
                    { update &&(<Input id='txtSenha' iconPosition='left' className='login__input' type='password' placeholder='Senha'>
                        <Icon><BiSolidKey className='login__icon'/></Icon>
                        <input/>
                    </Input>)}
                    { update &&(<Input id='txtConfSenha' iconPosition='left' className='login__input' type='password' placeholder='Confirmar Senha'>
                        <Icon><BiSolidKey className='login__icon'/></Icon>
                        <input/>
                    </Input>)}
                </div>
                <div className='reset__botao'>
                    { reset && (<Button onClick={enviarCodigo}>Enviar Código</Button>) }
                    { code &&(<Button onClick={validarCodigo}>Validar Código</Button>)}
                    { update &&(<Button onClick={atualizarSenha}>Atualizar Senha</Button>)}
                </div>
                <span className='reset__info' onClick={() => {navigate('/')}}>Retornar para login</span>
            </Col>
        </Container>
    )
}

export default Reset;