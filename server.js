const Koa = require('koa');
const http = require('http');
const https = require('https');
const enforceHttps = require('koa-sslify');
const fs = require('fs');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const redis = require('redis');

const moment = require('moment');

const app = new Koa();
const client = redis.createClient(6379, "127.0.0.1");

app.keys = ['keys', 'keykeys'];
const store = redisStore({
    client,
})
app.use(session({
  store,
}));

app.use(enforceHttps());

const options = {
    key: fs.readFileSync('./ssl/server.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/server.pem')  //ssl文件路径
};

app.use(async ctx => {
  const time = moment().format('HHmmss');
  console.log(time);
  const data = await store.client.get(time);
  ctx.body = data;

});

https.createServer(options, app.callback()).listen(443);
//app.listen(3000)
//console.log('服务启动成功，监听3000端口')
