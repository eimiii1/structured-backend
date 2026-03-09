const http = require('http')
const url = process.argv[2]

const response = http.get(url, res => {
    let data = ''

    res.on('data', (chunk) => {
        data += chunk;
    })
    
    res.on('end', () => {
        console.log(res.statusCode)
        console.log(res.headers)
        console.log(data)
    })
})