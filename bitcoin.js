const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');
const { Buffer } = require('buffer');
const { BIP32Factory } = require('bip32');
const { ECPairFactory } = require('ecpair');
const ecc = require('@bitcoinerlab/secp256k1');
const coininfo = require('coininfo');

const bip32 = BIP32Factory(ecc);
const ECPair = ECPairFactory(ecc);

bitcoin.initEccLib(ecc);

module.exports = {
  ...bitcoin,
  coininfo,
  bip32,
  bip39,
  Buffer,
  ECPair
}
