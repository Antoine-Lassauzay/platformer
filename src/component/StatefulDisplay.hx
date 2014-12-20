package component;

import pixi.display.MovieClip;
import pixi.textures.Texture;

class StatefulDisplay
{
    var _movieClip : MovieClip;
    var _jumpTexture : Texture;
    var _jumpFlag : Bool;
    // var _jumpTexture : Texture;

    public function new(movie : MovieClip)
    {
        _movieClip = movie;
        _movieClip.animationSpeed = .5;
        _jumpTexture = Texture.fromFrame("p1_jump.png");
    }

    public function walk() : Void
    {
        if(_jumpFlag)
        {
            _jumpFlag = false;
            _movieClip.textures.shift();
        }
        _movieClip.play();
    }

    public function jump() : Void
    {
        if(!_jumpFlag)
        {
            _jumpFlag = true;
            _movieClip.textures.unshift(_jumpTexture);
            _movieClip.gotoAndStop(0);
        }
    }

    public function stop() : Void
    {
        if(_jumpFlag)
        {
            _jumpFlag = false;
            _movieClip.textures.shift();
        }
        _movieClip.gotoAndStop(9);
    }

    public static function buildPlayerSprite() : MovieClip
    {
        var textures = [
            for (i in 1...11)
                Texture.fromFrame(
                    "p1_walk" + StringTools.lpad(Std.string(i), "0", 2) + ".png"
                )
        ];
        var playerSprite = new MovieClip(textures);
        playerSprite.pivot.set(textures[0].width * .5, 0);
        return playerSprite;
    }
}
