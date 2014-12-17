package system;

import ash.tools.ListIteratingSystem;
import node.BodyNode;

typedef WorldBounds = {width: Int, height : Int};

class PhysicsSystem extends ListIteratingSystem<BodyNode>
{
    var _world : WorldBounds;

    public function new(world : WorldBounds)
    {
        super(BodyNode, updateNode);

        _world = world;
    }

    function updateNode(node : BodyNode, time : Float)
    {
        var vel = node.velocity;
        if(-0.01 > vel.xAxis || vel.xAxis > 0.01)
        {
            node.position.x += Std.int(vel.xAxis);
            vel.xAxis *= .9;
        }
        var maxY = _world.height - node.box.height;
        var groundDistance = maxY - node.position.y;

        if(groundDistance > 0.01 || vel.yAxis > 0)
        {
            node.position.y -= Std.int(vel.yAxis);
            if (node.position.y > maxY)
                node.position.y = maxY;
            vel.yAxis -= 1;
        }
        else
        {
            vel.yAxis = 0;
        }
    }
}
