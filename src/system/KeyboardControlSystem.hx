package system;

import haxe.ds.GenericStack;
import js.html.DOMWindow;
import js.html.KeyboardEvent;

import ash.tools.ListIteratingSystem;

import node.KeyboardControlNode;

enum ArrowKey
{
    Up;
    Down;
    Left;
    Right;
}

class KeyboardControlSystem extends ListIteratingSystem<KeyboardControlNode>
{
    // only the first key in the stack is used, i.e. the last key pressed
    var _keyStack : GenericStack<ArrowKey>;
    var _lockUp : Bool;

    public function new(window : DOMWindow)
    {
        super(KeyboardControlNode, updateNode);

        _keyStack = new GenericStack<ArrowKey>();

        window.onkeydown = onKeyDown;
        window.onkeyup = onKeyUp;
    }

    function onKeyDown(event : KeyboardEvent)
    {
        switch(event.keyIdentifier)
        {
            case "Up":
                _keyStack.remove(Up);
                _keyStack.add(Up);
            case "Down":
                _keyStack.remove(Down);
                _keyStack.add(Down);
            case "Left":
                _keyStack.remove(Left);
                _keyStack.add(Left);
            case "Right":
                _keyStack.remove(Right);
                _keyStack.add(Right);
        }
    }

    function onKeyUp(event : KeyboardEvent)
    {
        switch(event.keyIdentifier)
        {
            case "Up":
                _keyStack.remove(Up);
                _lockUp = false;
            case "Down":
                _keyStack.remove(Down);
            case "Left":
                _keyStack.remove(Left);
            case "Right":
                _keyStack.remove(Right);
        }
    }

    function updateNode(node : KeyboardControlNode, time : Float):Void
    {
        switch(_keyStack.first())
        {
            case Left:

                if(node.position.downToGround)
                {
                    if(node.movement!= null && node.movement.value != Walking)
                    node.movement.value = Walking;

                    node.velocity.xAxis--;
                }

            case Right:

                if(node.position.downToGround)
                {
                    if(node.movement!= null && node.movement.value != Walking)
                        node.movement.value = Walking;

                    node.velocity.xAxis++;
                }

            case Up:
                if(node.position.downToGround)
                {
                    if(node.movement!= null && node.movement.value != Jump)
                        node.movement.value = Jump;
                    var jumpHeight = 10 + Math.abs(node.velocity.xAxis) * .5;
                    node.velocity.yAxis = Std.int(Math.min(20, jumpHeight));
                }
            case Down:
                // node.velocity.yAxis--;
            case null:
                if(node.position.downToGround)
                {
                    if(node.movement!= null && node.movement.value != Still)
                        node.movement.value = Still;
                }
        }
    }
}
