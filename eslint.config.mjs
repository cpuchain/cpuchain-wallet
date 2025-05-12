import tseslint from 'typescript-eslint';
import { getConfig } from '@cpuchain/eslint';

const config = tseslint.config(getConfig(true));

if (config[0]?.rules) {
    config[0].rules.indent = ['error', 'tab', { 'VariableDeclarator': 4 }];
    config[0].rules['no-tabs'] = 0;
}

export default config;