// console.log("Halo halo ayo kita belajar node js web service")
const http = require('http');
const { resolve } = require('path');

const requestListener = (request, response) =>{
    response.setHeader('Content-Type','text/html');
    response.statusCode = 200;
    
    const { url, method } = request;

    if(url === '/'){
        
    }
    if(method === 'GET'){
        response.end('<h1>Halo ini adalah HTTP Server! Method GET</h1>');
    }

    if(method === 'POST'){
        let body = []

        request.on('data', (chunck)=>{
            body.push(chunck);
        });

        request.on('end', ()=>{
            body = Buffer.concat(body).toString();
            const {name} = JSON.parse(body)
            response.end(`<h1>Halo ${name} \nini adalah HTTP Server! Method POST</h1>`);
        });

    }

    // if(method === 'PUT'){
    //     response.end('<h1>Halo ini adalah HTTP Server! Method PUT</h1>');
    // }

    // if(method === 'DELETE'){
    //     response.end('<h1>Halo ini adalah HTTP Server! Method DELETE</h1>');
    // }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port,host, ()=>{
    console.log(`Server berjalan pada http://${host}:${port}`)
})