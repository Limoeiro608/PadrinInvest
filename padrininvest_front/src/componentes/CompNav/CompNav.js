import './assets/Style.css';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Icon, Input } from 'semantic-ui-react';
import logo2 from '../../assets/logo.png';
import logo1 from '../../assets/logo-padrin-allwhite.png';
import Api from '../../services/Api';
import { useNavigate } from 'react-router-dom';

function CompNav(){
    const navigate = useNavigate() 
    const[logado, setLogado] = useState(false);
    const[nome, setNome] = useState('');
    useEffect(() => {
      const checkJwt = async () => {
          let jwt = localStorage.getItem('auth')
          console.log(jwt)
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
                      setNome(res.fullName);
                  }
              }
          } else{
              console.log('nao logado')
              setLogado(false)
          }
      }

      checkJwt();
}, [])

    async function sair(){
      console.log(true);
      let jwt = localStorage.getItem("auth");
      console.log(jwt);
      let res = await Api.logout(jwt);
      console.log(res);
      if(res.sucess == true){
          localStorage.setItem('auth', "");
          navigate("/login");
      } else {
          console.log("Ocorreu um erro, entre em contato com um administrador");
          navigate('/login')
      }

    }

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className='navbar__cont'>
          <Navbar.Brand onClick={() => navigate('/')}>
            <img className='logo2' src={logo2} alt='logo-padrin'/>
            <img className='logo1' src={logo1} alt='logo-padrin-text'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav className='nav__texto'>
              <Nav.Link onClick={() => navigate('/')}>INÍCIO</Nav.Link>
              <Nav.Link onClick={() => navigate('/noticias')}>NOTÍCIAS</Nav.Link>
              <NavDropdown title="CURSOS" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate('/cursos')}>Iniciante</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/cursos2')}>
                  Avançado
                </NavDropdown.Item>
            </NavDropdown>
              <Nav.Link onClick={() => navigate('/investimentos')}>INVESTIMENTOS</Nav.Link>
            </Nav>
            {!logado?(<div>
              <Button onClick={() => navigate('/login')} variant="light" className='nav__btnLogin'>
                Entrar
              </Button>{' '}
            </div>):(<div className='compnav__btn'>
              <span>Olá, {nome} </span>
              <Button onClick={sair} variant="light" className='nav__btnLogin'>
                Sair
              </Button>{' '}
            </div>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default CompNav;