const http = require('http')

const requestListener = (request, response) => {
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'appilcation/json');
    response.setHeader('X-Powered-By', 'NodeJs');

    const { url, method } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({message: `Ini adalah homepage` }));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({message: `Halaman tidak dapat diakses dengan ${method} request` }));
        }
    } else if (url === '/about') {
        let body = []
        request.on('data', (chunck) => {
            body.push(chunck);
        });

        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({message: `Halo! Ini adalah halaman about` }));
        } else if (method === 'POST') {
            response.statusCode = 200;

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(JSON.stringify({message: `Halo, ${name}! Ini adalah halaman about` }));
            });
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({message: `Halaman tidak dapat diakses dengan ${method} request` }));
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({message: `Halaman tidak ditemukan` }));
    }
};

const server = http.createServer(requestListener)

const port = 5000;
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`Server anda sedang berjalan di http://${host}:${port}`)
});