import React from 'react'

function Bottom({ multiplier, setMultiplier, winChance, setWinChance }) {
  return (
    <div>
        <div className="w-full bg-gray-700 p-6 rounded-lg mt-60 scroll-px-1.5">
          <div className="flex justify-between w-full">
            {/* Multiplier */}
            <div className="bg-black p-4 rounded-lg flex flex-col items-center w-1/3">
              <span>Multiplier</span>
              <input 
                type="number" 
                value={multiplier} 
                onChange={(e) => setMultiplier(parseFloat(e.target.value))} 
                className="bg-transparent border-b border-gray-500 outline-none text-center w-16"
              />
            </div>

            {/* Roll Over */}
            <div className="bg-black p-4 rounded-lg flex flex-col items-center w-1/3">
              <span>Roll Over</span>
              <input 
                type="number" 
                value={winChance} 
                onChange={(e) => setWinChance(parseFloat(e.target.value))} 
                className="bg-transparent border-b border-gray-500 outline-none text-center w-16"
              />
            </div>

            {/* Win Chance */}
            <div className="bg-black p-4 rounded-lg flex flex-col items-center w-1/2">
              <span>Win Chance</span>
              <input 
                type="number" 
                value={(100 - winChance).toFixed(2)} 
                disabled 
                className="bg-transparent border-b border-gray-500 outline-none text-center w-16"
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Bottom