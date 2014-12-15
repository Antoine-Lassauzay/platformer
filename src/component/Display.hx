package component;

import pixi.display.DisplayObject;
import pixi.display.DisplayObjectContainer;

class Display
{
    var _displayObject : DisplayObject;

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

}
