"use client";

import React, { useState, useEffect } from "react";
import {
  IconCloudShare,
  IconCode,
  IconHistory,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { motion } from "framer-motion";
import { useDataContext } from "@/context/DataContext";
import HistoryModal from "../HistoryModal/HistoryModal";

export default function Header() {
  const { testCode, submitCode, running, getHistory, history } =
    useDataContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHistoryClick = () => {
    getHistory(10);
    setIsModalOpen(true);
  };

  return (
    <motion.div
      className="flex items-center justify-between w-full p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.5 }}
    >
      <CustomTooltip content="KaziCode" direction="right">
        <div className="bg-[#222222] rounded-md p-2 cursor-pointer border border-[#222222] hover:border hover:border-[#29C244] transition ease-in-out duration-400">
          <IconCode className="text-[#29C244]" size={20} />
        </div>
      </CustomTooltip>
      <div className="flex items-center justify-center">
        <div
          className={`flex items-center justify-center bg-[var(--buttonBg)] p-1.5 px-4 ${
            running ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } text-[var(--textColor)] gap-2 rounded-l-md border-r border-solid border-[var(--background)] text-base transition-all duration-200 ease-in-out hover:bg-[#333333]`}
          onClick={running ? undefined : testCode}
        >
          <IconPlayerPlayFilled size={18} />
          <span>Test</span>
        </div>
        <div
          className={`flex items-center justify-center bg-[var(--buttonBg)] p-1.5 px-4 ${
            running ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          } text-[#29C244] gap-2 rounded-r-md border-l border-solid border-[var(--background)] text-base transition-all duration-200 ease-in-out hover:bg-[#333333]`}
          onClick={running ? undefined : submitCode}
        >
          <IconCloudShare size={18} />
          <span>Submit</span>
        </div>
      </div>
      <CustomTooltip content="History" direction="left">
        <div
          className="bg-[#222222] rounded-md p-2 cursor-pointer border border-[#222222] hover:border hover:border-[#fff] transition ease-in-out duration-400"
          onClick={handleHistoryClick}
        >
          <IconHistory className="text-[#fff]" size={20} />
        </div>
      </CustomTooltip>
      <HistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        history={history}
      />
    </motion.div>
  );
}
