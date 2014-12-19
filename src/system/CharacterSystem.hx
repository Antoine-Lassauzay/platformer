package system;

import ash.tools.ListIteratingSystem;

import node.CharacterNode;
import component.Movement;

class CharacterSystem extends ListIteratingSystem<CharacterNode>
{
    public function new()
    {
        super(CharacterNode, updateNode);
    }

    function updateNode(node : CharacterNode, time : Float)
    {
        if(node.movement.invalidated)
        {
            switch(node.movement.value)
            {
                case Still:
                    node.statefulDisplay.stop();

                case Walking:
                    node.statefulDisplay.walk();

                case Jump:
                    node.statefulDisplay.jump();
            }

            node.movement.validate();
        }
    }
}
