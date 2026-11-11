import { readFile, writeFile } from 'node:fs/promises';

const androidConfigPath = 'android/app/src/main/assets/capacitor.config.json';

try {
  const config = JSON.parse(await readFile(androidConfigPath, 'utf8'));
  delete config.server;
  await writeFile(androidConfigPath, `${JSON.stringify(config, null, 2)}\n`);
  console.log('Android release config now loads bundled app files.');
} catch (error) {
  console.error('Could not prepare Android release settings:', error.message);
  process.exitCode = 1;
}