package ;

import js.Browser;
import StringTools;

import pixi.renderers.IRenderer;
import pixi.display.Sprite;
import pixi.extras.TilingSprite;
import pixi.display.MovieClip;
import pixi.display.Stage;
import pixi.textures.Texture;
import pixi.utils.Detector;
import pixi.loaders.AssetLoader;
import ash.core.Engine;
import ash.core.Entity;

import system.SystemPriority;
import system.DisplaySystem;
import system.KeyboardControlSystem;
import system.PhysicsSystem;

import component.Display;
import component.Position;
import component.KeyboardControlled;
import component.Velocity;
import component.Box;

class Main {

    inline static var WIDTH : Int = 800;
    inline static var HEIGHT : Int = 600;

    var _renderer : IRenderer;
    var _stage : Stage;
    var _loader : AssetLoader;
    var _engine : Engine;

    public function new() {
        _stage = new Stage(0xCCCCCC);

        _renderer = Detector.autoDetectRenderer(WIDTH, HEIGHT);
        Browser.document.body.appendChild(_renderer.view);

        _loader = new AssetLoader
        ([
            "assets/player.json",
            "assets/bg_castle.png"
        ]);
        _loader.onComplete = assetsLoaded;
        _loader.load();

        _engine = new Engine();
        _engine.addSystem(new KeyboardControlSystem(Browser.window), SystemPriority.INPUT);
        _engine.addSystem(new PhysicsSystem({width: WIDTH, height: HEIGHT}), SystemPriority.PHYSICS);
        _engine.addSystem(new DisplaySystem(_stage), SystemPriority.RENDERING);

        Browser.window.requestAnimationFrame(cast animate);
    }

    function assetsLoaded()
    {
        var texture = Texture.fromFrame("assets/bg_castle.png");
        var background = new TilingSprite(texture, texture.width, texture.height);
        background.width = 800;
        background.height = 600;
        _stage.addChild(background);

        texture = Texture.fromFrame("p1_walk08.png");

        var playerEntity = new Entity();
        playerEntity.add(new Display(new Sprite(texture)));
        playerEntity.add(new Position(Std.int(WIDTH / 2), 0));
        playerEntity.add(new KeyboardControlled());
        playerEntity.add(new Velocity());
        playerEntity.add(new Box(Std.int(texture.width), Std.int(texture.height)));
        _engine.addEntity(playerEntity);
    }

    function animate()
    {
        Browser.window.requestAnimationFrame(cast animate);
        _engine.update(1/60);
        _renderer.render(_stage);
    }

    static function main()
    {
        new Main();
    }
}
