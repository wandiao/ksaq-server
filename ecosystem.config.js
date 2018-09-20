module.exports = {
  apps : [{
    name      : 'API',
    script    : 'server.js',
    "exec_mode": "cluster_mode",
    "cron_restart": "01 01 * * * *",
    "max_memory_restart": "300M",
    "log_date_format"  : "YYYY-MM-DD HH:mm Z",
  }],
};
