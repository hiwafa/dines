module.exports = ({ env }) => ({
  url: env("HEROKU_URL"),
  cron: {
    enabled: true,
  },
});
