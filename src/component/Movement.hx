package component;

enum MovementType
{
    Still;
    Walking;
    Jump;
}

class Movement
{
    public var value(default, set) : MovementType;
    public var invalidated(default, null) : Bool;

    public function new(current : MovementType)
    {
        value = current;
        invalidated = true;
    }

    public function set_value(newValue)
    {
        invalidated = true;
        return value = newValue;
    }

    public function validate() : Void
    {
        invalidated = false;
    }


}
