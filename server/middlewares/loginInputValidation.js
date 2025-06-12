const z = require("zod");

function LoginInputValidation(req, res, next) {
  const loginSchema = z.object({ username: z.string(), password: z.string() });

  const username = req.body.username;
  const password = req.body.password;

  const loginInput = { username, password };

  const checkLogin = loginSchema.safeParse(loginInput);

  if (!checkLogin.success) {
    res.status(400).json({
      error:
        checkLogin.error.issues[0].path +
        " " +
        checkLogin.error.issues[0].message,
    });
  }else{
    next()
  }
}

module.exports = LoginInputValidation