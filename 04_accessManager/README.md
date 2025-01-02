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

## 3 Create an access manager contract

### 1 create an outline

```
contract MyAccessManager {}
```

### 2 import the accessManager

`npm i @openzeppelin/contracts`

```
import { AccessManager } from "@openzeppelin/contracts/access/manager/AccessManager.sol";
```

### 3 inherit AccessManager

### 4 constructor

```
constructor() AccessManager(msg.sender) {
}
```

## 4 Create a deploy file for access manager

### 1 create a file

`scripts/deploy/accessManager.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 create a Contract Factory

`await ethers.getContractFactory`

### 4 deploy

`await ethers.deploy`
`waitForDeployment()`

## 5 deploy and verify for access manager

### 1 deploy

`npx hardhat run srcipts/deploy/accessManager.ts --network sepolia`

### 2 verify

```
npx hardhat verify --network sepolia <contract address> --contract contracts/MyAccessM
anager.sol:MyAccessManager
```

### 3 check the etherscan

`https://sepolia.etherscan.io/`

## 6 Create an access managed contract

### 1 create an outline

```
contract MyAccessManagedERC20 {}
```

### 2 import the accessManager

```
import { AccessManaged } from "@openzeppelin/contracts/access/manager/AccessManaged.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

### 3 inherit AccessManager

### 4 constructor

```
constructor(address initialAuthority) ERC20("test", "TT") AccessManaged(initialAuthority){}
```

### 5 create a mint function with restricted modifier

```
function mint(address to, uint256 amount) public restricted {
    _mint(to, amount);
}
```

## 7 Create a deploy file for access managed

### 1 create a file

`scripts/deploy/accessManaged.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 create a Contract Factory

`await ethers.getContractFactory`

### 4 deploy

`accessManaged.deploy(<access manager address>)`
`waitForDeployment()`

## 8 deploy and verify for access manager

### 1 deploy

`npx hardhat run srcipts/deploy/accessManaged.ts --network sepolia`

### 2 verify

```
npx hardhat verify --network sepolia --contract contracts/MyAccessM
AccessManagedERC20Mint.sol:AccessManagedERC20Mint <contract address> <access manager address>
```

### 3 check the etherscan

`https://sepolia.etherscan.io/`

## 9 execute a grantRole function

### 1 create a file

`scripts/transaction/grantRole.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 get a Contract

`await ethers.getContractAt()`

### 4 set minter role number and labelRole

`const MINTER = 42n;`

`await manager.labelRole(MINTER, "MINTER");`

### 5 grantRole

`await manager.grantRole()`

### 6 execute the grantRole function

`npx hardhat run scripts/transactions/grantRole.ts --network sepolia`

## 10 execute a setTargetFunctionRole function

### 1 create a file

`scripts/transaction/setTargetFunctionRole.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 get a Contract

`await ethers.getContractAt()`

### 4 get a mint function selector

`const mintSelector = ethers.id("mint(address,uint256)").slice(0, 10);`

### 5 setTargetFunctionRole

```
await manager.setTargetFunctionRole(
  "0x08786b717dB43B637fF835503d4D558dAD235F56",
  [mintSelector],
  42n
);
```

### 6 execute the grantRole function

`npx hardhat run scripts/transactions/setTargetFunctionRole.ts --network sepolia`
