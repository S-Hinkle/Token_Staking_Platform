import React, { useState } from 'react';
import { Web3Button, useAddress, useContract, useContractRead, useTokenBalance } from "@thirdweb-dev/react";
import { ethers } from "ethers";


export default function StakeUnstake( props ) {
    const [activeTab, setActiveTab] = useState('Stake');
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        console.log(`Action: ${activeTab}, Amount: ${inputValue}`);
        // Implement your logic for staking or unstaking
    };

    //console.log(props.stakeTokenBalance?.displayValue)

    return (
        <div className="h-full rounded-md border-2 p-10 border-indigo-500/75">
            <div className="stat-value flex flex-col justify-center items-center">Stake/Unstake</div>
            <div className="stat-title flex flex-col justify-center items-center mb-4">Stake Sturgeon and earn Caviar</div>
            <div className="divider"></div>

            <div role="tablist" className="tabs tabs-boxed mb-4">
                <a role="tab" 
                   className={`tab ${activeTab === 'Stake' ? 'tab-active' : ''}`}
                   onClick={() => setActiveTab('Stake')}>
                    Stake
                </a>
                <a role="tab" 
                   className={`tab ${activeTab === 'Unstake' ? 'tab-active' : ''}`}
                   onClick={() => setActiveTab('Unstake')}>
                    Unstake
                </a>
            </div>

                  
            <input 
                type="number" 
                placeholder="0"
                className="input input-bordered w-full text-center" 
                value={inputValue} 
                onChange={handleInputChange} 
            />

            <div className='flex justify-center mt-4'>
                <Web3Button 
                    contractAddress={props.stakeContractAddress}
                    action={async (contract) => {
                        if (activeTab === 'Stake') {
                            await props.stakeTokenContract?.setAllowance(props.stakeContractAddress, inputValue);
                            await contract.call('stake', [ethers.utils.parseEther(inputValue)]);
                            props.resetStakeAndClaim();
                        }
                        if (activeTab === 'Unstake') {
                            await contract.call('withdraw', [ethers.utils.parseEther(inputValue)]);
                            props.resetStakeAndClaim();
                        }
                    }}
                    onSuccess={props.handleSuccess}
                    style={{
                                backgroundColor: '#6366f1', // Example background color
                                color: '#1f2937', // Text color
                                padding: '10px 20px', // Padding
                                borderRadius: '5px', // Border radius
                              }}
                    >
                        Submit
                </Web3Button>

                {props.showToast && activeTab === 'Stake' && (
                            <div className="toast toast-center toast-bottom">
                                <div className="alert alert-success">
                                    <span>Stake Approved</span>
                                </div>
                            </div>
                        )}
                {props.showToast && activeTab === 'unstake' && (
                            <div className="toast toast-center toast-bottom">
                                <div className="alert alert-success">
                                    <span>Unstake Approved</span>
                                </div>
                            </div>
                        )}
            </div>

        </div>
    );
}