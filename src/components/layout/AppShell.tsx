import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import type { PropsWithChildren } from "react";
import { Header } from "./Header";

export function AppShell({ children }: PropsWithChildren) {
  const location = useLocation();
  return (
    <div className="min-h-screen text-pu3nte-text">
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
