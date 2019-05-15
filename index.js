const server = require("./server");

server.listen().then(({ url }) => {
  console.log(`Server is listening on ${url}`);
});
