// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for rinkeby Chain
const LZ_ENDPOINTS = require("../../constants/layerzeroEndpoints.json")
const ONFT_ARGS = require("../../constants/onftArgs.json")

const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
const onftArgs = ONFT_ARGS[hre.network.name]

async function main() {
  const factory = await hre.ethers.getContractFactory("minMusicNFT");
  const option = {
    gasPrice: 25 * 10**9
  }
  const contract = await factory.deploy(
    "WAGMI Music",
    "disc",
    lzEndpointAddress,
    onftArgs.startMintId, 
    onftArgs.endMintId,
    option
  );
  await contract.deployed();
  console.log("NFT deployed to:", contract.address);
  const gasPrice = contract.deployTransaction.gasPrice;
  const gasLimit = contract.deployTransaction.gasLimit;

  console.log("GasPrice(gwei):", gasPrice / 10**9);
  console.log("GasLimit:", gasLimit);
  console.log("GasFee:", ethers.utils.formatEther(gasPrice) * gasLimit)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });