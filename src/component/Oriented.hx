package component;

enum Orientation
{
    Left;
    Right;
}

class Oriented
{
    public var value : Orientation;

    public function new(current : Orientation)
    {
        value = current;
    }
}
