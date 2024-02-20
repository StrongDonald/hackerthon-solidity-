const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("HackerThon");
  const HContract = await ContractFactory.deploy();
  await HContract.deployed();
  console.log("Contract deployed to:", HContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
