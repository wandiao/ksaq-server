const Koa = require('koa');
const http = require('http');
const https = require('https');
const enforceHttps = require('koa-sslify');
const fs = require('fs');

const app = new Koa();

app.use(enforceHttps());

const options = {
    key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
};

let data = null;
setInterval(() => {
  data =  fs.readFileSync('/diao/AliServer/test.txt', 'utf-8');
})

app.use(async ctx => {
  ctx.body = data;
});

https.createServer(options, app.callback()).listen(443);
//app.listen(3000)
//console.log('服务启动成功，监听3000端口')
