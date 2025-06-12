import { motion } from "framer-motion";

function Error({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.3,
      }}
      className="relative z-1000 text-[#ffffff] bg-[#ff2a2a] rounded-md p-5 m-3"
    >
      {children}
    </motion.div>
  );
}

export default Error;
