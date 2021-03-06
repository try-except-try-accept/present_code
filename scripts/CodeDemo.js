

class CodeDemo
{
    constructor(x, y)
    {
        this.x1 = x;
        this.y1 = y;
        this.x2 = x;
        this.y2 = y;

        this.indent_depth = 0;
        this.tokens = [""];
        this.styles = [];
        this.in_string_sing = false;
        this.in_string_doub = false;

        this.display = document.createElement("code");
        document.getElementsByTagName("body")[0].appendChild(this.display);
        this.display.style['position'] = 'fixed';
        this.display.style['top'] = y;
        this.display.style['left'] = x;
        this.display.style.fontSize = "20px";
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
        this.tokens[this.tokens.length-1] += new_char;
    }

    adjust_dimensions(new_x, new_y)
    {
        this.x2 = new_x;
        this.y2 = new_y;

        this.display.style['width'] =  new_x - this.x1;
        this.display.style['height'] = new_y - this.y1;
    }
    adjust_location(new_x, new_y)
    {
        this.x1 = new_x - this.selection_offset[0];
        this.y1 = new_y - this.selection_offset[1];
        this.x2 = this.x1 + this.display.style['width'];
        this.y2 = this.y1 + this.display.style['height'];
        this.display.style['left'] =  this.x1;
        this.display.style['top'] = this.y1;
        console.log(`new loc ${this.x1} ${this.y1}`)
    }

    select(x, y)
    {
        console.log("select")
        this.selection_offset = [x - this.x1, y - this.y1];
        this.display.style['borderColor'] = "yellow";
    }
    deselect()
    {
        this.display.style['borderColor'] = 'grey';
    }

    adjust_font_size()
    {
        console.log("decreasing font size");
        let size = parseInt(this.display.style.fontSize.replace("px", ""));


        size -= 1;

        this.display.style.fontSize = size.toString() + "px";
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

    process_execute()
    {

        let tab_fix = new RegExp(TAB, "g");
        let break_fix = new RegExp(BREAK, "g");
        let tok_string = this.tokens.join('').replace(tab_fix, "\t").replace(break_fix, "\n");
        console.log(tok_string);
        execute(tok_string);
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
            if (!this.in_string_sing && !this.in_string_doub)
            {
                delim_found = true;
            }
        }

        let pos = 1;


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

        if (is_overflown(this.display))
        {
            this.adjust_font_size();
        }



    }

    highlight_syntax()
    {
        let def_found = false;
        for (let i=0; i<this.tokens.length; i++)
        {
            let token = this.tokens[i].replace(KW_STYLE, "").replace(BI_STYLE, "").replace(END_SPAN, "");


            if (def_found && token.trim().length > 0 )
            {
                console.log("hi lite func name");
                if (this.tokens[i].indexOf(SUB_STYLE) == -1)
                {
                    this.styles[i] = SUB_STYLE;
                    def_found = false;
                }
            }
            else if (KEYWORDS.includes(token))
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

            if (token == "def")
            {
                def_found = true;
                console.log("def found");
            }
        }

        console.log(this.tokens);
        console.log(this.styles);

    }


    update()
    {
        this.highlight_syntax();
        let out_string = this.markup;
        this.display.innerHTML = out_string;
    }


}





