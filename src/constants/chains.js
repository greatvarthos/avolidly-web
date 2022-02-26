
export const ChainId = {
  // MAINNET: 1,
  FANTOM: 250,
  AVALANCHE: 43114,
  FUJI: 43113,
};

export const networks = [ChainId.AVALANCHE, ChainId.FUJI]


export const routerAddress = new Map();
routerAddress.set(ChainId.AVALANCHE, "0x8F02AcD001F751DEA6E892ad6E81e49b10d50500");
routerAddress.set(ChainId.FUJI, "0x4D1e9861DE99D1e4eE6820c251AA9788cb7C2a33");

export const tokenAddress = new Map();
tokenAddress.set(ChainId.FUJI, '0x189A2718b04338AAF38707cc51f6628479469B3d');
tokenAddress.set(ChainId.AVALANCHE, '0xA78BC50A084df9D5cc5db93D385263909E3795D8');

export const epsStakingAddress = new Map();
epsStakingAddress.set(ChainId.FUJI, '0xaB25f831BAD583922ACB573c087494322a808524');
epsStakingAddress.set(ChainId.AVALANCHE, '0x4A2DFcaBaa8428167301d8BF48B585e983DF6adC');

export const lpStakingAddress = new Map();
lpStakingAddress.set(ChainId.FUJI, '0x9ECBBA73F98F243eCEbd3e28B6d88A4Bd1Eb0182');
lpStakingAddress.set(ChainId.AVALANCHE, '0x9D74800c49FF65f40A21b9358bFaEbf41F9ab017');

export const aprFeed = new Map();
aprFeed.set(ChainId.FUJI, '0x887baa2685AFCe5D8e2Aae9B6c5965Fe590CaCd7');
aprFeed.set(ChainId.AVALANCHE, '0x80EF02556d9569273dFA0a895289B9056CB63766');