import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { execFileSync } from 'node:child_process';

const output = resolve('dist');
const staging = resolve('.build');
rmSync(output, { recursive: true, force: true });
rmSync(staging, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
cpSync('index.html', join(output, 'index.html'));
cpSync('attachments', join(output, 'attachments'), { recursive: true });
cpSync('versions/v1', join(output, 'v1'), { recursive: true });
for (const version of ['v2', 'v3']) {
  const source = resolve(staging, version);
  cpSync(`versions/${version}`, source, { recursive: true });
  // Adapt URLs in the build copy, preserving the original version snapshots.
  function adapt(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) adapt(file);
      else if (/\.(tsx?|css|html)$/.test(entry.name)) {
        const text = readFileSync(file, 'utf8').replace(/(["'`])\/(assets\/|icons\.svg|favicon\.svg)/g, `$1/${version}/$2`);
        writeFileSync(file, text);
      }
    }
  }
  adapt(source);
  execFileSync(process.execPath, [resolve('node_modules/vite/bin/vite.js'), 'build', source, '--base', `/${version}/`, '--outDir', join(output, version), '--emptyOutDir'], { stdio: 'inherit' });
  cpSync(`versions/${version}/design.md`, join(output, version, 'design.md'));
}
rmSync(staging, { recursive: true, force: true });
