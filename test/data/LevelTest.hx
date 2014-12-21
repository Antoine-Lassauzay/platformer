package data;

import haxe.Resource;

import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import org.hamcrest.MatchersBase;

class LevelTest extends MatchersBase
{
    var _level : Level;

    public function new()
    {
        super();
    }

    @Before
    public function setUp()
    {
        _level = new Level(Xml.parse(Resource.getString("castle.tmx")));
    }

    @Test
    public function testGetObjects()
    {
        var blocks = _level.getObjects("blocks");
        assertThat(blocks, arrayWithSize(11));
    }

    @Test
    @Ignore("Not sure how to expect exceptions")
    public function testGetObjectsForUnknownGroup()
    {
        _level.getObjects("foo");
    }

    @Test
    public function testGetTileSet()
    {
        for (object in _level.getObjects("blocks"))
        {
            Assert.isNotNull( _level.getTileSet(object.gid) );
        }
    }
}
