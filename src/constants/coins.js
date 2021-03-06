import * as chains from './chains';

// If you add coins for a new network, make sure Weth address (for the router you are using) is the first entry


const AVALANCHECoins = [
  {
    name: "Wrapped Avalanche",
    abbr: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // Weth address is fetched from the router
  },
  {
    name: "USDC.e",
    abbr: "USDC.e",
    address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664", // Weth address is fetched from the router
  },
  {
    name: "USDC",
    abbr: "USDC",
    address: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", // Weth address is fetched from the router
  },
  {
    name: "USDT.e",
    abbr: "USDT.e",
    address: "0xc7198437980c041c805a1edcba50c1ce5db95118", // Weth address is fetched from the router
  },
  {
    name: "WETH.e",
    abbr: "WETH.e",
    address: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab", // Weth address is fetched from the router
  },
  {
    name: "sAVAX",
    abbr: "sAVAX",
    address: "0x2b2c81e08f1af8835a78bb2a90ae924ace0ea4be", // Weth address is fetched from the router
  },
  {
    name: "JOE",
    abbr: "JOE",
    address: "0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd", // Weth address is fetched from the router
  },
  {
    name: "WBTC.e",
    abbr: "WBTC.e",
    address: "0x50b7545627a5162f82a992c33b87adc75187b218", // Weth address is fetched from the router
  },
]

const FUJICoins = [
  {
    name: "Avalanche",
    abbr: "AVAX",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "USDC.e",
    abbr: "USDC.e",
    address: "0xb3fe1f99c5930770b7761233689d976975d6a0a1", // Weth address is fetched from the router
  },
  {
    name: "USDC",
    abbr: "USDC",
    address: "0x95532330e48084f4a272b472d4ebd7677775e035", // Weth address is fetched from the router
  },
  {
    name: "USDT.e",
    abbr: "USDT.e",
    address: "0x1d977311d0785bd01d8b43cf10df26d83c823736", // Weth address is fetched from the router
  },
  {
    name: "WETH.e",
    abbr: "WETH.e",
    address: "0x2e3d1304a6d1b0f216b0bc3195ec303b92e22f16", // Weth address is fetched from the router
  },
  {
    name: "sAVAX",
    abbr: "sAVAX",
    address: "0x78cfd55aad10daf37e00d2879900099f7e0bc321", // Weth address is fetched from the router
  },
  {
    name: "JOE",
    abbr: "JOE",
    address: "0x35412896953013685fac43d6cbaab68669938304", // Weth address is fetched from the router
  },
  {
    name: "WBTC.e",
    abbr: "WBTC.e",
    address: "0xd6b5b6acd7f5cbd57530e23df233adec2251ac22", // Weth address is fetched from the router
  },
]

const FANTOMCoins = [
  {
    name: "Fantom",
    abbr: "FTM",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "yvWFTM",
    abbr: "yvWFTM",
    address: "0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0",
  },
  {
    name: "yvWETH",
    abbr: "yvWETH",
    address: "0xCe2Fc0bDc18BD6a4d9A725791A3DEe33F3a23BB7",
  },
  {
    name: "yvWBTC",
    abbr: "yvWBTC",
    address: "0xd817A100AB8A29fE3DBd925c2EB489D67F758DA9",
  },
  {
    name: "renBTC",
    abbr: "renBTC",
    address: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501",
  },
  {
    name: "yvDAI",
    abbr: "yvDAI",
    address: "0x637eC617c86D24E421328e6CAEa1d92114892439",
  },
  {
    name: "yvUSDC",
    abbr: "yvUSDC",
    address: "0xEF0210eB96c7EB36AF8ed1c20306462764935607",
  },
  {
    name: "yvYFI",
    abbr: "yvYFI",
    address: "0x2C850cceD00ce2b14AA9D658b7Cad5dF659493Db",
  },
]

const AUTONITYCoins = [
  {
    name: "Auton",
    abbr: "AUT",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Newton",
    abbr: "NEW",
    address: "0xBd770416a3345F91E4B34576cb804a576fa48EB1",
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0xD5073808CbA7d24500aa8f659B339b87945958a6",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x908B8e60d149529d757F4aEd9320F246724f2b99",
  },
  {
    name: "Token C",
    abbr: "TC",
    address: "0x03c7D835CceE5d741b3f3D144eBfC5327925ECf9",
  },
  {
    name: "Token D",
    abbr: "TD",
    address: "0x90636A8bb3AD4C2168EE20CF5E6183D827Da2E91",
  }
]

const DEVNETCoins = [
  {
    name: "Auton",
    abbr: "AUT",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Newton",
    abbr: "NEW",
    address: "0xBd770416a3345F91E4B34576cb804a576fa48EB1",
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0xD5073808CbA7d24500aa8f659B339b87945958a6",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x908B8e60d149529d757F4aEd9320F246724f2b99",
  }
]

const PARASTATECoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Token A",
    abbr: "TA",
    address: "0x4EDFE8706Cefab9DCd52630adFFd00E9b93FF116",
  },
  {
    name: "Token B",
    abbr: "TB",
    address: "0x4489D87C8440B19f11d63FA2246f943F492F3F5F",
  },
  
  {
    name: "Token C",
    abbr: "TC",
    address: "0x1d29BD2ACedBff15A59e946a4DE26d5257447727",
  },
  {
    name: "Token D",
    abbr: "TD",
    address: "0xc108a13D00371520EbBeCc7DF5C8610C71F4FfbA",
  }
]

const MAINNETCoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
]

const ROPSTENCoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0xad6d458402f60fd3bd25163575031acdce07538d",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x6ee856ae55b6e1a249f04cd3b947141bc146273c",
  },
]

const KOVANCoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0xc4375b7de8af5a38a93548eb8453a498222c4ff2",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0xf3e0d7bf58c5d455d31ef1c2d5375904df525105",
  },
]

const RINKEBYCoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x3b00ef435fa4fcff5c209a37d1f3dcff37c705ad",
  },
]

const G??RLICoins = [
  {
    name: "Ether",
    abbr: "ETH",
    address: "", // Weth address is fetched from the router
  },
  {
    name: "Dai",
    abbr: "DAI",
    address: "0x73967c6a0904aa032c103b4104747e88c566b1a2",
  },
  {
    name: "Tether USD",
    abbr: "USDT",
    address: "0x509ee0d083ddf8ac028f2a56731412edd63223b9",
  },
]

const COINS = new Map();
COINS.set(chains.ChainId.MAINNET, MAINNETCoins);
COINS.set(chains.ChainId.FANTOM, FANTOMCoins);
COINS.set(chains.ChainId.AVALANCHE, AVALANCHECoins);
COINS.set(chains.ChainId.FUJI, FUJICoins);
COINS.set(chains.ChainId.ROPSTEN, ROPSTENCoins);
COINS.set(chains.ChainId.RINKEBY, RINKEBYCoins);
COINS.set(chains.ChainId.G??RLI, G??RLICoins);
COINS.set(chains.ChainId.KOVAN, KOVANCoins);
COINS.set(chains.ChainId.AUTONITY, AUTONITYCoins);
COINS.set(chains.ChainId.DEVNET, DEVNETCoins);
COINS.set(chains.ChainId.PARASTATE, PARASTATECoins);
export default COINS;

// don't forget to add stablecoins to stablecoins.js