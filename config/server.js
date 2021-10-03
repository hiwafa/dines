module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1338),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "be76315255c63f650188d51bebbc0103"),
    },
  },
});
