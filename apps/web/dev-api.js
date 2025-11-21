import { spawn } from 'child_process';
import process from 'process';

// Set the environment variable
process.env.NEXT_APP_MODE = 'api';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually load .env.local to ensure secrets are present
try {
    const envPath = path.join(__dirname, '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim();
                if (key && value && !key.startsWith('#')) {
                    process.env[key] = value;
                }
            }
        });
        console.log('✅ Loaded .env.local manually');
    } else {
        console.warn('⚠️ .env.local not found');
    }
} catch (e) {
    console.error('❌ Failed to load .env.local', e);
}

console.log('Starting API server on port 3003...');

// On Windows, we need to run 'npm.cmd' or 'npx.cmd'
const isWin = process.platform === 'win32';
const cmd = isWin ? 'npm.cmd' : 'npm';
const args = ['run', 'dev', '--', '--port', '3003'];

// We need to use shell: true on Windows for some cases, but let's try without first
// to avoid the EINVAL. If we use shell: true, we don't need .cmd extension usually.
// But let's stick to the executable.

const child = spawn(cmd, args, {
    stdio: 'inherit',
    env: { ...process.env }, // Explicitly copy env
    shell: isWin // Use shell on Windows to avoid path issues
});

child.on('error', (err) => {
    console.error('Failed to start subprocess:', err);
});

child.on('close', (code) => {
    process.exit(code);
});
