
state = null;

document.addEventListener('keydown', handle_key)
document.addEventListener('mousedown', handle_click)
document.addEventListener('mousemove', handle_move)
document.addEventListener('mouseup', handle_up)

function handle_click(event)
{
    current_object = new CodeDemo(event.x, event.y);
    state = "create";
}

function handle_move(event)
{
    if (state == "create")
    {
        current_object.adjust_dimensions(event.x, event.y);
    }
}

function handle_up(event)
{
    console.log("mouseup")
    if (state == "create")
    {

        state = null;
    }
}

function handle_key(event)
{
    console.log(event.code);
    console.log(event.key);
    console.log(event.keyCode);
    let to_append = "";


    if (event.code == "Backspace")
    {
        current_object.process_deletion();
    }
    else if (event.code == "Enter")
    {
       current_object.process_enter();
    }
    else if (NOT_IMPLEMENTED.includes(event.code) )
    {
        console.log(event.code + " not implemented")
    }
    else if (event.code == "Tab")
    {
        event.preventDefault();
        current_object.process_tab();


    }
    else if (event.keyCode > 31)
    {

        current_object.process_character();
    }
    else
    {
        return;
    }
    current_object.update();


}



