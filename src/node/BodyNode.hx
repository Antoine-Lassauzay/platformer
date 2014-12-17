package node;

import component.Velocity;
import component.Position;
import component.Box;

import ash.core.Node;

class BodyNode extends Node<BodyNode>
{
    public var velocity : Velocity;
    public var box : Box;
    public var position : Position;
}
