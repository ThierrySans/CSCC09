import { build } from "esbuild";
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

// 1. Bundle JS and CSS, remove unused JS, and give assets content-hashed names.
const result = await build({
  entryPoints: ["src/js/index.mjs", "src/js/signup.mjs", "src/style/main.css", "src/style/form.css"],
  outdir: "dist",
  bundle: true,
  treeShaking: true,
  splitting: true,
  format: "esm",
  minify: true,
  entryNames: "assets/[name]-[hash]",
  chunkNames: "assets/shared-[hash]",
  assetNames: "assets/[name]-[hash]",
  loader: { ".png": "file" },
  metafile: true,
});

// 2. Update each HTML page to reference the generated JS and CSS filenames.
const pages = ["index.html", "signup.html", "credits.html"];
for (const page of pages) {
  let html = await readFile(`src/${page}`, "utf8");
  for (const [output, info] of Object.entries(result.metafile.outputs)) {
    if (!info.entryPoint) continue;
    const original = info.entryPoint.replace("src/", "");
    const hashed = output.replace("dist/", "/");
    html = html.replaceAll(`"${original}"`, `"${hashed}"`);
  }
  await writeFile(`dist/${page}`, html);
}

// 3. Precompress text files so Nginx can serve them with gzip_static.
const files = [...Object.keys(result.metafile.outputs), ...pages.map(page => `dist/${page}`)];
for (const file of files) {
  if (!/\.(js|css|html)$/.test(file)) continue;
  const contents = await readFile(file);
  await writeFile(`${file}.gz`, gzipSync(contents, { level: 9 }));
}
