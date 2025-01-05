## 0 setup

### 1 install hardhat

`npm i hardhat`

### 2 create a hardhat project

`npx hardhat init <project name>`

### 3 run a local node

`npx hardhat node`

## 1 Create a verifier contract

### 1 create an outline

`contract ERC712Verifier {}`

### 2 import ECDSA

`npm i @openzeppelin/contracts`

`import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";`

### 3 set ECDSA to bytes32(to use recover function)

`using ECDSA for bytes32;`

### 4 create type hashes

```
bytes32 public constant SIMPLE_TYPE_HASH = keccak256(
    "SimpleStruct(string message,uint256 value)"
);

bytes32 public constant EIP712_DOMAIN_TYPE_HASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);
```

### 5 create a domain selector

```
bytes32 public immutable DOMAIN_SELECTOR;

constructor() {
    DOMAIN_SELECTOR = keccak256(
        abi.encode(
            EIP712_DOMAIN_TYPE_HASH,
            keccak256(bytes("Simple")),
            keccak256(bytes("1")),
            block.chainid,
            address(this)
        )
    );
}
```

### 6 create a verify function

#### 1 create an outline

`function verify() public view returns(address) {}`

### 2 set arguments

```
string memory message,
uint256 value,
bytes memory signature
```

#### 3 create a struct Hash

```
bytes32 structHash = keccak256(
    abi.encode(
        SIMPLE_TYPE_HASH,
        keccak256(bytes(message)),
        value
    )
);
```

#### 4 create a digest

```
bytes32 digest = keccak256(
    abi.encodePacked("\x19\x01", DOMAIN_SELECTOR,structHash)
);
```

#### 5 recover signature

`return digest.recover(signature);`

## 2 deploy

### 1 create a deploy file

`scripts/deploy/verify.ts`

### 2 import ethers

`import { ethers } from "hardhat";`

### 3 create an async function

```
async function main(){}

main().catch((error) => { console.error(error)});
```

### 4 get a contract factory

`await ethers.getContractFactory("name")`

### 5 deploy

`await Verifier.deploy()`

### 6 run the file

`npx hardhat run scripts/deploy/verify.ts --network localhost`

## 3 verify

### 1 create a file

`scripts/transactions/verify.ts`

### 2 import ethers and create async function

```
import { ethers } from "hardhat";

async function main() {}

main().catch((error) => {
  console.error(error);
});
```

### 3 create provider and signer

```
const provider = ethers.provider;

const signer = (await ethers.getSigners())[0];
```

### 4 get the contract

```
const verifier = await ethers.getContractAt(
    "ERC712Verifier",
    <contract address>
);
```

### 5 create a domain

```
const domain = {
    name: "Simple",
    version: "1",
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: await verifier.getAddress(),
};
```

### 6 create a types

```
const types = {
    SimpleStruct: [
      { name: "message", type: "string" },
      { name: "value", type: "uint256" },
    ],
};
```

### 7 create a message

```
const message = {
    message: "hello!",
    value: 42,
};
```

### 8 create a signature

`const signature = await signer.signTypedData(domain, types, message);`

### 9 verify the signature

```
const recoveredAddress = await verifier.verify(
    message.message,
    message.value,
    signature
);
```
