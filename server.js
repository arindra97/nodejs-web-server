const http = require('http')

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { url, method } = request;

    if(url === '/'){
        if(method === 'GET'){
            response.end(`<h1>Ini adalah homepage</h1>`)
        }else(
            response.end(`Halaman ini tidak dapat diakses dengan ${method} request`)
        )
    }
    
    if(url === '/about'){
        let body = []

        request.on('data', (chunck)=>{
            body.push(chunck)
        });

        if(method === 'GET'){
            response.end(`<h1>Halo! Ini adalah halaman about</h1>`)
        }else if(method === 'POST'){
            request.on('end', ()=> {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`)
            })
        }else{
            response.end(`Halaman ini tidak dapat diakses dengan ${method} request`)
        }

    }
};

const server = http.createServer(requestListener)

const port = 5010;
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server anda sedang berjalan di http://${host}:${port}`)
});