package component;

import pixi.display.DisplayObject;
import pixi.display.DisplayObjectContainer;
import pixi.geom.Point;

class Display
{
    var _displayObject : DisplayObject;

    public var scaleX(get_scaleX, set_scaleX) : Float;

    public function new(displayObject : DisplayObject)
    {
        _displayObject = displayObject;
    }

    public function addTo(parent : DisplayObjectContainer)
    {
        parent.addChild(_displayObject);
    }

    public function setTo(position : Position)
    {
        _displayObject.x = position.x;
        _displayObject.y = position.y;
    }

    function set_scaleX(v : Float) : Float
    {
        _displayObject.scale.x = v;
        return v;
    }

    function get_scaleX() : Float
    {
        return _displayObject.scale.x;
    }

}
