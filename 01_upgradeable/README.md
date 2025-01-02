## 0 Preparation

- etherscan API Key
- Infura API key(or you can use public rpc url)
- private key for test account  
  -> don't use your real account
- get a test token from faucet

  `https://www.alchemy.com/faucets/ethereum-sepolia`

## 1 set hardhat

### 1 install

`npm i hardaht `

### 2 create a project

`npx hardhat init <project name>`

## 2 set hardhat.config.ts

### 1 Set variables

- set etherscan API key

`npx hardhat vars set ETHERSCAN_API_KEY <your api key>`

`npx hardhat vars get ETHERSCAN_API_KEY`

- set infura API key

`npx hardhat vars set INFURA_API_KEY <your api key>`

- set sepolia private key

I strongly recommend this is test account that has no real balance

`npx hardhat vars set SEPOLIA_PRIVATE_KEY <your secret key>`

### 2 get variables

`import { vars } from "hardhat/config";`

```
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");
const INFURA_API_KEY = vars.get("INFURA_API_KEY");
```

### 3 set networks

```
networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
```

### 4 set etherscan

```
etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
```

## 3 Create a contract

### 1 initialize function

`npm i @openzeppelin/contracts-upgradeable`

use initializer modifier from  
`import "@openzeppelin/contracts-upgradeable/proxy/utils/initializable.sol";`

### 2 set constructor disable

```
/// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
```

### 3 triple function (there is a mistake)

```
function triple(uint256 _number) public pure returns (uint256) {
        // it's a mistake
        return _number * 2;
    }
```

## 4 Create deploy file

### 1 create a file

`scripts/createTriple.ts`

### 2 use hardhat-upgrades

`npm i @openzeppelin/hardhat-upgrades`

### 3 set in hardhat.config.ts

`import "@openzeppelin/hardhat-upgrades";`

### 4 import upgrades

`import { ethers, upgrades } from "hardhat";`

### 5 create a Contract Factory

`await ethers.getContractFactory`

### 6 deployProxy

`await upgrades.deployProxy`
`waitForDeployment()`

## 5 deploy and verify

### 1 deploy

`npx hardhat run srcipts/createTriple.ts --network sepolia`

### 2 verify

`npx hardhat verify --network sepolia <contract address>`

### 3 check the etherscan

`https://sepolia.etherscan.io/`

## 6 upgrade the implementation contract

### 1 create the v2 contract

### 2 create the upgrade function

`await upgrades.upgradeProxy`

### 3 verify

`npx hardhat verify --network sepolia <contract address>`
