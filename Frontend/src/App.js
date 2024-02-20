import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import HackerThon from "./utils/HackerThon.json";
import "./styles/App.css";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const CONTRACT_ADDRESS = "0xacf9172eFa504D838E40d90234Dba5a6A015b8F8";
  const LapToken = "0x64c4D0831a17B897AE976F2B949b40Fe68310118";
  const CyCToken = "0xa118c2c047125f6f61d6a2ebcfab69a31f8bfdaf";
  const SuSToken = "0xe6c593428506d40838f7aa0094255c03371f9d7d";
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }
    
    //This will request the object to check if a wallet address is 
    //authorised for this site , if yes then it will set the currentAccount,
    //If not when we will click connect wallet this site will be authorised
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };
  

  const connectWallet = async () => {
    try {

      //Gets the ethereum object injected by metamask.
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      // Fancy method to request access to account.
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      //This will get the account id from the ethereum object injected by metamask.
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  
  const RedeemCycleTokens = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          HackerThon.abi,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        let ContractTxn = await connectedContract.transferCyclesERC20(CyCToken,10);

        console.log("Redeeming Cycle Tokens...please wait.");
        await ContractTxn.wait();

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
      alert("The user has already redeemed one of the tokens");
    }
  };

    const RedeemLaptopTokens = async () => {
      try {
        const { ethereum } = window;

        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const connectedContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            HackerThon.abi,
            signer
          );

          console.log("Going to pop wallet now to pay gas...");
          let ContractTxn = await connectedContract.transferLaptopERC20(
            LapToken,
            10
          );

          console.log("Redeeming Cycle Tokens...please wait.");
          await ContractTxn.wait();
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
        alert("The user has already redeemed one of the tokens");
      }
    };

      const RedeemSubsidyTokens = async () => {
        try {
          const { ethereum } = window;

          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const connectedContract = new ethers.Contract(
              CONTRACT_ADDRESS,
              HackerThon.abi,
              signer
            );

            console.log("Going to pop wallet now to pay gas...");
            let ContractTxn = await connectedContract.transferSubsidyERC20(
              SuSToken,
              10
            );

            console.log("Redeeming Cycle Tokens...please wait.");
            await ContractTxn.wait();
          } else {
            console.log("Ethereum object doesn't exist!");
          }
        } catch (error) {
          console.log(error);
          alert("The user has already redeemed one of the tokens");
        }
      };

  // Will get rendered if the no user is connected
  const renderNotConnectedContainer = () => (
    <button
      onClick={connectWallet}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  /*
   * Added a conditional render! We don't want to show Connect to Wallet if we're already connected :).
   */
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Subsidy Tokens</p>
          <p className="sub-text">
            Redeem your token today. Choose any one for subsidy !
          </p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <div>
            <button
              onClick={RedeemCycleTokens}
              className="cta-button connect-wallet-button"
            >
              Redeem Cycle Tokens
            </button>
            <button
              onClick={RedeemLaptopTokens}
              className="cta-button connect-wallet-button"
            >
              Redeem Laptop Tokens
            </button>
            <button
              onClick={RedeemSubsidyTokens}
              className="cta-button connect-wallet-button"
            >
              Redeem Subsidy Tokens
            </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
