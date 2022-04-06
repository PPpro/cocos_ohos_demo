System.register("chunks:///_virtual/engine-info.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, LabelComponent, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "080d5NntnNJyrm5bWmi6fAY", "engine-info", undefined);

      const {
        ccclass
      } = _decorator;
      let EngineInfo = exports('EngineInfo', (_dec = ccclass('EngineInfo'), _dec(_class = class EngineInfo extends Component {
        start() {
          let engine = 'Unknown Physics Engine';

          if (window.CC_PHYSICS_BUILTIN) {
            engine = 'Built-in Collision Detection Engine';
          } else if (window.CC_PHYSICS_CANNON) {
            engine = 'Cannon.js Physics Engine';
          } else if (window.CC_PHYSICS_AMMO) {
            engine = 'Ammo.js Physics Engine';
          }

          this.node.getChildByName('EngineInfo').getComponent(LabelComponent).string = `${engine}\nYou can change this in the project settings menu`;
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/jellyfish.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec3, Quat, _decorator, Component, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "0a93azrzEdN/btLNf6splxl", "jellyfish", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      const _pos = new Vec3();

      const _quat = new Quat();

      let JellyFish = exports('JellyFish', (_dec = ccclass('JellyFish'), _dec(_class = (_class2 = (_temp = class JellyFish extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "speed", _descriptor, this);

          _initializerDefineProperty(this, "mixDuration", _descriptor2, this);

          _initializerDefineProperty(this, "range", _descriptor3, this);

          _defineProperty(this, "_dstPos", new Vec3());

          _defineProperty(this, "_dstRot", new Quat());

          _defineProperty(this, "_dir", new Vec3());

          _defineProperty(this, "_changing", true);

          _defineProperty(this, "_time", 0);
        }

        onLoad() {
          const x = Math.random() * this.range - this.range / 2;
          const y = Math.random() * this.range - this.range / 2;
          const z = Math.random() * this.range - this.range / 2;
          this.node.setPosition(x, y, z);
          this.newDst();
        }

        newDst() {
          this._dstPos.x = Math.random() * this.range - this.range / 2;
          this._dstPos.y = Math.random() * this.range - this.range / 2;
          this._dstPos.z = Math.random() * this.range - this.range / 2;
          this.node.getPosition(_pos);
          const temp = new Vec3();
          temp.set(this._dstPos);

          this._dstPos.subtract(_pos);

          this._dir.set(this._dstPos);

          this._dstPos.set(temp);

          const angle = Math.atan2(this._dir.x, this._dir.z);
          this._dstRot.x = 0;
          this._dstRot.y = 1 * Math.sin(angle / 2);
          this._dstRot.z = 0;
          this._dstRot.w = Math.cos(angle / 2);
          Quat.normalize(this._dstRot, this._dstRot); // let angle = cc.Vec3.angle(_pos, this._dstPos);
          // this._dstRot.x = _pos.x * Math.sin(angle/2);
          // this._dstRot.y = _pos.y * Math.sin(angle/2);
          // this._dstRot.z = _pos.z * Math.sin(angle/2);
          // this._dstRot.w = Math.cos(angle/2);
          // cc.Quat.normalize(this._dstRot, this._dstRot);
          // this._dstPos.sub(_pos, this._dir);

          this._dir.normalize();

          this._dir.multiplyScalar(this.speed);

          this._changing = true;
          this._time = 0;
        }

        update(dt) {
          this._time += dt;

          if (this._changing) {
            if (this._time >= this.mixDuration) {
              this.node.setRotation(this._dstRot);
              this._changing = false;
            } else {
              const ratio = this._time / this.mixDuration;
              this.node.getRotation(_quat);

              _quat.lerp(this._dstRot, ratio);

              this.node.setRotation(_quat);
            }
          }

          this.node.getPosition(_pos);

          _pos.add(this._dir);

          this.node.setPosition(_pos);

          _pos.subtract(this._dstPos);

          if (_pos.length() < 5) {
            this.newDst();
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.01;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mixDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "range", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/emitter.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec3, EffectAsset, _decorator, Color, Component, utils, primitives, Node, ModelComponent, Material, SphereColliderComponent, math, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      EffectAsset = module.EffectAsset;
      _decorator = module._decorator;
      Color = module.Color;
      Component = module.Component;
      utils = module.utils;
      primitives = module.primitives;
      Node = module.Node;
      ModelComponent = module.ModelComponent;
      Material = module.Material;
      SphereColliderComponent = module.SphereColliderComponent;
      math = module.math;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

      cclegacy._RF.push({}, "0be61hmDlxF0LIemE0HrRrM", "emitter", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let hintMesh;
      let sphereMesh;

      const outOfBounds = (v, border = 20) => Math.abs(v.x) > border || Math.abs(v.y) > border || Math.abs(v.z) > border;

      const v3_1 = new Vec3();

      class Element extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "velocity", new Vec3());

          _defineProperty(this, "color", new Color());

          _defineProperty(this, "collided", false);

          _defineProperty(this, "framesRemaining", 0);

          _defineProperty(this, "pass", null);

          _defineProperty(this, "hColor", 0);
        }

      } // encapsulate an interesting emitter, emitted particles will
      // annihilate after collision, if satisfying filter condition


      let Emitter = exports('Emitter', (_dec = ccclass('Emitter'), _dec2 = property(EffectAsset), _dec(_class = (_class2 = (_temp = class Emitter extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "poolSize", _descriptor, this);

          _initializerDefineProperty(this, "group", _descriptor2, this);

          _initializerDefineProperty(this, "mask", _descriptor3, this);

          _initializerDefineProperty(this, "leftAngle", _descriptor4, this);

          _initializerDefineProperty(this, "rightAngle", _descriptor5, this);

          _initializerDefineProperty(this, "color", _descriptor6, this);

          _initializerDefineProperty(this, "effectAsset", _descriptor7, this);

          _defineProperty(this, "_deadpool", []);

          _defineProperty(this, "_livepool", []);
        } // generate everything procedurally


        start() {
          if (!hintMesh) {
            hintMesh = utils.createMesh(primitives.capsule(1));
            sphereMesh = utils.createMesh(primitives.sphere(1));
          } // emitter hint


          const hint = new Node();
          const hintModel = hint.addComponent(ModelComponent);
          const hintMat = new Material();
          hintMat.initialize({
            effectName: 'builtin-standard'
          });
          const hintColor = this.color.clone();
          hintColor.a = 255;
          hintMat.setProperty('albedo', hintColor);
          hintMat.setProperty('metallic', 0.1);
          hintModel.material = hintMat;
          hintModel.mesh = hintMesh;
          hint.parent = this.node; // elements

          for (let i = 0; i < this.poolSize; i++) {
            const node = new Node();
            node.parent = this.node; // element info

            const info = node.addComponent(Element);
            info.color.set(this.color); // model

            const model = node.addComponent(ModelComponent);
            const mat = new Material();
            mat.initialize({
              effectName: 'builtin-standard',
              technique: 1 // transparent

            });
            mat.setProperty('metallic', 0.1);
            info.pass = mat.passes[0];
            info.hColor = info.pass.getHandle('albedo');
            info.pass.setUniform(info.hColor, info.color);
            model.material = mat;
            model.mesh = sphereMesh; // collider

            const col = node.addComponent(SphereColliderComponent);
            col.radius = 1;
            col.isTrigger = true;
            col.setGroup(this.group);
            col.setMask(this.mask);
            col.on('onTriggerEnter', e => {
              const collider = e.selfCollider;
              const ele = collider.node.getComponent(Element);

              if (ele.collided) {
                return;
              }

              ele.color.a = 255;
              ele.pass.setUniform(ele.hColor, ele.color);
              ele.collided = true;
              ele.framesRemaining = 5;
              Vec3.set(ele.velocity, 0, 0, 0);
              collider.setGroup(0);
              collider.setMask(0);
            }); // store

            node.active = false;

            this._deadpool.push(info);
          }
        }

        update() {
          for (let i = 0; i < this._livepool.length; i++) {
            const ele = this._livepool[i];

            if (ele.collided) {
              if (ele.framesRemaining-- <= 0) {
                this.reap(ele);
              }
            } else {
              Vec3.add(v3_1, ele.node.position, ele.velocity);
              ele.node.setPosition(v3_1);

              if (outOfBounds(v3_1)) {
                this.reap(ele);
              }
            }
          }

          if (this._deadpool.length > 0) {
            this.resurrect();
          } // for (let i = 0; i < this._deadpool.length; i++) this.resurrect();

        }

        reap(ele) {
          ele.node.active = false;

          this._livepool.splice(this._livepool.indexOf(ele), 1);

          this._deadpool.push(ele);
        }

        reapAll() {
          for (let i = 0; i < this._livepool.length; i++) {
            const ele = this._livepool[i];
            ele.node.active = false;

            this._deadpool.push(ele);
          }

          this._livepool.length = 0;
        }

        resurrect() {
          const ele = this._deadpool.pop();

          const theta = math.toRadian(math.randomRange(this.leftAngle, this.rightAngle));
          const phi = math.randomRange(1, 2);
          const speed = math.randomRange(0.1, 0.3);
          Vec3.set(ele.velocity, Math.cos(theta) * Math.sin(phi) * speed, Math.cos(phi) * speed, Math.sin(theta) * Math.sin(phi) * speed);
          ele.color.a = this.color.a;
          ele.collided = false;
          ele.pass.setUniform(ele.hColor, ele.color);
          const col = ele.node.getComponent(SphereColliderComponent);
          col.setGroup(this.group);
          col.setMask(this.mask);
          ele.node.setPosition(0, 0, 0);

          this._livepool.push(ele);

          ele.node.active = true;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "poolSize", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "group", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "mask", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leftAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rightAngle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "color", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Color();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "effectAsset", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/rotor.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "16cc7mJ/bNIUKCCsSKIjPsT", "rotor", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Rotor = exports('Rotor', (_dec = ccclass('Rotor'), _dec(_class = (_class2 = (_temp = class Rotor extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "speed", _descriptor, this);
        }

        update(deltaTime) {
          const eu = this.node.eulerAngles;
          this.node.setRotationFromEuler(eu.x, eu.y + deltaTime * this.speed, eu.z);
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sponza.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, Color, director, CameraComponent, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
      director = module.director;
      CameraComponent = module.CameraComponent;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "1888cpVdmdHxJvW19Vw6mV2", "sponza", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Sponza = exports('Sponza', (_dec = ccclass('Sponza'), _dec(_class = (_class2 = (_temp = class Sponza extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "loopTime", _descriptor, this);

          _initializerDefineProperty(this, "maxIllum", _descriptor2, this);

          _defineProperty(this, "ambient", void 0);

          _defineProperty(this, "halfLoopTime", 0);

          _defineProperty(this, "camera", void 0);

          _defineProperty(this, "color", new Color());
        }

        start() {
          this.ambient = director.root.pipeline.pipelineSceneData.ambient;
          this.halfLoopTime = this.loopTime * 0.5;
          this.camera = this.node.getComponent(CameraComponent);
        }

        update(deltaTime) {
          let illum = 0;
          const t = director.getTotalFrames() % this.loopTime;

          if (t > this.halfLoopTime) {
            illum = Math.sin((t - this.halfLoopTime) / this.halfLoopTime * Math.PI);
          }

          this.ambient.skyIllum = illum * this.maxIllum;
          this.color.r = this.color.g = this.color.b = illum * 255;
          this.camera.clearColor = this.color;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loopTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 3600;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxIllum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20000;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BladeStorm.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Prefab, Node, _decorator, instantiate, Component, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _class, _descriptor, _descriptor2, _temp, _dec2, _dec3, _dec4, _class3, _class4, _descriptor3, _descriptor4, _temp2;

      cclegacy._RF.push({}, "19951pxMERHsK5hIrDxX1BZ", "BladeStorm", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      var SkilType;

      (function (SkilType) {
        SkilType[SkilType["SELF"] = 0] = "SELF";
        SkilType[SkilType["ENEMY"] = 1] = "ENEMY";
      })(SkilType || (SkilType = {}));

      let Fight = (_dec = property(Prefab), (_class = (_temp = class Fight {
        constructor() {
          _initializerDefineProperty(this, "type", _descriptor, this);

          _initializerDefineProperty(this, "effect", _descriptor2, this);
        }

        explo() {
          const effect = instantiate(this.effect);
          effect.setWorldPosition(0, 0, 0);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "type", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return SkilType.SELF;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "effect", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class));
      let BladeStorm = exports('BladeStorm', (_dec2 = ccclass('BladeStorm'), _dec3 = property([Prefab]), _dec4 = property([Node]), _dec2(_class3 = (_class4 = (_temp2 = class BladeStorm extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "effect", _descriptor3, this);

          _initializerDefineProperty(this, "Point", _descriptor4, this);
        } // @property(Prefab)
        // new_one: Prefab = null;
        // @property(fight)
        // fight1: fight=null;

        /*get bbb(){
            return this._aaa;
        }
          set bbb (value){
            this._aaa = value;
          }
          _aaa = '';*/


        fire() {
          // console.log('comming');
          if (!this.enabled) {
            return;
          }

          const new_one = instantiate(this.effect[0]);
          new_one.setParent(this.node.parent);
          new_one.setWorldPosition(1, 7, 20); // const self_blade = instantiate(this.effect[6]) as Node;
          // self_blade.setParent(this.node.parent);
          // self_blade.setWorldPosition(1,2,3);

          const point1 = instantiate(this.effect[2]);
          point1.setParent(this.Point[0]);
          point1.setWorldPosition(this.Point[0].getWorldPosition());
          const point2 = instantiate(this.effect[1]);
          point2.setParent(this.Point[1]);
          point2.setWorldPosition(this.Point[1].getWorldPosition());
          const point3 = instantiate(this.effect[2]);
          point3.setParent(this.Point[2]);
          point3.setWorldPosition(this.Point[2].getWorldPosition()); // const CFD = instantiate(this.effect[3]) as Node;
          // CFD.setParent(this.node.parent);
          // CFD.setWorldPosition(CFD.getPosition(this.Point[0]));
        }

        ring() {
          if (!this.enabled) {
            return;
          }

          const point4 = instantiate(this.effect[3]);
          point4.setParent(this.node.parent);
          point4.setWorldPosition(1, 2, 4.5);
          const point5 = instantiate(this.effect[4]);
          point5.setParent(this.node.parent);
          point5.setWorldPosition(1, 2, 4.5);
          /*setTimeout(() => {
              this.node
          }, 1000);  */
        }
        /*heal(){
            //console.log('comming');
            const new_one = instantiate(this.effect[2]) as Node;
            new_one.setParent(this.node.parent);
            new_one.setWorldPosition(1,2,3);
        }*/
        // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _temp2), (_descriptor3 = _applyDecoratedDescriptor(_class4.prototype, "effect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, "Point", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class4)) || _class3));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ground.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Node, _decorator, Component, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "22c90hEyfxHvbY8lQgqlkQ+", "ground", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      const sineLerp = (b, e, t) => {
        return b + (e - b) * (Math.sin((t - 0.5) * Math.PI) + 1) * 0.5;
      };

      let PhysicsGround = exports('PhysicsGround', (_dec = ccclass('PhysicsGround'), _dec2 = property(Node), _dec(_class = (_class2 = (_temp = class PhysicsGround extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spinDuration", _descriptor, this);

          _initializerDefineProperty(this, "spinInterval", _descriptor2, this);

          _initializerDefineProperty(this, "manualSpinSliderNode", _descriptor3, this);

          _defineProperty(this, "_time", 0);

          _defineProperty(this, "_angle", 0);

          _defineProperty(this, "_autoSpin", true);
        }

        update(deltaTime) {
          // spin once in a while
          if (this._autoSpin) {
            this._time += deltaTime;
            const t = Math.min(this.spinInterval - this._time % this.spinInterval, this.spinDuration);
            const back = Math.floor(this._time / this.spinInterval) % 2;
            this._angle = sineLerp(back ? 0 : 180, back ? 180 : 0, t / this.spinDuration);
          }

          this.node.setRotationFromEuler(0, 0, this._angle);
        } // toggle callback


        toggleSpin(e) {
          this._autoSpin = e.isChecked;
          this.manualSpinSliderNode.active = !e.isChecked;
        } // slider callback


        setAngle(e) {
          this._angle = (0.5 - e.progress) * 180;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spinDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spinInterval", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "manualSpinSliderNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/toggler.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "32abfv2Y8dPZK9pOrJO0y5M", "toggler", undefined);

      const {
        ccclass
      } = _decorator;
      let Toggler = exports('Toggler', (_dec = ccclass('Toggler'), _dec(_class = class Toggler extends Component {
        toggleActive() {
          this.node.active = !this.node.active;
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/unlit-quad.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, gfx, Vec3, SpriteFrame, Texture2D, _decorator, ModelComponent, Material, utils, builtinResMgr, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      gfx = module.gfx;
      Vec3 = module.Vec3;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      _decorator = module._decorator;
      ModelComponent = module.ModelComponent;
      Material = module.Material;
      utils = module.utils;
      builtinResMgr = module.builtinResMgr;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "39202sHQERK85gaOXtKVrbH", "unlit-quad", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let mesh = null;
      let vbInfo = null;
      let vbuffer = null;
      let material = null;
      const materialInfo = {
        effectName: 'unlit',
        technique: 0,
        defines: {
          USE_TEXTURE: true
        },
        states: {
          rasterizerState: {
            cullMode: gfx.CullMode.NONE
          }
        }
      };
      const default_uvs = [0, 1, 1, 1, 0, 0, 1, 0];
      const meshInfo = {
        positions: [-0.5, -0.5, 0, // bottom-left
        0.5, -0.5, 0, // bottom-right
        -0.5, 0.5, 0, // top-left
        0.5, 0.5, 0 // top-right
        ],
        uvs: default_uvs,
        indices: [0, 1, 2, 2, 1, 3],
        minPos: new Vec3(-0.5, -0.5, 0),
        maxPos: new Vec3(0.5, 0.5, 0)
      };
      const enableBlend = {
        blendState: {
          targets: [{
            blend: true,
            blendSrc: gfx.BlendFactor.SRC_ALPHA,
            blendDst: gfx.BlendFactor.ONE_MINUS_SRC_ALPHA,
            blendDstAlpha: gfx.BlendFactor.ONE_MINUS_SRC_ALPHA
          }]
        }
      };
      let UnlitQuadComponent = exports('UnlitQuadComponent', (_dec = ccclass('UnlitQuadComponent'), _dec2 = property(SpriteFrame), _dec3 = property(Texture2D), _dec4 = property({
        override: true,
        visible: false
      }), _dec5 = property({
        override: true,
        visible: false
      }), _dec6 = property({
        type: Texture2D
      }), _dec7 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = class UnlitQuadComponent extends ModelComponent {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "_sprite", _descriptor, this);

          _initializerDefineProperty(this, "_texture", _descriptor2, this);

          _initializerDefineProperty(this, "_transparent", _descriptor3, this);
        }

        set sharedMaterials(val) {
          super.sharedMaterials = val;
        }

        get sharedMaterials() {
          return super.sharedMaterials;
        }

        set mesh(val) {
          super.mesh = val;
        }

        get mesh() {
          return super.mesh;
        }

        set texture(val) {
          this._texture = val;
          this.updateTexture();
        }

        get texture() {
          return this._texture;
        }

        set spriteFrame(val) {
          this._sprite = val;
          this.updateTexture();
        }

        get spriteFrame() {
          return this._sprite;
        }

        set transparent(val) {
          this._transparent = val;
          this.material.overridePipelineStates(val ? enableBlend : {});
        }

        get transparent() {
          return this._transparent;
        }

        onLoad() {
          if (!material) {
            material = new Material();
            material.initialize(materialInfo);
            mesh = utils.createMesh(meshInfo);
            vbInfo = mesh.struct.vertexBundles[0].view;
            vbuffer = mesh.data.buffer.slice(vbInfo.offset, vbInfo.offset + vbInfo.length);
          }

          this.material = material;
          this._mesh = mesh;
          super.onLoad();
          this.updateTexture();
          this.transparent = this._transparent;
        }

        updateTexture() {
          // update pass
          const pass = this.material && this.material.passes[0];
          const binding = pass && pass.getBinding('mainTexture');

          if (typeof binding !== 'number') {
            return;
          }

          const target = this._sprite ? this._sprite : this._texture ? this._texture : builtinResMgr.get('grey-texture');
          pass.bindTexture(binding, target.getGFXTexture()); // update UV (handle atlas)

          const model = this.model && this.model.subModels[0];
          const ia = model && model.inputAssembler;

          if (!ia) {
            return;
          }

          let uv = default_uvs;

          if (this._sprite) {
            this._sprite._calculateUV();

            uv = this._sprite.uv;
          }

          let offset = 0;
          let format = gfx.Format.UNKNOWN;

          for (const a of ia.attributes) {
            if (a.name === gfx.AttributeName.ATTR_TEX_COORD) {
              format = a.format;
              break;
            }

            offset += gfx.FormatInfos[a.format].size;
          }

          const vb = ia.vertexBuffers[0];
          utils.writeBuffer(new DataView(vbuffer), uv, format, offset, vb.stride);
          vb.update(vbuffer);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "_sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_texture", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "sharedMaterials", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "sharedMaterials"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "mesh", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "mesh"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "texture", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "texture"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "spriteFrame"), _class2.prototype), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "_transparent", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "transparent", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "transparent"), _class2.prototype)), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/healspell.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Prefab, Node, _decorator, Component, instantiate, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "407b91FraxBopu0dt4vtVYA", "healspell", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let HealSpell = exports('HealSpell', (_dec = ccclass('HealSpell'), _dec2 = property([Prefab]), _dec3 = property([Node]), _dec(_class = (_class2 = (_temp = class HealSpell extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "effect", _descriptor, this);

          _initializerDefineProperty(this, "Point", _descriptor2, this);
        }

        heal() {
          if (!this.enabled) {
            return;
          }

          const point0 = instantiate(this.effect[0]);
          point0.setParent(this.node);
          point0.setPosition(0, 0, 0);
          const point1 = instantiate(this.effect[1]);
          point1.setParent(this.Point[0]);
          point1.setWorldPosition(this.Point[0].getWorldPosition());
          const point2 = instantiate(this.effect[2]);
          point2.setParent(this.Point[1]);
          point2.setWorldPosition(this.Point[1].getWorldPosition());
          const point3 = instantiate(this.effect[1]);
          point3.setParent(this.Point[2]);
          point3.setWorldPosition(this.Point[2].getWorldPosition());
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "effect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "Point", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pre-filter-envmap.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Quat, gfx, EffectAsset, _decorator, Component, CameraComponent, Material, ModelComponent, utils, primitives, director, TextureCube, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      gfx = module.gfx;
      EffectAsset = module.EffectAsset;
      _decorator = module._decorator;
      Component = module.Component;
      CameraComponent = module.CameraComponent;
      Material = module.Material;
      ModelComponent = module.ModelComponent;
      utils = module.utils;
      primitives = module.primitives;
      director = module.director;
      TextureCube = module.TextureCube;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "41074J7W0lCe40VLTiO+Uxi", "pre-filter-envmap", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const rotations = [Quat.fromEuler(new Quat(), 0, -90, 180), // +X
      Quat.fromEuler(new Quat(), 0, 90, 180), // -X
      Quat.fromEuler(new Quat(), -90, 180, 180), // +Y
      Quat.fromEuler(new Quat(), 90, 180, 180), // -Y
      Quat.fromEuler(new Quat(), 0, 180, 180), // +Z
      Quat.fromEuler(new Quat(), 0, 0, 180) // -Z
      ];
      const readRegions = [new gfx.BufferTextureCopy()];
      readRegions[0].texExtent.depth = 1;
      const writeRegions = [new gfx.BufferTextureCopy()];
      writeRegions[0].texExtent.depth = 1;
      writeRegions[0].texSubres.layerCount = 6; // 6 faces

      function getMipLevel(size) {
        let level = 0;

        while (size) {
          size >>= 1;
          level++;
        }

        return level;
      }

      let PreFilterEnvmap = exports('PreFilterEnvmap', (_dec = ccclass('PreFilterEnvmap'), _dec2 = property(EffectAsset), _dec(_class = (_class2 = (_temp = class PreFilterEnvmap extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "effect", _descriptor, this);

          _initializerDefineProperty(this, "blurriness", _descriptor2, this);

          _defineProperty(this, "_camera", null);

          _defineProperty(this, "_material", null);

          _defineProperty(this, "_renderTarget", null);
        }

        onLoad() {
          this._camera = this.node.getComponentInChildren(CameraComponent);
          this._renderTarget = this._camera.targetTexture;
          this._material = new Material();

          this._material.initialize({
            effectAsset: this.effect,
            states: {
              rasterizerState: {
                cullMode: gfx.CullMode.FRONT
              },
              depthStencilState: {
                depthTest: false,
                depthWrite: false
              }
            }
          });

          const modelComp = this.node.addComponent(ModelComponent);
          modelComp.mesh = utils.createMesh(primitives.box({
            width: 2,
            height: 2,
            length: 2
          }));
          modelComp.material = this._material;
        }

        start() {
          {
            const skybox = director.root.pipeline.pipelineSceneData.skybox;
            skybox.envmap = this.filter(skybox.envmap); // skybox.isRGBE = false;
          }
        } // WebGL doesn't support using custom mipmap level in framebuffer attachments,
        // so we'll have to do this the hard way (read back and upload again)


        filter(envmap) {
          this.node.active = true;
          envmap.setMipFilter(TextureCube.Filter.LINEAR);
          let size = envmap.width; // has to be square

          const camera = this._camera.camera;
          const readRegion = readRegions[0];
          const writeRegion = writeRegions[0];
          const mipLevel = getMipLevel(size);
          const newEnvMap = new TextureCube();
          const pass = this._material.passes[0];
          const handle = pass.getHandle('roughness');
          this.node.setScale(1, director.root.device.capabilities.clipSpaceSignY, 1); // GL-specific: flip both model and camera so front face stays the same

          camera.scene.update(0); // should update scene after flipping

          newEnvMap.reset({
            width: size,
            height: size,
            mipmapLevel: mipLevel
          });
          newEnvMap.isRGBE = true;

          for (let m = 0; m < mipLevel; m++) {
            // need to resize both window and camera
            camera.window.resize(size, size);
            camera.resize(size, size);
            readRegion.texExtent.width = readRegion.texExtent.height = size;
            writeRegion.texExtent.width = writeRegion.texExtent.height = size;
            writeRegion.texSubres.mipLevel = m;
            pass.setUniform(handle, this.blurriness + m / (mipLevel - 1) * (1 - this.blurriness));
            pass.update();
            const length = size * size * 4;
            const buffers = [];

            for (let i = 0; i < 6; i++) {
              buffers[i] = new Uint8Array(length);

              this._camera.node.setRotation(rotations[i]);

              this._camera.camera.update();

              director.root.pipeline.render([camera]);
              director.root.device.copyTextureToBuffers(camera.window.framebuffer.colorTextures[0], [buffers[i]], readRegions);
            }

            director.root.device.copyBuffersToTexture(buffers, newEnvMap.getGFXTexture(), writeRegions);
            size >>= 1;
          }

          this.node.active = false;
          newEnvMap.setMipFilter(TextureCube.Filter.LINEAR);
          return newEnvMap;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "effect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blurriness", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/first-person-camera.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec2, Vec3, Quat, KeyCode, _decorator, Component, systemEvent, SystemEvent, game, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      KeyCode = module.KeyCode;
      _decorator = module._decorator;
      Component = module.Component;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      game = module.game;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "41634RuzwBMPotfcRtAog7n", "first-person-camera", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const v2_1 = new Vec2();
      const v2_2 = new Vec2();
      const v3_1 = new Vec3();
      const qt_1 = new Quat();
      const KEYCODE = {
        W: 'W'.charCodeAt(0),
        S: 'S'.charCodeAt(0),
        A: 'A'.charCodeAt(0),
        D: 'D'.charCodeAt(0),
        Q: 'Q'.charCodeAt(0),
        E: 'E'.charCodeAt(0),
        SHIFT: KeyCode.SHIFT_LEFT
      };
      let FirstPersonCamera = exports('FirstPersonCamera', (_dec = property({
        slide: true,
        range: [0.05, 0.5, 0.01]
      }), ccclass(_class = (_class2 = (_temp = class FirstPersonCamera extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "moveSpeed", _descriptor, this);

          _initializerDefineProperty(this, "moveSpeedShiftScale", _descriptor2, this);

          _initializerDefineProperty(this, "damp", _descriptor3, this);

          _initializerDefineProperty(this, "rotateSpeed", _descriptor4, this);

          _defineProperty(this, "_euler", new Vec3());

          _defineProperty(this, "_velocity", new Vec3());

          _defineProperty(this, "_position", new Vec3());

          _defineProperty(this, "_speedScale", 1);
        }

        onLoad() {
          systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.on(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          Vec3.copy(this._euler, this.node.eulerAngles);
          Vec3.copy(this._position, this.node.position);
        }

        onDestroy() {
          systemEvent.off(SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          systemEvent.off(SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          systemEvent.off(SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        update(dt) {
          const t = Math.min(dt / this.damp, 1); // position

          Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
          Vec3.lerp(v3_1, this.node.position, this._position, t);
          this.node.setPosition(v3_1); // rotation

          Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
          Quat.slerp(qt_1, this.node.rotation, qt_1, t);
          this.node.setRotation(qt_1);
        }

        onMouseWheel(e) {
          const delta = -e.getScrollY() * this.moveSpeed * 0.1; // delta is positive when scroll down

          Vec3.transformQuat(v3_1, Vec3.UNIT_Z, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this.node.position, v3_1, delta);
        }

        onKeyDown(e) {
          const v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = this.moveSpeedShiftScale;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z === 0) {
              v.z = -1;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z === 0) {
              v.z = 1;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x === 0) {
              v.x = -1;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x === 0) {
              v.x = 1;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y === 0) {
              v.y = -1;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y === 0) {
              v.y = 1;
            }
          }
        }

        onKeyUp(e) {
          const v = this._velocity;

          if (e.keyCode === KEYCODE.SHIFT) {
            this._speedScale = 1;
          } else if (e.keyCode === KEYCODE.W) {
            if (v.z < 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.S) {
            if (v.z > 0) {
              v.z = 0;
            }
          } else if (e.keyCode === KEYCODE.A) {
            if (v.x < 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.D) {
            if (v.x > 0) {
              v.x = 0;
            }
          } else if (e.keyCode === KEYCODE.Q) {
            if (v.y < 0) {
              v.y = 0;
            }
          } else if (e.keyCode === KEYCODE.E) {
            if (v.y > 0) {
              v.y = 0;
            }
          }
        }

        onTouchStart(e) {
          if (game.canvas.requestPointerLock) {
            game.canvas.requestPointerLock();
          }
        }

        onTouchMove(e) {
          e.getStartLocation(v2_1);

          if (v2_1.x > game.canvas.width * 0.4) {
            // rotation
            e.getDelta(v2_2);
            this._euler.y -= v2_2.x * this.rotateSpeed * 0.1;
            this._euler.x += v2_2.y * this.rotateSpeed * 0.1;
          } else {
            // position
            e.getLocation(v2_2);
            Vec2.subtract(v2_2, v2_2, v2_1);
            this._velocity.x = v2_2.x * 0.01;
            this._velocity.z = -v2_2.y * 0.01;
          }
        }

        onTouchEnd(e) {
          if (document.exitPointerLock) {
            document.exitPointerLock();
          }

          e.getStartLocation(v2_1);

          if (v2_1.x < game.canvas.width * 0.4) {
            // position
            this._velocity.x = 0;
            this._velocity.z = 0;
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeedShiftScale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "damp", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rotateSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/scenelist.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Prefab, _decorator, Component, instantiate, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "56ce0MAdDJH2qBewyMuTQnW", "scenelist", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const sceneArray = exports('sceneArray', []);
      let SceneManager = exports('SceneManager', (_dec = ccclass('SceneManager'), _dec2 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_temp = class SceneManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "itemPrefab", _descriptor, this);
        }

        onLoad() {
          if (this.itemPrefab) {
            for (let i = 0; i < sceneArray.length; i++) {
              const item = instantiate(this.itemPrefab);
              this.node.addChild(item);
            }
          }
        }

        start() {}

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SSS.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, ModelComponent, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      ModelComponent = module.ModelComponent;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "5d0e06TqCJOgYWfO1jCim+/", "SSS", undefined);

      const {
        ccclass
      } = _decorator;
      let SSS = exports('SSS', (_dec = ccclass('SSS'), _dec(_class = (_temp = class SSS extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_handle", null);

          _defineProperty(this, "_pass", null);
        }

        start() {
          const mat = this.node.getComponent(ModelComponent).material;
          this._pass = mat.passes[0];
          this._handle = this._pass.getHandle('scattering');
        }

        setSSSIntensity(e) {
          this._pass.setUniform(this._handle, e.progress);
        }

        toggle(e) {
          this.node.active = e.isChecked;
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-info.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, ModelComponent, _decorator, Component, director, GFXAPI, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      ModelComponent = module.ModelComponent;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
      GFXAPI = module.GFXAPI;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "645d28UJBFHjpWnseLAQxX2", "debug-info", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let gl = null;
      let DebugInfo = exports('DebugInfo', (_dec = ccclass('DebugInfo'), _dec2 = property([ModelComponent]), _dec(_class = (_class2 = (_temp = class DebugInfo extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "targets", _descriptor, this);
        }

        printActiveUniforms() {
          if (director.root.device.gfxAPI === GFXAPI.WEBGL || director.root.device.gfxAPI === GFXAPI.WEBGL2) {
            this.targets.forEach(comp => {
              console.log(comp.node.name, '---------------------------------------'); // @ts-ignore

              const psoCI = comp._model._subModels[0]._psoCreateInfos[0];
              gl = director.root.device.gl;
              const shader = psoCI.shader.gpuShader;
              shader.glBlocks.reduce((acc, cur) => acc.concat(cur.glActiveUniforms), []).forEach(u => {
                const data = gl.getUniform(shader.glProgram, gl.getUniformLocation(shader.glProgram, u.name));
                console.log(u.name, Array.from(data).reduce((acc, cur) => `${acc} ${cur.toFixed(2)}`, ''));
              });
            });
          }

          console.log('scene', director.root.scenes);
          console.log('window', director.root.windows);
          console.log('view', director.root.views);
        }

        printJointsTexture() {
          // @ts-ignore
          const info = director.root.dataPoolManager.jointTexturePool._pool._chunks[0].texture;
          const texture = info._gpuTexture.glTexture;
          const pixels = new Float32Array(info.width * info.height * 4);
          const fb = gl.createFramebuffer();
          gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          gl.readPixels(0, 0, info.width, info.height, gl.RGBA, gl.FLOAT, pixels);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          let str = '';

          for (let i = 0; i < pixels.length; i++) {
            str += pixels[i] + ' ';

            if ((i + 1) % 12 === 0) {
              str += '\n';
            }
          }

          console.log(str);
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "targets", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/instanced-skinning.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './unlit-quad.ts'], function (exports) {
  'use strict';

  var cclegacy, Prefab, Texture2D, Node, _decorator, Component, director, gfx, instantiate, SkeletalAnimationComponent, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, UnlitQuadComponent;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Texture2D = module.Texture2D;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
      gfx = module.gfx;
      instantiate = module.instantiate;
      SkeletalAnimationComponent = module.SkeletalAnimationComponent;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      UnlitQuadComponent = module.UnlitQuadComponent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "68c59n+01ZPy5jl1xY5mn38", "instanced-skinning", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let InstancedSkinning = exports('InstancedSkinning', (_dec = ccclass('InstancedSkinning'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property([Texture2D]), _dec5 = property(Node), _dec(_class = (_class2 = (_temp = class InstancedSkinning extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "baseline", _descriptor, this);

          _initializerDefineProperty(this, "testgroup", _descriptor2, this);

          _initializerDefineProperty(this, "labelImages", _descriptor3, this);

          _initializerDefineProperty(this, "maxGroupCount", _descriptor4, this);

          _initializerDefineProperty(this, "baselineVisible", _descriptor5, this);

          _initializerDefineProperty(this, "_groupCount", _descriptor6, this);

          _initializerDefineProperty(this, "groupPerColumn", _descriptor7, this);

          _initializerDefineProperty(this, "warningSign", _descriptor8, this);

          _defineProperty(this, "_baselineNode", null);

          _defineProperty(this, "_testNodes", []);

          _defineProperty(this, "_nameLabels", []);
        }

        set groupCount(val) {
          this._groupCount = val;

          this._updateGroups();
        }

        get groupCount() {
          return this._groupCount;
        }

        start() {
          // clamp the initial count if instancing is not supported
          if (!director.root.device.hasFeature(gfx.Feature.INSTANCED_ARRAYS)) {
            this._groupCount = Math.min(this._groupCount, 1);

            if (this.warningSign) {
              this.warningSign.active = true;
            }
          }

          this._baselineNode = this._initGroup('Baseline', this.baseline, 0);

          this._updateGroups();

          this._baselineNode.active = this.baselineVisible;
        }

        toggleBaselineGroup(e) {
          this._baselineNode.active = e.isChecked;
        }

        toggleAnimNames(e) {
          for (let i = 0; i < this._nameLabels.length; i++) {
            this._nameLabels[i].active = e.isChecked;
          }
        }

        setGroups(e) {
          this.groupCount = Math.floor(e.progress * this.maxGroupCount);
        }

        _updateGroups() {
          for (let i = 0; i < this._groupCount; i++) {
            if (this._testNodes[i]) {
              this._testNodes[i].active = true;
            } else {
              this._testNodes.push(this._initGroup('TestGroup', this.testgroup, 5 * (i + 1)));
            }
          }

          for (let i = this._groupCount; i < this._testNodes.length; i++) {
            this._testNodes[i].active = false;
          }
        }

        _initGroup(name, prefab, posZ) {
          const len = this.labelImages.length;
          const group = new Node(name);
          group.parent = this.node.scene;

          for (let i = 0; i < len; i++) {
            const posX = Math.floor(posZ / this.groupPerColumn) * 30 + i * 3;
            const inst = instantiate(prefab);
            inst.setPosition(posX, 0, posZ % this.groupPerColumn);
            inst.parent = group;
            const label = inst.getChildByName('Label').getComponent(UnlitQuadComponent);
            label.texture = this.labelImages[i];

            this._nameLabels.push(label.node);

            const animComp = inst.getChildByName('Model').getComponent(SkeletalAnimationComponent);
            const clipName = inst.name = animComp.clips[i].name;
            animComp.play(clipName);
          }

          return group;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "baseline", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "testgroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "labelImages", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "maxGroupCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "baselineVisible", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return true;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_groupCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "groupPerColumn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 100;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "groupCount", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "groupCount"), _class2.prototype), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "warningSign", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/spawn.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './jellyfish.ts'], function (exports) {
  'use strict';

  var cclegacy, Prefab, _decorator, Component, instantiate, _applyDecoratedDescriptor, _initializerDefineProperty, JellyFish;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      JellyFish = module.JellyFish;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "6b7aeXx11NGZLgGo51ugQp9", "spawn", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Spawn = exports('Spawn', (_dec = ccclass('Spawn'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_temp = class Spawn extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefab", _descriptor, this);

          _initializerDefineProperty(this, "count", _descriptor2, this);

          _initializerDefineProperty(this, "range", _descriptor3, this);
        }

        start() {
          for (let i = 0; i < this.count; ++i) {
            setTimeout(() => {
              if (!this.prefab) {
                return;
              }

              const node = instantiate(this.prefab);
              node.getComponent(JellyFish).range = this.range;
              this.node.addChild(node);
            }, Math.random() * 3000);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "count", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "range", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/geometries.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, Color, utils, primitives, Node, ModelComponent, Material, math, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      Color = module.Color;
      utils = module.utils;
      primitives = module.primitives;
      Node = module.Node;
      ModelComponent = module.ModelComponent;
      Material = module.Material;
      math = module.math;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "6bb243zHfFJi4MLeBdak3WZ", "geometries", undefined);

      const {
        ccclass
      } = _decorator;
      let Geometries = exports('Geometries', (_dec = ccclass('Geometries'), _dec(_class = class Geometries extends Component {
        start() {
          this.node.removeAllChildren();
          const rows = 7;
          const cols = 7;
          const stride = 2.5;
          const albedo = new Color(128, 0, 0);
          const meshSphere = utils.createMesh(primitives.sphere(1, {
            segments: 64
          }));

          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              const node = new Node();
              node.parent = this.node;
              node.setPosition((j - Math.floor(cols / 2)) * stride, (i - Math.floor(rows / 2)) * stride, 0);
              const comp = node.addComponent(ModelComponent);
              comp.mesh = meshSphere;
              const m = new Material();
              m.initialize({
                effectName: 'builtin-standard'
              });
              m.setProperty('roughness', math.clamp(j / cols, 0.05, 1));
              m.setProperty('metallic', i / rows);
              m.setProperty('albedo', albedo);
              comp.material = m;
            }
          }
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/exposure.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, director, CameraComponent, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
      CameraComponent = module.CameraComponent;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "7c4317ZMDtPHJt4D9cpx/a0", "exposure", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Exposure = exports('Exposure', (_dec = ccclass('Exposure'), _dec(_class = (_temp = class Exposure extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_ambient", null);

          _defineProperty(this, "_camera", null);
        }

        start() {
          const scene = this.node.scene;
          const pipeline = director.root.pipeline;
          this._ambient = pipeline.pipelineSceneData.ambient;
          this._camera = scene.getComponentInChildren(CameraComponent).camera;
        }

        setSkyIllumination(e) {
          this._ambient.skyIllum = Math.pow(2, e.progress * 30.46); // default illum 38400, at progress 0.5
        }

        setExposure(e) {
          this._camera.aperture = Math.floor((1 - e.progress) * 22.99); // defaul aperture F16, at progress 0.17
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/collider-manager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec3, Node, _decorator, Component, instantiate, math, _applyDecoratedDescriptor, _initializerDefineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      math = module.math;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "95b4fpK+A9Cmbfc9vOmsGsJ", "collider-manager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const v3_1 = new Vec3();
      let ColliderManager = exports('ColliderManager', (_dec = ccclass('ColliderManager'), _dec2 = property([Node]), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = (_temp = class ColliderManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "count", _descriptor, this);

          _initializerDefineProperty(this, "boundHalfLength", _descriptor2, this);

          _initializerDefineProperty(this, "prefabs", _descriptor3, this);

          _initializerDefineProperty(this, "tipsNode", _descriptor4, this);
        }

        start() {
          this.tipsNode.active = window.CC_PHYSICS_BUILTIN;
          this.node.removeAllChildren();

          for (let i = 0; i < this.count; i++) {
            const node = instantiate(this.prefabs[Math.round(Math.random())]);
            node.parent = this.node;
            node.setPosition(math.randomRange(-2, 2), 3 + i * 2, math.randomRange(-2, 2));
            node.setRotationFromEuler(math.randomRange(0, 180), math.randomRange(0, 180), math.randomRange(0, 180));
          }
        }

        update() {
          // handle bounds
          for (const node of this.node.children) {
            node.getPosition(v3_1);

            if (v3_1.y < -10) {
              v3_1.y = 30;
            } else if (v3_1.x > this.boundHalfLength + 3) {
              v3_1.x = -(this.boundHalfLength - 3);
            } else if (v3_1.x < -(this.boundHalfLength + 3)) {
              v3_1.x = this.boundHalfLength - 3;
            } else if (v3_1.z > this.boundHalfLength + 3) {
              v3_1.z = -(this.boundHalfLength - 3);
            } else if (v3_1.z < -(this.boundHalfLength + 3)) {
              v3_1.z = this.boundHalfLength - 3;
            }

            node.setPosition(v3_1);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "count", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 200;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boundHalfLength", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 12.5;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tipsNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/collider.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec3, Vec4, _decorator, Component, RigidBodyComponent, ModelComponent, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Vec4 = module.Vec4;
      _decorator = module._decorator;
      Component = module.Component;
      RigidBodyComponent = module.RigidBodyComponent;
      ModelComponent = module.ModelComponent;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "9734djZWa9MEbCNBh1ENuMW", "collider", undefined);

      const {
        ccclass
      } = _decorator;
      const v3_1 = new Vec3();
      const static_color = new Vec4(0.3, 0.3, 0.3, 1.0);
      let Collider = exports('Collider', (_dec = ccclass('Collider'), _dec(_class = (_temp = class Collider extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_body", null);

          _defineProperty(this, "_initialColor", null);

          _defineProperty(this, "_pass", null);

          _defineProperty(this, "_handle", 0);

          _defineProperty(this, "_color", new Vec4());
        }

        start() {
          this._body = this.node.getComponent(RigidBodyComponent);
          const mat = this.node.getComponent(ModelComponent).material; // Vec4 and Color are compatible with each other, but Vec4 is more efficient when updated frequently

          const mc = mat.getProperty('mainColor');
          this._initialColor = new Vec4(mc.x, mc.y, mc.z, mc.w);
          this._pass = mat.passes[0];
          this._handle = this._pass.getHandle('mainColor');
        }

        update() {
          // visualize speed
          this._body.getLinearVelocity(v3_1);

          let speed = v3_1.length();
          speed /= speed + 1;
          Vec4.lerp(this._color, static_color, this._initialColor, speed);

          this._pass.setUniform(this._handle, this._color);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwitchHDR.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Button, Label, _decorator, Component, director, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Button = module.Button;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      director = module.director;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "9fc26Ofl11JA5k+LpT9bBJR", "SwitchHDR", undefined); //import { _decorator, Component, Node, Scene, renderer, SliderComponent, CameraComponent, director } from 'cc';


      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = SwitchHDR
       * DateTime = Mon Dec 06 2021 14:32:13 GMT+0800 (GMT+08:00)
       * Author = xu58895777
       * FileBasename = SwitchHDR.ts
       * FileBasenameNoExtension = SwitchHDR
       * URL = db://assets/scripts/hdr-ldr/SwitchHDR.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      let SwitchHDR = exports('SwitchHDR', (_dec = ccclass('SwitchHDR'), _dec2 = property(Button), _dec3 = property(Label), _dec4 = property(Label), _dec(_class = (_class2 = (_temp = class SwitchHDR extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "button", _descriptor, this);

          _initializerDefineProperty(this, "label_hdr", _descriptor2, this);

          _initializerDefineProperty(this, "label_switch", _descriptor3, this);

          _defineProperty(this, "_skyBox", null);
        }

        start() {
          const pipeline = director.root.pipeline;
          this._skyBox = pipeline.pipelineSceneData.skybox;
          this.setLabelContent();
        }

        onLoad() {
          if (this.button != null) this.button.node.on(Button.EventType.CLICK, this.callback, this);
        }

        callback(button) {
          this._skyBox.useHDR = !this._skyBox.useHDR;
          this.setLabelContent();
        }

        setLabelContent() {
          if (this._skyBox.useHDR == true) {
            if (this.label_hdr != null) {
              this.label_hdr.string = "当前:HDR";
            }

            if (this.label_switch != null) {
              this.label_switch.string = "切换至LDR";
            }
          } else {
            if (this.label_hdr != null) {
              this.label_hdr.string = "当前:LDR";
            }

            if (this.label_switch != null) {
              this.label_switch.string = "切换至HDR";
            }
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "button", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label_hdr", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "label_switch", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tunnel.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, Vec4, Vec2, ModelComponent, director, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec4 = module.Vec4;
      Vec2 = module.Vec2;
      ModelComponent = module.ModelComponent;
      director = module.director;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "a6060IJdhFH6q3eEI9KzE5Q", "tunnel", undefined);

      const {
        ccclass
      } = _decorator;
      let Tunnel = exports('Tunnel', (_dec = ccclass('Tunnel'), _dec(_class = (_temp = class Tunnel extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_passes", []);

          _defineProperty(this, "_colorHandles", []);

          _defineProperty(this, "_borderHandles", []);

          _defineProperty(this, "_color", new Vec4(1, 0, 0, 1));

          _defineProperty(this, "_border", new Vec2(0, 0));
        }

        start() {
          const comps = this.getComponentsInChildren(ModelComponent);

          for (const comp of comps) {
            const mat = comp.material;
            const pass = mat.passes[0];

            this._colorHandles.push(pass.getHandle('color'));

            this._borderHandles.push(pass.getHandle('border'));

            this._passes.push(pass);
          }
        }

        update() {
          const time = director.getTotalFrames() * 0.1;
          const margin = time % (Math.PI * 4) > Math.PI ? 0.1 : Math.abs(Math.cos(time)) * 0.1;
          this._color.y = this._color.z = margin * 10;
          this._border.x = this._border.y = margin;
          const len = this._passes.length;

          for (let i = 0; i < len; i++) {
            this._passes[i].setUniform(this._colorHandles[i], this._color);

            this._passes[i].setUniform(this._borderHandles[i], this._border);
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsEnvCheck.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Enum, _decorator, Component, LabelComponent, SpriteComponent, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      _decorator = module._decorator;
      Component = module.Component;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _temp;

      cclegacy._RF.push({}, "ac794yPoAdBvZzv5/e8WT2m", "PhysicsEnvCheck", undefined);

      const {
        ccclass,
        property,
        menu
      } = _decorator;
      var EPhysicsItem;

      (function (EPhysicsItem) {
        EPhysicsItem[EPhysicsItem["BUILTIN"] = 1] = "BUILTIN";
        EPhysicsItem[EPhysicsItem["CANNON"] = 2] = "CANNON";
        EPhysicsItem[EPhysicsItem["AMMO"] = 4] = "AMMO";
        EPhysicsItem[EPhysicsItem["CANNON_AMMO"] = EPhysicsItem.CANNON + EPhysicsItem.AMMO] = "CANNON_AMMO";
        EPhysicsItem[EPhysicsItem["ALL"] = -1] = "ALL";
      })(EPhysicsItem || (EPhysicsItem = {}));

      Enum(EPhysicsItem);
      let PhysicsEnvCheck = exports('PhysicsEnvCheck', (_dec = ccclass('PhysicsEnvCheck'), _dec2 = menu('physics/PhysicsEnvCheck'), _dec(_class = _dec2(_class = (_temp = class PhysicsEnvCheck extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "physics", EPhysicsItem.CANNON_AMMO);
        }

        onLoad() {
          let lbCom;
          let sprCom;

          if (window.CC_PHYSICS_BUILTIN) {
            lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = '当前物理：builtin';
          } else if (window.CC_PHYSICS_CANNON) {
            lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = '当前物理：cannon.js';
          } else if (window.CC_PHYSICS_AMMO) {
            lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = '当前物理：ammo.js';
          } else {
            lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = '当前物理：none';
          }

          const name = this.node.name;

          if (name === 'cannon-ammo') {
            this.physics = EPhysicsItem.CANNON_AMMO;
          } else if (name === 'builtin') {
            this.physics = EPhysicsItem.BUILTIN;
          } else if (name === 'cannon') {
            this.physics = EPhysicsItem.CANNON;
          } else if (name === 'ammo') {
            this.physics = EPhysicsItem.AMMO;
          } else if (name === 'builtin-cannon-ammo') {
            this.physics = EPhysicsItem.ALL;
          }

          switch (this.physics) {
            case EPhysicsItem.ALL:
              break;

            case EPhysicsItem.CANNON_AMMO:
              if (window.CC_PHYSICS_CANNON || window.CC_PHYSICS_AMMO) {
                break;
              }

              lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
              lbCom.enabled = true;
              lbCom.string = '测试此场景需要将物理模块设置为 cannon.js 或 ammo.js';
              sprCom = this.getComponentInChildren(SpriteComponent);
              sprCom.enabled = true;
              break;

            case EPhysicsItem.CANNON:
              if (!window.CC_PHYSICS_CANNON) {
                lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = '测试此场景需要将物理模块设置为 cannon.js';
                sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;

            case EPhysicsItem.AMMO:
              if (!window.CC_PHYSICS_AMMO) {
                lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = '测试此场景需要将物理模块设置为 ammo.js';
                sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;

            case EPhysicsItem.BUILTIN:
              if (!window.CC_PHYSICS_BUILTIN) {
                lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = '测试此场景需要将物理模块设置为 builtin';
                sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;
          }
        }

      }, _temp)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/label-modifier.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, LabelComponent, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      LabelComponent = module.LabelComponent;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b083fbk5OpHE6avlzMP8i4O", "label-modifier", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LabelModifier = exports('LabelModifier', (_dec = ccclass('LabelModifier'), _dec(_class = (_class2 = (_temp = class LabelModifier extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefix", _descriptor, this);

          _defineProperty(this, "_label", null);
        }

        start() {
          this._label = this.node.getComponent(LabelComponent);
        }

        setStringBySliderValue(e) {
          if (this._label) {
            this._label.string = this.prefix + e.progress.toFixed(2);
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefix", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/backbutton.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './scenelist.ts'], function (exports) {
  'use strict';

  var cclegacy, Vec3, _decorator, Component, game, Canvas, Layers, ScrollViewComponent, director, LayoutComponent, _defineProperty, sceneArray;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      _decorator = module._decorator;
      Component = module.Component;
      game = module.game;
      Canvas = module.Canvas;
      Layers = module.Layers;
      ScrollViewComponent = module.ScrollViewComponent;
      director = module.director;
      LayoutComponent = module.LayoutComponent;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      sceneArray = module.sceneArray;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "b20edYWY5pMo6v9nvpXwDsb", "backbutton", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let BackButton = exports('BackButton', (_dec = ccclass('BackButton'), _dec(_class = (_temp = _class2 = class BackButton extends Component {
        static get offset() {
          return BackButton._offset;
        }

        static set offset(value) {
          BackButton._offset = value;
        }

        static saveOffset() {
          if (BackButton._scrollNode) {
            BackButton._offset = new Vec3(0, BackButton._scrollCom.getScrollOffset().y, 0);
          }
        }

        static saveIndex(index) {
          BackButton._sceneIndex = index;
          BackButton.refreshButton();
        }

        static refreshButton() {
          if (BackButton._sceneIndex === -1) {
            BackButton._prevNode.active = false;
            BackButton._nextNode.active = false;
          } else {
            BackButton._prevNode.active = true;
            BackButton._nextNode.active = true;
          }
        }

        __preload() {
          const sceneInfo = game._sceneInfos;
          let firstIndex = 0;
          let lastIndex = 0;
          let sceneString = '';

          for (let i = 0; i < sceneInfo.length; i++) {
            sceneString = sceneInfo[i].url;
            firstIndex = sceneString.lastIndexOf('/') + 1;
            lastIndex = sceneString.lastIndexOf('.scene');
            sceneString = sceneString.substring(firstIndex, lastIndex);

            if (sceneString === 'testlist') {
              continue;
            }

            sceneArray.push(sceneString);
          }
        }

        start() {
          let camera = this.node.getComponent(Canvas).cameraComponent;
          if (camera.visibility & Layers.Enum.UI_2D) camera.visibility &= ~Layers.Enum.UI_2D;
          game.addPersistRootNode(this.node);
          BackButton._scrollNode = this.node.getParent().getChildByPath('Canvas/ScrollView');

          if (BackButton._scrollNode) {
            BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollViewComponent);
          }

          BackButton._blockInput = this.node.getChildByName('BlockInput');
          BackButton._blockInput.active = false;
          BackButton._prevNode = this.node.getChildByName('PrevButton');
          BackButton._nextNode = this.node.getChildByName('NextButton');

          if (BackButton._prevNode && BackButton._nextNode) {
            BackButton.refreshButton();
          }
        }

        backToList() {
          BackButton._blockInput.active = true;
          director.loadScene('testlist', () => {
            BackButton._sceneIndex = -1;
            BackButton.refreshButton();
            BackButton._scrollNode = this.node.getParent().getChildByPath('Canvas/ScrollView');

            if (BackButton._scrollNode) {
              BackButton._scrollCom = BackButton._scrollNode.getComponent(ScrollViewComponent); // @ts-ignore

              BackButton._scrollCom._content.getComponent(LayoutComponent).updateLayout();

              BackButton._scrollCom.scrollToOffset(BackButton.offset, 0.1, true);
            }

            BackButton._blockInput.active = false;
          });
        }

        nextscene() {
          BackButton._blockInput.active = true;
          this.updateSceneIndex(true);
          director.loadScene(this.getSceneName(), () => {
            BackButton._blockInput.active = false;
          });
        }

        prescene() {
          BackButton._blockInput.active = true;
          this.updateSceneIndex(false);
          director.loadScene(this.getSceneName(), () => {
            BackButton._blockInput.active = false;
          });
        }

        updateSceneIndex(next) {
          if (next) {
            BackButton._sceneIndex + 1 >= sceneArray.length ? BackButton._sceneIndex = 0 : BackButton._sceneIndex += 1;
          } else {
            BackButton._sceneIndex - 1 < 0 ? BackButton._sceneIndex = sceneArray.length - 1 : BackButton._sceneIndex -= 1;
          }
        }

        getSceneName() {
          return sceneArray[BackButton._sceneIndex];
        }

      }, _defineProperty(_class2, "_scrollNode", null), _defineProperty(_class2, "_offset", new Vec3()), _defineProperty(_class2, "_scrollCom", null), _defineProperty(_class2, "_sceneIndex", -1), _defineProperty(_class2, "_blockInput", void 0), _defineProperty(_class2, "_prevNode", void 0), _defineProperty(_class2, "_nextNode", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/light-hint.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, SphereLightComponent, SpotLightComponent, ModelComponent, CameraComponent, Vec2, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      SphereLightComponent = module.SphereLightComponent;
      SpotLightComponent = module.SpotLightComponent;
      ModelComponent = module.ModelComponent;
      CameraComponent = module.CameraComponent;
      Vec2 = module.Vec2;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "bd5838x//xGMYENw1vAlfIM", "light-hint", undefined);

      const {
        ccclass
      } = _decorator;
      let LightHint = exports('LightHint', (_dec = ccclass("LightHint"), _dec(_class = (_temp = class LightHint extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_material", null);

          _defineProperty(this, "_camera", null);
        }

        start() {
          let light = this.node.parent.getComponent(SphereLightComponent);
          if (!light) light = this.node.parent.getComponent(SpotLightComponent);
          this._material = this.node.getComponent(ModelComponent).material;
          this._camera = this.node.scene.getComponentInChildren(CameraComponent);
          const size = light.size * 4;
          this.node.setWorldScale(size, size, size);

          this._material.setProperty('mainColor', light.color);

          this._material.setProperty('intensitySize', new Vec2(light.luminance, 0.4));
        }

        update() {
          this.node.setWorldRotation(this._camera.node.worldRotation);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/self-destory.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d1bc3dAYZ9DrYgEUAHLfjj3", "self-destory", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let SelfDestory = exports('SelfDestory', (_dec = ccclass('SelfDestory'), _dec(_class = class SelfDestory extends Component {
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;
        start() {
          setTimeout(() => {
            if (this.node && this.node.destroy()) {
              console.log('destroy complete');
            }
          }, 5000);
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/listitem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './scenelist.ts', './backbutton.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, LabelComponent, ButtonComponent, director, _defineProperty, sceneArray, BackButton;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      LabelComponent = module.LabelComponent;
      ButtonComponent = module.ButtonComponent;
      director = module.director;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      sceneArray = module.sceneArray;
    }, function (module) {
      BackButton = module.BackButton;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "dfb240gUk5FzLJW2+GbHJRv", "listitem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ListItem = exports('ListItem', (_dec = ccclass('ListItem'), _dec(_class = (_temp = class ListItem extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "index", -1);

          _defineProperty(this, "_name", '');

          _defineProperty(this, "label", null);

          _defineProperty(this, "button", null);
        }

        onload() {}

        start() {
          // Your initialization goes here.
          this.index = this.node.getSiblingIndex();
          this._name = '';

          if (this.node) {
            this.label = this.node.getComponentInChildren(LabelComponent);
            this.button = this.node.getComponent(ButtonComponent);
          }

          this.updateItem(this.index, sceneArray[this.index]);
        }

        loadScene() {
          BackButton.saveOffset();
          BackButton.saveIndex(this.index);
          this.button.interactable = false;
          director.loadScene(this._name, BackButton.refreshButton);
        }

        updateItem(idx, name) {
          this.index = idx;
          this._name = name;
          this.label.string = name;
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tangent-visualizer.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, Vec3, ModelComponent, _decorator, Component, Material, GFXPrimitiveMode, GFXAttributeName, Color, utils, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      ModelComponent = module.ModelComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Material = module.Material;
      GFXPrimitiveMode = module.GFXPrimitiveMode;
      GFXAttributeName = module.GFXAttributeName;
      Color = module.Color;
      utils = module.utils;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "e318flB6JhFT5zHRmxMuBHD", "tangent-visualizer", undefined);

      const {
        ccclass,
        property,
        executeInEditMode,
        requireComponent
      } = _decorator;
      const v3_1 = new Vec3();
      const v3_2 = new Vec3();
      let TangentVisualizer = exports('TangentVisualizer', (_dec = ccclass('TangentVisualizer'), _dec2 = requireComponent(ModelComponent), _dec3 = property(ModelComponent), _dec(_class = _dec2(_class = executeInEditMode(_class = (_class2 = (_temp = class TangentVisualizer extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "target", _descriptor, this);

          _initializerDefineProperty(this, "scale", _descriptor2, this);

          _defineProperty(this, "_material", new Material());
        }

        set apply(val) {
          this.refresh();
        }

        get apply() {
          return false;
        }

        start() {
          this._material.initialize({
            effectName: 'builtin-unlit',
            defines: {
              USE_VERTEX_COLOR: true
            },
            states: {
              primitive: GFXPrimitiveMode.LINE_LIST
            }
          });

          this.refresh();
        }

        refresh() {
          if (!this.target) {
            return;
          }

          const comps = this.node.getComponents(ModelComponent);

          if (comps.length < 3) {
            console.warn('three model component on this node is needed');
            return;
          }

          const position = this.target.mesh.readAttribute(0, GFXAttributeName.ATTR_POSITION);
          const normal = this.target.mesh.readAttribute(0, GFXAttributeName.ATTR_NORMAL);
          const tangent = this.target.mesh.readAttribute(0, GFXAttributeName.ATTR_TANGENT);

          const bitangent = this._generateBitangent(normal, tangent);

          this._updateModel(comps[0], position, normal, Color.MAGENTA);

          this._updateModel(comps[1], position, tangent, Color.CYAN, 4);

          this._updateModel(comps[2], position, bitangent, Color.YELLOW);
        }

        _updateModel(comp, pos, data, color, stride = 3) {
          comp.material = this._material;
          comp.mesh = utils.createMesh({
            positions: Array(pos.length / 3 * 2).fill(0).map((_, i) => {
              const ofs = Math.floor(i / 2);
              Vec3.fromArray(v3_1, pos, ofs * 3);

              if (i % 2) {
                Vec3.scaleAndAdd(v3_1, v3_1, Vec3.fromArray(v3_2, data, ofs * stride), this.scale);
              }

              return Vec3.toArray([], v3_1);
            }).reduce((acc, cur) => (cur.forEach(c => acc.push(c)), acc), []),
            colors: Array(pos.length / 3 * 2).fill(0).map((_, i) => {
              return Color.toArray([], i % 2 ? color : Color.WHITE);
            }).reduce((acc, cur) => (cur.forEach(c => acc.push(c)), acc), []),
            primitiveMode: GFXPrimitiveMode.LINE_LIST,
            minPos: new Vec3(-Infinity, -Infinity, -Infinity),
            maxPos: new Vec3(Infinity, Infinity, Infinity)
          });
        }

        _generateBitangent(normal, tangent) {
          const bitangent = normal.slice();
          const vCount = normal.length / 3;

          for (let i = 0; i < vCount; i++) {
            Vec3.fromArray(v3_1, normal, i * 3);
            Vec3.fromArray(v3_2, tangent, i * 4);
            Vec3.multiplyScalar(v3_1, Vec3.cross(v3_1, v3_1, v3_2), tangent[i * 4 + 3]);
            Vec3.toArray(bitangent, v3_1, i * 3);
          }

          return bitangent;
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scale", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.1;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "apply", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "apply"), _class2.prototype)), _class2)) || _class) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/audio-controller.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, AudioSourceComponent, _decorator, Component, SliderComponent, LabelComponent, ToggleComponent, AudioClip, _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      AudioSourceComponent = module.AudioSourceComponent;
      _decorator = module._decorator;
      Component = module.Component;
      SliderComponent = module.SliderComponent;
      LabelComponent = module.LabelComponent;
      ToggleComponent = module.ToggleComponent;
      AudioClip = module.AudioClip;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "f0467l4fZlMk6vmKrPCPkaW", "audio-controller", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let AudioController = exports('AudioController', (_dec = ccclass('AudioController'), _dec2 = property(AudioSourceComponent), _dec(_class = (_class2 = (_temp = class AudioController extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "source", _descriptor, this);

          _defineProperty(this, "volume", void 0);

          _defineProperty(this, "currentTime", void 0);

          _defineProperty(this, "volumeLabel", void 0);

          _defineProperty(this, "currentTimeLabel", void 0);

          _defineProperty(this, "loop", void 0);

          _defineProperty(this, "playOnAwake", void 0);

          _defineProperty(this, "playing", void 0);
        }

        start() {
          this.volume = this.node.getChildByName('volume').getComponent(SliderComponent);
          this.currentTime = this.node.getChildByName('currentTime').getComponent(SliderComponent);
          this.volumeLabel = this.volume.node.getChildByName('Numbers').getComponent(LabelComponent);
          this.currentTimeLabel = this.currentTime.node.getChildByName('Numbers').getComponent(LabelComponent);
          this.loop = this.node.getChildByName('loop').getComponent(ToggleComponent);
          this.playOnAwake = this.node.getChildByName('playOnAwake').getComponent(ToggleComponent);
          this.playing = this.node.getChildByName('playing').getComponent(ToggleComponent);
          this.node.getChildByName('name').getComponent(LabelComponent).string = this.source.node.name;
          let loadMode = 'Unknown Load Mode';

          if (!this.source.clip) {
            console.error('Need to specify AudioSource.clip');
            return;
          }

          switch (this.source.clip.loadMode) {
            case AudioClip.AudioType.WEB_AUDIO:
              loadMode = 'Web Audio API Mode';
              break;

            case AudioClip.AudioType.DOM_AUDIO:
              loadMode = 'DOM Audio Mode';
              break;

            case AudioClip.AudioType.NATIVE_AUDIO:
              loadMode = 'Native Audio Mode';
              break;

            case AudioClip.AudioType.MINIGAME_AUDIO:
              loadMode = 'MINIGAME Audio Mode';
              break;

            case AudioClip.AudioType.UNKNOWN_AUDIO:
              loadMode = 'UNKNOWN Audio Mode';
              break;
          }

          this.node.getChildByName('loadMode').getComponent(LabelComponent).string = loadMode;
        }

        update() {
          this.volume.progress = this.source.volume;
          this.currentTime.progress = this.source.currentTime / this.source.duration;
          this.volumeLabel.string = `${this.source.volume.toFixed(2)} / 1`;
          this.currentTimeLabel.string = `${this.source.currentTime.toFixed(1)} / ${this.source.duration.toFixed(1)}`;
          this.loop.isChecked = this.source.loop;
          this.playOnAwake.isChecked = this.source.playOnAwake;
          this.playing.isChecked = this.source.playing;
        }

        play() {
          this.source.play();
        }

        pause() {
          this.source.pause();
        }

        stop() {
          this.source.stop();
        } // slider callback


        setVolume(e) {
          this.source.volume = e.progress;
        } // slider callback


        setCurrentTime(e) {
          this.source.currentTime = e.progress * this.source.duration;
        } // toggle callback


        setLoop(e) {
          this.source.loop = e.isChecked;
        } // toggle callback


        setPlayOnAwake(e) {
          this.source.playOnAwake = e.isChecked;
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "source", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./engine-info.ts', './jellyfish.ts', './emitter.ts', './rotor.ts', './sponza.ts', './BladeStorm.ts', './ground.ts', './toggler.ts', './unlit-quad.ts', './healspell.ts', './pre-filter-envmap.ts', './first-person-camera.ts', './scenelist.ts', './SSS.ts', './debug-info.ts', './instanced-skinning.ts', './spawn.ts', './geometries.ts', './exposure.ts', './collider-manager.ts', './collider.ts', './SwitchHDR.ts', './tunnel.ts', './PhysicsEnvCheck.ts', './label-modifier.ts', './backbutton.ts', './light-hint.ts', './self-destory.ts', './listitem.ts', './tangent-visualizer.ts', './audio-controller.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});