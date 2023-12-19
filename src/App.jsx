import "./styles/Home.css";
import Navbar from "./components/navbar";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "./components/StakeToken";
import RewardToken from "./components/rewardToken";


export default function Home() {
  

  
  const address = useAddress();
  
  if(!address) {
    return (
      <main className="main">
        <div className="container">
          <Navbar />
          <h1 className="flex items-center justify-center min-h-screen">Please connect your wallet</h1>
        </div>
      </main>
    );
  }

  
  return (
    <main className="main">
      <div className="container">
        <Navbar />
        <div className="flex flex-row justify-center items-center space-x-4 my-10">
          <StakeToken />
          <RewardToken />
        </div>
      </div>
    </main>
  );
}