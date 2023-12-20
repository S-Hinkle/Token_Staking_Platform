import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start flex-1">
                <h1>daisyUI</h1>
            </div>
            <div className="navbar-center flex-none">
                <img src="public/images/ReactJS_MVP.png" alt="logo" width={50} />
                <a className="text-xl">DapperFi</a>
            </div>
            <div className="navbar-end flex-1 justify-end">
                {/* <p>Welcome: </p> */}
                <ConnectWallet />
            </div>
        </div>
    )
}