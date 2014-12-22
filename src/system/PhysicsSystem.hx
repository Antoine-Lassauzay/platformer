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
        var oldX = node.position.x;
        var oldY = node.position.y;
        var targetX = oldX;
        var targetY = oldY;

        if(vel != null)
        {
            if(-0.01 > vel.xAxis || vel.xAxis > 0.01)
            {
                if(node.orientation != null)
                {
                    if (vel.xAxis < 0 && node.orientation.value == Right)
                        node.orientation.value = Left;
                    else if (vel.xAxis > 0 && node.orientation.value == Left)
                        node.orientation.value = Right;
                }
                targetX = node.position.x + Std.int(vel.xAxis);

                if(node.position.downToGround)
                    vel.xAxis *= .9;
            }
            else
            {
                vel.xAxis = 0;
            }

            // gravity
            if(!node.position.downToGround)
                vel.yAxis -= 1;

            targetY = node.position.y - Std.int(vel.yAxis);

            if(oldY != targetY || oldX != targetX)
                node.position.downToGround = false;
        }

        var diffXLeft;
        var diffXRight;
        var diffYTop;
        var diffYBottom;

        if(targetX != oldX)
        {
            // first evaluate collisions for x axis
            for(otherNode in nodeList)
            {
                if(otherNode.entity.id != node.entity.id)
                {
                    diffXLeft = targetX + node.box.width - otherNode.position.x;
                    diffXRight = otherNode.position.x + otherNode.box.width - targetX;
                    diffYTop = oldY + node.box.height - otherNode.position.y;
                    diffYBottom = otherNode.position.y + otherNode.box.height - oldY;

                    var hCollide = null;
                    if(diffXLeft > 0 && diffXLeft <= otherNode.box.width)
                        hCollide = -diffXLeft;
                    else if(diffXRight > 0 && diffXRight <= otherNode.box.width)
                        hCollide = diffXRight;

                    var vCollide = null;
                    if(diffYTop > 0 && diffYTop <= otherNode.box.height)
                        vCollide = -diffYTop;
                    else if(diffYBottom > 0 && diffYBottom <= otherNode.box.height)
                        vCollide = diffYBottom;

                    if(hCollide != null && vCollide != null)
                    {
                        targetX = oldX;
                    }
                }
            }
            node.position.x = Std.int(Math.max(0, targetX));
        }

        if(oldY != targetY || node.position.downToGround)
        {
            for(otherNode in nodeList)
            {
                if(otherNode.entity.id != node.entity.id)
                {
                    diffXLeft = targetX + node.box.width - otherNode.position.x;
                    diffXRight = otherNode.position.x + otherNode.box.width - targetX;
                    diffYTop = targetY + node.box.height - otherNode.position.y;
                    diffYBottom = otherNode.position.y + otherNode.box.height - targetY;

                    var hCollide = null;
                    if(diffXLeft > 10 && diffXLeft <= otherNode.box.width - 10)
                        hCollide = -diffXLeft;
                    else if(diffXRight > 10 && diffXRight <= otherNode.box.width - 10)
                        hCollide = diffXRight;

                    var vCollide = null;
                    if(diffYTop > 10 && diffYTop <= otherNode.box.height)
                        vCollide = -diffYTop;
                    else if(diffYBottom > 10 && diffYBottom <= otherNode.box.height - 10)
                        vCollide = diffYBottom;

                    if(hCollide != null && vCollide != null)
                    {
                        targetY += vCollide;
                        // if collide from top
                        if(vCollide < 0)
                        {
                            node.position.downToGround = true;
                            vel.yAxis = 0;
                        }
                    }
                }
            }
            node.position.y = targetY;
        }
    }
}
