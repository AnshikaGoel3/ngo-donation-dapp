import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [totalDonations, setTotalDonations] = useState(undefined);
  const [numberOfDonors, setNumberOfDonors] = useState(undefined);
  const [donationAmount, setDonationAmount] = useState("");
  const [donated, setDonated] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = contractABI.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getContract();
  };

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet, "any");
    const signer = provider.getSigner();
    const assessmentContract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    setContract(assessmentContract);
  };

  const getBalance = async () => {
    if (contract) {
      const balance = await contract.getBalance();
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const getTotalDonations = async () => {
    if (contract) {
      const totalDonations = await contract.getTotalDonations();
      setTotalDonations(ethers.utils.formatEther(totalDonations));
    }
  };

  const getNumberOfDonors = async () => {
    if (contract) {
      const numberOfDonors = await contract.getNumberOfDonors();
      setNumberOfDonors(numberOfDonors.toNumber());
    }
  };

  const donate = async () => {
    if (contract) {
      const donationTransaction = await contract.signer.sendTransaction({
        to: contractAddress,
        value: ethers.utils.parseEther(donationAmount),
      });
      await donationTransaction.wait();
      setDonated(true);
      getBalance();
      getTotalDonations();
      getNumberOfDonors();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this DApp.</p>;
    }

    if (!account) {
      return (
        <button className="connect-button" onClick={connectAccount}>
          Connect MetaMask Wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    if (totalDonations === undefined) {
      getTotalDonations();
    }

    if (numberOfDonors === undefined) {
      getNumberOfDonors();
    }

    if (donated) {
      return (
        <div>
          <img
            src="https://media.istockphoto.com/id/1270660792/vector/hand-lettering-thank-you-with-sunburst-vintage-graphic-on-colorful-background-trendy-banner.jpg?s=612x612&w=0&k=20&c=XIC5OY5dgHApiRzJ5McExzuM3vBmRPBe-wTf6xX3JFk="
            alt="Thank you for donating"
            className="thank-you-image"
          />
          <button
            className="donate-again-button"
            onClick={() => setDonated(false)}
          >
            Donate Again
          </button>
        </div>
      );
    }

    return (
      <div className="info">
        <p>Your Account: {account}</p>
        <p>Contract Balance: {balance} ETH</p>
        <p>Total Donations: {totalDonations} ETH</p>
        <p>Number of Donors: {numberOfDonors}</p>
        <div>
          <input
            className="donate-input"
            type="text"
            value={donationAmount}
            placeholder="Enter donation amount"
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </div>
        <button className="donate-button" onClick={donate}>
          Donate {donationAmount} ETH
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the NGO Donation DApp</h1>
      </header>
      {initUser()}
    </main>
  );
}
