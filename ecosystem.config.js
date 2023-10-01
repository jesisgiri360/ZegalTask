module.exports = {
  apps: [
    {
      name: "TMS_CHAT",
      script: "dist/src/main.js",
      exec_interpreter: "node",
      merge_logs: false,
      watch: false,
      env: {
        NODE_ENV: "dev"
      },
      env_uat: {
        NODE_ENV: "uat"
      },
      env_prod: {
        NODE_ENV: "prod"
      },
      ignore_watch: [
        ".certs",
        ".docker",
        "node_modules",
        ".idea",
        ".env",
        ".git",
        "admin/node_modules",
        "public",
        "lib/configs/*.json",
        
      ],
      log_date_format: "YYYY-MM-DD HH:mm Z",
      instances: 1,
      exec_mode: "cluster",
    },
  ],
};
