package component;

import pixi.display.DisplayObject;
import pixi.display.DisplayObjectContainer;

import component.Position;

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

    public function setTo(position : Position) : Bool
    {
        var updated = false;
        if(position.x != _displayObject.x)
        {
            _displayObject.x = position.x;
            updated = true;
        }

        if(position.y != _displayObject.y)
        {
            _displayObject.y = position.y;
            updated = true;
        }

        return updated;
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
