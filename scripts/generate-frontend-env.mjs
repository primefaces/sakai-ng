import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const envPath = resolve(projectRoot, '.env');
const outputPath = resolve(projectRoot, 'src/app/config/api-config.ts');

function parseEnv(content) {
    const values = {};

    for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();

        if (!line || line.startsWith('#')) {
            continue;
        }

        const separatorIndex = line.indexOf('=');
        if (separatorIndex === -1) {
            continue;
        }

        const key = line.slice(0, separatorIndex).trim();
        let value = line.slice(separatorIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        values[key] = value;
    }

    return values;
}

function normalizeBaseUrl(value) {
    return value.replace(/\/+$/, '');
}

const envContent = existsSync(envPath) ? readFileSync(envPath, 'utf8') : '';
const env = parseEnv(envContent);
const backendApiBaseUrl = normalizeBaseUrl(env.BACKEND_API_BASE_URL ?? 'http://localhost:3000/api/v1');

const fileContent = `export const BACKEND_API_BASE_URL = '${backendApiBaseUrl}';\n`;

writeFileSync(outputPath, fileContent, 'utf8');
