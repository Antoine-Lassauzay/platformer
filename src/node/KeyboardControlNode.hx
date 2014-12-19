package node;

import component.KeyboardControlled;
import component.Velocity;
import component.Movement;
import component.Position;

import ash.core.Node;

class KeyboardControlNode extends Node<KeyboardControlNode>
{
    public var keyboardControlled : KeyboardControlled;
    public var velocity : Velocity;
    public var position : Position;
    @optional public var movement : Movement;

    public function new() { }
}
