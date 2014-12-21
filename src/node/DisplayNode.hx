package node;

import component.Display;
import component.Position;
import component.Velocity;
import component.Oriented;

import ash.core.Node;

class DisplayNode extends Node<DisplayNode>
{
    public var display : Display;
    public var position : Position;
    @optional public var orientation : Oriented;
}
