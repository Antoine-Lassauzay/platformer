package data;

import haxe.ds.StringMap;
import haxe.ds.IntMap;

typedef TileSet = {firstgid : Int, source : String, tileWidth : Int, tileHeight : Int };
typedef TileObject = { x : Int, y : Int, gid : Int };

class Level
{
    public var width(default, null) : Int;
    public var height(default, null) : Int;

    var _source : Xml;
    var _groups : StringMap<Xml>;
    var _sets : IntMap<Xml>;

    public function new(source : Xml)
    {
        _source = source;
        _groups = new StringMap<Xml>();
        var mapNode = _source.elementsNamed('map').next();
        for (objectGroup in mapNode.elementsNamed('objectgroup'))
        {
            _groups.set(objectGroup.get('name'), objectGroup);
        }
        _sets = new IntMap<Xml>();
        for (tileSet in mapNode.elementsNamed('tileset'))
        {
            _sets.set(Std.parseInt(tileSet.get('firstgid')), tileSet);
        }
        width = Std.parseInt(mapNode.get('width')) * Std.parseInt(mapNode.get('tilewidth'));
        height = Std.parseInt(mapNode.get('height')) * Std.parseInt(mapNode.get('tileheight'));
    }

    public function getObjects(group : String) : Array<TileObject>
    {
        var objectGroup = _groups.get(group);

        if(objectGroup == null)
            throw "Invalid group " + group;

        var entities = new Array<TileObject>();
        var objectIterator = objectGroup.elementsNamed('object');

        for(object in objectIterator)
        {
            entities.push
            ({
                x : Std.parseInt(object.get('x')),
                y : Std.parseInt(object.get('y')),
                gid : Std.parseInt(object.get('gid'))
            });
        }

        return entities;
    }

    public function getTileSet(gid : Int) : TileSet
    {
        var matchingNode = null;
        for(firstgid in _sets.keys())
        {
            matchingNode = _sets.get(firstgid);
            if(gid < firstgid)
                break;
        }

        if(matchingNode != null)
        {
            var imgWidth = Std.parseInt(matchingNode.get('tilewidth'));
            var tileWidth = Std.parseInt(matchingNode.get('tilewidth'));
            var tileHeight = Std.parseInt(matchingNode.get('tileheight'));
            var image = matchingNode.elementsNamed('image').next();
            return
            {
                tileWidth: tileWidth,
                tileHeight: tileHeight,
                source : image.get('source'),
                firstgid : Std.parseInt(matchingNode.get('firstgid'))
            }
        }

        return null;
    }
}
