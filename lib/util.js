function addListener(event, obj, fn) {
    if (obj.addEventListener)
    {
        obj.addEventListener(event, fn, false);
    }
    else
    {
        obj.attachEvent("on" + event, fn);
    }
}