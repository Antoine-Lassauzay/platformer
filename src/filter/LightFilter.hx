package filter;

import haxe.Resource;

import pixi.filters.AbstractFilter;

class LightFilter extends AbstractFilter
{

    public function new()
    {
        super(Resource.getString("light.glsl").split("\n"));
    }

}