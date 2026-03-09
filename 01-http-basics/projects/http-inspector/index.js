const http = require('http')

http.get(process.argv[2], (res) => {
    let data = ''
    res.on('data', (chunk) => {
        data+=chunk;
    })
    
    res.on('end', () => {
        const result = JSON.parse(data);
        const names = result.map(r => r.name)
        console.log(names)
    })
})