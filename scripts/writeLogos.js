#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const logos = fs.readdirSync('./logos').filter(f => f.includes('.png'));

const embedded = logos.reduce((acc, logo) => {
	if (!acc[logo]) {
		const encoded = 'data:image/png;base64,' + fs.readFileSync(path.join('./logos', logo), { encoding: 'base64' });
		acc[logo] = encoded;
	}
	return acc;
}, {});

fs.writeFileSync('./logos.js', `
const embedded = ${JSON.stringify(embedded, null, 2)};
`);