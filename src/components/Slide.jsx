const Slide = ({ rollOver = 50, setRollOver = () => {} }) => {
    return (
      <div className="w-[100%] max-w-screen-lg mx-auto">
        {/* Range Markers */}
        <div className="flex justify-between text-sm mb-2 px-4">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>
  
        {/* Main Slider Container (Wider) */}
        <div className="p-8 bg-gray-800 text-white w-full rounded-3xl">
          {/* Slider Box */}
          <div className="bg-black w-full p-4 rounded-3xl">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={rollOver}
              onChange={(e) => setRollOver(Number(e.target.value))}
              className="w-full h-6 rounded-lg appearance-none bg-gradient-to-r from-red-500 to-green-500 outline-none cursor-pointer transition-all"
              style={{
                accentColor: "#ffffff", // For browsers that support it
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Slide;
  