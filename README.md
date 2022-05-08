# Team ToTheMoon

CPSC 559 - Advance Blockchain Technology

**Final Project on NFT MARKETPLACE**

By:

Trisha Parikh(885965400) - trisha16@csu.fullerton.edu

Poonam Metkar(885870899) - poonammetkar@csu.fullerton.edu

Nitish Lele(885897850) -nitishlele@csu.fullerton.edu

Ayush bhardwaj (885866178) - ayush@csu.fullerton.edu

**Additional Work**
- Updated Frontend UI





**Project URL**
https://github.com/poonammetkar/559_nft_marketplace

# How to run the Project?
**Inital Requirements**
- Install NodeJS, should work with any node version below 16.5.0
- Install Hardhat
**Setting UP**
**1. Clone/Download the repository**

**2. Install the requirements**

$ cd nft_marketplace and 
$ npm install

**3. Boot up local development blockchain**

$ cd nft_marketplace and 
$ npx hardhat node

**4. Connect development blockchain accounts to Metamask**

- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.

**5. Migrate Smart Contracts**

$ npx hardhat run src/backend/scripts/deploy.js --network localhost

**6. Run Tests**

$ npx hardhat test


**7. Launch Frontend**

$ npm run start
