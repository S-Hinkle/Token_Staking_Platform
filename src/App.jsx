import "./styles/Home.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import { useAddress } from "@thirdweb-dev/react";
import Dashboard from "./components/Dashboard";
import StakeTokenInfo from "./components/StakeTokenInfo";
import RewardTokenInfo from "./components/RewardTokenInfo";
import StakeTokens from "./components/StakeTokens";
import { devTestAddress } from "../constants/addresses";


export default function Home() {
  

  
  const address = useAddress();
  const [isAdminView, setIsAdminView] = useState(false);
  
  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account: address }),
      });

  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login here (e.g., redirect, store session data, etc.)
    } catch (error) {
      console.error('Login failed:', error);
      // Handle errors here (e.g., show error message)
    }
  };


  useEffect(() => {
    if (address) {
      handleLogin();
    }
  }, [address]); // The useEffect will run whenever the value of 'address' changes

  

  // Function to toggle admin view
  const toggleAdminView = () => {
    setIsAdminView(!isAdminView);
  };



  if (!address) {
    return (
      <main className="main">
        <div className="container">
          <Navbar />
          <h1 className="flex items-center justify-center min-h-screen">Please connect your wallet</h1>
        </div>
      </main>
    );
  }

  if (address === devTestAddress) {
    return (
      <main className="main">
        <div className="container">
          <Navbar />
          {isAdminView ? (
            // Admin specific page
            <Dashboard />
          ) : (
            // Normal user view
            <>
              <div className="flex flex-row justify-center items-center space-x-4 my-5">
                <StakeTokenInfo />
                <RewardTokenInfo />
              </div>
              <StakeTokens />
            </>
          )}
          <div className="flex flex-row justify-center items-center space-x-4 my-5">
            <button className="btn btn-primary flex justify-center mt-4" onClick={toggleAdminView}>
              {isAdminView ? 'Go to User View' : 'Go to Admin View'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="container">
        <Navbar />
        <div className="flex flex-row justify-center items-center space-x-4 my-5">
          <StakeTokenInfo />
          <RewardTokenInfo />
        </div>
        <StakeTokens />
      </div>
    </main>
  );


  
  // if(!address) {
  //   return (
  //     <main className="main">
  //       <div className="container">
  //         <Navbar />
  //         <h1 className="flex items-center justify-center min-h-screen">Please connect your wallet</h1>
  //       </div>
  //     </main>
  //   );
  // }


  // if(address === devTestAddress) {
  //   return (
  //     <main className="main">
  //       <div className="container">
  //         <Navbar />
  //         <h1 className="flex items-center justify-center min-h-screen">Welcome Admin</h1>
  //       </div>
  //     </main>
  //   );
  // }

  
  // return (
  //   <main className="main">
  //     <div className="container">
  //       <Navbar />
  //       <div className="flex flex-row justify-center items-center space-x-4 my-5">
  //         <StakeTokenInfo />
  //         <RewardTokenInfo />
  //       </div >
  //       <StakeTokens />
  //     </div>
  //   </main>
  // );
}