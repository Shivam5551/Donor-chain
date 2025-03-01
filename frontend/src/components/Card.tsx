import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
}
export function Card({ children, className }: CardProps) {
    return (
      <motion.div 
        className={`bg-white rounded-2xl p-4 shadow-md ${className || ""}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }
  
  export function CardContent({ children, className }: CardProps) {
    return <div className={`p-4 ${className || ""}`}>{children}</div>;
  }
  