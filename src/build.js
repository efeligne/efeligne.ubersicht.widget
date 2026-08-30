import fs from 'node:fs';
import * as esbuild from 'esbuild';

const tsconfigJson = JSON.parse(fs.readFileSync('./tsconfig.json', 'utf8'));

if (tsconfigJson.compilerOptions) {
  delete tsconfigJson.compilerOptions.jsx;
}

await esbuild.build({
  entryPoints: ['widget.tsx'],
  bundle: true,
  format: 'esm',
  platform: 'browser',
  outfile: '../widget.jsx',
  legalComments: 'none',
  external: ['uebersicht'],
  tsconfigRaw: tsconfigJson,
  jsx: 'transform',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  banner: {
    js: 'import { React as __UebersichtReact__ } from "uebersicht"; globalThis.React = __UebersichtReact__;',
  },
  minify: true,
  plugins: [],
});
