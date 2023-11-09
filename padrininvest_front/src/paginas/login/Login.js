import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Icon, Input } from 'semantic-ui-react';
import { AiOutlineUser, AiOutlineCheck } from "react-icons/ai";
import { BiSolidKey } from "react-icons/bi";
import { FiMail } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import Api from '../../services/Api';
import logo1 from '../../assets/logo-padrin.png';

function Login() {

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

    // Criado variável de estado responsável por definir se o usuário está na navegação de login ou cadastro
    const [login, setLogin] = useState(true); // false = cadastro - true = login

    const entrar = () => {
        let email = document.getElementById('txtEmail').value;
        let senha = document.getElementById('txtSenha').value;
        if (email=='' || email==null || email==undefined) {
            alert('Necessario informar o endereco de e-mail.')
            return;
        } else {
            if (email.indexOf('@')==-1 || email.indexOf('@')==(email.length-1)) {
                alert('Informe um e-mail valido.')
                return; 
            }
        }
        execLogin(email, senha);
    } 
     const cadastrar = () => {
        let nome = document.getElementById('txtNomeCad').value;
        let email = document.getElementById('txtEmailCad').value;
        let senha = document.getElementById('txtSenhaCad').value;
        let confSenha = document.getElementById('txtConfSenhaCad').value;
        if (nome=='' || nome==null || nome==undefined) {
            alert('Necessario informar um nome')
            return;
        } else {
            if (nome.indexOf(' ')==-1 || nome.indexOf(' ')==(nome.length-1)) {
                alert('Informar nome completo.')
                return;
            }
        }
        if (email=='' || email==null || email==undefined) {
            alert('Necessario informar o endereco de e-mail.')
            return;
        } else {
            if (email.indexOf('@')==-1 || email.indexOf('@')==(email.length-1)) {
                alert('Informe um e-mail valido.')
                return; 
            }
        }
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
        execCadastro(nome, email, senha);
     } 
    async function execCadastro(nome, email, senha){
        let res = await Api.cadastro(nome, email, senha);
        console.log(res)
        if(!res.sucess){
            alert("Ocorreu um erro ao fazer o cadastro: Tente novamente mais tarde.");
        } else {
            alert ('Cadastro efetuado com sucesso: Efetue o login.')
            setLogin(true)
        }
    }

    async function execLogin(email, senha){
        let res = await Api.login(email, senha);
        console.log(res)
        if(!res.sucess){
            alert("Erro ao fazer login: Usuário ou senha inválidos");
        } else {
            let jwt = res.token;
            localStorage.setItem('auth', jwt)
            console.log(localStorage.getItem('auth'));
            navigate('/')
        }
    }

    // Função de chamada de ação para alterar navegação entre cadastro e login
    const switchMode = (e) => { // Atributo e (event) sendo recebido

        // Variável ID que recebe o id da origem da execução (botão switch de cadastro ou login)
        let id = e.target.id;

        // Verificação da origem (se id == "btnSwitchEntrar" ele clicou no botão de entrar)
        if(id == 'btnSwitchEntrar'){
            console.log("Ele clicou em entrar");

            // Seta a variável de estado para true (navegação de login)
            setLogin(true);

        // Caso a origem não tenha sido o botão de entrar, partiu obrigatóriamente do botão de cadastrar
        } else {
            console.log("Ele clicou em cadastrar");

             // Seta a variável de estado para false (navegação de cadastro)
            setLogin(false);
        }

        console.log(login);
    }

    return (
        <Container fluid className='login__container'>
                <Col className='login__fundo' xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}> 
                    <div className='login__titulo'>
                       <img src={logo1} alt='logo padrin invest'/>
                    </div>
                    <div className='login__switch'>
                        {/* Verifica através de if ternário em qual navegação ele está e exibe a classe "ativo" ou "inativo" */}
                        <Button className={ login ? 'login__btnativo login__btnentrar' : 'login__btninativo login__btnentrar'} id='btnSwitchEntrar' onClick={switchMode}>Entrar</Button>
                        <Button className={ login ? 'login__btninativo login__btncadastrar' : 'login__btnativo login__btncadastrar'} id='btnSwitchCadastrar' onClick={switchMode}>Cadastrar</Button>
                    </div>

                    {/* Verifica através de if ternário se a navegação é de login e se sim, exibe os campos de login */}
                    { login && (<div className='login__campos'>
                        <Input id='txtEmail' iconPosition='left' className='login__input' type='email' placeholder='E-mail'> 
                            <Icon><FiMail className='login__icon' /></Icon>
                            <input />
                        </Input>
                        <Input id='txtSenha' iconPosition='left' className='login__input' type='password' placeholder='Senha'>
                            <Icon><BiSolidKey className='login__icon'/></Icon>
                            <input/>
                        </Input>
                        <span className='login__info' onClick={() => {navigate('/reset')}}>Esqueci minha senha</span>
                    </div>)}

                    {/* Verifica através de if ternário se a navegação é de cadastro e se sim, exibe os campos de cadastro */}
                    { !login && (<div className='login__campos'>
                        <Input id='txtNomeCad' iconPosition='left' className='login__input' type='text' placeholder='Nome'>
                            <Icon><AiOutlineUser className='login__icon'/></Icon>
                            <input/>
                        </Input>
                        <Input id='txtEmailCad' iconPosition='left' className='login__input' type='email' placeholder='E-mail'>
                            <Icon><FiMail className='login__icon' /></Icon>
                            <input />
                        </Input>
                        <Input id='txtSenhaCad' iconPosition='left' className='login__input' type='password' placeholder='Senha'>
                            <Icon><BiSolidKey className='login__icon'/></Icon>
                            <input/>
                        </Input>
                        <Input id='txtConfSenhaCad' iconPosition='left' className='login__input' type='password' placeholder='Confirmar Senha'>
                            <Icon><BiSolidKey className='login__icon'/></Icon>
                            <input/>
                        </Input>
                    </div>)}

                    {/* Verifica através de if ternário se a navegação é de login e se sim, exibe o botão de entrar */}
                    { login && (<div className='login__botao'>
                        <Button onClick={entrar}>Entrar</Button>
                    </div>)}

                    {/* Verifica através de if ternário se a navegação é de cadastro e se sim, exibe o botão de cadastrar */}
                    { !login && (<div className='login__botao'>
                        <Button onClick={cadastrar}>Cadastrar</Button>
                    </div>)}
                </Col>
        </Container>
    );
 }

 export default Login;