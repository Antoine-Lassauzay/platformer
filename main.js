(function () { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() {
	this._stage = new PIXI.Stage(13421772);
	this._renderer = PIXI.autoDetectRenderer(800,600);
	window.document.body.appendChild(this._renderer.view);
	this._loader = new PIXI.AssetLoader(["assets/player.json","assets/bg_castle.png"]);
	this._loader.onComplete = $bind(this,this.assetsLoaded);
	this._loader.load();
	this._engine = new ash.core.Engine();
	this._engine.addSystem(new system.KeyboardControlSystem(window),0);
	this._engine.addSystem(new system.PhysicsSystem({ width : 800, height : 600}),100);
	this._engine.addSystem(new system.DisplaySystem(this._stage),200);
	this._engine.addSystem(new system.CharacterSystem(),200);
	window.requestAnimationFrame($bind(this,this.animate));
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new Main();
};
Main.prototype = {
	assetsLoaded: function() {
		var texture = PIXI.Texture.fromFrame("assets/bg_castle.png");
		var background = new PIXI.TilingSprite(texture,texture.width,texture.height);
		background.width = 800;
		background.height = 600;
		this._stage.addChild(background);
		var textures;
		var _g = [];
		var _g1 = 1;
		while(_g1 < 11) {
			var i = _g1++;
			_g.push(PIXI.Texture.fromFrame("p1_walk" + StringTools.lpad(i == null?"null":"" + i,"0",2) + ".png"));
		}
		textures = _g;
		var playerSprite = new PIXI.MovieClip(textures);
		playerSprite.pivot.set(textures[0].width * .5,0);
		var playerEntity = new ash.core.Entity();
		playerEntity.add(new component.Display(playerSprite));
		playerEntity.add(new component.StatefulDisplay(playerSprite));
		playerEntity.add(new component.Movement(component.MovementType.Still));
		playerEntity.add(new component.Position(400,0));
		playerEntity.add(new component.KeyboardControlled());
		playerEntity.add(new component.Velocity());
		playerEntity.add(new component.Box(textures[0].width | 0,textures[0].height | 0));
		playerEntity.add(new component.Oriented(component.Orientation.Right));
		this._engine.addEntity(playerEntity);
	}
	,animate: function() {
		window.requestAnimationFrame($bind(this,this.animate));
		this._engine.update(0.0166666666666666664);
		this._renderer.render(this._stage);
	}
	,__class__: Main
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
var ash = {};
ash.ClassMap = function() {
	this.h = new haxe.ds.StringMap();
};
$hxClasses["ash.ClassMap"] = ash.ClassMap;
ash.ClassMap.__name__ = ["ash","ClassMap"];
ash.ClassMap.__interfaces__ = [IMap];
ash.ClassMap.prototype = {
	get: function(k) {
		return this.h.get(Type.getClassName(k));
	}
	,set: function(k,v) {
		this.h.set(Type.getClassName(k),v);
	}
	,exists: function(k) {
		return this.h.exists(Type.getClassName(k));
	}
	,remove: function(k) {
		return this.h.remove(Type.getClassName(k));
	}
	,keys: function() {
		var i = this.h.keys();
		return { hasNext : $bind(i,i.hasNext), next : function() {
			return Type.resolveClass(i.next());
		}};
	}
	,iterator: function() {
		return this.h.iterator();
	}
	,toString: function() {
		return this.h.toString();
	}
	,__class__: ash.ClassMap
};
ash.GenericListIterator = function(head) {
	this.previous = { next : head};
};
$hxClasses["ash.GenericListIterator"] = ash.GenericListIterator;
ash.GenericListIterator.__name__ = ["ash","GenericListIterator"];
ash.GenericListIterator.prototype = {
	hasNext: function() {
		return this.previous.next != null;
	}
	,next: function() {
		var node = this.previous.next;
		this.previous = node;
		return node;
	}
	,__class__: ash.GenericListIterator
};
ash.core = {};
ash.core.IFamily = function() { };
$hxClasses["ash.core.IFamily"] = ash.core.IFamily;
ash.core.IFamily.__name__ = ["ash","core","IFamily"];
ash.core.IFamily.prototype = {
	__class__: ash.core.IFamily
};
ash.core.ComponentMatchingFamily = function(nodeClass,engine) {
	this.nodeClass = nodeClass;
	this.engine = engine;
	this.init();
};
$hxClasses["ash.core.ComponentMatchingFamily"] = ash.core.ComponentMatchingFamily;
ash.core.ComponentMatchingFamily.__name__ = ["ash","core","ComponentMatchingFamily"];
ash.core.ComponentMatchingFamily.__interfaces__ = [ash.core.IFamily];
ash.core.ComponentMatchingFamily.prototype = {
	init: function() {
		this.nodeList = new ash.core.NodeList();
		this.entities = new haxe.ds.ObjectMap();
		this.components = this.nodeClass._getComponents();
		this.optionalComponents = this.nodeClass._getOptionalComponents();
		this.nodePool = new ash.core.NodePool(this.nodeClass,this.components,this.optionalComponents);
	}
	,newEntity: function(entity) {
		this.addIfMatch(entity);
	}
	,componentAddedToEntity: function(entity,componentClass) {
		this.addIfMatch(entity);
	}
	,componentRemovedFromEntity: function(entity,componentClass) {
		if(this.components.h.exists(Type.getClassName(componentClass))) this.removeIfMatch(entity); else if(this.optionalComponents.h.exists(Type.getClassName(componentClass))) {
			if(this.entities.h.__keys__[entity.__id__] != null) {
				var node = this.entities.h[entity.__id__];
				Reflect.setField(node,this.optionalComponents.h.get(Type.getClassName(componentClass)),null);
			}
		}
	}
	,removeEntity: function(entity) {
		this.removeIfMatch(entity);
	}
	,addIfMatch: function(entity) {
		if(!(this.entities.h.__keys__[entity.__id__] != null)) {
			var $it0 = this.components.keys();
			while( $it0.hasNext() ) {
				var componentClass = $it0.next();
				if(!entity.has(componentClass)) return;
			}
			var node = this.nodePool.get();
			node.entity = entity;
			var $it1 = this.components.keys();
			while( $it1.hasNext() ) {
				var componentClass1 = $it1.next();
				Reflect.setField(node,this.components.h.get(Type.getClassName(componentClass1)),entity.get(componentClass1));
			}
			var $it2 = this.optionalComponents.keys();
			while( $it2.hasNext() ) {
				var componentClass2 = $it2.next();
				Reflect.setField(node,this.optionalComponents.h.get(Type.getClassName(componentClass2)),entity.get(componentClass2));
			}
			this.entities.set(entity,node);
			this.nodeList.add(node);
		}
	}
	,removeIfMatch: function(entity) {
		if(this.entities.h.__keys__[entity.__id__] != null) {
			var node = this.entities.h[entity.__id__];
			this.entities.remove(entity);
			this.nodeList.remove(node);
			if(this.engine.updating) {
				this.nodePool.cache(node);
				this.engine.updateComplete.add($bind(this,this.releaseNodePoolCache));
			} else this.nodePool.dispose(node);
		}
	}
	,releaseNodePoolCache: function() {
		this.engine.updateComplete.remove($bind(this,this.releaseNodePoolCache));
		this.nodePool.releaseCache();
	}
	,cleanUp: function() {
		var _g = new ash.GenericListIterator(this.nodeList.head);
		while(_g.previous.next != null) {
			var node = _g.next();
			this.entities.remove(node.entity);
		}
		this.nodeList.removeAll();
	}
	,__class__: ash.core.ComponentMatchingFamily
};
ash.core.Engine = function() {
	this.familyClass = ash.core.ComponentMatchingFamily;
	this.entityList = new ash.core.EntityList();
	this.entityNames = new haxe.ds.StringMap();
	this.entityIds = new haxe.ds.IntMap();
	this.systemList = new ash.core.SystemList();
	this.families = new ash.ClassMap();
	this.entityAdded = new ash.signals.Signal1();
	this.entityRemoved = new ash.signals.Signal1();
	this.updateComplete = new ash.signals.Signal0();
	this.updating = false;
};
$hxClasses["ash.core.Engine"] = ash.core.Engine;
ash.core.Engine.__name__ = ["ash","core","Engine"];
ash.core.Engine.prototype = {
	addEntity: function(entity) {
		if(this.entityNames.exists(entity.name)) throw "The entity name " + entity.name + " is already in use by another entity.";
		if(this.entityIds.exists(entity.id)) throw "The entity id " + entity.id + " is already in use by another entity.";
		this.entityList.add(entity);
		this.entityNames.set(entity.name,entity);
		this.entityIds.set(entity.id,entity);
		entity.componentAdded.add($bind(this,this.componentAdded));
		entity.componentRemoved.add($bind(this,this.componentRemoved));
		entity.nameChanged.add($bind(this,this.entityNameChanged));
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.newEntity(entity);
		}
		this.entityAdded.dispatch(entity);
	}
	,removeEntity: function(entity) {
		entity.componentAdded.remove($bind(this,this.componentAdded));
		entity.componentRemoved.remove($bind(this,this.componentRemoved));
		entity.nameChanged.remove($bind(this,this.entityNameChanged));
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.removeEntity(entity);
		}
		this.entityNames.remove(entity.name);
		this.entityIds.remove(entity.id);
		this.entityList.remove(entity);
		this.entityRemoved.dispatch(entity);
	}
	,entityNameChanged: function(entity,oldName) {
		if(this.entityNames.get(oldName) == entity) {
			this.entityNames.remove(oldName);
			this.entityNames.set(entity.name,entity);
		}
	}
	,getEntityByName: function(name) {
		return this.entityNames.get(name);
	}
	,getEntityById: function(id) {
		return this.entityIds.get(id);
	}
	,removeAllEntities: function() {
		while(this.entityList.head != null) this.removeEntity(this.entityList.head);
	}
	,get_entities: function() {
		return this.entityList;
	}
	,componentAdded: function(entity,componentClass) {
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentAddedToEntity(entity,componentClass);
		}
	}
	,componentRemoved: function(entity,componentClass) {
		var $it0 = this.families.h.iterator();
		while( $it0.hasNext() ) {
			var family = $it0.next();
			family.componentRemovedFromEntity(entity,componentClass);
		}
	}
	,getNodeList: function(nodeClass) {
		if(this.families.h.exists(Type.getClassName(nodeClass))) return this.families.h.get(Type.getClassName(nodeClass)).nodeList;
		var family = Type.createInstance(this.familyClass,[nodeClass,this]);
		this.families.h.set(Type.getClassName(nodeClass),family);
		var _g = new ash.GenericListIterator(this.entityList.head);
		while(_g.previous.next != null) {
			var entity = _g.next();
			family.newEntity(entity);
		}
		return family.nodeList;
	}
	,releaseNodeList: function(nodeClass) {
		if(this.families.h.exists(Type.getClassName(nodeClass))) {
			this.families.h.get(Type.getClassName(nodeClass)).cleanUp();
			this.families.h.remove(Type.getClassName(nodeClass));
		}
	}
	,addSystem: function(system,priority) {
		system.priority = priority;
		system.addToEngine(this);
		this.systemList.add(system);
	}
	,getSystem: function(type) {
		return this.systemList.get(type);
	}
	,get_systems: function() {
		return this.systemList;
	}
	,removeSystem: function(system) {
		this.systemList.remove(system);
		system.removeFromEngine(this);
	}
	,removeAllSystems: function() {
		while(this.systemList.head != null) this.removeSystem(this.systemList.head);
	}
	,update: function(time) {
		this.updating = true;
		var _g = new ash.GenericListIterator(this.systemList.head);
		while(_g.previous.next != null) {
			var system = _g.next();
			system.update(time);
		}
		this.updating = false;
		this.updateComplete.dispatch();
	}
	,__class__: ash.core.Engine
};
ash.core.Entity = function(name) {
	if(name == null) name = "";
	this.id = ++ash.core.Entity.lastId;
	this.componentAdded = new ash.signals.Signal2();
	this.componentRemoved = new ash.signals.Signal2();
	this.nameChanged = new ash.signals.Signal2();
	this.components = new ash.ClassMap();
	if(name != "") this.set_name(name); else this.set_name("_entity" + ash.core.Entity.lastId);
};
$hxClasses["ash.core.Entity"] = ash.core.Entity;
ash.core.Entity.__name__ = ["ash","core","Entity"];
ash.core.Entity.prototype = {
	set_name: function(value) {
		if(this.name != value) {
			var previous = this.name;
			this.name = value;
			this.nameChanged.dispatch(this,previous);
		}
		return value;
	}
	,add: function(component,componentClass) {
		if(componentClass == null) componentClass = Type.getClass(component);
		if(this.components.h.exists(Type.getClassName(componentClass))) this.remove(componentClass);
		this.components.h.set(Type.getClassName(componentClass),component);
		this.componentAdded.dispatch(this,componentClass);
		return this;
	}
	,remove: function(componentClass) {
		var component = this.components.h.get(Type.getClassName(componentClass));
		if(component != null) {
			this.components.h.remove(Type.getClassName(componentClass));
			this.componentRemoved.dispatch(this,componentClass);
			return component;
		}
		return null;
	}
	,get: function(componentClass) {
		return this.components.h.get(Type.getClassName(componentClass));
	}
	,getAll: function() {
		var componentArray = new Array();
		var $it0 = this.components.h.iterator();
		while( $it0.hasNext() ) {
			var component = $it0.next();
			componentArray.push(component);
		}
		return componentArray;
	}
	,has: function(componentClass) {
		return this.components.h.exists(Type.getClassName(componentClass));
	}
	,__class__: ash.core.Entity
};
ash.core.EntityList = function() {
};
$hxClasses["ash.core.EntityList"] = ash.core.EntityList;
ash.core.EntityList.__name__ = ["ash","core","EntityList"];
ash.core.EntityList.prototype = {
	add: function(entity) {
		if(this.head == null) {
			this.head = this.tail = entity;
			entity.next = entity.previous = null;
		} else {
			this.tail.next = entity;
			entity.previous = this.tail;
			entity.next = null;
			this.tail = entity;
		}
	}
	,remove: function(entity) {
		if(this.head == entity) this.head = this.head.next;
		if(this.tail == entity) this.tail = this.tail.previous;
		if(entity.previous != null) entity.previous.next = entity.next;
		if(entity.next != null) entity.next.previous = entity.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var entity = this.head;
			this.head = this.head.next;
			entity.previous = null;
			entity.next = null;
		}
		this.tail = null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,__class__: ash.core.EntityList
};
ash.core.Node = function() { };
$hxClasses["ash.core.Node"] = ash.core.Node;
ash.core.Node.__name__ = ["ash","core","Node"];
ash.core.Node.prototype = {
	__class__: ash.core.Node
};
ash.core.NodeList = function() {
	this.nodeAdded = new ash.signals.Signal1();
	this.nodeRemoved = new ash.signals.Signal1();
};
$hxClasses["ash.core.NodeList"] = ash.core.NodeList;
ash.core.NodeList.__name__ = ["ash","core","NodeList"];
ash.core.NodeList.prototype = {
	add: function(node) {
		if(this.head == null) {
			this.head = this.tail = node;
			node.next = node.previous = null;
		} else {
			this.tail.next = node;
			node.previous = this.tail;
			node.next = null;
			this.tail = node;
		}
		this.nodeAdded.dispatch(node);
	}
	,remove: function(node) {
		if(this.head == node) this.head = this.head.next;
		if(this.tail == node) this.tail = this.tail.previous;
		if(node.previous != null) node.previous.next = node.next;
		if(node.next != null) node.next.previous = node.previous;
		this.nodeRemoved.dispatch(node);
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			node.previous = null;
			node.next = null;
			this.nodeRemoved.dispatch(node);
		}
		this.tail = null;
	}
	,get_empty: function() {
		return this.head == null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,swap: function(node1,node2) {
		if(node1.previous == node2) {
			node1.previous = node2.previous;
			node2.previous = node1;
			node2.next = node1.next;
			node1.next = node2;
		} else if(node2.previous == node1) {
			node2.previous = node1.previous;
			node1.previous = node2;
			node1.next = node2.next;
			node2.next = node1;
		} else {
			var temp = node1.previous;
			node1.previous = node2.previous;
			node2.previous = temp;
			temp = node1.next;
			node1.next = node2.next;
			node2.next = temp;
		}
		if(this.head == node1) this.head = node2; else if(this.head == node2) this.head = node1;
		if(this.tail == node1) this.tail = node2; else if(this.tail == node2) this.tail = node1;
		if(node1.previous != null) node1.previous.next = node1;
		if(node2.previous != null) node2.previous.next = node2;
		if(node1.next != null) node1.next.previous = node1;
		if(node2.next != null) node2.next.previous = node2;
	}
	,insertionSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var remains = this.head.next;
		var node = remains;
		while(node != null) {
			remains = node.next;
			var other = node.previous;
			while(other != null) {
				if(sortFunction(node,other) >= 0) {
					if(node != other.next) {
						if(this.tail == node) this.tail = node.previous;
						node.previous.next = node.next;
						if(node.next != null) node.next.previous = node.previous;
						node.next = other.next;
						node.previous = other;
						node.next.previous = node;
						other.next = node;
					}
					break;
				}
				other = other.previous;
			}
			if(other == null) {
				if(this.tail == node) this.tail = node.previous;
				node.previous.next = node.next;
				if(node.next != null) node.next.previous = node.previous;
				node.next = this.head;
				this.head.previous = node;
				node.previous = null;
				this.head = node;
			}
			node = remains;
		}
	}
	,mergeSort: function(sortFunction) {
		if(this.head == this.tail) return;
		var lists = [];
		var start = this.head;
		var end;
		while(start != null) {
			end = start;
			while(end.next != null && sortFunction(end,end.next) <= 0) end = end.next;
			var next = end.next;
			start.previous = end.next = null;
			lists.push(start);
			start = next;
		}
		while(lists.length > 1) lists.push(this.merge(lists.shift(),lists.shift(),sortFunction));
		this.tail = this.head = lists[0];
		while(this.tail.next != null) this.tail = this.tail.next;
	}
	,merge: function(head1,head2,sortFunction) {
		var node;
		var head;
		if(sortFunction(head1,head2) <= 0) {
			head = node = head1;
			head1 = head1.next;
		} else {
			head = node = head2;
			head2 = head2.next;
		}
		while(head1 != null && head2 != null) if(sortFunction(head1,head2) <= 0) {
			node.next = head1;
			head1.previous = node;
			node = head1;
			head1 = head1.next;
		} else {
			node.next = head2;
			head2.previous = node;
			node = head2;
			head2 = head2.next;
		}
		if(head1 != null) {
			node.next = head1;
			head1.previous = node;
		} else {
			node.next = head2;
			head2.previous = node;
		}
		return head;
	}
	,__class__: ash.core.NodeList
};
ash.core.NodePool = function(nodeClass,components,optionalComponents) {
	this.nodeClass = nodeClass;
	this.components = components;
	this.optionalComponents = optionalComponents;
};
$hxClasses["ash.core.NodePool"] = ash.core.NodePool;
ash.core.NodePool.__name__ = ["ash","core","NodePool"];
ash.core.NodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return Type.createEmptyInstance(this.nodeClass);
	}
	,dispose: function(node) {
		var $it0 = this.components.h.iterator();
		while( $it0.hasNext() ) {
			var componentName = $it0.next();
			node[componentName] = null;
		}
		var $it1 = this.optionalComponents.h.iterator();
		while( $it1.hasNext() ) {
			var componentName1 = $it1.next();
			node[componentName1] = null;
		}
		node.entity = null;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
		node.previous = this.cacheTail;
		this.cacheTail = node;
	}
	,releaseCache: function() {
		while(this.cacheTail != null) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	}
	,__class__: ash.core.NodePool
};
ash.core.System = function() {
	this.priority = 0;
};
$hxClasses["ash.core.System"] = ash.core.System;
ash.core.System.__name__ = ["ash","core","System"];
ash.core.System.prototype = {
	addToEngine: function(engine) {
	}
	,removeFromEngine: function(engine) {
	}
	,update: function(time) {
	}
	,__class__: ash.core.System
};
ash.core.SystemList = function() {
};
$hxClasses["ash.core.SystemList"] = ash.core.SystemList;
ash.core.SystemList.__name__ = ["ash","core","SystemList"];
ash.core.SystemList.prototype = {
	add: function(system) {
		if(this.head == null) {
			this.head = this.tail = system;
			system.next = system.previous = null;
		} else {
			var node = this.tail;
			while(node != null) {
				if(node.priority <= system.priority) break;
				node = node.previous;
			}
			if(node == this.tail) {
				this.tail.next = system;
				system.previous = this.tail;
				system.next = null;
				this.tail = system;
			} else if(node == null) {
				system.next = this.head;
				system.previous = null;
				this.head.previous = system;
				this.head = system;
			} else {
				system.next = node.next;
				system.previous = node;
				node.next.previous = system;
				node.next = system;
			}
		}
	}
	,remove: function(system) {
		if(this.head == system) this.head = this.head.next;
		if(this.tail == system) this.tail = this.tail.previous;
		if(system.previous != null) system.previous.next = system.next;
		if(system.next != null) system.next.previous = system.previous;
	}
	,removeAll: function() {
		while(this.head != null) {
			var system = this.head;
			this.head = this.head.next;
			system.previous = null;
			system.next = null;
		}
		this.tail = null;
	}
	,get: function(type) {
		var system = this.head;
		while(system != null) {
			if(js.Boot.__instanceof(system,type)) return system;
			system = system.next;
		}
		return null;
	}
	,iterator: function() {
		return new ash.GenericListIterator(this.head);
	}
	,__class__: ash.core.SystemList
};
ash.signals = {};
ash.signals.ListenerNode = function() {
};
$hxClasses["ash.signals.ListenerNode"] = ash.signals.ListenerNode;
ash.signals.ListenerNode.__name__ = ["ash","signals","ListenerNode"];
ash.signals.ListenerNode.prototype = {
	__class__: ash.signals.ListenerNode
};
ash.signals.ListenerNodePool = function() {
};
$hxClasses["ash.signals.ListenerNodePool"] = ash.signals.ListenerNodePool;
ash.signals.ListenerNodePool.__name__ = ["ash","signals","ListenerNodePool"];
ash.signals.ListenerNodePool.prototype = {
	get: function() {
		if(this.tail != null) {
			var node = this.tail;
			this.tail = this.tail.previous;
			node.previous = null;
			return node;
		} else return new ash.signals.ListenerNode();
	}
	,dispose: function(node) {
		node.listener = null;
		node.once = false;
		node.next = null;
		node.previous = this.tail;
		this.tail = node;
	}
	,cache: function(node) {
		node.listener = null;
		node.previous = this.cacheTail;
		this.cacheTail = node;
	}
	,releaseCache: function() {
		while(this.cacheTail != null) {
			var node = this.cacheTail;
			this.cacheTail = node.previous;
			node.next = null;
			node.previous = this.tail;
			this.tail = node;
		}
	}
	,__class__: ash.signals.ListenerNodePool
};
ash.signals.SignalBase = function() {
	this.listenerNodePool = new ash.signals.ListenerNodePool();
	this.numListeners = 0;
};
$hxClasses["ash.signals.SignalBase"] = ash.signals.SignalBase;
ash.signals.SignalBase.__name__ = ["ash","signals","SignalBase"];
ash.signals.SignalBase.prototype = {
	startDispatch: function() {
		this.dispatching = true;
	}
	,endDispatch: function() {
		this.dispatching = false;
		if(this.toAddHead != null) {
			if(this.head == null) {
				this.head = this.toAddHead;
				this.tail = this.toAddTail;
			} else {
				this.tail.next = this.toAddHead;
				this.toAddHead.previous = this.tail;
				this.tail = this.toAddTail;
			}
			this.toAddHead = null;
			this.toAddTail = null;
		}
		this.listenerNodePool.releaseCache();
	}
	,getNode: function(listener) {
		var node = this.head;
		while(node != null) {
			if(Reflect.compareMethods(node.listener,listener)) break;
			node = node.next;
		}
		if(node == null) {
			node = this.toAddHead;
			while(node != null) {
				if(Reflect.compareMethods(node.listener,listener)) break;
				node = node.next;
			}
		}
		return node;
	}
	,nodeExists: function(listener) {
		return this.getNode(listener) != null;
	}
	,add: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		this.addNode(node);
	}
	,addOnce: function(listener) {
		if(this.getNode(listener) != null) return;
		var node = this.listenerNodePool.get();
		node.listener = listener;
		node.once = true;
		this.addNode(node);
	}
	,addNode: function(node) {
		if(this.dispatching) {
			if(this.toAddHead == null) this.toAddHead = this.toAddTail = node; else {
				this.toAddTail.next = node;
				node.previous = this.toAddTail;
				this.toAddTail = node;
			}
		} else if(this.head == null) this.head = this.tail = node; else {
			this.tail.next = node;
			node.previous = this.tail;
			this.tail = node;
		}
		this.numListeners++;
	}
	,remove: function(listener) {
		var node = this.getNode(listener);
		if(node != null) {
			if(this.head == node) this.head = this.head.next;
			if(this.tail == node) this.tail = this.tail.previous;
			if(this.toAddHead == node) this.toAddHead = this.toAddHead.next;
			if(this.toAddTail == node) this.toAddTail = this.toAddTail.previous;
			if(node.previous != null) node.previous.next = node.next;
			if(node.next != null) node.next.previous = node.previous;
			if(this.dispatching) this.listenerNodePool.cache(node); else this.listenerNodePool.dispose(node);
			this.numListeners--;
		}
	}
	,removeAll: function() {
		while(this.head != null) {
			var node = this.head;
			this.head = this.head.next;
			this.listenerNodePool.dispose(node);
		}
		this.tail = null;
		this.toAddHead = null;
		this.toAddTail = null;
		this.numListeners = 0;
	}
	,__class__: ash.signals.SignalBase
};
ash.signals.Signal0 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal0"] = ash.signals.Signal0;
ash.signals.Signal0.__name__ = ["ash","signals","Signal0"];
ash.signals.Signal0.__super__ = ash.signals.SignalBase;
ash.signals.Signal0.prototype = $extend(ash.signals.SignalBase.prototype,{
	dispatch: function() {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener();
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash.signals.Signal0
});
ash.signals.Signal1 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal1"] = ash.signals.Signal1;
ash.signals.Signal1.__name__ = ["ash","signals","Signal1"];
ash.signals.Signal1.__super__ = ash.signals.SignalBase;
ash.signals.Signal1.prototype = $extend(ash.signals.SignalBase.prototype,{
	dispatch: function(object1) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash.signals.Signal1
});
ash.signals.Signal2 = function() {
	ash.signals.SignalBase.call(this);
};
$hxClasses["ash.signals.Signal2"] = ash.signals.Signal2;
ash.signals.Signal2.__name__ = ["ash","signals","Signal2"];
ash.signals.Signal2.__super__ = ash.signals.SignalBase;
ash.signals.Signal2.prototype = $extend(ash.signals.SignalBase.prototype,{
	dispatch: function(object1,object2) {
		this.startDispatch();
		var node = this.head;
		while(node != null) {
			node.listener(object1,object2);
			if(node.once) this.remove(node.listener);
			node = node.next;
		}
		this.endDispatch();
	}
	,__class__: ash.signals.Signal2
});
ash.tools = {};
ash.tools.ListIteratingSystem = function(nodeClass,nodeUpdateFunction,nodeAddedFunction,nodeRemovedFunction) {
	ash.core.System.call(this);
	this.nodeClass = nodeClass;
	this.nodeUpdateFunction = nodeUpdateFunction;
	this.nodeAddedFunction = nodeAddedFunction;
	this.nodeRemovedFunction = nodeRemovedFunction;
};
$hxClasses["ash.tools.ListIteratingSystem"] = ash.tools.ListIteratingSystem;
ash.tools.ListIteratingSystem.__name__ = ["ash","tools","ListIteratingSystem"];
ash.tools.ListIteratingSystem.__super__ = ash.core.System;
ash.tools.ListIteratingSystem.prototype = $extend(ash.core.System.prototype,{
	addToEngine: function(engine) {
		this.nodeList = engine.getNodeList(this.nodeClass);
		if(this.nodeAddedFunction != null) {
			var _g = new ash.GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeAddedFunction(node);
			}
			this.nodeList.nodeAdded.add(this.nodeAddedFunction);
		}
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.add(this.nodeRemovedFunction);
	}
	,removeFromEngine: function(engine) {
		if(this.nodeAddedFunction != null) this.nodeList.nodeAdded.remove(this.nodeAddedFunction);
		if(this.nodeRemovedFunction != null) this.nodeList.nodeRemoved.remove(this.nodeRemovedFunction);
		this.nodeList = null;
	}
	,update: function(time) {
		if(this.nodeUpdateFunction != null) {
			var _g = new ash.GenericListIterator(this.nodeList.head);
			while(_g.previous.next != null) {
				var node = _g.next();
				this.nodeUpdateFunction(node,time);
			}
		}
	}
	,__class__: ash.tools.ListIteratingSystem
});
var component = {};
component.Box = function(width,height) {
	this.width = width;
	this.height = height;
};
$hxClasses["component.Box"] = component.Box;
component.Box.__name__ = ["component","Box"];
component.Box.prototype = {
	__class__: component.Box
};
component.Display = function(displayObject) {
	this._displayObject = displayObject;
};
$hxClasses["component.Display"] = component.Display;
component.Display.__name__ = ["component","Display"];
component.Display.prototype = {
	addTo: function(parent) {
		parent.addChild(this._displayObject);
	}
	,setTo: function(position) {
		var updated = false;
		if(position.x != this._displayObject.x) {
			this._displayObject.x = position.x;
			updated = true;
		}
		if(position.y != this._displayObject.y) {
			this._displayObject.y = position.y;
			updated = true;
		}
		return updated;
	}
	,set_scaleX: function(v) {
		this._displayObject.scale.x = v;
		return v;
	}
	,get_scaleX: function() {
		return this._displayObject.scale.x;
	}
	,__class__: component.Display
};
component.KeyboardControlled = function() {
};
$hxClasses["component.KeyboardControlled"] = component.KeyboardControlled;
component.KeyboardControlled.__name__ = ["component","KeyboardControlled"];
component.KeyboardControlled.prototype = {
	__class__: component.KeyboardControlled
};
component.MovementType = { __ename__ : true, __constructs__ : ["Still","Walking","Jump"] };
component.MovementType.Still = ["Still",0];
component.MovementType.Still.__enum__ = component.MovementType;
component.MovementType.Walking = ["Walking",1];
component.MovementType.Walking.__enum__ = component.MovementType;
component.MovementType.Jump = ["Jump",2];
component.MovementType.Jump.__enum__ = component.MovementType;
component.Movement = function(current) {
	this.set_value(current);
};
$hxClasses["component.Movement"] = component.Movement;
component.Movement.__name__ = ["component","Movement"];
component.Movement.prototype = {
	set_value: function(newValue) {
		this.invalidated = true;
		return this.value = newValue;
	}
	,validate: function() {
		this.invalidated = false;
	}
	,__class__: component.Movement
};
component.Orientation = { __ename__ : true, __constructs__ : ["Left","Right"] };
component.Orientation.Left = ["Left",0];
component.Orientation.Left.__enum__ = component.Orientation;
component.Orientation.Right = ["Right",1];
component.Orientation.Right.__enum__ = component.Orientation;
component.Oriented = function(current) {
	this.value = current;
};
$hxClasses["component.Oriented"] = component.Oriented;
component.Oriented.__name__ = ["component","Oriented"];
component.Oriented.prototype = {
	__class__: component.Oriented
};
component.Position = function(x,y) {
	this.x = x;
	this.y = y;
};
$hxClasses["component.Position"] = component.Position;
component.Position.__name__ = ["component","Position"];
component.Position.prototype = {
	__class__: component.Position
};
component.StatefulDisplay = function(movie) {
	this._movieClip = movie;
};
$hxClasses["component.StatefulDisplay"] = component.StatefulDisplay;
component.StatefulDisplay.__name__ = ["component","StatefulDisplay"];
component.StatefulDisplay.prototype = {
	walk: function() {
		this._movieClip.play();
	}
	,jump: function() {
		this._movieClip.gotoAndStop(6);
	}
	,stop: function() {
		this._movieClip.gotoAndStop(0);
	}
	,__class__: component.StatefulDisplay
};
component.Velocity = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.xAxis = x;
	this.yAxis = y;
};
$hxClasses["component.Velocity"] = component.Velocity;
component.Velocity.__name__ = ["component","Velocity"];
component.Velocity.prototype = {
	__class__: component.Velocity
};
var haxe = {};
haxe.ds = {};
haxe.ds.GenericCell = function(elt,next) {
	this.elt = elt;
	this.next = next;
};
$hxClasses["haxe.ds.GenericCell"] = haxe.ds.GenericCell;
haxe.ds.GenericCell.__name__ = ["haxe","ds","GenericCell"];
haxe.ds.GenericCell.prototype = {
	__class__: haxe.ds.GenericCell
};
haxe.ds.GenericStack = function() {
};
$hxClasses["haxe.ds.GenericStack"] = haxe.ds.GenericStack;
haxe.ds.GenericStack.__name__ = ["haxe","ds","GenericStack"];
haxe.ds.GenericStack.prototype = {
	add: function(item) {
		this.head = new haxe.ds.GenericCell(item,this.head);
	}
	,first: function() {
		if(this.head == null) return null; else return this.head.elt;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.head;
		while(l != null) {
			if(l.elt == v) {
				if(prev == null) this.head = l.next; else prev.next = l.next;
				break;
			}
			prev = l;
			l = l.next;
		}
		return l != null;
	}
	,__class__: haxe.ds.GenericStack
};
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			if(i == null) s.b += "null"; else s.b += "" + i;
			s.b += " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe.ds.StringMap
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var node = {};
node.BodyNode = function() { };
$hxClasses["node.BodyNode"] = node.BodyNode;
node.BodyNode.__name__ = ["node","BodyNode"];
node.BodyNode._getComponents = function() {
	if(node.BodyNode._components == null) {
		node.BodyNode._components = new ash.ClassMap();
		node.BodyNode._components.h.set(Type.getClassName(component.Velocity),"velocity");
		node.BodyNode._components.h.set(Type.getClassName(component.Box),"box");
		node.BodyNode._components.h.set(Type.getClassName(component.Position),"position");
	}
	return node.BodyNode._components;
};
node.BodyNode._getOptionalComponents = function() {
	if(node.BodyNode._optionalComponents == null) {
		node.BodyNode._optionalComponents = new ash.ClassMap();
		node.BodyNode._optionalComponents.h.set(Type.getClassName(component.Oriented),"orientation");
	}
	return node.BodyNode._optionalComponents;
};
node.BodyNode.__super__ = ash.core.Node;
node.BodyNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: node.BodyNode
});
node.CharacterNode = function() { };
$hxClasses["node.CharacterNode"] = node.CharacterNode;
node.CharacterNode.__name__ = ["node","CharacterNode"];
node.CharacterNode._getComponents = function() {
	if(node.CharacterNode._components == null) {
		node.CharacterNode._components = new ash.ClassMap();
		node.CharacterNode._components.h.set(Type.getClassName(component.Movement),"movement");
		node.CharacterNode._components.h.set(Type.getClassName(component.StatefulDisplay),"statefulDisplay");
	}
	return node.CharacterNode._components;
};
node.CharacterNode._getOptionalComponents = function() {
	if(node.CharacterNode._optionalComponents == null) {
		node.CharacterNode._optionalComponents = new ash.ClassMap();
	}
	return node.CharacterNode._optionalComponents;
};
node.CharacterNode.__super__ = ash.core.Node;
node.CharacterNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: node.CharacterNode
});
node.DisplayNode = function() { };
$hxClasses["node.DisplayNode"] = node.DisplayNode;
node.DisplayNode.__name__ = ["node","DisplayNode"];
node.DisplayNode._getComponents = function() {
	if(node.DisplayNode._components == null) {
		node.DisplayNode._components = new ash.ClassMap();
		node.DisplayNode._components.h.set(Type.getClassName(component.Display),"display");
		node.DisplayNode._components.h.set(Type.getClassName(component.Position),"position");
		node.DisplayNode._components.h.set(Type.getClassName(component.Velocity),"velocity");
	}
	return node.DisplayNode._components;
};
node.DisplayNode._getOptionalComponents = function() {
	if(node.DisplayNode._optionalComponents == null) {
		node.DisplayNode._optionalComponents = new ash.ClassMap();
		node.DisplayNode._optionalComponents.h.set(Type.getClassName(component.Oriented),"orientation");
		node.DisplayNode._optionalComponents.h.set(Type.getClassName(component.Movement),"movement");
	}
	return node.DisplayNode._optionalComponents;
};
node.DisplayNode.__super__ = ash.core.Node;
node.DisplayNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: node.DisplayNode
});
node.KeyboardControlNode = function() {
};
$hxClasses["node.KeyboardControlNode"] = node.KeyboardControlNode;
node.KeyboardControlNode.__name__ = ["node","KeyboardControlNode"];
node.KeyboardControlNode._getComponents = function() {
	if(node.KeyboardControlNode._components == null) {
		node.KeyboardControlNode._components = new ash.ClassMap();
		node.KeyboardControlNode._components.h.set(Type.getClassName(component.KeyboardControlled),"keyboardControlled");
		node.KeyboardControlNode._components.h.set(Type.getClassName(component.Velocity),"velocity");
		node.KeyboardControlNode._components.h.set(Type.getClassName(component.Position),"position");
	}
	return node.KeyboardControlNode._components;
};
node.KeyboardControlNode._getOptionalComponents = function() {
	if(node.KeyboardControlNode._optionalComponents == null) {
		node.KeyboardControlNode._optionalComponents = new ash.ClassMap();
		node.KeyboardControlNode._optionalComponents.h.set(Type.getClassName(component.Movement),"movement");
	}
	return node.KeyboardControlNode._optionalComponents;
};
node.KeyboardControlNode.__super__ = ash.core.Node;
node.KeyboardControlNode.prototype = $extend(ash.core.Node.prototype,{
	__class__: node.KeyboardControlNode
});
var pixi = {};
pixi.renderers = {};
pixi.renderers.IRenderer = function() { };
$hxClasses["pixi.renderers.IRenderer"] = pixi.renderers.IRenderer;
pixi.renderers.IRenderer.__name__ = ["pixi","renderers","IRenderer"];
pixi.renderers.IRenderer.prototype = {
	__class__: pixi.renderers.IRenderer
};
var system = {};
system.CharacterSystem = function() {
	ash.tools.ListIteratingSystem.call(this,node.CharacterNode,$bind(this,this.updateNode));
};
$hxClasses["system.CharacterSystem"] = system.CharacterSystem;
system.CharacterSystem.__name__ = ["system","CharacterSystem"];
system.CharacterSystem.__super__ = ash.tools.ListIteratingSystem;
system.CharacterSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
		if(node.movement.invalidated) {
			var _g = node.movement.value;
			switch(_g[1]) {
			case 0:
				node.statefulDisplay.stop();
				break;
			case 1:
				node.statefulDisplay.walk();
				break;
			case 2:
				node.statefulDisplay.jump();
				break;
			}
			node.movement.validate();
		}
	}
	,__class__: system.CharacterSystem
});
system.DisplaySystem = function(stage) {
	ash.tools.ListIteratingSystem.call(this,node.DisplayNode,$bind(this,this.updateNode),$bind(this,this.nodeAdded));
	this._stage = stage;
};
$hxClasses["system.DisplaySystem"] = system.DisplaySystem;
system.DisplaySystem.__name__ = ["system","DisplaySystem"];
system.DisplaySystem.__super__ = ash.tools.ListIteratingSystem;
system.DisplaySystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
		node.display.setTo(node.position);
		if(node.orientation != null) {
			if(node.orientation.value == component.Orientation.Right && node.display.get_scaleX() < 0) node.display.set_scaleX(1); else if(node.orientation.value == component.Orientation.Left && node.display.get_scaleX() > 0) node.display.set_scaleX(-1);
		}
	}
	,nodeAdded: function(node) {
		node.display.addTo(this._stage);
	}
	,__class__: system.DisplaySystem
});
system.ArrowKey = { __ename__ : true, __constructs__ : ["Up","Down","Left","Right"] };
system.ArrowKey.Up = ["Up",0];
system.ArrowKey.Up.__enum__ = system.ArrowKey;
system.ArrowKey.Down = ["Down",1];
system.ArrowKey.Down.__enum__ = system.ArrowKey;
system.ArrowKey.Left = ["Left",2];
system.ArrowKey.Left.__enum__ = system.ArrowKey;
system.ArrowKey.Right = ["Right",3];
system.ArrowKey.Right.__enum__ = system.ArrowKey;
system.KeyboardControlSystem = function(window) {
	ash.tools.ListIteratingSystem.call(this,node.KeyboardControlNode,$bind(this,this.updateNode));
	this._keyStack = new haxe.ds.GenericStack();
	window.onkeydown = $bind(this,this.onKeyDown);
	window.onkeyup = $bind(this,this.onKeyUp);
};
$hxClasses["system.KeyboardControlSystem"] = system.KeyboardControlSystem;
system.KeyboardControlSystem.__name__ = ["system","KeyboardControlSystem"];
system.KeyboardControlSystem.__super__ = ash.tools.ListIteratingSystem;
system.KeyboardControlSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	onKeyDown: function(event) {
		var _g = event.keyIdentifier;
		switch(_g) {
		case "Up":
			this._keyStack.remove(system.ArrowKey.Up);
			this._keyStack.add(system.ArrowKey.Up);
			break;
		case "Down":
			this._keyStack.remove(system.ArrowKey.Down);
			this._keyStack.add(system.ArrowKey.Down);
			break;
		case "Left":
			this._keyStack.remove(system.ArrowKey.Left);
			this._keyStack.add(system.ArrowKey.Left);
			break;
		case "Right":
			this._keyStack.remove(system.ArrowKey.Right);
			this._keyStack.add(system.ArrowKey.Right);
			break;
		}
	}
	,onKeyUp: function(event) {
		var _g = event.keyIdentifier;
		switch(_g) {
		case "Up":
			this._keyStack.remove(system.ArrowKey.Up);
			this._lockUp = false;
			break;
		case "Down":
			this._keyStack.remove(system.ArrowKey.Down);
			break;
		case "Left":
			this._keyStack.remove(system.ArrowKey.Left);
			break;
		case "Right":
			this._keyStack.remove(system.ArrowKey.Right);
			break;
		}
	}
	,updateNode: function(node,time) {
		var _g = this._keyStack.first();
		if(_g == null) {
			if(node.position.downToGround) {
				if(node.movement != null && node.movement.value != component.MovementType.Still) node.movement.set_value(component.MovementType.Still);
			}
		} else switch(_g[1]) {
		case 2:
			if(node.position.downToGround) {
				if(node.movement != null && node.movement.value != component.MovementType.Walking) node.movement.set_value(component.MovementType.Walking);
				node.velocity.xAxis--;
			}
			break;
		case 3:
			if(node.position.downToGround) {
				if(node.movement != null && node.movement.value != component.MovementType.Walking) node.movement.set_value(component.MovementType.Walking);
				node.velocity.xAxis++;
			}
			break;
		case 0:
			if(node.position.downToGround) {
				if(node.movement != null && node.movement.value != component.MovementType.Jump) node.movement.set_value(component.MovementType.Jump);
				var jumpHeight = 10 + Math.abs(node.velocity.xAxis) * .5;
				node.velocity.yAxis = Std["int"](Math.min(20,jumpHeight));
			}
			break;
		case 1:
			break;
		}
	}
	,__class__: system.KeyboardControlSystem
});
system.PhysicsSystem = function(world) {
	ash.tools.ListIteratingSystem.call(this,node.BodyNode,$bind(this,this.updateNode));
	this._world = world;
};
$hxClasses["system.PhysicsSystem"] = system.PhysicsSystem;
system.PhysicsSystem.__name__ = ["system","PhysicsSystem"];
system.PhysicsSystem.__super__ = ash.tools.ListIteratingSystem;
system.PhysicsSystem.prototype = $extend(ash.tools.ListIteratingSystem.prototype,{
	updateNode: function(node,time) {
		var vel = node.velocity;
		if(-0.01 > vel.xAxis || vel.xAxis > 0.01) {
			if(node.orientation != null) {
				if(vel.xAxis < 0 && node.orientation.value == component.Orientation.Right) node.orientation.value = component.Orientation.Left; else if(vel.xAxis > 0 && node.orientation.value == component.Orientation.Left) node.orientation.value = component.Orientation.Right;
			}
			node.position.x += vel.xAxis | 0;
			if(node.position.downToGround) vel.xAxis *= .9;
		} else vel.xAxis = 0;
		var maxY = this._world.height - node.box.height;
		var groundDistance = maxY - node.position.y;
		if(groundDistance > 0.01 || vel.yAxis > 0) {
			node.position.y -= vel.yAxis | 0;
			if(node.position.y > maxY) node.position.y = maxY;
			vel.yAxis -= 1;
			if(node.position.downToGround) node.position.downToGround = false;
		} else if(!node.position.downToGround) {
			node.position.downToGround = true;
			vel.yAxis = 0;
		}
	}
	,__class__: system.PhysicsSystem
});
system.SystemPriority = function() { };
$hxClasses["system.SystemPriority"] = system.SystemPriority;
system.SystemPriority.__name__ = ["system","SystemPriority"];
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Main.WIDTH = 800;
Main.HEIGHT = 600;
ash.core.Entity.lastId = 0;
haxe.ds.ObjectMap.count = 0;
node.BodyNode.__meta__ = { fields : { orientation : { optional : null}}};
node.DisplayNode.__meta__ = { fields : { orientation : { optional : null}, movement : { optional : null}}};
node.KeyboardControlNode.__meta__ = { fields : { movement : { optional : null}}};
system.SystemPriority.INPUT = 0;
system.SystemPriority.PHYSICS = 100;
system.SystemPriority.RENDERING = 200;
Main.main();
})();

//# sourceMappingURL=main.js.map