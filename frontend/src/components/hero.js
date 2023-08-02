import React, { useContext, useState } from 'react'
import {VendingMachine} from '../context/VendingMachineContext'
import { ethers } from 'ethers'
import { contractAddress } from '../utils/constants'
import { contractABI } from '../utils/constants'

const { ethereum } = window

const Hero  = () => {
    const createContract = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const vendingMachineContract = new ethers.Contract(contractAddress, contractABI, signer);
        return vendingMachineContract;
    }

    const {setQuantity,loading,setAmount,amount,setRestockQuantity, owner, currentAccount, withdraw, restockDonuts, restockDrinks, restockLays, restockPizza, purchaseDonuts, purchaseDrinks, purchaseLays, purchasePizza, donutBalance, pizzaBalance, drinksBalance, laysBalance, quantity, restockQuantity, balance} = useContext(VendingMachine)
    const [selectedItemPrice, setSelectedItemPrice] = useState(ethers.utils.parseEther("0.0"))

    const handleAmountChange = async (e) => {
        const inputValue = e.target.value;
        const amountInWei = ethers.utils.parseEther(inputValue, 18)
        setAmount(amountInWei.toString());
    };

    const handleKeyUp = (e) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          // Increment the current amount by 0.1 wei (0.1 ether)
          const incrementBy = ethers.utils.parseUnits("0.1", 18);
          setAmount((prevAmount) => prevAmount.add(incrementBy));
        }
      };

      const handleDonutClick = async () => {
        try {
          const contract = createContract();
          const res = await contract.getPriceForOnePiece(3)
            setSelectedItemPrice(ethers.utils.formatEther(res)); // Format the price in ether for display
            setAmount(res.toString());
        } catch (error) {
          console.log("Error fetching price", error);
        }
      };

      const handleLaysClick = async () => {
        try {
          const contract = createContract();
          const res = await contract.getPriceForOnePiece(2)
            setSelectedItemPrice(ethers.utils.formatEther(res)); // Format the price in ether for display
            setAmount(res.toString());
        } catch (error) {
          console.log("Error fetching price", error);
        }
      };

      const handlePizzaClick = async () => {
        try {
          const contract = createContract();
          const res = await contract.getPriceForOnePiece(5)
            setSelectedItemPrice(ethers.utils.formatEther(res)); // Format the price in ether for display
            setAmount(res.toString());
        } catch (error) {
          console.log("Error fetching price", error);
        }
      };

      const handleDrinksClick = async () => {
        try {
          const contract = createContract();
          const res = await contract.getPriceForOnePiece(1)
            setSelectedItemPrice(ethers.utils.formatEther(res)); // Format the price in ether for display
            setAmount(res.toString());
        } catch (error) {
          console.log("Error fetching price", error);
        }
      };

    return (
    <>
    <div className="mb-10"></div>
            <div className="flex flex-col items-center mt-20">
            <div className="rounded-md inline-flex justify-center items-center mb-10 mr-20">
                {/* <button className="bg-slate-600 rounded-md text-white flex p-2" onClick={updateBalances}>Get Balance</button> */}
                <h2 className="ml-60 mr-10 text-2xl justify-center inline-flex items-center  font-extrabold text-white">Balances:</h2>
                <p className='text-white mr-2 mt-2 font-bold'>$2 each</p>
                <button onClick={handleDonutClick} className="inline-flex focus:bg-green-600 mx-2 mr-10 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black transition-all text-sm focus:ring-green-900 dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2">Donut: {donutBalance}</button>
                <p className='text-white mr-2 mt-2 font-bold'>$5 each</p>
                <button onClick={handleLaysClick} className="inline-flex mx-2 focus:bg-green-600 mr-10 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2">Lays: {laysBalance}</button>
                <p className='text-white mr-2 mt-2 font-bold'>$3 each</p>
                <button onClick={handlePizzaClick} className="inline-flex mx-2 focus:bg-green-600 mr-10 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2">Pizza: {pizzaBalance}</button>
                <p className='text-white mr-2 mt-2 font-bold'>$1 each</p>
                <button onClick={handleDrinksClick} className="inline-flex mx-2 focus:bg-green-600 mr-10 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2">Drinks: {drinksBalance}</button>
            </div>
            </div>
          
            <div className="text-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                <div className="inline-flex justify-center flex-col mt-20">
                    <h2 className=" text-2xl justify-center inline-flex items-center text-white font-extrabold">Purchase Items:</h2>
                    {/* <label htmlFor="quantity">Quantity:</label>
                    <input type="number" id="quantity" className="rounded-md ml-2 border bg-gray-300 text-black" min="1" max="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))} /> */}
                    <label htmlFor="payment">Payment in ETH :</label>
                    <input
                        type="number"
                        id="Payment"
                        className="rounded-md ml-2 border bg-gray-300 text-black"
                        value={ethers.utils.formatEther(amount, 18)} // Convert from wei to ether for display in the input field
                        onChange={handleAmountChange}
                        onKeyUp={handleKeyUp}
                    />

                    {/* Buttons aligned horizontally */}
                    <div className="flex mt-3 ml-2">
                    <button disabled={loading} className="flex mx-2 focus:bg-green-600 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={purchaseDonuts}>Buy Donuts</button>
                    <button disabled={loading} className="flex mx-2 focus:bg-green-600 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={purchasePizza}>Buy Pizza</button>
                    <button disabled={loading} className="inline-flex focus:bg-green-600 mx-2 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={purchaseDrinks}>Buy Drinks</button>
                    <button disabled={loading} className="inline-flex focus:bg-green-600 mx-2 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={purchaseLays}>Buy Lays</button>
                    </div>

                </div>
            </div>
            { currentAccount?.toLowerCase() === owner.toLowerCase() &&
                <div className="text-white mt-40" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                    <div className="inline-flex justify-center flex-col">
                        <h2 className="text-2xl justify-center inline-flex items-center text-white font-extrabold">Restock Items:</h2>
                        <label htmlFor="restockQuantity">Quantity To Restock :</label>
                        <input className="rounded-md bg-gray-300 text-black" type="number" id="restockQuantity" min="1" value={restockQuantity} onChange={(e) => setRestockQuantity(parseInt(e.target.value, 10))} />

                        <div className="flex flex-row"> {/* Use flex-row instead of flex-col */}
                        <button disabled={loading} className="flex mx-2 p-2 justify-center items-center gap-4 focus:bg-green-600 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={restockDonuts}>Restock Donuts</button>
                        <button disabled={loading} className="flex mx-2 p-2 justify-center focus:bg-green-600 items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={restockLays}>Restock Lays</button>
                        <button disabled={loading} className="inline-flex focus:bg-green-600 mx-2 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={restockPizza}>Restock Pizza</button>
                        <button disabled={loading} className="inline-flex focus:bg-green-600 mx-2 p-2 justify-center items-center gap-4 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={restockDrinks}>Restock Drinks</button>
                    </div>
                </div>
              </div>
            } 

            {currentAccount?.toLowerCase() === owner.toLowerCase() &&
            <>
                <div className="text-white text-2xl justify-center inline-flex items-center font-extrabold mt-20 " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                        <div className='text-2xl font-extrabold text-white justify-center items-center inline-flex'>
                            Withdraw:
                        </div>
                        <div className="text-lg ml-2 text-white justify-center items-center inline-flex">
                            Contract Balance is {parseFloat(balance)?.toFixed(3)}
                        </div>
                        
                </div>
                    <div className="flex flex-row justify-center items-center"> {/* Use flex-row instead of flex-col */}
                    <button disabled={balance === 0} className="flex-col focus:bg-green-600 mx-2 p-2 justify-center items-center gap-4 first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium align-left hover:bg-black focus:z-10 focus:outline-none focus:ring-2 focus:ring-green-900 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 text-white mt-2" onClick={withdraw}>WithDraw</button>
                </div>
            </>
            }
            </>
            
  )
}

export default Hero