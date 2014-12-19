package node;

import ash.core.Node;

import component.Movement;
import component.StatefulDisplay;

class CharacterNode extends Node<CharacterNode>
{
    public var movement : Movement;
    public var statefulDisplay : StatefulDisplay;
}

