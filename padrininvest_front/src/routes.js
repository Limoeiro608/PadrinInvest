import React from 'react';
import ReactDOM from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './paginas/login/Login';
import Reset from './paginas/reset/Reset';
import Inicio from './paginas/inicio/Inicio';
import Noticias from './paginas/noticias/Noticias';
import Cursos from './paginas/cursos/Cursos';
import Investimento from './paginas/investimento/Investimento';
import Cursos2 from './paginas/cursos/Cursos2';

function Rotas(){
    return (
        <BrowserRouter>
         <Routes>
            <Route path='/login' element={ <Login /> }/>
            <Route path='/reset' element={ <Reset /> }/>
            <Route path='/' element={ <Inicio />}/>
            <Route path='/inicio' element={ <Inicio/>}/>
            <Route path='/noticias' element={ <Noticias/>}/>
            <Route path='/cursos' element= { <Cursos/>}/>
            <Route path='/cursos2' element= { <Cursos2/>}/>
            <Route path='/investimentos' element= { <Investimento/>}/>
         </Routes>
        </BrowserRouter>
    )
}

export default Rotas;