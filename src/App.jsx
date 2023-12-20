import "./styles/Home.css";
import Navbar from "./components/navbar";
import { useAddress } from "@thirdweb-dev/react";
import StakeTokenInfo from "./components/StakeTokenInfo";
import RewardTokenInfo from "./components/RewardTokenInfo";
import StakeTokens from "./components/StakeTokens";


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


  if(address === process.env.ADMIN_ID) {
    return (
      <main className="main">
        <div className="container">
          <Navbar />
          <h1 className="flex items-center justify-center min-h-screen">Welcome Admin</h1>
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
        </div >
        <StakeTokens />
      </div>
    </main>
  );
}