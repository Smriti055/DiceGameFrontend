import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Roll = ({ roll }) => {
  const [key, setKey] = useState(0);

  // Update key to restart animation whenever roll changes
  useEffect(() => {
    if (roll !== null) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [roll]);

  return (
    <motion.div
      key={key} // Changes when roll updates, restarting animation
      initial={{ rotate: 0 }}
      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
      transition={{ duration: 0.5, repeat: 2 }}
      className="text-6xl"
    >
      🎲 {roll}
    </motion.div>
  );
};

export default Roll;
