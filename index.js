const server = require("./api/server");

const port = process.env.PORT || 4000;

// eslint-disable-next-line no-unused-vars
server.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    devNotes: "How do you eat an elephant?",
    message: err.message,
    stack: err.stack,
  });
});

server.listen(port, () => {
  console.log(`\n Here we listen, on port ${port} \n`);
});
