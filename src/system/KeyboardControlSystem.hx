package system;

import haxe.ds.EnumValueMap;
import js.html.DOMWindow;
import js.html.KeyboardEvent;

import ash.tools.ListIteratingSystem;

import node.KeyboardControlNode;

enum ArrowKey
{
    Left;
    Right;
    Up;
    Down;
}

class KeyboardControlSystem extends ListIteratingSystem<KeyboardControlNode>
{
    var _keysDown : EnumValueMap<ArrowKey, Bool>;

    public function new(window : DOMWindow)
    {
        super(KeyboardControlNode, updateNode);

        _keysDown = new EnumValueMap<ArrowKey,Bool>();

        window.onkeydown = onKeyDown;
        window.onkeyup = onKeyUp;
    }

    function onKeyDown(event : KeyboardEvent)
    {
        switch(event.keyIdentifier)
        {
            case "Up":
                _keysDown.set(Up, true);
            case "Down":
                _keysDown.set(Down, true);
            case "Left":
                _keysDown.set(Left, true);
            case "Right":
                _keysDown.set(Right, true);
        }
    }

    function onKeyUp(event : KeyboardEvent)
    {
        switch(event.keyIdentifier)
        {
            case "Up":
                _keysDown.set(Up, false);
            case "Down":
                _keysDown.set(Down, false);
            case "Left":
                _keysDown.set(Left, false);
            case "Right":
                _keysDown.set(Right, false);
        }
    }

    function updateNode(node : KeyboardControlNode, time : Float):Void
    {
        if(_keysDown.get(Right))
        {
            node.position.x += 1;
        }
        if(_keysDown.get(Left))
        {
            node.position.x -= 1;
        }
    }
}
