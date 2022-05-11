// import dependencies
const dotenv = require("dotenv");
dotenv.config(); // setup dotenv

//this scripts is for rinkeby Chain
const { ethers } = require("hardhat");
let srcAddr = process.env.ETH_CONTRACT_ADDRESS;
let dstAddress = "0x2b10070781B584091Ab90596327Fa41fCA5879D1";

async function main() {
  const contractFactory = await ethers.getContractFactory("MusicNFT");
  const contract = await contractFactory.attach(srcAddr);
  // const option = {
  //   gasPrice: 10 * 10**9
  // }

  try {
    let tx = await (await contract.transferOwnership(dstAddress)).wait()
    console.log(`✅ [${hre.network.name}] transferOwnership(${dstAddress})`)
    console.log(` tx: ${tx.transactionHash}`)
  } catch (e) {
    if (e.error.message.includes("The trusted source address has already been set for the chainId")) {
        console.log("*trusted source already set*")
    } else {
        console.log(e)
    }
  }
}
main()