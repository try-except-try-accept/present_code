

function execute(code)
{
    let result = pyodide.runPython(code);
    document.getElementById("shell").innerHTML = result;
}

async function main()
{
  pyodide = await loadPyodide();
  execute(`lines = []
def print(*s, sep=" ", end="\\n"):
    lines.append(sep.join(str(i) for i in s) + end)
    return "<br>".join(lines)`);
}