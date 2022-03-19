TAB = "&nbsp;&nbsp;&nbsp;&nbsp;";
NOT_IMPLEMENTED = ["Home", "End"];
KW_STYLE = '<span class="py_kw">';
BI_STYLE = '<span class="py_built">';
STR_STYLE = '<span class="py_str">';
SUB_STYLE = '<span class="py_sub">';
BREAK = "<br>";
END_SPAN = "</span>";

KEYWORDS = ["match", "case", "assert", "raise", "class", "import", "from", "if", "elif", "else", "for", "def", "while", "break", "continue", "try", "except", "and", "or", "not"];
BUILTINS = ["abs", "aiter", "all", "any", "anext", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip",
"BaseException", "SystemExit", "KeyboardInterrupt", "GeneratorExit", "Exception", "StopIteration", "StopAsyncIteration", "ArithmeticError", "FloatingPointError", "OverflowError", "ZeroDivisionError", "AssertionError", "AttributeError", "BufferError", "EOFError", "ImportError", "ModuleNotFoundError", "LookupError", "IndexError", "KeyError", "MemoryError", "NameError", "UnboundLocalError", "OSError", "BlockingIOError", "ChildProcessError", "ConnectionError", "BrokenPipeError", "ConnectionAbortedError", "ConnectionRefusedError", "ConnectionResetError", "FileExistsError", "FileNotFoundError", "InterruptedError", "IsADirectoryError", "NotADirectoryError", "PermissionError", "ProcessLookupError", "TimeoutError", "ReferenceError", "RuntimeError", "NotImplementedError", "RecursionError", "SyntaxError", "IndentationError", "TabError", "SystemError", "TypeError", "ValueError", "UnicodeError", "UnicodeDecodeError", "UnicodeEncodeError", "UnicodeTranslateError", "Warning", "DeprecationWarning", "PendingDeprecationWarning", "RuntimeWarning", "SyntaxWarning", "UserWarning", "FutureWarning", "ImportWarning", "UnicodeWarning", "BytesWarning", "EncodingWarning", "ResourceWarning"];
TOKEN_ENDERS = [" ", "[", ",", "]", "(", ")", "{", "}", ":"];

SPECIAL_TERMS = [BREAK, TAB, END_SPAN]