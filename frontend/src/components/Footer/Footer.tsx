"use client";

import { useDataContext } from "@/context/DataContext";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const { statusMessage } = useDataContext();
  return (
    <motion.div
      className="flex align-center justify-between w-full text-[#fff] -mt-9 px-5 text-xs font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex align-center justify-start w-1/2">
        Created By{" "}
        <a
          href="https://kazi.cc/"
          target="_blank"
          className="underline ml-2 hover:text-[#29C244] transition-all duration-200 ease-in-out"
        >
          Umer Kazi
        </a>
      </div>
      <div className="flex align-center justify-end w-1/2">
        Console Status: {statusMessage === "" ? "Ready" : statusMessage}
      </div>
    </motion.div>
  );
}
