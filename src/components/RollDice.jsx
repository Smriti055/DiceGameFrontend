import { useState, useEffect } from "react";
import axios from "axios";
import ControlBet from "./ControlBet";
import BetButton from "./BetButton";
import Slide from "./Slide";
import Roll from "./Roll";

const RollDice = () => {
  const [betAmount, setBetAmount] = useState(10);
  const [winChance, setWinChance] = useState(50);
  const [multiplier, setMultiplier] = useState(2.0);
  const [roll, setRoll] = useState(null);
  const [betMode, setBetMode] = useState("manual");
  const [resultMessage, setResultMessage] = useState("");
  const [rollOverHistory, setRollOverHistory] = useState([]);
  const [autoBetActive, setAutoBetActive] = useState(false);
  const [autoBetInterval, setAutoBetInterval] = useState(null);

  // Place Bet Function
  const backendUrl = 'https://DiceGame-1.onrender.com'; // Replace with your actual Render backend URL

  const placeBet = async () => {
    
    try {
      const response = await axios.post(`${backendUrl}/api/roll-dice`, { betAmount });
      const rollResult = response.data.roll;
      setRoll(rollResult);

      // ✅ Determine Win/Loss based on updated rollOver value
      if (rollResult >= 4) {
        setResultMessage("You Win! 🎉");
      } else {
        setResultMessage("You Lose! 😞");
      }

      // ✅ Update last 3 roll overs dynamically
      setRollOverHistory((prev) => {
        const newHistory = [winChance, ...prev.slice(0, 2)];
        return newHistory;
      });

    } catch (error) {
      alert("Error placing bet");
    }
  };

  // Auto Betting Function
  const startAutoBetting = () => {
    if (autoBetActive) return; // Prevent multiple intervals
    setAutoBetActive(true);

    // Set Interval for Auto Betting
    const interval = setInterval(() => {
      // ✅ Dynamically adjust winChance before every bet
      const newWinChance = Math.floor(Math.random() * 91) + 5; // Random between 5-95
      setWinChance(newWinChance);

      // ✅ Update rollOverHistory correctly
      setRollOverHistory((prev) => {
        const newHistory = [newWinChance, ...prev.slice(0, 2)];
        return newHistory;
      });

      // ✅ Auto set bet amount
      setBetAmount(20); 

      placeBet();
    }, 2000); // Betting every 2 seconds

    setAutoBetInterval(interval);
  };

  // Stop Auto Betting
  const stopAutoBetting = () => {
    if (autoBetInterval) {
      clearInterval(autoBetInterval);
      setAutoBetInterval(null);
    }
    setAutoBetActive(false);
  };

  // Handle Mode Switching (Manual <-> Auto)
  const toggleBetMode = (mode) => {
    setBetMode(mode);
    if (mode === "auto") {
      startAutoBetting();
    } else {
      stopAutoBetting();
    }
  };

  // Cleanup Auto Bet on Unmount
  useEffect(() => {
    return () => stopAutoBetting();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Main Game Section */}
      <div className="flex flex-grow">
        {/* Left Section - Bet Controls */}
        <div className="w-1/4 bg-gray-800 p-6 flex flex-col items-center fixed left-0 h-screen">
          <div className="flex gap-4 mb-4 bg-black w-full rounded-3xl p-3">
            <button 
              className={`px-4 py-2 ${betMode === "manual" ? "bg-gray-600 rounded-3xl" : "bg-black"}`}
              onClick={() => toggleBetMode("manual")}
            >
              Manual
            </button>
            <button 
              className={`px-4 py-2 ${betMode === "auto" ? "bg-gray-600 rounded-3xl" : "bg-black"}`}
              onClick={() => toggleBetMode("auto")}
            >
              Auto
            </button>
            {autoBetActive && (
              <button 
                className="px-4 py-2 bg-red-600 rounded-3xl"
                onClick={stopAutoBetting}
              >
                Stop
              </button>
            )}
          </div>

          {/* Bet Amount */}
          <ControlBet betAmount={betAmount} setBetAmount={setBetAmount} multiplier={multiplier} />

          {/* Bet Button */}
          <BetButton onBet={placeBet} />
        </div>

        {/* ✅ Roll Over History (Now correctly updates) */}
        <div className="absolute top-0 right-0 flex gap-3 p-4">
          {rollOverHistory.map((value, index) => (
            <div key={index} className="bg-green-500 text-black px-4 py-2 rounded-full font-bold">
              {value.toFixed(2)}
            </div>
          ))}
        </div>

        {/* Right Section - Game Area */}
        <div className="w-3/4 flex flex-col items-center justify-between p-2 ml-auto mr-0 mt-28 relative h-[calc(100vh-7rem)] overflow-hidden">
          {/* Slider Section */}
          <Slide rollOver={winChance} setRollOver={setWinChance} />

          {/* Roll result (Cube animation) */}
          <div className="flex flex-col items-center justify-center min-h-[60px] mt-8">
            {roll !== null && <Roll roll={roll} />}
            {resultMessage && (
              <div className={`mt-1 text-2xl font-bold ${resultMessage.includes("Win") ? "text-green-500" : "text-red-500"}`}>
                {resultMessage}
              </div>
            )}
          </div>

          {/* Bottom Section - Controls (Inside Right Side) */}
          <div className="w-full bg-gray-700 rounded-lg mt-10 flex flex-wrap justify-between px-10 py-1">
            {/* Multiplier */}
            <div>
              <span className="text-lg font-semibold">Multiplier</span>
              <div className="bg-black flex justify-between w-52 p-0.5 rounded-lg">
                <input 
                  type="number" 
                  value={multiplier} 
                  onChange={(e) => setMultiplier(parseFloat(e.target.value))} 
                  className="bg-transparent outline-none text-center text-lg w-28"
                />
                <button className="mr-2 font-bold">X</button>
              </div>
            </div>

            {/* Roll Over */}
            <div>
              <span className="text-lg font-semibold">Roll Over</span>
              <div className="bg-black flex justify-between w-52 p-0.5 rounded-lg">
                <input 
                  type="number" 
                  value={winChance} 
                  onChange={(e) => setWinChance(parseFloat(e.target.value))} 
                  className="bg-transparent outline-none text-center text-lg w-32"
                />
                <button className="font-bold mr-3">🔄</button>
              </div>
            </div>

            {/* Win Chance */}
            <div>
              <span className="text-lg font-semibold">Win Chance</span>
              <div className="bg-black flex justify-between w-52 p-0.5 rounded-lg">
                <input 
                  type="number" 
                  value={(100 - winChance).toFixed(2)} 
                  disabled 
                  className="bg-transparent outline-none text-center text-lg w-28"
                />
                <button className="font-bold mr-3">%</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollDice;
