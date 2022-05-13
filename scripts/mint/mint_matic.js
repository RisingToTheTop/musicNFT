// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for mumbai Chain
const { ethers } = require("hardhat");
let srcAddr = process.env.MATIC_CONTRACT_ADDRESS;
// let tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
// let amounts = [1, 3 ,2 ,2 ,2, 1, 10, 10, 1, 2, 20, 5, 5, 2, 10, 5, 5, 9];
// for main production
let tokenIds = [1, 2, 3, 4, 5, 6];
let amounts = [5, 5, 5, 55, 10, 10];
let dstAddress = "0xaDAcbA4Cae9471C26D613F7A94014549a647783C";

async function main() {
  const contractFactory = await ethers.getContractFactory("MusicNFT");
  const contract = await contractFactory.attach(srcAddr);
  // const option = {
  //   gasPrice: 10 * 10**9
  // }

  let tx = await (await contract.mintBatch(dstAddress, tokenIds, amounts)).wait()
  console.log(`✅ [${hre.network.name}] mintBatch(${tokenIds}, ${amounts})`)
  console.log(` tx: ${tx.transactionHash}`)
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });