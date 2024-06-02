import { useDataContext } from "@/context/DataContext";
import OutputText from "@/utils/OutputText";
import { IconAlignBoxLeftMiddle } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

export default function ResultContainer() {
  const { res, clearRes } = useDataContext();
  return (
    <motion.div
      className="bg-[#1e1e1e] w-full h-card rounded-lg flex flex-col items-start justify-start overflow-hidden mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.75, duration: 1 }}
    >
      <div className="w-full bg-[#222222] h-14 rounded-t-lg flex items-center justify-between px-5">
        <div className="flex items-center gap-2 font-medium">
          <IconAlignBoxLeftMiddle />
          <span>Output</span>
        </div>
        <div className="flex items-center gap-4">
          {res.output !== "" && (
            <span
              className="text-[#fff] underline cursor-pointer"
              onClick={clearRes}
            >
              Clear
            </span>
          )}
          <span className="text-[#a3a3a3]">Console</span>
        </div>
      </div>
      <div className="w-full h-full mt-2 pl-5 rounded-b-lg overflow-auto">
        <span className="font-mono">
          <OutputText res={res} />
        </span>
      </div>
    </motion.div>
  );
}
