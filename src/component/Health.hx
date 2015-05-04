package component;

class Health
{
    public var current : Int;
    public var maximum : Int;

    public function new(current, maximum)
    {
        this.current = current;
        this.maximum = maximum;
    }
}