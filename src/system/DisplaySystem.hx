package system;

import pixi.display.Stage;
import ash.tools.ListIteratingSystem;

import node.DisplayNode;

class DisplaySystem extends ListIteratingSystem<DisplayNode>
{
    var _stage : Stage;

    public function new(stage : Stage)
    {
        super(DisplayNode, updateNode, nodeAdded);

        _stage = stage;
    }

    function updateNode(node : DisplayNode, time : Float):Void
    {
        node.display.setTo(node.position);
    }

    function nodeAdded(node : DisplayNode):Void
    {
        trace(node);
        node.display.addTo(_stage);
    }
}
