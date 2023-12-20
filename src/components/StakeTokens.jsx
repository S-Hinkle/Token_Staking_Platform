import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { stakeTokenAddress, rewardTokenAddress, stakeContractAddress } from "../../constants/addresses.jsx";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import StakeUnstake from "./StakeUnstake.jsx";
import ClaimTokens from "./ClaimTokens.jsx";

export default function StakeTokens() {

    const [amountToStake, setAmountToStake] = useState(0);
    const [amountToClaim, setAmountToClaim] = useState(0);
    const [showToast, setShowToast] = useState(false);


    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(stakeTokenAddress, "token");
    const { contract: rewardTokenContract, isLoading: loadingRewardToken } = useContract(rewardTokenAddress, "token");
    const { contract: stakeContract, isLoading: loadingStakeContract } = useContract(stakeContractAddress, "custom");

    const { data: stakeTokenBalance, refetch: refreshStakeTokenBalance, isLoading: loadingStakeBalance } = useTokenBalance(stakeTokenContract, address);
    const { data: rewardTokenBalance, refetch: refreshRewardTokenBalance, isLoading: loadingRewardBalance } = useTokenBalance(rewardTokenContract, address);

    const { data: stakeInfo, refetch: refreshStakeInfo, isLoading: loadingStakeInfo } = useContractRead(stakeContract, "getStakeInfo", [address]);

    const isLoading = loadingStakeToken || loadingRewardToken || loadingStakeContract || loadingStakeBalance || loadingRewardBalance || loadingStakeInfo;


    
    //console.log('Info Contract:',stakeInfo)
    useEffect (() => {
        setInterval(() => {
            refreshStakeInfo();
            refreshStakeTokenBalance();
            refreshRewardTokenBalance();
        }, 60000)
    })

    function resetStakeAndClaim() {
        setAmountToStake(0);
        setAmountToClaim(0);
    }

    const handleSuccess = () => {
        setShowToast(true);
        // Optionally, set a timer to hide the toast after a few seconds
        setTimeout(() => setShowToast(false), 7000);
    };
    

    return (
        <div className="stats w-full h-full border-2 border-indigo-500/75">

            {isLoading ? (
                // Show skeleton loader when data is loading
                <div className="skeleton w-96 h-32"></div>

            ) : (

                // Show data once it's loaded
                <div className="flex flex-row gap-4">
                <div className="flex-1 flex flex-col p-4 gap-4">


                    <StakeUnstake stakeTokenBalance={stakeTokenBalance} stakeContract={stakeContract} stakeContractAddress={stakeContractAddress} stakeTokenContract={stakeTokenContract} resetStakeAndClaim={resetStakeAndClaim} handleSuccess={handleSuccess} showToast={showToast}/>
                    
                    
                    <div className="flex-1 rounded-md border-2 p-8 border-indigo-500/75">
                        <div className="stat-value">Unclaimed Rewards</div>
                        <div className='flex flex-row justify-center'>
                            <p>{ethers.utils.formatEther(stakeInfo[1])}</p>
                            <p>{" $" + rewardTokenBalance?.symbol}</p>
                        </div>
                        <div className='flex justify-center mt-4'>
                        
                        <Web3Button
                            contractAddress={stakeContractAddress} 
                            action={async (contract) => {
                                await contract.call("claimRewards");
                              }}
                            onSuccess={handleSuccess}
                            >
                            Claim Rewards
                        </Web3Button>

                        {showToast && (
                            <div className="toast toast-center toast-bottom">
                                <div className="alert alert-success">
                                    <span>Rewards Claimed!</span>
                                </div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>



                <div className="flex-1 flex flex-col p-4 gap-4">
                    {/* Content of the second column */}
                    <div className="flex-1 rounded-md border-2 p-8 border-indigo-500/75">
                        <div className="stat-value mb-2">My Position</div>
                        <div className="divider"> Unstaked</div>
                            <table className="table">
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th><img src="/images/testnet_token_sturgeon.png" className="w-24"/></th>
                                        <td>Sturgeon</td>
                                        <td>{stakeTokenBalance.displayValue}</td>
                                    </tr>
                                </tbody>
                            </table>
                        <div className="divider">Staked</div>
                            <table className="table">
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <th><img src="/images/testnet_token_sturgeon.png" className="w-24"/></th>
                                        <td>Sturgeon</td>
                                        <td>{ethers.utils.formatEther(stakeInfo[0])}</td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
            )}
            
        </div>
    )
}