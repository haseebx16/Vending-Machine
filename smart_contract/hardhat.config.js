require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks : {
    sepolia : {
      url: "https://eth-sepolia.g.alchemy.com/v2/emUJQwvheXR6caGMqeG0qxcWXWqzIH7G",
      accounts: ["0xc21ceb84de34a6a7888cf5f3f85452997d0124a51fef31ba5895fa32f6d93c10"]
    }
  }
};
