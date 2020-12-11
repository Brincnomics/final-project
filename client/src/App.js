import React, { useState } from 'react';
import './App.css';
import { ethers } from "ethers";
import { Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCrowdsale from "./contracts/MyCrowdsale.json";
import MyToken from "./contracts/MyToken.json";

// Needs to change to reflect current MyToken address //[UPDATE with address provided from migration]
// Enter address of both contracts -I was missing the Crowdsale Address!!!
// The contract addresses here is not the same one for Ropsten needs to be updated
const myTokenAddress ='0xea8870f3E2aAcf26ac945159A11E79e3196d5752';
const myCrowdsaleAddress ='0x1b77B60B398834b3C3b7B397c25ca7A90Ad29260';

let provider;
let signer;
let erc20;
let crowdsale;
let noProviderAbort = true;

// Ensures metamask or similar installed
if (typeof window.ethereum !== 'undefined') {
	try{
    // Ethers.js set up, gets data from MetaMask and blockchain
    //erc20 = MyToken
		window.ethereum.enable().then(
			provider = new ethers.providers.Web3Provider(window.ethereum)
		);
		signer = provider.getSigner();
		erc20 = new ethers.Contract(myTokenAddress, MyToken.abi, signer); //changed to MyTokenAddress
		// Adds both contracts
		crowdsale = new ethers.Contract(myCrowdsaleAddress, MyCrowdsale.abi, signer);//changed to MyCrowdsaleAddress
		noProviderAbort = false;
	} catch(e) {
		noProviderAbort = true;
	}
}
//declare state variables
//''0x00'' is zero walllet and useState(0) is Wallet 1???
//Solved: useState(0) simply refers to zero integer, not wallet 1.
function App() {
	const [walAddress, setWalAddress] = useState('0x00');
	const [mtkBal, setMtkBal] = useState(0);
	const [ethBal, setEthBal] = useState(0);
	const [coinSymbol, setCoinSymbol] = useState("Nil");
	const [transAmount, setTransAmount] = useState('0');
	const [pendingFrom, setPendingFrom] = useState('0x00');
	const [pendingTo, setPendingTo] = useState('0x00');
	const [pendingAmount, setPendingAmount] = useState('0');
	const [isPending, setIsPending] = useState(false);
	const [errMsg, setErrMsg] = useState("Transaction failed!");
	const [isError, setIsError] = useState(false);

	// Aborts app if metamask etc not present
	if (noProviderAbort) {
		return (
			<div>
			<h1>Error</h1>
			<p><a href="https://metamask.io">Metamask</a> or equivalent required to access this page.</p>
			</div>
		);
	}

	// Notification to user that transaction sent to blockchain
	const PendingAlert = () => {
		if (!isPending) return null;
		return (
			<Alert key="pending" variant="info" 
			style={{position: 'absolute', top: 0}}>
			Blockchain event notification: transaction of {pendingAmount} {coinSymbol} from
			<br /> {pendingFrom} <br /> to <br /> {pendingTo}.
			</Alert>
		);
	};

	// Notification to user of blockchain error
	const ErrorAlert = () => {
		if (!isError) return null;
		return (
			<Alert key="error" variant="danger" 
			style={{position: 'absolute', top: 0}}>
			{errMsg}
			</Alert>
		);
	};

  // Sets current balance of MTK for user 
  // erc20 = MyToken
  // balanceOf is from ERC20.sol
	signer.getAddress().then(response => {
		setWalAddress(response);
		return erc20.balanceOf(response);
	}).then(balance => {
		let formattedBalance = ethers.utils.formatUnits(balance, 18);
		setMtkBal(formattedBalance.toString())
	});

  // Sets current balance of Eth for user
  // provider = web3 (metamask)
	signer.getAddress().then(response => {
		return provider.getBalance(response);
	}).then(balance => {
		let formattedBalance = ethers.utils.formatUnits(balance, 18);
		setEthBal(formattedBalance.toString())
	});

	// Sets symbol of ERC20 token (i.e. MTK) 
	async function getSymbol() {
		let symbol = await erc20.symbol();
		return symbol;
	}
	let symbol = getSymbol();
	symbol.then(x => setCoinSymbol(x.toString()));

	

	// Interacts with smart contract to buy MTK
	async function buyMTK() {
		// Converts integer as Eth to Wei,
		let amount = await ethers.utils.parseEther(transAmount.toString());
		try {
			// New: Changed to standard buy function in OZ Crowdsale
			await crowdsale.buyTokens(walAddress, {value: amount});
			// Listens for event on blockchain [NEED TO CHANGE MTKBuyEvent]
			// New: Changed to listen to new event standard in OZ Crowdsale > "TokensPurcased"
			await crowdsale.on("TokensPurchased", (purchaser, beneficiary, value, amount) => {
				setPendingFrom(myCrowdsaleAddress.toString()); //changed "from" to myCrowdsaleAddress"
				setPendingTo(purchaser.toString()); //changed to "purchaser"
				setPendingAmount(transAmount.toString()); //changed to "transAmount"
				setIsPending(true);
      })

		} catch(err) {
			console.log(err);
			if(typeof err.data !== 'undefined') {
				setErrMsg("Error: "+ err.data.message);
			} 
			setIsError(true);
		} 	
	}


	// Sets state for value to be transacted
	// Clears extant alerts
	function valueChange(value) {
		setTransAmount(value);
		setIsPending(false);
		setIsError(false);
	}

	// Handles user buy form submit
	const handleBuySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		valueChange(e.target.buymtk.value);
		buyMTK(); //from line 108
	};


	return (
		<div className="App">
		<header className="App-header">

		<ErrorAlert />
		<PendingAlert />

		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/512px-Ethereum-icon-purple.svg.png" className="App-logo" alt="Ethereum logo" />

		<h2>{coinSymbol}</h2>

		<p>
		User Wallet address: {walAddress}<br/>
		Eth held: {ethBal}<br />
		MTK held: {mtkBal}<br />
		</p>

		<form onSubmit={handleBuySubmit}>
		<p>
		<label htmlFor="buymtk">MTK to buy:</label>
		<input type="number" step="1" min="0" id="buymtk" 
		name="buymtk" onChange={e => valueChange(e.target.value)} required 
		style={{margin:'12px'}}/>	
		<Button type="submit" >Buy MTK</Button>
		</p>
		</form>


		<a  title="GitR0n1n / CC BY-SA (https://creativecommons.org/licenses/by-sa/4.0)" href="https://commons.wikimedia.org/wiki/File:Ethereum-icon-purple.svg">
		<span style={{fontSize:'12px',color:'grey'}}>
		Ethereum logo by GitRon1n
		</span></a>
		</header>
		</div>
	);
}

export default App;
