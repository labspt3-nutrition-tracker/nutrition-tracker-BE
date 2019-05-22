const server = require("./server");

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
