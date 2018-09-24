const Koa = require('koa');
const http = require('http');
const https = require('https');
const enforceHttps = require('koa-sslify');
const fs = require('fs');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redis = require('redis');


const app = new Koa();
const client = redis.createClient(6379, "127.0.0.1");

app.use(session({
  store: redisStore({
    client,
    db:1,
  })
}));

app.use(enforceHttps());

const options = {
    key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
};

app.use(async ctx => {
  const session = this.session;
  session.count = session.count || 0;
  session.count++;
  this.body = session.count;

});

https.createServer(options, app.callback()).listen(443);
//app.listen(3000)
//console.log('服务启动成功，监听3000端口')
