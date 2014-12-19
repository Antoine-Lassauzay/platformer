package system;

import ash.tools.ListIteratingSystem;
import node.BodyNode;

import component.Oriented;
import component.Movement;

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
            if(node.orientation != null)
            {
                if (vel.xAxis < 0 && node.orientation.value == Right)
                    node.orientation.value = Left;
                else if (vel.xAxis > 0 && node.orientation.value == Left)
                    node.orientation.value = Right;
            }
            node.position.x += Std.int(vel.xAxis);

            if(node.position.downToGround)
                vel.xAxis *= .9;
        }
        else
        {
            vel.xAxis = 0;
        }

        var maxY = _world.height - node.box.height;
        var groundDistance = maxY - node.position.y;

        if(groundDistance > 0.01 || vel.yAxis > 0)
        {
            node.position.y -= Std.int(vel.yAxis);
            if (node.position.y > maxY)
                node.position.y = maxY;
            vel.yAxis -= 1;
            if(node.position.downToGround)
                node.position.downToGround = false;
        }
        else
        {
            if(!node.position.downToGround)
            {
                node.position.downToGround = true;
                vel.yAxis = 0;
            }
        }
    }
}
