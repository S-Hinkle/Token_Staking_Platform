import { ConnectWallet } from "@thirdweb-dev/react";
import logo from "../../public/images/ReactJS_MVP.png";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start flex-1">
            <a className="text-xl">Sturgeon Staking App</a>
            </div>
            <div className="navbar-center flex-none">
                Powered by
                <img src={logo} alt="logo" width={50} />
                <a className="text-xl">DapperFi</a>
            </div>
            <div className="navbar-end flex-1 justify-end">
                {/* <p>Welcome: </p> */}
                <ConnectWallet />
            </div>
        </div>
    )
}