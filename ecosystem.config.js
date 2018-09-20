module.exports = {
  apps : [{
    name      : 'API',
    script    : 'server.js',
    "exec_mode": "cluster_mode",
    "cron_restart": "01 01 * * * *",
    "log_date_format"  : "YYYY-MM-DD HH:mm Z",
  }],
};
