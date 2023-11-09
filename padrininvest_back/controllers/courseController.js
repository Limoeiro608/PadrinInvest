const {course,classroom} = require('../models');

exports.createCourseOne = async () =>{
    await course.findOrCreate({
        where:{
            id: 1
        },
        defaults:{
            course_tittle:"Módulo 1 'Fundamentos do investidor' (iniciante)",
            course_description: "Este módulo é o ponto de partida ideal para quem busca equilibrar suas finanças, livrar-se das dívidas e construir um futuro financeiro sólido. Junte-se a nós para dar os primeiros passos em direção a um caminho de independência financeira e sucesso nos investimentos."
       }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro curso 1 criado com sucesso!");
    } else {             
        console.log('Registro curso 1 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createCourseOne do arquivo courseController: ', e);
});
}

exports.createCourseTwo = async () =>{
    await course.findOrCreate({
        where:{
            id: 2
        },
        defaults:{
            course_tittle:"Módulo 2 'Investidor inteligente' (avançado).",
            course_description: "Este módulo é ideal para aqueles que desejam levar seus conhecimentos financeiros para o próximo nível, aproveitando ao máximo seu patrimônio e trabalhando em direção à independência financeira. Junte-se a nós para explorar estratégias avançadas de investimento e construir o futuro financeiro que você deseja."
       }
    }
).then((result) => {
    if (result[1]) {     
        console.log("Registro curso 2 criado com sucesso!");
    } else {             
        console.log('Registro curso 2 já criado!');
    }
}).catch((e) => {
    console.error('Erro na função createCourseOne do arquivo courseController: ', e);
});
}

exports.returnClassroomPerCourse = async (req,res,next) =>{
    if(req.body){
        if(req.body.courseId){
            const result = await classroom.findAll({
                where:{
                    courseId:Number(req.body.courseId)
                },
                attributes: ["id","class_tittle", "class_url","courseId"]
            });
            res.status(200).json({sucess:true, classroom: result});
        }else{
            res.status(400).json({sucess: false, reason: 'Missing data'});
        }
    }else{
        res.status(400).json({sucess: false, reason: 'Missing data'});
    }
}