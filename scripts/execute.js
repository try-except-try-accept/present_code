

function execute(code)
{
    let result = pyodide.runPython(code);
    document.getElementById("shell").innerHTML = result;
}

async function main()
{
  pyodide = await loadPyodide();
  execute(`output = []
def print(*s, sep=" ", end="\\n"):
    global output
    output.append(sep.join(str(i) for i in s) + end)
    return "<br>".join(output)`);
}