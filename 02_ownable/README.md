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

### 1 create an outline

```
contract MyContract {}
```

### 2 set the variable

```
uint256 public number;
```

### 3 import the ownable

`npm i @openzeppelin/contracts`

`import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";`

### 4 inherit the ownable

### 5 constructor

```
constructor() Ownable(_msgSender()) {
        number = 0;
    }
```

### 6 create a function

```
function setNumber(uint256 newNumber) public onlyOwner {
        number = newNumber;
    }
```

## 4 Create a deploy file

### 1 create a file

`scripts/deploy.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 create a Contract Factory

`await ethers.getContractFactory`

### 4 deploy

`await ethers.deploy`
`waitForDeployment()`

## 5 deploy and verify

### 1 deploy

`npx hardhat run srcipts/deploy.ts --network sepolia`

### 2 verify

`npx hardhat verify --network sepolia <contract address>`

### 3 check the etherscan

`https://sepolia.etherscan.io/`
