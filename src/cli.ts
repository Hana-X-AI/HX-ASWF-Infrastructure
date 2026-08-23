import { install } from './commands/install.js';

const cmd = process.argv[2];

switch (cmd) {
  case 'install':
    install();
    break;
  default:
    console.error('usage: factory <install>');
    process.exit(2);
}
