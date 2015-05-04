package data;

import haxe.ds.StringMap;

typedef TileSet =
{
    name : String,
    firstgid : Int,
    source : String,
    tileWidth : Int,
    tileHeight : Int
};
typedef TileObject =
{
    x : Int,
    y : Int,
    gid : Int,
    width : Null<Int>,
    height : Null<Int>,
    properties : StringMap<String>
};

class Level
{
    public var width(default, null) : Int;
    public var height(default, null) : Int;
    public var backgroundColor(default, null) : Int;

    var _source : Xml;
    var _groups : StringMap<Xml>;
    var _sets : Array<TileSet>;

    public function new(source : Xml)
    {
        _source = source;
        _groups = new StringMap<Xml>();
        var mapNode = _source.elementsNamed('map').next();
        for (objectGroup in mapNode.elementsNamed('objectgroup'))
        {
            _groups.set(objectGroup.get('name'), objectGroup);
        }
        _sets = new Array<TileSet>();
        for (tileSet in mapNode.elementsNamed('tileset'))
        {
            _sets.push(tileSetFromXml(tileSet));
        }
        _sets.sort(function(a, b) return a.firstgid - b.firstgid);
        width = Std.parseInt(mapNode.get('width')) * Std.parseInt(mapNode.get('tilewidth'));
        height = Std.parseInt(mapNode.get('height')) * Std.parseInt(mapNode.get('tileheight'));

        var color = mapNode.get('backgroundcolor');

        if(color != null)
        {
            backgroundColor =  Std.parseInt('0x' + color.substr(1));
        }
        else
        {
            backgroundColor = 0;
        }
    }

    public function getObjects(group : String) : Array<TileObject>
    {
        var objectGroup = _groups.get(group);

        if(objectGroup == null)
            throw "Invalid group " + group;

        var entities = new Array<TileObject>();
        var objectIterator = objectGroup.elementsNamed('object');
        var objectWidth, objectHeight;
        var properties, propertyNode;

        for(object in objectIterator)
        {
            objectWidth = object.get('width');
            objectHeight = object.get('height');
            propertyNode = object.elementsNamed('properties').next();

            if(propertyNode != null)
            {
                properties = new StringMap<String>();
                for(property in propertyNode.elementsNamed('property'))
                {
                    properties.set(property.get('name'), property.get('value'));
                }
            }
            else
            {
                properties = null;
            }

            entities.push
            ({
                x : Std.parseInt(object.get('x')),
                y : Std.parseInt(object.get('y')),
                gid : Std.parseInt(object.get('gid')),
                width : objectWidth != null ? Std.parseInt(objectWidth) : null,
                height : objectHeight != null ? Std.parseInt(objectHeight) : null,
                properties: properties
            });
        }

        return entities;
    }

    public function getTileSet(gid : Int) : TileSet
    {
        var matchingNode = null;
        for(currentNode in _sets.iterator())
        {
            if(gid < currentNode.firstgid)
                break;
            matchingNode = currentNode;
        }
        return matchingNode;
    }

    function tileSetFromXml(matchingNode : Xml) : TileSet
    {
        var imgWidth = Std.parseInt(matchingNode.get('tilewidth'));
        var tileWidth = Std.parseInt(matchingNode.get('tilewidth'));
        var tileHeight = Std.parseInt(matchingNode.get('tileheight'));
        var image = matchingNode.elementsNamed('image').next();
        return
        {
            name : matchingNode.get('name'),
            tileWidth: tileWidth,
            tileHeight: tileHeight,
            source : image.get('source'),
            firstgid : Std.parseInt(matchingNode.get('firstgid'))
        }
    }
}
