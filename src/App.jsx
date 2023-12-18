import "./styles/Home.css";
import Navbar from "./components/navbar";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  
  
  const address = useAddress();
  console.log(address);
  
  
  return (
    <main className="main">
      <div className="container">
        <Navbar />
      </div>
    </main>
  );
}