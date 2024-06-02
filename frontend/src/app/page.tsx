"use client";

import CodeEditor from "@/components/CodeEditor/CodeEditor";
import ResultContainer from "@/components/ResultContainer/ResultContainer";

export default function Home() {
  return (
    <div className="flex items-center justify-start w-screen h-full-header p-5 overflow-hidden flex-col -mt-4">
      <CodeEditor />
      <ResultContainer />
    </div>
  );
}
