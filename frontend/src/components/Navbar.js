import React, { useContext, useState } from 'react'
import { VendingMachine } from '../context/VendingMachineContext';

const Nav = () => {
    const { connectWallet, currentAccount } = useContext(VendingMachine)
    const [open,setOpen]=useState(false);
  return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
      <div onClick={() => {window.location.reload()}} className="font-bold text-2xl cursor-pointer flex items-center hover:text-black duration-500
      text-white">
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <ion-icon name="logo-ionic"></ion-icon>
        </span>
        🛒 Vending Machine
      </div>
      <div>
          <button onClick={connectWallet} className='bg-slate-600 ml-20 rounded-md border bg-transparent hover:bg-black duration-200 text-white p-2'>{currentAccount ? `${currentAccount.slice(0,5)}...${currentAccount.slice(currentAccount.length - 4)}` : "Connect Wallet"}</button>
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl right-8 top-6 cursor-pointer md:hidden'>
      <ion-icon name={open ? 'close':'menu'}></ion-icon>
      </div>
      {/* <button className='text-white bg-slate-600 rounded-md p-2'>{currentAccount ? `${currentAccount.slice(0,5)}...${currentAccount.slice(currentAccount.length - 4)}`: <button onClick={connectWallet} className='text-white bg-slate-600 rounded-md p-2'>Connect Wallet</button>}</button> */}
      </div>
    </div>
  )
}

export default Nav