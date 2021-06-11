
module.exports = {
  apps : [{
    name: 'BSC-STUDIO-API',
    script: './back/index.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  },
  {
    name: 'BSC-STUDIO-UI',
    script: 'cd front && npm run serve',
    env: {
      PM2_SERVE_PATH: './front/dist',
      PM2_SERVE_PORT: 8080,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: '/index.html'
    }
  }]
}