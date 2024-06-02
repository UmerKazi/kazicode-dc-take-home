import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from "react";

interface CodeExecution {
  id: number;
  code: string;
  output: string;
  status: string;
}

interface DataContextType {
  data: string;
  res: { output: string; error: string };
  clearRes: () => void;
  setData: (data: string) => void;
  running: boolean;
  statusMessage: string;
  testCode: () => void;
  submitCode: () => void;
  getHistory: (limit: number) => void;
  history: CodeExecution[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<string>("print('Hello World!')");
  const [res, setRes] = useState<{ output: string; error: string }>({
    output: "",
    error: "",
  });
  const [running, setRunning] = useState<boolean>(false);
  const [history, setHistory] = useState<CodeExecution[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>("");

  const testCode = useCallback(async () => {
    setRunning(true);
    try {
      const response = await fetch("http://localhost:8000/testCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: data }),
      });
      const result = await response.json();
      setRes(result);
      if (result.error) {
        setStatusMessage("Execution failed!");
      } else {
        setStatusMessage("Code executed successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Execution failed!");
    } finally {
      setRunning(false);
    }
  }, [data, setStatusMessage]);

  const submitCode = useCallback(async () => {
    setRunning(true);
    try {
      const response = await fetch("http://localhost:8000/submitCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: data }),
      });
      const result = await response.json();
      if (result.status === "error") {
        setRes({ output: result.output, error: result.output });
      } else {
        setRes({ output: result.output, error: "" });
      }
      if (result.status === "error") {
        setStatusMessage("Submission failed!");
      } else {
        setStatusMessage("Code submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("Submission failed!");
    } finally {
      setRunning(false);
    }
  }, [data, setStatusMessage]);

  const getHistory = useCallback(async (limit: number) => {
    setRunning(true);
    try {
      const response = await fetch(
        `http://localhost:8000/history?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setHistory(result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setRunning(false);
    }
  }, []);

  const clearRes = useCallback(() => {
    setRes({ output: "", error: "" });
    setStatusMessage("");
  }, []);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      testCode,
      submitCode,
      running,
      res,
      clearRes,
      getHistory,
      history,
      statusMessage,
    }),
    [
      data,
      testCode,
      submitCode,
      running,
      res,
      clearRes,
      getHistory,
      history,
      statusMessage,
    ]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
