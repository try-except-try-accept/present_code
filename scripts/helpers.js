
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

function is_overflown(element)
{
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}