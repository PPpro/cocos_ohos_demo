System.register("chunks:///_virtual/main", ['./equipmentManager.ts', './instacingMaterial.ts', './ModelInfo.ts', './ChargeUI.ts', './PanelType.ts', './ShopUI.ts', './BackPackUIComp.ts', './resManager.ts', './DragonBonesCollider.ts', './DragonBonesMode.ts', './DragonBonesCtrl.ts', './ProjectItem.ts', './ItemTemplate.ts', './start.ts', './Benchmark.ts', './confirmBox.ts', './LoadScene.ts', './storageManager.ts', './BackList.ts', './HeroSlot.ts', './player.ts', './environmentManager.ts', './monsterManager.ts', './gameManager.ts', './player2.ts', './playerManager.ts', './ItemList.ts', './LobbyManager.ts', './first-person-camera.ts', './CreateObject.ts', './TopBar.ts', './BackPackUI.ts', './ReplaceSlotDisplay.ts', './test-cache-alpha.ts', './PanelTransition.ts', './mapManager.ts', './gameLogic.ts', './constants.ts', './playerManager2.ts', './Helper.ts', './bunnyFrameAnimationTest.ts', './ButtonScaler.ts', './PhysicsEnvCheck.ts', './mainUI.ts', './AdapterContent.ts', './SubBtnsUI.ts', './migrate-canvas.ts', './subPackageManager.ts', './PhyicsTitle.ts', './bunnyTest.ts', './bunny-mark.ts', './prefabAnimationBunny.ts', './performance.ts', './LoadDragonBones.ts', './ParticleTest.ts', './HomeUI.ts', './EnergyCounter.ts', './DragonBonesAttach.ts', './HeroSlotComp.ts', './bunnyTransformAnimationTest.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/equipmentManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, _decorator, Component, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "07c19EB9UVNr4gciX26107L", "equipmentManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let EquipmentManager = exports('EquipmentManager', (_dec = ccclass('EquipmentManager'), _dec2 = property([Prefab]), _dec3 = property(Node), _dec(_class = (_class2 = class EquipmentManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "equPrefabs", _descriptor, this);

          _initializerDefineProperty(this, "listNode", _descriptor2, this);

          this.equList = [];
          this.spriteNum = 0;
        }

        start() {// [3]
        }

        updateSpriteNumber(num) {
          if (this.spriteNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > this.spriteNum) {
            const addNum = num - this.spriteNum;

            for (let i = 0; i < addNum; i++) {
              const pfSprite = this.equPrefabs[i % this.equPrefabs.length];
              let sprite = instantiate(pfSprite);
              sprite.parent = this.listNode;
              this.equList.push(sprite);
            }

            this.spriteNum = num;
          } else {
            // reduce
            const deleteNum = this.spriteNum - num;

            for (let i = 0; i < deleteNum; i++) {
              const sprite = this.equList.pop();

              if (!sprite) {
                return;
              }

              sprite.destroy();
            }

            this.spriteNum = num;
          }
        }

        showBackPack() {
          this.node.active = true;
        }

        closeBcakPack() {
          this.node.active = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "equPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "listNode", [_dec3], {
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
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ModelInfo.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './instacingMaterial.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, instacingMaterial;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      instacingMaterial = module.instacingMaterial;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "0bf7bClfXBJuYDk+fw5iW3V", "ModelInfo", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ModelInfo = exports('ModelInfo', (_dec = ccclass('ModelInfo'), _dec(_class = (_class2 = class ModelInfo extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "triangles", _descriptor, this);

          _initializerDefineProperty(this, "vertices", _descriptor2, this);
        }

        changeInstancingBatch(isEnable = true) {
          let arrInstancing = this.node.getComponentsInChildren(instacingMaterial);
          arrInstancing.forEach(instancing => {
            instancing.enableInstancing = isEnable;
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "triangles", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vertices", [property], {
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

System.register("chunks:///_virtual/DragonBonesCollider.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, PhysicsSystem2D, Contact2DType, EPhysics2DDrawFlags, Sprite, Color, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      PhysicsSystem2D = module.PhysicsSystem2D;
      Contact2DType = module.Contact2DType;
      EPhysics2DDrawFlags = module.EPhysics2DDrawFlags;
      Sprite = module.Sprite;
      Color = module.Color;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "18a59OM3shCs5K8L9hCo3rK", "DragonBonesCollider", undefined);

      const {
        ccclass
      } = _decorator;
      let DragonBonesCollider = exports('DragonBonesCollider', (_dec = ccclass('DragonBonesCollider'), _dec(_class = class DragonBonesCollider extends Component {
        constructor(...args) {
          super(...args);
          this.touchingCountMap = new Map();
          this.debugDrawFlags = 0;
        }

        start() {
          // Your initialization goes here.
          PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
          PhysicsSystem2D.instance.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          this.debugDrawFlags = PhysicsSystem2D.instance.debugDrawFlags;
        }

        onEnable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags | EPhysics2DDrawFlags.Shape;
        }

        onDisable() {
          PhysicsSystem2D.instance.debugDrawFlags = this.debugDrawFlags;
        }

        addContact(c) {
          let count = this.touchingCountMap.get(c.node) || 0;
          this.touchingCountMap.set(c.node, ++count);
          let sprite = c.getComponent(Sprite);

          if (sprite) {
            sprite.color = Color.RED;
          }
        }

        removeContact(c) {
          let count = this.touchingCountMap.get(c.node) || 0;
          --count;

          if (count <= 0) {
            this.touchingCountMap.delete(c.node);
            let sprite = c.getComponent(Sprite);

            if (sprite) {
              sprite.color = Color.WHITE;
            }
          } else {
            this.touchingCountMap.set(c.node, count);
          }
        }

        onBeinContact(a, b) {
          this.addContact(a);
          this.addContact(b);
        }

        onEndContact(a, b) {
          this.removeContact(a);
          this.removeContact(b);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BackPackUIComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, ScrollView, _decorator, Component, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      ScrollView = module.ScrollView;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "13798PQflZFFKjDy0+hyRsU", "BackPackUIComp", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let BackPackUIComp = exports('BackPackUIComp', (_dec = property({
        type: Prefab
      }), _dec2 = property({
        type: ScrollView
      }), ccclass(_class = (_class2 = class BackPackUIComp extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "slotPrefab", _descriptor, this);

          _initializerDefineProperty(this, "scrollView", _descriptor2, this);

          _initializerDefineProperty(this, "totalCount", _descriptor3, this);

          this.home = null;
          this.heroSlots = [];
        }

        init(home) {
          this.heroSlots.length = 0;
          this.home = home;

          for (let i = 0; i < this.totalCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
          }
        }

        addHeroSlot() {
          let heroSlot = instantiate(this.slotPrefab);
          this.scrollView.content.addChild(heroSlot);
          return heroSlot;
        }

        show() {
          this.node.active = true;
          this.node.emit('fade-in');
        }

        hide() {
          this.node.active = false;
          this.node.emit('fade-out');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slotPrefab", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "totalCount", [property], {
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

System.register("chunks:///_virtual/DragonBonesMode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Material, dragonBones, Label, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Material = module.Material;
      dragonBones = module.dragonBones;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

      cclegacy._RF.push({}, "1ec8fGOAJdGnKarDJTeyxnS", "DragonBonesMode", undefined);

      const {
        ccclass,
        property,
        requireComponent
      } = _decorator;
      let DragonBonesMode = exports('DragonBonesMode', (_dec = ccclass('DragonBonesMode'), _dec2 = property({
        type: Material
      }), _dec3 = property({
        type: Material
      }), _dec4 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec5 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec6 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec7 = property({
        type: Label
      }), _dec8 = property({
        type: Label
      }), _dec9 = property({
        type: Label
      }), _dec(_class = (_class2 = class DragonBonesMode extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "grayMaterial", _descriptor, this);

          _initializerDefineProperty(this, "normalMaterial", _descriptor2, this);

          _initializerDefineProperty(this, "db0", _descriptor3, this);

          _initializerDefineProperty(this, "db1", _descriptor4, this);

          _initializerDefineProperty(this, "db2", _descriptor5, this);

          _initializerDefineProperty(this, "batchLabel", _descriptor6, this);

          _initializerDefineProperty(this, "cacheLabel", _descriptor7, this);

          _initializerDefineProperty(this, "matLabel", _descriptor8, this);

          _initializerDefineProperty(this, "isGray", _descriptor9, this);

          _initializerDefineProperty(this, "isBatch", _descriptor10, this);

          _initializerDefineProperty(this, "isCache", _descriptor11, this);
        }

        onGray() {
          this.isGray = !this.isGray;
          let label = "gray";
          if (this.isGray) label = "normal";
          this.matLabel.string = label;
          let material = this.grayMaterial;

          if (!this.isGray) {
            material = this.normalMaterial;
          }

          this.db0.setMaterial(material, 0);
          this.db0.markForUpdateRenderData(true);
          this.db1.setMaterial(material, 0);
          this.db1.markForUpdateRenderData(true);
          this.db2.setMaterial(material, 0);
          this.db2.markForUpdateRenderData();
        }

        onBatch() {
          this.isBatch = !this.isBatch;
          let label = "batch";
          if (this.isBatch) label = "no batch";
          this.batchLabel.string = label;
          this.db0.enableBatch = this.isBatch;
          this.db1.enableBatch = this.isBatch;
          this.db2.enableBatch = this.isBatch;
        }

        onCache() {
          this.isCache = !this.isCache;
          let label = "cache";
          if (this.isCache) label = "no cache";
          this.cacheLabel.string = label;
          let mode = dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE;
          if (!this.isCache) mode = dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME;
          this.db0.setAnimationCacheMode(mode);
          this.db1.setAnimationCacheMode(mode);
          this.db2.setAnimationCacheMode(mode);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "grayMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "normalMaterial", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "db0", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "db1", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "db2", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "batchLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cacheLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "matLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "isGray", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "isBatch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "isCache", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/resManager.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      var _class, _class2;

      cclegacy._RF.push({}, "1716f1F5YtO1ax28+Z1G5w2", "resManager", undefined); // Learn TypeScript:
      //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
      // Learn Attribute:
      //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
      // Learn life-cycle callbacks:
      //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


      const {
        ccclass,
        property
      } = cc._decorator;
      let ResManager = exports('default', ccclass(_class = (_class2 = class ResManager {
        /**
         * 加载资源
         * @param url   资源路径
         * @param type  资源类型
         * @param cb    回调
         * @method loadRes
         */
        static loadRes(url, type, cb) {
          cc.loader.loadRes(url, type, (err, res) => {
            if (err) {
              cc.error(err.message || err);
              cb(err, res);
              return;
            }

            cb(err, res);
          });
        }
        /**
         * 加载模块资源
         * @param moduleName   模块名
         * @param url   资源路径
         * @param type  资源类型
         * @param cb    回调
         * @method loadModuleRes
         */


        static loadModuleRes(moduleName, url, type, cb) {
          cc.loader.loadRes(this.resPath + `package/${moduleName}/${url}`, type, (err, res) => {
            if (err) {
              cc.error(err.message || err);
              cb(err, res);
              return;
            }

            cb(err, res);
          });
        }
        /**
         * 释放资源
         * @param path  释放资源的路径
         * @method releasePanelRes
         */


        static releasePanelRes(path) {
          // 如果在这个 资源 中有一些资源与其他界面共用, 不希望被释放,则可以将这个资源从依赖列表中删除
          const deps = cc.loader.getDependsRecursively(path);
          cc.loader.release(deps);
        }

        static getData(fileName, cb) {
          cc.loader.loadRes(this.resPath + "data/" + fileName, function (err, content) {
            if (err) {
              cc.error(err.message || err);
              return;
            }

            let name = content.name;
            let text = content.text;

            if (!text) {
              cc.loader.load(content.nativeUrl, function (err, content) {
                text = content;
                cb(err, {
                  name: name,
                  text: text
                });
              });
              return;
            }

            cb(err, {
              name: name,
              text: text
            });
          });
        }

        static getModel(modelName, cb) {
          this.loadRes(this.resPath + `model/${modelName}`, cc.Prefab, cb);
        }

        static getUIPrefabRes(prefabPath, cb) {
          this.loadRes(this.resPath + "package/prefab/ui/" + prefabPath, cc.Prefab, cb);
        }

        static createUI(path, cb, parent) {
          this.getUIPrefabRes(path, function (err, prefab) {
            if (err) return;
            var node = cc.instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = cc.find("Canvas");
            }

            parent.addChild(node);
            cb(null, node);
          });
        }

      }, _class2.resPath = '', _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ChargeUI.ts', './PanelType.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Animation, Sprite, Node, _decorator, Component, ChargeUI, PanelType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Animation = module.Animation;
      Sprite = module.Sprite;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ChargeUI = module.ChargeUI;
    }, function (module) {
      PanelType = module.PanelType;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "0d6f9QGL49Fa4UGVF9fmZrd", "ShopUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ShopUI = exports('ShopUI', (_dec = property(Animation), _dec2 = property(Sprite), _dec3 = property(Node), _dec4 = property(ChargeUI), ccclass(_class = (_class2 = class ShopUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "anim", _descriptor, this);

          _initializerDefineProperty(this, "figure", _descriptor2, this);

          _initializerDefineProperty(this, "btnsNode", _descriptor3, this);

          _initializerDefineProperty(this, "chargeUI", _descriptor4, this);

          this._panelType = PanelType.Home;
          this._home = null;
        } // use this for initialization


        init(home, panelType) {
          this._home = home;
          this.node.active = false;
          this.anim.play('shop_reset');
          this._panelType = panelType; // this.figure.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(1, 1, 0.96), cc.scaleTo(1, 1, 1))));

          this.chargeUI.init(home, this.btnsNode);
        }

        show() {
          this.node.active = true;
          this.anim.play('shop_intro');
        }

        hide() {
          this.anim.play('shop_outro');
        }

        onFinishShow() {
          this._home.curPanel = this._panelType;
        }

        onFinishHide() {
          this.node.active = false;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "anim", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "figure", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnsNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "chargeUI", [_dec4], {
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

System.register("chunks:///_virtual/DragonBonesCtrl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, dragonBones, Node, macro, _decorator, Component, Vec3, SystemEventType, systemEvent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      dragonBones = module.dragonBones;
      Node = module.Node;
      macro = module.macro;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      SystemEventType = module.SystemEventType;
      systemEvent = module.systemEvent;
    }],
    execute: function () {
      var _dec, _class, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class3, _class4, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "2323bz+GgZJZ5mpHSfuf3kv", "DragonBonesCtrl", undefined);

      const {
        ccclass,
        property,
        requireComponent
      } = _decorator;
      var NORMAL_ANIMATION_GROUP = "normal";
      var AIM_ANIMATION_GROUP = "aim";
      var ATTACK_ANIMATION_GROUP = "attack";
      var JUMP_SPEED = -20;
      var NORMALIZE_MOVE_SPEED = 3.6;
      var MAX_MOVE_SPEED_FRONT = NORMALIZE_MOVE_SPEED * 1.4;
      var MAX_MOVE_SPEED_BACK = NORMALIZE_MOVE_SPEED * 1.0;
      var WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
      var WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
      var SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
      var GROUND = -200;
      var G = -0.6;
      let DragonBonesCtrl = exports('default', (_dec2 = ccclass('DragonBonesCtrl'), _dec3 = requireComponent(dragonBones.ArmatureDisplay), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: Node
      }), _dec7 = property({
        type: Node
      }), _dec8 = property({
        type: Node
      }), _dec9 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec10 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec2(_class3 = _dec3(_class3 = (_class4 = class DragonBonesCtrl extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "touchHandler", _descriptor, this);

          _initializerDefineProperty(this, "upButton", _descriptor2, this);

          _initializerDefineProperty(this, "downButton", _descriptor3, this);

          _initializerDefineProperty(this, "leftButton", _descriptor4, this);

          _initializerDefineProperty(this, "rightButton", _descriptor5, this);

          _initializerDefineProperty(this, "weaponArmature", _descriptor6, this);

          _initializerDefineProperty(this, "skinArmature", _descriptor7, this);

          this._bullets = [];
          this._left = false;
          this._right = false;
          this._isJumpingA = false;
          this._isJumpingB = false;
          this._isSquating = false;
          this._isAttackingA = false;
          this._isAttackingB = false;
          this._weaponRIndex = 0;
          this._weaponLIndex = 0;
          this._skinIndex = 0;
          this._faceDir = 1;
          this._aimDir = 0;
          this._moveDir = 0;
          this._aimRadian = 0;
          this._speedX = 0;
          this._speedY = 0;
          this._armature = null;
          this._armatureDisplay = null;
          this._weaponR = null;
          this._weaponL = null;
          this._aimState = null;
          this._walkState = null;
          this._attackState = null;
          this._target = new Vec3(0, 0, 0);
          this._mouseDown_ = false;
        } // use this for initialization


        onLoad() {
          this._armatureDisplay = this.getComponent(dragonBones.ArmatureDisplay);
          this._armature = this._armatureDisplay.armature();

          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);

          this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);

          this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);

          this._weaponR = this._armature.getSlot('weapon_r').childArmature;
          this._weaponL = this._armature.getSlot('weapon_l').childArmature;

          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this); // load all skin data


          for (let i = 1; i < SKINS.length; i++) {
            this.skinArmature.armatureName = SKINS[i];
          }

          for (let i = 1; i < WEAPON_R_LIST.length; i++) {
            this.weaponArmature.armatureName = WEAPON_R_LIST[i];
          }

          this._updateAnimation();

          if (this.touchHandler) {
            // touch events
            this.touchHandler.on(SystemEventType.TOUCH_START, event => {
              this._mouseDown_ = true;
              var touches = event.getTouches();
              var touchLoc = touches[0].getLocation();
              this.aim(touchLoc.x, touchLoc.y);
              this.attack(true);
            }, this);
            this.touchHandler.on(SystemEventType.TOUCH_END, event => {
              this._mouseDown_ = false;
              this.attack(false);
            }, this);
            this.touchHandler.on(SystemEventType.TOUCH_MOVE, event => {
              var touches = event.getTouches();
              var touchLoc = touches[0].getLocation();
              this.aim(touchLoc.x, touchLoc.y);
            }, this);
          }

          if (this.upButton) {
            this.upButton.on(SystemEventType.TOUCH_START, event => {
              this.jump();
            }, this);
          }

          if (this.downButton) {
            this.downButton.on(SystemEventType.TOUCH_START, event => {
              this.squat(true);
            }, this);
            this.downButton.on(SystemEventType.TOUCH_END, event => {
              this.squat(false);
            }, this);
            this.downButton.on(SystemEventType.TOUCH_CANCEL, event => {
              this.squat(false);
            }, this);
          }

          if (this.leftButton) {
            this.leftButton.on(SystemEventType.TOUCH_START, event => {
              this._left = true;

              this._updateMove(-1);
            }, this);
            this.leftButton.on(SystemEventType.TOUCH_END, event => {
              this._left = false;

              this._updateMove(-1);
            }, this);
            this.leftButton.on(SystemEventType.TOUCH_CANCEL, event => {
              this._left = false;

              this._updateMove(-1);
            }, this);
          }

          if (this.rightButton) {
            this.rightButton.on(SystemEventType.TOUCH_START, event => {
              this._right = true;

              this._updateMove(1);
            }, this);
            this.rightButton.on(SystemEventType.TOUCH_END, event => {
              this._right = false;

              this._updateMove(1);
            }, this);
            this.rightButton.on(SystemEventType.TOUCH_CANCEL, event => {
              this._right = false;

              this._updateMove(1);
            }, this);
          } // keyboard events


          systemEvent.on(SystemEventType.KEY_DOWN, event => {
            this._keyHandler(event.keyCode, true);
          }, this);
          systemEvent.on(SystemEventType.KEY_UP, event => {
            this._keyHandler(event.keyCode, false);
          }, this);
        }

        _keyHandler(keyCode, isDown) {
          switch (keyCode) {
            case macro.KEY.a:
            case macro.KEY.left:
              this._left = isDown;

              this._updateMove(-1);

              break;

            case macro.KEY.d:
            case macro.KEY.right:
              this._right = isDown;

              this._updateMove(1);

              break;

            case macro.KEY.w:
            case macro.KEY.up:
              if (isDown) {
                this.jump();
              }

              break;

            case macro.KEY.s:
            case macro.KEY.down:
              this.squat(isDown);
              break;

            case macro.KEY.q:
              if (isDown) {
                this.switchWeaponR();
              }

              break;

            case macro.KEY.e:
              if (isDown) {
                this.switchWeaponL();
              }

              break;

            case macro.KEY.space:
              if (isDown) {
                this.switchWeaponR();
                this.switchWeaponL();
              }

              break;

            default:
              return;
          }
        }

        _updateMove(dir) {
          if (this._left && this._right) {
            this.move(dir);
          } else if (this._left) {
            this.move(-1);
          } else if (this._right) {
            this.move(1);
          } else {
            this.move(0);
          }
        }

        move(dir) {
          if (this._moveDir === dir) {
            return;
          }

          this._moveDir = dir;

          this._updateAnimation();
        }

        jump() {
          if (this._isJumpingA) {
            return;
          }

          this._isJumpingA = true;

          this._armature.animation.fadeIn("jump_1", -1, -1, 0, NORMAL_ANIMATION_GROUP);

          this._walkState = null;
        }

        squat(isSquating) {
          if (this._isSquating === isSquating) {
            return;
          }

          this._isSquating = isSquating;

          this._updateAnimation();
        }

        attack(isAttacking) {
          if (this._isAttackingA == isAttacking) {
            return;
          }

          this._isAttackingA = isAttacking;
        }

        switchWeaponL() {
          this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponLIndex++;

          if (this._weaponLIndex >= WEAPON_L_LIST.length) {
            this._weaponLIndex = 0;
          }

          var newWeaponName = WEAPON_L_LIST[this._weaponLIndex];
          let factory = dragonBones.CCFactory.getInstance();
          this._weaponL = factory.buildArmature(newWeaponName);
          this._armature.getSlot('weapon_l').childArmature = this._weaponL;

          this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        }

        switchWeaponR() {
          this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);

          this._weaponRIndex++;

          if (this._weaponRIndex >= WEAPON_R_LIST.length) {
            this._weaponRIndex = 0;
          }

          var newWeaponName = WEAPON_R_LIST[this._weaponRIndex];
          let factory = dragonBones.CCFactory.getInstance();
          this._weaponR = factory.buildArmature(newWeaponName);
          this._armature.getSlot('weapon_r').childArmature = this._weaponR;

          this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        }

        switchSkin() {
          this._skinIndex++;

          if (this._skinIndex >= SKINS.length) {
            this._skinIndex = 0;
          }

          let skinName = SKINS[this._skinIndex];
          let factory = dragonBones.CCFactory.getInstance();
          let skinData = factory.getArmatureData(skinName).defaultSkin;
          factory.replaceSkin(this._armatureDisplay.armature(), skinData, false, ["weapon_l", "weapon_r"]);
        }

        aim(x, y) {
          if (this._aimDir === 0) {
            this._aimDir = 10;
          }

          this._target = this.node.parent._uiProps.uiTransformComp.convertToNodeSpaceAR(new Vec3(x, y, 0));
        }

        update(dt) {
          this._updatePosition();

          this._updateAim();

          this._updateAttack();

          this._enterFrameHandler(dt);
        }

        onDisable() {
          // clean the bullets
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];
            bullet.enabled = false;
          }

          this._bullets = [];
        }

        addBullet(bullet) {
          this._bullets.push(bullet);
        }

        _enterFrameHandler(dt) {
          for (var i = this._bullets.length - 1; i >= 0; i--) {
            var bullet = this._bullets[i];

            if (bullet.update()) {
              this._bullets.splice(i, 1);
            }
          }
        }

        _animationEventHandler(event) {
          if (event.type === dragonBones.EventObject.FADE_IN_COMPLETE) {
            if (event.animationState.name === "jump_1") {
              this._isJumpingB = true;
              this._speedY = -JUMP_SPEED;

              if (this._moveDir != 0) {
                if (this._moveDir * this._faceDir > 0) {
                  this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
                } else {
                  this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
                }
              }

              this._armature.animation.fadeIn("jump_2", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            } else if (event.animationState.name === "jump_4") {
              this._updateAnimation();
            }
          } else if (event.type === dragonBones.EventObject.FADE_OUT_COMPLETE) {
            if (event.animationState.name === "attack_01") {
              this._isAttackingB = false;
              this._attackState = null;
            }
          } else if (event.type === dragonBones.EventObject.COMPLETE) {
            if (event.animationState.name === "jump_4") {
              this._isJumpingA = false;
              this._isJumpingB = false;

              this._updateAnimation();
            }
          }
        }

        _frameEventHandler(event, bone, armature) {
          if (event.name === "fire") {
            // var firePointBone = event.armature.getBone("firePoint");
            var localPoint = new Vec3(event.bone.global.x, event.bone.global.y, 0);
            var display = event.armature.display;
            var globalPoint = display.node.convertToWorldSpace(localPoint);

            this._fire(globalPoint);
          }
        }

        _fire(firePoint) {
          firePoint.x += Math.random() * 2 - 1;
          firePoint.y += Math.random() * 2 - 1;
          firePoint.z = 0;

          var armature = this._armatureDisplay.buildArmature("bullet_01");

          var effect = this._armatureDisplay.buildArmature("fire_effect_01");

          var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
          var bullet = new DragonBullet();
          bullet.init(this.node.parent, armature, effect, radian + Math.random() * 0.02 - 0.01, 40, firePoint);
          this.addBullet(bullet);
        }

        _updateAnimation() {
          if (this._isJumpingA) {
            return;
          }

          if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
            return;
          }

          if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
          } else {
            if (!this._walkState) {
              this._walkState = this._armature.animation.fadeIn("walk", -1, -1, 0, NORMAL_ANIMATION_GROUP);
              this._walkState.resetToPose = false;
            }

            if (this._moveDir * this._faceDir > 0) {
              this._walkState.timeScale = MAX_MOVE_SPEED_FRONT / NORMALIZE_MOVE_SPEED;
            } else {
              this._walkState.timeScale = -MAX_MOVE_SPEED_BACK / NORMALIZE_MOVE_SPEED;
            }

            if (this._moveDir * this._faceDir > 0) {
              this._speedX = MAX_MOVE_SPEED_FRONT * this._faceDir;
            } else {
              this._speedX = -MAX_MOVE_SPEED_BACK * this._faceDir;
            }
          }
        }

        _updatePosition() {
          const camera = this.node._uiProps.uiTransformComp._canvas.camera;
          const pos = this.node.getPosition();

          if (this._speedX !== 0) {
            pos.x += this._speedX;
            var minX = -camera.width / 2;
            var maxX = camera.width / 2;

            if (pos.x < minX) {
              pos.x = minX;
            } else if (pos.x > maxX) {
              pos.x = maxX;
            }

            this.node.setPosition(pos);
          }

          if (this._speedY != 0) {
            if (this._speedY > 5 && this._speedY + G <= 5) {
              this._armature.animation.fadeIn("jump_3", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this._speedY += G;
            pos.y += this._speedY;

            if (pos.y < GROUND) {
              pos.y = GROUND;
              this._speedY = 0;
              this._armature.animation.fadeIn("jump_4", -1, -1, 0, NORMAL_ANIMATION_GROUP).resetToPose = false;
            }

            this.node.setPosition(pos);
          }
        }

        _updateAim() {
          if (!this._mouseDown_) return;

          if (this._aimDir === 0) {
            return;
          }

          const pos = this.node.getPosition();
          const scale = this.node.getScale();
          this._faceDir = this._target.x > pos.x ? 1 : -1;

          if (scale.x * this._faceDir < 0) {
            scale.x *= -1;

            if (this._moveDir) {
              this._updateAnimation();
            }

            this.node.setScale(scale);
          }

          var aimOffsetY = this._armature.getBone("chest").global.y * scale.y;

          if (this._faceDir > 0) {
            this._aimRadian = Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);
          } else {
            this._aimRadian = Math.PI - Math.atan2(this._target.y - pos.y - aimOffsetY, this._target.x - pos.x);

            if (this._aimRadian > Math.PI) {
              this._aimRadian -= Math.PI * 2;
            }
          }

          let aimDir = 0;

          if (this._aimRadian > 0) {
            aimDir = 1;
          } else {
            aimDir = -1;
          }

          if (this._aimDir != aimDir) {
            this._aimDir = aimDir; // Animation mixing.

            if (this._aimDir >= 0) {
              this._aimState = this._armature.animation.fadeIn("aim_up", -1.0, -1, 0, AIM_ANIMATION_GROUP);
            } else {
              this._aimState = this._armature.animation.fadeIn("aim_down", -1.0, -1, 0, AIM_ANIMATION_GROUP);
            }

            this._aimState.resetToPose = false;
          }

          this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2); //_armature.invalidUpdate("pelvis"); // Only update bone mask.

          this._armature.invalidUpdate();
        }

        _updateAttack() {
          if (!this._isAttackingA || this._isAttackingB) {
            return;
          }

          this._isAttackingB = true; // Animation mixing.

          this._attackState = this._armature.animation.fadeIn("attack_01", -1.0, -1, 0, ATTACK_ANIMATION_GROUP, dragonBones.AnimationFadeOutMode.SameGroup);
          this._attackState.resetToPose = false;
          this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "touchHandler", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class4.prototype, "upButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class4.prototype, "downButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class4.prototype, "leftButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class4.prototype, "rightButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class4.prototype, "weaponArmature", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class4.prototype, "skinArmature", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class4)) || _class3) || _class3));
      let DragonBullet = exports('DragonBullet', (_dec = ccclass('DragonBullet'), _dec(_class = class DragonBullet {
        constructor() {
          this._speedX = 0;
          this._speedY = 0;
          this._armature = null;
          this._armatureDisplay = null;
          this._effect = null;
        }

        init(parentNode, armature, effect, radian, speed, position) {
          this._speedX = Math.cos(radian) * speed;
          this._speedY = Math.sin(radian) * speed;

          var thePos = parentNode._uiProps.uiTransformComp.convertToNodeSpaceAR(position);

          armature.playAnimation("idle");
          let armatureNode = armature.node;
          armatureNode.setPosition(thePos);
          armatureNode.angle = radian * macro.DEG;
          this._armature = armature;

          if (effect) {
            this._effect = effect;
            var effectDisplay = this._effect.node;
            effectDisplay.angle = radian * macro.DEG;
            effectDisplay.setPosition(thePos);
            effectDisplay.scaleX = 1 + Math.random() * 1;
            effectDisplay.scaleY = 1 + Math.random() * 0.5;

            if (Math.random() < 0.5) {
              effectDisplay.scaleY *= -1;
            }

            this._effect.playAnimation("idle");

            parentNode.addChild(effectDisplay);
          }

          parentNode.addChild(armatureNode);
        }

        update() {
          let armatureNode = this._armature.node;
          const pos = armatureNode.getPosition();
          pos.x += this._speedX;
          pos.y += this._speedY;
          armatureNode.setPosition(pos);
          const uiTrans = armatureNode.parent._uiProps.uiTransformComp;
          var worldPos = uiTrans.convertToWorldSpaceAR(armatureNode.getPosition());
          const camera = armatureNode._uiProps.uiTransformComp._canvas.camera;

          if (worldPos.x < -100 || worldPos.x >= camera.width + 100 || worldPos.y < -100 || worldPos.y >= camera.height + 100) {
            this.doClean();
            return true;
          }

          return false;
        }

        onDisable() {
          this.doClean();
        }

        doClean() {
          this._armature.node.removeFromParent();

          if (this._effect) {
            this._effect.node.removeFromParent();
          }
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ProjectItem.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteComponent, LabelComponent, _decorator, Component, loader, SpriteFrame, UITransformComponent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
      loader = module.loader;
      SpriteFrame = module.SpriteFrame;
      UITransformComponent = module.UITransformComponent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "291f7CgJqdNK7MPKn5/ejDC", "ProjectItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ProjectItem = exports('ProjectItem', (_dec = ccclass('ProjectItem'), _dec2 = property({
        type: SpriteComponent
      }), _dec3 = property({
        type: LabelComponent
      }), _dec4 = property({
        type: LabelComponent
      }), _dec(_class = (_class2 = class ProjectItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "coverSprite", _descriptor, this);

          _initializerDefineProperty(this, "projectNameLabel", _descriptor2, this);

          _initializerDefineProperty(this, "projectTipsLabel", _descriptor3, this);
        }

        start() {// Your initialization goes here.
        }

        setProjectData(data) {
          if (data.name) {
            this.projectNameLabel.string = data.name;
          }

          if (data.coverImgUrl) {
            loader.loadRes(data.coverImgUrl, SpriteFrame, (err, spr) => {
              if (err) {
                console.error(err);
                return;
              }

              this.coverSprite.spriteFrame = spr;
              const trans = this.coverSprite.node.getComponent(UITransformComponent); // trans.width = spr.width;
              // trans.height = spr.height;
            });
          }

          if (data.tips) {
            this.projectTipsLabel.string = data.tips;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coverSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "projectNameLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "projectTipsLabel", [_dec4], {
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

System.register("chunks:///_virtual/ItemTemplate.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Sprite, Label, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "34f7edJRM5MK6CXDaDOxmg0", "ItemTemplate", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ItemTemplate = exports('ItemTemplate', (_dec = property(Sprite), _dec2 = property(Label), _dec3 = property(Label), ccclass(_class = (_class2 = class ItemTemplate extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "id", _descriptor, this);

          _initializerDefineProperty(this, "icon", _descriptor2, this);

          _initializerDefineProperty(this, "itemName", _descriptor3, this);

          _initializerDefineProperty(this, "itemPrice", _descriptor4, this);
        } // data: {id,iconSF,itemName,itemPrice}


        init(data) {
          this.id = data.id;
          this.icon.spriteFrame = data.iconSF;
          this.itemName.string = data.itemName;
          this.itemPrice.string = data.itemPrice + '';
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "itemPrice", [_dec3], {
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

System.register("chunks:///_virtual/Benchmark.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec3, Prefab, Node, Vec2, EditBoxComponent, LabelComponent, ToggleComponent, RigidBodyComponent, _decorator, Component, profiler, PhysicsSystem, instantiate, randomRange;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      Node = module.Node;
      Vec2 = module.Vec2;
      EditBoxComponent = module.EditBoxComponent;
      LabelComponent = module.LabelComponent;
      ToggleComponent = module.ToggleComponent;
      RigidBodyComponent = module.RigidBodyComponent;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
      PhysicsSystem = module.PhysicsSystem;
      instantiate = module.instantiate;
      randomRange = module.randomRange;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

      cclegacy._RF.push({}, "3f09bZ6iAhGi7ITvWduO+pN", "Benchmark", undefined);

      const {
        ccclass,
        property,
        menu
      } = _decorator;
      const KEY_INIT_STR = exports('KEY_INIT_STR', "KEY_INIT_STR");
      const v3_0 = new Vec3(0, 3, 0);
      var ElementType;

      (function (ElementType) {
        ElementType[ElementType["BOX"] = 0] = "BOX";
        ElementType[ElementType["SPHERE"] = 1] = "SPHERE";
        ElementType[ElementType["BOX_RB"] = 2] = "BOX_RB";
        ElementType[ElementType["SPHERE_RB"] = 3] = "SPHERE_RB";
        ElementType[ElementType["MAX"] = 4] = "MAX";
      })(ElementType || (ElementType = {}));

      let Benchmark = exports('Benchmark', (_dec = ccclass("BENCHMARK.Benchmark"), _dec2 = menu("demo/benchmark/Benchmark"), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Vec2
      }), _dec6 = property({
        type: Vec2
      }), _dec7 = property({
        type: Vec2
      }), _dec8 = property({
        type: EditBoxComponent
      }), _dec9 = property({
        type: LabelComponent
      }), _dec10 = property({
        type: ToggleComponent
      }), _dec11 = property({
        type: ToggleComponent
      }), _dec12 = property({
        type: EditBoxComponent
      }), _dec13 = property({
        type: EditBoxComponent
      }), _dec14 = property({
        type: EditBoxComponent
      }), _dec15 = property({
        type: RigidBodyComponent
      }), _dec(_class = _dec2(_class = (_class2 = class Benchmark extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "elementPrefabs", _descriptor, this);

          _initializerDefineProperty(this, "elementContainers", _descriptor2, this);

          _initializerDefineProperty(this, "rangeY", _descriptor3, this);

          _initializerDefineProperty(this, "rangeXZ", _descriptor4, this);

          _initializerDefineProperty(this, "rangeSize", _descriptor5, this);

          _initializerDefineProperty(this, "l_editBox", _descriptor6, this);

          _initializerDefineProperty(this, "l_current", _descriptor7, this);

          _initializerDefineProperty(this, "r_rotateToggle", _descriptor8, this);

          _initializerDefineProperty(this, "r_useFixToggle", _descriptor9, this);

          _initializerDefineProperty(this, "r_frameRateEditBox", _descriptor10, this);

          _initializerDefineProperty(this, "r_subStepEditBox", _descriptor11, this);

          _initializerDefineProperty(this, "r_IntervalEditBox", _descriptor12, this);

          _initializerDefineProperty(this, "rotateDynamics", _descriptor13, this);

          this.intervalCurrent = 0;
          this.intervalNumber = 0;
          this.enableRotate = true;
          this.addOnceNum = 10;
          this.curElementNum = [0, 0, 0, 0];
        }

        start() {
          profiler.showStats();

          for (let i = 0; i < ElementType.MAX; i++) {
            this.curElementNum[i] = 0;
          }

          const item = localStorage.getItem(KEY_INIT_STR);
          let value = '';

          if (item != null && item != '') {
            this.l_editBox.string = value = item;
          } else {
            value = this.l_editBox.string;
          }

          this.updateAllElementsNumber(value);
          this.onRotateToggle(this.r_rotateToggle);
          this.onEditFrameRate(this.r_frameRateEditBox);
          this.onEditSubStep(this.r_subStepEditBox);
          this.onEditInterval(this.r_IntervalEditBox);
        }

        update() {
          if (this.intervalCurrent == 0) {
            PhysicsSystem.instance.enable = true;
            this.intervalCurrent = this.intervalNumber;
          } else {
            this.intervalCurrent--;
            PhysicsSystem.instance.enable = false;
          }

          if (this.enableRotate) this.rotateDynamics.setAngularVelocity(v3_0);else this.rotateDynamics.setAngularVelocity(Vec3.ZERO);
        }

        updateAllElementsNumber(inputString) {
          if (inputString != '') {
            const arr = inputString.split('-');

            if (arr && arr.length > 0) {
              for (let i = 0; i < arr.length; i++) {
                const count = parseInt(arr[i]);
                if (isNaN(count)) continue;

                switch (i) {
                  case 0:
                    this.updateElementNumber(ElementType.BOX, count);
                    break;

                  case 1:
                    this.updateElementNumber(ElementType.SPHERE, count);
                    break;

                  case 2:
                    this.updateElementNumber(ElementType.BOX_RB, count);
                    break;

                  case 3:
                    this.updateElementNumber(ElementType.SPHERE_RB, count);
                    break;
                }
              }
            }

            this.updateCurrentLab();
          }
        }

        updateElementNumber(elemType, num) {
          const container = this.elementContainers[elemType];
          const prefab = this.elementPrefabs[elemType];
          const curNum = container.children.length;

          if (curNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > curNum) {
            const addNum = num - curNum;

            for (let i = 0; i < addNum; i++) {
              const entity = instantiate(prefab);
              this.resetTransformSingle(entity);
              container.addChild(entity);
            }
          } else {
            // delete
            const deleteNum = curNum - num;

            for (let i = 0; i < deleteNum; i++) {
              const node = container.children[curNum - 1 - i];
              node.destroy();
            }
          }

          this.curElementNum[elemType] = num;
        }

        resetTransforms() {
          this.elementContainers.forEach(container => {
            for (let i = 0; i < container.children.length; i++) {
              const entity = container.children[i];
              this.resetTransformSingle(entity);
            }
          });
        }

        resetTransformSingle(entity) {
          let y = randomRange(this.rangeY.x, this.rangeY.y);
          let x = randomRange(this.rangeXZ.x, this.rangeXZ.y);
          let z = randomRange(this.rangeXZ.x, this.rangeXZ.y);
          entity.setWorldPosition(x, y, z);
          x = randomRange(0, 360);
          y = randomRange(0, 360);
          z = randomRange(0, 360);
          entity.setRotationFromEuler(x, y, z);

          if (Math.random() > 0.3) {
            x = randomRange(this.rangeSize.x, this.rangeSize.y);
            y = randomRange(this.rangeSize.x, this.rangeSize.y);
            z = randomRange(this.rangeSize.x, this.rangeSize.y);

            if (entity.name == "Sphere" || entity.name == "Sphere-RB") {
              entity.setWorldScale(x, x, x);
            } else {
              entity.setWorldScale(x, y, z);
            }
          }
        }

        updateCurrentLab() {
          const a = this.curElementNum[ElementType.BOX];
          const b = this.curElementNum[ElementType.SPHERE];
          const c = this.curElementNum[ElementType.BOX_RB];
          const d = this.curElementNum[ElementType.SPHERE_RB];
          const numString = a + "-" + b + "-" + c + "-" + d;
          this.l_current.string = "目前数量：" + numString;
          this.l_editBox.string = numString;
        }

        addElement(elemType) {
          this.updateElementNumber(elemType, this.elementContainers[elemType].children.length + this.addOnceNum);
          this.updateCurrentLab();
        }

        onAddBox(touch, custom) {
          this.addElement(ElementType.BOX);
        }

        onAddSphere(touch, custom) {
          this.addElement(ElementType.SPHERE);
        }

        onAddBoxRB(touch, custom) {
          this.addElement(ElementType.BOX_RB);
        }

        onAddSphereRB(touch, custom) {
          this.addElement(ElementType.SPHERE_RB);
        }

        onEditFinish(editBox) {
          const str = editBox.string;

          if (str != '') {
            localStorage.setItem(KEY_INIT_STR, str);
            this.updateAllElementsNumber(str);
          }
        }

        onReset(touch, custom) {
          this.resetTransforms();
        }

        onRotateToggle(toggle) {
          this.enableRotate = toggle.isChecked;
        }

        onEditFrameRate(editBox) {
          const v = parseInt(editBox.string);
          if (isNaN(v)) return;

          if (v > 0) {
            PhysicsSystem.instance.fixedTimeStep = 1 / v;
          }
        }

        onEditSubStep(editBox) {
          const v = parseInt(editBox.string);
          if (isNaN(v)) return;

          if (v >= 0) {
            PhysicsSystem.instance.maxSubSteps = v;
          }
        }

        onEditInterval(editBox) {
          const v = parseInt(editBox.string);
          if (isNaN(v)) return;

          if (v >= 0) {
            this.intervalNumber = v;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "elementPrefabs", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "elementContainers", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rangeY", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec2(10, 100);
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rangeXZ", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec2(-50, 50);
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rangeSize", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec2(0.5, 5);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "l_editBox", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "l_current", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "r_rotateToggle", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "r_useFixToggle", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "r_frameRateEditBox", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "r_subStepEditBox", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "r_IntervalEditBox", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rotateDynamics", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/confirmBox.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, LabelComponent, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "424b9SWaJNBLJEqkHEqrnzo", "confirmBox", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let confirmBox = exports('confirmBox', (_dec = ccclass('confirmBox'), _dec2 = property(LabelComponent), _dec(_class = (_class2 = class confirmBox extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbTips", _descriptor, this);

          this.confirmCb = void 0;
          this.cancelCb = void 0;
        }

        start() {// Your initialization goes here.
        }

        show(tips, confirmCb, cancelCb) {
          this.lbTips.string = tips;
          this.confirmCb = confirmCb;
          this.cancelCb = cancelCb;
        }

        onBtnOKClick() {
          if (this.confirmCb) {
            this.confirmCb();
          }

          this.hide();
        }

        onBtnCancelClick() {
          if (this.cancelCb) {
            this.cancelCb();
          }

          this.hide();
        }

        hide() {
          this.node.active = false;
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec2], {
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

System.register("chunks:///_virtual/start.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, director, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      director = module.director;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "37f937d3URMzboRTooIER6h", "start", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Start = exports('Start', (_dec = ccclass('Start'), _dec(_class = class Start extends Component {
        start() {
          cc.debug.setDisplayStats(true);
        }

        changeScene(event, sceneType) {
          switch (sceneType) {
            case 'spine':
              director.loadScene('spine');
              break;

            case 'dragonbones':
              director.loadScene('dragonbones');
              break;
          }
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadScene.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, view, director, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      view = module.view;
      director = module.director;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "4703eoVRkxNeIzIwSSyYwW4", "LoadScene", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LoadScene = exports('LoadScene', (_dec = ccclass('LoadScene'), _dec(_class = class LoadScene extends Component {
        onLoad() {
          view.setDesignResolutionSize(640, 960, 2);
        }

        loadBunny() {
          director.loadScene('BunnyTest');
        }

        loadFrame() {
          director.loadScene('BunnyFrameAnimationTest');
        }

        loadTransform() {
          director.loadScene('BunnyTransformAnimationTest');
        }

        loadUI() {
          director.loadScene('UITest');
        }

        loadSpine() {
          director.loadScene('spine');
        }

      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/storageManager.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "4adeaPzgLRM5Yd1RehgY+RP", "storageManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let StorageManager = exports('StorageManager', (_dec = ccclass("StorageManager"), _dec(_class = (_class2 = class StorageManager {
        constructor() {
          this.jsonData = null;
          this.path = null;
          this.KEY_CONFIG = 'performanceCfg';
          this.markSave = false;
          this.saveTimer = -1;
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new StorageManager();

          this._instance.start();

          return this._instance;
        }

        start() {
          this.jsonData = {
            "userId": ""
          }; // this.path = this.getConfigPath();

          var content; // if (cc.sys.isNative) {
          //     var valueObject = jsb.fileUtils.getValueMapFromFile(this.path);
          //     content = valueObject[this.KEY_CONFIG];
          // } else {
          //     content = cc.sys.localStorage.getItem(this.KEY_CONFIG);
          // }

          content = cc.sys.localStorage.getItem(this.KEY_CONFIG); // // 解密代码
          // if (cc.game.config["encript"]) {
          //     var newContent = new Xxtea("upgradeHeroAbility").xxteaDecrypt(content);
          //     if (newContent && newContent.length > 0) {
          //         content = newContent;
          //     }
          // }

          if (content && content.length) {
            try {
              //初始化操作
              var jsonData = JSON.parse(content);
              this.jsonData = jsonData;
            } catch (excepaiton) {}
          } //启动无限定时器，每1秒保存一次数据，而不是无限保存数据


          this.saveTimer = setInterval(() => {
            this.scheduleSave();
          }, 500);
        }

        setConfigDataWithoutSave(key, value) {
          var account = this.jsonData.userId;

          if (this.jsonData[account]) {
            this.jsonData[account][key] = value;
          } else {
            console.error("no account can not save");
          }
        }

        setConfigData(key, value) {
          this.setConfigDataWithoutSave(key, value); // this.save();

          this.markSave = true; //标记为需要存储，避免一直在写入，而是每隔一段时间进行写入
        }

        getConfigData(key) {
          var account = this.jsonData.userId;

          if (this.jsonData[account]) {
            var value = this.jsonData[account][key];
            return value ? value : "";
          } else {
            cc.log("no account can not load");
            return "";
          }
        }

        setGlobalData(key, value) {
          this.jsonData[key] = value;
          this.save();
        }

        getGlobalData(key) {
          return this.jsonData[key];
        }

        setUserId(userId) {
          this.jsonData.userId = userId;

          if (!this.jsonData[userId]) {
            this.jsonData[userId] = {};
          }

          this.save();
        }

        getUserId() {
          return this.jsonData.userId;
        }

        scheduleSave() {
          if (!this.markSave) {
            return;
          }

          this.save();
        }
        /**
         * 标记为已修改
         */


        markModified() {
          this.markSave = true;
        }

        save() {
          // 写入文件
          var str = JSON.stringify(this.jsonData); // // 加密代码
          // if (cc.game.config["encript"]) {
          //     str = new Xxtea("upgradeHeroAbility").xxteaEncrypt(str);
          // }
          // let zipStr = str;

          this.markSave = false;
          var ls = cc.sys.localStorage;
          ls.setItem(this.KEY_CONFIG, str); // if (!cc.sys.isNative) {
          //     var ls = cc.sys.localStorage;
          //     ls.setItem(this.KEY_CONFIG, str);
          //     return;
          // }
          // var valueObj = {};
          // valueObj[this.KEY_CONFIG] = str;
          // jsb.fileUtils.writeToFile(valueObj, this.path);
        } // getConfigPath () {
        //     var platform = cc.sys.platform;
        //     var path = "";
        //     if (platform === cc.sys.OS_WINDOWS) {
        //         path = "src/conf";
        //     } else if (platform === cc.sys.OS_LINUX) {
        //         path = "./conf";
        //     } else {
        //         if (cc.sys.isNative) {
        //             path = jsb.fileUtils.getWritablePath();
        //             path = path + "conf";
        //         } else {
        //             path = "src/conf";
        //         }
        //     }
        //     return path;
        // }


      }, _class2._instance = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BackList.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, director, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      director = module.director;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "56b67Rm8GFL/74DZIQdH6vR", "BackList", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let BackList = exports('BackList', (_dec = ccclass('BackList'), _dec(_class = class BackList extends Component {
        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        start() {// [3]
        } // update (deltaTime: number) {
        //     // [4]
        // }


        backToList() {
          director.loadScene('test-list');
        }

      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroSlot.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteFrame, Label, Sprite, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "57d15BvDjxLBLxQT6h/Vxab", "HeroSlot", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      const getRandomInt = function (min, max) {
        var ratio = Math.random();
        return min + Math.floor((max - min) * ratio);
      };

      let HeroSlot = exports('HeroSlot', (_dec = property([SpriteFrame]), _dec2 = property([SpriteFrame]), _dec3 = property([SpriteFrame]), _dec4 = property([SpriteFrame]), _dec5 = property(Label), _dec6 = property(Sprite), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec9 = property(Sprite), _dec10 = property([Sprite]), ccclass(_class = (_class2 = class HeroSlot extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfAttributes", _descriptor, this);

          _initializerDefineProperty(this, "sfRanks", _descriptor2, this);

          _initializerDefineProperty(this, "sfHeroes", _descriptor3, this);

          _initializerDefineProperty(this, "sfBorders", _descriptor4, this);

          _initializerDefineProperty(this, "labelLevel", _descriptor5, this);

          _initializerDefineProperty(this, "spHero", _descriptor6, this);

          _initializerDefineProperty(this, "spRank", _descriptor7, this);

          _initializerDefineProperty(this, "spAttribute", _descriptor8, this);

          _initializerDefineProperty(this, "spBorder", _descriptor9, this);

          _initializerDefineProperty(this, "spStars", _descriptor10, this);
        } // use this for initialization


        onLoad() {
          this.refresh();
        }

        refresh() {
          let bgIdx = getRandomInt(0, this.sfBorders.length);
          let heroIdx = getRandomInt(0, this.sfHeroes.length);
          let starIdx = getRandomInt(0, this.spStars.length);
          let rankIdx = getRandomInt(0, this.sfRanks.length);
          let attIdx = getRandomInt(0, this.sfAttributes.length);
          let levelIdx = getRandomInt(0, 100);
          this.labelLevel.string = 'LV.' + levelIdx;
          this.spRank.spriteFrame = this.sfRanks[rankIdx];
          this.refreshStars(starIdx);
          this.spBorder.spriteFrame = this.sfBorders[bgIdx];
          this.spAttribute.spriteFrame = this.sfAttributes[attIdx];
          this.spHero.spriteFrame = this.sfHeroes[heroIdx];
        }

        refreshStars(count) {
          for (let i = 0; i < this.spStars.length; ++i) {
            if (i <= count) this.spStars[i].enabled = true;else this.spStars[i].enabled = false;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfAttributes", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfRanks", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sfHeroes", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sfBorders", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelLevel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spHero", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spRank", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spAttribute", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spBorder", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "spStars", [_dec10], {
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

System.register("chunks:///_virtual/player.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './instacingMaterial.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, Vec3, Tween, SkeletalAnimationComponent, SkinningModelComponent, instacingMaterial;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      SkeletalAnimationComponent = module.SkeletalAnimationComponent;
      SkinningModelComponent = module.SkinningModelComponent;
    }, function (module) {
      instacingMaterial = module.instacingMaterial;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "62579N1fFdIdbaTNEdZclqj", "player", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let player = exports('player', (_dec = ccclass('player'), _dec(_class = (_class2 = class player extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "triangle", _descriptor, this);

          _initializerDefineProperty(this, "vertex", _descriptor2, this);

          this.manager = void 0;
          this.tweenMove = void 0;
        }

        start() {// Your initialization goes here.
        }

        show(manager) {
          //x: -5~5
          //z: -20~6
          this.manager = manager;
          let x = -8 - 3 * this.manager.currentLevel + Math.random() * (16 + 6 * this.manager.currentLevel);
          let z = -20 + Math.random() * (26 + 5 * this.manager.currentLevel);
          let pos = new Vec3(x, 0, z);
          this.node.position = pos; //TODO 开始随机移动

          this.move();

          if (this.manager.enableInstancing) {
            this.changeInstancingBatch(true); //如果当前开启合批，则跟随开启
          }

          this.changeShadow(this.manager.enableShadow);
        }

        onDestroy() {
          if (this.tweenMove) {
            this.tweenMove.stop();
            this.tweenMove = null;
          }
        }

        move() {
          let nextPoint = new Vec3(-8 - 3 * this.manager.currentLevel + Math.random() * (16 + 6 * this.manager.currentLevel), 0, -20 + Math.random() * (26 + 5 * this.manager.currentLevel));
          let offset = nextPoint.clone().subtract(this.node.position);
          this.node.forward = offset.clone().normalize().negative();
          let costTime = offset.length() / 2;

          if (this.tweenMove) {
            this.tweenMove.stop();
            this.tweenMove = null;
          }

          this.tweenMove = new Tween(this.node).to(costTime, {
            position: nextPoint
          }).call(() => {
            this.move();
          }).start();
        }

        changeInstancingBatch(isEnable) {
          let arrInstancing = this.node.getComponentsInChildren(instacingMaterial);
          arrInstancing.forEach(instancing => {
            instancing.enableInstancing = isEnable;
          });

          if (isEnable) {
            this.node.getComponent(SkeletalAnimationComponent).play();
          }
        }

        changeShadow(isEnable) {
          let arrModel = this.node.getComponentsInChildren(SkinningModelComponent);
          arrModel.forEach(model => {
            model.shadowCastingMode = isEnable ? SkinningModelComponent.ShadowCastingMode.ON : SkinningModelComponent.ShadowCastingMode.OFF;
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "triangle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "vertex", [property], {
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

System.register("chunks:///_virtual/playerManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './player2.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, EditBox, _decorator, Component, instantiate, Player;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      EditBox = module.EditBox;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "64bfbhn93BD1rmiSW5r5LxV", "playerManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let PlayerManager = exports('PlayerManager', (_dec = ccclass('PlayerManager'), _dec2 = property([Prefab]), _dec3 = property(EditBox), _dec(_class = (_class2 = class PlayerManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerPrefabs", _descriptor, this);

          _initializerDefineProperty(this, "numberInput", _descriptor2, this);

          this.playerList = [];
          this.spriteNum = 0;
        }

        update() {
          this.playerMove();
        }

        playerMove() {
          let num = this.playerList.length;

          for (let i = 0; i < num; i++) {
            const player = this.playerList[i];
            player.move();
          }
        }

        updateSpriteNumber(num) {
          if (this.spriteNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > this.spriteNum) {
            const addNum = num - this.spriteNum;

            for (let i = 0; i < addNum; i++) {
              const pfPlayer = this.playerPrefabs[i % this.playerPrefabs.length];
              let sprite = instantiate(pfPlayer);
              sprite.parent = this.node;
              let playerScript = sprite.getComponent(Player);
              playerScript.show();
              this.playerList.push(playerScript);
            }

            this.spriteNum = num;
          } else {
            // reduce
            const deleteNum = this.spriteNum - num;

            for (let i = 0; i < deleteNum; i++) {
              const playerScript = this.playerList.pop();

              if (!playerScript) {
                return;
              }

              playerScript.node.destroy();
            }

            this.spriteNum = num;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "numberInput", [_dec3], {
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

System.register("chunks:///_virtual/ItemList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteFrame, Prefab, _decorator, Component, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _dec3, _dec4, _class4, _class5, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "65624vpQr9Gw44FPeQEHWhM", "ItemList", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Item = exports('Item', (_dec = ccclass('Item'), _dec2 = property(SpriteFrame), _dec(_class = (_class2 = class Item {
        constructor() {
          _initializerDefineProperty(this, "id", _descriptor, this);

          _initializerDefineProperty(this, "itemName", _descriptor2, this);

          _initializerDefineProperty(this, "itemPrice", _descriptor3, this);

          _initializerDefineProperty(this, "iconSF", _descriptor4, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "itemName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPrice", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "iconSF", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      let ItemList = exports('ItemList', (_dec3 = property([Item]), _dec4 = property(Prefab), ccclass(_class4 = (_class5 = class ItemList extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "items", _descriptor5, this);

          _initializerDefineProperty(this, "itemPrefab", _descriptor6, this);
        }

        onLoad() {
          for (var i = 0; i < this.items.length; ++i) {
            var item = instantiate(this.itemPrefab);
            var data = this.items[i];
            this.node.addChild(item);
            item.getComponent('ItemTemplate').init(data);
          }
        }

      }, (_descriptor5 = _applyDecoratedDescriptor(_class5.prototype, "items", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class5.prototype, "itemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class5)) || _class4));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LobbyManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ProjectItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, _decorator, Component, find, loader, JsonAsset, instantiate, ButtonComponent, EventHandler, director, ProjectItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      find = module.find;
      loader = module.loader;
      JsonAsset = module.JsonAsset;
      instantiate = module.instantiate;
      ButtonComponent = module.ButtonComponent;
      EventHandler = module.EventHandler;
      director = module.director;
    }, function (module) {
      ProjectItem = module.ProjectItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "684fdjvT8hNTbt0UXQYYJn8", "LobbyManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LobbyManager = exports('LobbyManager', (_dec = ccclass('LobbyManager'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: Node
      }), _dec(_class = (_class2 = class LobbyManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "projectItemPrfb", _descriptor, this);

          _initializerDefineProperty(this, "scrollViewContent", _descriptor2, this);

          this._projectData = [];
        }

        start() {
          // Your initialization goes here.
          const persistCanvas = find('PersistCanvas');
          persistCanvas.active = false;
          loader.loadRes('lobby/projects.json', JsonAsset, (err, jsonObj) => {
            if (Array.isArray(jsonObj.json)) {
              this._projectData = jsonObj.json;
              this.generateProjectList(jsonObj.json);
            }
          });
        }

        generateProjectList(projectData) {
          projectData.forEach((data, index) => {
            const projectItem = instantiate(this.projectItemPrfb);
            projectItem.parent = this.scrollViewContent;
            const item = projectItem.getComponent(ProjectItem);
            item.setProjectData(data);
            const buttons = projectItem.getComponentsInChildren(ButtonComponent);
            const clickEventHandler = new EventHandler();
            clickEventHandler.target = this.node;
            clickEventHandler.component = 'LobbyManager';
            clickEventHandler.customEventData = '' + index;
            clickEventHandler.handler = 'onItemClicked';
            buttons.forEach(button => {
              button.clickEvents.push(clickEventHandler);
            });
          });
        }

        onItemClicked(event, customEventData) {
          //console.log(customEventData);
          const data = this._projectData[customEventData];

          if (director.loadScene(data.sceneUrl)) {
            const persistCanvas = find('PersistCanvas');
            persistCanvas.active = true;
          }
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "projectItemPrfb", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollViewContent", [_dec3], {
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

System.register("chunks:///_virtual/ChargeUI.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "731777n3LdF7rEriG3jUd4K", "ChargeUI", undefined);

      const {
        ccclass
      } = _decorator;
      let ChargeUI = exports('ChargeUI', ccclass(_class = class ChargeUI extends Component {
        constructor(...args) {
          super(...args);
          this.home = null;
          this.parentBtns = null;
        }

        init(home, parentBtns) {
          this.home = home;
          this.parentBtns = parentBtns;
        }

        show() {
          this.node.active = true;
          this.node.emit('fade-in');
        }

        hide() {
          this.node.active = false;
          this.node.emit('fade-out');
        }

      }) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/first-person-camera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Vec2, Vec3, Quat, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec2 = module.Vec2;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "7a6df4+ul5KsaJGJ/KMsEeC", "first-person-camera", undefined);

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
        SHIFT: cc.macro.KEY.shift
      };
      let FirstPersonCamera = exports('FirstPersonCamera', (_dec = property({
        slide: true,
        range: [0.05, 0.5, 0.01]
      }), ccclass(_class = (_class2 = class FirstPersonCamera extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "moveSpeed", _descriptor, this);

          _initializerDefineProperty(this, "moveSpeedShiftScale", _descriptor2, this);

          _initializerDefineProperty(this, "damp", _descriptor3, this);

          _initializerDefineProperty(this, "rotateSpeed", _descriptor4, this);

          this._euler = new Vec3();
          this._velocity = new Vec3();
          this._position = new Vec3();
          this._speedScale = 1;
        }

        onLoad() {
          cc.systemEvent.on(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          Vec3.copy(this._euler, this.node.eulerAngles);
          Vec3.copy(this._position, this.node.position);
        }

        onDestroy() {
          cc.systemEvent.off(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
          cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
          cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
          cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_START, this.onTouchStart, this);
          cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
          cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        update(dt) {
          // position
          Vec3.transformQuat(v3_1, this._velocity, this.node.rotation);
          Vec3.scaleAndAdd(this._position, this._position, v3_1, this.moveSpeed * this._speedScale);
          Vec3.lerp(v3_1, this.node.position, this._position, dt / this.damp);
          this.node.setPosition(v3_1); // rotation

          Quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
          Quat.slerp(qt_1, this.node.rotation, qt_1, dt / this.damp);
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
          if (cc.game.canvas.requestPointerLock) {
            cc.game.canvas.requestPointerLock();
          }
        }

        onTouchMove(e) {
          e.getStartLocation(v2_1);

          if (v2_1.x > cc.game.canvas.width * 0.4) {
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

          if (v2_1.x < cc.game.canvas.width * 0.4) {
            // position
            this._velocity.x = 0;
            this._velocity.z = 0;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [property], {
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

System.register("chunks:///_virtual/TopBar.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Component, game, director, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      game = module.game;
      director = module.director;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "800b4ylXfRJdZIBkS//R42S", "TopBar", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let TopBar = exports('TopBar', (_dec = ccclass('TopBar'), _dec(_class = class TopBar extends Component {
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;
        start() {
          // Your initialization goes here.
          game.addPersistRootNode(this.node);
        }

        onHomeButtonClicked() {
          director.loadScene('lobby');
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CreateObject.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Vec3, instantiate, randomRange;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      randomRange = module.randomRange;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "7f47eVepZJMtJLjVppxPtdT", "CreateObject", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = CreateObject
       * DateTime = Thu Dec 23 2021 17:44:49 GMT+0800 (GMT+08:00)
       * Author = xu58895777
       * FileBasename = CreateObject.ts
       * FileBasenameNoExtension = CreateObject
       * URL = db://assets/scripts/CreateObject.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
       *
       */

      let CreateObject = exports('CreateObject', (_dec = ccclass('CreateObject'), _dec2 = property(Node), _dec3 = property(Number), _dec(_class = (_class2 = class CreateObject extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "object", _descriptor, this);

          this._initP = new Vec3(0.0, 0.0, 0.0);
          this._nowP = new Vec3(0.0, 0.0, 0.0);

          _initializerDefineProperty(this, "range", _descriptor2, this);
        }

        start() {}

        createObject(box) {
          let lightCnt = parseInt(box.string);

          for (let i = 0; i < lightCnt; i++) {
            const lightInst = instantiate(this.object);
            lightInst.parent = this.node;
            const rangex = randomRange(-this.range, this.range);
            const rangey = randomRange(-this.range, this.range);
            const rangez = randomRange(-this.range, this.range);
            console.log(rangex);
            lightInst.position = new Vec3(rangex, rangey, rangez);
            lightInst.getWorldPosition(this._initP);
          }
        }

        removeAll() {
          this.node.removeAllChildren();
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "object", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "range", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 20;
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

System.register("chunks:///_virtual/BackPackUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, ScrollView, Label, _decorator, Component, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      ScrollView = module.ScrollView;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "88c12+9VW9MSa0k23tDsf+r", "BackPackUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let BackPackUI = exports('BackPackUI', (_dec = property({
        type: Prefab
      }), _dec2 = property({
        type: ScrollView
      }), _dec3 = property({
        type: Label
      }), ccclass(_class = (_class2 = class BackPackUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "slotPrefab", _descriptor, this);

          _initializerDefineProperty(this, "scrollView", _descriptor2, this);

          _initializerDefineProperty(this, "totalCount", _descriptor3, this);

          _initializerDefineProperty(this, "totalCountLabel", _descriptor4, this);

          this.heroSlots = [];
        }

        start() {
          this.heroSlots.length = 0;

          for (let i = 0; i < this.totalCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
          }

          this.totalCountLabel.string = "items: " + this.totalCount;
        }

        addHeroSlot() {
          let heroSlot = instantiate(this.slotPrefab);
          this.scrollView.content.addChild(heroSlot);
          return heroSlot;
        }

        add() {
          for (let i = 0; i < 10; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
          }

          this.totalCount += 10;
          this.totalCountLabel.string = "items: " + this.totalCount;
        }

        delete() {
          if (this.heroSlots.length <= 0) return;

          for (let i = 0; i < 10; ++i) {
            const hero = this.heroSlots.pop();
            this.scrollView.content.removeChild(hero);
            hero.destroy();
          }

          this.totalCount -= 10;
          this.totalCountLabel.string = "items: " + this.totalCount;
        }

        reset() {
          this.scrollView.content.removeAllChildren();

          while (this.heroSlots.length > 0) {
            const hero = this.heroSlots.pop();
            hero.destroy();
          }

          this.totalCount = 0;
          this.totalCountLabel.string = "items: " + this.totalCount;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slotPrefab", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "totalCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "totalCountLabel", [_dec3], {
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

System.register("chunks:///_virtual/ReplaceSlotDisplay.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, dragonBones, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      dragonBones = module.dragonBones;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "8c143MTiytPEpW1sihXhDt7", "ReplaceSlotDisplay", undefined);

      const {
        ccclass,
        property,
        requireComponent
      } = _decorator;
      let ReplaceSlotDisplay = exports('ReplaceSlotDisplay', (_dec = ccclass('ReplaceSlotDisplay'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec3 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec(_class = (_class2 = class ReplaceSlotDisplay extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "armatureDisplay", _descriptor, this);

          _initializerDefineProperty(this, "replaceArmatureDisplay", _descriptor2, this);

          this._leftWeaponIndex = 0;
          this._rightDisplayIndex = 0;
          this._rightDisplayNames = [];
          this._rightDisplayOffset = [];
        }

        start() {
          this.replaceArmatureDisplay.node.active = false;
          this._leftWeaponIndex = 0;
          this._rightDisplayIndex = 0;
          this._rightDisplayNames = ["weapon_1004_r", "weapon_1004d_r"];
          this._rightDisplayOffset = [{
            x: 0,
            y: 0
          }, {
            x: -60,
            y: 100
          }];
        }

        left() {
          let armature = this.armatureDisplay.armature();
          let slot = armature.getSlot("weapon_hand_l");
          slot.displayIndex = slot.displayIndex == 0 ? 4 : 0;
        }

        right() {
          this._rightDisplayIndex++;
          this._rightDisplayIndex %= this._rightDisplayNames.length;
          let armature = this.armatureDisplay.armature();
          let slot = armature.getSlot("weapon_hand_r");
          const displayName = this._rightDisplayNames[this._rightDisplayIndex];
          let factory = dragonBones.CCFactory.getInstance();
          factory.replaceSlotDisplay(this.replaceArmatureDisplay.getArmatureKey(), "weapon", "weapon_r", displayName, slot);
          let offset = this._rightDisplayOffset[this._rightDisplayIndex];
          slot.parent.offset.x = offset.x;
          slot.parent.offset.y = offset.y;
          armature.invalidUpdate();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "armatureDisplay", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "replaceArmatureDisplay", [_dec3], {
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

System.register("chunks:///_virtual/test-cache-alpha.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, find, Sprite, Button, Label, color, math, instantiate, UITransform, size, Vec3;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      find = module.find;
      Sprite = module.Sprite;
      Button = module.Button;
      Label = module.Label;
      color = module.color;
      math = module.math;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      size = module.size;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "9ab0esNdeJJNJ+AslzJlSHr", "test-cache-alpha", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = TestCacheAlpha
       * DateTime = Mon Nov 15 2021 15:32:15 GMT+0800 (中国标准时间)
       * Author = zmzczy
       * FileBasename = test-cache-alpha.ts
       * FileBasenameNoExtension = test-cache-alpha
       * URL = db://assets/test-update-alpha/test-cache-alpha.ts
       * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
       *
       */

      let TestCacheAlpha = exports('TestCacheAlpha', (_dec = ccclass('TestCacheAlpha'), _dec2 = property([Prefab]), _dec(_class = (_class2 = class TestCacheAlpha extends Component {
        constructor(...args) {
          super(...args);
          this._root = null;
          this._rootSprite = null;
          this._modeButton1 = null;
          this._modeButton2 = null;
          this._countLabel = null;

          _initializerDefineProperty(this, "playerPrefabs", _descriptor, this);

          this._totalDepth = 7;
          this._minWidth = 4;
          this._maxWidth = 4;
          this._spriteCounter = 0;
          this._ceilWidth = 50;
          this._ceilHeight = 50;
          this._generatedNodes = [];
          this._lastModifiedIndex = -1;
          this._curMode = 0;
        }

        start() {
          // [3]
          this._root = find('Canvas/root');
          this._rootSprite = this._root.getComponent(Sprite);
          this.generateSpriteNodes([this._root], this._totalDepth);
          this._modeButton1 = find('Canvas/ModeButton1').getComponent(Button);

          this._modeButton1.node.on('click', () => {
            this.switchMode(0);
          }, this);

          this._modeButton2 = find('Canvas/ModeButton2').getComponent(Button);

          this._modeButton2.node.on('click', () => {
            this.switchMode(1);
          }, this);

          this._countLabel = find('Canvas/CountLabel').getComponent(Label);
          this._countLabel.string = `当前sprite数量：${this._generatedNodes.length.toString()}`;
        }

        update(deltaTime) {
          // [4]
          if (this._curMode == 0) {
            this.testRandomNodeAlpha_mode1();
          } else if (this._curMode == 1) {
            this.testTotalNodeRandomAlpha_mode2();
          }
        }

        switchMode(mode) {
          this._curMode = mode;
        }

        testTotalNodeRandomAlpha_mode2() {
          if (this._lastModifiedIndex >= 0 && this._lastModifiedIndex < this._generatedNodes.length) {
            const lastNode = this._generatedNodes[this._lastModifiedIndex];
            const lastSprite = lastNode.getComponent(Sprite);
            lastSprite.color = color(255, 255, 255, 255);
            this._lastModifiedIndex = -1;
          }

          const randomAlpha = math.randomRangeInt(0, 256);
          this._rootSprite.color = color(255, 255, 255, randomAlpha);
        }

        testRandomNodeAlpha_mode1() {
          if (this._lastModifiedIndex >= 0 && this._lastModifiedIndex < this._generatedNodes.length) {
            const lastNode = this._generatedNodes[this._lastModifiedIndex];
            const lastSprite = lastNode.getComponent(Sprite);
            lastSprite.color = color(255, 255, 255, 255);
          }

          if (this._rootSprite.color.a !== 255) {
            this._rootSprite.color = color(255, 255, 255, 255);
          }

          const randomIndex = math.randomRangeInt(0, this._generatedNodes.length);
          const node = this._generatedNodes[randomIndex];
          const sprite = node.getComponent(Sprite);
          sprite.color = color(255, 255, 255, 128);
          this._lastModifiedIndex = randomIndex;
        }

        generateSpriteNodes(parents, curDepth) {
          if (curDepth <= 0) {
            return;
          }

          let thisFloorNodes = [];

          for (let k = 0; k < parents.length; k++) {
            const thisWidth = math.randomRangeInt(this._minWidth, this._maxWidth + 1);

            for (let i = 0; i < thisWidth; i++) {
              const randomVal = math.randomRangeInt(0, this.playerPrefabs.length);
              const tempNode = instantiate(this.playerPrefabs[randomVal]);
              tempNode.parent = parents[k];
              tempNode.getComponent(UITransform).contentSize = size(30, 30);
              thisFloorNodes.push(tempNode);
              tempNode.name = `${tempNode.name}-index${this._spriteCounter}`;
              const pos = this.setSpriteNodePos(tempNode, curDepth, thisWidth, i);
              this._spriteCounter++;

              this._generatedNodes.push(tempNode);

              console.log(`sprite-${this._spriteCounter}: curDepth = ${this._totalDepth - curDepth}, widthIndex = ${i}, spriteIndex = ${randomVal}, pos = ${pos}`);
            }
          }

          this.generateSpriteNodes(thisFloorNodes, --curDepth);
        }

        setSpriteNodePos(node, curDepth, curFloorNodeCount, floorNodeIndex) {
          const posY = node.position.y - this._ceilHeight;
          const curCeilWidth = this._ceilWidth * curDepth;
          const totalWidth = (curFloorNodeCount - 1) * curCeilWidth;
          const posX = -totalWidth / 2 + floorNodeIndex * curCeilWidth;
          const pos = new Vec3(posX, posY, 0);
          node.position = pos;
          return pos;
        }

      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/player2.ts", ['cc', './gameManager.ts'], function (exports) {
  'use strict';

  var cclegacy, Component, _decorator, GameManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "9df9ayz6JtLiKbNRTX7pisg", "player", undefined);

      const {
        ccclass
      } = _decorator;
      let Player = exports('Player', (_dec = ccclass('Player'), _dec(_class = class Player extends Component {
        constructor(...args) {
          super(...args);
          this.speedX = 0;
          this.speedY = 0;
        }

        start() {
          // [3]
          this.speedX = Math.random() * 10;
          this.speedY = Math.random() * 10 - 5;
        }

        show() {
          this.node.setPosition(GameManager.minX + 10, GameManager.maxY * 0.7, 0);
        }

        move() {
          let speedX = this.speedX;
          let speedY = this.speedY;
          let x = this.node.position.x + speedX;
          let y = this.node.position.y - speedY;

          if (x > GameManager.maxX) {
            speedX = -1 * speedX;
            x = GameManager.maxX;
          } else if (x < GameManager.minX) {
            speedX = -1 * speedX;
            x = GameManager.minX;
          }

          if (y < GameManager.minY) {
            speedY = -1 * speedY;
            y = GameManager.minY;
          } else if (y > GameManager.maxY) {
            speedY = -1 * speedY;
            y = GameManager.maxY;
          }

          this.speedX = speedX;
          this.speedY = speedY;
          this.node.setPosition(x, y, 0);
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PanelTransition.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, Vec3, Color, UIRenderable;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Color = module.Color;
      UIRenderable = module.UIRenderable;
    }],
    execute: function () {
      var _class, _class2, _descriptor;

      cclegacy._RF.push({}, "a254b2vmRVFr5nFhCR7Wwwb", "PanelTransition", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let PanelTransition = exports('PanelTransition', ccclass(_class = (_class2 = class PanelTransition extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "duration", _descriptor, this);

          this.outOfWorld = new Vec3();
          this._color = new Color();
        } // use this for initialization


        onLoad() {
          this.outOfWorld = new Vec3(3000, 0, 0);
          this.node.setPosition(this.outOfWorld); // let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
          // let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
          // this.actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 255), cc.scaleTo(this.duration, 1.0)), cbFadeIn);
          // this.actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(this.duration, 0), cc.scaleTo(this.duration, 2.0)), cbFadeOut);

          this.node.on('fade-in', this.startFadeIn, this);
        }

        startFadeIn() {
          this.node.setPosition(0, 0, 0);
          this.node.setScale(2, 2, 2);
          const renderComp = this.node.getComponent(UIRenderable);

          this._color.set(renderComp.color);

          this._color.a = 0;
          renderComp.color = this._color; // this.node.runAction(this.actionFadeIn);
        }

        onFadeOutFinish() {
          this.node.setPosition(this.outOfWorld);
        }

      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "duration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mapManager.ts", ['cc', './resManager.ts'], function (exports) {
  'use strict';

  var cclegacy, Component, instantiate, _decorator, ResManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      instantiate = module.instantiate;
      _decorator = module._decorator;
    }, function (module) {
      ResManager = module.default;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "a324fBNYCtNt6AlyIli4W5J", "mapManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let mapManager = exports('mapManager', (_dec = ccclass('mapManager'), _dec(_class = class mapManager extends Component {
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;
        start() {
          // Your initialization goes here.
          ResManager.getModel('map', (err, prefab) => {
            if (!err) {
              let node = instantiate(prefab);
              node.parent = this.node;
            }
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerManager2.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './resManager.ts', './storageManager.ts', './player.ts', './gameLogic.ts', './constants.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, CCString, CameraComponent, _decorator, Component, instantiate, profiler, Tween, Vec3, ResManager, StorageManager, player, gameLogic, constants;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      CCString = module.CCString;
      CameraComponent = module.CameraComponent;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
      profiler = module.profiler;
      Tween = module.Tween;
      Vec3 = module.Vec3;
    }, function (module) {
      ResManager = module.default;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      player = module.player;
    }, function (module) {
      gameLogic = module.gameLogic;
    }, function (module) {
      constants = module.constants;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "a4e78T+22ZOW7SYk4+bsMpx", "playerManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const CAMERA_MOVE_PER_PERSON = 100; //每多少人摄像机抬高一次

      const ANTI_KEY = 'anti-aliasing';
      let playerManager = exports('playerManager', (_dec = ccclass('playerManager'), _dec2 = property([CCString]), _dec3 = property(CameraComponent), _dec(_class = (_class2 = class playerManager extends Component {
        constructor(...args) {
          super(...args);
          this.arrModel = [];

          _initializerDefineProperty(this, "arrName", _descriptor, this);

          _initializerDefineProperty(this, "mainCamera", _descriptor2, this);

          this.artTriangle = 0;
          this.artVertex = 0;
          this._people = 0;
          this.onPeopleNumChanged = null;
          this.isStart = false;
          this.currentLevel = 0;
          this.tweenCamera = void 0;
          this.posCameraOrigin = void 0;
          this.isEnableInstancing = false;
          this._prevPeopleRate = 0;
          this.isEnableShadow = true;
          this.isEnableAntiAliasing = false;
        }

        get people() {
          return this._people;
        }

        set people(value) {
          this._people = value;

          if (this.onPeopleNumChanged) {
            this.onPeopleNumChanged(this._people);
          }
        } //人数除以30等于多少倍


        set enableInstancing(value) {
          this.isEnableInstancing = value;
          this.node.children.forEach(nodePlayer => {
            let playerScript = nodePlayer.getComponent(player);

            if (playerScript) {
              playerScript.changeInstancingBatch(value);
            }
          });
        }

        get enableInstancing() {
          return this.isEnableInstancing;
        }

        set enableShadow(value) {
          this.isEnableShadow = value;
          this.node.children.forEach(nodePlayer => {
            let playerScript = nodePlayer.getComponent(player);

            if (playerScript) {
              playerScript.changeShadow(value);
            }
          });
        }

        get enableShadow() {
          return this.isEnableShadow;
        }

        set enableAntiAliasing(value) {
          this.isEnableAntiAliasing = value;
          StorageManager.instance.setGlobalData(ANTI_KEY, value);

          if (cc.sys.isBrowser) {
            window.location.reload();
          } else if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            console.log('reload!');
            window.wx.exitMiniProgram({
              complete: () => {}
            });
          } else if (cc.sys.isNative) {
            window.__restartVM();
          }
        }

        get enableAntiAliasing() {
          return this.isEnableAntiAliasing;
        }

        onLoad() {
          ResManager.resPath = 'model-animation/';
          StorageManager.instance.start();
          this.isEnableAntiAliasing = StorageManager.instance.getGlobalData(ANTI_KEY) || false;
        }

        start() {
          // Your initialization goes here.
          this.arrName.forEach(name => {
            ResManager.getModel(name, (err, prefab) => {
              if (!err) {
                this.arrModel.push(prefab);

                if (this.arrModel.length === this.arrName.length) {
                  this.addPlayerGroup();
                  this.isStart = true;
                }
              }
            });
          });
          this.posCameraOrigin = this.mainCamera.node.position.clone();
        }

        addPlayerGroup() {
          this.updatePlayerNumber(this.people + this.arrModel.length);
        }

        resetPlayer() {
          this.node.destroyAllChildren();
          this.artTriangle = 0;
          this.artVertex = 0;
          this.people = 0;
          this.currentLevel = 0;
          this.mainCamera.node.position = this.posCameraOrigin;
          this._prevPeopleRate = 0;
        }

        reducePlayer() {
          this.updatePlayerNumber(this.people - this.arrName.length);
        }

        updatePlayerNumber(num) {
          if (this.people === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > this.people) {
            const addNum = num - this.people;

            for (let i = 0; i < addNum; i++) {
              const pfModel = this.arrModel[i % this.arrModel.length];
              let model = instantiate(pfModel);
              model.parent = this.node;
              let playerScript = model.getComponent(player);
              playerScript.show(this);
              this.artTriangle += playerScript.triangle;
              this.artVertex += playerScript.vertex;
            }

            this.people = num;

            if (Math.floor(this.people / CAMERA_MOVE_PER_PERSON) > this.currentLevel) {
              //触发镜头拉高
              this.moveUpCamera();
            }

            let rate = Math.floor(this.people / 30);

            if (rate > this._prevPeopleRate) {
              let obj = {
                'Fps': Math.round(profiler._stats.fps.counter.value).toString(),
                'Drawcall': profiler._stats.draws.counter.value.toString(),
                'Instancing': profiler._stats.instances.counter.value.toString(),
                'Triangle': profiler._stats.tricount.counter.value.toString(),
                'GFXMem': profiler._stats.textureMemory.counter.value.toFixed(1).toString(),
                'GameLogic': profiler._stats.logic.counter.value.toFixed(2).toString(),
                'ArtTriangle': this.artTriangle.toString(),
                'Vertex': this.artVertex.toString(),
                'People': this.people.toString()
              };
              this.scheduleOnce(() => {
                gameLogic.customEventStatistics(constants.EVENT_TYPE.PERFORMANCE_PARAMETER, obj);
              }, 0.5);
              this._prevPeopleRate = rate;
            }
          } else {
            // reduce
            const deleteNum = this.people - num;

            for (let i = 0; i < deleteNum; i++) {
              const nodePlayer = this.node.children[this.node.children.length - 1 - i];

              if (!nodePlayer) {
                return;
              }

              let playerScript = nodePlayer.getComponent(player);
              this.artTriangle -= playerScript.triangle;
              this.artVertex -= playerScript.vertex;
              nodePlayer.destroy();
            }

            this.people = num;

            if (this.currentLevel > Math.floor(this.people / CAMERA_MOVE_PER_PERSON)) {
              this.currentLevel = Math.floor(this.people / CAMERA_MOVE_PER_PERSON);
              let pos = this.mainCamera.node.forward.clone().negative().multiplyScalar(8 * this.currentLevel);
              pos.add(this.posCameraOrigin);

              if (this.tweenCamera) {
                this.tweenCamera.stop();
                this.tweenCamera = null;
              }

              this.tweenCamera = new Tween(this.mainCamera.node).to(0.2, {
                position: pos
              }).start();
            }
          }
        }

        moveUpCamera() {
          this.currentLevel++;
          let direction = this.mainCamera.node.forward.clone().negative().multiplyScalar(8);
          direction.add(this.mainCamera.node.position);

          if (this.tweenCamera) {
            this.tweenCamera.stop();
            this.tweenCamera = null;
          }

          this.tweenCamera = new Tween(this.mainCamera.node).to(0.2, {
            position: direction
          }).start();
        }

        addDancer() {
          ResManager.getModel('dance1', (err, prefab) => {
            if (!err) {
              let model = instantiate(prefab);
              model.parent = this.node;
              model.setScale(new Vec3(2.5, 2.5, 2.5));
              model.setPosition(new Vec3(2.4, 0, 2));
            }
          });
        } // enableInstancing (isEnable: boolean) {
        //     // this.arrName.forEach((name)=>{
        //     //     let nodePlayer = this.node.getChildByName(name);
        //     //     nodePlayer.getComponent(player).changeInstancingBatch(isEnable);
        //     // });
        //     this.isEnableInstancing = false;
        //     this.node.children.forEach((nodePlayer)=>{
        //         let playerScript = nodePlayer.getComponent(player);
        //         if (playerScript) {
        //             playerScript.changeInstancingBatch(isEnable);
        //         }
        //     })
        // }
        // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec3], {
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

System.register("chunks:///_virtual/Helper.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ModelInfo.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, CameraComponent, LabelComponent, ToggleContainerComponent, Node, EditBoxComponent, _decorator, Component, Vec3, loader, Prefab, profiler, Tween, instantiate, ModelInfo;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      CameraComponent = module.CameraComponent;
      LabelComponent = module.LabelComponent;
      ToggleContainerComponent = module.ToggleContainerComponent;
      Node = module.Node;
      EditBoxComponent = module.EditBoxComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      loader = module.loader;
      Prefab = module.Prefab;
      profiler = module.profiler;
      Tween = module.Tween;
      instantiate = module.instantiate;
    }, function (module) {
      ModelInfo = module.ModelInfo;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

      cclegacy._RF.push({}, "a874e3MGUdA4ao/19DmSCRI", "Helper", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const CAMERA_MOVE_PER_MODEL = 80;
      const maxCount = 6;
      let Helper = exports('Helper', (_dec = ccclass('Helper'), _dec2 = property(CameraComponent), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec5 = property(LabelComponent), _dec6 = property(LabelComponent), _dec7 = property(LabelComponent), _dec8 = property(ToggleContainerComponent), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(EditBoxComponent), _dec(_class = (_class2 = class Helper extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "camera", _descriptor, this);

          _initializerDefineProperty(this, "fps", _descriptor2, this);

          _initializerDefineProperty(this, "drawcall", _descriptor3, this);

          _initializerDefineProperty(this, "triangle", _descriptor4, this);

          _initializerDefineProperty(this, "vertices", _descriptor5, this);

          _initializerDefineProperty(this, "countLabel", _descriptor6, this);

          _initializerDefineProperty(this, "container", _descriptor7, this);

          _initializerDefineProperty(this, "btn", _descriptor8, this);

          _initializerDefineProperty(this, "modelRoot", _descriptor9, this);

          _initializerDefineProperty(this, "resPath", _descriptor10, this);

          _initializerDefineProperty(this, "numberInput", _descriptor11, this);

          this.prefabList = new Map();
          this.originPos = new Vec3(-30, 0, -120);
          this.cameraPos = new Vec3();
          this.tweenCamera = void 0;
          this.currModelName = '';
          this.currLevel = 0;
          this.trianglesStr = 0;
          this.verticesStr = 0;
          this._count = 0;
          this.num = 0;
          this.enableInstancing = true;
          this.delaySchedule = -1;
        }

        get count() {
          return this._count;
        }

        set count(value) {
          this._count = value;
          this.numberInput.string = '' + value;
          this.updateStr();
        }

        start() {
          loader.loadRes(this.resPath + '9.8', Prefab, (err, asset) => {
            if (err) {
              console.warn(err);
              return;
            }

            this.currModelName = asset.data.name;
            this.prefabList.set(asset.data.name, asset);
            this.onBtnAdd();
            this.btn.active = true;
          });
          this.cameraPos.set(this.camera.node.worldPosition);
          this.btn.active = false;

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        onBtnClear() {
          this.modelRoot.destroyAllChildren();
          this.modelRoot.removeAllChildren();
          this.camera.node.setPosition(this.cameraPos);
          this.trianglesStr = 0;
          this.verticesStr = 0;
          this.count = 0;
          this.currLevel = 0;
        }

        onBtnAdd() {
          this.updateModelNumber(this.count + maxCount);
        }

        onBtnReduce() {
          this.updateModelNumber(this.count - maxCount);
        }

        onBtnChanged(toggle) {
          //x: -8~8
          //z: -16~2
          this.currModelName = toggle.node.name;
          const count = this.modelRoot.children.length;
          this.onBtnClear();

          if (!this.prefabList.get(this.currModelName)) {
            this.btn.active = false;
            loader.loadRes(this.resPath + `${this.currModelName}`, Prefab, (err, asset) => {
              if (err) {
                console.warn(err);
                return;
              }

              this.prefabList.set(asset.data.name, asset);
              this.updateModelNumber(count);
              this.btn.active = true;
            });
            return;
          }

          this.updateModelNumber(count);
        }

        onBtnUseGpu(toggle) {
          this.enableInstancing = toggle.isChecked;
          const models = this.modelRoot.children;
          const len = models.length;

          for (let i = 0; i < len; i++) {
            const model = models[i];
            const info = model.getComponent(ModelInfo);
            info.changeInstancingBatch(this.enableInstancing);
          }
        }

        updateStr() {
          this.vertices.string = `${Math.round(this.verticesStr * 1000)}`;
          this.countLabel.string = `${this.count}`;
        }

        update() {
          this.num++;

          if (this.num > 10 && profiler._stats) {
            this.num = 0;
            this.drawcall.string = profiler._stats.draws.counter.value.toString();
            this.fps.string = Math.round(profiler._stats.fps.counter.value).toString();
            this.triangle.string = profiler._stats.tricount.counter.value.toString();
          }
        }

        moveUpCamera() {
          this.currLevel = Math.floor(this.modelRoot.children.length / CAMERA_MOVE_PER_MODEL);
          let direction = this.camera.node.forward.clone().negative().multiplyScalar(8 * this.currLevel);
          direction.add(this.cameraPos);

          if (this.tweenCamera) {
            this.tweenCamera.stop();
            this.tweenCamera = null;
          }

          if (this.tweenCamera) {
            this.tweenCamera.stop();
          }

          this.tweenCamera = new Tween(this.camera.node).to(0.2, {
            position: direction
          }).start();
        }

        updateModelNumber(num) {
          if (this.count === num) {
            return;
          }

          if (num < 0 || this.count === num) {
            return;
          }

          const addNum = num - this.count;

          if (addNum > 0) {
            const prefab = this.prefabList.get(this.currModelName);

            for (let i = 0; i < addNum; i++) {
              const model = instantiate(prefab);
              model.parent = this.modelRoot;
              const info = model.getComponent(ModelInfo);

              if (!this.enableInstancing) {
                info.changeInstancingBatch(false);
              }

              const vertex = info.vertices;
              this.verticesStr += vertex; //x: -8~8
              //z: -16~2

              const curL = Math.floor(this.modelRoot.children.length / CAMERA_MOVE_PER_MODEL);
              let x = -8 - 3 * curL + Math.random() * (12 + 6 * curL);
              let z = -16 + Math.random() * (18 + 5 * curL);
              let pos = new Vec3(x, 0, z);
              model.setPosition(pos);
            }

            if (Math.floor(num / CAMERA_MOVE_PER_MODEL) > this.currLevel) {
              //触发镜头拉高
              this.moveUpCamera();
            }
          } else {
            const models = this.modelRoot.children;
            let len = models.length - 1;
            let vertex = 0;
            const deleteNum = Math.abs(addNum);

            for (let i = 0; i < deleteNum; i++) {
              const model = models[len - i];
              vertex = vertex || model.getComponent(ModelInfo).vertices;
              this.verticesStr -= vertex;
              model.removeFromParent();
              model.destroy();
            }

            if (this.currLevel > Math.floor(num / CAMERA_MOVE_PER_MODEL)) {
              this.moveUpCamera();
            }
          }

          this.count = num;
        }

        onNumberInputEnd() {
          let num = Number.parseInt(this.numberInput.string);

          if (!num) {
            num = 0;
            this.numberInput.string = '0';
          }

          this.updateModelNumber(num);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fps", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "drawcall", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "triangle", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "vertices", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "countLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "btn", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "modelRoot", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "resPath", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 'model-triangles/model/';
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "numberInput", [_dec11], {
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

System.register("chunks:///_virtual/bunnyFrameAnimationTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Label, Node, _decorator, Component, profiler, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "a8c52b1FgFCoZgRS2p9MTLo", "bunnyFrameAnimationTest", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let bunnyType = 0;
      let totalCount = 0;
      let count = 0;
      let amount = 0;
      let BunnyFrameAnimationTest = exports('BunnyFrameAnimationTest', (_dec = ccclass('BunnyFrameAnimationTest'), _dec2 = property(Prefab), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = class BunnyFrameAnimationTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefabBunny", _descriptor, this);

          _initializerDefineProperty(this, "number", _descriptor2, this);

          _initializerDefineProperty(this, "root", _descriptor3, this);

          this.bunnys = [];
        }

        onLoad() {
          this.reset();

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        reset() {
          this.bunnys = [];
          bunnyType = 0;
          totalCount = 100;
          count = 0;
          amount = 50;
        }

        update(dt) {
          let bunny, i;

          if (this.bunnys.length < totalCount) {
            for (i = 0; i < amount; i++) {
              bunny = instantiate(this.prefabBunny);
              bunny.getComponent("PrefabAnimationBunny").init(bunnyType, 1);
              this.root.addChild(bunny);
              this.bunnys.push(bunny);
              count++;
            }

            this.number.string = count;
            bunnyType++;
            bunnyType %= 5;
          }
        }

        addItem() {
          totalCount += 100;
        }

        reduceItem() {
          totalCount -= 100;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabBunny", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "number", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "root", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
       */
      // const baseRenderScene = require("baseRenderScene");
      // let config = require("config");
      // 
      // let bunnyType = 0;
      // let totalCount = 0;
      // let count = 0;
      // let amount = 0;
      // 
      // cc.Class({
      //     extends: baseRenderScene,
      // 
      //     properties: {
      //         prefabBunny: cc.Prefab,
      //         number: cc.Label
      //     },
      // 
      //     // use this for initialization
      //     onLoad: function () {
      //         this._super(this.name.match(/<(\S*)>/)[1]);
      // 
      //         this.number.node.zIndex = config.HIGHEST_ZINDEX;
      // 
      //         this.reset();
      //     },
      // 
      //     reset: function () {
      //         this.bunnys = [];
      //         
      //         bunnyType = 0;
      //         totalCount = config.SCENE_ARGS.count;
      //         count = 0;
      //         amount = 50;
      //     },
      // 
      //     // called every frame, uncomment this function to activate update callback
      //     update: function (dt) {
      //         let bunny, i;
      //         if (this.bunnys.length < totalCount) {
      //             for (i = 0; i < amount; i++) {
      //                 bunny = cc.instantiate(this.prefabBunny);
      //                 bunny.getComponent("prefabAnimationBunny").init(bunnyType, 1);
      //                 this.node.addChild(bunny);
      //                 this.bunnys.push(bunny);
      //                 count++;
      //             }
      //             this.number.string = count;
      //             bunnyType++;
      //             bunnyType %= 5;
      //         }
      //     },
      // });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ButtonScaler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, _decorator, Component, Vec3, Button, tween, SystemEventType;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Button = module.Button;
      tween = module.tween;
      SystemEventType = module.SystemEventType;
    }],
    execute: function () {
      var _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "aeffbvAe81PUK6yo5lqC9d9", "ButtonScaler", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ButtonScaler = exports('ButtonScaler', ccclass(_class = (_class2 = class ButtonScaler extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scaleTo", _descriptor, this);

          _initializerDefineProperty(this, "transDuration", _descriptor2, this);

          this.initScale = new Vec3();
          this.button = null;
          this._scale = new Vec3(1, 1, 1);
          this._lastScale = new Vec3();
          this._start = new Vec3();
        } // use this for initialization


        onLoad() {
          var self = this;
          self.initScale = this.node.scale;
          self.button = self.getComponent(Button);
          const tweenDown = tween(this._scale);
          const tewenUp = tween(this._scale);
          this.node.getScale(this._start);
          tweenDown.to(this.transDuration, this.scaleTo, {
            easing: 'cubicInOut'
          });
          tewenUp.to(this.transDuration, this._start, {
            easing: 'cubicInOut'
          });

          this._lastScale.set(this._scale);

          function onTouchDown(event) {
            tweenDown.start();
          }

          function onTouchUp(event) {
            tweenDown.stop();
            tewenUp.start();
          }

          this.node.on(SystemEventType.TOUCH_START, onTouchDown, this);
          this.node.on(SystemEventType.TOUCH_END, onTouchUp, this);
          this.node.on(SystemEventType.TOUCH_CANCEL, onTouchUp, this);
        }

        update() {
          if (!this._scale.equals(this._lastScale)) {
            this.node.setScale(this._scale);

            this._lastScale.set(this._scale);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scaleTo", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(1.2, 1.2, 1.2);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "transDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.2;
        }
      })), _class2)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhysicsEnvCheck.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Enum, Component, physics, LabelComponent, SpriteComponent, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      Component = module.Component;
      physics = module.physics;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "b39853MhdxNDa1s/EG2covB", "PhysicsEnvCheck", undefined);

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
        EPhysicsItem[EPhysicsItem["BUILTIN_AMMO"] = EPhysicsItem.BUILTIN + EPhysicsItem.AMMO] = "BUILTIN_AMMO";
        EPhysicsItem[EPhysicsItem["CANNON_AMMO"] = EPhysicsItem.CANNON + EPhysicsItem.AMMO] = "CANNON_AMMO";
        EPhysicsItem[EPhysicsItem["ALL"] = -1] = "ALL";
      })(EPhysicsItem || (EPhysicsItem = {}));

      Enum(EPhysicsItem);
      let PhysicsEnvCheck = exports('PhysicsEnvCheck', (_dec = ccclass("CHECKS.PhysicsEnvCheck"), _dec2 = menu("misc/checks/PhysicsEnvCheck"), _dec(_class = _dec2(_class = class PhysicsEnvCheck extends Component {
        constructor(...args) {
          super(...args);
          this.physics = EPhysicsItem.CANNON_AMMO;
        }

        onLoad() {
          if (physics.PhysicsSystem.PHYSICS_AMMO) {
            const lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = "当前物理：bullet(ammo.js)";
          } else {
            const lbCom = this.node.getChildByName('desc').getComponent(LabelComponent);
            lbCom.string = "当前物理：" + physics.selector.id;
          }

          if (physics.PhysicsSystem.PHYSICS_PHYSX) return;
          const name = this.node.name;

          if (name == "cannon-ammo") {
            this.physics = EPhysicsItem.CANNON_AMMO;
          } else if (name == "builtin") {
            this.physics = EPhysicsItem.BUILTIN;
          } else if (name == "cannon") {
            this.physics = EPhysicsItem.CANNON;
          } else if (name == "ammo") {
            this.physics = EPhysicsItem.AMMO;
          } else if (name == "builtin-cannon-ammo") {
            this.physics = EPhysicsItem.ALL;
          } else if (name == "builtin-ammo") {
            this.physics = EPhysicsItem.BUILTIN_AMMO;
          }

          switch (this.physics) {
            case EPhysicsItem.ALL:
              break;

            case EPhysicsItem.CANNON_AMMO:
              if (physics.PhysicsSystem.PHYSICS_CANNON || physics.PhysicsSystem.PHYSICS_AMMO) {
                break;
              }

              let lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
              lbCom.enabled = true;
              lbCom.string = "测试此场景需要将物理模块设置为 cannon.js 或 ammo.js";
              let sprCom = this.getComponentInChildren(SpriteComponent);
              sprCom.enabled = true;
              break;

            case EPhysicsItem.BUILTIN_AMMO:
              if (physics.PhysicsSystem.PHYSICS_BUILTIN || physics.PhysicsSystem.PHYSICS_AMMO) {
                break;
              }

              let lbCom1 = this.node.getChildByName('lb').getComponent(LabelComponent);
              lbCom1.enabled = true;
              lbCom1.string = "测试此场景需要将物理模块设置为 builtin 或 ammo.js";
              let sprCom1 = this.getComponentInChildren(SpriteComponent);
              sprCom1.enabled = true;
              break;

            case EPhysicsItem.CANNON:
              if (!physics.PhysicsSystem.PHYSICS_CANNON) {
                let lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = "测试此场景需要将物理模块设置为 cannon.js";
                let sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;

            case EPhysicsItem.AMMO:
              if (!physics.PhysicsSystem.PHYSICS_AMMO) {
                let lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = "测试此场景需要将物理模块设置为 ammo.js";
                let sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;

            case EPhysicsItem.BUILTIN:
              if (!physics.PhysicsSystem.PHYSICS_BUILTIN) {
                let lbCom = this.node.getChildByName('lb').getComponent(LabelComponent);
                lbCom.enabled = true;
                lbCom.string = "测试此场景需要将物理模块设置为 builtin";
                let sprCom = this.getComponentInChildren(SpriteComponent);
                sprCom.enabled = true;
              }

              break;
          }
        }

      }) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/mainUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './confirmBox.ts', './constants.ts', './playerManager2.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, LabelComponent, SpriteFrame, SpriteComponent, Node, EditBoxComponent, _decorator, Component, profiler, confirmBox, constants, playerManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      LabelComponent = module.LabelComponent;
      SpriteFrame = module.SpriteFrame;
      SpriteComponent = module.SpriteComponent;
      Node = module.Node;
      EditBoxComponent = module.EditBoxComponent;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
    }, function (module) {
      confirmBox = module.confirmBox;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      playerManager = module.playerManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18;

      cclegacy._RF.push({}, "b58f4RcmHBBFILOG5qxAEvD", "mainUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let mainUI = exports('mainUI', (_dec = ccclass('mainUI'), _dec2 = property(playerManager), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec5 = property(LabelComponent), _dec6 = property(LabelComponent), _dec7 = property(LabelComponent), _dec8 = property(LabelComponent), _dec9 = property(LabelComponent), _dec10 = property(LabelComponent), _dec11 = property(LabelComponent), _dec12 = property(SpriteFrame), _dec13 = property(SpriteFrame), _dec14 = property(SpriteComponent), _dec15 = property(SpriteComponent), _dec16 = property(SpriteComponent), _dec17 = property(Node), _dec18 = property(LabelComponent), _dec19 = property(EditBoxComponent), _dec(_class = (_class2 = class mainUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "manager", _descriptor, this);

          _initializerDefineProperty(this, "lbFps", _descriptor2, this);

          _initializerDefineProperty(this, "lbDrawcall", _descriptor3, this);

          _initializerDefineProperty(this, "lbInstancing", _descriptor4, this);

          _initializerDefineProperty(this, "lbTriangle", _descriptor5, this);

          _initializerDefineProperty(this, "lbGFXMem", _descriptor6, this);

          _initializerDefineProperty(this, "lbGameLogic", _descriptor7, this);

          _initializerDefineProperty(this, "lbArtTriangle", _descriptor8, this);

          _initializerDefineProperty(this, "lbVertex", _descriptor9, this);

          _initializerDefineProperty(this, "lbPeople", _descriptor10, this);

          _initializerDefineProperty(this, "imgOn", _descriptor11, this);

          _initializerDefineProperty(this, "imgOff", _descriptor12, this);

          _initializerDefineProperty(this, "spInstacing", _descriptor13, this);

          _initializerDefineProperty(this, "spShadow", _descriptor14, this);

          _initializerDefineProperty(this, "spAliasing", _descriptor15, this);

          _initializerDefineProperty(this, "nodeConfirmBox", _descriptor16, this);

          _initializerDefineProperty(this, "lbVersion", _descriptor17, this);

          _initializerDefineProperty(this, "numberInput", _descriptor18, this);

          this.count = 0;
          this.curClickLogoTimes = 0;
          this.maxClickLogoTimes = 3;
        }

        set enableInstancing(value) {
          this.manager.enableInstancing = value;
          this.spInstacing.spriteFrame = value ? this.imgOn : this.imgOff;
        }

        get enableInstancing() {
          return this.manager.enableInstancing;
        }

        set enableShadow(value) {
          this.manager.enableShadow = value;
          this.spShadow.spriteFrame = value ? this.imgOn : this.imgOff;
        }

        get enableShadow() {
          return this.manager.enableShadow;
        }

        shareGame(title, imageUrl) {
          if (!window.wx) {
            return;
          }

          window.wx.showShareMenu({
            withShareTicket: true,
            complete: () => {}
          });
          window.wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
              title: title,
              imageUrl: imageUrl
            };
          });
          var updateManager = window['wx'].getUpdateManager();
          updateManager.onUpdateReady(() => {
            window['wx'].showModal({
              title: '温馨提示',
              content: '新的版本已经准备好, 请重新启动',
              success: res => {
                if (res.confirm) {
                  updateManager.applyUpdate();
                }
              }
            });
          });
        }

        start() {
          if (window.cocosAnalytics) {
            window.cocosAnalytics.init({
              appID: "697959573",
              // 游戏ID
              version: constants.VERSION,
              // 游戏/应用版本号
              storeID: "wechat",
              // 分发渠道
              engine: "cocos" // 游戏引擎

            });
          } // Your initialization goes here.


          this.shareGame("更多精彩游戏等你来发现！", "https://res.592you.com/game-shares/cake/imgs/40.jpg");

          if (!profiler._stats) {
            console.log('showStats');
            profiler.showStats();
          } //@ts-ignore
          // if (profiler._rootNode) {
          //     //@ts-ignore
          //     profiler._rootNode.active = false;
          // }


          this.lbVersion.string = 'Version: ' + constants.VERSION;
          this.updateSwitch();

          if (this.manager) {
            this.manager.onPeopleNumChanged = this.onPeopleNumberChanged.bind(this);
          }
        }

        updateSwitch() {
          this.spShadow.spriteFrame = this.enableShadow ? this.imgOn : this.imgOff;
          this.spInstacing.spriteFrame = this.enableInstancing ? this.imgOn : this.imgOff;
          this.spAliasing.spriteFrame = this.manager.enableAntiAliasing ? this.imgOn : this.imgOff;
        }

        onBtnAddClick() {
          this.manager.addPlayerGroup();
        }

        onBtnResetClick() {
          this.manager.resetPlayer();
          this.curClickLogoTimes = 0;
        }

        onBtnReduceClick() {
          //减人
          this.manager.reducePlayer();
        }

        onLogoClick() {
          this.curClickLogoTimes += 1;

          if (this.curClickLogoTimes === this.maxClickLogoTimes) {
            this.manager.addDancer();
          }
        }

        switchInstancing() {
          // this.spInstacing.spriteFrame
          this.enableInstancing = !this.enableInstancing;
        }

        switchAliasing() {
          //跳出提示框
          let str = this.manager.enableAntiAliasing ? '关闭' : '开启';
          this.nodeConfirmBox.getComponent(confirmBox).show(`${str}抗锯齿需要重启游戏`, () => {
            this.manager.enableAntiAliasing = !this.manager.enableAntiAliasing;
          }, () => {});
          this.nodeConfirmBox.active = true;
        }

        switchShadow() {
          this.enableShadow = !this.enableShadow;
        }

        onNumberInputEnd() {
          const num = Number.parseInt(this.numberInput.string);
          this.manager.updatePlayerNumber(num);
        }

        onPeopleNumberChanged(num) {
          if (this.numberInput) {
            this.numberInput.string = num.toString();
          }
        }

        update(deltaTime) {
          // Your update function goes here.
          this.count++;

          if (this.count > 10 && profiler._stats) {
            this.count = 0; //fps

            this.lbFps.string = Math.round(profiler._stats.fps.counter.value).toString(); //drawcall

            this.lbDrawcall.string = profiler._stats.draws.counter.value.toString();
            this.lbInstancing.string = profiler._stats.instances.counter.value.toString();
            this.lbTriangle.string = profiler._stats.tricount.counter.value.toString();
            this.lbGFXMem.string = profiler._stats.textureMemory.counter.value.toFixed(1).toString();
            this.lbGameLogic.string = profiler._stats.logic.counter.value.toFixed(2).toString();
            this.lbArtTriangle.string = this.manager.artTriangle.toString();
            this.lbVertex.string = this.manager.artVertex.toString();
            this.lbPeople.string = this.manager.people.toString();
          } //

        }

        onDestroy() {
          // @ts-ignore
          if (profiler._rootNode) {
            // @ts-ignore
            profiler._rootNode.active = true;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "manager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbFps", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDrawcall", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbInstancing", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbTriangle", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbGFXMem", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbGameLogic", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "lbArtTriangle", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lbVertex", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "lbPeople", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "imgOn", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "imgOff", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "spInstacing", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "spShadow", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "spAliasing", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "nodeConfirmBox", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "lbVersion", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "numberInput", [_dec19], {
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

System.register("chunks:///_virtual/gameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './equipmentManager.ts', './environmentManager.ts', './monsterManager.ts', './playerManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, CCInteger, EditBox, _decorator, Component, view, profiler, EquipmentManager, EnvironmentManager, MonsterManager, PlayerManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      CCInteger = module.CCInteger;
      EditBox = module.EditBox;
      _decorator = module._decorator;
      Component = module.Component;
      view = module.view;
      profiler = module.profiler;
    }, function (module) {
      EquipmentManager = module.EquipmentManager;
    }, function (module) {
      EnvironmentManager = module.EnvironmentManager;
    }, function (module) {
      MonsterManager = module.MonsterManager;
    }, function (module) {
      PlayerManager = module.PlayerManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3;

      cclegacy._RF.push({}, "b720eT0MvxGxL+j5+uVlj/5", "gameManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      var ObjectType;

      (function (ObjectType) {
        ObjectType[ObjectType["Player"] = 0] = "Player";
        ObjectType[ObjectType["Monster"] = 1] = "Monster";
        ObjectType[ObjectType["Environment"] = 2] = "Environment";
        ObjectType[ObjectType["Equipment"] = 3] = "Equipment";
      })(ObjectType || (ObjectType = {}));

      let GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(PlayerManager), _dec3 = property(EnvironmentManager), _dec4 = property(MonsterManager), _dec5 = property(EquipmentManager), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Label), _dec10 = property(CCInteger), _dec11 = property(EditBox), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerManager", _descriptor, this);

          _initializerDefineProperty(this, "environmentManager", _descriptor2, this);

          _initializerDefineProperty(this, "monsterManager", _descriptor3, this);

          _initializerDefineProperty(this, "equipmentManager", _descriptor4, this);

          _initializerDefineProperty(this, "playerCount", _descriptor5, this);

          _initializerDefineProperty(this, "monsterCount", _descriptor6, this);

          _initializerDefineProperty(this, "BGCount", _descriptor7, this);

          _initializerDefineProperty(this, "backPackCount", _descriptor8, this);

          _initializerDefineProperty(this, "addNum", _descriptor9, this);

          _initializerDefineProperty(this, "numberInput", _descriptor10, this);

          this._controlType = ObjectType.Player;
          this._currentManager = void 0;
          this._currentLabel = void 0;
        }

        get controlType() {
          return this._controlType;
        }

        set controlType(val) {
          if (this._controlType === val) {
            return;
          }

          this._controlType = val;
          this.updateControlType();
        }

        onLoad() {
          const visibleSize = view.getVisibleSize();
          GameManager.maxX = visibleSize.width / 2;
          GameManager.minX = -GameManager.maxX;
          GameManager.maxY = visibleSize.height / 2;
          GameManager.minY = -GameManager.maxY;

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        start() {
          // [3]
          this.updateControlType();
        } // update (deltaTime: number) {
        //     // [4]
        // }


        changeControlType(comp, type) {
          if (!comp.isChecked) {
            return;
          }

          const cType = Number.parseInt(type);
          this.controlType = cType;
        }

        updateControlType() {
          switch (this._controlType) {
            case ObjectType.Equipment:
              this._currentManager = this.equipmentManager;

              this._currentManager.showBackPack();

              this._currentLabel = this.backPackCount;
              break;

            case ObjectType.Environment:
              this._currentManager = this.environmentManager;
              this._currentLabel = this.BGCount;
              break;

            case ObjectType.Monster:
              this._currentManager = this.monsterManager;
              this._currentLabel = this.monsterCount;
              break;

            case ObjectType.Player:
            default:
              this._currentManager = this.playerManager;
              this._currentLabel = this.playerCount;
              break;
          }
        } // interface


        addFunction() {
          const num = this._currentManager.spriteNum + this.addNum;

          this._currentManager.updateSpriteNumber(num);

          this._currentLabel.string = this._currentManager.spriteNum.toString();
        }

        reduceFunction() {
          const num = this._currentManager.spriteNum - this.addNum;

          this._currentManager.updateSpriteNumber(num);

          this._currentLabel.string = this._currentManager.spriteNum.toString();
        }

        resetFunction() {
          this._currentManager.updateSpriteNumber(0);

          this._currentLabel.string = this._currentManager.spriteNum.toString();
        }

        onNumberInputEnd() {
          const num = Number.parseInt(this.numberInput.string);

          this._currentManager.updateSpriteNumber(num);

          this._currentLabel.string = this._currentManager.spriteNum.toString();
        }

      }, _class3.maxX = 0, _class3.minX = 0, _class3.maxY = 0, _class3.minY = 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "environmentManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "monsterManager", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "equipmentManager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerCount", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "monsterCount", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "BGCount", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "backPackCount", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "addNum", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "numberInput", [_dec11], {
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

System.register("chunks:///_virtual/AdapterContent.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, UITransform, Vec3;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "b7e58W4jq9D568mZxKnWRGk", "AdapterContent", undefined);

      const {
        ccclass,
        property,
        type
      } = _decorator;
      let AdapterContent = exports('AdapterContent', (_dec = ccclass('AdapterContent'), _dec2 = type(Node), _dec(_class = (_class2 = class AdapterContent extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scroll", _descriptor, this);
        }

        start() {
          this.sizeChanged();
          this.scroll.on(Node.EventType.SIZE_CHANGED, this.sizeChanged, this);
        }

        sizeChanged() {
          const contentSize = this.scroll.getComponent(UITransform).contentSize;
          const pos = this.node.position;
          this.node.setPosition(new Vec3(pos.x, contentSize.height / 2));
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "scroll", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/instacingMaterial.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Material, _decorator, Component, SkinningModelComponent, ModelComponent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Material = module.Material;
      _decorator = module._decorator;
      Component = module.Component;
      SkinningModelComponent = module.SkinningModelComponent;
      ModelComponent = module.ModelComponent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "bcf19WXQ/FNSoaaPEqPFbYb", "instacingMaterial", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let instacingMaterial = exports('instacingMaterial', (_dec = ccclass('instacingMaterial'), _dec2 = property(Material), _dec3 = property(Material), _dec(_class = (_class2 = class instacingMaterial extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "normalMaterial", _descriptor, this);

          _initializerDefineProperty(this, "instancingMaterial", _descriptor2, this);

          this._isEnable = false;
        }

        set enableInstancing(value) {
          this._isEnable = value;
          let material = this._isEnable ? this.instancingMaterial : this.normalMaterial;
          let skinModel = this.node.getComponent(SkinningModelComponent);

          if (skinModel) {
            let len = skinModel.materials.length;

            for (let idx = 0; idx < len; idx++) {
              skinModel.setMaterial(material, idx);
            }
          } else {
            let model = this.node.getComponent(ModelComponent);

            if (model) {
              let len = model.materials.length;

              for (let idx = 0; idx < len; idx++) {
                model.setMaterial(material, idx);
              }
            }
          }
        }

        get enableInstancing() {
          return this._isEnable;
        }

        start() {// Your initialization goes here.
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "normalMaterial", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "instancingMaterial", [_dec3], {
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

System.register("chunks:///_virtual/SubBtnsUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Animation, Button, Node, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Animation = module.Animation;
      Button = module.Button;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "bc2c4zW09lHwpndXfuPHzZv", "SubBtnsUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let SubBtnsUI = exports('SubBtnsUI', (_dec = property(Animation), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Node), ccclass(_class = (_class2 = class SubBtnsUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "subBtnsAnim", _descriptor, this);

          _initializerDefineProperty(this, "btnShowSub", _descriptor2, this);

          _initializerDefineProperty(this, "btnHideSub", _descriptor3, this);

          _initializerDefineProperty(this, "btnContainer", _descriptor4, this);
        } // use this for initialization


        onLoad() {
          this.btnShowSub.node.active = true;
          this.btnHideSub.node.active = false;
        }

        showSubBtns() {
          this.btnContainer.active = true;
          this.subBtnsAnim.play('sub_pop');
        }

        hideSubBtns() {
          this.subBtnsAnim.play('sub_fold');
        }

        onFinishAnim(finishFold) {
          this.btnShowSub.node.active = finishFold;
          this.btnHideSub.node.active = !finishFold;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "subBtnsAnim", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnShowSub", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "btnHideSub", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnContainer", [_dec4], {
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

System.register("chunks:///_virtual/migrate-canvas.ts", ['cc'], function () {
  'use strict';

  var cclegacy, director, Director, Canvas, Camera, game, Node;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Director = module.Director;
      Canvas = module.Canvas;
      Camera = module.Camera;
      game = module.game;
      Node = module.Node;
    }],
    execute: function () {
      cclegacy._RF.push({}, "bd33eqcz9BN7rU24e5XBRFV", "migrate-canvas", undefined);

      const customLayerMask = 0x000fffff;
      const builtinLayerMask = 0xfff00000;
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
        var _director$getScene, _director$getScene2, _director$getScene3;

        const roots = (_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.children;
        let allCanvases = (_director$getScene2 = director.getScene()) == null ? void 0 : _director$getScene2.getComponentsInChildren(Canvas);
        if (allCanvases.length <= 1) return;
        allCanvases = allCanvases.filter(x => !!x.cameraComponent);
        let allCameras = (_director$getScene3 = director.getScene()) == null ? void 0 : _director$getScene3.getComponentsInChildren(Camera);
        let usedLayer = 0;
        allCameras.forEach(x => usedLayer |= x.visibility & customLayerMask);
        const persistCanvas = [];

        for (let i = 0, l = roots.length; i < l; i++) {
          const root = roots[i];
          if (!game.isPersistRootNode(root)) continue;
          const canvases = root.getComponentsInChildren(Canvas);
          if (canvases.length === 0) continue;
          persistCanvas.push(...canvases.filter(x => !!x.cameraComponent));
        }

        persistCanvas.forEach(val => {
          const isLayerCollided = allCanvases.find(x => x !== val && x.cameraComponent.visibility & val.cameraComponent.visibility & customLayerMask);

          if (isLayerCollided) {
            const availableLayers = ~usedLayer;
            const lastAvailableLayer = availableLayers & ~(availableLayers - 1);
            val.cameraComponent.visibility = lastAvailableLayer | val.cameraComponent.visibility & builtinLayerMask;
            setChildrenLayer(val.node, lastAvailableLayer);
            usedLayer |= availableLayers;
          }
        });
      });

      function setChildrenLayer(node, layer) {
        for (let i = 0, l = node.children.length; i < l; i++) {
          node.children[i].layer = layer;
          setChildrenLayer(node.children[i], layer);
        }
      }

      let setParentEngine = Node.prototype.setParent;
      {
        Node.prototype.setParent = function (value, keepWorldTransform) {
          setParentEngine.call(this, value, keepWorldTransform);
          if (!value) return; // find canvas

          let layer = getCanvasCameraLayer(this);

          if (layer) {
            this.layer = layer;
            setChildrenLayer(this, layer);
          }
        };
      }

      function getCanvasCameraLayer(node) {
        let layer = 0;
        let canvas = node.getComponent(Canvas);

        if (canvas && canvas.cameraComponent) {
          if (canvas.cameraComponent.visibility & canvas.node.layer) {
            layer = canvas.node.layer;
          } else {
            layer = canvas.cameraComponent.visibility & ~(canvas.cameraComponent.visibility - 1);
          }

          return layer;
        }

        if (node.parent) {
          layer = getCanvasCameraLayer(node.parent);
        }

        return layer;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/subPackageManager.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "bdff3EAmM9N8oepIHiSlwe2", "subPackageManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let SubPackageManager = exports('SubPackageManager', (_dec = ccclass("SubPackageManager"), _dec(_class = (_class2 = class SubPackageManager {
        constructor() {
          this.dictLoading = {};
          this.dictPackage = {};
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new SubPackageManager();
          return this._instance;
        }

        loadSubPackage(packageName, finishCb) {
          if (window.wx) {
            //微信环境下，需要加载子包
            if (this.dictPackage.hasOwnProperty(packageName)) {
              finishCb && finishCb(null);
              return;
            } else {
              if (!this.dictLoading.hasOwnProperty(packageName)) {
                this.dictLoading[packageName] = [];
                window.wx.loadSubpackage({
                  name: packageName,
                  success: () => {
                    this.dictPackage[packageName] = true;
                    let arrLoading = this.dictLoading[packageName];
                    arrLoading.forEach(cb => {
                      cb && cb(null);
                    });
                    delete this.dictLoading[packageName];
                  },
                  fail: err => {
                    console.error(`load subpackage (${packageName}) failed!! err:${err}`); // finishCb && finishCb(err);

                    let arrLoading = this.dictLoading[packageName];
                    arrLoading.forEach(cb => {
                      cb && cb(err);
                    });
                    delete this.dictLoading[packageName];
                  }
                });
              }

              this.dictLoading[packageName].push(finishCb);
            }
          } else {
            finishCb && finishCb(null);
          }
        }

        loadAudioPackage(finishCb) {
          this.loadSubPackage('audio', finishCb);
        }

        isAudioPackageLoad() {
          return !window.wx || this.dictPackage.hasOwnProperty('audio');
        }

        loadModelPackage(finishCb) {
          this.loadSubPackage('model', finishCb);
        } // loadCardPackage (finishCb: Function) {
        //     this.loadSubPackage('card', finishCb);
        // }
        // loadEffectPackage (finishCb: Function) {
        //     this.loadSubPackage('effect', finishCb);
        // }
        // loadBuildingPackage (finishCb: Function) {
        //     this.loadSubPackage('building', finishCb);
        // }


        loadAllPackage() {
          this.loadModelPackage(() => {});
          this.loadAudioPackage(() => {}); // this.loadCardPackage(()=>{
          // });
          // this.loadEffectPackage(()=>{
          // });
          // this.loadBuildingPackage(()=>{
          // });
        }

      }, _class2._instance = void 0, _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/constants.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;

      cclegacy._RF.push({}, "be9ddy54wpE3JKGFKTkwOdn", "constants", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let constants = exports('constants', (_dec = ccclass('constants'), _dec(_class = (_class2 = class constants {}, _class2.EVENT_TYPE = {
        PERFORMANCE_PARAMETER: 'performanceParameter' //性能参数

      }, _class2.VERSION = '0.2.5', _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PhyicsTitle.ts", ['cc'], function (exports) {
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
      var _dec, _dec2, _class;

      cclegacy._RF.push({}, "c0199M5t3hBZaetQXEIz2y8", "PhyicsTitle", undefined);

      const {
        menu,
        ccclass,
        property
      } = _decorator;
      let PhyicsTitle = exports('PhyicsTitle', (_dec = ccclass("CHECKS.PhyicsTitle"), _dec2 = menu("misc/checks/PhyicsTitle"), _dec(_class = _dec2(_class = class PhyicsTitle extends Component {
        start() {
          // Your initialization goes here.
          let label = this.getComponent(LabelComponent);

          if (label) {
            if (window.CC_PHYSICS_BUILTIN) {
              label.string = '物理：builtin';
            } else if (window.CC_PHYSICS_CANNON) {
              label.string = '物理：cannon';
            } else if (window.CC_PHYSICS_AMMO) {
              label.string = '物理：ammo';
            }
          }
        }

      }) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/bunny-mark.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteFrame, LabelComponent, Node, _decorator, Component, Vec3, profiler, Layers, SpriteComponent, UITransformComponent;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      LabelComponent = module.LabelComponent;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      profiler = module.profiler;
      Layers = module.Layers;
      SpriteComponent = module.SpriteComponent;
      UITransformComponent = module.UITransformComponent;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "cd886RCZxtHI57gwUTlErq1", "bunny-mark", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      class BunnyMarkData {
        constructor() {
          this.speedX = 0;
          this.speedY = 0;
          this.owner = null;
          this.innerText = '';
        }

        get x() {
          return this.owner.position.x;
        }

        get y() {
          return this.owner.position.y;
        }

      }

      const bunnys = [];
      let currentFrame = null;
      let bunnyType = 0;
      const gravity = 0.5;
      let originNodeCount = 0;
      let maxX = 0;
      let minX = 0;
      let maxY = 0;
      let minY = 0;
      let isAdding = false;
      let count = 0;
      let number = null; // Notice: the number of the add pre click

      const amount = 100;
      let BunnyMark = exports('BunnyMark', (_dec = ccclass("BunnyMark"), _dec2 = property([SpriteFrame]), _dec3 = property(LabelComponent), _dec4 = property(Node), _dec(_class = (_class2 = class BunnyMark extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "frames", _descriptor, this);

          _initializerDefineProperty(this, "levelCount", _descriptor2, this);

          _initializerDefineProperty(this, "number", _descriptor3, this);

          _initializerDefineProperty(this, "root", _descriptor4, this);

          this._euler = new Vec3();
        }

        onLoad() {
          number = this.number;
          number.node.active = true;
          const pos = number.node.position;
          number.node.setPosition(pos.x, pos.y, 100);
          maxX = cc.winSize.width / 2;
          maxY = cc.winSize.height / 2;
          minX = -maxX;
          minY = -maxY;
          this.levelCount = 1;

          for (let i = 0; i < this.levelCount; i++) {
            bunnys[i] = [];
          }

          currentFrame = this.frames[0];
          originNodeCount = this.node.children.length;

          if (!profiler._stats) {
            profiler.showStats();
          } // this.node.on(Node.EventType.TOUCH_START, function () {
          //     isAdding = true;
          // });
          // this.node.on(Node.EventType.TOUCH_END, function () {
          //     isAdding = false;
          //     bunnyType++;
          //     bunnyType %= 5;
          //     currentFrame = this.frames[bunnyType];
          // }, this);
          // this.node.on(Node.EventType.TOUCH_CANCEL, function () {
          //     isAdding = false;
          // });
          // this.add();
          // this.addOne();
          // if (this.showFPS) {
          //     let now = Date.now();
          //     _fpsCounter = new PerfCounter('fps', { average: 500 }, now);
          //     _fps = this.fps;
          //     director.on(director.EVENT_AFTER_DRAW, fpsAfterDraw);
          //     director.setDisplayStats(false);
          // }
          // else {
          //     this.fps.node.active = false;
          // }
          // this._createBackUI('BunnyMark');

        } // add() {
        //     this.addOnce();
        //     this.scheduleOnce(this.check, 5);
        // }
        // check() {
        //     checking = true;
        //     totalDt = 0;
        //     frames = 0;
        //     startTime = 0;
        //     director.on(Director.EVENT_BEFORE_UPDATE, beforeUpdate);
        //     director.on(Director.EVENT_AFTER_DRAW, afterDraw);
        //     this.scheduleOnce(this.checkEnd, 3);
        // }
        // checkEnd() {
        //     checking = false;
        //     director.off(Director.EVENT_BEFORE_UPDATE, beforeUpdate);
        //     director.off(Director.EVENT_AFTER_DRAW, afterDraw);
        //     let dt = totalDt / frames;
        //     if (dt > 20) {
        //         number.string = "STOPPED !!! \nFINAL SCORE : " + count;
        //     }
        //     else {
        //         bunnyType++;
        //         bunnyType %= this.frames.length;
        //         currentFrame = this.frames[bunnyType];
        //         if (dt < 1) dt = 1;
        //         const extra = Math.floor(20 / dt);
        //         for (let i = 0; i < extra; i++) {
        //             this.addOnce();
        //         }
        //         this.add();
        //     }
        // }
        // addOne() {
        //     let bunny: Node, bunnysp: SpriteComponent;
        //     bunny = new Node();
        //     bunnysp = bunny.addComponent(SpriteComponent);
        //     bunnysp.spriteFrame = currentFrame;
        //     const data = new BunnyMarkData();
        //     data.speedX = Math.random() * 10;
        //     data.speedY = (Math.random() * 10) - 5;
        //     data.x = minX + 10;
        //     data.y = maxY * 0.7;
        //     data.owner = bunny;
        //     bunny.anchorY = 1;
        //     bunnys.push(data);
        //     bunny.setScale(0.3, 0.3, 1);
        //     this._euler.set(0, 0, 360 * (Math.random() * 0.2 - 0.1));
        //     bunny.eulerAngles = this._euler;
        //     this.node.addChild(bunny);
        //     count++;
        //     number.string = count.toString();
        // }


        addOnce() {
          let amountPerLevel = Math.floor(amount / this.levelCount);
          let parent = this.root;
          console.log("levelCount", this.levelCount);
          let bunny, bunnysp; // Add bunnys

          for (let i = 0; i < this.levelCount; i++) {
            const lbunnys = bunnys[i];

            for (let j = 0; j < amountPerLevel; j++) {
              bunny = new Node();
              bunny.layer = Layers.Enum.UI_2D;
              bunnysp = bunny.addComponent(SpriteComponent);
              bunnysp.spriteFrame = currentFrame;
              const data = new BunnyMarkData();
              data.speedX = Math.random() * 10;
              data.speedY = Math.random() * 10 - 5;
              data.owner = bunny;
              bunny.setPosition(minX + 10, maxY * 0.7, 0);
              bunny.anchorY = 1; //bunny.alpha = 0.3 + Math.random() * 0.7;

              lbunnys.push(data); //bunny.setScale(1.0, 1.0, 1.0);
              //this._euler.set(0, 0, 360 * (Math.random() * 0.2 - 0.1));
              //bunny.eulerAngles = this._euler;

              bunny.parent = parent;
              count++;
            }

            const nextContainer = new Node();
            nextContainer.addComponent(UITransformComponent);
            parent.addChild(nextContainer);
            parent = nextContainer;
          }

          number.string = count.toString();
        }

        reduceOnce() {
          // the one is container
          let amountPerLevel = Math.floor(amount / this.levelCount);
          let children = this.node.children;
          let len = children.length; // reduce bunnys

          const startNum = len - 1 - originNodeCount;

          for (let j = 0; j < amountPerLevel + 1; j++) {
            const child = children[startNum - j];
            child.destroy();
          }

          count -= amount;
          number.string = count.toString();

          for (let i = 0; i < this.levelCount; i++) {
            const lbunnys = bunnys[i];

            if (lbunnys.length >= amountPerLevel) {
              lbunnys.splice(lbunnys.length - amountPerLevel, amountPerLevel);
            }
          }
        } // called every frame, uncomment this function to activate update callback


        update(dt) {
          if (isAdding) {
            this.addOnce();
            isAdding = false;
          } // var start = new Date().getTime();


          for (let i = 0; i < this.levelCount; i++) {
            const lbunnys = bunnys[i];

            for (let j = 0; j < lbunnys.length; j++) {
              const bunny = lbunnys[j];
              let speedX = bunny.speedX;
              let speedY = bunny.speedY;
              let x = bunny.x + speedX;
              let y = bunny.y - speedY;
              speedY += gravity;

              if (x > maxX) {
                speedX = -1 * speedX;
                x = maxX;
              } else if (x < minX) {
                speedX = -1 * speedX;
                x = minX;
              }

              if (y < minY) {
                speedY = -0.85 * speedY;
                y = minY;

                if (Math.random() > 0.5) {
                  speedY = speedY - Math.random() * 6.0;
                }
              } else if (y > maxY) {
                speedY = 0.0;
                y = maxY;
              }

              bunny.speedX = speedX;
              bunny.speedY = speedY;
              bunny.owner.setPosition(x, y, 0);
            }
          }
        }

        btnAdd() {
          isAdding = true;
          bunnyType++;
          bunnyType %= 5;
          currentFrame = this.frames[bunnyType];
        }

        btnReduce() {
          this.reduceOnce();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "number", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "root", [_dec4], {
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

System.register("chunks:///_virtual/bunnyTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteFrame, Label, _decorator, Component, SystemEventType, Node, Layers, Sprite;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      SystemEventType = module.SystemEventType;
      Node = module.Node;
      Layers = module.Layers;
      Sprite = module.Sprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "c66b3h+m0xC3730eHn1tn1y", "bunnyTest", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let bunnyType = 0;
      let gravity = 0;
      let maxX = 0;
      let minX = 0;
      let maxY = 0;
      let minY = 0;
      let isAdding = false;
      let count = 0;
      let amount = 0;
      let BunnyTest = exports('BunnyTest', (_dec = ccclass('BunnyTest'), _dec2 = property([SpriteFrame]), _dec3 = property(Label), _dec(_class = (_class2 = class BunnyTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bunnyFrames", _descriptor, this);

          _initializerDefineProperty(this, "number", _descriptor2, this);

          this.currentFrame = void 0;
          this.bunnys = void 0;
        }

        onLoad() {
          this.reset();
          this.node.on(SystemEventType.TOUCH_START, () => {
            isAdding = true;
          });
          this.node.on(SystemEventType.TOUCH_END, () => {
            bunnyType++;
            bunnyType %= 5;
            this.currentFrame = this.bunnyFrames[bunnyType];
            isAdding = false;
          });
          this.node.on(SystemEventType.TOUCH_CANCEL, () => {
            bunnyType++;
            bunnyType %= 5;
            this.currentFrame = this.bunnyFrames[bunnyType];
            isAdding = false;
          });
        }

        reset() {
          this.bunnys = [];
          this.currentFrame = this.bunnyFrames[0];
          bunnyType = 0;
          gravity = 0.5;
          maxX = cc.winSize.width / 2;
          maxY = cc.winSize.height / 2;
          minX = -maxX;
          minY = -maxY;
          isAdding = false;
          count = 0;
          amount = 100;
        }

        update(dt) {
          let bunny, bunnysp, i;

          if (isAdding) {
            for (i = 0; i < amount; i++) {
              bunny = new Node();
              bunny.layer = Layers.Enum.UI_2D;
              bunnysp = bunny.addComponent(Sprite);
              bunnysp.spriteFrame = this.currentFrame;
              bunny.speedX = Math.random() * 10;
              bunny.speedY = Math.random() * 10 - 5;
              let x = minX + 10;
              let y = maxY * 0.7;
              bunny.setPosition(x, y, 0);
              this.bunnys.push(bunny);
              this.node.addChild(bunny);
              count++;
            }

            this.number.string = count;
          }

          for (i = 0; i < this.bunnys.length; i++) {
            bunny = this.bunnys[i];
            let x = bunny.x + bunny.speedX;
            let y = bunny.y - bunny.speedY;
            bunny.speedY += gravity;

            if (x > maxX) {
              bunny.speedX *= -1;
              x = maxX;
            } else if (x < minX) {
              bunny.speedX *= -1;
              x = minX;
            }

            if (y < minY) {
              bunny.speedY *= -0.85;
              y = minY;

              if (Math.random() > 0.5) {
                bunny.speedY -= Math.random() * 6;
              }
            } else if (y > maxY) {
              bunny.speedY = 0;
              y = maxY;
            }

            bunny.setPosition(x, y);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bunnyFrames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "number", [_dec3], {
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

System.register("chunks:///_virtual/prefabAnimationBunny.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Sprite, Animation, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Sprite = module.Sprite;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "cfea2zznoFBmYVSFcZaqH7F", "prefabAnimationBunny", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let maxX = 0;
      let minX = 0;
      let maxY = 0;
      let minY = 0;
      let PrefabAnimationBunny = exports('PrefabAnimationBunny', (_dec = ccclass('PrefabAnimationBunny'), _dec2 = property(Sprite), _dec3 = property(Animation), _dec(_class = (_class2 = class PrefabAnimationBunny extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bunnySpriteFrames", _descriptor, this);

          _initializerDefineProperty(this, "sprite", _descriptor2, this);

          _initializerDefineProperty(this, "ani", _descriptor3, this);

          this.aniType = 0;
        }

        start() {
          if (this.aniType === 0) {
            this.ani.play('bunnyTransform');
          } else if (this.aniType === 1) {
            this.ani.play('bunnyFrame');
          }
        }

        init(bunnyType, aniType) {
          this.aniType = aniType;
          maxX = cc.winSize.width / 2;
          maxY = cc.winSize.height / 2;
          minX = -maxX;
          minY = -maxY;
          let bunnySpriteFrame = this.bunnySpriteFrames[bunnyType];
          this.sprite.spriteFrame = bunnySpriteFrame;
          let x = Math.random() * (maxX - minX) + minX;
          let y = Math.random() * (maxY - minY) + minY;
          this.node.setPosition(x, y, 0); // this.node.anchorY = 1;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bunnySpriteFrames", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ani", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
       */
      // let maxX = 0;
      // let minX = 0;
      // let maxY = 0;
      // let minY = 0;
      // 
      // cc.Class({
      //     extends: cc.Component,
      // 
      //     properties: {
      //         bunnySpriteFrames:[cc.SpriteFrame],
      //     },
      // 
      //     // use this for initialization
      //     onLoad: function () {
      //         if (this.aniType === 0) {
      //             this.node.getComponent(cc.Animation).play("bunnyTransform");    
      //         }else if (this.aniType === 1) {
      //             this.node.getComponent(cc.Animation).play("bunnyFrame");
      //         }
      //     },
      // 
      //     init: function (bunnyType, aniType) {
      //         this.aniType = aniType;
      // 
      //         maxX = cc.winSize.width / 2;
      //         maxY = cc.winSize.height / 2;
      //         minX = -maxX;
      //         minY = -maxY;
      // 
      //         let bunnySpriteFrame = this.bunnySpriteFrames[bunnyType];
      //         this.node.getComponent(cc.Sprite).spriteFrame = bunnySpriteFrame;
      //         
      //         this.node.x = Math.random() * (maxX - minX) + minX;
      //         this.node.y = Math.random() * (maxY - minY) + minY;
      //         this.node.anchorY = 1;
      //         //bunny.alpha = 0.3 + Math.random() * 0.7;
      //         // this.node.scale = 0.5 + Math.random() * 0.5;
      //         // this.node.rotation = 360 * (Math.random() * 0.2 - 0.1);
      //     },
      // });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/monsterManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, instantiate, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "d4307VJgY5IEous7vDWULsj", "monsterManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let MonsterManager = exports('MonsterManager', (_dec = ccclass('MonsterManager'), _dec2 = property([Prefab]), _dec(_class = (_class2 = class MonsterManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "monPrefabs", _descriptor, this);

          this.monList = [];
          this.spriteNum = 0;
          this.randomX = 0;
          this.randomY = 0;
        }

        start() {// [3]
        }

        updateSpriteNumber(num) {
          if (this.spriteNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > this.spriteNum) {
            const addNum = num - this.spriteNum;

            for (let i = 0; i < addNum; i++) {
              const pfSprite = this.monPrefabs[i % this.monPrefabs.length];
              let sprite = instantiate(pfSprite);
              sprite.parent = this.node;
              this.randomX = Math.random() * (GameManager.maxX - GameManager.minX) + GameManager.minX;
              this.randomY = Math.random() * (GameManager.maxY - GameManager.minY) + GameManager.minY;
              sprite.setPosition(this.randomX, this.randomY, 0);
              this.monList.push(sprite);
            }

            this.spriteNum = num;
          } else {
            // reduce
            const deleteNum = this.spriteNum - num;

            for (let i = 0; i < deleteNum; i++) {
              const sprite = this.monList.pop();

              if (!sprite) {
                return;
              }

              sprite.destroy();
            }

            this.spriteNum = num;
          }
        }

      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "monPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/environmentManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, _decorator, Component, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "d98be4GXalFB5QFd/1SdXZk", "environmentManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let EnvironmentManager = exports('EnvironmentManager', (_dec = ccclass('EnvironmentManager'), _dec2 = property([Prefab]), _dec3 = property([Node]), _dec(_class = (_class2 = class EnvironmentManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "envPrefabs", _descriptor, this);

          this.envList = [];
          this.spriteNum = 0;

          _initializerDefineProperty(this, "rootList", _descriptor2, this);

          this.currentRoot = null;
        }

        start() {
          // [3]
          this.currentRoot = this.rootList[0];
        }

        updateSpriteNumber(num) {
          if (this.spriteNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          } // add


          if (num > this.spriteNum) {
            const addNum = num - this.spriteNum;

            for (let i = 0; i < addNum; i++) {
              const pfSprite = this.envPrefabs[i % this.envPrefabs.length];
              let sprite = instantiate(pfSprite);
              sprite.parent = this.currentRoot;
              this.envList.push(sprite);
            }

            this.spriteNum = num;
          } else {
            // reduce
            const deleteNum = this.spriteNum - num;

            for (let i = 0; i < deleteNum; i++) {
              const sprite = this.envList.pop();

              if (!sprite) {
                return;
              }

              sprite.destroy();
            }

            this.spriteNum = num;
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "envPrefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rootList", [_dec3], {
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

System.register("chunks:///_virtual/gameLogic.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "da479MYiZdGbrlkDSKicas1", "gameLogic", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let gameLogic = exports('gameLogic', (_dec = ccclass('gameLogic'), _dec(_class = class gameLogic {
        /**
         * 自定义事件统计
         */
        static customEventStatistics(eventType, objParams) {
          eventType = eventType.toString();
          console.log(`##### eventType:${eventType} , objParams:`, objParams);

          if (!objParams) {
            objParams = {};
          }

          if (window.cocosAnalytics) {
            window.cocosAnalytics.CACustomEvent.onStarted(eventType, objParams);
          }
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/performance.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, Label, _decorator, Component, profiler, view, instantiate, Vec3, director;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
      view = module.view;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      director = module.director;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "dae37VyKZ9CBbASY4RKPuiy", "performance", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      var addCount = 10;
      var delCount = 10;
      let Performance = exports('Performance', (_dec = ccclass('Performance'), _dec2 = property({
        type: [Prefab]
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Label
      }), _dec(_class = (_class2 = class Performance extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefabArr", _descriptor, this);

          _initializerDefineProperty(this, "container", _descriptor2, this);

          _initializerDefineProperty(this, "num", _descriptor3, this);

          this.objArr = [];
        }

        start() {
          this.objArr = [];
          this.num.string = "0";

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        add() {
          let viewSize = view.getVisibleSize();

          for (var i = 0; i < addCount; i++) {
            var node = instantiate(this.prefabArr[i % this.prefabArr.length]);
            let pos = new Vec3();
            pos.x = (Math.random() - 0.5) * viewSize.width;
            pos.y = (Math.random() - 0.5) * viewSize.height;
            node.setPosition(pos);
            this.container.addChild(node);
            this.objArr.push(node);
          }

          this.num.string = this.objArr.length + "";
        }

        del() {
          for (var i = 0; i < delCount; i++) {
            var node = this.objArr.pop();

            if (node) {
              node.destroy();
            }
          }

          this.num.string = this.objArr.length + "";
        }

        back() {
          director.loadScene('start');
        }

        backToTestList() {
          director.loadScene('test-list');
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabArr", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "container", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "num", [_dec4], {
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

System.register("chunks:///_virtual/PanelType.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, Enum;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
    }],
    execute: function () {
      exports('PanelType', void 0);

      cclegacy._RF.push({}, "da599RZhJxDjaD13v8LTO7l", "PanelType", undefined);

      let PanelType;

      (function (PanelType) {
        PanelType[PanelType["Home"] = -1] = "Home";
        PanelType[PanelType["Shop"] = -1] = "Shop";
      })(PanelType || (PanelType = exports('PanelType', {})));

      Enum(PanelType);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadDragonBones.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, dragonBones, _decorator, Component, loader;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      dragonBones = module.dragonBones;
      _decorator = module._decorator;
      Component = module.Component;
      loader = module.loader;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;

      cclegacy._RF.push({}, "db25aaEuudOurDFcTFrx3Al", "LoadDragonBones", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LoadDragonBones = exports('LoadDragonBones', (_dec = ccclass('LoadDragonBones'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec(_class = (_class2 = class LoadDragonBones extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "dragonBones", _descriptor, this);
        }

        start() {// Your initialization goes here.
        }

        dynamicCreate() {
          loader.loadRes('dragonBones/NewDragonTest', dragonBones.DragonBonesAsset, (err, res) => {
            if (err) {
              console.error(err);
              return;
            }

            this.dragonBones.dragonAsset = res;
            loader.loadRes('dragonBones/texture', dragonBones.DragonBonesAtlasAsset, (err, res) => {
              if (err) {
                console.error(err);
                return;
              }

              this.dragonBones.dragonAtlasAsset = res;
              this.dragonBones.armatureName = "armatureName";
              this.dragonBones.playAnimation('stand', 0);
            });
          });
        } // update (deltaTime: number) {
        //     // Your update function goes here.
        // }


      }, _descriptor = _applyDecoratedDescriptor(_class2.prototype, "dragonBones", [_dec2], {
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

System.register("chunks:///_virtual/ParticleTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Node, LabelComponent, EditBoxComponent, _decorator, Component, profiler, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      LabelComponent = module.LabelComponent;
      EditBoxComponent = module.EditBoxComponent;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

      cclegacy._RF.push({}, "e72d036Se5Am4U7pHKNOD89", "ParticleTest", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let TestParticle = exports('TestParticle', (_dec = ccclass('TestParticle'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(LabelComponent), _dec7 = property(EditBoxComponent), _dec8 = property(EditBoxComponent), _dec(_class = (_class2 = class TestParticle extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "particleCPU", _descriptor, this);

          _initializerDefineProperty(this, "particleGPU", _descriptor2, this);

          _initializerDefineProperty(this, "cpuParticleRootNode", _descriptor3, this);

          _initializerDefineProperty(this, "gpuParticleRootNode", _descriptor4, this);

          _initializerDefineProperty(this, "numLabel", _descriptor5, this);

          _initializerDefineProperty(this, "gpuParticleNumInput", _descriptor6, this);

          _initializerDefineProperty(this, "cpuParticleNumInput", _descriptor7, this);

          this._particleNum = 0;
          this._cpuParticleNum = 0;
          this._gpuParticleNum = 0;
        }

        get particleNum() {
          return this._particleNum;
        }

        set particleNum(value) {
          this._particleNum = value;
          this.numLabel.string = "发射器数量：" + this._particleNum;
        }

        get cpuParticleNum() {
          return this._cpuParticleNum;
        }

        set cpuParticleNum(value) {
          this._cpuParticleNum = value;
          this.cpuParticleNumInput.string = value.toString();
          this.particleNum = this._cpuParticleNum + this._gpuParticleNum;
        }

        get gpuParticleNum() {
          return this._gpuParticleNum;
        }

        set gpuParticleNum(value) {
          this._gpuParticleNum = value;
          this.gpuParticleNumInput.string = value.toString();
          this.particleNum = this._cpuParticleNum + this._gpuParticleNum;
        }

        start() {
          this.updateCPUParticleNum(10);
          this.gpuParticleNum = 0;

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        randomPositionX() {
          return (Math.random() - 0.5) * 20;
        }

        randomPositionY() {
          return (Math.random() - 0.5) * 10;
        }

        addCPU() {
          this.updateCPUParticleNum(this.cpuParticleNum + 5);
        }

        addGPU() {
          this.updateGPUParticleNum(this.gpuParticleNum + 5);
        }

        clearCPU() {
          this.cpuParticleRootNode.removeAllChildren();
          this.cpuParticleNum = 0;
        }

        clearGPU() {
          this.gpuParticleRootNode.removeAllChildren();
          this.gpuParticleNum = 0;
        }

        clear() {
          this.cpuParticleRootNode.removeAllChildren();
          this.gpuParticleRootNode.removeAllChildren();
          this.cpuParticleNum = 0;
          this.gpuParticleNum = 0;
          this.particleNum = 0;
        }

        updateCPUParticleNum(num) {
          if (this.cpuParticleNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          }

          if (num % 2 !== 0) {
            num = num + 1; // 一个prefab有两个粒子，需要偶数
          } // add


          if (num > this.cpuParticleNum) {
            const addNum = Math.ceil((num - this.cpuParticleNum) / 2);

            for (let i = 0; i < addNum; i++) {
              const x = this.randomPositionX();
              const y = this.randomPositionY();
              let node = instantiate(this.particleCPU);
              this.cpuParticleRootNode.addChild(node);
              node.setPosition(x, y, 0);
            }
          } else {
            // delete
            const deleteNum = Math.ceil((this.cpuParticleNum - num) / 2);

            for (let i = 0; i < deleteNum; i++) {
              const node = this.cpuParticleRootNode.children[this.cpuParticleRootNode.children.length - 1 - i];
              node.destroy();
            }
          }

          this.cpuParticleNum = num;
        }

        updateGPUParticleNum(num) {
          if (this.gpuParticleNum === num) {
            return;
          }

          if (num < 0) {
            num = 0;
          }

          if (num % 2 !== 0) {
            num = num + 1; // 一个prefab有两个粒子，需要偶数
          } // add


          if (num > this.gpuParticleNum) {
            const addNum = Math.ceil((num - this.gpuParticleNum) / 2);

            for (let i = 0; i < addNum; i++) {
              const x = this.randomPositionX();
              const y = this.randomPositionY();
              let node = instantiate(this.particleGPU);
              this.gpuParticleRootNode.addChild(node);
              node.setPosition(x, y, 0);
            }
          } else {
            // delete
            const deleteNum = Math.ceil((this.gpuParticleNum - num) / 2);

            for (let i = 0; i < deleteNum; i++) {
              const node = this.gpuParticleRootNode.children[this.gpuParticleRootNode.children.length - 1 - i];
              node.destroy();
            }
          }

          this.gpuParticleNum = num;
        }

        onGPUParticleNumInputEnd() {
          const num = Number.parseInt(this.gpuParticleNumInput.string);
          this.updateGPUParticleNum(num);
        }

        onCPUParticleNumInputEnd() {
          const num = Number.parseInt(this.cpuParticleNumInput.string);
          this.updateCPUParticleNum(num);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "particleCPU", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "particleGPU", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cpuParticleRootNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gpuParticleRootNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "numLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gpuParticleNumInput", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cpuParticleNumInput", [_dec8], {
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

System.register("chunks:///_virtual/HomeUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PanelType.ts', './ShopUI.ts', './BackPackUIComp.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Animation, Node, _decorator, Component, profiler, PanelType, ShopUI, BackPackUIComp;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Animation = module.Animation;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
    }, function (module) {
      PanelType = module.PanelType;
    }, function (module) {
      ShopUI = module.ShopUI;
    }, function (module) {
      BackPackUIComp = module.BackPackUIComp;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

      cclegacy._RF.push({}, "edc2a7itdpDQ5BDY+sVWkwJ", "HomeUI", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let HomeUI = exports('HomeUI', (_dec = property(Animation), _dec2 = property([Node]), _dec3 = property(BackPackUIComp), _dec4 = property(ShopUI), ccclass(_class = (_class2 = class HomeUI extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "menuAnim", _descriptor, this);

          _initializerDefineProperty(this, "homeBtnGroups", _descriptor2, this);

          _initializerDefineProperty(this, "backPackUI", _descriptor3, this);

          _initializerDefineProperty(this, "shopUI", _descriptor4, this);

          this.curPanel = PanelType.Home;
        } // use this for initialization


        onLoad() {
          if (!profiler._stats) {
            profiler.showStats();
          }

          this.curPanel = PanelType.Home;
          this.menuAnim.play('menu_reset');
        }

        start() {
          this.backPackUI.init(this);
          this.shopUI.init(this, PanelType.Shop);
          this.scheduleOnce(() => {
            this.menuAnim.play('menu_intro');
            this.showAllUI();
          }, 0.5);
        }

        showAllUI() {
          this.gotoShop();
          this.homeBtnGroups[0].getChildByName("sub_btns").getComponent("SubBtnsUI").showSubBtns();
          this.node.parent.getChildByName("chargePanel").getComponent("ChargeUI").show();
          this.node.parent.getChildByName("backPack").getComponent("BackPackUIComp").show();
        }

        gotoShop() {
          if (this.curPanel !== PanelType.Shop) {
            this.shopUI.show();
          }
        }

        gotoHome() {
          if (this.curPanel === PanelType.Shop) {
            this.shopUI.hide();
            this.curPanel = PanelType.Home;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "menuAnim", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "homeBtnGroups", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "backPackUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "shopUI", [_dec4], {
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

System.register("chunks:///_virtual/EnergyCounter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Label, ProgressBar, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Label = module.Label;
      ProgressBar = module.ProgressBar;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "ee01cuuXWdKPp3K6ZSH+XiO", "EnergyCounter", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let EnergyCounter = exports('EnergyCounter', (_dec = property({
        type: Label
      }), _dec2 = property({
        type: Label
      }), _dec3 = property({
        type: ProgressBar
      }), ccclass(_class = (_class2 = class EnergyCounter extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "timeToRecover", _descriptor, this);

          _initializerDefineProperty(this, "totalCount", _descriptor2, this);

          _initializerDefineProperty(this, "currentCount", _descriptor3, this);

          _initializerDefineProperty(this, "labelTimer", _descriptor4, this);

          _initializerDefineProperty(this, "labelCount", _descriptor5, this);

          _initializerDefineProperty(this, "progressBar", _descriptor6, this);

          this._timer = 0;
        }

        onLoad() {
          this._timer = 0;
        }

        update(dt) {
          let ratio = this._timer / this.timeToRecover;
          this.progressBar.progress = ratio;
          if (this.currentCount > this.totalCount) this.currentCount = this.totalCount;
          let timeLeft = Math.floor(this.timeToRecover - this._timer);
          this.labelCount.string = this.currentCount + '/' + this.totalCount;
          this.labelTimer.string = Math.floor(timeLeft / 60).toString() + ':' + (timeLeft % 60 < 10 ? '0' : '') + timeLeft % 60;
          this._timer += dt;

          if (this._timer >= this.timeToRecover) {
            this._timer = 0;
            this.currentCount++;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timeToRecover", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "totalCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "currentCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "labelTimer", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelCount", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [_dec3], {
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

System.register("chunks:///_virtual/DragonBonesAttach.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, dragonBones, Prefab, Label, _decorator, Component, Color, instantiate, Sprite;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      dragonBones = module.dragonBones;
      Prefab = module.Prefab;
      Label = module.Label;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class2, _class3, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

      cclegacy._RF.push({}, "f0494pzVKJIkrGKPQXf09Qb", "DragonBonesAttach", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      let _class = exports('default', (_dec = ccclass('DragonBonesAttach'), _dec2 = property({
        type: dragonBones.ArmatureDisplay
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Label
      }), _dec(_class2 = (_class3 = class _class3 extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "skeleton", _descriptor, this);

          _initializerDefineProperty(this, "targetPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "modeLabel", _descriptor3, this);

          _initializerDefineProperty(this, "redBoneName", _descriptor4, this);

          _initializerDefineProperty(this, "greenBoneName", _descriptor5, this);

          _initializerDefineProperty(this, "blueBoneName", _descriptor6, this);
        }

        generateAllNodes() {
          this.destroyAllNodes();
          let red = this.createSocket(this.redBoneName, new Color(255, 0, 0));
          let green = this.createSocket(this.greenBoneName, new Color(0, 255, 0));
          let blue = this.createSocket(this.blueBoneName, new Color(0, 0, 255));
          this.skeleton.sockets = [red, green, blue];
        }

        destroyUnusual() {
          this.destroyAllNodes();
        }

        destroyAllNodes() {
          let sockets = this.skeleton.sockets;

          for (let s of sockets) {
            s.target.removeFromParent();
          }

          this.skeleton.sockets = [];
        }

        generateSomeNodes() {
          let sockets = this.skeleton.sockets;
          let greens = sockets.filter(x => {
            var _x$target;

            return ((_x$target = x.target) == null ? void 0 : _x$target.name) == this.greenBoneName;
          });

          if (greens.length === 0) {
            let green = this.createSocket(this.greenBoneName, new Color(0, 255, 0));
            sockets.push(green);
            this.skeleton.sockets = sockets;
          }
        }

        destroySomeNodes() {
          let sockets = this.skeleton.sockets;

          for (let l = sockets.length - 1; l >= 0; l--) {
            if (sockets[l].target.name === this.greenBoneName) {
              let s = sockets.splice(l, 1);
              s[0].target.removeFromParent();
              this.skeleton.sockets = sockets;
              break;
            }
          }
        }

        changeMode() {
          let isCached = this.skeleton.isAnimationCached();

          if (isCached) {
            this.skeleton.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME);
            this.modeLabel.string = "cache";
          } else {
            this.skeleton.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.SHARED_CACHE);
            this.modeLabel.string = "realtime";
          }
        }

        createSocket(name, color) {
          let dbnode = new dragonBones.DragonBoneSocket();
          dbnode.path = this.skeleton.querySocketPathByName(name)[0];
          const child = dbnode.target = instantiate(this.targetPrefab);
          child.parent = this.node;
          child.name = name;
          const sp = child.getComponent(Sprite);
          sp.color = color;
          return dbnode;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class3.prototype, "skeleton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class3.prototype, "targetPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class3.prototype, "modeLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class3.prototype, "redBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "toujiaoR";
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class3.prototype, "greenBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "shouL";
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class3.prototype, "blueBoneName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "bone24";
        }
      })), _class3)) || _class2));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HeroSlotComp.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, SpriteFrame, Label, Sprite, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Label = module.Label;
      Sprite = module.Sprite;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;

      cclegacy._RF.push({}, "f30146dViFGF5WCMID9zrXC", "HeroSlotComp", undefined);

      const {
        ccclass,
        property
      } = _decorator;

      const getRandomInt = function (min, max) {
        var ratio = Math.random();
        return min + Math.floor((max - min) * ratio);
      };

      let HeroSlotComp = exports('HeroSlotComp', (_dec = property([SpriteFrame]), _dec2 = property([SpriteFrame]), _dec3 = property([SpriteFrame]), _dec4 = property([SpriteFrame]), _dec5 = property(Label), _dec6 = property(Sprite), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec9 = property(Sprite), _dec10 = property([Sprite]), ccclass(_class = (_class2 = class HeroSlotComp extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfAttributes", _descriptor, this);

          _initializerDefineProperty(this, "sfRanks", _descriptor2, this);

          _initializerDefineProperty(this, "sfHeroes", _descriptor3, this);

          _initializerDefineProperty(this, "sfBorders", _descriptor4, this);

          _initializerDefineProperty(this, "labelLevel", _descriptor5, this);

          _initializerDefineProperty(this, "spHero", _descriptor6, this);

          _initializerDefineProperty(this, "spRank", _descriptor7, this);

          _initializerDefineProperty(this, "spAttribute", _descriptor8, this);

          _initializerDefineProperty(this, "spBorder", _descriptor9, this);

          _initializerDefineProperty(this, "spStars", _descriptor10, this);
        } // use this for initialization


        onLoad() {
          this.refresh();
        }

        refresh() {
          let bgIdx = getRandomInt(0, this.sfBorders.length);
          let heroIdx = getRandomInt(0, this.sfHeroes.length);
          let starIdx = getRandomInt(0, this.spStars.length);
          let rankIdx = getRandomInt(0, this.sfRanks.length);
          let attIdx = getRandomInt(0, this.sfAttributes.length);
          let levelIdx = getRandomInt(0, 100);
          this.labelLevel.string = 'LV.' + levelIdx;
          this.spRank.spriteFrame = this.sfRanks[rankIdx];
          this.refreshStars(starIdx);
          this.spBorder.spriteFrame = this.sfBorders[bgIdx];
          this.spAttribute.spriteFrame = this.sfAttributes[attIdx];
          this.spHero.spriteFrame = this.sfHeroes[heroIdx];
        }

        refreshStars(count) {
          for (let i = 0; i < this.spStars.length; ++i) {
            if (i <= count) this.spStars[i].enabled = true;else this.spStars[i].enabled = false;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfAttributes", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfRanks", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "sfHeroes", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sfBorders", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelLevel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spHero", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spRank", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spAttribute", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spBorder", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "spStars", [_dec10], {
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

System.register("chunks:///_virtual/bunnyTransformAnimationTest.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, Label, Node, _decorator, Component, profiler, instantiate;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Label = module.Label;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      profiler = module.profiler;
      instantiate = module.instantiate;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "f65af5JM/hA2oQTImSvQkwt", "bunnyTransformAnimationTest", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let bunnyType = 0;
      let totalCount = 0;
      let count = 0;
      let amount = 0;
      let BunnyTransformAnimationTest = exports('BunnyTransformAnimationTest', (_dec = ccclass('BunnyTransformAnimationTest'), _dec2 = property(Prefab), _dec3 = property(Label), _dec4 = property(Node), _dec(_class = (_class2 = class BunnyTransformAnimationTest extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "prefabBunny", _descriptor, this);

          _initializerDefineProperty(this, "number", _descriptor2, this);

          _initializerDefineProperty(this, "root", _descriptor3, this);

          this.bunnys = [];
        }

        onLoad() {
          this.reset();

          if (!profiler._stats) {
            profiler.showStats();
          }
        }

        reset() {
          this.bunnys = [];
          bunnyType = 0;
          totalCount = 100;
          count = 0;
          amount = 50;
        }

        update(dt) {
          let bunny;
          let i;

          if (this.bunnys.length < totalCount) {
            for (i = 0; i < amount; i++) {
              bunny = instantiate(this.prefabBunny);
              bunny.getComponent("PrefabAnimationBunny").init(bunnyType, 0);
              this.root.addChild(bunny);
              this.bunnys.push(bunny);
              count++;
            }

            this.number.string = count;
            bunnyType++;
            bunnyType %= 5;
          }
        }

        addItem() {
          totalCount += 100;
        }

        reduceItem() {
          totalCount -= 100;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabBunny", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "number", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "root", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
       */
      // const baseRenderScene = require("baseRenderScene");
      // let config = require("config");
      // 
      // let bunnyType = 0;
      // let totalCount = 0;
      // let count = 0;
      // let amount = 0;
      // 
      // cc.Class({
      //     extends: baseRenderScene,
      // 
      //     properties: {
      //         prefabBunny: cc.Prefab,
      //         number: cc.Label
      //     },
      // 
      //     // use this for initialization
      //     onLoad: function () {
      //         this._super(this.name.match(/<(\S*)>/)[1]);
      // 
      //         this.number.node.zIndex = config.HIGHEST_ZINDEX;
      // 
      //         this.reset();
      //     },
      // 
      //     reset: function () {
      //         this.bunnys = [];
      //         
      //         bunnyType = 0;
      //         totalCount = config.SCENE_ARGS.count;
      //         count = 0;
      //         amount = 50;
      //     },
      // 
      //     // called every frame, uncomment this function to activate update callback
      //     update: function (dt) {
      //         let bunny, i;
      //         if (this.bunnys.length < totalCount) {
      //             for (i = 0; i < amount; i++) {
      //                 bunny = cc.instantiate(this.prefabBunny);
      //                 bunny.getComponent("prefabAnimationBunny").init(bunnyType, 0);
      //                 this.node.addChild(bunny);
      //                 this.bunnys.push(bunny);
      //                 count++;
      //             }
      //             this.number.string = count;
      //             bunnyType++;
      //             bunnyType %= 5;
      //         }
      //     },
      // });

      cclegacy._RF.pop();
    }
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