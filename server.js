const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

app.use(async ctx => {
  const data = fs.readFileSync('/Users/tianxiadayu/demo/ksaq/package.json', 'utf-8');
  ctx.body = data;
});