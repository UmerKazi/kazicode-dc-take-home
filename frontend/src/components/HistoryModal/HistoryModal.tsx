import { IconHistory, IconX } from "@tabler/icons-react";
import React from "react";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: Array<{ id: number; code: string; output: string; status: string }>;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] w-3/4 h-3/4 rounded-lg flex flex-col items-start justify-start overflow-hidden relative">
        <div className="w-full bg-[#222222] h-14 rounded-t-lg flex items-center justify-between px-5">
          <div className="flex items-center gap-2 font-medium">
            <IconHistory />
            <span>Submission History</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#fff] cursor-pointer" onClick={onClose}>
              <IconX />
            </span>
          </div>
        </div>
        <div className="w-full h-full mt-4 pl-5 pr-5 rounded-b-lg overflow-auto">
          <ul className="space-y-4 mb-4">
            {history.map((item, idx) => (
              <li
                key={item.id}
                className={`pb-2 ${
                  idx !== history.length - 1 ? "border-b border-[#666666]" : ""
                }`}
              >
                <p className="text-[#a3a3a3]">
                  <strong className="text-xs">ID:</strong>{" "}
                  <span className="font-mono text-[#fff]">{item.id}</span>
                </p>
                <p className="text-[#a3a3a3]">
                  <strong className="text-xs">CODE:</strong>{" "}
                  <pre>
                    <span className="font-mono text-[#fff]">{item.code}</span>
                  </pre>
                </p>
                <p className="text-[#a3a3a3]">
                  <strong className="text-xs">OUTPUT:</strong>{" "}
                  <span className="font-mono text-[#fff]">{item.output}</span>
                </p>
                <p className="text-[#a3a3a3]">
                  <strong className="text-xs">STATUS:</strong>{" "}
                  <span
                    className={`font-mono ${
                      item.status === "success"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
