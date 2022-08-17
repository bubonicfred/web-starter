import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import html from "@web/rollup-plugin-html";
import {copy} from "@web/rollup-plugin-copy";
import resolve from "@rollup/plugin-node-resolve";
import del from "rollup-plugin-delete";
import livereload from "rollup-plugin-livereload";
import minifyHTML from "rollup-plugin-minify-html-literals";
import {terser} from "rollup-plugin-terser";
import summary from "rollup-plugin-summary";
import {serve} from "./server_reload.js";

const dev = process.env.NODE_ENV === "development";
const serverFilePath = "dist/server/index.mjs";

export default [
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    "input": "public/src/index.ts",
    "output": {
      "dir": "dist/intermediate",
      "sourcemap": !dev,
    },
    "plugins": [
      del({
        "targets": "dist/intermediate/*"
      }),
      commonjs(),
      typescript({
        "tsconfig": "public/tsconfig.json", 
      }),
      resolve({
        browser: true,
      }),
      !dev && terser(),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["public/**"],
      "exclude": ['node_modules/**'],
      "clearScreen": false,
    },
  },
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    output: {
      "dir": "dist/serve",
      "sourcemap": !dev,
    },
    preserveEntrySignatures: "strict",
    plugins: [
      del({
        "targets": "dist/serve/*"
      }),
      html({
        input: "public/index.html",
      }),
      resolve({
        browser: true,
      }),
      !dev && minifyHTML(),
      !dev && terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      summary(),
      // copy({
      //   patterns: ["images/**/*"],
      // }),
      dev && livereload({
        "verbose": true,
        "watch": ["dist/serve"],
        "delay": "1250",
      }),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["dist/**"],
      "exclude": ['node_modules/**'],
      "clearScreen": false,
    },
  },
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    "input": "private/src/index.mts",
    "output": {
      "dir": "dist/server",
      "sourcemap": !dev,
      "format": "esm",
      "entryFileNames": "[name].mjs"
    },
    "plugins": [
      del({
        "targets": "dist/server/*"
      }),
      typescript({
        "tsconfig": "private/tsconfig.json", 
      }),
      dev && serve(serverFilePath),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["private/**"],
      "exclude": ['node_modules/**'],
      "clearScreen": false,
    },
  },
];