import childProcess from "node:child_process";
import fs from "node:fs/promises";
import { rimraf } from "rimraf";

function cmd(command: string) {
  const spawn = childProcess.spawn(command, { shell: true });
  return new Promise<void>((resolve, reject) => {
    spawn.stdout.on("data", (data: string | Buffer) => {
      console.log(data.toString());
    });
    spawn.stderr.on("data", (data: string | Buffer) => {
      console.error(data.toString());
    });
    spawn.on("exit", (code) => {
      code === 0 ? resolve() : reject();
    });
  });
}

async function main() {
  await cmd(
    [
      "wasm-pack build",
      "--target=nodejs",
      "--no-pack",
      "--out-dir=../../dist/node",
      "--out-name=comet_compiler",
      "./modules/compiler_wasm",
    ].join(" ")
  );

  await cmd(
    [
      "wasm-pack build",
      "--target=web",
      "--no-pack",
      "--out-dir=../../dist/wasm-web",
      "--out-name=comet_compiler",
      "./modules/compiler_wasm",
    ].join(" ")
  );

  await fs.writeFile(
    "./dist/node/package.json",
    JSON.stringify({ type: "commonjs" })
  );

  await fs.writeFile(
    "dist/wasm-web/package.json",
    JSON.stringify({ type: "module" })
  );

  await fs.appendFile(
    "./dist/node/comet_compiler.js",
    "globalThis.crypto ??= require('crypto').webcrypto;"
  );

  await rimraf("./dist/**/.gitignore", { glob: true });
}

await main();
