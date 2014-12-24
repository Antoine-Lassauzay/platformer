package ;

import haxe.Http;
import haxe.Timer;
import js.Browser;
import StringTools;

import pixi.renderers.IRenderer;
import pixi.display.Sprite;
import pixi.display.MovieClip;
import pixi.display.Stage;
import pixi.textures.Texture;
import pixi.utils.Detector;
import pixi.loaders.AssetLoader;
import pixi.geom.Rectangle;
import ash.core.Engine;
import ash.core.Entity;

import system.SystemPriority;
import system.DisplaySystem;
import system.KeyboardControlSystem;
import system.PhysicsSystem;
import system.CharacterSystem;

import component.Display;
import component.StatefulDisplay;
import component.Movement;
import component.Position;
import component.KeyboardControlled;
import component.Velocity;
import component.Box;
import component.Oriented;

import data.Level;

class Main
{

    var _renderer : IRenderer;
    var _stage : Stage;
    var _loader : AssetLoader;
    var _engine : Engine;
    var _xmlLoader : Http;
    var _level : Level;

    public function new()
    {
        _xmlLoader = new Http("assets/castle.tmx");
        _xmlLoader.onData = levelLoaded;
        _xmlLoader.request();
    }

    function levelLoaded(data :String)
    {
        _level = new Level(Xml.parse(data));
        trace("World is " + _level.width + " by " + _level.height);

        _stage = new Stage(_level.backgroundColor);

        _renderer = Detector.autoDetectRenderer(_level.width, _level.height);
        Browser.document.body.appendChild(_renderer.view);

        _loader = new AssetLoader
        ([
            "assets/player.json",
            "assets/castle.png"
        ]);
        _loader.onComplete = assetsLoaded;
        _loader.load();

        _engine = new Engine();
        _engine.addSystem(new KeyboardControlSystem(Browser.window), SystemPriority.INPUT);
        _engine.addSystem(new PhysicsSystem({width: _level.width, height: _level.height}), SystemPriority.PHYSICS);
        _engine.addSystem(new DisplaySystem(_stage), SystemPriority.RENDERING);
        _engine.addSystem(new CharacterSystem(), SystemPriority.RENDERING);

        Browser.window.requestAnimationFrame(cast animate);
    }

    function assetsLoaded()
    {
        var playerSprite = StatefulDisplay.buildPlayerSprite();

        var entity = new Entity();
        entity.add(new Display(playerSprite));
        entity.add(new StatefulDisplay(playerSprite));
        entity.add(new Movement(Still));
        entity.add(new Position(0, 0));
        entity.add(new KeyboardControlled());
        entity.add(new Velocity());
        entity.add(new Box(Std.int(playerSprite.width), Std.int(playerSprite.height)));
        entity.add(new Oriented(Right));
        _engine.addEntity(entity);

        var blocks = _level.getObjects("blocks");
        var sprite = null;
        var entity = null;
        var tileSet : TileSet = null;
        var texture = null;
        var baseTexture = null;

        for(block in blocks)
        {
            tileSet = _level.getTileSet(block.gid);
            baseTexture = Texture.fromFrame("assets/" + tileSet.source).baseTexture;
            // TODO preload tile sources
            var tx = (block.gid - tileSet.firstgid) % Math.floor(baseTexture.width / tileSet.tileWidth);
            var ty = Math.floor((block.gid - tileSet.firstgid) / Math.floor(baseTexture.width / tileSet.tileWidth));
            var rect = new Rectangle(
                tx * tileSet.tileWidth, ty * tileSet.tileHeight,
                tileSet.tileWidth, tileSet.tileHeight
            );
            texture = new Texture(baseTexture, rect);
            sprite = new Sprite(texture);
            entity = new Entity();
            entity.add(new Display(sprite));
            entity.add(new Position(block.x, block.y - tileSet.tileHeight));
            if(block.width != null && block.height != null)
            {
                entity.add(new Box(block.width, block.height));
            }

            _stage.addChild(sprite);
            _engine.addEntity(entity);
        }
    }

    var _lastTime : Float = Timer.stamp();

    function animate()
    {
        Browser.window.requestAnimationFrame(cast animate);
        var time = Timer.stamp();
        _engine.update(time - _lastTime);
        _lastTime = time;
        _renderer.render(_stage);
    }

    static function main()
    {
        new Main();
    }
}
