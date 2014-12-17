package component;

typedef Precision = Float;

class Velocity
{
    public var xAxis : Precision;
    public var yAxis : Precision;

    public function new(x : Precision = 0, y : Precision = 0)
    {
        this.xAxis = x;
        this.yAxis = y;
    }
}
