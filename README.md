# Project: Function Frontend

This project is under ETH+AVAX intermediate EVM course from metacrafters.
The objective of this project was to create a simple contract having 2-3 functions and display the values of those functions on frontend

## Description
For this frontend project, I have created a NGO DONATION DAPP:
The main goal of the NGO donation DApp is to make allow people to donate to NGO by utilizing Ethereum blockchain technology. Individuals are able to link their MetaMask wallets to engage with the DApp, see their account information, give donations in form of ETHERS, and monitor donation statistics like the present balance, overall donations gathered, and the number of donors.

## Getting Started

### Installing
1. Download the Project by cloning the repository from GitHub or downloading the project ZIP file.
   
### Executing program
1. Open the Project in your Integrated Development Environment (IDE).
2. Open a terminal and install the dependencies using the command `npm install`.
3. Open another terminal and run `npx hardhat node`.
4. In a new terminal, deploy contracts to the local network with `npx hardhat run - 
   network localhost scripts/deploy.js`.
5. Finally, start the frontend by running `npm run dev` to launch it on localhost:3000.

## Steps to Create MetaMask Account
1. Install the MetaMask extension and add it to your browser.
2. Create a new account using your credentials.
3. Add a new network by clicking on "Custom RPC" in the network section.
4. Enter the following details:
      * Network Name: localhost
      * New RPC URL: http://127.0.0.1:8545/
      * Chain ID: 31337
      * Currency Symbol: ETH
5. Save the network configuration.
6. Now add a new account by clicking on "Import Account".
7. Add the private key from the network you set up in your terminal when running npx hardhat 
   node.

## Program Working
1. Once the frontend is running properly, click on "Connect to MetaMask."
2. After clicking, it will prompt you to enter the donation amount.
3. After donating, you will see your account details, total donations, and the number of donors.
4. A thank you message will appear with a button to donate again.
