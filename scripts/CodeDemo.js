

class CodeDemo
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.indent_depth = 0;
        this.tokens = [""];
        this.styles = [];
        this.in_string_sing = false;
        this.in_string_doub = false;
    }

    get last_token()
    {
        // get top of token stack
        return this.tokens.slice(-1)[0]
    }



    get markup()
    {
        let out_string = ""
        for (var i=0; i<this.tokens.length; i++)
        {
            if (this.styles[i] !== null)
            {
                out_string += this.styles[i];
            }
            out_string += this.tokens[i];
            if (this.styles[i] !== null)
            {
                out_string += "</span>";
            }
        }
        return out_string;
    }

    set last_token(new_char)
    {
        this.tokens[this.tokens.length-1] += new_char
    }

    add_token(token)
    {
        // a token and null style to the stack
        this.tokens.push(token);
        this.styles.push(null);
    }



    process_enter()
    {
        // add line break to stack
        // maintain indentation as needed
        this.add_token(BREAK);
        this.add_token("");

        if (this.indent_depth > 0)
        {
            for (let i=0; i<this.indent_depth; i++)
            {
                this.add_token(TAB);
                this.add_token("");
            }
        }
    }

    process_tab()
    {
        this.add_token(TAB);
        this.add_token("");
        this.indent_depth++;
    }

    process_deletion()
    {
        // remove token / character from token
        let last_token = this.last_token;

        while (last_token == "")
        {
            this.tokens.pop()
            this.styles.pop()
            last_token = this.last_token;
        }
        let deletion_complete = false;
        for (let term of SPECIAL_TERMS)
        {
            if (last_token == term)
            {
                this.tokens.pop();
                this.styles.pop()
                deletion_complete = true;
                if (term == TAB)
                {
                    this.indent_depth--;
                }
            }
        }

        if (!deletion_complete)
        {
            let rem = this.tokens.pop();
            this.styles.pop();
            if (rem !== undefined && rem.length > 0)
            {
                this.tokens.push(last_token.slice(0, last_token.length-1));
                this.styles.push(null);
            }
        }
    }

    process_character()
    {
        let new_char = event.key

        let delim_found = false;
        if (TOKEN_ENDERS.includes(new_char))
        {
            delim_found = true;
        }

        let pos = 1;


        if (new_char == " " && (this.in_string_sing || this.in_string_doub))
        {
            delim_found = false;
        }


        if (new_char == "'")
        {
            this.in_string_sing = !this.in_string_sing
        }
        if (new_char == '"')
        {
            this.in_string_doub = !this.in_string_doub
        }

        console.log("in string doub is " + this.in_string_doub)
        console.log("in string sing is " + this.in_string_sing)


        if (delim_found)
        {
            this.add_token("");
        }

        this.last_token = new_char;

        if (delim_found)
        {
            this.add_token("");
        }

        



    }

    highlight_syntax()
    {
        for (let i=0; i<this.tokens.length; i++)
        {
            let token = this.tokens[i].replace(KW_STYLE, "").replace(BI_STYLE, "").replace(END_SPAN, "");
            if (KEYWORDS.includes(token))
            {
                if (this.tokens[i].indexOf(KW_STYLE) == -1)
                {
                   this.styles[i] = KW_STYLE;
                }
            }
            else if (BUILTINS.includes(token))
            {
                if (this.tokens[i].indexOf(BI_STYLE) == -1)
                {
                    this.styles[i] = BI_STYLE;
                }

            }
            else if (is_string(this.tokens[i]))
            {
                this.styles[i] = STR_STYLE;
            }
            else
            {
                this.styles[i] = null;
            }
        }

        console.log(this.tokens);
        console.log(this.styles);

    }


    update()
    {
        this.highlight_syntax();
        let out_string = this.markup;
        document.querySelector("#test_display").innerHTML = out_string;
    }


}





