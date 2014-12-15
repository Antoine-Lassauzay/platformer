package node;

import component.KeyboardControlled;
import component.Position;

import ash.core.Node;

class KeyboardControlNode extends Node<KeyboardControlNode>
{
    public var keyboardControlled : KeyboardControlled;
    public var position : Position;

    public function new() { }
}
