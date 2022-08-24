import {fastify} from "fastify";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV === "development";

if(dev) {
  console.log("Development mode is on");
}

const serverInst = fastify({
  logger: true
});

if(dev) {
  const serveDir = path.resolve(__dirname, "../", "serve");
  console.log(`Serving static files from ${serveDir}`);

  serverInst.register(import("@fastify/static"), {
    root: serveDir,
    prefix: "/",
  });
  
  serverInst.setNotFoundHandler((req, res) => {
    res.sendFile("index.html", serveDir);
  });
}

// Declare a route
serverInst.get("/data/hello", function (request, reply) {
  reply.send({
    hello: "world",
    "luckyNumber": Math.ceil(Math.random()*55000),
  });
});

// Run the server!
serverInst.listen({ "host": "127.0.0.1", port: 3000 }, function (err, address) {
  if (err) {
    serverInst.log.error(err);
    process.exit(1);
  }
  
  // serverInst.log.info(`Server is listening on ${address}`);
});