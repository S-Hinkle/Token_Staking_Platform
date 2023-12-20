


export default function Dashboard({ walletData }) {


    return (
        <div className="flex flex-col justify-center items-center w-auto h-auto">
            <div className="stat-value">User Wallets</div>
            <div className="divider"></div> 
        {walletData.map((wallet, index) => (
            <div key={index} className="stats p-4 m-2 border-2 border-indigo-500/75">
                {/* Render properties of wallet data here */}
                <p>Wallet Address: {wallet.wallet_address}</p> {/* Example, replace with actual property */}
                {/* Add more properties as needed */}
            </div>
        ))}
    </div>
    )
    
}