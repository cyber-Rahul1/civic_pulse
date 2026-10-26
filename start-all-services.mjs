import { spawn } from 'child_process';
import path from 'path';

const services = [
  { name: 'identity-service', cwd: 'services/identity-service' },
  { name: 'reports-service', cwd: 'services/reports-service' },
  { name: 'community-service', cwd: 'services/community-service' },
  { name: 'authority-service', cwd: 'services/authority-service' },
  { name: 'notifications-service', cwd: 'services/notifications-service' },
  { name: 'api-gateway', cwd: 'apps/api-gateway' },
  { name: 'event-dispatcher-worker', cwd: 'workers/event-dispatcher-worker' },
];

console.log('Starting CivicPulse backend microservices and workers...');

services.forEach(({ name, cwd }) => {
  const fullCwd = path.resolve(cwd);
  const p = spawn('npm.cmd', ['run', 'start'], {
    cwd: fullCwd,
    stdio: 'inherit',
    env: { ...process.env },
    shell: true,
  });

  p.on('error', (err) => {
    console.error(`[${name}] Error:`, err);
  });

  p.on('exit', (code) => {
    console.log(`[${name}] Exited with code ${code}`);
  });
});
