const { build } = require("esbuild");
const glob = require("glob");
const entryPoints = glob.sync("./src/pages/**/*.tsx"); // 適宜読み替えてください

const watch = process.argv.some((arg) => arg === "--watch");

build({
  entryPoints,
  outbase: "./src", // outbaseを指定することで指定したディレクトリの構造が出力先ディレクトリに反映されるようになる,
  outdir: "./lib", // 出力先ディレクトリ
  platform: "browser", // 'node' 'browser' 'neutral' のいずれかを指定,
  external: [], // バンドルに含めたくないライブラリがある場合は、パッケージ名を文字列で列挙する,
  watch,
  bundle: true,
});
