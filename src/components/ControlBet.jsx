import { useState } from "react";

const ControlBet = ({ betAmount, setBetAmount, multiplier, setMultiplier }) => {
    const [profit, setProfit] = useState((betAmount * multiplier - betAmount).toFixed(2));
    

    // Handle Profit Change
    const handleProfitChange = (e) => {
        const newProfit = Number(e.target.value);
        setProfit(newProfit);

        // Calculate new multiplier based on profit
        if (betAmount > 0) {
            const newMultiplier = (newProfit + betAmount) / betAmount;
            setMultiplier(parseFloat(newMultiplier.toFixed(2)));
        }
    };

    return (
        <div className="p-4 bg-gray-800 rounded-lg text-white">
            {/* Bet Amount */}
            <div className="flex justify-between items-center p-3 gap-2">
                <span className='text-gray-400 font-bold'>Bet Amount</span>
                <span className='text-gray-400 font-bold'>₹ {betAmount.toFixed(2)}</span>
            </div>

            {/* Bet Input & Controls */}
            <div className="flex w-full">
                <input
                    type="number"
                    className="w-full p-2 bg-gray-900 text-white rounded-l pl-3"
                    value={betAmount}
                    onChange={(e) => setBetAmount(Number(e.target.value))}
                />
                <div className='bg-gray-900 p-2'>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-black font-bold">
                        ₹
                    </span>
                </div>
                <div className='bg-gray-600 flex'>
                    <button
                        onClick={() => setBetAmount(betAmount / 2)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-r border-l border-gray-600"
                    >
                        ½
                    </button>
                    <div className="w-[2px] h-10 bg-black"></div>
                    <button
                        onClick={() => setBetAmount(betAmount * 2)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded-r border-l border-gray-600"
                    >
                        2x
                    </button>
                </div>
            </div>

            {/* Profit Input */}
        
           
            <div className="flex justify-between items-center p-3 gap-2">
                <span className='text-gray-400 font-bold'>Profit on Win</span>
                <span className='text-gray-400 font-bold'>₹ {Number(profit).toFixed(2)}</span>
            </div>
            
                <div className="flex full">
                    <input
                        type="number"
                         className="w-full p-2 bg-gray-900 text-white rounded-l pl-3"
                        value={profit}
                        onChange={handleProfitChange}
                    />
                   <div className='bg-gray-900 p-2'>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-black font-bold">
                        ₹
                    </span>
                </div>
                </div>
                </div>
            
      
    );
};

export default ControlBet;
