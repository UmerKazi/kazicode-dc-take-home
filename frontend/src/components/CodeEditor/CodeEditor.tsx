import { IconBrandCodesandbox } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { useDataContext } from "@/context/DataContext";

export default function CodeEditor() {
  const { data, setData } = useDataContext();
  const onChange = React.useCallback(
    (val: string) => {
      setData(val);
    },
    [setData]
  );
  return (
    <motion.div
      className="bg-[#1e1e1e] w-full h-card rounded-lg flex flex-col items-start justify-start overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.75, duration: 1 }}
    >
      <div className="w-full bg-[#222222] h-14 rounded-t-lg flex items-center justify-between px-5">
        <div className="flex items-center gap-2 font-medium">
          <IconBrandCodesandbox />
          <span>Code</span>
        </div>
        <span className="text-[#a3a3a3]">Python3</span>
      </div>
      <div className="w-full h-full mt-2 pl-5 rounded-b-lg overflow-auto">
        <CodeMirror
          value={data}
          theme={vscodeDark}
          height="75vh"
          extensions={[python()]}
          onChange={onChange}
        />
      </div>
    </motion.div>
  );
}
