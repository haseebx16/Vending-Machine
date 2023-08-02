import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { createContext } from "react";
import { contractABI, contractAddress } from "../utils/constants";

const { ethereum } = window

export const VendingMachine = createContext()

export const VendingMachineProvider = ({children}) => {
    
    const createContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const vendingMachineContract = new ethers.Contract(contractAddress, contractABI, signer);
        return vendingMachineContract;
    
    }

    const owner = "0xB0f74c5165762f1D585cb43e2BB768F6e85f3cba"
    const [donutBalance, setDonutBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const [laysBalance, setLaysBalance] = useState(0)
    const [pizzaBalance, setPizzaBalance] = useState(0)
    const [drinksBalance, setDrinksBalance] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [amount, setAmount] = useState(ethers.utils.parseEther("0.0"))
    const [restockQuantity, setRestockQuantity] = useState(100)
    const [currentAccount, setCurrentAccount] = useState("")
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        checkIfWalletIsConnected()
        updateBalances()
        contractBalance()
    }, [])

    const connectWallet = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_requestAccounts", });
    
          setCurrentAccount(accounts[0]);
        //   window.location.reload();
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
    };

    ethereum.on("accountsChanged", async(account) => {
        setCurrentAccount(account[0]);
    })

    const updateBalances = async () => {
        try {
            if (ethereum) {
                const contract = createContract()
                const donutBalance = await contract.getDonutBalance()
                const laysBalance = await contract.getLaysBalance()
                const pizzaBalance = await contract.getPizzaBalance()
                const drinksBalance = await contract.getDrinksBalance()

                setDonutBalance(donutBalance.toString())
                setLaysBalance(laysBalance.toString())
                setPizzaBalance(pizzaBalance.toString())
                setDrinksBalance(drinksBalance.toString())
            }
        }
        catch (error) {
            console.log("ERROR", error)
        }
    }

    const contractBalance = async () => {
        const contract = createContract()
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(contractAddress)
        const balanceInEth = ethers.utils.formatEther(balance)
        setBalance(balanceInEth)
    }

    const purchaseDonuts = async () => {
        try {
                setLoading(true)
                const contract = createContract()
                const res = await contract.PurchaseDonuts(quantity, {value: amount})
                await res.wait() 
                await updateBalances()
                alert("Sent back the remains !")
                setLoading(false)
        }
        catch (error) {
            console.log("EROR donut", error)
        }
    }

    const purchaseLays = async () => {
        try {
                setLoading(true)
                const contract = createContract()
                const res = await contract.PurchaseLays(quantity, {value: contract.getPriceForOnePiece(2)})
                await res.wait()
                await updateBalances()
                setLoading(false)
        }
        catch (error) {
            console.log("ERROR lays", error)
        }
    }

    const purchasePizza = async () => {
        try {
                setLoading(true)
                const contract = createContract()
                const res = await contract.PurchasePizza(quantity, { value: contract.getPriceForOnePiece(5) })
                await res.wait()
                await updateBalances()
                setLoading(false)
            }
        catch (error) {
            console.log("EROR pizza", error)
        }
    }

    const purchaseDrinks = async () => {
        try {
                setLoading(true)
                const contract = createContract()
               const res = await contract.PurchaseDrinks(quantity, { value: contract.getPriceForOnePiece(1)})
                await res.wait()
                await updateBalances()
                setLoading(false)
        }
        catch (error) {
            console.log("ERROR at drinks", error)
        }
    }

    const restockDonuts = async () => {
        try {
                setLoading(true)
                const res = await createContract().restockDonut(restockQuantity)
                await res.wait()
                await updateBalances();
                setLoading(false)
            }
        catch (error) {
            console.log("ERROR AT RESTOCKING DONUT", error)
        }
    }

    const restockLays = async () => {
        try {
                setLoading(true)
                const contract = createContract()
                const res = await contract.restockLays(restockQuantity)
                await res.wait()
                await updateBalances()
                setLoading(false)
        }
        catch (error) {
            console.log("Error at restocking lays", error)
        }
    }

    const restockPizza = async () => {
        try {
                setLoading(true)
                const contract = createContract()
                await contract.restockPizza(restockQuantity)
                await updateBalances()
                setLoading(false)
        }
        catch (error) {
            console.log("Error at restocking pizza", error)
        } 
    }

    const restockDrinks = async () => {
        try {
                setLoading(true)
                const contract = createContract()
               const res = await contract.restockDrinks(restockQuantity)
                await res.wait()
                await updateBalances()
                setLoading(false)
        }
        catch (error) {
            console.log("Error at restocking drinks", error)
        }
    }

    const withdraw = async () => {
        try {
                const contract = createContract()
                await contract.withdrawMoney()
        }
        catch (error) {
            console.log("Error withdrawing money!", error)
        }
    }

    return (
        <>
            <VendingMachine.Provider value={{connectWallet,setAmount,amount,setQuantity,setRestockQuantity, currentAccount, withdraw,
                 restockDonuts, loading, setLoading, restockDrinks, restockLays, restockPizza, purchaseDonuts, purchaseDrinks, purchaseLays, purchasePizza, donutBalance, pizzaBalance, drinksBalance, laysBalance, quantity, restockQuantity, balance, owner}}>
                {children}
            </VendingMachine.Provider>
        </>
    );
}

export default VendingMachineProvider;