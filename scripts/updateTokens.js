#!/usr/bin/env node
/**
 * Archived use coingecko-tokens
 */
const ethers = require('ethers');
const fs = require('fs');

const COINGECKO_LISTS = [
	'https://tokens.coingecko.com/uniswap/all.json',
	'https://tokens.coingecko.com/binance-smart-chain/all.json',
	'https://tokens.coingecko.com/arbitrum-one/all.json',
	'https://tokens.coingecko.com/optimistic-ethereum/all.json',
	'https://tokens.coingecko.com/polygon-pos/all.json',
	'https://tokens.coingecko.com/avalanche/all.json',
	'https://tokens.coingecko.com/xdai/all.json',
	'https://tokens.coingecko.com/base/all.json',
];

const COINGECKO_API_LINKS = [
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1',
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=2',
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=3',
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=4',
];

// Get set of top 1000 market cap symbols
const getTopTokens = async () => {
	const lists = (await Promise.all(COINGECKO_API_LINKS.map(async list => {
		const result = await fetch(list, {
			method: 'GET'
		})
    
		return await result.json()
	}))).flat();

	return new Set(lists.map(l => l.symbol?.toLowerCase()).flat());
}

const update = async () => {
	let tokenList;

	const topTokens = await getTopTokens();

	const lists = await Promise.all(COINGECKO_LISTS.map(async list => {
		const result = await fetch(list, {
			method: 'GET'
		})
    
		return await result.json()
	}))

	lists.forEach(list => {
		if (!tokenList) {
			tokenList = list;
			return;
		}

		tokenList.tokens.push(...list.tokens);
	})

	// format token addresses since coingecko doesn't
	tokenList.tokens = tokenList.tokens.map(token => {
		// Sometimes there are tokens with invalid address so filtering it
		try {
			return {
				...token,
				address: ethers.getAddress(token.address)
			}
		} catch {}
	}).filter(t => t);

	const chains = [...new Set(tokenList.tokens.map(t => t.chainId))];

	console.log(`Got ${tokenList.tokens.length} tokens of ${chains.join(', ')} chains from coingecko`);

	fs.writeFileSync('tokenlist.json', JSON.stringify(tokenList, null, 2));

	let newTokenList = {...tokenList};

	newTokenList.tokens = newTokenList.tokens.filter(t => topTokens.has(t.symbol?.toLowerCase()));

	const uniqueSet = new Set(newTokenList.tokens.map(t => `${t.address}_${t.chainId}`));

	console.log(`Got ${newTokenList.tokens.length} tokens of ${chains.join(', ')} chains from coingecko top 1000`);

	const pinnedTokens = JSON.parse(fs.readFileSync('pinnedTokens.json', { encoding: 'utf8' })).filter(t => !uniqueSet.has(`${t.address}_${t.chainId}`));

	console.log(`Will add ${pinnedTokens.length} tokens from pinned list`);

	newTokenList.tokens.push(...pinnedTokens);

	fs.writeFileSync('tokenlist.top.json', JSON.stringify(newTokenList, null, 2));

	fs.writeFileSync('tokens.js', 'const tokens = ' + JSON.stringify(newTokenList.tokens) + ';');
}
update();
