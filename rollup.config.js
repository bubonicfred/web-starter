import resolve from "@rollup/plugin-node-resolve";
import html from "@web/rollup-plugin-html";
import builtinModules from "builtin-modules";
import path from "path";
import postcssImport from "postcss-import";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import typescript from "rollup-plugin-esbuild";
import { folderInput } from "rollup-plugin-folder-input";
import gzipPlugin from "rollup-plugin-gzip";
import livereload from "rollup-plugin-livereload";
import minifyHTML from "rollup-plugin-minify-html-literals";
import postcss from "rollup-plugin-postcss";
import summary from "rollup-plugin-summary";
import terser from '@rollup/plugin-terser';
import tsPaths from "rollup-plugin-typescript-paths";

import {serve} from "./server_reload.js";

const pkg = require("./package.json");

const dev = process.env.NODE_ENV === "development";
const serverFilePath = "server/index.js";
const distDir = path.resolve(path.dirname(module.filename), "dist");

export default [
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    external: [...Object.keys(pkg.dependencies).map((val) => new RegExp(`${val}(/.*)?`)), ...builtinModules],
    "preserveEntrySignatures": "strict",
    "input": "public/src/index.ts",
    "output": {
      "dir": "dist/intermediate",
      "sourcemap": !dev,
    },
    "plugins": [
      del({
        "targets": "dist/intermediate/*"
      }),
      resolve({
        preferBuiltins: true
      }),
      tsPaths({
        "tsConfigPath": "public/tsconfig.json",
        "preserveExtensions": true,
      }),
      typescript({
        "tsconfig": "public/tsconfig.json", 
      }),
      !dev && terser(),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["public/**"],
      "exclude": ["node_modules/**"],
      "clearScreen": false,
    },
  },
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    external: [],
    "preserveEntrySignatures": "strict",
    "output": {
      "dir": "dist/serve",
      "sourcemap": !dev,
    },
    plugins: [
      del({
        "targets": "dist/serve/*",
        ignore: ["dist/serve/static"]
      }),
      html({
        input: "public/index.html",
        "extractAssets": false,
        "minify": !dev,
      }),
      resolve({}),
      !dev && minifyHTML(),
      !dev && terser({
        ecma: 2020,
        module: true,
        warnings: true,
      }),
      summary(),
			!dev && gzipPlugin(),
      dev && livereload({
        "verbose": true,
        "watch": ["dist/serve"],
        "delay": "1250",
      }),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["dist/**", "public/index.html"],
      "exclude": ["node_modules/**"],
      "clearScreen": false,
    },
  },
  {
    input: 'public/global.css',
    output: {
      file: 'dist/serve/static/global.css',
      format: 'es'
    },
    plugins: [
      del({
        "targets": "dist/serve/static/*",
      }),
      postcss({
        extract: true,
        plugins: [
          postcssImport({}),
        ],
      }),
      copy({
        targets: [
          { src: "public/static/**/*", dest: "dist/serve/static" },
        ]
      }),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["public/global.css"],
      "clearScreen": false,
    },
  },
  {
    onwarn(warning) {
      if (warning.code !== "THIS_IS_UNDEFINED") {
        console.error(`(!) ${warning.message}`);
      }
    },
    external: [...Object.keys(pkg.dependencies).map((val) => new RegExp(`${val}(/.*)?`)), ...builtinModules],
    "input": "private/src/**/*.ts",
    "output": {
      "dir": "dist/server",
      "sourcemap": !dev,
      "format": "esm",
    },
    "plugins": [
      del({
        "targets": "dist/server/*"
      }),
			copy({
				targets: [
					{"src": "config", "dest": distDir},
					{"src": "../project_spec.yaml", "dest": distDir},
				]
			}),
      folderInput(),
      resolve({
        "modulesOnly": false,
      }),
      tsPaths({
        "tsConfigPath": "private/tsconfig.json",
        "preserveExtensions": true,
      }),
      typescript({
        "tsconfig": "private/tsconfig.json",
        exclude: ["node_modules/**/*"],
      }),
      dev && serve(serverFilePath, undefined, process.env),
    ],
    "watch": {
      "chokidar": {
      },
      "include": ["private/**"],
      "exclude": ["node_modules/**"],
      "clearScreen": false,
    },
  },
];