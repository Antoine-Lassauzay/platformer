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

        if(node.orientation != null)
            if (node.orientation.value == Right && node.display.scaleX < 0)
                node.display.scaleX = 1;
            else if (node.orientation.value == Left && node.display.scaleX > 0)
                node.display.scaleX = -1;
    }

    function nodeAdded(node : DisplayNode):Void
    {
        node.display.addTo(_stage);
    }
}
