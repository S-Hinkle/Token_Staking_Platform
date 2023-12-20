import React, { useState } from 'react';
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export default function ClaimTokens( props ) {
    

    return (
        <div className="flex-1 rounded-md border-2 p-8 border-indigo-500/75">
            <div className="stat-value">Unclaimed Rewards</div>
            <div className='flex flex-row justify-center'>
                <p>{ethers.utils.formatEther(props.stakeInfo[1])}</p>
                <p>{" $" + props.rewardTokenBalance?.symbol}</p>
            </div>
            <button className="btn btn-neutral w-full">Collect Rewards</button>
            <div className='flex justify-center mt-4'>
            
            <Web3Button
                contractAddress={props.stakeContractAddress} 
                action={(contract) => console.log(contract)} // Logic to execute when clicked
                onSuccess={(result) => alert("Success!")}
                >
                Execute Action
            </Web3Button>

            {/* <Web3Button 
                contractAddress={props.stakeContractAddress} 
                
                action={async (contract) => {
                    await contract.call("claimRewards");
                }}
                
                >
                Claim
            </Web3Button> */}
            </div>
        </div>
    )
}