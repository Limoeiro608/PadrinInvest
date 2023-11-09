const url = "http://localhost:3001";

const Api = {

    login: async function(email, senha){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify({
            'email': email, 
            'password': senha
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/user/loginUser`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    checkjwt: async function(jwt){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', jwt);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch (`${url}/api/user/validaToken`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        
        return res;
    }, 
    logout: async function(jwt){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', jwt);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch (`${url}/api/user/logoutUser`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));

        return res;
    },

    cadastro: async function(nome, email, senha){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify({
            'fullName': nome, 
            'email': email,
            'password': senha
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/user/createUser`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },

    sendcode: async function(email){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify({
            'userMail': email
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/user/passwordReset/sendCode`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },

    validatecode: async function(pinCode){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify({
            'code': pinCode
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/user/passwordReset/validateCode`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },

    updatesenha: async function(pinCode, senha){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var raw = JSON.stringify({
            'code': pinCode,
            'newPassword': senha
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/user/passwordReset/resetPassword`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    noticias: async function(){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch ('https://servicodados.ibge.gov.br/api/v3/noticias', requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        
        return res;
    },
    getaulas: async function(jwt, id){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'courseId': id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/course/returnClassroomPerCourse`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    setaulas: async function(jwt, id, cursoid){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'classroomId': id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/classroom/relationUserClassroom`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    getassistido: async function(jwt, cursoid){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(`${url}/api/classroom/classroomPerUser`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    getacao: async function(jwt, stock){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'stock': stock
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/stock/localizationStock`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    getinfo: async function(jwt, stock){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'stock': stock
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/stock/readStock`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    setacao: async function(jwt, stock, cotacao, valorPago, date){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'stock': stock,
            'cotacao': cotacao,
            'valorPago': valorPago,
            'date': date
        });

        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/stock/saveStock`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    deleteacao: async function(jwt, stockid){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'stockId': stockid
        });

        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/stock/deleteStock`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
    historico: async function(jwt, stock, range){
        let res;
        var myHeaders = new Headers();
        myHeaders.append('Authorization', jwt);
        
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            'stock': stock,
            'range': range
        });

        console.log(raw);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`${url}/api/stock/historicStock`, requestOptions)
        .then(response => {
            res = response.json();
        })
        .catch(error => console.log('error', error));
        return res;
    },
}

export default Api;