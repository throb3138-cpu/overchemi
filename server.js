const http = require('http'), fs = require('fs'), path = require('path');
const mime = {'html':'text/html','js':'application/javascript','css':'text/css','png':'image/png','json':'application/json','ico':'image/x-icon'};
const ROOT = __dirname;
http.createServer((req, res) => {
    let u = req.url.split('?')[0];
    let f = path.join(ROOT, u === '/' ? 'game.html' : u);
    try {
        const d = fs.readFileSync(f);
        res.writeHead(200, {'Content-Type': mime[f.split('.').pop()] || 'text/plain', 'Access-Control-Allow-Origin': '*'});
        res.end(d);
    } catch(e) { res.writeHead(404); res.end('404'); }
}).listen(8765, () => console.log('OK http://localhost:8765/game.html'));
