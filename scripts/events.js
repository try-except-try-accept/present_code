
document.addEventListener('keydown', handle_key)



text_stack = "";
indent_depth = 0;
TAB = "&nbsp;&nbsp;&nbsp;&nbsp;";
NOT_IMPLEMENTED = ["Home", "End"];
KW_STYLE = '<span class="py_kw">';
BI_STYLE = '<span class="py_built">';
STR_STYLE = '<span class="py_str">';
BREAK = "<br>"
END_SPAN = "</span>"
SPECIAL_TERMS = [TAB, BREAK, END_SPAN]
cursor = 0; // to do - implement HOME / END

KEYWORDS = ["if", "elif", "else", "for", "def", "while", "break", "continue", "try", "except", "and", "or", "not"]
BUILTINS = ["abs", "aiter", "all", "any", "anext", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"]

tokens = [""];
styles = []

TOKEN_ENDERS = [" ", "[", ",", "]", "(", ")", "{", "}", ":"];

in_string_sing = false;
in_string_doub = false;

function add_token(token)
{
    tokens.push(token);
    styles.push(null);
}

function is_string(data)
{
    if (data[0] == "'" && "'" == data[data.length-1])
    {
        return true;
    }
    else if (data[0] == '"' && '"' == data[data.length-1])
    {
        return true;
    }
    else
    {
        return false;
    }
}

function process_deletion()
{

        last_token = tokens[tokens.length-1];

        while (last_token == "")
        {
            tokens.pop()
            styles.pop()
            last_token = tokens[tokens.length-1];
        }
        let deletion_complete = false;
        for (term of SPECIAL_TERMS)
        {
            if (last_token == term)
            {
                tokens.pop();
                styles.pop()
                deletion_complete = true;
                if (term == TAB)
                {
                    indent_depth--;
                }
            }
        }

        if (!deletion_complete)
        {
            let rem = tokens.pop();
            styles.pop();
            if (rem !== undefined && rem.length > 0)
            {
                tokens.push(last_token.slice(0, last_token.length-1));
                styles.push(null);
            }
        }
}

function mark_up_tokens()
{
    let out_string = ""
    for (var i=0; i<tokens.length; i++)
    {
        if (styles[i] !== null)
        {
            out_string += styles[i];
        }
        out_string += tokens[i];
        if (styles[i] !== null)
        {
            out_string += "</span>";
        }
    }
    return out_string;
}


function handle_key(event)
{
    console.log(event.code);
    console.log(event.key);
    console.log(event.keyCode);
    let to_append = "";


    if (event.code == "Backspace")
    {

        process_deletion();



    }
    else if (event.code == "Enter")
    {
        text_stack += BREAK;
        add_token(BREAK);
        add_token("");

        if (indent_depth > 0)
        {
            for (let i=0; i<indent_depth; i++)
            {
                add_token(TAB);
                add_token("");
            }
        }
    }
    else if (NOT_IMPLEMENTED.includes(event.code) )
    {
        console.log(event.code + " not implemented")
    }
    else if (event.code == "Tab")
    {
        event.preventDefault();

        add_token(TAB);
        add_token("");
        indent_depth++;
    }
    else if (event.keyCode > 31)
    {

        let new_char = event.key

        let delim_found = false;
        if (TOKEN_ENDERS.includes(new_char))
        {
            delim_found = true;
        }

        let pos = 1;


        if (new_char == " " && (in_string_sing || in_string_doub))
        {
            delim_found = false;
        }


        if (new_char == "'")
        {
            in_string_sing = !in_string_sing
        }
        if (new_char == '"')
        {
            in_string_doub = !in_string_doub
        }

        console.log("in string doub is " + in_string_doub)
        console.log("in string sing is " + in_string_sing)


        if (delim_found)
        {
            add_token("");
        }

        tokens[tokens.length-1] += new_char;

        if (delim_found)
        {
            add_token("");
        }

    }

    syntax_highlight();

    let out_string = mark_up_tokens();

    document.querySelector("#test_display").innerHTML = out_string;
}


function syntax_highlight()
{

    for (let i=0; i<tokens.length; i++)
    {
        token = tokens[i].replace(KW_STYLE, "").replace(BI_STYLE, "").replace(END_SPAN, "")
        if (KEYWORDS.includes(token))
        {
            if (tokens[i].indexOf(KW_STYLE) == -1)
            {
               styles[i] = KW_STYLE;
            }
        }
        else if (BUILTINS.includes(token))
        {
            if (tokens[i].indexOf(BI_STYLE) == -1)
            {
                styles[i] = BI_STYLE;
            }

        }
        else if (is_string(tokens[i]))
        {
            styles[i] = STR_STYLE;
        }
        else
        {
            styles[i] = null;
        }
    }

    console.log(tokens);
    console.log(styles);

}
