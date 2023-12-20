import { useAddress, useTokenBalance, useContract  } from "@thirdweb-dev/react";
import { rewardTokenAddress } from "../../constants/addresses";

export default function RewardTokenInfo() {
    const address = useAddress();
    const { contract, isLoading: loadingRewardToken } = useContract(rewardTokenAddress, "token");
    const { data: rewardTokenBalance , isLoading: loadingRewardBalance } = useTokenBalance(contract, address);


    // Determine if the component is still loading data
    const isLoading = loadingRewardToken || loadingRewardBalance;


    return (
        <div>
            {isLoading ? (
                // Show skeleton loader when data is loading
                <div className="skeleton w-96 h-32"></div>
            ) : (
                // Show data once it's loaded
                <div>
                    {/* Display specific properties of rewardTokenBalance */}
                    
                    <div className="stats w-auto border-2 border-indigo-500/75">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                <img src="/images/testnet_token_caviar.png" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">Caviar</div>
                        <div className="stat-title">Reward Token</div>
                        <div className="stat-desc">Network: Goerli Testnet (Ethereum)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Token Supply</div>
                        <div className="stat-value text-primary">500,000</div>
                        <div className="stat-desc"><a href={`https://goerli.etherscan.io/token/${contract.signature.contractWrapper.address}`} target="_blank" rel="noreferrer"><u>Search Token on EtherScan</u></a></div>
                    </div>
                    
                    <div className="stat">
                        <div className="stat-title">Wallet Balance</div>
                        <div className="stat-value text-secondary">{rewardTokenBalance.displayValue}</div>
                        <div className="stat-desc"><a href={`https://goerli.etherscan.io/address/${address}`} target="_blank" rel="noreferrer"><u>Search Wallet on EtherScan</u></a></div>
                    </div>
                    
                    </div>


                    {/* shadow-md shadow-indigo-500/50 */}

                </div>
            )}
        </div>
    );
}