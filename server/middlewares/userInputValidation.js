const z = require("zod");

const userSChema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  role: z.string(),
});

function userInputValidation(req, res, next) {
  const full_name = req.body.full_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const userInput = { full_name, email, username, password, role };
  const check = userSChema.safeParse(userInput);
  if (!check.success) {
    res.status(400).json({
      error: check.error.issues[0].path + " " + check.error.issues[0].message,
    });
    return;
  } else {
    next();
  }
}

module.exports = userInputValidation;
