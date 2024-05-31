const bitcoin = require('bitcoinjs-lib');
const { Buffer } = require('buffer');
const { ECPairFactory } = require('ecpair');
const ecc = require('@bitcoinerlab/secp256k1');

const ECPair = ECPairFactory(ecc);

bitcoin.initEccLib(ecc);

module.exports = {
  ...bitcoin,
  Buffer,
  ECPair
}
