module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1338),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "0fe2041fefdbc8a03892eb493a564aa2"),
    },
  },
});
