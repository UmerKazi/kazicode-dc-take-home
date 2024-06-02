import sys
import io
import signal
import psutil
import time
import threading
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class CodeData(BaseModel):
    code: str

class TimeoutException(Exception):
    pass

class MemoryExceededException(Exception):
    pass

def timeout_handler(signum, frame):
    raise TimeoutException("Code execution timed out.")

def safe_imports(name, globals={}, locals={}, fromlist=(), level=0):
    if name in {"os", "sys", "subprocess", "shutil", "socket", "requests"}:
        raise ImportError(f"Import of '{name}' is not allowed")
    return __import__(name, globals, locals, fromlist, level)

restricted_builtins = {
    "None": None,
    "False": False,
    "True": True,
    "abs": abs,
    "all": all,
    "any": any,
    "ascii": ascii,
    "bin": bin,
    "bool": bool,
    "bytearray": bytearray,
    "bytes": bytes,
    "callable": callable,
    "chr": chr,
    "classmethod": classmethod,
    "compile": compile,
    "complex": complex,
    "delattr": delattr,
    "dict": dict,
    "dir": dir,
    "divmod": divmod,
    "enumerate": enumerate,
    "filter": filter,
    "float": float,
    "format": format,
    "frozenset": frozenset,
    "getattr": getattr,
    "globals": globals,
    "hasattr": hasattr,
    "hash": hash,
    "help": help,
    "hex": hex,
    "id": id,
    "int": int,
    "isinstance": isinstance,
    "issubclass": issubclass,
    "iter": iter,
    "len": len,
    "list": list,
    "locals": locals,
    "map": map,
    "max": max,
    "memoryview": memoryview,
    "min": min,
    "next": next,
    "object": object,
    "oct": oct,
    "ord": ord,
    "pow": pow,
    "print": print,
    "property": property,
    "range": range,
    "repr": repr,
    "reversed": reversed,
    "round": round,
    "set": set,
    "setattr": setattr,
    "slice": slice,
    "sorted": sorted,
    "staticmethod": staticmethod,
    "str": str,
    "sum": sum,
    "super": super,
    "tuple": tuple,
    "type": type,
    "vars": vars,
    "zip": zip,
    "eval": lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("eval is not allowed")),
    "exec": lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("exec is not allowed")),
    "open": lambda *args, **kwargs: (_ for _ in ()).throw(RuntimeError("open is not allowed")),
    "__import__": safe_imports,
}

def memory_monitor(threshold_mb, interval_sec=0.1):
    while True:
        mem = psutil.virtual_memory()
        if mem.available < threshold_mb * 1024 * 1024:
            raise MemoryExceededException("Memory limit exceeded.")
        time.sleep(interval_sec)

def execute_code(data: CodeData):
    sys.stdout = io.StringIO()
    error = None

    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(5)

    memory_threshold_mb = 256
    memory_thread = threading.Thread(target=memory_monitor, args=(memory_threshold_mb,), daemon=True)
    memory_thread.start()

    try:
        local_scope = {
            "__builtins__": restricted_builtins,
            "pandas": safe_imports("pandas"),
            "scipy": safe_imports("scipy"),
        }

        try:
            exec(data.code, {"__builtins__": restricted_builtins}, local_scope)
            output = sys.stdout.getvalue()
        except TimeoutException as e:
            output = None
            error = str(e)
        except ImportError as e:
            output = None
            error = str(e)
        except MemoryExceededException as e:
            output = None
            error = str(e)
        except MemoryError as e:
            output = None
            error = "Memory limit exceeded."
        except Exception as e:
            output = None
            error = str(e)
    finally:
        signal.alarm(0)
        sys.stdout = sys.__stdout__

    return {"output": output, "error": error}

@app.post("/")
async def run_code(data: CodeData):
    result = execute_code(data)
    return result
