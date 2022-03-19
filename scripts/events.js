


document.addEventListener('keydown', handle_key)



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



current_object = new CodeDemo(0, 0);