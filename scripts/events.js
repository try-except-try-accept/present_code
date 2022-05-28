
state = null;

document.addEventListener('keydown', handle_key)
document.addEventListener('mousedown', handle_click)
document.addEventListener('mousemove', handle_move)
document.addEventListener('mouseup', handle_up)

key_map = {}

all_objects = []

function handle_click(event)
{
    let overlap = false;
    for (obj of all_objects)
    {
        console.log(all_objects.length, "objects")
        console.log(`check if ${event.x} ${event.y} click is near obj at ${obj.x1} ${obj.y1}`)
        if (event.x >= obj.x1 && event.x <= obj.x2)
        {
            if (event.y >= obj.y1 && event.y <= obj.y2)
            {
                state = "select";
                current_object = obj;
                current_object.select(event.x, event.y);
                overlap = true;
                break;
            }
        }
    }
    if (!overlap)
    {
        current_object = new CodeDemo(event.x, event.y);
        state = "create";
        all_objects.push(current_object);
    }
}

function handle_move(event)
{
    if (state == "create")
    {
        current_object.adjust_dimensions(event.x, event.y);
    }
    else if (state == "select")
    {
        console.log("moving whilst selected")
        current_object.adjust_location(event.x, event.y);
    }
}

function handle_up(event)
{
    console.log("mouseup")
    if (state == "create")
    {
        state = null;
    }
    else (state == "select")
    {
        current_object.deselect();
        state = null;
    }
}

function handle_key_up(event)
{
    key_map[event] = false;
}

function handle_key(event)
{
    key_map[event] = true;

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
    else if (event.code == "AltRight")
    {
       current_object.process_execute();
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



