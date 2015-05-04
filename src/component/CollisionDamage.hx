package component;

class CollisionDamage
{
    public var damage : Int;
    public var radius : Int;

    public function new(damage, ?radius = 1)
    {
        this.damage = damage;
        this.radius = radius;
    }
}