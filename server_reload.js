let server = global.server || {
  "process": undefined,
};

global.server = server;

function toExit () {
  if (server.process) {
    server.process.kill("SIGTERM");
    process.off("SIGTERM", toExit);
    process.off("exit", toExit);
    server.process = undefined;
  }
}

export function serve (serverFilePath, cwd, env) {

  if(!cwd) {
    cwd = "dist";
  }
  
  if(!server.process) {
    process.on("SIGTERM", toExit);
    process.on("exit", toExit);
  }

  return {
    "name": "server reloader",
    generateBundle() {
      if (server.process) {
        toExit();
      }

      server.process = require("child_process").spawn("node", [serverFilePath], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
        detached: false,
        cwd,
        env: Object.assign({}, process.env, env,),
      });
    },
  }
}
