const {classroom,userClassroom,user} = require('../models');
/*
exports.createClassroom = async (req,res,next) =>{
    if(req.body){
        if(req.body.class_tittle && req.body.class_url && req.body.class_description){
           const result = await classroom.create({
                class_tittle:req.body.class_tittle,
                class_url:req.body.class_url,
                class_description:req.body.class_description
            });
            console.log('Registro de aula criado com sucesso!');
            res.status(200).json({sucess:true, result: result.id});
        }else{
            console.log("primeiro missing data");
            res.status(400).json({sucess:false, reason: 'Missing Data'});
        }
    }else{
        console.log("segundo missing data");
        res.status(400).json({sucess:false, reason: 'Missing Data'});
    }
}*/

exports.createClassroomOne = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 1
        },
        defaults:{
        class_tittle:"Aula 01 - Curso Educação Financeira - O que é Educação Financeira - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=SiIztrwfg1s&t=13s",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
    }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 1 criado com sucesso!");
    } else {             
        console.log('Registro Aula 1 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwo = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 2
        },
        defaults:{
        class_tittle:"Aula 02 - Curso Educação Financeira - Teste Sua Inteligência - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=ZCMxPiWWTcw",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 2 criado com sucesso!");
    } else {             
        console.log('Registro Aula 2 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
    
}

exports.createClassroomThree = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 3
        },
        defaults:{
        class_tittle:"Aula 03 - Curso Educação Financeira - Planejando Sua Vida Financeira - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=tYg_khaEX8g",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 3 criado com sucesso!");
    } else {             
        console.log('Registro Aula 3 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
    
}

exports.createClassroomFour = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 4
        },
        defaults:{
        class_tittle:"Aula 04 - Curso Educação Financeira - Como Está Sua Saúde financeira - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=6ldpL8Kr3GE",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 4 criado com sucesso!");
    } else {             
        console.log('Registro Aula 4 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomFive = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 5
        },
        defaults:{
        class_tittle:"Aula 05 - Curso Educação Financeira - Planejamento Financeiro - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=EFywmTeuneU",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 5 criado com sucesso!");
    } else {             
        console.log('Registro Aula 5 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomSix = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 6
        },
        defaults:{
        class_tittle:"Aula 06 - Curso Educação Financeira - Sobre Emprestimos e Financiamentos - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=uM1J1HhTKEM",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 6 criado com sucesso!");
    } else {             
        console.log('Registro Aula 6 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomSeven = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 7
        },
        defaults:{
        class_tittle:"Aula 07 - Curso Educação Financeira - Acumulação de Capital - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=s0kuSzrA3nw",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 7 criado com sucesso!");
    } else {             
        console.log('Registro Aula 7 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomEight = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 8
        },
        defaults:{
        class_tittle:"Aula 08 - Curso Educação Financeira - O Investidor Bem Sucedido - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=wJ4wW6DUInE",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 8 criado com sucesso!");
    } else {             
        console.log('Registro Aula 8 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomNine = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 9
        },
        defaults:{
        class_tittle:"Aula 09 - Curso Educação Financeira - Plano Para Aposentadoria - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=LsvIA6wsDgQ",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 9 criado com sucesso!");
    } else {             
        console.log('Registro Aula 9 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 10
        },
        defaults:{
        class_tittle:"Aula 10 - Curso Educação Financeira - Conquistar Sua Liberdade Financeira - Escola Invest",
        class_url:"https://www.youtube.com/watch?v=-XhxCN3UI0M",
        class_description:"Aula do nosso curso completo sobre educação financeira. Nosso professor Daniel, explica os melhores e eficientes conceitos para você saber controlar suas finanças e ter maior controle sobre o seu dinheiro. Confira! ",
        courseId: 1
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 10 criado com sucesso!");
    } else {             
        console.log('Registro Aula 10 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomEleven = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 11
        },
        defaults:{
        class_tittle:"COMO A BOLSA FUNCIONA E COMO INVESTIR EM AÇÕES? (em menos de 10 MINUTOS!)",
        class_url:"https://www.youtube.com/watch?v=QP0obO3g2IM",
        class_description:"Você quer saber como funciona a Bolsa de Valores e como começar a investir em ações em 2022? Então acompanha esse vídeo!",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 11 criado com sucesso!");
    } else {             
        console.log('Registro Aula 11 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwelve  = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 12
        },
        defaults:{
        class_tittle:"Vale a Pena Investir Com Pouco Dinheiro? (Passo a Passo)",
        class_url:"https://www.youtube.com/watch?v=oU4KWj67ess",
        class_description:"Entenda de uma vez por todas se vale a pena ou não começar a investir com pouco dinheiro!",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 12 criado com sucesso!");
    } else {             
        console.log('Registro Aula 12 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomThirteen  = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 13
        },
        defaults:{
        class_tittle:"COMO ESCOLHER uma Corretora de Valores | Quais são as melhores corretoras de investimentos de 2022?",
        class_url:"https://www.youtube.com/watch?v=zrU2QlG1OFs",
        class_description:"Pós a compra da corretora Avenue pelo banco Itau.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 13 criado com sucesso!");
    } else {             
        console.log('Registro Aula 13 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomFourteen  = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 14
        },
        defaults:{
        class_tittle:"Como INVESTIR pra DIVERSIFICAR seus investimentos da forma CORRETA!",
        class_url:"https://www.youtube.com/watch?v=neZUOqJi2_E",
        class_description:"Agora, quando uma pessoa entende que a poupança é uma péssima opção e retira o seu dinheiro de lá para investir em outras aplicações por meio uma corretora.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 14 criado com sucesso!");
    } else {             
        console.log('Registro Aula 14 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomFiveteen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 15
        },
        defaults:{
        class_tittle:"FIIs para iniciantes: tudo o que você precisa saber para investir",
        class_url:"https://www.youtube.com/watch?v=PK7szsCaUW4",
        class_description:"Como escolher um fundo imobiliário. Tudo sobre FIIs para 2021 e FIIs para iniciantes. Os Fundos Imobiliários (FIIs) caíram no gosto do brasileiro.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 15 criado com sucesso!");
    } else {             
        console.log('Registro Aula 15 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomSixteen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 16
        },
        defaults:{
        class_tittle:"FUNDOS IMOBILIÁRIOS | EM QUAIS EU INVISTO?",
        class_url:"https://www.youtube.com/watch?v=SVpP-dVhGq8",
        class_description:"FAÇA AGORA SUA PRÉ - MATRÍCULA DO MIL AO MILHÃO: https://r.oprimorico.com.br/9703942376",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 16 criado com sucesso!");
    } else {             
        console.log('Registro Aula 16 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomSeventeen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 17
        },
        defaults:{
        class_tittle:"GUIA BÁSICO PRA INVESTIR EM RENDA FIXA | TUDO que você PRECISA SABER antes de investir em RENDA FIXA",
        class_url:"https://www.youtube.com/watch?v=18GRtRzOrMM",
        class_description:"FAÇA AGORA SUA PRÉ-MATRÍCULA PARA FINALMENTE ATINGIR A LIBERDADE FINANCEIRA: https://r.oprimorico.com.br/0087f3bddd",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 17 criado com sucesso!");
    } else {             
        console.log('Registro Aula 17 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomEighteen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 18
        },
        defaults:{
        class_tittle:"3 INVESTIMENTOS PARA INICIANTES NA RENDA FIXA | Investi R$ 100,00 na prática",
        class_url:"https://www.youtube.com/watch?v=_hkEeYnRk1U",
        class_description:"Faça sua inscrição na Turma 20 do Viver de Renda: https://r.vocemaisrico.com/9504bfe521",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 18 criado com sucesso!");
    } else {             
        console.log('Registro Aula 18 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomNineteen = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 19
        },
        defaults:{
        class_tittle:"Porque investir em DÓLAR!",
        class_url:"https://www.youtube.com/watch?v=bl9B--R-FJM",
        class_description:"Mesmo que as eleições possam já parecer desenhadas, indicando os possíveis candidatos à presidência  ou segundo turno.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 19 criado com sucesso!");
    } else {             
        console.log('Registro Aula 19 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwenty = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 20
        },
        defaults:{
        class_tittle:"ETFs: Como SE PROTEGER do RISCO BRASIL INVESTINDO EM DÓLAR no EXTERIOR de forma FÁCIL",
        class_url:"https://www.youtube.com/watch?v=FREcf2BwfG4",
        class_description:"ETFs: Como SE PROTEGER do RISCO BRASIL INVESTINDO EM DÓLAR no EXTERIOR de forma FÁCIL",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 20 criado com sucesso!");
    } else {             
        console.log('Registro Aula 20 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwentyOne = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 21
        },
        defaults:{
        class_tittle:"TUDO sobre investir em AÇÕES e por que elas são o MELHOR INVESTIMENTO",
        class_url:"https://www.youtube.com/watch?v=fmwMM2sv46U",
        class_description:"SIMBORA falar de TUDO que você precisa saber sobre investir em ações.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 21 criado com sucesso!");
    } else {             
        console.log('Registro Aula 21 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwentyTwo = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 22
        },
        defaults:{
        class_tittle:"MINHA CARTEIRA DE AÇÕES | Escolhendo minhas primeiras ações de dividendos | VIVER DE AÇÕES #001",
        class_url:"https://www.youtube.com/watch?v=r2gI9FF8SXY",
        class_description:"FAÇA SUA MATRÍCULA PARA O VIVER DE RENDA 21: https://r.vocemaisrico.com/entrenovrt21",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 22 criado com sucesso!");
    } else {             
        console.log('Registro Aula 22 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwentyThree = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 23
        },
        defaults:{
        class_tittle:"O PODER DE REINVESTIR DIVIDENDOS!",
        class_url:"https://www.youtube.com/watch?v=favfQh8bGyw",
        class_description:"O investidor afeito aos fundos imobiliários tem como um dos principais objetivos em sua jornada de investimentos a busca por dividendos.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 23 criado com sucesso!");
    } else {             
        console.log('Registro Aula 23 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwentyFour = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 24
        },
        defaults:{
        class_tittle:"COMO ANALISAR UMA AÇÃO | 5 indicadores para investir em ações",
        class_url:"https://www.youtube.com/watch?v=WXtJxRozku0",
        class_description:"Faça sua inscrição na Turma 20 do Viver de Renda: https://r.vocemaisrico.com/9504bfe521",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 24 criado com sucesso!");
    } else {             
        console.log('Registro Aula 24 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.createClassroomTwentyFive = async () =>{
    await classroom.findOrCreate({
        where:{
            id: 25
        },
        defaults:{
        class_tittle:"Os 2 ÚNICOS momentos em que devemos VENDER uma AÇÃO",
        class_url:"https://www.youtube.com/watch?v=QB1Z-8gB2aw",
        class_description:"Nesse vídeo vou mostrar quais são os 2 únicos momentos em que devemos vender uma ação. Ao aprendermos como comprar ações, normalmente temos a intenção de mantê-las por toda a vida.",
        courseId: 2
        }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro Aula 25 criado com sucesso!");
    } else {             
        console.log('Registro Aula 25 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createClassroomOne do arquivo classroomController: ', e);
});
}

exports.returnClassroom = async (req,res,next) =>{
        const result = await classroom.findAll({
            attributes: ["class_description","class_url","class_tittle","id"]
        })
        res.status(200).json({sucess:true, classroom: result});
}

exports.relationUserClassroom = async (req,res,next) =>{
    if(req.body.classroomId){
        const result = await userClassroom.findOrCreate({
            where:{
                userId: res.locals.id,
                classroomId: req.body.classroomId
            },
            defaults:{
                userId: res.locals.id,
                classroomId: req.body.classroomId
            }
        })
        if(result[1]){
            res.status(200).json({sucess: true, created: 'Relação criada'})
        }else{
            res.status(200).json({sucess:false, created: 'Relação já criada'});
        }
    }else{
        res.status(400).json({sucess:false, reason: 'Missing Data'});
    }
}

exports.classroomPerUser = async (req,res,next) =>{
    const result = await userClassroom.findAll({
        where:{
            userId:res.locals.id
        }
    })
    let aulasAluno = new Array();
    for(var i in result){
        const aula = await classroom.findOne({
            where:{
                id:result[i].classroomId
            }
        })
        aulasAluno.push(aula.id);
    }
    res.status(200).json({sucess:true, result:aulasAluno});
}