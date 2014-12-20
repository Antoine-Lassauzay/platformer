package component;

import pixi.display.MovieClip;

class StatefulDisplay
{
    var _movieClip : MovieClip;

    public function new(movie : MovieClip)
    {
        _movieClip = movie;
    }

    public function walk() : Void
    {
        _movieClip.play();
    }

    public function jump() : Void
    {
        _movieClip.gotoAndStop(6);
    }

    public function stop() : Void
    {
        _movieClip.gotoAndStop(8);
    }
}
