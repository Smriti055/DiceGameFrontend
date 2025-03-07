import { motion } from "framer-motion";

const BetButton = ({ onBet }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className="bg-green-500 text-black px-6 py-3 rounded-lg font-bold transition-all"
      onClick={onBet}
    >
      Place Bet
    </motion.button>
  );
};

export default BetButton;
