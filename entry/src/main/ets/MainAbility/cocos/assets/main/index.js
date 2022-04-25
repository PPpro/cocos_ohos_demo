System.register("chunks:///_virtual/monsterSkillCollider.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './energyBall.ts', './fireBall.ts', './dispersionSurround.ts', './dispersion.ts', './fireBallBig.ts', './tornado.ts', './laser.ts', './jetFires.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Enum, _decorator, Component, BoxColliderComponent, CylinderColliderComponent, SphereCollider, CapsuleColliderComponent, MeshColliderComponent, PoolManager, Constant, EnergyBall, FireBall, DispersionSurround, Dispersion, FireBallBig, Tornado, Laser, JetFires, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      _decorator = module._decorator;
      Component = module.Component;
      BoxColliderComponent = module.BoxColliderComponent;
      CylinderColliderComponent = module.CylinderColliderComponent;
      SphereCollider = module.SphereCollider;
      CapsuleColliderComponent = module.CapsuleColliderComponent;
      MeshColliderComponent = module.MeshColliderComponent;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      EnergyBall = module.EnergyBall;
    }, function (module) {
      FireBall = module.FireBall;
    }, function (module) {
      DispersionSurround = module.DispersionSurround;
    }, function (module) {
      Dispersion = module.Dispersion;
    }, function (module) {
      FireBallBig = module.FireBallBig;
    }, function (module) {
      Tornado = module.Tornado;
    }, function (module) {
      Laser = module.Laser;
    }, function (module) {
      JetFires = module.JetFires;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "00815wthORNyqdwj+wC28bk", "monsterSkillCollider", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const COLLIDER_NAME = Enum({
        ENERGY_BALL: 1,
        //直线飞行能量球
        FIRE_BALL: 2,
        //线飞行的小火球
        JET_FIRES: 3,
        //直线范围型的火焰
        DISPERSION: 4,
        //180度散射
        TORNADO: 5,
        //旋转前进的龙卷风
        FIRE_BALL_BIG: 6,
        //直线下坠的大火团 
        DISPERSION_SURROUND: 7,
        //360度六角形散射
        LASER: 8 //直线激光

      });
      let MonsterSkillCollider = exports('MonsterSkillCollider', (_dec = ccclass('MonsterSkillCollider'), _dec2 = property({
        type: COLLIDER_NAME,
        displayOrder: 1
      }), _dec(_class = (_class2 = (_temp = _class3 = class MonsterSkillCollider extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "colliderName", _descriptor, this);

          _defineProperty(this, "colliderCom", null);

          _defineProperty(this, "ani", null);

          _defineProperty(this, "_isOnJetFires", false);

          _defineProperty(this, "_checkInterval", 1);
        } //大龙火焰检查间隔


        onLoad() {
          this.colliderCom = this.node.getComponent(BoxColliderComponent) || this.node.getComponent(CylinderColliderComponent) || this.node.getComponent(SphereCollider) || this.node.getComponent(CapsuleColliderComponent) || this.node.getComponent(MeshColliderComponent) || this.node.getComponent(CylinderColliderComponent);

          if (!this.colliderCom) {
            console.error("this node does not have collider component");
          }
        }

        onEnable() {
          if (this.colliderName === COLLIDER_NAME.JET_FIRES) {
            this.colliderCom.on("onTriggerStay", this._onTriggerStayCb, this);
            this.colliderCom.on("onTriggerExit", this._onTriggerExitCb, this);
          } else {
            if (this.colliderCom.isTrigger) {
              this.colliderCom.on('onTriggerEnter', this._onTriggerEnterCb, this);
            } else {
              this.colliderCom.on('onCollisionEnter', this._onCollisionEnterCb, this);
            }
          }
        }

        onDisable() {
          if (this.colliderName === COLLIDER_NAME.JET_FIRES) {
            this.colliderCom.off("onTriggerStay", this._onTriggerStayCb, this);
            this.colliderCom.off("onTriggerExit", this._onTriggerExitCb, this);
          } else {
            if (this.colliderCom.isTrigger) {
              this.colliderCom.off('onTriggerEnter', this._onTriggerEnterCb, this);
            } else {
              this.colliderCom.off('onCollisionEnter', this._onCollisionEnterCb, this);
            }
          }
        }

        start() {
          this._isOnJetFires = false;
        }
        /**
         * 初始化
         */


        init() {}

        _onTriggerEnterCb(event) {
          this._hitTarget(event.otherCollider);
        }

        _onCollisionEnterCb(event) {
          this._hitTarget(event.otherCollider);
        }

        _hitTarget(otherCollider) {
          var _this$node$parent, _this$node$parent2, _this$node$parent3, _this$node$parent4, _this$node$parent5;

          if (GameManager.isGameOver || !GameManager.isGameStart) {
            return;
          }

          if (otherCollider.getGroup() === Constant.PHY_GROUP.OBSTACLE) {
            //技能碰到游戏中的障碍则回收
            let scriptSkillCollider = null;

            switch (this.colliderName) {
              case COLLIDER_NAME.ENERGY_BALL:
                scriptSkillCollider = this.node.getComponent(EnergyBall);

                if (!scriptSkillCollider.skillInfo.penetrate) {
                  PoolManager.instance.putNode(this.node);
                }

                break;

              case COLLIDER_NAME.DISPERSION:
                scriptSkillCollider = this.node.getComponent(Dispersion);

                if (!scriptSkillCollider.skillInfo.penetrate) {
                  scriptSkillCollider.hide();
                }

                break;

              case COLLIDER_NAME.TORNADO:
                scriptSkillCollider = (_this$node$parent = this.node.parent) === null || _this$node$parent === void 0 ? void 0 : _this$node$parent.getComponent(Tornado);

                if (!scriptSkillCollider.skillInfo.penetrate) {
                  PoolManager.instance.putNode(this.node.parent);
                }

                break;

              case COLLIDER_NAME.DISPERSION_SURROUND:
                scriptSkillCollider = this.node.getComponent(DispersionSurround);

                if (!scriptSkillCollider.skillInfo.penetrate) {
                  scriptSkillCollider.hide();
                }

                break;
            }
          } else if (otherCollider.getGroup() == Constant.PHY_GROUP.PLAYER && GameManager.ndPlayer) {
            let scriptSkillCollider = null;

            switch (this.colliderName) {
              case COLLIDER_NAME.ENERGY_BALL:
                PoolManager.instance.putNode(this.node);
                scriptSkillCollider = this.node.getComponent(EnergyBall);

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.FIRE_BALL:
                //不在这里回收节点.在fireBall里面会回收
                scriptSkillCollider = (_this$node$parent2 = this.node.parent) === null || _this$node$parent2 === void 0 ? void 0 : _this$node$parent2.getComponent(FireBall);

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.DISPERSION:
                //注意这里不回收节点，只回收父节点
                scriptSkillCollider = this.node.getComponent(Dispersion);
                scriptSkillCollider.hide();

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.TORNADO:
                scriptSkillCollider = (_this$node$parent3 = this.node.parent) === null || _this$node$parent3 === void 0 ? void 0 : _this$node$parent3.getComponent(Tornado);

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.FIRE_BALL_BIG:
                scriptSkillCollider = (_this$node$parent4 = this.node.parent) === null || _this$node$parent4 === void 0 ? void 0 : _this$node$parent4.getComponent(FireBallBig);

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.DISPERSION_SURROUND:
                //注意这里不回收，只回收父节点
                scriptSkillCollider = this.node.getComponent(DispersionSurround);
                scriptSkillCollider.hide();

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;

              case COLLIDER_NAME.LASER:
                scriptSkillCollider = (_this$node$parent5 = this.node.parent) === null || _this$node$parent5 === void 0 ? void 0 : _this$node$parent5.getComponent(Laser);

                this._hitPlayer(scriptSkillCollider.baseInfo);

                break;
            }
          }
        }

        _hitPlayer(baseInfo) {
          if (!baseInfo) {
            console.warn("###找不到技能来源敌人", this.colliderName);
            return;
          } // console.log("###技能碰到玩家了", this.colliderName);


          GameManager.scriptPlayer.reduceBlood(baseInfo);
        }

        _onTriggerStayCb(event) {
          if (event.otherCollider.getGroup() == Constant.PHY_GROUP.PLAYER && GameManager.ndPlayer) {
            this._isOnJetFires = true;
          }
        }

        _onTriggerExitCb(event) {
          if (event.otherCollider.getGroup() == Constant.PHY_GROUP.PLAYER && GameManager.ndPlayer) {
            this._isOnJetFires = false;
          }
        }

        update(deltaTime) {
          if (GameManager.isGameOver || !GameManager.ndPlayer || !this.node.parent) {
            return;
          } //检测是否在龙焰（持续性技能里面），每隔0.5秒时间扣减一定伤害


          if (this.colliderName === COLLIDER_NAME.JET_FIRES && this._isOnJetFires) {
            this._checkInterval += deltaTime;

            if (this._checkInterval >= 0.5) {
              this._checkInterval = 0;
              let scriptSkillCollider = this.node.parent.getComponent(JetFires);

              this._hitPlayer(scriptSkillCollider.baseInfo);
            }
          }
        }

      }, _defineProperty(_class3, "COLLIDER_NAME", COLLIDER_NAME), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "colliderName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return COLLIDER_NAME.ENERGY_BALL;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/player.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './effectManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './characterRigid.ts', './mapManager.ts', './playerModel.ts', './arrow.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Quat, Vec3, RigidBodyComponent, CapsuleColliderComponent, _decorator, Component, macro, PoolManager, ResourceUtil, Util, Constant, ClientEvent, AudioManager, EffectManager, LocalConfig, PlayerData, UIManager, CharacterRigid, MapManager, PlayerModel, Arrow, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      RigidBodyComponent = module.RigidBodyComponent;
      CapsuleColliderComponent = module.CapsuleColliderComponent;
      _decorator = module._decorator;
      Component = module.Component;
      macro = module.macro;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      CharacterRigid = module.CharacterRigid;
    }, function (module) {
      MapManager = module.MapManager;
    }, function (module) {
      PlayerModel = module.PlayerModel;
    }, function (module) {
      Arrow = module.Arrow;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "00abeCWTxpAwrraoA+2UT4q", "player", undefined);

      let qt_0 = new Quat();
      let v3_0 = new Vec3();
      const {
        ccclass,
        property
      } = _decorator;
      let Player = exports('Player', (_dec = ccclass('Player'), _dec2 = property(PlayerModel), _dec3 = property(RigidBodyComponent), _dec4 = property(CapsuleColliderComponent), _dec(_class = (_class2 = (_temp = class Player extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "scriptPlayerModel", _descriptor, this);

          _initializerDefineProperty(this, "rigidComPlayer", _descriptor2, this);

          _initializerDefineProperty(this, "colliderComPlayer", _descriptor3, this);

          _defineProperty(this, "scriptBloodBar", null);

          _defineProperty(this, "isMoving", false);

          _defineProperty(this, "isPlayRotate", false);

          _defineProperty(this, "scriptCharacterRigid", null);

          _defineProperty(this, "playerBaseInfo", {});

          _defineProperty(this, "isArrowDouble", false);

          _defineProperty(this, "isArrowPenetrate", false);

          _defineProperty(this, "isArrowContinuous", false);

          _defineProperty(this, "isArrowIce", false);

          _defineProperty(this, "isArrowFire", false);

          _defineProperty(this, "isBloodthirsty", false);

          _defineProperty(this, "isArrowLightning", false);

          _defineProperty(this, "isArrowLaunch", false);

          _defineProperty(this, "curAttackPower", 20);

          _defineProperty(this, "curDefensePower", 1);

          _defineProperty(this, "curAttackSpeed", 1);

          _defineProperty(this, "curDodgeRate", 0);

          _defineProperty(this, "curCriticalHitRate", 0);

          _defineProperty(this, "curCriticalHitDamage", 0);

          _defineProperty(this, "curHpLimit", 0);

          _defineProperty(this, "_arrFormChangeSkill", []);

          _defineProperty(this, "_arrValueChangeSkill", []);

          _defineProperty(this, "_arrBuffSkill", []);

          _defineProperty(this, "_arrTriggerSkill", []);

          _defineProperty(this, "_hp", 0);

          _defineProperty(this, "_isDie", false);

          _defineProperty(this, "_horizontal", 0);

          _defineProperty(this, "_vertical", 0);

          _defineProperty(this, "_targetAngle", new Vec3());

          _defineProperty(this, "_curAngleY", 0);

          _defineProperty(this, "_ndTarget", null);

          _defineProperty(this, "_throwArrowSpeed", 30);

          _defineProperty(this, "_arrowPos", new Vec3());

          _defineProperty(this, "_bloodTipOffsetPos", new Vec3(-10, 150, 0));

          _defineProperty(this, "_playerMonsterOffset", new Vec3());

          _defineProperty(this, "_isUseFullAngle", true);

          _defineProperty(this, "_oriPlayerPos", new Vec3(0, 1.7, 0));

          _defineProperty(this, "_oriPlayerScale", new Vec3(4, 4, 4));

          _defineProperty(this, "_oriPlayerAngle", new Vec3(0, -90, 0));

          _defineProperty(this, "_curAngle_1", new Vec3());

          _defineProperty(this, "_curAngle_2", new Vec3());

          _defineProperty(this, "_rotateDirection", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_ndRunSmokeEffect", null);

          _defineProperty(this, "_originAngle", new Vec3(0, -90, 0));

          _defineProperty(this, "_tempAngle", new Vec3());

          _defineProperty(this, "_forWard", new Vec3());

          _defineProperty(this, "_range", 0.01);

          _defineProperty(this, "_curMoveSpeed", 0);

          _defineProperty(this, "_curBlood", 0);

          _defineProperty(this, "_action", 0);

          _defineProperty(this, "_rotateInterval", 0.3);

          _defineProperty(this, "_dictArrowPreload", {});
        } //玩家在base.csv的基础数据


        set isDie(v) {
          this._isDie = v;

          if (this._isDie) {
            this._showDie();
          }
        }

        get isDie() {
          return this._isDie;
        } //是否拥有形态技能
        //当前玩家生命值上限（这个是上限，是生命上限，不是当前生命值）


        set curMoveSpeed(v) {
          this._curMoveSpeed = v;
          this.scriptCharacterRigid.initSpeed(v);
        }

        get curMoveSpeed() {
          return this._curMoveSpeed;
        } //技能数组
        //存放预加载的箭{name(种类名称)：{effects（所带特效）：["ice", "fire", "lightning"]}}


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL, this._parsePlayerSkill, this);
          ClientEvent.on(Constant.EVENT_TYPE.ON_REVIVE, this._onRevive, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL, this._parsePlayerSkill, this);
          ClientEvent.off(Constant.EVENT_TYPE.ON_REVIVE, this._onRevive, this);

          if (this.scriptBloodBar) {
            this._curBlood = this.scriptBloodBar.curBlood;
            this.scriptBloodBar.node.destroy();
            this.scriptBloodBar = null;
          }
        }

        start() {}

        init() {
          this.isMoving = false;
          this.isDie = false;
          this.isPlayRotate = false;
          this.isArrowDouble = false;
          this.isArrowPenetrate = false;
          this.isArrowContinuous = false;
          this.isArrowIce = false;
          this.isArrowFire = false;
          this.isBloodthirsty = false;
          this.isArrowLightning = false;
          this.isArrowLaunch = false;
          this._horizontal = 0;
          this._vertical = 0;
          this._curBlood = 0;
          this._ndTarget = null;
          this.scriptCharacterRigid = this.node.getComponent(CharacterRigid); //获取玩家基础数据

          this.playerBaseInfo = LocalConfig.instance.queryByID("base", Constant.BASE.PLAYER_01);

          if (this.playerBaseInfo) {
            //设置玩家大小
            let arrScale = Util.parseStringData(this.playerBaseInfo.scale, ",");

            this._oriPlayerScale.set(arrScale[0], arrScale[1], arrScale[2]);

            this.node.setScale(this._oriPlayerScale);
            this.resetPlayerWorPos(); //设置角度

            let arrAngle = Util.parseStringData(this.playerBaseInfo.angle, ",");

            this._oriPlayerAngle.set(arrAngle[0], arrAngle[1], arrAngle[2]);

            this.node.eulerAngles = this._oriPlayerAngle;
            this.curAttackPower = this.playerBaseInfo.attackPower;
            this.curDefensePower = this.playerBaseInfo.defensePower;
            this.curAttackSpeed = this.playerBaseInfo.attackSpeed;
            this.curMoveSpeed = this.playerBaseInfo.moveSpeed;
            this.curDodgeRate = this.playerBaseInfo.dodgeRate;
            this.curCriticalHitRate = this.playerBaseInfo.criticalHitRate;
            this.curCriticalHitDamage = this.playerBaseInfo.criticalHitDamage;
            this.curHpLimit = this.playerBaseInfo.hp;
            this._hp = this.playerBaseInfo.hp;
          }

          this._parsePlayerSkill(true); //展示血条


          UIManager.instance.showPlayerBloodBar(this, this._hp, this._hp, () => {// if (GameManager.isTesting) {
            //     this.addBlood(2000, true);
            // }
          }, this._bloodTipOffsetPos);
          this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true);
          this.scriptPlayerModel.init();
          this.rigidComPlayer.clearState();
        }
        /**
         * 每次成功进入新的一层则更新玩家状态
         *
         * @memberof Player
         */


        resetPlayerState() {
          this.node.active = true;
          this.rigidComPlayer.clearState();
          this.resetPlayerWorPos();
          this.node.eulerAngles = this._originAngle;
          this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true); //将未播放结束的特效节点隐藏，避免到下一层还在展示特效

          this.node.children.forEach(ndChild => {
            if (ndChild.name !== "body") {
              ndChild.active = false;
            }
          });

          if (!this.scriptBloodBar) {
            UIManager.instance.showPlayerBloodBar(this, this.curHpLimit, this._curBlood, () => {}, this._bloodTipOffsetPos);
          }
        }
        /**
         * 根据an、anS两张图设置不同的玩家初始位置
         */


        resetPlayerWorPos() {
          let arrPosition = Util.parseStringData(this.playerBaseInfo.position, ",");

          if (MapManager.isMapAnS) {
            this._oriPlayerPos.set(-16.742, arrPosition[1], -0.719);
          } else {
            //设置坐标
            this._oriPlayerPos.set(arrPosition[0], arrPosition[1], arrPosition[2]);
          }

          this.node.setPosition(this._oriPlayerPos);
        }
        /**
         * 解析玩家当前技能
         * 
         * @param {boolean} isCoverSkill 是否重新覆盖技能，主角初始化的要，其他时候不需要
         * @memberof Player
         */


        _parsePlayerSkill(isCoverSkill = false) {
          let arrSkill = PlayerData.instance.playerInfo.arrSkill;
          let arrFormChangeSkill = [];
          let arrValueChangeSkill = [];
          let arrBuffSkill = [];
          let arrTriggerSkill = [];

          if (arrSkill.length) {
            arrSkill.forEach(item => {
              if (item.startsWith(Constant.PLAYER_SKILL_USE.FORM_CHANGE)) {
                arrFormChangeSkill.push(item);
              } else if (item.startsWith(Constant.PLAYER_SKILL_USE.VALUE)) {
                arrValueChangeSkill.push(item);
              } else if (item.startsWith(Constant.PLAYER_SKILL_USE.BUFF)) {
                arrBuffSkill.push(item);
              } else if (item.startsWith(Constant.PLAYER_SKILL_USE.TRIGGER)) {
                arrTriggerSkill.push(item);
              }
            });
          }

          this._arrFormChangeSkill = arrFormChangeSkill;
          this._arrValueChangeSkill = arrValueChangeSkill;
          this._arrBuffSkill = arrBuffSkill;
          this._arrTriggerSkill = arrTriggerSkill; // console.log("###_arrFormChangeSkill", this._arrFormChangeSkill);
          // console.log("###_arrValueChangeSkill", this._arrValueChangeSkill);
          // console.log("###_arrBuffSkill", this._arrBuffSkill);
          // console.log("###_arrTriggerSkill", this._arrTriggerSkill);

          if (this._arrFormChangeSkill.length) {
            this.isArrowDouble = this._arrFormChangeSkill.indexOf(Constant.PLAYER_SKILL.ARROW_DOUBLE) !== -1;
            this.isArrowPenetrate = this._arrFormChangeSkill.indexOf(Constant.PLAYER_SKILL.ARROW_PENETRATE) !== -1;
            this.isArrowContinuous = this._arrFormChangeSkill.indexOf(Constant.PLAYER_SKILL.ARROW_CONTINUOUS) !== -1;
          } else {
            this.isArrowDouble = false;
            this.isArrowPenetrate = false;
            this.isArrowContinuous = false;
          } //数值技能只使用一次, 注意：每次获得到需用乘法都是用当前值去乘，而不是乘以最开始的值


          if (this._arrValueChangeSkill.length) {
            //攻击力提升百分比
            let oriAttackPower = this.playerBaseInfo.attackPower;
            let curAttackPower = oriAttackPower; //攻击力1

            let raiseAttackPowerRate_1 = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_ATTACK_01);
            curAttackPower = oriAttackPower * (1 + raiseAttackPowerRate_1); //攻击力2

            let raiseAttackPowerRate_2 = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_ATTACK_02);
            this.curAttackPower = curAttackPower * (1 + raiseAttackPowerRate_2); //闪避率提升百分比

            let oriDodgeRate = this.playerBaseInfo.dodgeRate;
            let raiseDodgeRate = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_DODGE);
            this.curDodgeRate = oriDodgeRate + raiseDodgeRate; //注：以加法形式增加
            //攻速提升百分比

            let oriAttackSpeed = this.playerBaseInfo.attackSpeed;
            let curAttackSpeed = oriAttackSpeed; //攻速1

            let raiseAttackSpeedRate_1 = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_ATTACK_SPEED_01);
            curAttackSpeed = oriAttackSpeed * (1 + raiseAttackSpeedRate_1); //攻速2

            let raiseAttackSpeedRate_2 = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_ATTACK_SPEED_02);
            this.curAttackSpeed = curAttackSpeed * (1 + raiseAttackSpeedRate_2);

            if (!isCoverSkill) {
              let oriHpLimit = this.playerBaseInfo.hp;
              let raiseHpLimitRate = this.getValueSkillRate(Constant.PLAYER_SKILL.RAISE_HP_LIMIT);
              let offsetHp = oriHpLimit * raiseHpLimitRate;
              let curHpLimit = oriHpLimit + offsetHp;

              if (curHpLimit > this.curHpLimit) {
                this.addBlood(offsetHp, true);
                this.curHpLimit = curHpLimit;
                this._hp += offsetHp;
              }
            } //移速提升百分比


            let oriMoveSpeed = this.playerBaseInfo.moveSpeed;
            let raiseMoveSpeedRate = this.getValueSkillRate(Constant.PLAYER_SKILL.MOVE_SPEED);
            this.curMoveSpeed = oriMoveSpeed * (1 + raiseMoveSpeedRate); //暴击+爆伤提升百分比

            let oriCriticalHitRate = this.playerBaseInfo.criticalHitRate;
            let oriCriticalHitDamage = this.playerBaseInfo.criticalHitDamage;
            let arrCritical_1 = [0, 0]; //暴击率,暴击伤害比

            let arrCritical_2 = [0, 0]; //暴击率,暴击伤害比

            arrCritical_1 = this.getValueSkillRateArr(Constant.PLAYER_SKILL.RAISE_CRITICAL_HIT_DAMAGE_01);
            arrCritical_2 = this.getValueSkillRateArr(Constant.PLAYER_SKILL.RAISE_CRITICAL_HIT_DAMAGE_02);
            let raiseCriticalHitRate = arrCritical_1[0] + arrCritical_2[0];
            let raiseCriticalHitDamage = arrCritical_1[1] + arrCritical_2[1];

            if (raiseCriticalHitRate) {
              this.curCriticalHitRate = oriCriticalHitRate + raiseCriticalHitRate; //注：以加法形式增加
            }

            if (raiseCriticalHitDamage) {
              this.curCriticalHitDamage = oriCriticalHitDamage + raiseCriticalHitDamage; //注：以加法形式增加
            }
          } else {
            this.curAttackPower = this.playerBaseInfo.attackPower;
            this.curAttackSpeed = this.playerBaseInfo.attackSpeed;
            this.curMoveSpeed = this.playerBaseInfo.moveSpeed;
            this.curDodgeRate = this.playerBaseInfo.dodgeRate;
            this.curCriticalHitRate = this.playerBaseInfo.criticalHitRate;
            this.curCriticalHitDamage = this.playerBaseInfo.criticalHitDamage;
            this.curHpLimit = this.playerBaseInfo.hp;
          }

          if (this._arrBuffSkill.length) {
            this.isArrowIce = this._arrBuffSkill.indexOf(Constant.PLAYER_SKILL.ARROW_ICE) !== -1;
            this.isArrowFire = this._arrBuffSkill.indexOf(Constant.PLAYER_SKILL.ARROW_FIRE) !== -1;
          } else {
            this.isArrowIce = false;
            this.isArrowFire = false;
          }

          if (this._arrTriggerSkill.length) {
            this.isArrowLightning = this._arrTriggerSkill.indexOf(Constant.PLAYER_SKILL.ARROW_LIGHTNING) !== -1;
            this.isArrowLaunch = this._arrTriggerSkill.indexOf(Constant.PLAYER_SKILL.ARROW_LAUNCH) !== -1;
            this.isBloodthirsty = this._arrTriggerSkill.indexOf(Constant.PLAYER_SKILL.BLOODTHIRSTY) !== -1;
          } else {
            this.isArrowLightning = false;
            this.isArrowLaunch = false;
            this.isBloodthirsty = false;
          }
        }
        /**
         * 返回当前数值技能提升比例
         */


        getValueSkillRate(key) {
          var _rate;

          let rate = 0; //百分比

          if (this._arrValueChangeSkill.indexOf(key) !== -1) {
            let skillInfo = LocalConfig.instance.queryByID("playerSkill", key);
            rate = Number(skillInfo.value);
          }

          return (_rate = rate) !== null && _rate !== void 0 ? _rate : 0;
        }
        /**
         * 返回当前数值技能提升比例数组
         */


        getValueSkillRateArr(key) {
          let arrRate = [];

          if (this._arrValueChangeSkill.indexOf(key) !== -1) {
            let skillInfo = LocalConfig.instance.queryByID("playerSkill", key);
            arrRate = skillInfo.value.split("#");
          }

          arrRate = arrRate.map(item => {
            return item ? Number(item) : 0;
          });

          if (arrRate.length === 0) {
            arrRate = [0, 0];
          }

          return arrRate;
        }
        /**
         * 玩家行为
         *
         * @param {*} obj
         * @memberof Player
         */


        playAction(obj) {
          if (this.isDie) {
            return;
          }

          switch (obj.action) {
            case Constant.PLAYER_ACTION.MOVE:
              let angle = obj.value + 135;
              let radian = angle * macro.RAD;
              this._horizontal = Math.round(Math.cos(radian) * 1);
              this._vertical = Math.round(Math.sin(radian) * 1);
              this.isMoving = true;
              this._curAngleY = obj.value;
              this._curAngleY = this._curAngleY < 0 ? this._curAngleY + 360 : this._curAngleY > 360 ? this._curAngleY - 360 : this._curAngleY;
              break;

            case Constant.PLAYER_ACTION.STOP_MOVE:
              this._horizontal = 0;
              this._vertical = 0;

              this._onPlayerStopMove();

              this.isMoving = false;
              this.rigidComPlayer.clearState();
              this.scriptCharacterRigid.stopMove();
              this._rotateInterval = 0.2;
              break;
          }
        }
        /**
         * 玩家不移动时：a) 地图上没有怪物：在原地待机。b) 地图上有怪物：向怪物方向攻击。
         *
         * @private
         * @memberof Player
         */


        _onPlayerStopMove() {
          if (!GameManager.isGameOver && GameManager.isGameStart) {
            if (GameManager.arrMonster.length) {
              let isMonsterSurvive = GameManager.arrMonster.some(item => {
                return item.parent !== null;
              });

              if (isMonsterSurvive) {
                this._attackMonster();
              }
            } else {
              this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true);
            }
          }
        }
        /**
         * 向目标位置移动
         *
         * @private
         * @memberof Monster
         */


        _moveToTargetWorPos(targetWorPos) {
          let angleY = this._getTwoPosAngleY(this.node.worldPosition, targetWorPos);

          this.playAction({
            action: Constant.MONSTER_ACTION.MOVE,
            value: angleY
          });
        }

        _getTwoPosAngleY(selfWorPos, targetWorPos) {
          var _GameManager$mainCame, _GameManager$mainCame2;

          let targetScreenPos = (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.worldToScreen(targetWorPos);
          let selfScreenPos = (_GameManager$mainCame2 = GameManager.mainCamera) === null || _GameManager$mainCame2 === void 0 ? void 0 : _GameManager$mainCame2.worldToScreen(selfWorPos);
          Vec3.subtract(this._playerMonsterOffset, targetScreenPos, selfScreenPos);
          let angleY = Math.round(Math.atan2(this._playerMonsterOffset.y, this._playerMonsterOffset.x) * 180 / Math.PI);
          return angleY;
        }
        /**
         * 向怪物方向攻击
         */


        _attackMonster() {
          this._ndTarget = GameManager.getNearestMonster();

          if (!this._ndTarget || this.isDie) {
            return;
          }

          this._moveToTargetWorPos(this._ndTarget.worldPosition);

          this.isMoving = false; //再播放攻击动画

          this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.ATTACK, false, () => {
            if (!this.scriptPlayerModel.isRunning) {
              this._attackMonster();
            }
          });
        }
        /**
         * 向敌人射箭
         *
         * @returns
         * @memberof Player
         */


        throwArrowToEnemy() {
          //射击摇摆
          this.node.forward = Vec3.subtract(this._forWard, this.node.worldPosition, this._ndTarget.worldPosition).normalize().negative(); //使用形态变换技能

          if (this._arrFormChangeSkill.length) {
            //使用技能
            if (this.isArrowDouble) {
              if (this.isArrowContinuous) {
                this._initArrow("arrowDoubleContinuous");
              } else {
                this._initArrow("arrowDouble");
              }
            } else {
              if (this.isArrowContinuous) {
                this._initArrow("arrowSingleContinuous");
              } else {
                this._initArrow("arrowSingle");
              }
            }

            this._arrFormChangeSkill.forEach(item => {
              let skillInfo = LocalConfig.instance.queryByID("playerSkill", String(item));

              if (item === Constant.PLAYER_SKILL.ARROW_REVERSE || item === Constant.PLAYER_SKILL.ARROW_SIDE || item === Constant.PLAYER_SKILL.ARROW_UMBRELLA) {
                this._initArrow(skillInfo.resName);
              }
            });
          } else {
            //没有技能则默认连续射单只箭
            this._initArrow("arrowSingle");
          }
        }
        /**
         * 初始化箭
         *
         * @private
         * @param {string} arrowName
         * @memberof Player
         */


        _initArrow(arrowName) {
          ResourceUtil.loadModelRes(`weapon/arrow/${arrowName}`).then(prefab => {
            if (this.isMoving) {
              return;
            }

            let ndArrow = PoolManager.instance.getNode(prefab, GameManager.ndGameManager);
            let playerWorPos = this.node.worldPosition;

            this._arrowPos.set(playerWorPos.x, 3, playerWorPos.z); // if (GameManager.isTesting) {
            //     this._arrowPos.set(playerWorPos.x, -3, playerWorPos.z);
            // }


            ndArrow.setWorldPosition(this._arrowPos);
            ndArrow.eulerAngles = this.node.eulerAngles;
            ndArrow.children.forEach(ndArrowItem => {
              let scriptArrowItem = ndArrowItem.getComponent(Arrow);
              scriptArrowItem.init(this._throwArrowSpeed, this.node.worldPosition);
            }); //播放箭的音效

            let isHasIce = GameManager.scriptPlayer.isArrowIce;
            let isHasFire = GameManager.scriptPlayer.isArrowFire;
            let isHasLightning = GameManager.scriptPlayer.isArrowLightning;

            if (isHasIce || isHasFire || isHasLightning) {
              if (isHasIce) {
                AudioManager.instance.playSound(Constant.SOUND.ICE);
              }

              if (isHasFire) {
                AudioManager.instance.playSound(Constant.SOUND.FIRE);
              }

              if (isHasLightning) {
                AudioManager.instance.playSound(Constant.SOUND.LIGHTNING);
              }
            } else {
              AudioManager.instance.playSound(Constant.SOUND.LOOSE);
            }
          });
        }
        /**
         * 玩家加血、增加血量上限
         *
         * @param {number} bloodNum
         * @param {boolean} [isIncreaseLimit]
         * @memberof Player
         */


        addBlood(bloodNum, isIncreaseLimit) {
          EffectManager.instance.loadAndPlayEffect(true, this.node, "recovery/recovery", 1, null, null, true, true, GameManager.gameSpeed, true);
          UIManager.instance.showBloodTips(this, Constant.FIGHT_TIP.ADD_BLOOD, bloodNum, this._bloodTipOffsetPos);
          this.scriptBloodBar.refreshBlood(bloodNum, isIncreaseLimit);
          AudioManager.instance.playSound(Constant.SOUND.RECOVERY);
        }
        /**
         * 玩家扣血
         *
         * @param {*} baseInfo 敌人基础信息
         * @return {*} 
         * @memberof Player
         */


        reduceBlood(baseInfo) {
          if (this.isDie) {
            return;
          }

          AudioManager.instance.playSound(Constant.SOUND.HIT_PLAYER);

          if (Math.random() > this.playerBaseInfo.dodgeRate) {
            //扣血
            let tipType = Constant.FIGHT_TIP.REDUCE_BLOOD; //敌人伤害

            let damage = baseInfo.attackPower * GameManager.attackAddition * (1 - this.playerBaseInfo.defensePower / (this.playerBaseInfo.defensePower + 400));
            let isCriticalHit = Math.random() <= baseInfo.criticalHitRate; //是否暴击

            if (isCriticalHit) {
              damage = damage * baseInfo.criticalHitDamage;
              tipType = Constant.FIGHT_TIP.CRITICAL_HIT;
            }

            UIManager.instance.showBloodTips(this, tipType, -damage, this._bloodTipOffsetPos);
            this.scriptBloodBar.refreshBlood(-damage);
          }
        }
        /**
         * 奔跑的时候加个烟雾
         *
         * @memberof Player
         */


        playRunSmoke() {
          // console.log("展示烟雾");
          if (!this._ndRunSmokeEffect) {
            ResourceUtil.loadEffectRes("runSmoke/runSmoke").then(pf => {
              this._ndRunSmokeEffect = PoolManager.instance.getNode(pf, this.node);
              this._ndRunSmokeEffect.active = true;
              EffectManager.instance.playParticle(this._ndRunSmokeEffect);
            });
          } else {
            this._ndRunSmokeEffect.active = true;
            EffectManager.instance.playParticle(this._ndRunSmokeEffect);
          }
        }
        /**
         * 攻击的时候隐藏烟雾
         *
         * @memberof Player
         */


        hideRunSmoke() {
          if (this._ndRunSmokeEffect && this._ndRunSmokeEffect.active) {
            this._ndRunSmokeEffect.active = false; // console.log("隐藏烟雾");
          }
        }
        /**
         * 预加载箭和特效
         *
         * @private
         * @memberof GameManager
         */


        preloadArrow(callback) {
          let loadNum = 1;

          let loadArrow = arrowName => {
            let arrowItem = this._dictArrowPreload[arrowName];

            if (!arrowItem) {
              this._dictArrowPreload[arrowName] = {
                "effects": []
              };
            }

            if (!arrowItem || GameManager.scriptPlayer.isArrowIce && !this._dictArrowPreload[arrowName].effects.includes("ice") || GameManager.scriptPlayer.isArrowFire && !this._dictArrowPreload[arrowName].effects.includes("fire") || GameManager.scriptPlayer.isArrowLightning && !this._dictArrowPreload[arrowName].effects.includes("lightning")) {
              // console.log("是否首次加载箭", Boolean(arrowItem), 
              // "是否预加载冰技能", GameManager.scriptPlayer.isArrowIce && !this._dictArrowPreload[arrowName].effects.includes("ice"), 
              // "是否预加载火技能", GameManager.scriptPlayer.isArrowFire && !this._dictArrowPreload[arrowName].effects.includes("fire"), 
              // "是否预加载电技能", GameManager.scriptPlayer.isArrowLightning && !this._dictArrowPreload[arrowName].effects.includes("lightning"));
              if (GameManager.scriptPlayer.isArrowIce && !this._dictArrowPreload[arrowName].effects.includes("ice")) {
                this._dictArrowPreload[arrowName].effects.push("ice");
              }

              if (GameManager.scriptPlayer.isArrowFire && !this._dictArrowPreload[arrowName].effects.includes("fire")) {
                this._dictArrowPreload[arrowName].effects.push("fire");
              }

              if (GameManager.scriptPlayer.isArrowLightning && !this._dictArrowPreload[arrowName].effects.includes("lightning")) {
                this._dictArrowPreload[arrowName].effects.push("lightning");
              } //如果还未预加载或者后续有更新的特效则预加载两组箭


              ResourceUtil.loadModelRes(`weapon/arrow/${arrowName}`).then(prefab => {
                for (let index = 0; index < 2; index++) {
                  let ndArrow = PoolManager.instance.getNode(prefab, GameManager.ndGameManager);
                  ndArrow.setWorldPosition(0, 30, 0);
                  ndArrow.children.forEach(ndArrowItem => {
                    let scriptArrowItem = ndArrowItem.getComponent(Arrow);
                    scriptArrowItem.init(this._throwArrowSpeed, this.node.worldPosition, true);
                  });
                }

                loadNum -= 1;

                if (loadNum === 0) {
                  callback(); // console.log("预加载箭_dictArrowPreload", this._dictArrowPreload);
                }
              });
            } else {
              callback();
            }
          }; //没有技能,默认单只箭


          if (this._arrFormChangeSkill.length) {
            //使用技能
            this._arrFormChangeSkill.forEach(item => {
              let skillInfo = LocalConfig.instance.queryByID("playerSkill", String(item));

              if (item === Constant.PLAYER_SKILL.ARROW_REVERSE || item === Constant.PLAYER_SKILL.ARROW_SIDE || item === Constant.PLAYER_SKILL.ARROW_UMBRELLA) {
                loadNum += 1;
                loadArrow(skillInfo.resName);
              }
            });

            if (this.isArrowDouble) {
              if (this.isArrowContinuous) {
                loadArrow("arrowDoubleContinuous");
              } else {
                loadArrow("arrowDouble");
              }
            } else {
              if (this.isArrowContinuous) {
                loadArrow("arrowSingleContinuous");
              } else {
                loadArrow("arrowSingle");
              }
            }
          } else {
            //默认连续射单只箭
            loadArrow("arrowSingle");
          }
        }

        _showDie() {
          this.scriptCharacterRigid.stopMove();
          AudioManager.instance.playSound(Constant.SOUND.PLAYER_01_DIE);
          this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.DIE, false, () => {
            GameManager.isWin = false;
          });
        }
        /**
         * 玩家复活
         */


        _onRevive() {
          GameManager.isGamePause = false;
          this.addBlood(this.curHpLimit * 0.5);
          this.scriptBloodBar.node.active = true;
          this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.REVIVE, false, () => {
            this.isDie = false;
            this.playAction({
              action: Constant.PLAYER_ACTION.STOP_MOVE
            });
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.MONSTER_MOVE);
          });
          AudioManager.instance.playSound(Constant.SOUND.REVIVE);
        }

        update(deltaTime) {
          if (!GameManager.isGameStart || GameManager.isGameOver || GameManager.isGamePause || this.isDie) {
            return;
          } //玩家旋转


          if (this.isPlayRotate) {
            //当前玩家角度
            this._tempAngle.set(this.node.eulerAngles);

            this._tempAngle.y = this._tempAngle.y < 0 ? this._tempAngle.y + 360 : this._tempAngle.y;
            this.node.eulerAngles = this._tempAngle;

            this._curAngle_1.set(0, this._tempAngle.y, 0);

            if (this._horizontal === 0 && this._vertical === 0) {
              this._range = 0.1;
            } else {
              this._range = 0.01;
            } //第二个参数越小朝向敌人越精确


            let isEqual = this._curAngle_1.equals(this._targetAngle, this._range);

            if (!isEqual) {
              Vec3.lerp(this._curAngle_1, this._curAngle_1, this._targetAngle, 0.167);
              this.node.eulerAngles = this._curAngle_1;
            } else {
              this.isPlayRotate = false;
              this.node.eulerAngles = this._targetAngle;
            }
          }

          if (this._horizontal !== 0 || this._vertical !== 0) {
            //计算出旋转角度
            this._rotateDirection.set(this._horizontal, 0, -this._vertical);

            this._rotateDirection.normalize();

            Quat.fromViewUp(qt_0, this._rotateDirection);
            Quat.toEuler(v3_0, qt_0);
            v3_0.y = v3_0.y < 0 ? v3_0.y + 360 : v3_0.y; // console.log("v3_0", v3_0.y);

            this.isPlayRotate = true; //设置当前玩家角度为正数

            this._curAngle_2.set(this.node.eulerAngles);

            if (this._curAngle_2.y < 0) {
              this._curAngle_2.y += 360;
              this.node.eulerAngles = this._curAngle_2; // 转为0~360
            } else if (this._curAngle_2.y > 360) {
              this._curAngle_2.y -= 360;
              this.node.eulerAngles = this._curAngle_2; // 转为0~360
            } //设置目标旋转角度


            if (!v3_0.equals(this.node.eulerAngles, 0.01)) {
              this._targetAngle.y = this._curAngleY + 225;
              this._targetAngle.y = this._targetAngle.y < 0 ? this._targetAngle.y + 360 : this._targetAngle.y > 360 ? this._targetAngle.y - 360 : this._targetAngle.y;

              this._targetAngle.set(0, this._targetAngle.y, 0);

              if (Math.abs(this._targetAngle.y - this._curAngle_2.y) > 180) {
                if (this._targetAngle.y > this._curAngle_2.y) {
                  this._targetAngle.y -= 360;
                } else {
                  this._targetAngle.y += 360;
                }
              } // console.log("this._targetAngle.y", this._targetAngle.y);

            } else {
              this.isPlayRotate = false;
              this.node.eulerAngles = v3_0;
            }

            if (!this.isMoving) {
              return;
            }

            this.scriptCharacterRigid.move(this._rotateDirection.x * this.curMoveSpeed * 0.5 * deltaTime, this._rotateDirection.z * this.curMoveSpeed * 0.5 * deltaTime);

            if (!this.scriptPlayerModel.isRunning && !this.isDie) {
              this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.RUN, true);
            }
          } else {
            if (!this.isDie && !this.scriptPlayerModel.isIdle && !this.scriptPlayerModel.isAttacking) {
              this.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true);
              this.scriptCharacterRigid.stopMove();
            }

            if (this._rotateInterval > 0) {
              this._rotateInterval -= deltaTime;

              if (this._rotateInterval <= 0 && this.isPlayRotate) {
                this.isPlayRotate = false;
              }
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scriptPlayerModel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rigidComPlayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colliderComPlayer", [_dec4], {
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

System.register("chunks:///_virtual/shopItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './playerData.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteComponent, LabelComponent, ButtonComponent, _decorator, Component, Color, ResourceUtil, Constant, AudioManager, EffectManager, PlayerData, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      ButtonComponent = module.ButtonComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "049ebL3+7lNN5+LHpx6ehQr", "shopItem", undefined);

      const {
        ccclass,
        property
      } = _decorator; //商品脚本

      let ShopItem = exports('ShopItem', (_dec = ccclass('ShopItem'), _dec2 = property(SpriteComponent), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec5 = property(LabelComponent), _dec6 = property(ButtonComponent), _dec(_class = (_class2 = (_temp = class ShopItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spSkillIcon", _descriptor, this);

          _initializerDefineProperty(this, "lbName", _descriptor2, this);

          _initializerDefineProperty(this, "lbDesc", _descriptor3, this);

          _initializerDefineProperty(this, "lbGold", _descriptor4, this);

          _initializerDefineProperty(this, "btnCom", _descriptor5, this);

          _defineProperty(this, "_callback", null);

          _defineProperty(this, "_itemInfo", null);

          _defineProperty(this, "_colorRed", new Color(255, 0, 0, 255));

          _defineProperty(this, "_colorBlack", new Color(0, 0, 0, 255));

          _defineProperty(this, "_isMoneyEnough", false);
        } //是否有足够的钱购买技能 


        start() {// [3]
        }

        init(itemInfo, callback) {
          this._itemInfo = itemInfo;
          this._callback = callback;
          this.lbName.string = itemInfo.name;
          this.lbDesc.string = itemInfo.desc;
          this.lbGold.string = itemInfo.price;
          this._isMoneyEnough = PlayerData.instance.playerInfo.gold >= itemInfo.price;
          this.btnCom.interactable = this._isMoneyEnough;

          if (!this._isMoneyEnough) {
            this.lbGold.color = this._colorRed;
          } else {
            this.lbGold.color = this._colorBlack;
          }

          ResourceUtil.setSpriteFrame(`texture/skillIcon/${itemInfo.icon}`, this.spSkillIcon, err => {});
        }

        onBtnItemClick() {
          AudioManager.instance.playSound(Constant.SOUND.SELL);

          if (this._isMoneyEnough) {
            this._callback && this._callback();
            PlayerData.instance.addPlayerSkill(this._itemInfo);
            GameManager.addGold(-this._itemInfo.price);
            EffectManager.instance.loadAndPlayEffect(true, GameManager.ndPlayer, "levelUp/levelUp", 1, null, null, false, true, GameManager.gameSpeed, true);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spSkillIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDesc", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "btnCom", [_dec6], {
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

System.register("chunks:///_virtual/fireBallBig.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, tween, PoolManager, ResourceUtil, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      tween = module.tween;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "07328JA8aFLSbjSpxzXqaIZ", "fireBallBig", undefined);

      const {
        ccclass,
        property
      } = _decorator; //大火球脚本: 炸开的时候才有伤害，跟小火球一样

      let FireBallBig = exports('FireBallBig', (_dec = ccclass('FireBallBig'), _dec(_class = (_temp = class FireBallBig extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "scriptWarning", null);

          _defineProperty(this, "isPlayHitFireBall", false);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "baseInfo", null);
        } //敌人基本信息


        start() {// [3]
        }

        init(skillInfo, baseInfo, scriptParent) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          this.isPlayHitFireBall = false;
          let playerWorPos = scriptParent.attackPos;
          this.node.setWorldPosition(playerWorPos.x, 23, playerWorPos.z);
          this.node.children.forEach(ndChild => {
            ndChild.active = true;
          });
          EffectManager.instance.playParticle(this.node);
          tween(this.node).to(1 / skillInfo.flySpeed, {
            position: playerWorPos
          }, {
            easing: "elasticIn"
          }).call(() => {
            var _scriptParent$scriptW;

            AudioManager.instance.playSound(Constant.SOUND.FIRE_BALL_BIG);
            this.isPlayHitFireBall = true; //关闭预警

            scriptParent === null || scriptParent === void 0 ? void 0 : (_scriptParent$scriptW = scriptParent.scriptWarning) === null || _scriptParent$scriptW === void 0 ? void 0 : _scriptParent$scriptW.hideWarning();
            this.node.children.forEach(ndChild => {
              ndChild.active = false;
            }); // console.log("大火球碰到地面");

            ResourceUtil.loadEffectRes("hit/hitFireBall2").then(prefab => {
              let ndEffect = PoolManager.instance.getNode(prefab, this.node);
              ndEffect.setWorldPosition(this.node.worldPosition);
              EffectManager.instance.playParticle(ndEffect, GameManager.gameSpeed, true, 1.1, () => {
                PoolManager.instance.putNode(ndEffect);
                PoolManager.instance.putNode(this.node);
              });
            });
          }).start();
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/localConfig.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './csvManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, resources, ResourceUtil, CSVManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      CSVManager = module.CSVManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "12facSZhFRGIYa7yxiLVDOp", "localConfig", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let LocalConfig = exports('LocalConfig', (_dec = ccclass("LocalConfig"), _dec(_class = (_temp = _class2 = class LocalConfig {
        constructor() {
          _defineProperty(this, "_csvManager", new CSVManager());

          _defineProperty(this, "_callback", new Function());

          _defineProperty(this, "_currentLoad", 0);

          _defineProperty(this, "_cntLoad", 0);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new LocalConfig();
          return this._instance;
        }
        /**
         * 加载配置文件
         * @param {Function}cb 回调函数 
         */


        loadConfig(cb) {
          this._callback = cb;

          this._loadCSV();
        }

        _loadCSV() {
          //新增数据表 请往该数组中添加....
          resources.loadDir("datas", (err, assets) => {
            if (err) {
              return;
            }

            let arrCsvFiles = assets.filter(item => {
              return item._native !== ".md";
            });
            this._cntLoad = arrCsvFiles.length; //客户端加载

            if (arrCsvFiles.length) {
              arrCsvFiles.forEach((item, index, array) => {
                ResourceUtil.getTextData(item.name, (err, content) => {
                  this._csvManager.addTable(item.name, content);

                  this._tryToCallbackOnFinished();
                });
              });
            } else {
              this._tryToCallbackOnFinished();
            }
          });
        }
        /**
         * 查询一条表内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object} 一条表内容
         */


        queryOne(tableName, key, value) {
          return this._csvManager.queryOne(tableName, key, value);
        }
        /**
         * 根据ID查询一条表内容
         * @param {string}tableName 表名
         * @param {string}ID
         * @returns {Object} 一条表内容
         */


        queryByID(tableName, ID) {
          return this._csvManager.queryByID(tableName, ID);
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */


        getTable(tableName) {
          return this._csvManager.getTable(tableName);
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */


        getTableArr(tableName) {
          return this._csvManager.getTableArr(tableName);
        }
        /**
         * 查询key和value对应的所有行内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object}
         */


        queryAll(tableName, key, value) {
          return this._csvManager.queryAll(tableName, key, value);
        } // 

        /**
         * 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID
         * @param {string} tableName 表名
         * @param {string} key  列名
         * @param {Array}values 数值
         * @returns 
         */


        queryIn(tableName, key, values) {
          return this._csvManager.queryIn(tableName, key, values);
        }
        /**
         * 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据
         * @param {string} tableName 表名
         * @param {any} condition 筛选条件
         * @returns 
         */


        queryByCondition(tableName, condition) {
          return this._csvManager.queryByCondition(tableName, condition);
        }

        _tryToCallbackOnFinished() {
          if (this._callback) {
            this._currentLoad++;

            if (this._currentLoad >= this._cntLoad) {
              this._callback();
            }
          }
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/monsterModel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SkeletalAnimationComponent, _decorator, Component, AnimationClip, Constant, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SkeletalAnimationComponent = module.SkeletalAnimationComponent;
      _decorator = module._decorator;
      Component = module.Component;
      AnimationClip = module.AnimationClip;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "15aa8oJcxdFKKBQnRjjhjLX", "monsterModel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //怪物动画脚本

      let MonsterModel = exports('MonsterModel', (_dec = ccclass('MonsterModel'), _dec2 = property(SkeletalAnimationComponent), _dec(_class = (_class2 = (_temp = class MonsterModel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "aniComPlayer", _descriptor, this);

          _defineProperty(this, "isAniPlaying", false);

          _defineProperty(this, "scriptMonster", null);

          _defineProperty(this, "_aniType", "");

          _defineProperty(this, "_aniState", null);
        } //动画播放状态
        //是否正在跑


        get isRunning() {
          return this._aniType === Constant.MONSTER_ANI_TYPE.RUN && this.isAniPlaying;
        } //是否站立


        get isIdle() {
          return this._aniType === Constant.MONSTER_ANI_TYPE.IDLE && this.isAniPlaying;
        } //是否正在攻击


        get isAttacking() {
          return this._aniType === Constant.MONSTER_ANI_TYPE.ATTACK && this.isAniPlaying || this._aniType === Constant.MONSTER_ANI_TYPE.ATTACK_1 && this.isAniPlaying || this._aniType === Constant.MONSTER_ANI_TYPE.ATTACK_2 && this.isAniPlaying;
        } //是否正在受到攻击


        get isHitting() {
          return this._aniType === Constant.MONSTER_ANI_TYPE.HIT && this.isAniPlaying;
        }

        start() {// [3]
        }
        /**
         * attack动画帧事件
         * @returns 
         */


        onFrameAttack(isNormalAttack = true) {
          if (GameManager.isGameOver || GameManager.isGamePause) {
            return;
          }

          this.scriptMonster.releaseSkillToPlayer(isNormalAttack);
        }
        /**
         * 播放小怪动画
         *
         * @param {string} aniType 动画类型
         * @param {boolean} [isLoop=false] 是否循环
         * @param {Function} [callback] 回调函数
         * @param {number} [pos] 调用播放动画的位置，方便用于测试
         * @returns
         * @memberof Player
         */


        playAni(aniType, isLoop = false, callback, pos) {
          var _this$aniComPlayer, _this$aniComPlayer2; // console.log("monsterAniType", aniType, "curAni", this._aniType, "pos", pos);


          this._aniType = aniType;
          (_this$aniComPlayer = this.aniComPlayer) === null || _this$aniComPlayer === void 0 ? void 0 : _this$aniComPlayer.play(aniType);
          this.isAniPlaying = true;
          this._aniState = (_this$aniComPlayer2 = this.aniComPlayer) === null || _this$aniComPlayer2 === void 0 ? void 0 : _this$aniComPlayer2.getState(aniType);

          if (this._aniState) {
            if (isLoop) {
              this._aniState.wrapMode = AnimationClip.WrapMode.Loop;
            } else {
              this._aniState.wrapMode = AnimationClip.WrapMode.Normal;
            }

            switch (aniType) {
              case Constant.MONSTER_ANI_TYPE.ATTACK:
                this._aniState.speed = GameManager.gameSpeed * GameManager.attackSpeedAddition * this.scriptMonster.curAttackSpeed;
                break;

              case Constant.MONSTER_ANI_TYPE.ATTACK_1:
                this._aniState.speed = GameManager.gameSpeed * GameManager.attackSpeedAddition * this.scriptMonster.curAttackSpeed;
                break;

              case Constant.MONSTER_ANI_TYPE.ATTACK_2:
                this._aniState.speed = GameManager.gameSpeed * GameManager.attackSpeedAddition * this.scriptMonster.curAttackSpeed;
                break;

              case Constant.MONSTER_ANI_TYPE.RUN:
                this._aniState.speed = GameManager.gameSpeed * (this.scriptMonster.curMoveSpeed * GameManager.moveSpeedAddition / this.scriptMonster.baseInfo.moveSpeed);
                break;

              case Constant.MONSTER_ANI_TYPE.IDLE:
                this._aniState.speed = GameManager.gameSpeed;
                break;

              default:
                this._aniState.speed = GameManager.gameSpeed;
                break;
            }
          }

          if (!isLoop) {
            this.aniComPlayer.once(SkeletalAnimationComponent.EventType.FINISHED, () => {
              this.isAniPlaying = false;
              callback && callback();
            });
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "aniComPlayer", [_dec2], {
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

System.register("chunks:///_virtual/pausePanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './skillList.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteComponent, LabelComponent, Node, SpriteFrame, _decorator, Component, ResourceUtil, Constant, ClientEvent, AudioManager, PlayerData, UIManager, GameManager, SkillList;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SkillList = module.SkillList;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "18bb8GQWdpFobKK4cKvVrXH", "pausePanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //暂停界面脚本

      let PausePanel = exports('PausePanel', (_dec = ccclass('PausePanel'), _dec2 = property(SpriteComponent), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec5 = property(Node), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec8 = property(SpriteComponent), _dec9 = property(Node), _dec(_class = (_class2 = (_temp = class PausePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spSkillIcon", _descriptor, this);

          _initializerDefineProperty(this, "lbSkillName", _descriptor2, this);

          _initializerDefineProperty(this, "lbSkillDesc", _descriptor3, this);

          _initializerDefineProperty(this, "ndSkillList", _descriptor4, this);

          _initializerDefineProperty(this, "sfMusicOn", _descriptor5, this);

          _initializerDefineProperty(this, "sfMusicOff", _descriptor6, this);

          _initializerDefineProperty(this, "spBtnSound", _descriptor7, this);

          _initializerDefineProperty(this, "ndSkillItem", _descriptor8, this);

          _defineProperty(this, "_isMusicOpen", false);
        }

        start() {// [3]
        }

        show() {
          let arrSkill = PlayerData.instance.playerInfo.arrSkill;

          if (!arrSkill.length) {
            this.ndSkillItem.active = false;
            this.ndSkillList.active = false;
          } else {
            this.ndSkillItem.active = true;
            this.ndSkillList.active = true;
            let scriptSkillList = this.ndSkillList.getComponent(SkillList);
            scriptSkillList.init(itemInfo => {
              this.lbSkillName.string = itemInfo.name;
              this.lbSkillDesc.string = itemInfo.desc;
              ResourceUtil.setSpriteFrame(`texture/skillIcon/${itemInfo.icon}`, this.spSkillIcon, err => {});
            });
          }

          this._isMusicOpen = AudioManager.instance.getAudioSetting(true);
          this.changeState();
        }

        changeState() {
          if (this._isMusicOpen) {
            this.spBtnSound.spriteFrame = this.sfMusicOn;
          } else {
            this.spBtnSound.spriteFrame = this.sfMusicOff;
          }
        }

        onBtnSoundClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._isMusicOpen = !this._isMusicOpen;
          this.changeState();

          if (this._isMusicOpen) {
            AudioManager.instance.openMusic();
            AudioManager.instance.openSound();
          } else {
            AudioManager.instance.closeMusic();
            AudioManager.instance.closeSound();
          }
        }

        onBtnHomeClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.showDialog("back/backPanel", [() => {
            UIManager.instance.hideDialog("fight/fightPanel");
            UIManager.instance.hideDialog("pause/pausePanel");
            GameManager.isGameOver = true;
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.RECYCLE_ALL);
            UIManager.instance.showDialog("home/homePanel");
          }], () => {}, Constant.PRIORITY.WAITING);
        }

        onBtnPlayClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("pause/pausePanel");
          GameManager.isGamePause = false;
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spSkillIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbSkillName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbSkillDesc", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndSkillList", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sfMusicOn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sfMusicOff", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spBtnSound", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndSkillItem", [_dec9], {
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

System.register("chunks:///_virtual/debugLevelItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, LabelComponent, SpriteComponent, _decorator, Component, Color, Constant, ClientEvent, AudioManager, PlayerData, UIManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "1cca3We2mBMHb1+U22HEfn6", "debugLevelItem", undefined);

      const {
        ccclass,
        property
      } = _decorator; //调试关卡等级脚本

      let DebugLevelItem = exports('DebugLevelItem', (_dec = ccclass('DebugLevelItem'), _dec2 = property(LabelComponent), _dec3 = property(SpriteComponent), _dec(_class = (_class2 = (_temp = class DebugLevelItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbLevelTxt", _descriptor, this);

          _initializerDefineProperty(this, "spCom", _descriptor2, this);

          _defineProperty(this, "_colorSelected", new Color().fromHEX("#3CE649"));

          _defineProperty(this, "_colorUnSelected", new Color().fromHEX("#ffffff"));

          _defineProperty(this, "_isSelected", false);

          _defineProperty(this, "_level", 0);

          _defineProperty(this, "_itemInfo", null);
        }

        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.HIDE_DEBUG_LEVEL_SELECTED, this._hideDebugLevelSelected, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.HIDE_DEBUG_LEVEL_SELECTED, this._hideDebugLevelSelected, this);
        }

        start() {// [3]
        }

        init(itemInfo) {
          this._level = itemInfo.ID;
          this.lbLevelTxt.string = `${this._level}`;
          this._itemInfo = itemInfo;

          this._refreshState();
        }
        /**
         * 切换选中与非选中状态
         *
         * @private
         * @memberof DebugSkillItem
         */


        _refreshState() {
          this._isSelected = PlayerData.instance.playerInfo.level === this._itemInfo.ID;

          if (this._isSelected) {
            this.spCom.color = this._colorSelected;
          } else {
            this.spCom.color = this._colorUnSelected;
          }
        }

        onBtnClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.HIDE_DEBUG_LEVEL_SELECTED);
          this._isSelected = true;

          this._refreshState();

          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.RECYCLE_ALL);
          PlayerData.instance.playerInfo.level = Number(this._level);
          PlayerData.instance.savePlayerInfoToLocalCache();
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_GAME_INIT);
          UIManager.instance.hideDialog("debug/debugPanel");
        }
        /**
         * 隐藏选中状态
         *
         * @private
         * @memberof DebugLevelItem
         */


        _hideDebugLevelSelected() {
          this._isSelected = false;

          this._refreshState();
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbLevelTxt", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spCom", [_dec3], {
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

System.register("chunks:///_virtual/dispersionSurround.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, Node, PoolManager, Util, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "1fdcfxvDc9CIZfp1zEdq2Yu", "dispersionSurround", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let DispersionSurround = exports('DispersionSurround', (_dec = ccclass('DispersionSurround'), _dec(_class = (_temp = class DispersionSurround extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "_curSpeed", 0);

          _defineProperty(this, "_targetSpeed", 0);

          _defineProperty(this, "_oriPos", null);

          _defineProperty(this, "_oriEulerAngles", null);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_disappearRange", 20);

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_oriScale", new Vec3());
        } //初始缩放大小


        start() {// [3]
        }
        /**
        * 初始化 
        */


        init(skillInfo, baseInfo) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          this.node.active = true;

          if (!this._oriPos) {
            this._oriPos = this.node.position.clone();
          }

          if (!this._oriEulerAngles) {
            this._oriEulerAngles = this.node.eulerAngles.clone();
          }

          this.node.setPosition(this._oriPos);
          this.node.eulerAngles.set(this._oriEulerAngles);
          this._targetSpeed = skillInfo.flySpeed;
          this._curSpeed = skillInfo.flySpeed * 0.5;
          EffectManager.instance.playParticle(this.node);
          AudioManager.instance.playSound(Constant.SOUND.ENERGY_BALL);
        }
        /**
         * 击中玩家后隐藏
         *
         * @memberof Arrow
         */


        hide() {
          var _this$node$parent;

          if (!this.node.parent) {
            return;
          }

          this.node.active = false; //如果dispersionSurround组里所有的球都隐藏了则回收整个dispersion预制体

          let isAllHide = (_this$node$parent = this.node.parent) === null || _this$node$parent === void 0 ? void 0 : _this$node$parent.children.every(ndChild => {
            return ndChild.active === false;
          });

          if (isAllHide && this.node.parent) {
            PoolManager.instance.putNode(this.node.parent);
          }
        }

        update(deltaTime) {
          if (!this.node.parent || !GameManager.ndPlayer || GameManager.isGameOver || GameManager.isGamePause) {
            return;
          } //朝forward方向飞行


          this._curSpeed = Util.lerp(this._targetSpeed, this._curSpeed, 0.25);

          this._targetWorPos.set(0, 0, -deltaTime * this._curSpeed);

          this.node.translate(this._targetWorPos, Node.NodeSpace.LOCAL); //超过玩家一定范围则隐藏

          this._curWorPos.set(this.node.worldPosition);

          Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

          if (this._offsetPos && this._offsetPos.length() >= this._disappearRange) {
            this.hide();
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/jetFires.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "20cb3raNbRA/YYlE7ckG1Nj", "jetFires", undefined);

      const {
        ccclass,
        property
      } = _decorator; //直线范围型的火焰

      let JetFires = exports('JetFires', (_dec = ccclass('JetFires'), _dec(_class = (_temp = class JetFires extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "baseInfo", null);
        }

        start() {// [3]
        }

        init(skillInfo, baseInfo, scriptParent) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/warningLine.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, PoolManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "249fettRepLDLPIq30iHueC", "warningLine", undefined);

      const {
        ccclass,
        property
      } = _decorator; //直线预警脚本

      let WarningLine = exports('WarningLine', (_dec = ccclass('WarningLine'), _dec(_class = (_temp = class WarningLine extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_scriptParent", null);
        }

        start() {// [3]
        }

        init(scale, scriptParent) {
          scriptParent.recycleWarning();
          this._scriptParent = scriptParent;
          this.node.setWorldPosition(scriptParent.node.worldPosition.x, 2.5, scriptParent.node.worldPosition.z);
          this.node.forward = scriptParent.attackForward;
          this.node.setScale(1, 1, scale);
          this.showWarning();
        }

        showWarning() {}

        hideWarning() {
          PoolManager.instance.putNode(this.node);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/boss.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './effectManager.ts', './uiManager.ts', './energyBall.ts', './fireBall.ts', './dispersionSurround.ts', './dispersion.ts', './fireBallBig.ts', './tornado.ts', './laser.ts', './monster.ts', './jetFires.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, Material, MeshRenderer, _decorator, Vec3, ParticleSystemComponent, AnimationComponent, PoolManager, ResourceUtil, Util, Constant, ClientEvent, AudioManager, EffectManager, UIManager, EnergyBall, FireBall, DispersionSurround, Dispersion, FireBallBig, Tornado, Laser, Monster, JetFires, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Material = module.Material;
      MeshRenderer = module.MeshRenderer;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      ParticleSystemComponent = module.ParticleSystemComponent;
      AnimationComponent = module.AnimationComponent;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      EnergyBall = module.EnergyBall;
    }, function (module) {
      FireBall = module.FireBall;
    }, function (module) {
      DispersionSurround = module.DispersionSurround;
    }, function (module) {
      Dispersion = module.Dispersion;
    }, function (module) {
      FireBallBig = module.FireBallBig;
    }, function (module) {
      Tornado = module.Tornado;
    }, function (module) {
      Laser = module.Laser;
    }, function (module) {
      Monster = module.Monster;
    }, function (module) {
      JetFires = module.JetFires;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "2b656AN2JJJ2KGEYhDM/3Bh", "boss", undefined);

      const {
        ccclass,
        property
      } = _decorator; //大龙boss脚本, 继承monster.ts

      let Boss = exports('Boss', (_dec = ccclass('Boss'), _dec2 = property(Node), _dec3 = property(Material), _dec4 = property(Material), _dec5 = property(MeshRenderer), _dec(_class = (_class2 = (_temp = class Boss extends Monster {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndSocketDragonHead", _descriptor, this);

          _initializerDefineProperty(this, "matDragon", _descriptor2, this);

          _initializerDefineProperty(this, "matDragonHit", _descriptor3, this);

          _initializerDefineProperty(this, "meshDragon", _descriptor4, this);

          _defineProperty(this, "_countdown", 0.2);

          _defineProperty(this, "_oriSkillEuler", new Vec3());

          _defineProperty(this, "_isSkillReleasing", false);
        } //是否正在释放技能 


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.MONSTER_MOVE, this._monsterMove, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.MONSTER_MOVE, this._monsterMove, this); //回收预警节点

          this.recycleWarning();
        }

        init(baseInfo, layerInfo) {
          var _this$meshDragon;

          super.init(baseInfo, layerInfo);

          this._bloodTipOffsetPos.set(0, 50, 0);

          this._hitEffectPos.set(0, 0.04, 0);

          this._isSkillReleasing = false;
          this._countdown = 0.2;
          (_this$meshDragon = this.meshDragon) === null || _this$meshDragon === void 0 ? void 0 : _this$meshDragon.setMaterial(this.matDragon, 0);
        }

        refreshBlood(bloodNum, tipType) {
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.REFRESH_BOSS_BLOOD, bloodNum);
          UIManager.instance.showBloodTips(this, tipType, bloodNum, this._bloodTipOffsetPos);
        }

        showDie() {
          this.scriptCharacterRigid.stopMove();
          EffectManager.instance.showRewardBounce(this.node, "gold/gold", this.baseInfo.goldNum, () => {
            if (this.baseInfo.heartDropRate >= Math.random()) {
              EffectManager.instance.showRewardBounce(this.node, "heart/heart", 1);
            }
          }); //检查玩家是否拥有嗜血技能：主角击杀敌人时回复自身生命上限2%的生命值。

          if (GameManager.scriptPlayer.isBloodthirsty) {
            let bloodNum = GameManager.scriptPlayer.curHpLimit * 0.02;
            GameManager.scriptPlayer.addBlood(bloodNum);
          }

          this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.DIE, false, () => {
            if (this.isDie) {
              GameManager.ndBoss = null;
              PoolManager.instance.putNode(this.node);
            }
          });
        }

        playAttackAni() {
          super.playAttackAni();
          this._isSkillReleasing = false;
        }
        /**
         * 向玩家释放技能
         *
         * @param {boolean} [isNormalAttack=false] 是否是普通攻击、反之喷火
         * @return {*} 
         * @memberof Boss
         */


        releaseSkillToPlayer(isNormalAttack = false) {
          if (this._isSkillReleasing) {
            return;
          } //boss是非近战的怪物，必须带技能，这里做个容错


          if (!this.allSkillInfo.length) {
            let offsetLength = Util.getTwoNodeXZLength(this.node, GameManager.ndPlayer);

            if (offsetLength <= this._minLength * this._minLengthRatio) {
              GameManager.scriptPlayer.reduceBlood(this.baseInfo);
            }

            return;
          }

          if (isNormalAttack && this.skillInfo.ID !== Constant.MONSTER_SKILL.JET_FIRES) {
            this._isSkillReleasing = true;
            ResourceUtil.loadEffectRes(`${this.skillInfo.resName}/${this.skillInfo.resName}`).then(prefab => {
              if (this.isMoving) {
                return;
              }

              let ndMonsterSkill = PoolManager.instance.getNode(prefab, GameManager.ndGameManager);
              ndMonsterSkill.setWorldPosition(this.node.worldPosition.x, 2.5, this.node.worldPosition.z);
              ndMonsterSkill.forward = this.attackForward.negative();
              let scriptSkillCollider = null; //怪物技能初始化

              switch (this.skillInfo.ID) {
                case Constant.MONSTER_SKILL.ENERGY_BALL:
                  ndMonsterSkill.setWorldPosition(this.ndSocketDragonHead.worldPosition.x, 2.5, this.ndSocketDragonHead.worldPosition.z);
                  scriptSkillCollider = ndMonsterSkill.getComponent(EnergyBall);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                  break;

                case Constant.MONSTER_SKILL.FIRE_BALL:
                  ndMonsterSkill.setWorldPosition(this.ndSocketDragonHead.worldPosition);
                  scriptSkillCollider = ndMonsterSkill.getComponent(FireBall);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                  break;

                case Constant.MONSTER_SKILL.DISPERSION:
                  ndMonsterSkill.children.forEach((ndChild, idx) => {
                    let scriptSkillCollider = ndChild.getComponent(Dispersion);
                    scriptSkillCollider.init(this.skillInfo, this.baseInfo);
                  });
                  break;

                case Constant.MONSTER_SKILL.TORNADO:
                  ndMonsterSkill.setWorldPosition(this.ndSocketDragonHead.worldPosition);
                  scriptSkillCollider = ndMonsterSkill.getComponent(Tornado);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                  break;

                case Constant.MONSTER_SKILL.FIRE_BALL_BIG:
                  scriptSkillCollider = ndMonsterSkill.getComponent(FireBallBig);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                  break;

                case Constant.MONSTER_SKILL.DISPERSION_SURROUND:
                  ndMonsterSkill.children.forEach(ndChild => {
                    let scriptSkillCollider = ndChild.getComponent(DispersionSurround);
                    scriptSkillCollider.init(this.skillInfo, this.baseInfo);
                  });
                  break;

                case Constant.MONSTER_SKILL.LASER:
                  ndMonsterSkill.setWorldPosition(this.ndSocketDragonHead.worldPosition);
                  scriptSkillCollider = ndMonsterSkill.getComponent(Laser);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                  break;
              }

              this._refreshSkill();
            });
          } else if (!isNormalAttack && this.skillInfo.ID === Constant.MONSTER_SKILL.JET_FIRES) {
            this._isSkillReleasing = true;
            ResourceUtil.loadEffectRes(`${this.skillInfo.resName}/${this.skillInfo.resName}`).then(prefab => {
              var _aniCom$defaultClip, _this$scriptWarning;

              if (this.isMoving) {
                return;
              }

              let ndMonsterSkill = PoolManager.instance.getNode(prefab, this.ndSocketDragonHead);
              ndMonsterSkill.eulerAngles = this._oriSkillEuler;
              let ndChild = ndMonsterSkill.getChildByName("boxCollider");
              ndChild.active = true;
              let scriptSkillCollider = ndMonsterSkill.getComponent(JetFires);
              EffectManager.instance.playParticle(ndMonsterSkill);
              scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
              AudioManager.instance.playSound(Constant.SOUND.JET_FIRE);
              let arrParticle = ndMonsterSkill.getComponentsInChildren(ParticleSystemComponent);
              arrParticle.forEach(element => {
                element.simulationSpeed = 1;
                element === null || element === void 0 ? void 0 : element.clear();
                element === null || element === void 0 ? void 0 : element.stop();
                element === null || element === void 0 ? void 0 : element.play();
              }); //播放触发器动画            

              let aniCom = ndMonsterSkill.getComponent(AnimationComponent);
              let aniState;
              let aniName = (_aniCom$defaultClip = aniCom.defaultClip) === null || _aniCom$defaultClip === void 0 ? void 0 : _aniCom$defaultClip.name;

              if (aniName) {
                aniCom.getState(aniName).time = 0;
                aniCom.getState(aniName).sample();
                aniCom.play();
                aniState = aniCom.getState(aniName);
                aniState.speed = GameManager.gameSpeed;
              }

              aniCom.once(AnimationComponent.EventType.FINISHED, () => {
                ndChild.active = false;
              });
              (_this$scriptWarning = this.scriptWarning) === null || _this$scriptWarning === void 0 ? void 0 : _this$scriptWarning.hideWarning();
              setTimeout(() => {
                PoolManager.instance.putNode(ndMonsterSkill);
              }, 4000);

              this._refreshSkill();
            });
          }
        }
        /**
         * 先移动
         *
         * @private
         * @memberof Monster
         */


        _monsterMove() {
          super._monsterMove();
        }
        /**
         * 大龙受击打后闪白效果
         *
         * @memberof Boss
         */


        changeDragonMat() {
          if (this._countdown <= 0) {
            var _this$meshDragon2;

            (_this$meshDragon2 = this.meshDragon) === null || _this$meshDragon2 === void 0 ? void 0 : _this$meshDragon2.setMaterial(this.matDragonHit, 0);
            this._countdown = 0.2;
          }
        }

        lateUpdate(deltaTime) {
          if (this._countdown > 0) {
            this._countdown -= deltaTime;

            if (this._countdown <= 0) {
              var _this$meshDragon3;

              (_this$meshDragon3 = this.meshDragon) === null || _this$meshDragon3 === void 0 ? void 0 : _this$meshDragon3.setMaterial(this.matDragon, 0);
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndSocketDragonHead", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "matDragon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "matDragonHit", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "meshDragon", [_dec5], {
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

System.register("chunks:///_virtual/test.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Component, ParticleSystemComponent, Vec3;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      ParticleSystemComponent = module.ParticleSystemComponent;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "2b6adRTWCtEz5SjJi1RaOm5", "test", undefined);

      const {
        ccclass,
        property
      } = _decorator; //测试武器飞行脚本

      let Test = exports('Test', (_dec = ccclass('Test'), _dec2 = property([Node]), _dec(_class = (_class2 = (_temp = class Test extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "speed", _descriptor, this);

          _initializerDefineProperty(this, "range", _descriptor2, this);

          _initializerDefineProperty(this, "arrNdTarget", _descriptor3, this);

          _defineProperty(this, "_arrOriPos", []);

          _defineProperty(this, "_arrArriveEnd", []);
        }

        start() {
          // [3]
          this._arrOriPos = [];
          this._arrArriveEnd = [];
          this.arrNdTarget.forEach(ndItem => {
            this._arrOriPos.push(ndItem.worldPosition.clone());
          });
        }

        _resetAllPos() {
          this.arrNdTarget.forEach((ndItem, idx) => {
            ndItem.setWorldPosition(this._arrOriPos[idx]); //清除拖尾特效残留

            let arrParticle = ndItem.getComponentsInChildren(ParticleSystemComponent);
            arrParticle.forEach(item => {
              item.simulationSpeed = 1;
              item === null || item === void 0 ? void 0 : item.clear();
              item === null || item === void 0 ? void 0 : item.stop();
              item === null || item === void 0 ? void 0 : item.play();
            });
          });
          this._arrArriveEnd = [];
        }

        update(deltaTime) {
          // [4]
          if (this.arrNdTarget.length) {
            for (let idx = 0; idx < this.arrNdTarget.length; idx++) {
              const ndItem = this.arrNdTarget[idx];
              let pos = ndItem.worldPosition.clone();

              if (pos.length() >= this.range) {
                if (this._arrArriveEnd.indexOf(idx) === -1) {
                  this._arrArriveEnd.push(idx);
                }

                if (this._arrArriveEnd.length >= this.arrNdTarget.length) {
                  this._resetAllPos();

                  break;
                }
              } else {
                ndItem.translate(new Vec3(0, 0, -deltaTime * this.speed), Node.NodeSpace.LOCAL);
              }
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "range", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 30;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "arrNdTarget", [_dec2], {
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

System.register("chunks:///_virtual/debugPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './clientEvent.ts', './storageManager.ts', './audioManager.ts', './effectManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './debugLevelItem.ts', './debugSkillItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, Prefab, _decorator, Component, game, PhysicsSystem, profiler, PoolManager, Constant, ClientEvent, StorageManager, AudioManager, EffectManager, LocalConfig, PlayerData, UIManager, GameManager, DebugLevelItem, DebugSkillItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
      game = module.game;
      PhysicsSystem = module.PhysicsSystem;
      profiler = module.profiler;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      DebugLevelItem = module.DebugLevelItem;
    }, function (module) {
      DebugSkillItem = module.DebugSkillItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "2be6523odhOBpHGGn8NMbw1", "debugPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //调试界面脚本

      let DebugPanel = exports('DebugPanel', (_dec = ccclass('DebugPanel'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec(_class = (_class2 = (_temp = class DebugPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndContentLevel", _descriptor, this);

          _initializerDefineProperty(this, "ndContentPlayerSkill", _descriptor2, this);

          _initializerDefineProperty(this, "pbLevelItem", _descriptor3, this);

          _initializerDefineProperty(this, "pbSkillItem", _descriptor4, this);
        }

        start() {// [3]
        }

        show() {
          GameManager.isGamePause = true;

          this._initLevelView();

          this._initSkillView();
        }
        /**
         * 初始化关卡列表
         *
         * @private
         * @memberof DebugPanel
         */


        _initLevelView() {
          let mapInfo = LocalConfig.instance.getTableArr("checkpoint");
          this.ndContentLevel.children.forEach(item => {
            item.active = false;
          });
          mapInfo.forEach((itemInfo, idx, arr) => {
            let ndChild = null;

            if (idx < this.ndContentLevel.children.length) {
              ndChild = this.ndContentLevel.children[idx];
            } else {
              ndChild = PoolManager.instance.getNode(this.pbLevelItem, this.ndContentLevel);
            }

            ndChild.active = true;
            let scriptDebugLevelItem = ndChild.getComponent(DebugLevelItem);
            scriptDebugLevelItem.init(itemInfo);
          });
        }
        /**
         * 初始化玩家技能列表
         *
         * @private
         * @memberof DebugPanel
         */


        _initSkillView() {
          let playerSkillInfo = LocalConfig.instance.getTableArr("playerSkill"); //策划说回复生命的不出现在技能列表里面

          playerSkillInfo = playerSkillInfo.concat().filter(item => {
            return item.ID !== Constant.PLAYER_SKILL.RECOVERY;
          });
          this.ndContentPlayerSkill.children.forEach(item => {
            item.active = false;
          });
          playerSkillInfo.forEach((itemInfo, idx, arr) => {
            let ndChild = null;

            if (idx < this.ndContentPlayerSkill.children.length) {
              ndChild = this.ndContentPlayerSkill.children[idx];
            } else {
              ndChild = PoolManager.instance.getNode(this.pbSkillItem, this.ndContentPlayerSkill);
            }

            ndChild.active = true;
            let scriptDebugLevelItem = ndChild.getComponent(DebugSkillItem);
            scriptDebugLevelItem.init(itemInfo);
          });
        }
        /**
         * 关闭按钮
         *
         * @memberof DebugPanel
         */


        onBtnCloseClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("debug/debugPanel");
          GameManager.isGamePause = false;
        }
        /**
         * 清除玩家缓存
         *
         * @memberof DebugPanel
         */


        onBtnClearStorageClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          PlayerData.instance.playerInfo = {};
          PlayerData.instance.history = {};
          PlayerData.instance.settings = {};
          PlayerData.instance.saveAll();
          StorageManager.instance.jsonData = {};
          StorageManager.instance.save();
          UIManager.instance.showTips("游戏缓存已清除，请完全关闭游戏并重新打开！");
        }
        /**
         * 切换30帧
         *
         * @memberof DebugPanel
         */


        onToggleFrame30Click() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.showTips("游戏已经切换为30帧");
          StorageManager.instance.setGlobalData("frameRate", 30);
          game.frameRate = 30;
          PhysicsSystem.instance.fixedTimeStep = 1 / 30;

          this._showState();
        }
        /**
         * 切换60帧
         *
         * @memberof DebugPanel
         */


        onToggleFrame60Click() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.showTips("游戏已经切换为60帧");
          StorageManager.instance.setGlobalData("frameRate", 60);
          game.frameRate = 60;
          PhysicsSystem.instance.fixedTimeStep = 1 / 60;

          this._showState();
        }
        /**
         * 清除玩家全部技能
         *
         * @memberof DebugPanel
         */


        onBtnClearPlayerSkillClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          PlayerData.instance.playerInfo.arrSkill = [];
          PlayerData.instance.savePlayerInfoToLocalCache();
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL);

          this._initSkillView();
        }
        /**
         *  拥有玩家全部技能
         *
         * @memberof DebugPanel
         */


        onBtnSelectAllPlayerSkillClick() {
          AudioManager.instance.playSound(Constant.SOUND.GET_SKILL);
          let arrSkill = LocalConfig.instance.getTableArr("playerSkill");
          let arr = [];
          arrSkill.forEach(item => {
            //生命回复改成在游戏内获得，不通过技能列表获得
            if (item.ID !== Constant.PLAYER_SKILL.RECOVERY) {
              arr.push(item.ID);
            }
          });
          PlayerData.instance.playerInfo.arrSkill = arr;
          PlayerData.instance.savePlayerInfoToLocalCache();
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL);

          this._initSkillView();

          EffectManager.instance.loadAndPlayEffect(true, GameManager.ndPlayer, "levelUp/levelUp", 1, null, null, false, true, GameManager.gameSpeed, true);
        }
        /**
         * 切换调试状态
         *
         * @private
         * @memberof DebugPanel
         */


        _showState() {
          var _StorageManager$insta;

          let isDebugOpen = (_StorageManager$insta = StorageManager.instance.getGlobalData("debug")) !== null && _StorageManager$insta !== void 0 ? _StorageManager$insta : false;
          isDebugOpen ? profiler.showStats() : profiler.hideStats();
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndContentLevel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndContentPlayerSkill", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pbLevelItem", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pbSkillItem", [_dec5], {
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

System.register("chunks:///_virtual/bossBloodBar.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, UITransformComponent, _decorator, Component, clamp, tween, Constant, ClientEvent, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransformComponent = module.UITransformComponent;
      _decorator = module._decorator;
      Component = module.Component;
      clamp = module.clamp;
      tween = module.tween;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "320dc/VulBCMLlzDmV4dtU0", "bossBloodBar", undefined);

      const {
        ccclass,
        property
      } = _decorator; //boss血条脚本

      let BossBloodBar = exports('BossBloodBar', (_dec = ccclass('BossBloodBar'), _dec2 = property(UITransformComponent), _dec3 = property(UITransformComponent), _dec(_class = (_class2 = (_temp = class BossBloodBar extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "UIComWhiteBar", _descriptor, this);

          _initializerDefineProperty(this, "UIComRedBar", _descriptor2, this);

          _defineProperty(this, "_whiteBarHeight", 28);

          _defineProperty(this, "_redBarHeight", 28);

          _defineProperty(this, "_totalBlood", 0);

          _defineProperty(this, "_curBlood", 0);

          _defineProperty(this, "_maxBossWhiteBarWidth", 560);

          _defineProperty(this, "_maxBossRedBarWidth", 560);

          _defineProperty(this, "_isBloodEmpty", false);
        } //血条是否为空


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.REFRESH_BOSS_BLOOD, this._refreshBossBlood, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.REFRESH_BOSS_BLOOD, this._refreshBossBlood, this);
        }

        start() {// [3]
        }
        /**
         * 展示血条
         *
         * @param {*} scriptParent 血条使用者绑定的节点，如玩家或者小怪
         * @param {number} totalBlood 总血量
         * @param {boolean} [isInit=true] 是否是初次展示，初次展示则显示完整血量，否则刷新的时候展示当前血量
         * @memberof BloodBar
         */


        show(scriptParent, totalBlood, isInit = true) {
          this.node.active = true;
          this._totalBlood = totalBlood;
          this._isBloodEmpty = false;

          if (isInit) {
            this._curBlood = this._totalBlood;
          } //当前血量占全部的比例


          let ratio = this._curBlood / this._totalBlood;
          ratio = clamp(ratio, 0, 1); //进度条宽度设置

          this.UIComWhiteBar.setContentSize(ratio * this._maxBossWhiteBarWidth, this._whiteBarHeight);
          this.UIComRedBar.setContentSize(ratio * this._maxBossRedBarWidth, this._redBarHeight);
        }
        /**
         * 刷新boss血量
         *
         * @param {number} num 血量值
         * @memberof BossBloodBar
         */


        _refreshBossBlood(num) {
          this._curBlood += num;
          let ratio = this._curBlood / this._totalBlood;
          ratio = ratio <= 0 ? 0 : ratio;

          if (num < 0) {
            //减血
            this.UIComRedBar.setContentSize(this._maxBossRedBarWidth * ratio, this._whiteBarHeight);

            if (!this._isBloodEmpty) {
              this._isBloodEmpty = ratio <= 0;
              tween(this.UIComWhiteBar).to(0.7, {
                width: this._maxBossWhiteBarWidth * ratio
              }).call(() => {
                if (ratio <= 0) {
                  this.node.active = false;
                  GameManager.scriptBoss.isDie = true;
                }
              }).start();
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "UIComWhiteBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "UIComRedBar", [_dec3], {
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

System.register("chunks:///_virtual/energyBall.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, Node, PoolManager, Util, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "37dc2IA7blBo4bx2LK3KFIH", "energyBall", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let EnergyBall = exports('EnergyBall', (_dec = ccclass('EnergyBall'), _dec(_class = (_temp = class EnergyBall extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "_curSpeed", 0);

          _defineProperty(this, "_targetSpeed", 0);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_disappearRange", 25);

          _defineProperty(this, "_targetWorPos", new Vec3());
        } //能量球的下次目标位置


        start() {// [3]
        }
        /**
        * 初始化 
        */


        init(skillInfo, baseInfo, scriptParent) {
          var _scriptParent$scriptW;

          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          (_scriptParent$scriptW = scriptParent.scriptWarning) === null || _scriptParent$scriptW === void 0 ? void 0 : _scriptParent$scriptW.hideWarning();
          this._targetSpeed = skillInfo.flySpeed;
          this._curSpeed = skillInfo.flySpeed * 0.5;
          EffectManager.instance.playParticle(this.node);
          AudioManager.instance.playSound(Constant.SOUND.ENERGY_BALL);
        }

        update(deltaTime) {
          if (!this.node.parent || !GameManager.ndPlayer || GameManager.isGameOver || GameManager.isGamePause) {
            return;
          } //朝forward方向飞行


          this._curSpeed = Util.lerp(this._targetSpeed, this._curSpeed, 0.25);

          this._targetWorPos.set(0, 0, -deltaTime * this._curSpeed);

          this.node.translate(this._targetWorPos, Node.NodeSpace.LOCAL);

          this._curWorPos.set(this.node.worldPosition); //超过玩家一定范围则隐藏


          Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

          if (this._offsetPos && this._offsetPos.length() >= this._disappearRange) {
            PoolManager.instance.putNode(this.node);
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts', './constant.ts', './storageManager.ts', './audioManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './sdkUtil.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, game, PhysicsSystem, profiler, sys, Game, find, Util, Constant, StorageManager, AudioManager, LocalConfig, PlayerData, UIManager, GameManager, SdkUtil;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      game = module.game;
      PhysicsSystem = module.PhysicsSystem;
      profiler = module.profiler;
      sys = module.sys;
      Game = module.Game;
      find = module.find;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SdkUtil = module.SdkUtil;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "3fbc8GNGL5CfZ4It+SsZdpq", "main", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Main = exports('Main', (_dec = ccclass('Main'), _dec(_class = (_temp = class Main extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_minLoadDuration", 4);
        } //加载开屏最小持续时间


        onEnable() {}

        onDisable() {}

        start() {
          var _StorageManager$insta;

          let frameRate = StorageManager.instance.getGlobalData("frameRate");

          if (typeof frameRate !== "number") {
            frameRate = Constant.GAME_FRAME; //@ts-ignore

            if (window.wx && Util.checkIsLowPhone()) {
              frameRate = 30;
            }

            StorageManager.instance.setGlobalData("frameRate", frameRate);
          }

          console.log("###frameRate", frameRate);
          game.frameRate = frameRate;
          PhysicsSystem.instance.fixedTimeStep = 1 / frameRate;
          let isDebugOpen = (_StorageManager$insta = StorageManager.instance.getGlobalData("debug")) !== null && _StorageManager$insta !== void 0 ? _StorageManager$insta : false;
          isDebugOpen === true ? profiler.showStats() : profiler.hideStats(); //@ts-ignore

          window.cocosAnalytics = false;
          if (window.cocosAnalytics) {
            //@ts-ignore
            window.cocosAnalytics.init({
              appID: "605630324",
              // 游戏ID
              version: '1.0.0',
              // 游戏/应用版本号
              storeID: sys.platform.toString(),
              // 分发渠道
              engine: "cocos" // 游戏引擎

            });
          }

          PlayerData.instance.loadGlobalCache();

          if (!PlayerData.instance.userId) {
            PlayerData.instance.generateRandomAccount();
            console.log("###生成随机userId", PlayerData.instance.userId);
          }

          PlayerData.instance.loadFromCache();

          if (!PlayerData.instance.playerInfo || !PlayerData.instance.playerInfo.createDate) {
            PlayerData.instance.createPlayerInfo();
          } //加载CSV相关配置


          LocalConfig.instance.loadConfig(() => {
            SdkUtil.shareGame(Constant.GAME_NAME_CH, "");

            this._loadFinish();
          }); //AudioManager.instance.init();

          AudioManager.instance.setMusic(0.3); //引导
          //GuideManager.instance.start();
          //加载子包
          // SubPackageManager.instance.loadAllPackage();
          //记录离线时间

          game.on(Game.EVENT_HIDE, () => {
            if (!PlayerData.instance.settings) {
              PlayerData.instance.settings = {};
            }

            PlayerData.instance.settings.hideTime = Date.now();
            PlayerData.instance.saveAll();
            StorageManager.instance.save();
          });
        }

        _loadFinish() {
          GameManager.isFirstLoad = true;
          this.scheduleOnce(() => {
            UIManager.instance.showDialog("home/homePanel", [], () => {
              var _find;

              (_find = find("CanvasLogin")) === null || _find === void 0 ? void 0 : _find.destroy();
              console.log("###开屏界面展示时长", Date.now() - Constant.LOGIN_TIME);
            });
          }, this._minLoadDuration);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shopPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts', './constant.ts', './audioManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './shopItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, SpriteComponent, _decorator, Component, Util, Constant, AudioManager, LocalConfig, PlayerData, UIManager, ShopItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      SpriteComponent = module.SpriteComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      ShopItem = module.ShopItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "434ebEgTgJEaYZMyqxnlnJN", "shopPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //商店脚本

      let ShopPanel = exports('ShopPanel', (_dec = ccclass('ShopPanel'), _dec2 = property(Node), _dec3 = property(SpriteComponent), _dec(_class = (_class2 = (_temp = class ShopPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndSkills", _descriptor, this);

          _initializerDefineProperty(this, "spRefreshIcon", _descriptor2, this);

          _defineProperty(this, "_callback", null);
        }

        start() {// [3]
        }

        show(callback) {
          this._callback = callback;
          let arrLock = PlayerData.instance.getLockPlyerSkill();
          arrLock = Util.shuffle(arrLock);
          this.ndSkills.children.forEach((ndChild, idx, arr) => {
            if (arrLock[idx]) {
              let info = LocalConfig.instance.queryByID("playerSkill", arrLock[idx].ID);
              ndChild.active = true;
              let scriptItem = ndChild.getComponent(ShopItem);
              scriptItem.init(info, () => {
                this._close();
              });
            } else {
              ndChild.active = false;
            }
          });
        }

        onBtnGiveUpClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);

          this._close();
        }

        onBtnRefreshClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this.show(this._callback);
        }

        _close() {
          this._callback && this._callback();
          UIManager.instance.hideDialog("shop/shopPanel");
          UIManager.instance.showDialog("fight/fightPanel");
        }

        onBtnCloseClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);

          this._close();
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndSkills", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spRefreshIcon", [_dec3], {
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

System.register("chunks:///_virtual/debugSkillItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './audioManager.ts', './effectManager.ts', './playerData.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, LabelComponent, SpriteComponent, _decorator, Component, Color, Constant, AudioManager, EffectManager, PlayerData, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Color = module.Color;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "46cbc5Ll/lDvotI3m9eD0Of", "debugSkillItem", undefined);

      const {
        ccclass,
        property
      } = _decorator; //调试单个选项脚本

      let DebugSkillItem = exports('DebugSkillItem', (_dec = ccclass('DebugSkillItem'), _dec2 = property(LabelComponent), _dec3 = property(SpriteComponent), _dec(_class = (_class2 = (_temp = class DebugSkillItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbLevelTxt", _descriptor, this);

          _initializerDefineProperty(this, "spCom", _descriptor2, this);

          _defineProperty(this, "_colorSelected", new Color().fromHEX("#3CE649"));

          _defineProperty(this, "_colorUnSelected", new Color().fromHEX("#ffffff"));

          _defineProperty(this, "_isSelected", false);

          _defineProperty(this, "_level", 0);

          _defineProperty(this, "_itemInfo", null);
        }

        start() {// [3]
        }

        init(itemInfo) {
          this.lbLevelTxt.string = itemInfo.name;
          this._itemInfo = itemInfo;

          this._changeState();
        }
        /**
         * 切换选中与非选中状态
         *
         * @private
         * @memberof DebugSkillItem
         */


        _changeState() {
          this._isSelected = PlayerData.instance.playerInfo.arrSkill.includes(this._itemInfo.ID);

          if (this._isSelected) {
            this.spCom.color = this._colorSelected;
          } else {
            this.spCom.color = this._colorUnSelected;
          }
        }

        onBtnClick() {
          AudioManager.instance.playSound(Constant.SOUND.GET_SKILL);

          if (this._isSelected) {
            PlayerData.instance.reducePlayerSkill(this._itemInfo);
          } else {
            PlayerData.instance.addPlayerSkill(this._itemInfo);
            EffectManager.instance.loadAndPlayEffect(true, GameManager.ndPlayer, "levelUp/levelUp", 1, null, null, false, true, GameManager.gameSpeed, true);
          }

          this._changeState();
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbLevelTxt", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spCom", [_dec3], {
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
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/skillIcon.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './constant.ts', './clientEvent.ts', './audioManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, ButtonComponent, SpriteComponent, Node, _decorator, Component, ResourceUtil, Constant, ClientEvent, AudioManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      ButtonComponent = module.ButtonComponent;
      SpriteComponent = module.SpriteComponent;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "4a59a0RrSJPEbbf8yzemWPE", "skillIcon", undefined);

      const {
        ccclass,
        property
      } = _decorator; //技能图标脚本

      let SkillIcon = exports('SkillIcon', (_dec = ccclass('SkillIcon'), _dec2 = property(ButtonComponent), _dec3 = property(SpriteComponent), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = class SkillIcon extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "btnCom", _descriptor, this);

          _initializerDefineProperty(this, "spIcon", _descriptor2, this);

          _initializerDefineProperty(this, "ndBg", _descriptor3, this);

          _defineProperty(this, "_callback", null);

          _defineProperty(this, "_itemInfo", null);

          _defineProperty(this, "_isSelected", false);
        }

        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.HIDE_SKILL_ICON_SELECTED, this._hideSelected, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.HIDE_SKILL_ICON_SELECTED, this._hideSelected, this);
        }

        start() {// [3]
        }

        init(idx, itemInfo, callback) {
          this._itemInfo = itemInfo;
          this._callback = callback;
          this._isSelected = false;

          if (idx === 0 && this._callback) {
            this._showSelected();

            this._callback(this._itemInfo);
          } else {
            this._hideSelected();
          }

          if (callback) {
            this.btnCom.transition = ButtonComponent.Transition.SCALE;
          } else {
            this.btnCom.transition = ButtonComponent.Transition.NONE;
          }

          ResourceUtil.setSpriteFrame(`texture/skillIcon/${itemInfo.icon}`, this.spIcon, err => {});
        }

        onItemClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);

          if (!this._isSelected && this._callback) {
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.HIDE_SKILL_ICON_SELECTED);

            this._callback(this._itemInfo);

            this._showSelected();
          }
        }

        _showSelected() {
          this._isSelected = true;
          this.ndBg.active = true;
        }

        _hideSelected() {
          this._isSelected = false;
          this.ndBg.active = false;
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnCom", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndBg", [_dec4], {
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
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/reward.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Enum, _decorator, Component, Vec3, Quat, tween, clamp, PoolManager, ResourceUtil, Util, Constant, ClientEvent, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Quat = module.Quat;
      tween = module.tween;
      clamp = module.clamp;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "4b12d072FhMU41q2basHIT2", "reward", undefined); //奖励类型


      const REWARD_TYPE = Enum({
        GOLD: 1,
        //金币
        HEART: 2 //爱心

      });
      const {
        ccclass,
        property
      } = _decorator;
      let Reward = exports('Reward', (_dec = ccclass('Reward'), _dec2 = property({
        type: REWARD_TYPE,
        displayOrder: 1
      }), _dec(_class = (_class2 = (_temp = class Reward extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "rewardType", _descriptor, this);

          _defineProperty(this, "isDropOver", false);

          _defineProperty(this, "_trialScale", new Vec3(3, 3, 3));

          _defineProperty(this, "_trialPos", new Vec3(0, -0.1, 0));

          _defineProperty(this, "_tweenBounce", null);

          _defineProperty(this, "_curQuat", new Quat());

          _defineProperty(this, "_isAutoRotate", false);

          _defineProperty(this, "_isInhaling", false);

          _defineProperty(this, "_oriScale", null);

          _defineProperty(this, "_ndParent", null);

          _defineProperty(this, "_ndTrial", null);

          _defineProperty(this, "_endTargetPos", new Vec3());

          _defineProperty(this, "_midTargetPos", new Vec3());

          _defineProperty(this, "_stepTargetPos", new Vec3());

          _defineProperty(this, "_upSpeedY", 0.2);

          _defineProperty(this, "_downSpeedY", 0.2);

          _defineProperty(this, "_curSpeedY", 0);

          _defineProperty(this, "_oriWorPos", new Vec3());

          _defineProperty(this, "_isArriveMinPos", false);

          _defineProperty(this, "_rewardWorPos", new Vec3());

          _defineProperty(this, "_playerWorPos", new Vec3());

          _defineProperty(this, "_nextWorPos", new Vec3());

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_totalFlyTime", 0);

          _defineProperty(this, "_curFlyTime", 0);

          _defineProperty(this, "_raiseTimes", 1);

          _defineProperty(this, "_bouncePos", new Vec3(0, 0.618, 0));

          _defineProperty(this, "_bounceScale", new Vec3(0.2, 0.2, 0.2));
        } //回收缓动缩放


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.INHALE_REWARD, this._inhaleReward, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.INHALE_REWARD, this._inhaleReward, this);
        }

        start() {}

        init(time, ndParent) {
          this._ndParent = ndParent;

          if (this._oriScale) {
            this.node.setScale(this._oriScale);
          } else {
            this._oriScale = this.node.getScale();
          }

          this._isAutoRotate = false;
          this._isInhaling = false;
          this._curSpeedY = this._upSpeedY;

          this._oriWorPos.set(this.node.getWorldPosition().x, 1.65, this.node.getWorldPosition().z);

          this._isArriveMinPos = false;
          this.isDropOver = false;
          this._totalFlyTime = 0;
          this._curFlyTime = 0;
          this._raiseTimes = 1; //依次弹出奖品

          this.scheduleOnce(() => {
            this.show();
          }, time);

          if (!this._ndTrial) {
            ResourceUtil.loadEffectRes("trail/coinTrail").then(pf => {
              this._ndTrial = PoolManager.instance.getNode(pf, this.node);
              this._ndTrial.active = false;

              this._ndTrial.setScale(this._trialScale);

              this._ndTrial.setPosition(this._trialPos);
            });
          } else {
            this._ndTrial.active = false;
          }
        }

        show() {
          this.node.active = true;
          let x = Math.random() * 6 - 3; //-3~3

          let y = 4; //最高的高度4~4.5;

          let z = Math.random() * 6 - 3; //-3~3

          this._endTargetPos = this._endTargetPos.set(this._oriWorPos).add3f(x, 0, z);
          this._midTargetPos = this._midTargetPos.set(this._oriWorPos).add3f(x / 2, y, z / 2); // console.log("终点位置", this._endTargetPos, "中间位置", this._midTargetPos);

          AudioManager.instance.playSound(Constant.SOUND.GOLD_DROP);
        }
        /**
         * 检查所有怪物是否已经击败，且奖品是否都全部掉落完毕
         *
         * @protected
         * @memberof Reward
         */


        _checkMonsterClearOver() {
          let ndTarget = GameManager.getNearestMonster();

          if (!ndTarget) {
            let arrReward = this._ndParent.children.filter(ndChild => {
              return ndChild.name === "gold" || ndChild.name === "heart";
            });

            let isAllDropOver = arrReward.every(ndReward => {
              let scriptReward = ndReward.getComponent(Reward);
              return scriptReward.isDropOver === true;
            });

            if (isAllDropOver) {
              console.log("###所有的奖品都已经掉落到地上了");
              ClientEvent.dispatchEvent(Constant.EVENT_TYPE.INHALE_REWARD);
            }
          }
        }
        /**
         * 玩家吸入奖品
         *
         * @protected
         * @memberof Reward
         */


        _inhaleReward() {
          //先弹跳
          this._closeTween();

          this._tweenBounce = tween(this.node).by(0.3, {
            position: this._bouncePos,
            scale: this._bounceScale
          }, {
            easing: "bounceInOut"
          }).call(() => {
            //播放粒子特效，不要勾选粒子的prewarm属性，免得出现概率性没有播放拖尾
            this._ndTrial.active = true;
            EffectManager.instance.playParticle(this._ndTrial); //再吸入

            this._isInhaling = true;
          }).start();
        }

        _closeTween() {
          if (this._tweenBounce) {
            this._tweenBounce.stop();

            this._tweenBounce = null;
          }
        }
        /**
         *  检查所有奖品是否吸收完毕
         *
         * @protected
         * @memberof Reward
         */


        _checkInhaleOver() {
          let arrReward = this._ndParent.children.filter(ndChild => {
            return ndChild.name === "gold" || ndChild.name === "heart";
          });

          if (!arrReward.length) {
            console.log("###已吸入全部奖品");
            AudioManager.instance.playSound(Constant.SOUND.GOLD_COLLECT);
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.SHOW_WARP_GATE);
          }
        }

        update(deltaTime) {
          //奖品上下弹跳
          if (!this.isDropOver) {
            this._rewardWorPos.set(this.node.position); //先抬高


            if (!this._isArriveMinPos) {
              this._stepTargetPos = this._rewardWorPos.lerp(this._midTargetPos, 0.03);
              this._curSpeedY = Util.lerp(this._upSpeedY, this._curSpeedY, 0.03);
              this._nextWorPos = this._nextWorPos.set(this._stepTargetPos).add3f(0, this._curSpeedY, 0);
              this._nextWorPos.y = clamp(this._nextWorPos.y, 0, this._midTargetPos.y);
              this.node.setPosition(this._nextWorPos); // if (pos.equals(this._midTargetPos, 0.2)) {

              if (this._nextWorPos.y >= this._midTargetPos.y) {
                this._isArriveMinPos = true;
                this._curSpeedY = 0; // console.log("到达中间位置");
              }
            } else {
              //后降落
              this._stepTargetPos = this._rewardWorPos.lerp(this._endTargetPos, 0.02);
              this._curSpeedY = Util.lerp(this._downSpeedY, this._curSpeedY, 0.05); // console.log("_upSpeedY", this._curSpeedY);

              this._nextWorPos = this._nextWorPos.set(this._stepTargetPos).add3f(0, -this._curSpeedY, 0);
              this._nextWorPos.y = clamp(this._nextWorPos.y, this._endTargetPos.y, this._midTargetPos.y);
              this.node.setPosition(this._nextWorPos);

              if (this._nextWorPos.equals(this._endTargetPos, 0.3)) {
                this.isDropOver = true; // console.log("到达地板上");

                this._isAutoRotate = true;

                this._checkMonsterClearOver();
              }
            }
          } //奖品落地后自动旋转


          if (this._isAutoRotate) {
            Quat.fromEuler(this._curQuat, 0, 120 * deltaTime, 0);
            this.node.rotate(this._curQuat);
          } //奖品被玩家吸入


          if (this._isInhaling) {
            //位置靠近玩家
            this._playerWorPos.set(GameManager.scriptPlayer.node.worldPosition);

            this._rewardWorPos.set(this.node.worldPosition); //向量差


            Vec3.subtract(this._offsetPos, this._playerWorPos, this._rewardWorPos);

            if (!this._totalFlyTime) {
              this._totalFlyTime = this._offsetPos.length() / 2;
            } // 由慢到快


            this._raiseTimes += deltaTime;
            let offset = Math.pow(this._raiseTimes, 0.5) - 1;
            this._curFlyTime += deltaTime + offset;
            this._curFlyTime = this._curFlyTime >= this._totalFlyTime ? this._totalFlyTime : this._curFlyTime;
            let percent = Number((this._curFlyTime / this._totalFlyTime).toFixed(2)); // console.log("percent", percent);

            this._targetWorPos.set(this._rewardWorPos.x + this._offsetPos.x * percent, this._playerWorPos.y, this._rewardWorPos.z + this._offsetPos.z * percent);

            this.node.setWorldPosition(this._targetWorPos);
            let length = Util.getTwoPosXZLength(this._targetWorPos.x, this._targetWorPos.z, this._playerWorPos.x, this._playerWorPos.z); // if (this._targetWorPos.equals(this._playerWorPos, 0.1)) {

            if (length <= 0.1) {
              this._isInhaling = false;
              this._ndTrial.active = false;
              PoolManager.instance.putNode(this.node);

              if (this.rewardType === REWARD_TYPE.GOLD) {
                GameManager.addGold();
              } else if (this.rewardType === REWARD_TYPE.HEART) {
                //回复5%的血量
                let bloodNum = GameManager.scriptPlayer.curHpLimit * 0.05;
                GameManager.scriptPlayer.addBlood(bloodNum);
              }

              this._checkInhaleOver(); // console.log("吸收奖品");

            }
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "rewardType", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return REWARD_TYPE.GOLD;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightTip.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts', './constant.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, LabelComponent, UITransformComponent, view, tween, find, PoolManager, Util, Constant, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      LabelComponent = module.LabelComponent;
      UITransformComponent = module.UITransformComponent;
      view = module.view;
      tween = module.tween;
      find = module.find;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "4caf7l6Ri5P6JX9Le02LsCW", "fightTip", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let FightTip = exports('FightTip', (_dec = ccclass('FightTip'), _dec(_class = (_temp = class FightTip extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_tweenTip", null);

          _defineProperty(this, "_costTime", 1.5);

          _defineProperty(this, "_arrDirection", Util.objectToArray(Constant.BLOOD_TIP_DIRECTION));

          _defineProperty(this, "_isChangePos", false);

          _defineProperty(this, "_targetPos", new Vec3(0, 200, 0));

          _defineProperty(this, "_oriWorPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_oriScale", new Vec3(0.7, 0.7, 0.7));

          _defineProperty(this, "_oriAngle", new Vec3());

          _defineProperty(this, "_scale_1", new Vec3(1, 1, 1));

          _defineProperty(this, "_scale_2", new Vec3());
        } //最终缩放


        start() {// Your initialization goes here.
        }
        /**
         * 展示血量提示
         *
         * @param {*} scriptParent 关联的血条脚本
         * @param {number} tipType 提示类型
         * @param {string} bloodNum 数值
         * @param {Function} [callback] 回调函数
         * @memberof FightTip
         */


        show(scriptParent, tipType, bloodNum, callback) {
          var _ndSub$getChildByName, _ndSub$getComponent, _ndSub$getComponent2;

          this._closeTweenTip();

          this.node.eulerAngles = this._oriAngle;
          this.node.setScale(this._oriScale);
          this._isChangePos = false;

          this._oriWorPos.set(scriptParent.node.worldPosition);

          let arrChildren = this.node.children;
          arrChildren.forEach(item => {
            item.active = false;
          }); // let UICom = this.node.getComponent(UITransformComponent) as UITransformComponent;
          // UICom.priority = constant.PRIORITY.BLOOD_TIP;

          this.node.setSiblingIndex(Constant.PRIORITY.BLOOD_TIP);
          bloodNum = Math.round(bloodNum);
          let txt = String(bloodNum);
          let ndSub = null;

          if (tipType === Constant.FIGHT_TIP.ADD_BLOOD) {
            ndSub = this.node.getChildByName("addBlood");
            txt = "+" + txt;
          } else if (tipType === Constant.FIGHT_TIP.REDUCE_BLOOD) {
            ndSub = this.node.getChildByName("reduceBlood");
          } else if (tipType === Constant.FIGHT_TIP.CRITICAL_HIT) {
            ndSub = this.node.getChildByName("criticalHit"); // UICom.priority = constant.PRIORITY.BLOOD_CRITICAL_TIP;

            this.node.setSiblingIndex(Constant.PRIORITY.BLOOD_CRITICAL_TIP);
          }

          let lbHitNum = (_ndSub$getChildByName = ndSub.getChildByName('num')) === null || _ndSub$getChildByName === void 0 ? void 0 : _ndSub$getChildByName.getComponent(LabelComponent);
          lbHitNum && (lbHitNum.string = txt);
          ndSub.active = true;
          let pos = this.node.getPosition();
          let width = (_ndSub$getComponent = ndSub.getComponent(UITransformComponent)) === null || _ndSub$getComponent === void 0 ? void 0 : _ndSub$getComponent.width;
          let height = (_ndSub$getComponent2 = ndSub.getComponent(UITransformComponent)) === null || _ndSub$getComponent2 === void 0 ? void 0 : _ndSub$getComponent2.height;

          if (Math.abs(pos.x) + width / 2 > view.getCanvasSize().width / 2) {
            let w = view.getCanvasSize().width / 2 - width / 2;
            pos.x = pos.x > 0 ? w : -w;
          }

          if (Math.abs(pos.y) + height / 2 > view.getCanvasSize().height / 2) {
            let h = view.getCanvasSize().height / 2 - height / 2;
            pos.y = pos.y > 0 ? h : -h;
          }

          this.node.setPosition(pos);
          this.getTargetPos(scriptParent);
          this._isChangePos = true;
          this._tweenTip = tween(this.node).to(this._costTime * 0.4, {
            scale: this._scale_1
          }, {
            easing: 'smooth'
          }).to(this._costTime * 0.2, {
            scale: this._scale_2
          }, {
            easing: "backIn"
          }).call(() => {
            this._closeTweenTip();

            PoolManager.instance.putNode(this.node);
            callback && callback();
            this._isChangePos = false;
          }).start();
        }
        /**
         * 获取跟上次血量提示不一样方向的提示
         */


        getTargetPos(scriptParent) {
          let dir;

          let arr = this._arrDirection.concat();

          arr = arr.filter(item => {
            return item !== scriptParent.bloodTipDirection;
          });
          dir = arr[Math.floor(Math.random() * arr.length)];

          switch (dir) {
            case Constant.BLOOD_TIP_DIRECTION.LEFT_UP:
              this._targetPos.set(-2, 5, 0);

              break;

            case Constant.BLOOD_TIP_DIRECTION.MID_UP:
              this._targetPos.set(0, 4, 0);

              break;

            case Constant.BLOOD_TIP_DIRECTION.RIGHT_UP:
              this._targetPos.set(2, 2, 0);

              break;
          }

          this._targetPos.add(scriptParent.node.worldPosition.clone());

          scriptParent.bloodTipDirection = dir;
        }

        _closeTweenTip() {
          if (this._tweenTip) {
            this._tweenTip.stop();

            this._tweenTip = null;
          }
        }

        update(deltaTime) {
          // Your update function goes here.
          if (this._isChangePos) {
            var _GameManager$mainCame;

            this._oriWorPos.lerp(this._targetPos, 0.05);

            (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.convertToUINode(this._oriWorPos, find('Canvas'), this._curWorPos);
            this.node.setPosition(this._curWorPos);
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/laser.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './audioManager.ts', './effectManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Constant, AudioManager, EffectManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "504049FuYdEFIRZxBEBstqp", "laser", undefined);

      const {
        ccclass,
        property
      } = _decorator; //激光技能脚本

      let Laser = exports('Laser', (_dec = ccclass('Laser'), _dec(_class = (_temp = class Laser extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "scriptWarning", null);

          _defineProperty(this, "timer", null);
        } //定时器


        start() {// [3]
        }

        init(skillInfo, baseInfo, scriptParent) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          this.node.active = false;

          this._closeTimer();

          this.timer = setTimeout(() => {
            if (!scriptParent.isDie) {
              var _scriptParent$scriptW;

              AudioManager.instance.playSound(Constant.SOUND.LASER);
              this.node.active = true;
              scriptParent === null || scriptParent === void 0 ? void 0 : (_scriptParent$scriptW = scriptParent.scriptWarning) === null || _scriptParent$scriptW === void 0 ? void 0 : _scriptParent$scriptW.hideWarning();
              EffectManager.instance.playParticle(this.node, skillInfo.flySpeed, true, null, () => {
                this._closeTimer();
              });
            } else {
              this._closeTimer();
            }
          }, 400);
        }

        _closeTimer() {
          if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/util.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "51238kLGAFBiLoz3gxcwxtH", "util", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Util = exports('Util', (_dec = ccclass("Util"), _dec(_class = class Util {
        /**
         * !#zh 拷贝object。
         */

        /**
         * 深度拷贝
         * @param {any} sObj 拷贝的对象
         * @returns 
         */
        static clone(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          let s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (let i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.clone(sObj[i]);
            }
          }

          return s;
        }
        /**
         * 将object转化为数组
         * @param { any} srcObj  
         * @returns 
         */


        static objectToArray(srcObj) {
          let resultArr = []; // to array

          for (let key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push(srcObj[key]);
          }

          return resultArr;
        }
        /**
         * !#zh 将数组转化为object。
         */

        /**
         * 将数组转化为object。
         * @param { any} srcObj 
         * @param { string} objectKey 
         * @returns 
         */


        static arrayToObject(srcObj, objectKey) {
          let resultObj = {}; // to object

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key) || !srcObj[key][objectKey]) {
              continue;
            }

            resultObj[srcObj[key][objectKey]] = srcObj[key];
          }

          return resultObj;
        }
        /**
         * 根据权重,计算随机内容
         * @param {arrany} weightArr 
         * @param {number} totalWeight 权重
         * @returns 
         */


        static getWeightRandIndex(weightArr, totalWeight) {
          let randWeight = Math.floor(Math.random() * totalWeight);
          let sum = 0;

          for (var weightIndex = 0; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];

            if (randWeight < sum) {
              break;
            }
          }

          return weightIndex;
        }
        /**
         * 从n个数中获取m个随机数
         * @param {Number} n   总数
         * @param {Number} m    获取数
         * @returns {Array} array   获取数列
         */


        static getRandomNFromM(n, m) {
          let array = [];
          let intRd = 0;
          let count = 0;

          while (count < m) {
            if (count >= n + 1) {
              break;
            }

            intRd = this.getRandomInt(0, n);
            var flag = 0;

            for (var i = 0; i < count; i++) {
              if (array[i] === intRd) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              array[count] = intRd;
              count++;
            }
          }

          return array;
        }
        /**
         * 获取随机整数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns 
         */


        static getRandomInt(min, max) {
          let r = Math.random();
          let rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }
        /**
         * 获取随机数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns 
         */


        static getRandom(min, max) {
          return Math.random() * (max - min) + min;
        }
        /**
         * 获取字符串长度
         * @param {string} render 
         * @returns 
         */


        static getStringLength(render) {
          let strArr = render;
          let len = 0;

          for (let i = 0, n = strArr.length; i < n; i++) {
            let val = strArr.charCodeAt(i);

            if (val <= 255) {
              len = len + 1;
            } else {
              len = len + 2;
            }
          }

          return Math.ceil(len / 2);
        }
        /**
         * 判断传入的参数是否为空的Object。数组或undefined会返回false
         * @param obj
         */


        static isEmptyObject(obj) {
          let result = true;

          if (obj && obj.constructor === Object) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                result = false;
                break;
              }
            }
          } else {
            result = false;
          }

          return result;
        }
        /**
         * 判断是否是新的一天
         * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
         * @returns {boolean}
         */


        static isNewDay(dateValue) {
          // todo：是否需要判断时区？
          var oldDate = new Date(dateValue);
          var curDate = new Date(); //@ts-ignore

          var oldYear = oldDate.getYear();
          var oldMonth = oldDate.getMonth();
          var oldDay = oldDate.getDate(); //@ts-ignore

          var curYear = curDate.getYear();
          var curMonth = curDate.getMonth();
          var curDay = curDate.getDate();

          if (curYear > oldYear) {
            return true;
          } else {
            if (curMonth > oldMonth) {
              return true;
            } else {
              if (curDay > oldDay) {
                return true;
              }
            }
          }

          return false;
        }
        /**
         * 获取对象属性数量
         * @param {object}o 对象
         * @returns 
         */


        static getPropertyCount(o) {
          var n,
              count = 0;

          for (n in o) {
            if (o.hasOwnProperty(n)) {
              count++;
            }
          }

          return count;
        }
        /**
         * 返回一个差异化数组（将array中diff里的值去掉）
         * @param array
         * @param diff
         */


        static difference(array, diff) {
          let result = [];

          if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
          }

          let length = array.length;

          for (let i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
              result.push(array[i]);
            }
          }

          return result;
        }

        static _stringToArray(string) {
          // 用于判断emoji的正则们
          var rsAstralRange = '\\ud800-\\udfff';
          var rsZWJ = '\\u200d';
          var rsVarRange = '\\ufe0e\\ufe0f';
          var rsComboMarksRange = '\\u0300-\\u036f';
          var reComboHalfMarksRange = '\\ufe20-\\ufe2f';
          var rsComboSymbolsRange = '\\u20d0-\\u20ff';
          var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
          var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
          var rsFitz = '\\ud83c[\\udffb-\\udfff]';
          var rsOptVar = '[' + rsVarRange + ']?';
          var rsCombo = '[' + rsComboRange + ']';
          var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
          var reOptMod = rsModifier + '?';
          var rsAstral = '[' + rsAstralRange + ']';
          var rsNonAstral = '[^' + rsAstralRange + ']';
          var rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
          var rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';
          var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
          var rsSeq = rsOptVar + reOptMod + rsOptJoin;
          var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
          var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

          var hasUnicode = function (val) {
            return reHasUnicode.test(val);
          };

          var unicodeToArray = function (val) {
            return val.match(reUnicode) || [];
          };

          var asciiToArray = function (val) {
            return val.split('');
          };

          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        } // 模拟传msg的uuid


        static simulationUUID() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }

          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }

        static trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        /**
         * 判断当前时间是否在有效时间内
         * @param {String|Number} start 起始时间。带有时区信息
         * @param {String|Number} end 结束时间。带有时区信息
         */


        static isNowValid(start, end) {
          var startTime = new Date(start);
          var endTime = new Date(end);
          var result = false;

          if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
          }

          return result;
        }
        /**
         * 返回相隔天数
         * @param start 
         * @param end 
         * @returns 
         */


        static getDeltaDays(start, end) {
          start = new Date(start);
          end = new Date(end);
          let startYear = start.getFullYear();
          let startMonth = start.getMonth() + 1;
          let startDate = start.getDate();
          let endYear = end.getFullYear();
          let endMonth = end.getMonth() + 1;
          let endDate = end.getDate();
          start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
          end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
          let deltaTime = end - start;
          return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
        }
        /**
         * 获取数组最小值
         * @param array 数组
         * @returns 
         */


        static getMin(array) {
          let result = null;

          if (array.constructor === Array) {
            let length = array.length;

            for (let i = 0; i < length; i++) {
              if (i === 0) {
                result = Number(array[0]);
              } else {
                result = result > Number(array[i]) ? Number(array[i]) : result;
              }
            }
          }

          return result;
        }
        /**
         * 格式化两位小数点
         * @param time 
         * @returns 
         */


        static formatTwoDigits(time) {
          //@ts-ignore
          return (Array(2).join(0) + time).slice(-2);
        }
        /**
         * 根据格式返回时间
         * @param date  时间
         * @param fmt 格式
         * @returns 
         */


        static formatDate(date, fmt) {
          let o = {
            "M+": date.getMonth() + 1,
            //月份
            "d+": date.getDate(),
            //日
            "h+": date.getHours(),
            //小时
            "m+": date.getMinutes(),
            //分
            "s+": date.getSeconds(),
            //秒
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //季度
            "S": date.getMilliseconds() //毫秒

          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

          for (let k in o) //@ts-ignore
          if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

          return fmt;
        }
        /**
         * 获取格式化后的日期（不含小时分秒）
         */


        static getDay() {
          let date = new Date();
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        /**
         * 格式化名字，XXX...
         * @param {string} name 需要格式化的字符串 
         * @param {number}limit 
         * @returns {string} 返回格式化后的字符串XXX...
         */


        static formatName(name, limit) {
          limit = limit || 6;

          var nameArray = this._stringToArray(name);

          var str = '';
          var length = nameArray.length;

          if (length > limit) {
            for (var i = 0; i < limit; i++) {
              str += nameArray[i];
            }

            str += '...';
          } else {
            str = name;
          }

          return str;
        }
        /**
         * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
         * @param {number}money 需要被格式化的数值
         * @returns {string}返回 被格式化的数值
         */


        static formatMoney(money) {
          let arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
          let strValue = '';

          for (let idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
              money /= 1000;
            } else {
              strValue = Math.floor(money) + arrUnit[idx];
              break;
            }
          }

          if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
          }

          return strValue;
        }
        /**
         * 格式化数值
         * @param {number}value 需要被格式化的数值
         * @returns {string}返回 被格式化的数值
         */


        static formatValue(value) {
          let arrUnit = [];
          let strValue = '';

          for (let i = 0; i < 26; i++) {
            arrUnit.push(String.fromCharCode(97 + i));
          }

          for (let idx = 0; idx < arrUnit.length; idx++) {
            if (value >= 10000) {
              value /= 1000;
            } else {
              strValue = Math.floor(value) + arrUnit[idx];
              break;
            }
          }

          return strValue;
        }
        /**
         * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
         * @param {Number} leftSec 
         */


        static formatTimeForSecond(leftSec, withoutSeconds = false) {
          let timeStr = '';
          let sec = leftSec % 60;
          let leftMin = Math.floor(leftSec / 60);
          leftMin = leftMin < 0 ? 0 : leftMin;
          let hour = Math.floor(leftMin / 60);
          let min = leftMin % 60;

          if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
          } else {
            timeStr += '00:';
          }

          timeStr += min > 9 ? min.toString() : '0' + min;

          if (!withoutSeconds) {
            timeStr += ':';
            timeStr += sec > 9 ? sec.toString() : '0' + sec;
          }

          return timeStr;
        }
        /**
         *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
         *
         * @param {Number} ms
         */


        static formatTimeForMillisecond(ms) {
          let second = Math.floor(ms / 1000 % 60);
          let minute = Math.floor(ms / 1000 / 60 % 60);
          let hour = Math.floor(ms / 1000 / 60 / 60);
          return {
            'hour': hour,
            'minute': minute,
            'second': second
          };
        }
        /**
         * 将数组内容进行随机排列
         * @param {Array}arr 需要被随机的数组 
         * @returns 
         */


        static rand(arr) {
          let arrClone = this.clone(arr); // 首先从最大的数开始遍历，之后递减

          for (let i = arrClone.length - 1; i >= 0; i--) {
            // 随机索引值randomIndex是从0-arrClone.length中随机抽取的
            const randomIndex = Math.floor(Math.random() * (i + 1)); // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置

            const itemIndex = arrClone[randomIndex];
            arrClone[randomIndex] = arrClone[i];
            arrClone[i] = itemIndex;
          } // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）


          return arrClone;
        }
        /**
         * 获得开始和结束两者之间相隔分钟数
         *
         * @static
         * @param {number} start
         * @param {number} end
         * @memberof Util
         */


        static getOffsetMimutes(start, end) {
          let offSetTime = end - start;
          let minute = Math.floor(offSetTime % (1000 * 60 * 60) / (1000 * 60));
          return minute;
        }
        /**
         * 返回指定小数位的数值
         * @param {number} num 
         * @param {number} idx 
         */


        static formatNumToFixed(num, idx = 0) {
          return Number(num.toFixed(idx));
        }
        /**
         * 用于数值到达另外一个目标数值之间进行平滑过渡运动效果
         * @param {number} targetValue 目标数值 
         * @param {number} curValue 当前数值
         * @param {number} ratio    过渡比率
         * @returns 
         */


        static lerp(targetValue, curValue, ratio = 0.25) {
          let v = curValue;

          if (targetValue > curValue) {
            v = curValue + (targetValue - curValue) * ratio;
          } else if (targetValue < curValue) {
            v = curValue - (curValue - targetValue) * ratio;
          }

          return v;
        }
        /**
         * 数据解密
         * @param {String} str 
         */


        static decrypt(b64Data) {
          let n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          let decodeData = '';

          for (var idx = 0; idx < b64Data.length - n; idx += 2) {
            decodeData += b64Data[idx + 1];
            decodeData += b64Data[idx];
          }

          decodeData += b64Data.slice(b64Data.length - n + 1);
          decodeData = this._base64Decode(decodeData);
          return decodeData;
        }
        /**
        * 数据加密
        * @param {String} str 
        */


        static encrypt(str) {
          let b64Data = this._base64encode(str);

          let n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          let encodeData = '';

          for (let idx = 0; idx < (b64Data.length - n + 1) / 2; idx++) {
            encodeData += b64Data[2 * idx + 1];
            encodeData += b64Data[2 * idx];
          }

          encodeData += b64Data.slice(b64Data.length - n + 1);
          return encodeData;
        } //public method for encoding

        /**
         * base64加密
         * @param {string}input 
         * @returns 
         */


        static _base64encode(input) {
          let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          let output = "",
              chr1,
              chr2,
              chr3,
              enc1,
              enc2,
              enc3,
              enc4,
              i = 0;
          input = this._utf8Encode(input);

          while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
          }

          return output;
        }
        /**
         * utf-8 加密
         * @param string 
         * @returns 
         */


        static _utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          let utftext = "";

          for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);

            if (c < 128) {
              utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
              utftext += String.fromCharCode(c >> 6 | 192);
              utftext += String.fromCharCode(c & 63 | 128);
            } else {
              utftext += String.fromCharCode(c >> 12 | 224);
              utftext += String.fromCharCode(c >> 6 & 63 | 128);
              utftext += String.fromCharCode(c & 63 | 128);
            }
          }

          return utftext;
        }
        /**
         * utf-8解密
         * @param utftext 
         * @returns 
         */


        static _utf8Decode(utftext) {
          let string = "";
          let i = 0;
          let c = 0;
          let c2 = 0;
          let c3 = 0;

          while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
              string += String.fromCharCode(c);
              i++;
            } else if (c > 191 && c < 224) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode((c & 31) << 6 | c2 & 63);
              i += 2;
            } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
              i += 3;
            }
          }

          return string;
        }
        /**
         * base64解密
         * @param {string}input 解密字符串
         * @returns 
         */


        static _base64Decode(input) {
          let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          let output = "";
          let chr1;
          let chr2;
          let chr3;
          let enc1;
          let enc2;
          let enc3;
          let enc4;
          let i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
          }

          output = this._utf8Decode(output);
          return output;
        }
        /**
         * 洗牌函数
         *
         * @static
         * @param {*} arr
         * @returns
         * @memberof util
         */


        static shuffle(arr) {
          if (Array.isArray(arr)) {
            let newArr = arr.concat();
            newArr.sort(() => {
              return 0.5 - Math.random();
            });
            return newArr;
          }
        }
        /**
         * 两个数值数组取相同的值，返回一个新数组
         *
         * @static
         * @param {number[]} arr1
         * @param {number[]} arr2
         * @returns
         * @memberof util
         */


        static filterDifferentValue(arr1, arr2) {
          let arr = [];
          arr = arr1.filter(item => {
            return arr2.indexOf(item) !== -1;
          });
          return arr;
        }
        /**
         * 获取性能等级
         * -Android
         * 设备性能等级，取值为：
         * -2 或 0（该设备无法运行小游戏）
         * -1（性能未知）
         * >=1（设备性能值，该值越高，设备性能越好，目前最高不到50)
         * -IOS
         * 微信不支持IO性能等级
         * iPhone 5s 及以下
         * 设定为超低端机 benchmarkLevel = 5
         * iPhone 6 ～ iPhone SE
         * 设定为超低端机 benchmarkLevel = 15
         * iPhone 7 ~ iPhone X
         * 设定为中端机 benchmarkLevel = 25
         * iPhone XS 及以上
         * 设定为高端机 benchmarkLevel = 40
         * -H5或其他
         * -1（性能未知）
         */


        static getBenchmarkLevel() {
          //@ts-ignore
          if (window.wx) {
            //@ts-ignore
            const sys = window.wx.getSystemInfoSync();
            const isIOS = sys.system.indexOf('iOS') >= 0;

            if (isIOS) {
              const model = sys.model; // iPhone 5s 及以下

              const ultraLowPhoneType = ['iPhone1,1', 'iPhone1,2', 'iPhone2,1', 'iPhone3,1', 'iPhone3,3', 'iPhone4,1', 'iPhone5,1', 'iPhone5,2', 'iPhone5,3', 'iPhone5,4', 'iPhone6,1', 'iPhone6,2']; // iPhone 6 ~ iPhone SE

              const lowPhoneType = ['iPhone6,2', 'iPhone7,1', 'iPhone7,2', 'iPhone8,1', 'iPhone8,2', 'iPhone8,4']; // iPhone 7 ~ iPhone X

              const middlePhoneType = ['iPhone9,1', 'iPhone9,2', 'iPhone9,3', 'iPhone9,4', 'iPhone10,1', 'iPhone10,2', 'iPhone10,3', 'iPhone10,4', 'iPhone10,5', 'iPhone10,6']; // iPhone XS 及以上

              const highPhoneType = ['iPhone11,2', 'iPhone11,4', 'iPhone11,6', 'iPhone11,8', 'iPhone12,1', 'iPhone12,3', 'iPhone12,5', 'iPhone12,8', "iPhone 13", "iPhone 14", "iPhone 15"];

              for (let i = 0; i < ultraLowPhoneType.length; i++) {
                if (model.indexOf(ultraLowPhoneType[i]) >= 0) return 5;
              }

              for (let i = 0; i < lowPhoneType.length; i++) {
                if (model.indexOf(lowPhoneType[i]) >= 0) return 10;
              }

              for (let i = 0; i < middlePhoneType.length; i++) {
                if (model.indexOf(middlePhoneType[i]) >= 0) return 20;
              }

              for (let i = 0; i < highPhoneType.length; i++) {
                if (model.indexOf(highPhoneType[i]) >= 0) return 30;
              }

              return -1;
            } else {
              return sys.benchmarkLevel;
            }
          } else {
            return 50;
          }
        }
        /**
         * 低端机判断
         */


        static checkIsLowPhone() {
          let checkBenchmark = 22; //判断低端机的性能等级

          return Util.getBenchmarkLevel() < checkBenchmark;
        }
        /**
         * 获取数组中随机一个元素
         * @param arr 
         * @returns 
         */


        static getRandomItemFromArray(arr) {
          return arr[Math.floor(Math.random() * arr.length)];
        }
        /**
         * 解析数据表带有#或者,连接的数据
         *
         * @static
         * @param {string} str
         * @param {string} [symbol="#"]
         * @return {*} 
         * @memberof util
         */


        static parseStringData(str, symbol = "#") {
          let arr = str.split(symbol);
          return arr.map(item => {
            return Number(item);
          });
        }
        /**
         * 返回精确到若干位数的数值
         *
         * @static
         * @param {number} v
         * @param {number} digit
         * @memberof util
         */


        static toFixed(v, digit = 2) {
          return Number(v.toFixed(digit));
        }
        /**
         * 获取两个节点的xz坐标的弧度
         *
         * @static
         * @param {Node} ndA
         * @param {Node} ndB
         * @param {boolean} [isLocal=false] 是否为本地坐标，反之为世界坐标
         * @return {*} 
         * @memberof util
         */


        static getTwoNodeXZRadius(ndA, ndB, isLocal = false) {
          const aX = isLocal ? ndA.position.x : ndA.worldPosition.x;
          const aZ = isLocal ? ndA.position.z : ndA.worldPosition.z;
          const bX = isLocal ? ndB.position.x : ndB.worldPosition.x;
          const bZ = isLocal ? ndB.position.z : ndB.worldPosition.z;
          let radius = this.getTwoPosXZRadius(aX, bX, aZ, bZ);
          return radius;
        }
        /**
         * 获取两个坐标zx分量的弧度
         *
         * @static
         * @param {number} aX
         * @param {number} aZ
         * @param {number} bX
         * @param {number} bZ
         * @returns
         * @memberof util
         */


        static getTwoPosXZRadius(aX, aZ, bX, bZ) {
          return Math.atan2(aX - bX, aZ - bZ);
        }
        /**
         * 获取两个节点坐标在xz轴的距离
         *
         * @static
         * @param {Node} ndA
         * @param {Node} ndB
         * @param {boolean} [isLocal=false] 是否为本地坐标，反之为世界坐标
         * @return {*} 
         * @memberof util
         */


        static getTwoNodeXZLength(ndA, ndB, isLocal = false) {
          const aX = isLocal ? ndA.position.x : ndA.worldPosition.x;
          const aZ = isLocal ? ndA.position.z : ndA.worldPosition.z;
          const bX = isLocal ? ndB.position.x : ndB.worldPosition.x;
          const bZ = isLocal ? ndB.position.z : ndB.worldPosition.z;
          return this.getTwoPosXZLength(aX, aZ, bX, bZ);
        }
        /**
         * 获取两个坐标在xz轴的距离
         * 
         * @static
         * @param {number} aX
         * @param {number} aZ
         * @param {number} bX
         * @param {number} bZ
         * @return {*} 
         * @memberof util
         */


        static getTwoPosXZLength(aX, aZ, bX, bZ) {
          const x = aX - bX;
          const z = aZ - bZ;
          return Math.sqrt(x * x + z * z);
        }
        /***
         * 返回随机方向
         */


        static getRandomDirector() {
          let v = Math.random();
          return v > 0.5 ? 1 : -1;
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/cocosAnalytics.min.js", ['./cjs-loader.mjs'], function (exports, module) {
  'use strict';

  var loader;
  return {
    setters: [function (module) {
      loader = module.default;
    }],
    execute: function () {
      exports('default', void 0);

      let _cjsExports;

      loader.define(module.meta.url, function (exports$1, _require, module, __filename, __dirname) {
        let require = loader.createRequireWithReqMap({}, _require);

        (function () {
          /*! For license information please see cocosAnalytics.min.js.LICENSE.txt */
          !function (t) {
            var e = {};

            function r(n) {
              if (e[n]) return e[n].exports;
              var i = e[n] = {
                i: n,
                l: !1,
                exports: {}
              };
              return t[n].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
            }

            r.m = t, r.c = e, r.d = function (t, e, n) {
              r.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: n
              });
            }, r.r = function (t) {
              "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
              }), Object.defineProperty(t, "__esModule", {
                value: !0
              });
            }, r.t = function (t, e) {
              if (1 & e && (t = r(t)), 8 & e) return t;
              if (4 & e && "object" == typeof t && t && t.__esModule) return t;
              var n = Object.create(null);
              if (r.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: t
              }), 2 & e && "string" != typeof t) for (var i in t) r.d(n, i, function (e) {
                return t[e];
              }.bind(null, i));
              return n;
            }, r.n = function (t) {
              var e = t && t.__esModule ? function () {
                return t.default;
              } : function () {
                return t;
              };
              return r.d(e, "a", e), e;
            }, r.o = function (t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }, r.p = "/assets/", r(r.s = 3);
          }([function (t, e) {
            var r;

            r = function () {
              return this;
            }();

            try {
              r = r || new Function("return this")();
            } catch (t) {
              "object" == typeof window && (r = window);
            }

            t.exports = r;
          }, function (t, e) {
            t.exports = function (t) {
              return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function () {
                  return t.l;
                }
              }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function () {
                  return t.i;
                }
              }), t.webpackPolyfill = 1), t;
            };
          }, function (t, e) {
            var r = {
              utf8: {
                stringToBytes: function (t) {
                  return r.bin.stringToBytes(unescape(encodeURIComponent(t)));
                },
                bytesToString: function (t) {
                  return decodeURIComponent(escape(r.bin.bytesToString(t)));
                }
              },
              bin: {
                stringToBytes: function (t) {
                  for (var e = [], r = 0; r < t.length; r++) e.push(255 & t.charCodeAt(r));

                  return e;
                },
                bytesToString: function (t) {
                  for (var e = [], r = 0; r < t.length; r++) e.push(String.fromCharCode(t[r]));

                  return e.join("");
                }
              }
            };
            t.exports = r;
          }, function (t, e, r) {
            (function (t, n) {
              var i, o;
              !function (s, a, u) {
                var h = {
                  function: !0,
                  object: !0
                },
                    l = h[typeof window] && window || this,
                    c = h[typeof e] && e,
                    f = h[typeof t] && t && !t.nodeType && t,
                    p = c && f && "object" == typeof n && n;
                !p || p.global !== p && p.window !== p && p.self !== p || (l = p), void 0 === (o = "function" == typeof (i = u) ? i.call(e, r, e, t) : i) || (t.exports = o), l.cocosAnalytics = u();
              }(0, window, function () {
                return r(4);
              });
            }).call(this, r(1)(t), r(0));
          }, function (t, e, r) {
            var n = r(5),
                i = r(11),
                o = r(12),
                s = r(15),
                a = r(16),
                u = r(17),
                h = r(18),
                l = r(19),
                c = r(20),
                f = r(21),
                p = r(22),
                d = r(23),
                g = r(24),
                v = {
              data: {
                msgPlus: 0,
                isInit: !1,
                isShowLog: !1,
                msgPool: [],
                apiURL: "https://logstorage.cocos.com/log/v2",
                apiURLReserved: "http://logstorage.cocos.com/log/v2",
                versionCode: "v2"
              },
              version: "2.2.1",
              browserVersion: void 0,
              isActive: !0,
              init: function (t) {
                this.CAAccount = new a(this), this.CAEvent = new u(this), this.CAPayment = new h(this), this.CALevels = new l(this), this.CATask = new c(this), this.CAItem = new f(this), this.CAVirtual = new p(this), this.CATaskType = new d(this), this.CACustomEvent = new s(this), this.CAAdvertising = new g(this), i.manufacturer = i.manufacturer || "", this.data.appVersion = t.version, this.data.appBuild = t.build, this.data.engine = t.engine || "", this.data.resolution = this._getScreenResolution(), this.data.uniqueID = this._getUniqueID(), this.data.CCID = this._getCCID(), this.data.age = 0, this.data.sex = 0, this._runInterval(), this._bindPageVisibilityEvent(), this.data.isInit = !0, console.log("cocos analytics version :" + this.version);
                var e = this._getLocalStorage("_SDK_APPID_") || "",
                    r = this._getLocalStorage("_SDK_STORE_") || "",
                    n = this._getLocalStorage("_SDK_CALLNUMBER_") || "";

                if (e.length > 0 && e != t.appID || r.length > 0 && r != t.storeID || n.length > 0 && n != t.callNumber) {
                  var o = this._getLocalStorage("onlineDuration"),
                      v = this._getLocalStorage("_UID_" + e) || "";

                  v.length > 0 && parseInt(o) > 0 && (this.data.appID = e, this.data.userID = v, this.data.storeID = r, this.data.callNumber = n, this.CAAccount.logout());
                }

                return t.appID ? (this.data.appID = t.appID, t.storeID = t.storeID, t.storeID && 0 != t.storeID.replace(/\s/g, "").length ? (this.data.storeID = t.storeID, this.data.callNumber = t.callNumber || "", this.data.userID = "", this.data.channel = "", this._addLocalStorage("_SDK_STORE_", this.data.storeID), this._addLocalStorage("_SDK_APPID_", t.appID), this._addLocalStorage("_SDK_CALLNUMBER_", this.data.callNumber), void this._sendInitEvent()) : (console.log("storeID 不能为空!"), void (this.data.isInit = !1))) : (console.log("appID 不能为空!"), void (this.data.isInit = !1));
              },
              isInited: function () {
                return this.data.isInit;
              },
              onPause: function () {
                this.isActive = !1, this.data.end = (new Date().getTime() + "").substr(0, 10);
                var t = this.data.end - this.data.start;
                this.log("duration..." + t + "s");

                var e = this._generatePostData({
                  eventValue: {
                    action: "background",
                    start: this.data.start,
                    end: this.data.end
                  },
                  eventTag: "successed",
                  eventID: "view"
                });

                this._upload(e);
              },
              onResume: function () {
                (this.isActive = !0, this.data.start = (new Date().getTime() + "").substr(0, 10), this.data.end) && this.data.start - this.data.end > 3600 && this._sendInitEvent();
              },
              enableDebug: function (t) {
                this.data.isShowLog = t;
              },
              _sendInitEvent: function () {
                if (i.runtimeMask) {
                  var t = null;
                  t = setInterval(function () {
                    if (!i.runtimeMask) {
                      clearInterval(t);

                      var e = this._generatePostData({
                        eventTag: "successed",
                        eventID: "init"
                      });

                      this._upload(e);
                    }
                  }.bind(this), 10);
                } else {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: "init"
                  });

                  this._upload(e);
                }
              },
              _runInterval: function () {
                var t = this;
                this.isInited() || (setInterval(function () {
                  t.log("cocos analytics check and upload log...");

                  for (var e = t._getLocalStorage("_MSG_" + t.data.appID), r = JSON.parse(e || "[]") || t.data.msgPool; 0 !== r.length;) if (r.length <= 100) r.forEach(function (e) {
                    t._submit(e);
                  }), r = [], t.data.msgPool = r, t._addLocalStorage("_MSG_" + t.data.appID, t._toJson(t.data.msgPool));else {
                    var n = r.splice(0, 100);
                    t._submit(n), t.data.msgPool = r, t._addLocalStorage("_MSG_" + t.data.appID, t._toJson(t.data.msgPool));
                  }
                }, 3e4), setInterval(function () {
                  t.isActive && t.data.heartBeat && (t.data.onlineTime = parseInt(t.data.onlineTime || 0) + 1, t._addLocalStorage("onlineDuration", t.data.onlineTime));
                }, 1e3));
              },
              _bindPageVisibilityEvent: function () {
                var t = "hidden";
                t in document ? document.addEventListener("visibilitychange", r) : (t = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", r) : (t = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", r) : (t = "msHidden") in document ? document.addEventListener("msvisibilitychange", r) : "onfocusin" in document ? document.onfocusin = document.onfocusout = r : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = r;
                var e = this;

                function r() {
                  var t = document.visibilityState;
                  "visible" === t && e.onResume(), "hidden" === t && e.onPause();
                }

                void 0 !== document[t] && r();
              },
              _generatePostData: function (t) {
                var e = this._generateBasePostData();

                if (null == t) return e;

                for (var r in t) null != t[r] && e[r] !== t[r] && (e[r] = t[r]);

                return e;
              },
              _lastMsgID: function () {
                return this.data.saveMsgID || "";
              },
              _msgID: function () {
                return this.data.saveMsgID = o(this.data.CCID + (new Date().getTime() + this.data.msgPlus)), this.data.msgPlus = this.data.msgPlus + 1, this.data.saveMsgID;
              },
              _generateBasePostData: function () {
                var t = (new Date().getTime() + "").substr(0, 10),
                    e = {
                  appVersion: this.data.appVersion,
                  versionCode: this.data.versionCode,
                  uniqueID: this.data.uniqueID,
                  appID: this.data.appID,
                  channelID: this.data.channel,
                  platform: "H5",
                  engine: this.data.engine,
                  chargeTime: t,
                  userID: this.data.userID,
                  resolution: this.data.resolution,
                  osVersion: i.os.version,
                  language: this._getLanguage(),
                  manufacturer: i.manufacturer || "",
                  store: this.data.storeID,
                  age: this.data.age,
                  sex: this.data.sex,
                  callNumber: this.data.callNumber,
                  model: i.product
                };
                return e.lastMsgID = this._lastMsgID(), e.msgID = this._msgID(), e;
              },
              _toJson: function (t) {
                return JSON.stringify(t);
              },
              _fromJson: function (t) {
                return JSON.parse(t);
              },
              _upload: function (t) {
                this.data.isInit ? this._submit(t) : console.log("Please init first!");
              },
              log: function () {
                if (!0 === this.data.isShowLog) for (var t in arguments) console.log(arguments[t]);
              },
              _submit: function (t) {
                var e;
                e = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
                var r = this;
                e.onreadystatechange = function () {
                  if (4 == e.readyState) {
                    if (0 == e.status && r.data.apiURL != r.data.apiURLReserved) return r.data.apiURL = r.data.apiURLReserved, void r._msgPersist(t);
                    200 == e.status && r.log(r._toJson(t));
                  }
                }, e.onerror = function (e) {
                  r._msgPersist(t);
                };
                var i = n.encryptPostData(this._toJson(t));
                e.open("POST", this.data.apiURL, !0), e.setRequestHeader("Content-Type", "text/plain;charset=UTF-8"), e.send(i);
              },
              _msgPersist: function (t) {
                this.data.msgPool.push(t), this._addLocalStorage("_MSG_" + this.data.appID, this._toJson(this.data.msgPool));
              },
              _getUniqueID: function () {
                var t = "_SDK_UNIQUE_ID_",
                    e = this._getLocalStorage(t);

                return e || (e = n.random32Str(), this._addLocalStorage(t, e)), e;
              },
              _getCCID: function () {
                var t = n.x64hash128(),
                    e = this._getLocalStorage(t);

                return e || (e = n.random32Str(), this._addLocalStorage(t, e)), e;
              },
              extends: function (t) {
                t.data = this.data, t.log = this.log, t._toJson = this._toJson, t._upload = this._upload, t._submit = this._submit, t._msgPersist = this._msgPersist, t._generatePostData = this._generatePostData, t._generateBasePostData = this._generateBasePostData, t._addLocalStorage = this._addLocalStorage, t._delLocalStorage = this._delLocalStorage, t._getLocalStorage = this._getLocalStorage, t._getLanguage = this._getLanguage, t._setHeartBeat = this._setHeartBeat, t._lastMsgID = this._lastMsgID, t._msgID = this._msgID;
              },
              _addLocalStorage: function (t, e) {
                e = e.toString(), window.localStorage && ("sessionId" == t && window.sessionStorage ? sessionStorage.setItem("__CA_" + t, e) : window.wx && wx.setStorage ? wx.setStorage({
                  key: "__CA_" + t,
                  data: e
                }) : localStorage.setItem("__CA_" + t, e));
              },
              _delLocalStorage: function (t) {
                window.localStorage && ("sessionId" == t && window.sessionStorage ? sessionStorage.removeItem("__CA_" + t) : window.wx && wx.removeStorageSync ? wx.removeStorageSync("__CA_" + t) : localStorage.removeItem("__CA_" + t));
              },
              _getLocalStorage: function (t) {
                if (window.localStorage) return "sessionId" == t && window.sessionStorage ? sessionStorage.getItem("__CA_" + t) : window.wx && wx.getStorageSync ? wx.getStorageSync("__CA_" + t) : localStorage.getItem("__CA_" + t);
              },
              _getScreenResolution: function () {
                if (null != window.BK && null != window.BK.Director) {
                  var t = window.BK.Director.renderSize;
                  return t.width + "*" + t.height;
                }

                return null == window.screen.width ? window.screen.availWidth + "*" + window.screen.availHeight : window.screen.width + "*" + window.screen.height;
              },
              _getBrowserVersion: function () {
                if (!this.browserVersion) {
                  var t = window.navigator.userAgent.toLowerCase(),
                      e = /micromessenger|qqbrowser|sogou|qzone|liebao|ucbrowser|360 aphone|360browser|edge|baiduboxapp|bidubrowser|baidubrowser|maxthon|mxbrowser|trident|miuibrowser/i.exec(t);
                  e || (e = /chrome|safari|firefox|opr|oupeng|opera/i.exec(t));
                  var r = e ? e[0] : "unknown";
                  "micromessenger" === r ? r = "wechat" : "safari" === r && t.match(/android.*applewebkit/) ? r = "androidbrowser" : "trident" === r ? r = "ie" : "360 aphone" === r ? r = "360browser" : "mxbrowser" === r ? r = "maxthon" : "opr" === r ? r = "opera" : "bidubrowser" === r && (r = "baidubrowser");
                  var n = t.match(/(micromessenger|qq|mx|maxthon|edge|bidu|baidu|sogou)(mobile)?(browserType)?\/?([\d.]+)/i);
                  n || (n = t.match(/(msie |rv:|firefox|chrome|ucbrowser|oupeng|opera|opr|safari|miui)(mobile)?(browserType)?\/?([\d.]+)/i));
                  var i = n ? n[4] : "";
                  this.browserVersion = r, i && (this.browserVersion += "-" + i);
                }

                return this.browserVersion;
              },
              _getLanguage: function () {
                var t = window.navigator.language;
                return t = (t = t || window.navigator.browserLanguage) ? t.split("-")[0] : "en";
              },
              _setHeartBeat: function (t) {
                this.data.heartBeat = t || !1, this.data.onlineTime = this._getLocalStorage("onlineDuration") || 0;
              }
            };
            t.exports = v;
          }, function (t, e, r) {
            (function (e) {
              r(10);

              function n(t, e) {
                var r = 0,
                    n = t.length;
                if (!t) return 0;

                for (; e < n;) {
                  var i = e,
                      o = t.charCodeAt(e);

                  if ((r += o <= 127 ? 1 : o <= 2047 ? 2 : o <= 65535 ? 3 : o <= 2097151 ? 4 : o <= 67108863 ? 5 : 6) > 117) {
                    e = i;
                    break;
                  }

                  e++;
                }

                return e;
              }

              function i(t) {
                var e = new JSEncrypt();
                return e.setPublicKey("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC9LCzyypg24REurnyflGy2LdFj\nc63hBk/69r84TAJHlE7x92kUpZBF+7cRf0bFRIRA52OsKlF/ljzCjfOPBE9JfNIq\n+dwF/rSqns+eyQHPQFd5lY692loz9Mo1pNgElpHuJbfydju7F5KTnQYqviCWompm\nLKKdzAPcY1AVJfWd+QIDAQAB\n-----END PUBLIC KEY-----"), e.key.encrypt(t);
              }

              var o = {
                urlsafe_b64encode: t => t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),

                encryptPostData(t) {
                  for (var r = new e(0), o = 0, s = t.length; s - o > 0;) {
                    var a = o,
                        u = n(t, o),
                        h = "";

                    do {
                      h = i(t.substr(a, u - a));
                    } while (256 != h.length);

                    r += h, o = u;
                  }

                  var l = e.from(r, "hex").toString("base64");
                  return l = this.urlsafe_b64encode(l);
                },

                x64Add: function (t, e) {
                  t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];
                  var r = [0, 0, 0, 0];
                  return r[3] += t[3] + e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] + e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] + e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] + e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];
                },
                x64Multiply: function (t, e) {
                  t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1]], e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]];
                  var r = [0, 0, 0, 0];
                  return r[3] += t[3] * e[3], r[2] += r[3] >>> 16, r[3] &= 65535, r[2] += t[2] * e[3], r[1] += r[2] >>> 16, r[2] &= 65535, r[2] += t[3] * e[2], r[1] += r[2] >>> 16, r[2] &= 65535, r[1] += t[1] * e[3], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[2] * e[2], r[0] += r[1] >>> 16, r[1] &= 65535, r[1] += t[3] * e[1], r[0] += r[1] >>> 16, r[1] &= 65535, r[0] += t[0] * e[3] + t[1] * e[2] + t[2] * e[1] + t[3] * e[0], r[0] &= 65535, [r[0] << 16 | r[1], r[2] << 16 | r[3]];
                },
                x64Rotl: function (t, e) {
                  return 32 === (e %= 64) ? [t[1], t[0]] : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e | t[0] >>> 32 - e] : (e -= 32, [t[1] << e | t[0] >>> 32 - e, t[0] << e | t[1] >>> 32 - e]);
                },
                x64LeftShift: function (t, e) {
                  return 0 === (e %= 64) ? t : e < 32 ? [t[0] << e | t[1] >>> 32 - e, t[1] << e] : [t[1] << e - 32, 0];
                },
                x64Xor: function (t, e) {
                  return [t[0] ^ e[0], t[1] ^ e[1]];
                },
                x64Fmix: function (t) {
                  return t = this.x64Xor(t, [0, t[0] >>> 1]), t = this.x64Multiply(t, [4283543511, 3981806797]), t = this.x64Xor(t, [0, t[0] >>> 1]), t = this.x64Multiply(t, [3301882366, 444984403]), t = this.x64Xor(t, [0, t[0] >>> 1]);
                },
                x64hash128: function (t, e) {
                  e = e || 0;

                  for (var r = (t = t || "0").length % 16, n = t.length - r, i = [0, e], o = [0, e], s = [0, 0], a = [0, 0], u = [2277735313, 289559509], h = [1291169091, 658871167], l = 0; l < n; l += 16) s = [255 & t.charCodeAt(l + 4) | (255 & t.charCodeAt(l + 5)) << 8 | (255 & t.charCodeAt(l + 6)) << 16 | (255 & t.charCodeAt(l + 7)) << 24, 255 & t.charCodeAt(l) | (255 & t.charCodeAt(l + 1)) << 8 | (255 & t.charCodeAt(l + 2)) << 16 | (255 & t.charCodeAt(l + 3)) << 24], a = [255 & t.charCodeAt(l + 12) | (255 & t.charCodeAt(l + 13)) << 8 | (255 & t.charCodeAt(l + 14)) << 16 | (255 & t.charCodeAt(l + 15)) << 24, 255 & t.charCodeAt(l + 8) | (255 & t.charCodeAt(l + 9)) << 8 | (255 & t.charCodeAt(l + 10)) << 16 | (255 & t.charCodeAt(l + 11)) << 24], s = this.x64Multiply(s, u), s = this.x64Rotl(s, 31), s = this.x64Multiply(s, h), i = this.x64Xor(i, s), i = this.x64Rotl(i, 27), i = this.x64Add(i, o), i = this.x64Add(this.x64Multiply(i, [0, 5]), [0, 1390208809]), a = this.x64Multiply(a, h), a = this.x64Rotl(a, 33), a = this.x64Multiply(a, u), o = this.x64Xor(o, a), o = this.x64Rotl(o, 31), o = this.x64Add(o, i), o = this.x64Add(this.x64Multiply(o, [0, 5]), [0, 944331445]);

                  switch (s = [0, 0], a = [0, 0], r) {
                    case 15:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 14)], 48));

                    case 14:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 13)], 40));

                    case 13:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 12)], 32));

                    case 12:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 11)], 24));

                    case 11:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 10)], 16));

                    case 10:
                      a = this.x64Xor(a, this.x64LeftShift([0, t.charCodeAt(l + 9)], 8));

                    case 9:
                      a = this.x64Xor(a, [0, t.charCodeAt(l + 8)]), a = this.x64Multiply(a, h), a = this.x64Rotl(a, 33), a = this.x64Multiply(a, u), o = this.x64Xor(o, a);

                    case 8:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 7)], 56));

                    case 7:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 6)], 48));

                    case 6:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 5)], 40));

                    case 5:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 4)], 32));

                    case 4:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 3)], 24));

                    case 3:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 2)], 16));

                    case 2:
                      s = this.x64Xor(s, this.x64LeftShift([0, t.charCodeAt(l + 1)], 8));

                    case 1:
                      s = this.x64Xor(s, [0, t.charCodeAt(l)]), s = this.x64Multiply(s, u), s = this.x64Rotl(s, 31), s = this.x64Multiply(s, h), i = this.x64Xor(i, s);
                  }

                  return i = this.x64Xor(i, [0, t.length]), o = this.x64Xor(o, [0, t.length]), i = this.x64Add(i, o), o = this.x64Add(o, i), i = this.x64Fmix(i), o = this.x64Fmix(o), i = this.x64Add(i, o), o = this.x64Add(o, i), ("00000000" + (i[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (i[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(-8);
                },
                random32Str: function () {
                  var t,
                      e = Date.now().toString(32).toUpperCase();
                  return t = Date.now(), (e || "") + "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                    var r;
                    return r = (t + 16 * Math.random()) % 16 | 0, t = Math.floor(t / 16), "x" === e ? r.toString(16) : (7 & r | 8).toString(16);
                  }).replace(/-/g, "").toUpperCase();
                }
              };
              t.exports = o;
            }).call(this, r(6).Buffer);
          }, function (t, e, r) {
            (function (t) {
              var n = r(7),
                  i = r(8),
                  o = r(9);

              function s() {
                return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
              }

              function a(t, e) {
                if (s() < e) throw new RangeError("Invalid typed array length");
                return u.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = u.prototype : (null === t && (t = new u(e)), t.length = e), t;
              }

              function u(t, e, r) {
                if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t, e, r);

                if ("number" == typeof t) {
                  if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                  return c(this, t);
                }

                return h(this, t, e, r);
              }

              function h(t, e, r, n) {
                if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, r, n) {
                  if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
                  if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                  e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n);
                  u.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = u.prototype : t = f(t, e);
                  return t;
                }(t, e, r, n) : "string" == typeof e ? function (t, e, r) {
                  "string" == typeof r && "" !== r || (r = "utf8");
                  if (!u.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                  var n = 0 | d(e, r),
                      i = (t = a(t, n)).write(e, r);
                  i !== n && (t = t.slice(0, i));
                  return t;
                }(t, e, r) : function (t, e) {
                  if (u.isBuffer(e)) {
                    var r = 0 | p(e.length);
                    return 0 === (t = a(t, r)).length || e.copy(t, 0, 0, r), t;
                  }

                  if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (n = e.length) != n ? a(t, 0) : f(t, e);
                    if ("Buffer" === e.type && o(e.data)) return f(t, e.data);
                  }

                  var n;
                  throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                }(t, e);
              }

              function l(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative');
              }

              function c(t, e) {
                if (l(e), t = a(t, e < 0 ? 0 : 0 | p(e)), !u.TYPED_ARRAY_SUPPORT) for (var r = 0; r < e; ++r) t[r] = 0;
                return t;
              }

              function f(t, e) {
                var r = e.length < 0 ? 0 : 0 | p(e.length);
                t = a(t, r);

                for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];

                return t;
              }

              function p(t) {
                if (t >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
                return 0 | t;
              }

              function d(t, e) {
                if (u.isBuffer(t)) return t.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var r = t.length;
                if (0 === r) return 0;

                for (var n = !1;;) switch (e) {
                  case "ascii":
                  case "latin1":
                  case "binary":
                    return r;

                  case "utf8":
                  case "utf-8":
                  case void 0:
                    return F(t).length;

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return 2 * r;

                  case "hex":
                    return r >>> 1;

                  case "base64":
                    return j(t).length;

                  default:
                    if (n) return F(t).length;
                    e = ("" + e).toLowerCase(), n = !0;
                }
              }

              function g(t, e, r) {
                var n = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                if ((r >>>= 0) <= (e >>>= 0)) return "";

                for (t || (t = "utf8");;) switch (t) {
                  case "hex":
                    return P(this, e, r);

                  case "utf8":
                  case "utf-8":
                    return T(this, e, r);

                  case "ascii":
                    return A(this, e, r);

                  case "latin1":
                  case "binary":
                    return E(this, e, r);

                  case "base64":
                    return I(this, e, r);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return B(this, e, r);

                  default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), n = !0;
                }
              }

              function v(t, e, r) {
                var n = t[e];
                t[e] = t[r], t[r] = n;
              }

              function y(t, e, r, n, i) {
                if (0 === t.length) return -1;

                if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                  if (i) return -1;
                  r = t.length - 1;
                } else if (r < 0) {
                  if (!i) return -1;
                  r = 0;
                }

                if ("string" == typeof e && (e = u.from(e, n)), u.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, r, n, i);
                if ("number" == typeof e) return e &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : m(t, [e], r, n, i);
                throw new TypeError("val must be string, number or Buffer");
              }

              function m(t, e, r, n, i) {
                var o,
                    s = 1,
                    a = t.length,
                    u = e.length;

                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                  if (t.length < 2 || e.length < 2) return -1;
                  s = 2, a /= 2, u /= 2, r /= 2;
                }

                function h(t, e) {
                  return 1 === s ? t[e] : t.readUInt16BE(e * s);
                }

                if (i) {
                  var l = -1;

                  for (o = r; o < a; o++) if (h(t, o) === h(e, -1 === l ? 0 : o - l)) {
                    if (-1 === l && (l = o), o - l + 1 === u) return l * s;
                  } else -1 !== l && (o -= o - l), l = -1;
                } else for (r + u > a && (r = a - u), o = r; o >= 0; o--) {
                  for (var c = !0, f = 0; f < u; f++) if (h(t, o + f) !== h(e, f)) {
                    c = !1;
                    break;
                  }

                  if (c) return o;
                }

                return -1;
              }

              function b(t, e, r, n) {
                r = Number(r) || 0;
                var i = t.length - r;
                n ? (n = Number(n)) > i && (n = i) : n = i;
                var o = e.length;
                if (o % 2 != 0) throw new TypeError("Invalid hex string");
                n > o / 2 && (n = o / 2);

                for (var s = 0; s < n; ++s) {
                  var a = parseInt(e.substr(2 * s, 2), 16);
                  if (isNaN(a)) return s;
                  t[r + s] = a;
                }

                return s;
              }

              function w(t, e, r, n) {
                return X(F(e, t.length - r), t, r, n);
              }

              function x(t, e, r, n) {
                return X(function (t) {
                  for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));

                  return e;
                }(e), t, r, n);
              }

              function S(t, e, r, n) {
                return x(t, e, r, n);
              }

              function _(t, e, r, n) {
                return X(j(e), t, r, n);
              }

              function D(t, e, r, n) {
                return X(function (t, e) {
                  for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);

                  return o;
                }(e, t.length - r), t, r, n);
              }

              function I(t, e, r) {
                return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
              }

              function T(t, e, r) {
                r = Math.min(t.length, r);

                for (var n = [], i = e; i < r;) {
                  var o,
                      s,
                      a,
                      u,
                      h = t[i],
                      l = null,
                      c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                  if (i + c <= r) switch (c) {
                    case 1:
                      h < 128 && (l = h);
                      break;

                    case 2:
                      128 == (192 & (o = t[i + 1])) && (u = (31 & h) << 6 | 63 & o) > 127 && (l = u);
                      break;

                    case 3:
                      o = t[i + 1], s = t[i + 2], 128 == (192 & o) && 128 == (192 & s) && (u = (15 & h) << 12 | (63 & o) << 6 | 63 & s) > 2047 && (u < 55296 || u > 57343) && (l = u);
                      break;

                    case 4:
                      o = t[i + 1], s = t[i + 2], a = t[i + 3], 128 == (192 & o) && 128 == (192 & s) && 128 == (192 & a) && (u = (15 & h) << 18 | (63 & o) << 12 | (63 & s) << 6 | 63 & a) > 65535 && u < 1114112 && (l = u);
                  }
                  null === l ? (l = 65533, c = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), l = 56320 | 1023 & l), n.push(l), i += c;
                }

                return function (t) {
                  var e = t.length;
                  if (e <= 4096) return String.fromCharCode.apply(String, t);
                  var r = "",
                      n = 0;

                  for (; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += 4096));

                  return r;
                }(n);
              }

              e.Buffer = u, e.SlowBuffer = function (t) {
                +t != t && (t = 0);
                return u.alloc(+t);
              }, e.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
                try {
                  var t = new Uint8Array(1);
                  return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function () {
                      return 42;
                    }
                  }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
                } catch (t) {
                  return !1;
                }
              }(), e.kMaxLength = s(), u.poolSize = 8192, u._augment = function (t) {
                return t.__proto__ = u.prototype, t;
              }, u.from = function (t, e, r) {
                return h(null, t, e, r);
              }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
                value: null,
                configurable: !0
              })), u.alloc = function (t, e, r) {
                return function (t, e, r, n) {
                  return l(e), e <= 0 ? a(t, e) : void 0 !== r ? "string" == typeof n ? a(t, e).fill(r, n) : a(t, e).fill(r) : a(t, e);
                }(null, t, e, r);
              }, u.allocUnsafe = function (t) {
                return c(null, t);
              }, u.allocUnsafeSlow = function (t) {
                return c(null, t);
              }, u.isBuffer = function (t) {
                return !(null == t || !t._isBuffer);
              }, u.compare = function (t, e) {
                if (!u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;

                for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i) if (t[i] !== e[i]) {
                  r = t[i], n = e[i];
                  break;
                }

                return r < n ? -1 : n < r ? 1 : 0;
              }, u.isEncoding = function (t) {
                switch (String(t).toLowerCase()) {
                  case "hex":
                  case "utf8":
                  case "utf-8":
                  case "ascii":
                  case "latin1":
                  case "binary":
                  case "base64":
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return !0;

                  default:
                    return !1;
                }
              }, u.concat = function (t, e) {
                if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return u.alloc(0);
                var r;
                if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                var n = u.allocUnsafe(e),
                    i = 0;

                for (r = 0; r < t.length; ++r) {
                  var s = t[r];
                  if (!u.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                  s.copy(n, i), i += s.length;
                }

                return n;
              }, u.byteLength = d, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");

                for (var e = 0; e < t; e += 2) v(this, e, e + 1);

                return this;
              }, u.prototype.swap32 = function () {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");

                for (var e = 0; e < t; e += 4) v(this, e, e + 3), v(this, e + 1, e + 2);

                return this;
              }, u.prototype.swap64 = function () {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");

                for (var e = 0; e < t; e += 8) v(this, e, e + 7), v(this, e + 1, e + 6), v(this, e + 2, e + 5), v(this, e + 3, e + 4);

                return this;
              }, u.prototype.toString = function () {
                var t = 0 | this.length;
                return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : g.apply(this, arguments);
              }, u.prototype.equals = function (t) {
                if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === u.compare(this, t);
              }, u.prototype.inspect = function () {
                var t = "",
                    r = e.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">";
              }, u.prototype.compare = function (t, e, r, n, i) {
                if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                if (n >= i && e >= r) return 0;
                if (n >= i) return -1;
                if (e >= r) return 1;
                if (this === t) return 0;

                for (var o = (i >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (e >>>= 0), a = Math.min(o, s), h = this.slice(n, i), l = t.slice(e, r), c = 0; c < a; ++c) if (h[c] !== l[c]) {
                  o = h[c], s = l[c];
                  break;
                }

                return o < s ? -1 : s < o ? 1 : 0;
              }, u.prototype.includes = function (t, e, r) {
                return -1 !== this.indexOf(t, e, r);
              }, u.prototype.indexOf = function (t, e, r) {
                return y(this, t, e, r, !0);
              }, u.prototype.lastIndexOf = function (t, e, r) {
                return y(this, t, e, r, !1);
              }, u.prototype.write = function (t, e, r, n) {
                if (void 0 === e) n = "utf8", r = this.length, e = 0;else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;else {
                  if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                  e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
                }
                var i = this.length - e;
                if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");

                for (var o = !1;;) switch (n) {
                  case "hex":
                    return b(this, t, e, r);

                  case "utf8":
                  case "utf-8":
                    return w(this, t, e, r);

                  case "ascii":
                    return x(this, t, e, r);

                  case "latin1":
                  case "binary":
                    return S(this, t, e, r);

                  case "base64":
                    return _(this, t, e, r);

                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return D(this, t, e, r);

                  default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0;
                }
              }, u.prototype.toJSON = function () {
                return {
                  type: "Buffer",
                  data: Array.prototype.slice.call(this._arr || this, 0)
                };
              };

              function A(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);

                for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);

                return n;
              }

              function E(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);

                for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);

                return n;
              }

              function P(t, e, r) {
                var n = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);

                for (var i = "", o = e; o < r; ++o) i += V(t[o]);

                return i;
              }

              function B(t, e, r) {
                for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);

                return i;
              }

              function C(t, e, r) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > r) throw new RangeError("Trying to access beyond buffer length");
              }

              function R(t, e, r, n, i, o) {
                if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
                if (r + n > t.length) throw new RangeError("Index out of range");
              }

              function M(t, e, r, n) {
                e < 0 && (e = 65535 + e + 1);

                for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i) t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i);
              }

              function O(t, e, r, n) {
                e < 0 && (e = 4294967295 + e + 1);

                for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i) t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255;
              }

              function L(t, e, r, n, i, o) {
                if (r + n > t.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range");
              }

              function k(t, e, r, n, o) {
                return o || L(t, 0, r, 4), i.write(t, e, r, n, 23, 4), r + 4;
              }

              function N(t, e, r, n, o) {
                return o || L(t, 0, r, 8), i.write(t, e, r, n, 52, 8), r + 8;
              }

              u.prototype.slice = function (t, e) {
                var r,
                    n = this.length;
                if ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), e < t && (e = t), u.TYPED_ARRAY_SUPPORT) (r = this.subarray(t, e)).__proto__ = u.prototype;else {
                  var i = e - t;
                  r = new u(i, void 0);

                  for (var o = 0; o < i; ++o) r[o] = this[o + t];
                }
                return r;
              }, u.prototype.readUIntLE = function (t, e, r) {
                t |= 0, e |= 0, r || C(t, e, this.length);

                for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;

                return n;
              }, u.prototype.readUIntBE = function (t, e, r) {
                t |= 0, e |= 0, r || C(t, e, this.length);

                for (var n = this[t + --e], i = 1; e > 0 && (i *= 256);) n += this[t + --e] * i;

                return n;
              }, u.prototype.readUInt8 = function (t, e) {
                return e || C(t, 1, this.length), this[t];
              }, u.prototype.readUInt16LE = function (t, e) {
                return e || C(t, 2, this.length), this[t] | this[t + 1] << 8;
              }, u.prototype.readUInt16BE = function (t, e) {
                return e || C(t, 2, this.length), this[t] << 8 | this[t + 1];
              }, u.prototype.readUInt32LE = function (t, e) {
                return e || C(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
              }, u.prototype.readUInt32BE = function (t, e) {
                return e || C(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
              }, u.prototype.readIntLE = function (t, e, r) {
                t |= 0, e |= 0, r || C(t, e, this.length);

                for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;

                return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n;
              }, u.prototype.readIntBE = function (t, e, r) {
                t |= 0, e |= 0, r || C(t, e, this.length);

                for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;

                return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
              }, u.prototype.readInt8 = function (t, e) {
                return e || C(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
              }, u.prototype.readInt16LE = function (t, e) {
                e || C(t, 2, this.length);
                var r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r;
              }, u.prototype.readInt16BE = function (t, e) {
                e || C(t, 2, this.length);
                var r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r;
              }, u.prototype.readInt32LE = function (t, e) {
                return e || C(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
              }, u.prototype.readInt32BE = function (t, e) {
                return e || C(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
              }, u.prototype.readFloatLE = function (t, e) {
                return e || C(t, 4, this.length), i.read(this, t, !0, 23, 4);
              }, u.prototype.readFloatBE = function (t, e) {
                return e || C(t, 4, this.length), i.read(this, t, !1, 23, 4);
              }, u.prototype.readDoubleLE = function (t, e) {
                return e || C(t, 8, this.length), i.read(this, t, !0, 52, 8);
              }, u.prototype.readDoubleBE = function (t, e) {
                return e || C(t, 8, this.length), i.read(this, t, !1, 52, 8);
              }, u.prototype.writeUIntLE = function (t, e, r, n) {
                (t = +t, e |= 0, r |= 0, n) || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var i = 1,
                    o = 0;

                for (this[e] = 255 & t; ++o < r && (i *= 256);) this[e + o] = t / i & 255;

                return e + r;
              }, u.prototype.writeUIntBE = function (t, e, r, n) {
                (t = +t, e |= 0, r |= 0, n) || R(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
                var i = r - 1,
                    o = 1;

                for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;

                return e + r;
              }, u.prototype.writeUInt8 = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
              }, u.prototype.writeUInt16LE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : M(this, t, e, !0), e + 2;
              }, u.prototype.writeUInt16BE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : M(this, t, e, !1), e + 2;
              }, u.prototype.writeUInt32LE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : O(this, t, e, !0), e + 4;
              }, u.prototype.writeUInt32BE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4;
              }, u.prototype.writeIntLE = function (t, e, r, n) {
                if (t = +t, e |= 0, !n) {
                  var i = Math.pow(2, 8 * r - 1);
                  R(this, t, e, r, i - 1, -i);
                }

                var o = 0,
                    s = 1,
                    a = 0;

                for (this[e] = 255 & t; ++o < r && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;

                return e + r;
              }, u.prototype.writeIntBE = function (t, e, r, n) {
                if (t = +t, e |= 0, !n) {
                  var i = Math.pow(2, 8 * r - 1);
                  R(this, t, e, r, i - 1, -i);
                }

                var o = r - 1,
                    s = 1,
                    a = 0;

                for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;

                return e + r;
              }, u.prototype.writeInt8 = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
              }, u.prototype.writeInt16LE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : M(this, t, e, !0), e + 2;
              }, u.prototype.writeInt16BE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : M(this, t, e, !1), e + 2;
              }, u.prototype.writeInt32LE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : O(this, t, e, !0), e + 4;
              }, u.prototype.writeInt32BE = function (t, e, r) {
                return t = +t, e |= 0, r || R(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : O(this, t, e, !1), e + 4;
              }, u.prototype.writeFloatLE = function (t, e, r) {
                return k(this, t, e, !0, r);
              }, u.prototype.writeFloatBE = function (t, e, r) {
                return k(this, t, e, !1, r);
              }, u.prototype.writeDoubleLE = function (t, e, r) {
                return N(this, t, e, !0, r);
              }, u.prototype.writeDoubleBE = function (t, e, r) {
                return N(this, t, e, !1, r);
              }, u.prototype.copy = function (t, e, r, n) {
                if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
                var i,
                    o = n - r;
                if (this === t && r < e && e < n) for (i = o - 1; i >= 0; --i) t[i + e] = this[i + r];else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + e] = this[i + r];else Uint8Array.prototype.set.call(t, this.subarray(r, r + o), e);
                return o;
              }, u.prototype.fill = function (t, e, r, n) {
                if ("string" == typeof t) {
                  if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i);
                  }

                  if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                  if ("string" == typeof n && !u.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                } else "number" == typeof t && (t &= 255);

                if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                if (r <= e) return this;
                var o;
                if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < r; ++o) this[o] = t;else {
                  var s = u.isBuffer(t) ? t : F(new u(t, n).toString()),
                      a = s.length;

                  for (o = 0; o < r - e; ++o) this[o + e] = s[o % a];
                }
                return this;
              };
              var U = /[^+\/0-9A-Za-z-_]/g;

              function V(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16);
              }

              function F(t, e) {
                var r;
                e = e || 1 / 0;

                for (var n = t.length, i = null, o = [], s = 0; s < n; ++s) {
                  if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                      if (r > 56319) {
                        (e -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }

                      if (s + 1 === n) {
                        (e -= 3) > -1 && o.push(239, 191, 189);
                        continue;
                      }

                      i = r;
                      continue;
                    }

                    if (r < 56320) {
                      (e -= 3) > -1 && o.push(239, 191, 189), i = r;
                      continue;
                    }

                    r = 65536 + (i - 55296 << 10 | r - 56320);
                  } else i && (e -= 3) > -1 && o.push(239, 191, 189);

                  if (i = null, r < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(r);
                  } else if (r < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(r >> 6 | 192, 63 & r | 128);
                  } else if (r < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                  } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                  }
                }

                return o;
              }

              function j(t) {
                return n.toByteArray(function (t) {
                  if ((t = function (t) {
                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
                  }(t).replace(U, "")).length < 2) return "";

                  for (; t.length % 4 != 0;) t += "=";

                  return t;
                }(t));
              }

              function X(t, e, r, n) {
                for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];

                return i;
              }
            }).call(this, r(0));
          }, function (t, e, r) {
            e.byteLength = function (t) {
              var e = h(t),
                  r = e[0],
                  n = e[1];
              return 3 * (r + n) / 4 - n;
            }, e.toByteArray = function (t) {
              var e,
                  r,
                  n = h(t),
                  s = n[0],
                  a = n[1],
                  u = new o(function (t, e, r) {
                return 3 * (e + r) / 4 - r;
              }(0, s, a)),
                  l = 0,
                  c = a > 0 ? s - 4 : s;

              for (r = 0; r < c; r += 4) e = i[t.charCodeAt(r)] << 18 | i[t.charCodeAt(r + 1)] << 12 | i[t.charCodeAt(r + 2)] << 6 | i[t.charCodeAt(r + 3)], u[l++] = e >> 16 & 255, u[l++] = e >> 8 & 255, u[l++] = 255 & e;

              2 === a && (e = i[t.charCodeAt(r)] << 2 | i[t.charCodeAt(r + 1)] >> 4, u[l++] = 255 & e);
              1 === a && (e = i[t.charCodeAt(r)] << 10 | i[t.charCodeAt(r + 1)] << 4 | i[t.charCodeAt(r + 2)] >> 2, u[l++] = e >> 8 & 255, u[l++] = 255 & e);
              return u;
            }, e.fromByteArray = function (t) {
              for (var e, r = t.length, i = r % 3, o = [], s = 0, a = r - i; s < a; s += 16383) o.push(l(t, s, s + 16383 > a ? a : s + 16383));

              1 === i ? (e = t[r - 1], o.push(n[e >> 2] + n[e << 4 & 63] + "==")) : 2 === i && (e = (t[r - 2] << 8) + t[r - 1], o.push(n[e >> 10] + n[e >> 4 & 63] + n[e << 2 & 63] + "="));
              return o.join("");
            };

            for (var n = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = s.length; a < u; ++a) n[a] = s[a], i[s.charCodeAt(a)] = a;

            function h(t) {
              var e = t.length;
              if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
              var r = t.indexOf("=");
              return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4];
            }

            function l(t, e, r) {
              for (var i, o, s = [], a = e; a < r; a += 3) i = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[a + 2]), s.push(n[(o = i) >> 18 & 63] + n[o >> 12 & 63] + n[o >> 6 & 63] + n[63 & o]);

              return s.join("");
            }

            i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
          }, function (t, e) {
            e.read = function (t, e, r, n, i) {
              var o,
                  s,
                  a = 8 * i - n - 1,
                  u = (1 << a) - 1,
                  h = u >> 1,
                  l = -7,
                  c = r ? i - 1 : 0,
                  f = r ? -1 : 1,
                  p = t[e + c];

              for (c += f, o = p & (1 << -l) - 1, p >>= -l, l += a; l > 0; o = 256 * o + t[e + c], c += f, l -= 8);

              for (s = o & (1 << -l) - 1, o >>= -l, l += n; l > 0; s = 256 * s + t[e + c], c += f, l -= 8);

              if (0 === o) o = 1 - h;else {
                if (o === u) return s ? NaN : 1 / 0 * (p ? -1 : 1);
                s += Math.pow(2, n), o -= h;
              }
              return (p ? -1 : 1) * s * Math.pow(2, o - n);
            }, e.write = function (t, e, r, n, i, o) {
              var s,
                  a,
                  u,
                  h = 8 * o - i - 1,
                  l = (1 << h) - 1,
                  c = l >> 1,
                  f = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                  p = n ? 0 : o - 1,
                  d = n ? 1 : -1,
                  g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;

              for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = l) : (s = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), (e += s + c >= 1 ? f / u : f * Math.pow(2, 1 - c)) * u >= 2 && (s++, u /= 2), s + c >= l ? (a = 0, s = l) : s + c >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += c) : (a = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + p] = 255 & a, p += d, a /= 256, i -= 8);

              for (s = s << i | a, h += i; h > 0; t[r + p] = 255 & s, p += d, s /= 256, h -= 8);

              t[r + p - d] |= 128 * g;
            };
          }, function (t, e) {
            var r = {}.toString;

            t.exports = Array.isArray || function (t) {
              return "[object Array]" == r.call(t);
            };
          }, function (t, e, r) {
            !function (t) {
              function e(t) {
                return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(t);
              }

              function r(t, e) {
                return t & e;
              }

              function n(t, e) {
                return t | e;
              }

              function i(t, e) {
                return t ^ e;
              }

              function o(t, e) {
                return t & ~e;
              }

              function s(t) {
                if (0 == t) return -1;
                var e = 0;
                return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e;
              }

              function a(t) {
                for (var e = 0; 0 != t;) t &= t - 1, ++e;

                return e;
              }

              var u,
                  h,
                  l = function (t, e) {
                return (l = Object.setPrototypeOf || {
                  __proto__: []
                } instanceof Array && function (t, e) {
                  t.__proto__ = e;
                } || function (t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(t, e);
              },
                  c = {
                decode: function (t) {
                  var e;

                  if (void 0 === u) {
                    for (u = Object.create(null), e = 0; e < 64; ++e) u["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;

                    for (e = 0; e < "= \f\n\r\t \u2028\u2029".length; ++e) u["= \f\n\r\t \u2028\u2029".charAt(e)] = -1;
                  }

                  var r = [],
                      n = 0,
                      i = 0;

                  for (e = 0; e < t.length; ++e) {
                    var o = t.charAt(e);
                    if ("=" == o) break;

                    if (-1 != (o = u[o])) {
                      if (void 0 === o) throw new Error("Illegal character at offset " + e);
                      n |= o, ++i >= 4 ? (r[r.length] = n >> 16, r[r.length] = n >> 8 & 255, r[r.length] = 255 & n, n = 0, i = 0) : n <<= 6;
                    }
                  }

                  switch (i) {
                    case 1:
                      throw new Error("Base64 encoding incomplete: at least 2 bits missing");

                    case 2:
                      r[r.length] = n >> 10;
                      break;

                    case 3:
                      r[r.length] = n >> 16, r[r.length] = n >> 8 & 255;
                  }

                  return r;
                },
                re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
                unarmor: function (t) {
                  var e = c.re.exec(t);
                  if (e) if (e[1]) t = e[1];else {
                    if (!e[2]) throw new Error("RegExp out of sync");
                    t = e[2];
                  }
                  return c.decode(t);
                }
              },
                  f = function () {
                function t(e, r) {
                  this.hexDigits = "0123456789ABCDEF", e instanceof t ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = r);
                }

                return t.prototype.get = function (t) {
                  if (void 0 === t && (t = this.pos++), t >= this.enc.length) throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                  return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t];
                }, t.prototype.hexByte = function (t) {
                  return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t);
                }, t.prototype.hexDump = function (t, e, r) {
                  for (var n = "", i = t; i < e; ++i) if (n += this.hexByte(this.get(i)), !0 !== r) switch (15 & i) {
                    case 7:
                      n += "  ";
                      break;

                    case 15:
                      n += "\n";
                      break;

                    default:
                      n += " ";
                  }

                  return n;
                }, t;
              }(),
                  p = function () {
                function t(t, e, r, n, i) {
                  if (!(n instanceof d)) throw new Error("Invalid tag value.");
                  this.stream = t, this.header = e, this.length = r, this.tag = n, this.sub = i;
                }

                return t.prototype.toString = function () {
                  return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
                }, t.prototype.posStart = function () {
                  return this.stream.pos;
                }, t.prototype.posContent = function () {
                  return this.stream.pos + this.header;
                }, t.prototype.posEnd = function () {
                  return this.stream.pos + this.header + Math.abs(this.length);
                }, t.prototype.toHexString = function () {
                  return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
                }, t.decodeLength = function (t) {
                  var e = t.get(),
                      r = 127 & e;
                  if (r == e) return r;
                  if (r > 6) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                  if (0 === r) return null;
                  e = 0;

                  for (var n = 0; n < r; ++n) e = 256 * e + t.get();

                  return e;
                }, t.prototype.getHexStringValue = function () {
                  var t = this.toHexString(),
                      e = 2 * this.header,
                      r = 2 * this.length;
                  return t.substr(e, r);
                }, t.decode = function (e) {
                  var r;
                  r = e instanceof f ? e : new f(e, 0);

                  var n = new f(r),
                      i = new d(r),
                      o = t.decodeLength(r),
                      s = r.pos,
                      a = s - n.pos,
                      u = null,
                      h = function () {
                    var e = [];

                    if (null !== o) {
                      for (var n = s + o; r.pos < n;) e[e.length] = t.decode(r);

                      if (r.pos != n) throw new Error("Content size is not correct for container starting at offset " + s);
                    } else try {
                      for (;;) {
                        var i = t.decode(r);
                        if (i.tag.isEOC()) break;
                        e[e.length] = i;
                      }

                      o = s - r.pos;
                    } catch (t) {
                      throw new Error("Exception while decoding undefined length content: " + t);
                    }

                    return e;
                  };

                  if (i.tagConstructed) u = h();else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber)) try {
                    if (3 == i.tagNumber && 0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                    u = h();

                    for (var l = 0; l < u.length; ++l) if (u[l].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.");
                  } catch (t) {
                    u = null;
                  }

                  if (null === u) {
                    if (null === o) throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
                    r.pos = s + Math.abs(o);
                  }

                  return new t(n, a, o, i, u);
                }, t;
              }(),
                  d = function () {
                function t(t) {
                  var e = t.get();
                  this.tagClass = e >> 6, this.tagConstructed = 0 != (32 & e), this.tagNumber = 31 & e, 31 == this.tagNumber && null.error(0);
                }

                return t.prototype.isUniversal = function () {
                  return 0 === this.tagClass;
                }, t.prototype.isEOC = function () {
                  return 0 === this.tagClass && 0 === this.tagNumber;
                }, t;
              }(),
                  g = function () {
                function t(t, e, r) {
                  null != t && ("number" == typeof t ? this.fromNumber(t, e, r) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e));
                }

                return t.prototype.toString = function (t) {
                  if (this.s < 0) return "-" + this.negate().toString(t);
                  var r;
                  if (16 == t) r = 4;else if (8 == t) r = 3;else if (2 == t) r = 1;else if (32 == t) r = 5;else {
                    if (4 != t) return this.toRadix(t);
                    r = 2;
                  }
                  var n,
                      i = (1 << r) - 1,
                      o = !1,
                      s = "",
                      a = this.t,
                      u = this.DB - a * this.DB % r;
                  if (a-- > 0) for (u < this.DB && (n = this[a] >> u) > 0 && (o = !0, s = e(n)); a >= 0;) u < r ? (n = (this[a] & (1 << u) - 1) << r - u, n |= this[--a] >> (u += this.DB - r)) : (n = this[a] >> (u -= r) & i, u <= 0 && (u += this.DB, --a)), n > 0 && (o = !0), o && (s += e(n));
                  return o ? s : "0";
                }, t.prototype.negate = function () {
                  var e = b();
                  return t.ZERO.subTo(this, e), e;
                }, t.prototype.abs = function () {
                  return this.s < 0 ? this.negate() : this;
                }, t.prototype.compareTo = function (t) {
                  var e = this.s - t.s;
                  if (0 != e) return e;
                  var r = this.t;
                  if (0 != (e = r - t.t)) return this.s < 0 ? -e : e;

                  for (; --r >= 0;) if (0 != (e = this[r] - t[r])) return e;

                  return 0;
                }, t.prototype.bitLength = function () {
                  return this.t <= 0 ? 0 : this.DB * (this.t - 1) + T(this[this.t - 1] ^ this.s & this.DM);
                }, t.prototype.mod = function (e) {
                  var r = b();
                  return this.abs().divRemTo(e, null, r), this.s < 0 && r.compareTo(t.ZERO) > 0 && e.subTo(r, r), r;
                }, t.prototype.modPowInt = function (t, e) {
                  var r;
                  return r = t < 256 || e.isEven() ? new y(e) : new m(e), this.exp(t, r);
                }, t.prototype.clone = function () {
                  var t = b();
                  return this.copyTo(t), t;
                }, t.prototype.intValue = function () {
                  if (this.s < 0) {
                    if (1 == this.t) return this[0] - this.DV;
                    if (0 == this.t) return -1;
                  } else {
                    if (1 == this.t) return this[0];
                    if (0 == this.t) return 0;
                  }

                  return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
                }, t.prototype.byteValue = function () {
                  return 0 == this.t ? this.s : this[0] << 24 >> 24;
                }, t.prototype.shortValue = function () {
                  return 0 == this.t ? this.s : this[0] << 16 >> 16;
                }, t.prototype.signum = function () {
                  return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1;
                }, t.prototype.equals = function (t) {
                  return 0 == this.compareTo(t);
                }, t.prototype.min = function (t) {
                  return this.compareTo(t) < 0 ? this : t;
                }, t.prototype.max = function (t) {
                  return this.compareTo(t) > 0 ? this : t;
                }, t.prototype.and = function (t) {
                  var e = b();
                  return this.bitwiseTo(t, r, e), e;
                }, t.prototype.or = function (t) {
                  var e = b();
                  return this.bitwiseTo(t, n, e), e;
                }, t.prototype.xor = function (t) {
                  var e = b();
                  return this.bitwiseTo(t, i, e), e;
                }, t.prototype.andNot = function (t) {
                  var e = b();
                  return this.bitwiseTo(t, o, e), e;
                }, t.prototype.not = function () {
                  for (var t = b(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];

                  return t.t = this.t, t.s = ~this.s, t;
                }, t.prototype.shiftLeft = function (t) {
                  var e = b();
                  return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
                }, t.prototype.shiftRight = function (t) {
                  var e = b();
                  return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
                }, t.prototype.getLowestSetBit = function () {
                  for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + s(this[t]);

                  return this.s < 0 ? this.t * this.DB : -1;
                }, t.prototype.bitCount = function () {
                  for (var t = 0, e = this.s & this.DM, r = 0; r < this.t; ++r) t += a(this[r] ^ e);

                  return t;
                }, t.prototype.testBit = function (t) {
                  var e = Math.floor(t / this.DB);
                  return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB);
                }, t.prototype.setBit = function (t) {
                  return this.changeBit(t, n);
                }, t.prototype.clearBit = function (t) {
                  return this.changeBit(t, o);
                }, t.prototype.flipBit = function (t) {
                  return this.changeBit(t, i);
                }, t.prototype.add = function (t) {
                  var e = b();
                  return this.addTo(t, e), e;
                }, t.prototype.subtract = function (t) {
                  var e = b();
                  return this.subTo(t, e), e;
                }, t.prototype.multiply = function (t) {
                  var e = b();
                  return this.multiplyTo(t, e), e;
                }, t.prototype.divide = function (t) {
                  var e = b();
                  return this.divRemTo(t, e, null), e;
                }, t.prototype.remainder = function (t) {
                  var e = b();
                  return this.divRemTo(t, null, e), e;
                }, t.prototype.divideAndRemainder = function (t) {
                  var e = b(),
                      r = b();
                  return this.divRemTo(t, e, r), [e, r];
                }, t.prototype.pow = function (t) {
                  return this.exp(t, new v());
                }, t.prototype.copyTo = function (t) {
                  for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];

                  t.t = this.t, t.s = this.s;
                }, t.prototype.fromInt = function (t) {
                  this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0;
                }, t.prototype.fromString = function (e, r) {
                  var n;
                  if (16 == r) n = 4;else if (8 == r) n = 3;else if (256 == r) n = 8;else if (2 == r) n = 1;else if (32 == r) n = 5;else {
                    if (4 != r) return void this.fromRadix(e, r);
                    n = 2;
                  }
                  this.t = 0, this.s = 0;

                  for (var i = e.length, o = !1, s = 0; --i >= 0;) {
                    var a = 8 == n ? 255 & +e[i] : D(e, i);
                    a < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1, 0 == s ? this[this.t++] = a : s + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, (s += n) >= this.DB && (s -= this.DB));
                  }

                  8 == n && 0 != (128 & +e[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), o && t.ZERO.subTo(this, this);
                }, t.prototype.clamp = function () {
                  for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t;
                }, t.prototype.dlShiftTo = function (t, e) {
                  var r;

                  for (r = this.t - 1; r >= 0; --r) e[r + t] = this[r];

                  for (r = t - 1; r >= 0; --r) e[r] = 0;

                  e.t = this.t + t, e.s = this.s;
                }, t.prototype.drShiftTo = function (t, e) {
                  for (var r = t; r < this.t; ++r) e[r - t] = this[r];

                  e.t = Math.max(this.t - t, 0), e.s = this.s;
                }, t.prototype.lShiftTo = function (t, e) {
                  for (var r = t % this.DB, n = this.DB - r, i = (1 << n) - 1, o = Math.floor(t / this.DB), s = this.s << r & this.DM, a = this.t - 1; a >= 0; --a) e[a + o + 1] = this[a] >> n | s, s = (this[a] & i) << r;

                  for (a = o - 1; a >= 0; --a) e[a] = 0;

                  e[o] = s, e.t = this.t + o + 1, e.s = this.s, e.clamp();
                }, t.prototype.rShiftTo = function (t, e) {
                  e.s = this.s;
                  var r = Math.floor(t / this.DB);
                  if (r >= this.t) e.t = 0;else {
                    var n = t % this.DB,
                        i = this.DB - n,
                        o = (1 << n) - 1;
                    e[0] = this[r] >> n;

                    for (var s = r + 1; s < this.t; ++s) e[s - r - 1] |= (this[s] & o) << i, e[s - r] = this[s] >> n;

                    n > 0 && (e[this.t - r - 1] |= (this.s & o) << i), e.t = this.t - r, e.clamp();
                  }
                }, t.prototype.subTo = function (t, e) {
                  for (var r = 0, n = 0, i = Math.min(t.t, this.t); r < i;) n += this[r] - t[r], e[r++] = n & this.DM, n >>= this.DB;

                  if (t.t < this.t) {
                    for (n -= t.s; r < this.t;) n += this[r], e[r++] = n & this.DM, n >>= this.DB;

                    n += this.s;
                  } else {
                    for (n += this.s; r < t.t;) n -= t[r], e[r++] = n & this.DM, n >>= this.DB;

                    n -= t.s;
                  }

                  e.s = n < 0 ? -1 : 0, n < -1 ? e[r++] = this.DV + n : n > 0 && (e[r++] = n), e.t = r, e.clamp();
                }, t.prototype.multiplyTo = function (e, r) {
                  var n = this.abs(),
                      i = e.abs(),
                      o = n.t;

                  for (r.t = o + i.t; --o >= 0;) r[o] = 0;

                  for (o = 0; o < i.t; ++o) r[o + n.t] = n.am(0, i[o], r, o, 0, n.t);

                  r.s = 0, r.clamp(), this.s != e.s && t.ZERO.subTo(r, r);
                }, t.prototype.squareTo = function (t) {
                  for (var e = this.abs(), r = t.t = 2 * e.t; --r >= 0;) t[r] = 0;

                  for (r = 0; r < e.t - 1; ++r) {
                    var n = e.am(r, e[r], t, 2 * r, 0, 1);
                    (t[r + e.t] += e.am(r + 1, 2 * e[r], t, 2 * r + 1, n, e.t - r - 1)) >= e.DV && (t[r + e.t] -= e.DV, t[r + e.t + 1] = 1);
                  }

                  t.t > 0 && (t[t.t - 1] += e.am(r, e[r], t, 2 * r, 0, 1)), t.s = 0, t.clamp();
                }, t.prototype.divRemTo = function (e, r, n) {
                  var i = e.abs();

                  if (!(i.t <= 0)) {
                    var o = this.abs();
                    if (o.t < i.t) return null != r && r.fromInt(0), void (null != n && this.copyTo(n));
                    null == n && (n = b());
                    var s = b(),
                        a = this.s,
                        u = e.s,
                        h = this.DB - T(i[i.t - 1]);
                    h > 0 ? (i.lShiftTo(h, s), o.lShiftTo(h, n)) : (i.copyTo(s), o.copyTo(n));
                    var l = s.t,
                        c = s[l - 1];

                    if (0 != c) {
                      var f = c * (1 << this.F1) + (l > 1 ? s[l - 2] >> this.F2 : 0),
                          p = this.FV / f,
                          d = (1 << this.F1) / f,
                          g = 1 << this.F2,
                          v = n.t,
                          y = v - l,
                          m = null == r ? b() : r;

                      for (s.dlShiftTo(y, m), n.compareTo(m) >= 0 && (n[n.t++] = 1, n.subTo(m, n)), t.ONE.dlShiftTo(l, m), m.subTo(s, s); s.t < l;) s[s.t++] = 0;

                      for (; --y >= 0;) {
                        var w = n[--v] == c ? this.DM : Math.floor(n[v] * p + (n[v - 1] + g) * d);
                        if ((n[v] += s.am(0, w, n, y, 0, l)) < w) for (s.dlShiftTo(y, m), n.subTo(m, n); n[v] < --w;) n.subTo(m, n);
                      }

                      null != r && (n.drShiftTo(l, r), a != u && t.ZERO.subTo(r, r)), n.t = l, n.clamp(), h > 0 && n.rShiftTo(h, n), a < 0 && t.ZERO.subTo(n, n);
                    }
                  }
                }, t.prototype.invDigit = function () {
                  if (this.t < 1) return 0;
                  var t = this[0];
                  if (0 == (1 & t)) return 0;
                  var e = 3 & t;
                  return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e;
                }, t.prototype.isEven = function () {
                  return 0 == (this.t > 0 ? 1 & this[0] : this.s);
                }, t.prototype.exp = function (e, r) {
                  if (e > 4294967295 || e < 1) return t.ONE;
                  var n = b(),
                      i = b(),
                      o = r.convert(this),
                      s = T(e) - 1;

                  for (o.copyTo(n); --s >= 0;) if (r.sqrTo(n, i), (e & 1 << s) > 0) r.mulTo(i, o, n);else {
                    var a = n;
                    n = i, i = a;
                  }

                  return r.revert(n);
                }, t;
              }(),
                  v = function () {
                function t() {}

                return t.prototype.convert = function (t) {
                  return t;
                }, t.prototype.revert = function (t) {
                  return t;
                }, t.prototype.mulTo = function (t, e, r) {
                  t.multiplyTo(e, r);
                }, t.prototype.sqrTo = function (t, e) {
                  t.squareTo(e);
                }, t;
              }(),
                  y = function () {
                function t(t) {
                  this.m = t;
                }

                return t.prototype.convert = function (t) {
                  return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
                }, t.prototype.revert = function (t) {
                  return t;
                }, t.prototype.reduce = function (t) {
                  t.divRemTo(this.m, null, t);
                }, t.prototype.mulTo = function (t, e, r) {
                  t.multiplyTo(e, r), this.reduce(r);
                }, t.prototype.sqrTo = function (t, e) {
                  t.squareTo(e), this.reduce(e);
                }, t;
              }(),
                  m = function () {
                function t(t) {
                  this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
                }

                return t.prototype.convert = function (t) {
                  var e = b();
                  return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(g.ZERO) > 0 && this.m.subTo(e, e), e;
                }, t.prototype.revert = function (t) {
                  var e = b();
                  return t.copyTo(e), this.reduce(e), e;
                }, t.prototype.reduce = function (t) {
                  for (; t.t <= this.mt2;) t[t.t++] = 0;

                  for (var e = 0; e < this.m.t; ++e) {
                    var r = 32767 & t[e],
                        n = r * this.mpl + ((r * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;

                    for (t[r = e + this.m.t] += this.m.am(0, n, t, e, 0, this.m.t); t[r] >= t.DV;) t[r] -= t.DV, t[++r]++;
                  }

                  t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
                }, t.prototype.mulTo = function (t, e, r) {
                  t.multiplyTo(e, r), this.reduce(r);
                }, t.prototype.sqrTo = function (t, e) {
                  t.squareTo(e), this.reduce(e);
                }, t;
              }();

              function b() {
                return new g(null);
              }

              function w(t, e) {
                return new g(t, e);
              }

              "Microsoft Internet Explorer" == window.navigator.appName ? (g.prototype.am = function (t, e, r, n, i, o) {
                for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
                  var u = 32767 & this[t],
                      h = this[t++] >> 15,
                      l = a * u + h * s;
                  i = ((u = s * u + ((32767 & l) << 15) + r[n] + (1073741823 & i)) >>> 30) + (l >>> 15) + a * h + (i >>> 30), r[n++] = 1073741823 & u;
                }

                return i;
              }, h = 30) : "Netscape" != window.navigator.appName ? (g.prototype.am = function (t, e, r, n, i, o) {
                for (; --o >= 0;) {
                  var s = e * this[t++] + r[n] + i;
                  i = Math.floor(s / 67108864), r[n++] = 67108863 & s;
                }

                return i;
              }, h = 26) : (g.prototype.am = function (t, e, r, n, i, o) {
                for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
                  var u = 16383 & this[t],
                      h = this[t++] >> 14,
                      l = a * u + h * s;
                  i = ((u = s * u + ((16383 & l) << 14) + r[n] + i) >> 28) + (l >> 14) + a * h, r[n++] = 268435455 & u;
                }

                return i;
              }, h = 28), g.prototype.DB = h, g.prototype.DM = (1 << h) - 1, g.prototype.DV = 1 << h, g.prototype.FV = Math.pow(2, 52), g.prototype.F1 = 52 - h, g.prototype.F2 = 2 * h - 52;
              var x,
                  S,
                  _ = [];

              for (x = "0".charCodeAt(0), S = 0; S <= 9; ++S) _[x++] = S;

              for (x = "a".charCodeAt(0), S = 10; S < 36; ++S) _[x++] = S;

              for (x = "A".charCodeAt(0), S = 10; S < 36; ++S) _[x++] = S;

              function D(t, e) {
                var r = _[t.charCodeAt(e)];

                return null == r ? -1 : r;
              }

              function I(t) {
                var e = b();
                return e.fromInt(t), e;
              }

              function T(t) {
                var e,
                    r = 1;
                return 0 != (e = t >>> 16) && (t = e, r += 16), 0 != (e = t >> 8) && (t = e, r += 8), 0 != (e = t >> 4) && (t = e, r += 4), 0 != (e = t >> 2) && (t = e, r += 2), 0 != (e = t >> 1) && (t = e, r += 1), r;
              }

              g.ZERO = I(0), g.ONE = I(1);

              var A,
                  E,
                  P = function () {
                function t() {
                  this.i = 0, this.j = 0, this.S = [];
                }

                return t.prototype.init = function (t) {
                  var e, r, n;

                  for (e = 0; e < 256; ++e) this.S[e] = e;

                  for (r = 0, e = 0; e < 256; ++e) r = r + this.S[e] + t[e % t.length] & 255, n = this.S[e], this.S[e] = this.S[r], this.S[r] = n;

                  this.i = 0, this.j = 0;
                }, t.prototype.next = function () {
                  var t;
                  return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
                }, t;
              }(),
                  B = null;

              if (null == B) {
                B = [], E = 0;
                var C = void 0;

                if (window.crypto && window.crypto.getRandomValues) {
                  var R = new Uint32Array(256);

                  for (window.crypto.getRandomValues(R), C = 0; C < R.length; ++C) B[E++] = 255 & R[C];
                }

                var M = function (t) {
                  if (this.count = this.count || 0, this.count >= 256 || E >= 256) window.removeEventListener ? window.removeEventListener("mousemove", M, !1) : window.detachEvent && window.detachEvent("onmousemove", M);else try {
                    var e = t.x + t.y;
                    B[E++] = 255 & e, this.count += 1;
                  } catch (t) {}
                };

                window.addEventListener ? window.addEventListener("mousemove", M, !1) : window.attachEvent && window.attachEvent("onmousemove", M);
              }

              function O() {
                if (null == A) {
                  for (A = new P(); E < 256;) {
                    var t = Math.floor(65536 * Math.random());
                    B[E++] = 255 & t;
                  }

                  for (A.init(B), E = 0; E < B.length; ++E) B[E] = 0;

                  E = 0;
                }

                return A.next();
              }

              var L = function () {
                function t() {}

                return t.prototype.nextBytes = function (t) {
                  for (var e = 0; e < t.length; ++e) t[e] = O();
                }, t;
              }(),
                  k = function (t) {
                function e(r) {
                  var n = t.call(this) || this;
                  return r && ("string" == typeof r ? n.parseKey(r) : (e.hasPrivateKeyProperty(r) || e.hasPublicKeyProperty(r)) && n.parsePropertiesFrom(r)), n;
                }

                return function (t, e) {
                  function r() {
                    this.constructor = t;
                  }

                  l(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r());
                }(e, t), e.prototype.parseKey = function (t) {
                  try {
                    var e = 0,
                        r = 0,
                        n = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? Hex.decode(t) : c.unarmor(t),
                        i = p.decode(n);

                    if (3 === i.sub.length && (i = i.sub[2].sub[0]), 9 === i.sub.length) {
                      e = i.sub[1].getHexStringValue(), this.n = w(e, 16), r = i.sub[2].getHexStringValue(), this.e = parseInt(r, 16);
                      var o = i.sub[3].getHexStringValue();
                      this.d = w(o, 16);
                      var s = i.sub[4].getHexStringValue();
                      this.p = w(s, 16);
                      var a = i.sub[5].getHexStringValue();
                      this.q = w(a, 16);
                      var u = i.sub[6].getHexStringValue();
                      this.dmp1 = w(u, 16);
                      var h = i.sub[7].getHexStringValue();
                      this.dmq1 = w(h, 16);
                      var l = i.sub[8].getHexStringValue();
                      this.coeff = w(l, 16);
                    } else {
                      if (2 !== i.sub.length) return !1;
                      var f = i.sub[1].sub[0];
                      e = f.sub[0].getHexStringValue(), this.n = w(e, 16), r = f.sub[1].getHexStringValue(), this.e = parseInt(r, 16);
                    }

                    return !0;
                  } catch (t) {
                    return !1;
                  }
                }, e;
              }(function () {
                function t() {
                  this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
                }

                return t.prototype.doPublic = function (t) {
                  return t.modPowInt(this.e, this.n);
                }, t.prototype.setPublic = function (t, e) {
                  null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = w(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key");
                }, t.prototype.encrypt = function (t) {
                  var e = function (t, e) {
                    if (e < t.length + 11) return console.error("Message too long for RSA"), null;

                    for (var r = [], n = t.length - 1; n >= 0 && e > 0;) {
                      var i = t.charCodeAt(n--);
                      i < 128 ? r[--e] = i : i > 127 && i < 2048 ? (r[--e] = 63 & i | 128, r[--e] = i >> 6 | 192) : (r[--e] = 63 & i | 128, r[--e] = i >> 6 & 63 | 128, r[--e] = i >> 12 | 224);
                    }

                    r[--e] = 0;

                    for (var o = new L(), s = []; e > 2;) {
                      for (s[0] = 0; 0 == s[0];) o.nextBytes(s);

                      r[--e] = s[0];
                    }

                    return r[--e] = 2, r[--e] = 0, new g(r);
                  }(t, this.n.bitLength() + 7 >> 3);

                  if (null == e) return null;
                  var r = this.doPublic(e);
                  if (null == r) return null;
                  var n = r.toString(16);
                  return 0 == (1 & n.length) ? n : "0" + n;
                }, t;
              }()),
                  N = function () {
                function t(t) {
                  t = t || {}, this.default_key_size = parseInt(t.default_key_size, 10) || 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null;
                }

                return t.prototype.setKey = function (t) {
                  this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new k(t);
                }, t.prototype.setPublicKey = function (t) {
                  this.setKey(t);
                }, t.version = "3.0.0-rc.1", t;
              }();

              window.JSEncrypt = N, t.JSEncrypt = N, t.default = N, Object.defineProperty(t, "__esModule", {
                value: !0
              });
            }(e);
          }, function (t, e, r) {
            (function (t, n) {
              var i;
              (function () {
                var o = {
                  function: !0,
                  object: !0
                },
                    s = o[typeof window] && window || this,
                    a = o[typeof e] && e,
                    u = o[typeof t] && t && !t.nodeType && t,
                    h = a && u && "object" == typeof n && n;
                !h || h.global !== h && h.window !== h && h.self !== h || (s = h);
                var l = Math.pow(2, 53) - 1,
                    c = /\bOpera/,
                    f = Object.prototype,
                    p = f.hasOwnProperty,
                    d = f.toString;

                function g(t) {
                  return (t = String(t)).charAt(0).toUpperCase() + t.slice(1);
                }

                function v(t) {
                  return t = x(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : g(t);
                }

                function y(t, e) {
                  for (var r in t) p.call(t, r) && e(t[r], r, t);
                }

                function m(t) {
                  return null == t ? g(t) : d.call(t).slice(8, -1);
                }

                function b(t) {
                  return String(t).replace(/([ -])(?!$)/g, "$1?");
                }

                function w(t, e) {
                  var r = null;
                  return function (t, e) {
                    var r = -1,
                        n = t ? t.length : 0;
                    if ("number" == typeof n && n > -1 && n <= l) for (; ++r < n;) e(t[r], r, t);else y(t, e);
                  }(t, function (n, i) {
                    r = e(r, n, i, t);
                  }), r;
                }

                function x(t) {
                  return String(t).replace(/^ +| +$/g, "");
                }

                var S = function t(e) {
                  var r = s,
                      n = e && "object" == typeof e && "String" != m(e);
                  n && (r = e, e = null);
                  var i = r.navigator || {},
                      o = i.userAgent || "";
                  e || (e = o);

                  var a,
                      u,
                      h,
                      l,
                      f,
                      p = n ? !!i.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(d.toString()),
                      g = n ? "Object" : "ScriptBridgingProxyObject",
                      S = n ? "Object" : "Environment",
                      _ = n && r.java ? "JavaPackage" : m(r.java),
                      D = n ? "Object" : "RuntimeObject",
                      I = /\bJava/.test(_) && r.java,
                      T = I && m(r.environment) == S,
                      A = I ? "a" : "α",
                      E = I ? "b" : "β",
                      P = r.document || {},
                      B = r.operamini || r.opera,
                      C = c.test(C = n && B ? B["[[Class]]"] : m(B)) ? C : B = null,
                      R = e,
                      M = [],
                      O = null,
                      L = e == o,
                      k = L && B && "function" == typeof B.version && B.version(),
                      N = w([{
                    label: "EdgeHTML",
                    pattern: "Edge"
                  }, "Trident", {
                    label: "WebKit",
                    pattern: "AppleWebKit"
                  }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function (t, r) {
                    return t || RegExp("\\b" + (r.pattern || b(r)) + "\\b", "i").exec(e) && (r.label || r);
                  }),
                      U = function (t) {
                    return w(t, function (t, r) {
                      return t || RegExp("\\b" + (r.pattern || b(r)) + "\\b", "i").exec(e) && (r.label || r);
                    });
                  }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                    label: "Microsoft Edge",
                    pattern: "Edge"
                  }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                  }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                  }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                  }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                  }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                  }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                  }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                  }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                  }, {
                    label: "IE",
                    pattern: "IEMobile"
                  }, {
                    label: "IE",
                    pattern: "MSIE"
                  }, "Safari"]),
                      V = Y([{
                    label: "BlackBerry",
                    pattern: "BB10"
                  }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                  }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                  }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                  }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                  }, {
                    label: "Galaxy S5",
                    pattern: "SM-G900"
                  }, {
                    label: "Galaxy S6",
                    pattern: "SM-G920"
                  }, {
                    label: "Galaxy S6 Edge",
                    pattern: "SM-G925"
                  }, {
                    label: "Galaxy S7",
                    pattern: "SM-G930"
                  }, {
                    label: "Galaxy S7 Edge",
                    pattern: "SM-G935"
                  }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                  }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                  }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                  }, "Xoom"]),
                      F = function (t) {
                    return w(t, function (t, r, n) {
                      return t || (r[V] || r[/^[a-z]+(?: +[a-z]+\b)*/i.exec(V)] || RegExp("\\b" + b(n) + "(?:\\b|\\w*\\d)", "i").exec(e)) && n;
                    });
                  }({
                    Apple: {
                      iPad: 1,
                      iPhone: 1,
                      iPod: 1
                    },
                    Archos: {},
                    Amazon: {
                      Kindle: 1,
                      "Kindle Fire": 1
                    },
                    Asus: {
                      Transformer: 1
                    },
                    "Barnes & Noble": {
                      Nook: 1
                    },
                    BlackBerry: {
                      PlayBook: 1
                    },
                    Google: {
                      "Google TV": 1,
                      Nexus: 1
                    },
                    HP: {
                      TouchPad: 1
                    },
                    HTC: {},
                    LG: {},
                    Microsoft: {
                      Xbox: 1,
                      "Xbox One": 1
                    },
                    Motorola: {
                      Xoom: 1
                    },
                    Nintendo: {
                      "Wii U": 1,
                      Wii: 1
                    },
                    Nokia: {
                      Lumia: 1
                    },
                    Samsung: {
                      "Galaxy S": 1,
                      "Galaxy S2": 1,
                      "Galaxy S3": 1,
                      "Galaxy S4": 1
                    },
                    Sony: {
                      PlayStation: 1,
                      "PlayStation Vita": 1
                    }
                  }),
                      j = function (t) {
                    return w(t, function (t, r) {
                      var n = r.pattern || b(r);
                      return !t && (t = RegExp("\\b" + n + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (t = function (t, e, r) {
                        var n = {
                          "10.0": "10",
                          6.4: "10 Technical Preview",
                          6.3: "8.1",
                          6.2: "8",
                          6.1: "Server 2008 R2 / 7",
                          "6.0": "Server 2008 / Vista",
                          5.2: "Server 2003 / XP 64-bit",
                          5.1: "XP",
                          5.01: "2000 SP1",
                          "5.0": "2000",
                          "4.0": "NT",
                          "4.90": "ME"
                        };
                        return e && r && /^Win/i.test(t) && !/^Windows Phone /i.test(t) && (n = n[/[\d.]+$/.exec(t)]) && (t = "Windows " + n), t = String(t), e && r && (t = t.replace(RegExp(e, "i"), r)), t = v(t.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0]);
                      }(t, n, r.label || r)), t;
                    });
                  }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                  }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);

                  if (window.BK) {
                    var X = BK.getSystemInfoSync();
                    -1 != (V = X.platform).indexOf("ios") ? (V = V.replace(/ios/, "iPhone"), e = " OS " + X.osVersion + ") ") : (V = V.replace(/ios/, "Android"), e = " Android " + X.osVersion + "; ", j = "Android " + X.osVersion), k = X.osVersion;
                  }

                  function Y(t) {
                    return w(t, function (t, r) {
                      var n = r.pattern || b(r);
                      return !t && (t = RegExp("\\b" + n + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + n + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + n + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((t = String(r.label && !RegExp(n, "i").test(r.label) ? r.label : t).split("/"))[1] && !/[\d.]+/.test(t[0]) && (t[0] += " " + t[1]), r = r.label || r, t = v(t[0].replace(RegExp(n, "i"), r).replace(RegExp("; *(?:" + r + "[_-])?", "i"), " ").replace(RegExp("(" + r + ")[-_.]?(\\w)", "i"), "$1 $2"))), t;
                    });
                  }

                  if (N && (N = [N]), F && !V && (V = Y([F])), (a = /\bGoogle TV\b/.exec(V)) && (V = a[0]), /\bSimulator\b/i.test(e) && (V = (V ? V + " " : "") + "Simulator"), "Opera Mini" == U && /\bOPiOS\b/.test(e) && M.push("running in Turbo/Uncompressed mode"), "IE" == U && /\blike iPhone OS\b/.test(e) ? (F = (a = t(e.replace(/like iPhone OS/, ""))).manufacturer, V = a.product) : /^iP/.test(V) ? (U || (U = "Safari"), j = "iOS" + ((a = / OS ([\d_]+)/i.exec(e)) || (a = / OS[^]+?([\d\.]+?) /i.exec(e)) ? " " + a[1].replace(/_/g, ".") : "")) : "Konqueror" != U || /buntu/i.test(j) ? F && "Google" != F && (/Chrome/.test(U) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(V)) || /\bAndroid\b/.test(j) && /^Chrome/.test(U) && /\bVersion\//i.test(e) ? (U = "Android Browser", j = /\bAndroid\b/.test(j) ? j : "Android") : "Silk" == U ? (/\bMobi/i.test(e) || (j = "Android", M.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && M.unshift("accelerated")) : "PaleMoon" == U && (a = /\bFirefox\/([\d.]+)\b/.exec(e)) ? M.push("identifying as Firefox " + a[1]) : "Firefox" == U && (a = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (j || (j = "Firefox OS"), V || (V = a[1])) : !U || (a = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(U)) ? (U && !V && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(a + "/") + 8)) && (U = null), (a = V || F || j) && (V || F || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(j)) && (U = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(j) ? j : a) + " Browser")) : "Electron" == U && (a = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && M.push("Chromium " + a) : j = "Kubuntu", k || (j && -1 != j.indexOf("Android") && (V = V || "Android", (a = / Android[^]+?([\d\.]+?)[\)|;]/i.exec(e)) && (j = "Android " + ((k = a[1].replace(/_/g, ".")) || ""))), k || (k = w(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", b(U), "(?:Firefox|Minefield|NetFront)"], function (t, r) {
                    return t || (RegExp(r + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null;
                  }))), (a = ("iCab" == N && parseFloat(k) > 3 ? "WebKit" : /\bOpera\b/.test(U) && (/\bOPR\b/.test(e) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(N) && "WebKit" || !N && /\bMSIE\b/i.test(e) && ("Mac OS" == j ? "Tasman" : "Trident") || "WebKit" == N && /\bPlayStation\b(?! Vita\b)/i.test(U) && "NetFront") && (N = [a]), "IE" == U && (a = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (U += " Mobile", j = "Windows Phone " + (/\+$/.test(a) ? a : a + ".x"), M.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (U = "IE Mobile", j = "Windows Phone 8.x", M.unshift("desktop mode"), k || (k = (/\brv:([\d.]+)/.exec(e) || 0)[1])) : "IE" != U && "Trident" == N && (a = /\brv:([\d.]+)/.exec(e)) && (U && M.push("identifying as " + U + (k ? " " + k : "")), U = "IE", k = a[1]), L) {
                    if (l = "global", f = null != (h = r) ? typeof h[l] : "number", /^(?:boolean|number|string|undefined)$/.test(f) || "object" == f && !h[l]) m(a = r.runtime) == g ? (U = "Adobe AIR", j = a.flash.system.Capabilities.os) : m(a = r.phantom) == D ? (U = "PhantomJS", k = (a = a.version || null) && a.major + "." + a.minor + "." + a.patch) : "number" == typeof P.documentMode && (a = /\bTrident\/(\d+)/i.exec(e)) ? (k = [k, P.documentMode], (a = +a[1] + 4) != k[1] && (M.push("IE " + k[1] + " mode"), N && (N[1] = ""), k[1] = a), k = "IE" == U ? String(k[1].toFixed(1)) : k[0]) : "number" == typeof P.documentMode && /^(?:Chrome|Firefox)\b/.test(U) && (M.push("masking as " + U + " " + k), U = "IE", k = "11.0", N = ["Trident"], j = "Windows");else if (I && (R = (a = I.lang.System).getProperty("os.arch"), j = j || a.getProperty("os.name") + " " + a.getProperty("os.version")), T) {
                      try {
                        k = r.require("ringo/engine").version.join("."), U = "RingoJS";
                      } catch (t) {
                        (a = r.system) && a.global.system == r.system && (U = "Narwhal", j || (j = a[0].os || null));
                      }

                      U || (U = "Rhino");
                    } else "object" == typeof r.process && !r.process.browser && (a = r.process) && ("object" == typeof a.versions && ("string" == typeof a.versions.electron ? (M.push("Node " + a.versions.node), U = "Electron", k = a.versions.electron) : "string" == typeof a.versions.nw && (M.push("Chromium " + k, "Node " + a.versions.node), U = "NW.js", k = a.versions.nw)), U || (U = "Node.js", R = a.arch, j = a.platform, k = (k = /[\d.]+/.exec(a.version)) ? k[0] : null));
                    j = j && v(j);
                  }

                  if (k && (a = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(k) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (L && i.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (O = /b/i.test(a) ? "beta" : "alpha", k = k.replace(RegExp(a + "\\+?$"), "") + ("beta" == O ? E : A) + (/\d+\+?/.exec(a) || "")), "Fennec" == U || "Firefox" == U && /\b(?:Android|Firefox OS)\b/.test(j)) U = "Firefox Mobile";else if ("Maxthon" == U && k) k = k.replace(/\.[\d.]+/, ".x");else if (/\bXbox\b/i.test(V)) "Xbox 360" == V && (j = null), "Xbox 360" == V && /\bIEMobile\b/.test(e) && M.unshift("mobile mode");else if (!/^(?:Chrome|IE|Opera)$/.test(U) && (!U || V || /Browser|Mobi/.test(U)) || "Windows CE" != j && !/Mobi/i.test(e)) {
                    if ("IE" == U && L) try {
                      null === r.external && M.unshift("platform preview");
                    } catch (t) {
                      M.unshift("embedded");
                    } else (/\bBlackBerry\b/.test(V) || /\bBB10\b/.test(e)) && (a = (RegExp(V.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || k) ? (j = ((a = [a, /BB10/.test(e)])[1] ? (V = null, F = "BlackBerry") : "Device Software") + " " + a[0], k = null) : this != y && "Wii" != V && (L && B || /Opera/.test(U) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == U && /\bOS X (?:\d+\.){2,}/.test(j) || "IE" == U && (j && !/^Win/.test(j) && k > 5.5 || /\bWindows XP\b/.test(j) && k > 8 || 8 == k && !/\bTrident\b/.test(e))) && !c.test(a = t.call(y, e.replace(c, "") + ";")) && a.name && (a = "ing as " + a.name + ((a = a.version) ? " " + a : ""), c.test(U) ? (/\bIE\b/.test(a) && "Mac OS" == j && (j = null), a = "identify" + a) : (a = "mask" + a, U = C ? v(C.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(a) && (j = null), L || (k = null)), N = ["Presto"], M.push(a));
                  } else U += " Mobile";
                  (a = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (a = [parseFloat(a.replace(/\.(\d)$/, ".0$1")), a], "Safari" == U && "+" == a[1].slice(-1) ? (U = "WebKit Nightly", O = "alpha", k = a[1].slice(0, -1)) : k != a[1] && k != (a[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (k = null), a[1] = (/\bChrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == a[0] && 537.36 == a[2] && parseFloat(a[1]) >= 28 && "WebKit" == N && (N = ["Blink"]), L && (p || a[1]) ? (N && (N[1] = "like Chrome"), a = a[1] || ((a = a[0]) < 530 ? 1 : a < 532 ? 2 : a < 532.05 ? 3 : a < 533 ? 4 : a < 534.03 ? 5 : a < 534.07 ? 6 : a < 534.1 ? 7 : a < 534.13 ? 8 : a < 534.16 ? 9 : a < 534.24 ? 10 : a < 534.3 ? 11 : a < 535.01 ? 12 : a < 535.02 ? "13+" : a < 535.07 ? 15 : a < 535.11 ? 16 : a < 535.19 ? 17 : a < 536.05 ? 18 : a < 536.1 ? 19 : a < 537.01 ? 20 : a < 537.11 ? "21+" : a < 537.13 ? 23 : a < 537.18 ? 24 : a < 537.24 ? 25 : a < 537.36 ? 26 : "Blink" != N ? "27" : "28")) : (N && (N[1] = "like Safari"), a = (a = a[0]) < 400 ? 1 : a < 500 ? 2 : a < 526 ? 3 : a < 533 ? 4 : a < 534 ? "4+" : a < 535 ? 5 : a < 537 ? 6 : a < 538 ? 7 : a < 601 ? 8 : "8"), N && (N[1] += " " + (a += "number" == typeof a ? ".x" : /[.+]/.test(a) ? "" : "+")), "Safari" == U && (!k || parseInt(k) > 45) && (k = a)), "Opera" == U && (a = /\bzbov|zvav$/.exec(j)) ? (U += " ", M.unshift("desktop mode"), "zvav" == a ? (U += "Mini", k = null) : U += "Mobile", j = j.replace(RegExp(" *" + a + "$"), "")) : "Safari" == U && /\bChrome\b/.exec(N && N[1]) && (M.unshift("desktop mode"), U = "Chrome Mobile", k = null, /\bOS X\b/.test(j) ? (F = "Apple", j = "iOS 4.3+") : j = null), k && 0 == k.indexOf(a = /[\d.]+$/.exec(j)) && e.indexOf("/" + a + "-") > -1 && (j = x(j.replace(a, ""))), N && !/\b(?:Avant|Nook)\b/.test(U) && (/Browser|Lunascape|Maxthon/.test(U) || "Safari" != U && /^iOS/.test(j) && /\bSafari\b/.test(N[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(U) && N[1]) && (a = N[N.length - 1]) && M.push(a), M.length && (M = ["(" + M.join("; ") + ")"]), F && V && V.indexOf(F) < 0 && M.push("on " + F), V && M.push((/^on /.test(M[M.length - 1]) ? "" : "on ") + V), j && (a = / ([\d.+]+)$/.exec(j), u = a && "/" == j.charAt(j.length - a[0].length - 1), j = {
                    architecture: 32,
                    family: a && !u ? j.replace(a[0], "") : j,
                    version: a ? a[1] : null,
                    toString: function () {
                      var t = this.version;
                      return this.family + (t && !u ? " " + t : "") + (64 == this.architecture ? " 64-bit" : "");
                    }
                  }), (a = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(R)) && !/\bi686\b/i.test(R) ? (j && (j.architecture = 64, j.family = j.family.replace(RegExp(" *" + a), "")), U && (/\bWOW64\b/i.test(e) || L && /\w(?:86|32)$/.test(i.cpuClass || i.platform) && !/\bWin64; x64\b/i.test(e)) && M.unshift("32-bit")) : j && /^OS X/.test(j.family) && "Chrome" == U && parseFloat(k) >= 39 && (j.architecture = 64), e || (e = null);
                  var K = {};
                  K.description = e, K.layout = N && N[0], K.manufacturer = F, K.name = U, K.prerelease = O, K.product = V, K.ua = e, K.version = U && k, K.os = j || {
                    architecture: null,
                    family: null,
                    version: null,
                    toString: function () {
                      return "null";
                    }
                  };
                  var W = window.my || window.hbs || window.qg || window.wx || window.tt || window.loadRuntime && window.loadRuntime();
                  return W && W.getSystemInfo && (K.runtimeMask = !0, K.product = "", K.manufacturer = "", K.os.version = "", W.getSystemInfo({
                    success: function (t) {
                      K.product = t.model, K.manufacturer = t.brand || "";
                      var e = /Android[^]+?([\d\.]+?)\s/i.exec(t.system + " ");
                      e && e.length > 1 ? K.os.version = e[1].replace(/_/g, ".") : K.os.version = t.system, K.runtimeMask = !1;
                    },
                    fail: function () {
                      K.runtimeMask = !1;
                    },
                    complete: function () {
                      K.runtimeMask = !1;
                    }
                  })), K.parse = t, K.toString = function () {
                    return this.description || "";
                  }, K.version && M.unshift(k), K.name && M.unshift(U), j && U && (j != String(j).split(" ")[0] || j != U.split(" ")[0] && !V) && M.push(V ? "(" + j + ")" : "on " + j), M.length && (K.description = M.join(" ")), K;
                }();

                s.platform = S, void 0 === (i = function () {
                  return S;
                }.call(e, r, e, t)) || (t.exports = i);
              }).call(this);
            }).call(this, r(1)(t), r(0));
          }, function (t, e, r) {
            var n, i, o, s, a;
            n = r(13), i = r(2).utf8, o = r(14), s = r(2).bin, (a = function (t, e) {
              t.constructor == String ? t = e && "binary" === e.encoding ? s.stringToBytes(t) : i.stringToBytes(t) : o(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());

              for (var r = n.bytesToWords(t), u = 8 * t.length, h = 1732584193, l = -271733879, c = -1732584194, f = 271733878, p = 0; p < r.length; p++) r[p] = 16711935 & (r[p] << 8 | r[p] >>> 24) | 4278255360 & (r[p] << 24 | r[p] >>> 8);

              r[u >>> 5] |= 128 << u % 32, r[14 + (u + 64 >>> 9 << 4)] = u;
              var d = a._ff,
                  g = a._gg,
                  v = a._hh,
                  y = a._ii;

              for (p = 0; p < r.length; p += 16) {
                var m = h,
                    b = l,
                    w = c,
                    x = f;
                h = d(h, l, c, f, r[p + 0], 7, -680876936), f = d(f, h, l, c, r[p + 1], 12, -389564586), c = d(c, f, h, l, r[p + 2], 17, 606105819), l = d(l, c, f, h, r[p + 3], 22, -1044525330), h = d(h, l, c, f, r[p + 4], 7, -176418897), f = d(f, h, l, c, r[p + 5], 12, 1200080426), c = d(c, f, h, l, r[p + 6], 17, -1473231341), l = d(l, c, f, h, r[p + 7], 22, -45705983), h = d(h, l, c, f, r[p + 8], 7, 1770035416), f = d(f, h, l, c, r[p + 9], 12, -1958414417), c = d(c, f, h, l, r[p + 10], 17, -42063), l = d(l, c, f, h, r[p + 11], 22, -1990404162), h = d(h, l, c, f, r[p + 12], 7, 1804603682), f = d(f, h, l, c, r[p + 13], 12, -40341101), c = d(c, f, h, l, r[p + 14], 17, -1502002290), h = g(h, l = d(l, c, f, h, r[p + 15], 22, 1236535329), c, f, r[p + 1], 5, -165796510), f = g(f, h, l, c, r[p + 6], 9, -1069501632), c = g(c, f, h, l, r[p + 11], 14, 643717713), l = g(l, c, f, h, r[p + 0], 20, -373897302), h = g(h, l, c, f, r[p + 5], 5, -701558691), f = g(f, h, l, c, r[p + 10], 9, 38016083), c = g(c, f, h, l, r[p + 15], 14, -660478335), l = g(l, c, f, h, r[p + 4], 20, -405537848), h = g(h, l, c, f, r[p + 9], 5, 568446438), f = g(f, h, l, c, r[p + 14], 9, -1019803690), c = g(c, f, h, l, r[p + 3], 14, -187363961), l = g(l, c, f, h, r[p + 8], 20, 1163531501), h = g(h, l, c, f, r[p + 13], 5, -1444681467), f = g(f, h, l, c, r[p + 2], 9, -51403784), c = g(c, f, h, l, r[p + 7], 14, 1735328473), h = v(h, l = g(l, c, f, h, r[p + 12], 20, -1926607734), c, f, r[p + 5], 4, -378558), f = v(f, h, l, c, r[p + 8], 11, -2022574463), c = v(c, f, h, l, r[p + 11], 16, 1839030562), l = v(l, c, f, h, r[p + 14], 23, -35309556), h = v(h, l, c, f, r[p + 1], 4, -1530992060), f = v(f, h, l, c, r[p + 4], 11, 1272893353), c = v(c, f, h, l, r[p + 7], 16, -155497632), l = v(l, c, f, h, r[p + 10], 23, -1094730640), h = v(h, l, c, f, r[p + 13], 4, 681279174), f = v(f, h, l, c, r[p + 0], 11, -358537222), c = v(c, f, h, l, r[p + 3], 16, -722521979), l = v(l, c, f, h, r[p + 6], 23, 76029189), h = v(h, l, c, f, r[p + 9], 4, -640364487), f = v(f, h, l, c, r[p + 12], 11, -421815835), c = v(c, f, h, l, r[p + 15], 16, 530742520), h = y(h, l = v(l, c, f, h, r[p + 2], 23, -995338651), c, f, r[p + 0], 6, -198630844), f = y(f, h, l, c, r[p + 7], 10, 1126891415), c = y(c, f, h, l, r[p + 14], 15, -1416354905), l = y(l, c, f, h, r[p + 5], 21, -57434055), h = y(h, l, c, f, r[p + 12], 6, 1700485571), f = y(f, h, l, c, r[p + 3], 10, -1894986606), c = y(c, f, h, l, r[p + 10], 15, -1051523), l = y(l, c, f, h, r[p + 1], 21, -2054922799), h = y(h, l, c, f, r[p + 8], 6, 1873313359), f = y(f, h, l, c, r[p + 15], 10, -30611744), c = y(c, f, h, l, r[p + 6], 15, -1560198380), l = y(l, c, f, h, r[p + 13], 21, 1309151649), h = y(h, l, c, f, r[p + 4], 6, -145523070), f = y(f, h, l, c, r[p + 11], 10, -1120210379), c = y(c, f, h, l, r[p + 2], 15, 718787259), l = y(l, c, f, h, r[p + 9], 21, -343485551), h = h + m >>> 0, l = l + b >>> 0, c = c + w >>> 0, f = f + x >>> 0;
              }

              return n.endian([h, l, c, f]);
            })._ff = function (t, e, r, n, i, o, s) {
              var a = t + (e & r | ~e & n) + (i >>> 0) + s;
              return (a << o | a >>> 32 - o) + e;
            }, a._gg = function (t, e, r, n, i, o, s) {
              var a = t + (e & n | r & ~n) + (i >>> 0) + s;
              return (a << o | a >>> 32 - o) + e;
            }, a._hh = function (t, e, r, n, i, o, s) {
              var a = t + (e ^ r ^ n) + (i >>> 0) + s;
              return (a << o | a >>> 32 - o) + e;
            }, a._ii = function (t, e, r, n, i, o, s) {
              var a = t + (r ^ (e | ~n)) + (i >>> 0) + s;
              return (a << o | a >>> 32 - o) + e;
            }, a._blocksize = 16, a._digestsize = 16, t.exports = function (t, e) {
              if (null == t) throw new Error("Illegal argument " + t);
              var r = n.wordsToBytes(a(t, e));
              return e && e.asBytes ? r : e && e.asString ? s.bytesToString(r) : n.bytesToHex(r);
            };
          }, function (t, e) {
            var r, n;
            r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
              rotl: function (t, e) {
                return t << e | t >>> 32 - e;
              },
              rotr: function (t, e) {
                return t << 32 - e | t >>> e;
              },
              endian: function (t) {
                if (t.constructor == Number) return 16711935 & n.rotl(t, 8) | 4278255360 & n.rotl(t, 24);

                for (var e = 0; e < t.length; e++) t[e] = n.endian(t[e]);

                return t;
              },
              randomBytes: function (t) {
                for (var e = []; t > 0; t--) e.push(Math.floor(256 * Math.random()));

                return e;
              },
              bytesToWords: function (t) {
                for (var e = [], r = 0, n = 0; r < t.length; r++, n += 8) e[n >>> 5] |= t[r] << 24 - n % 32;

                return e;
              },
              wordsToBytes: function (t) {
                for (var e = [], r = 0; r < 32 * t.length; r += 8) e.push(t[r >>> 5] >>> 24 - r % 32 & 255);

                return e;
              },
              bytesToHex: function (t) {
                for (var e = [], r = 0; r < t.length; r++) e.push((t[r] >>> 4).toString(16)), e.push((15 & t[r]).toString(16));

                return e.join("");
              },
              hexToBytes: function (t) {
                for (var e = [], r = 0; r < t.length; r += 2) e.push(parseInt(t.substr(r, 2), 16));

                return e;
              },
              bytesToBase64: function (t) {
                for (var e = [], n = 0; n < t.length; n += 3) for (var i = t[n] << 16 | t[n + 1] << 8 | t[n + 2], o = 0; o < 4; o++) 8 * n + 6 * o <= 8 * t.length ? e.push(r.charAt(i >>> 6 * (3 - o) & 63)) : e.push("=");

                return e.join("");
              },
              base64ToBytes: function (t) {
                t = t.replace(/[^A-Z0-9+\/]/gi, "");

                for (var e = [], n = 0, i = 0; n < t.length; i = ++n % 4) 0 != i && e.push((r.indexOf(t.charAt(n - 1)) & Math.pow(2, -2 * i + 8) - 1) << 2 * i | r.indexOf(t.charAt(n)) >>> 6 - 2 * i);

                return e;
              }
            }, t.exports = n;
          }, function (t, e) {
            function r(t) {
              return !!t.constructor && "function" == typeof t.constructor.isBuffer && t.constructor.isBuffer(t);
            }

            t.exports = function (t) {
              return null != t && (r(t) || function (t) {
                return "function" == typeof t.readFloatLE && "function" == typeof t.slice && r(t.slice(0, 0));
              }(t) || !!t._isBuffer);
            };
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              onStarted: function (t, e) {
                if (e && t && 0 != t.replace(/\s/g, "").length) {
                  var r = this._generatePostData({
                    eventTag: "started",
                    eventID: t,
                    eventValue: e
                  });

                  this._upload(r);
                } else console.log("eventID 不能为空!");
              },
              onSuccess: function (t, e) {
                if (e && t && 0 != t.replace(/\s/g, "").length) {
                  var r = this._generatePostData({
                    eventTag: "successed",
                    eventID: t,
                    eventValue: e
                  });

                  this._upload(r);
                } else console.log("eventID 不能为空!");
              },
              onCancelled: function (t, e) {
                if (e && t && 0 != t.replace(/\s/g, "").length) {
                  var r = this._generatePostData({
                    eventTag: "cancelled",
                    eventID: t,
                    eventValue: e
                  });

                  this._upload(r);
                } else console.log("eventID 不能为空!");
              },
              onFailed: function (t, e, r) {
                if (e && t && 0 != t.replace(/\s/g, "").length) {
                  var n = this._generatePostData({
                    eventTag: "failed",
                    eventID: t,
                    eventFailDesc: r,
                    eventValue: e
                  });

                  this._upload(n);
                } else console.log("eventID 不能为空!");
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              loginStart: function (t) {
                this.data.channel = t && t.channel || "";

                var e = this._generatePostData({
                  eventTag: "started",
                  eventID: "login"
                });

                this._upload(e);
              },
              loginSuccess: function (t) {
                if (t && t.userID) {
                  this.data.age = t.age || 0, this.data.sex = t.sex || 0;

                  var e = t.channel || this.data.channel,
                      r = this._getLocalStorage("onlineDuration"),
                      n = this._getLocalStorage("_UID_" + this.data.appID) || "";

                  n.length > 0 && parseInt(r) > 0 && (this.data.userID = n, this.logout()), this.data.channel = e, this.data.userID = t.userID, this._addLocalStorage("_UID_" + this.data.appID, this.data.userID), this._addLocalStorage("__SDK_CHANNEL_", this.data.channel);

                  var i = this._generatePostData({
                    onlineDuration: 0,
                    eventTag: "successed",
                    eventID: "login"
                  });

                  this._upload(i), this._addLocalStorage("onlineDuration", 0), this._setHeartBeat(!0);
                } else console.log("userID 不能为空!");
              },
              loginFailed: function (t) {
                if (t) {
                  var e = t;
                  "string" != typeof t && (this.data.channel = t.channel, e = t.reason);

                  var r = this._generatePostData({
                    exitFailDesc: e || "",
                    eventTag: "failed",
                    eventID: "login"
                  });

                  this._upload(r);
                } else console.log("loginFailed 参数不能为空!");
              },
              logout: function () {
                this.data.channel = this._getLocalStorage("__SDK_CHANNEL_") || "";

                var t = this._getLocalStorage("onlineDuration") || 0,
                    e = this._generatePostData({
                  onlineDuration: t,
                  exitTag: "successed",
                  eventID: "logout"
                });

                this._upload(e), this.data.userID = "", this._setHeartBeat(!1), this._addLocalStorage("onlineDuration", 0), this._addLocalStorage("__SDK_CHANNEL_", ""), this._addLocalStorage("_UID_" + this.data.appID, "");
              },
              setAccountType: function (t) {
                var e = this._generatePostData({
                  eventTag: "successed",
                  eventID: "role",
                  eventValue: {
                    action: "update",
                    accountType: t
                  }
                });

                this._upload(e);
              },
              setAge: function (t) {
                t && (this.data.age = t);
              },
              setGender: function (t) {
                0 == t || 1 == t || 2 == t ? t && (this.data.aex = t) : console.log("gender 为 int 类型：0 未知、1 男性、 2 女性");
              },
              createRole: function (t) {
                var e = {
                  action: "createRole",
                  roleID: t.roleID,
                  userName: t.userName,
                  race: t.race,
                  class: t.class,
                  gameServer: t.gameServer
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "role",
                  eventValue: e
                });

                this._upload(r);
              },
              setLevel: function (t) {
                var e = this._generatePostData({
                  eventTag: "successed",
                  eventID: "role",
                  eventValue: {
                    action: "update",
                    level: t
                  }
                });

                this._upload(e);
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              onEvent: function (t) {
                if (t && t.eventName && 0 != t.eventName.replace(/\s/g, "").length) {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: t.eventName
                  });

                  this._upload(e);
                } else console.log("eventName 不能为空或者包含空格!");
              },
              onEventStart: function (t) {
                if (t && t.eventName && 0 != t.eventName.replace(/\s/g, "").length) {
                  var e = this._generatePostData({
                    eventTag: "started",
                    eventID: t.eventName
                  });

                  this._upload(e);
                } else console.log("eventName 不能为空或者包含空格!");
              },
              onEventEnd: function (t) {
                if (t && t.eventName && 0 != t.eventName.replace(/\s/g, "").length) {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: t.eventName
                  });

                  this._upload(e);
                } else console.log("eventName 不能为空或者包含空格!");
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              payBegin: function (t) {
                var e = this._generatePostData({
                  expendTag: "started",
                  eventID: "pay",
                  eventValue: {
                    orderID: t.orderID,
                    accountID: t.accountID,
                    partner: t.partner || "",
                    currencyAmount: t.amount,
                    currencyType: t.currencyType,
                    virtualCurrencyAmount: t.virtualCurrencyAmount || "0",
                    subjectID: t.iapID || "",
                    paymentType: t.payType || "",
                    gameServer: t.gameServer || "",
                    level: t.level || "",
                    mission: t.mission || ""
                  }
                });

                this._upload(e);
              },
              paySuccess: function (t) {
                var e = this._generatePostData({
                  expendTag: "successed",
                  eventID: "pay",
                  eventValue: {
                    orderID: t.orderID,
                    accountID: t.accountID,
                    partner: t.partner || "",
                    currencyAmount: t.amount,
                    currencyType: t.currencyType,
                    virtualCurrencyAmount: t.virtualCurrencyAmount || "0",
                    subjectID: t.iapID || "",
                    paymentType: t.payType || "",
                    gameServer: t.gameServer || "",
                    level: t.level || "",
                    mission: t.mission || ""
                  }
                });

                this._upload(e);
              },
              payFailed: function (t) {
                var e = this._generatePostData({
                  expendTag: "failed",
                  eventID: "pay",
                  expendFailDesc: t.reason || "",
                  eventValue: {
                    orderID: t.orderID,
                    accountID: t.accountID,
                    partner: t.partner || "",
                    currencyAmount: t.amount,
                    currencyType: t.currencyType,
                    virtualCurrencyAmount: t.virtualCurrencyAmount || "0",
                    subjectID: t.iapID || "",
                    paymentType: t.payType || "",
                    gameServer: t.gameServer || "",
                    level: t.level || "",
                    mission: t.mission || ""
                  }
                });

                this._upload(e);
              },
              payCanceled: function (t) {
                var e = this._generatePostData({
                  expendTag: "cancelled",
                  eventID: "pay",
                  eventValue: {
                    orderID: t.orderID,
                    accountID: t.accountID,
                    partner: t.partner || "",
                    currencyAmount: t.amount,
                    currencyType: t.currencyType,
                    virtualCurrencyAmount: t.virtualCurrencyAmount || "0",
                    subjectID: t.iapID || "",
                    paymentType: t.payType || "",
                    gameServer: t.gameServer || "",
                    level: t.level || "",
                    mission: t.mission || ""
                  }
                });

                this._upload(e);
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              begin: function (t) {
                if (t && t.level) {
                  var e = this._generatePostData({
                    eventTag: "started",
                    eventID: "barrier",
                    eventValue: {
                      level: t.level
                    }
                  });

                  this._upload(e);
                } else console.log("level 不能为空!");
              },
              complete: function (t) {
                if (t && t.level) {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: "barrier",
                    eventValue: {
                      level: t.level
                    }
                  });

                  this._upload(e);
                } else console.log("level 不能为空!");
              },
              failed: function (t, e) {
                if (t && t.level) {
                  var r = this._generatePostData({
                    eventTag: "failed",
                    eventID: "barrier",
                    eventFailDesc: t.reason || e,
                    eventValue: {
                      level: t.level
                    }
                  });

                  this._upload(r);
                } else console.log("level 不能为空!");
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              begin: function (t) {
                if (t && t.taskID) {
                  var e = this._generatePostData({
                    eventTag: "started",
                    eventID: "task",
                    eventValue: {
                      taskID: t.taskID,
                      taskType: t.type
                    }
                  });

                  this._upload(e);
                } else console.log("taskID 不能为空!");
              },
              complete: function (t) {
                if (t && t.taskID) {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: "task",
                    eventValue: {
                      taskID: t.taskID
                    }
                  });

                  this._upload(e);
                } else console.log("taskID 不能为空!");
              },
              failed: function (t) {
                if (t && t.taskID) {
                  var e = this._generatePostData({
                    eventTag: "failed",
                    eventID: "task",
                    eventFailDesc: t.reason || "",
                    eventValue: {
                      taskID: t.taskID
                    }
                  });

                  this._upload(e);
                } else console.log("taskID 不能为空!");
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              buy: function (t) {
                var e = {
                  action: "buy",
                  itemID: t.itemID,
                  itemType: t.itemType,
                  itemCount: t.itemCount,
                  virtualCoin: t.virtualCoin,
                  virtualType: t.virtualType,
                  consumePoint: t.consumePoint
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "item",
                  eventValue: e
                });

                this._upload(r);
              },
              get: function (t) {
                var e = {
                  action: "get",
                  itemID: t.itemID,
                  itemType: t.itemType,
                  itemCount: t.itemCount,
                  reason: t.reason
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "item",
                  eventValue: e
                });

                this._upload(r);
              },
              consume: function (t) {
                var e = {
                  action: "consume",
                  itemID: t.itemID,
                  itemType: t.itemType,
                  itemCount: t.itemCount,
                  reason: t.reason
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "item",
                  eventValue: e
                });

                this._upload(r);
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              setVirtualNum: function (t) {
                var e = {
                  action: "set",
                  type: t.type,
                  count: t.count
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "virtual",
                  eventValue: e
                });

                this._upload(r);
              },
              get: function (t) {
                var e = {
                  action: "get",
                  type: t.type,
                  count: t.count,
                  reason: t.reason
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "virtual",
                  eventValue: e
                });

                this._upload(r);
              },
              consume: function (t) {
                var e = {
                  action: "consume",
                  type: t.type,
                  count: t.count,
                  reason: t.reason
                },
                    r = this._generatePostData({
                  eventTag: "successed",
                  eventID: "virtual",
                  eventValue: e
                });

                this._upload(r);
              }
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {};

            n.prototype = {
              GuideLine: 1,
              MainLine: 2,
              BranchLine: 3,
              Daily: 4,
              Activity: 5,
              Other: 100
            }, t.exports = n;
          }, function (t, e, r) {
            var n = function (t) {
              t.extends(this);
            };

            n.prototype = {
              begin: function (t) {
                if (t && t.adID) {
                  var e = this._generatePostData({
                    eventTag: "started",
                    eventID: "advertising",
                    eventValue: {
                      ID: t.adID
                    }
                  });

                  this._upload(e);
                } else console.log("adID 不能为空!");
              },
              complete: function (t) {
                if (t && t.adID && t.timeLong && t.profit) {
                  var e = this._generatePostData({
                    eventTag: "successed",
                    eventID: "advertising",
                    eventValue: {
                      ID: t.adID,
                      timeLong: t.timeLong,
                      profit: t.profit
                    }
                  });

                  this._upload(e);
                } else console.log("adID 不能为空!");
              },
              failed: function (t) {
                if (t && t.adID) {
                  var e = this._generatePostData({
                    eventTag: "failed",
                    eventID: "advertising",
                    eventFailDesc: t.reason || "",
                    eventValue: {
                      ID: t.adID
                    }
                  });

                  this._upload(e);
                } else console.log("adID 不能为空!");
              }
            }, t.exports = n;
          }]);
        })();

        _cjsExports = exports('default', module.exports);
      });

      const __cjsMetaURL = exports('__cjsMetaURL', module.meta.url);
    }
  };
});

System.register("chunks:///_virtual/effectManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './warningCircle.ts', './reward.ts', './warningStrip.ts', './warningLine.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, find, Node, director, isValid, ParticleSystemComponent, AnimationComponent, AnimationClip, Vec3, PoolManager, ResourceUtil, WarningCircle, Reward, WarningStrip, WarningLine;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      find = module.find;
      Node = module.Node;
      director = module.director;
      isValid = module.isValid;
      ParticleSystemComponent = module.ParticleSystemComponent;
      AnimationComponent = module.AnimationComponent;
      AnimationClip = module.AnimationClip;
      Vec3 = module.Vec3;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      WarningCircle = module.WarningCircle;
    }, function (module) {
      Reward = module.Reward;
    }, function (module) {
      WarningStrip = module.WarningStrip;
    }, function (module) {
      WarningLine = module.WarningLine;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "554baRvdXVCaZZeXFSvvApe", "effectManager", undefined);
      /**
       * Predefined variables
       * Name = EffectManager
       * DateTime = Mon Dec 06 2021 16:13:38 GMT+0800 (中国标准时间)
       * Author = yveda
       * FileBasename = effectManager.ts
       * FileBasenameNoExtension = effectManager
       * URL = db://assets/script/framework/effectManager.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
       *
       */


      const {
        ccclass,
        property
      } = _decorator; //特效管理脚本

      let EffectManager = exports('EffectManager', (_dec = ccclass('EffectManager'), _dec(_class = (_temp = _class2 = class EffectManager {
        constructor() {
          _defineProperty(this, "_ndParent", null);
        }

        get ndParent() {
          if (!this._ndParent) {
            let ndEffectParent = find("effectManager");

            if (ndEffectParent) {
              this._ndParent = ndEffectParent;
            } else {
              var _director$getScene; // console.warn("请在场景里添加effectManager节点");


              this._ndParent = new Node("effectManager");
              (_director$getScene = director.getScene()) === null || _director$getScene === void 0 ? void 0 : _director$getScene.addChild(this._ndParent);
            }
          }

          return this._ndParent;
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new EffectManager();
          return this._instance;
        }
        /**
         * 重置特效节点状态
         * @param ndEffect 特效节点
         * @param aniName 动画名字
         * @returns 
         */


        resetEffectState(ndEffect, aniName) {
          if (!isValid(ndEffect)) {
            return;
          }

          let arrParticle = ndEffect.getComponentsInChildren(ParticleSystemComponent);

          if (arrParticle.length) {
            arrParticle.forEach(element => {
              element === null || element === void 0 ? void 0 : element.stop();
              element === null || element === void 0 ? void 0 : element.clear();
            });
          }

          let arrAni = ndEffect.getComponentsInChildren(AnimationComponent);

          if (arrAni.length) {
            arrAni.forEach((element, idx) => {
              if (element.defaultClip && element.defaultClip.name) {
                let aniState = null;

                if (aniName) {
                  aniState = element.getState(aniName);
                }

                if (!aniState) {
                  aniState = element.getState(element.defaultClip.name);
                }

                if (aniState) {
                  aniState.stop();
                  aniState.time = 0;
                  aniState.sample();
                }
              }
            });
          }
        }
        /**
         * 加载特效节点并播放节点下面的动画、粒子
         *
         * @param {boolean} [isLocal=true] 是否将特效节点设置在本地坐标或者世界坐标下
         * @param {Node} ndTarget 特效所在节点
         * @param {string} effectPath 特效路径
         * @param {number} [scale=1] 缩放大小
         * @param {(Vec3 | null)} pos 坐标
         * @param {(Vec3 | null)} eulerAngles 角度
         * @param {boolean} [isPlayAnimation=true] 是否播放动画
         * @param {boolean} [isPlayParticle=true] 是否播放特效
         * @param {number} [speed=1] 播放速度
         * @param {boolean} [isRecycle=false] 是否回收
         * @param {number} [recycleTime=0] 回收时间
         * @param {(Function | null)} callback 回调函数
         * @returns
         * @memberof EffectManager
         */


        loadAndPlayEffect(isLocal = true, ndTarget, effectPath, scale = 1, pos, eulerAngles, isPlayAnimation = true, isPlayParticle = true, speed = 1, isRecycle = false, recycleTime, callback) {
          //如果是本地坐标，父节点被回收的时候不播放
          if (isLocal && (!ndTarget || !ndTarget.parent)) {
            return;
          }

          ResourceUtil.loadEffectRes(effectPath).then(prefab => {
            let ndParent = isLocal ? ndTarget : this.ndParent;
            let ndEffect = PoolManager.instance.getNode(prefab, ndParent);

            if (isLocal) {
              ndEffect.setScale(scale, scale, scale);

              if (pos) {
                ndEffect.setPosition(pos);
              }

              if (eulerAngles) {
                ndEffect.eulerAngles = eulerAngles;
              }
            } else {
              ndEffect.setWorldScale(scale, scale, scale);

              if (pos) {
                ndEffect.setWorldPosition(pos);
              }

              if (eulerAngles) {
                ndEffect.setWorldRotationFromEuler(eulerAngles.x, eulerAngles.y, eulerAngles.z);
              }
            }

            this.playEffect(ndEffect, isPlayAnimation, isPlayParticle, speed, isRecycle, recycleTime, callback);
          });
        }
        /**
         * 播放节点下面的动画、粒子
         *
         * @param {Node} ndEffect 特效节点
         * @param {boolean} [isPlayAnimation=true] 是否播放动画
         * @param {boolean} [isPlayParticle=true] 是否播放特效
         * @param {number} [speed=1] 播放速度
         * @param {boolean} [isRecycle=false] 是否回收
         * @param {number} [recycleTime=0] 回收时间
         * @param {(Function | null)} callback 回调函数
         * @returns
         * @memberof EffectManager
         */


        playEffect(ndEffect, isPlayAnimation = true, isPlayParticle = true, speed = 1, isRecycle = false, recycleTime, callback) {
          //特效最长持续时间
          let maxDuration = 0;

          if (isPlayAnimation) {
            let duration = this.playAnimation(ndEffect, speed, null, false, false, null, null);
            maxDuration = duration > maxDuration ? duration : maxDuration;
          }

          if (isPlayParticle) {
            let duration = this.playParticle(ndEffect, speed, false, null, null);
            maxDuration = duration > maxDuration ? duration : maxDuration;
          }

          maxDuration = recycleTime && recycleTime > 0 ? recycleTime : maxDuration;

          if (callback || isRecycle) {
            setTimeout(() => {
              if (ndEffect.parent) {
                callback && callback();

                if (isRecycle) {
                  PoolManager.instance.putNode(ndEffect);
                } else {
                  ndEffect.destroy();
                }
              }
            }, maxDuration * 1000);
          }
        }
        /**
         * 播放节点上的默认动画特效
         *
         * @param {Node} ndEffect 特效节点
         * @param {number} [speed=1] 动画播放速度
         * @param {(string | null)} animationName 动画名称（当节点下只有一个动画组件，并指定播放动画的时候才会使用这个参数，否则都使用默认动画）
         * @param {boolean} [isLoop=false] 是否循环播放
         * @param {boolean} [isRecycle=false] 是否回收
         * @param {(number | null)} recycleTime 回收时间,如果为null则使用maxDuration
         * @param {(Function | null)} callback 回调函数
         * @returns
         * @memberof EffectManager
         */


        playAnimation(ndEffect, speed = 1, animationName, isLoop = false, isRecycle = false, recycleTime, callback) {
          //动画播放最长时间
          let maxDuration = 0;
          let aniState = null;

          if (!ndEffect.active) {
            ndEffect.active = true;
          }

          let arrAni = ndEffect.getComponentsInChildren(AnimationComponent);

          if (arrAni.length) {
            arrAni.forEach((element, idx) => {
              var _element$defaultClip;

              let aniName = animationName ? animationName : element === null || element === void 0 ? void 0 : (_element$defaultClip = element.defaultClip) === null || _element$defaultClip === void 0 ? void 0 : _element$defaultClip.name;

              if (aniName) {
                aniState = element.getState(aniName);

                if (aniState) {
                  aniState.time = 0;
                  aniState.speed = speed;
                  aniState.sample();
                  let duration = aniState.duration;
                  maxDuration = duration > maxDuration ? duration : maxDuration;

                  if (isLoop) {
                    aniState.wrapMode = AnimationClip.WrapMode.Loop;
                  } else {
                    aniState.wrapMode = AnimationClip.WrapMode.Normal;
                  }

                  element === null || element === void 0 ? void 0 : element.play(aniName);
                }
              }
            });
            maxDuration = recycleTime && recycleTime > 0 ? recycleTime : maxDuration;

            let cb = () => {
              if (ndEffect && ndEffect.parent) {
                callback && callback();

                if (isRecycle) {
                  PoolManager.instance.putNode(ndEffect);
                }
              }
            };

            if (callback || isRecycle) {
              if (arrAni.length === 1) {
                arrAni[0].once(AnimationComponent.EventType.FINISHED, () => {
                  cb();
                });
              } else {
                setTimeout(() => {
                  cb();
                }, maxDuration * 1000);
              }
            }

            return maxDuration;
          } else {
            console.warn(`###${ndEffect.name}节点下没有动画特效`);
            return 0;
          }
        }
        /**
         * 播放节点上的粒子特效
         *
         * @param {Node} ndEffect 特效节点
         * @param {number} [speed=1] 粒子播放速度
         * @param {boolean} [isRecycle=false] 是否需要回收特效节点
         * @param {(number | null)} [recycleTime] 回收时间, 如果为null则使用maxDuration
         * @param {(Function | null)} [callback] 回调函数
         * @returns 返回播放完成所需秒数
         * @memberof EffectManager
         */


        playParticle(ndEffect, speed = 1, isRecycle = false, recycleTime, callback) {
          //粒子播放最长时间
          let maxDuration = 0;

          if (!ndEffect.active) {
            ndEffect.active = true;
          }

          let arrParticle = ndEffect.getComponentsInChildren(ParticleSystemComponent);

          if (arrParticle.length) {
            arrParticle.forEach(element => {
              element.simulationSpeed = speed;
              element === null || element === void 0 ? void 0 : element.clear();
              element === null || element === void 0 ? void 0 : element.stop();
              element === null || element === void 0 ? void 0 : element.play();
              let duration = element.duration;
              maxDuration = duration > maxDuration ? duration : maxDuration;
            }); //使用传进来的回收时间，否则设置为时长最长

            maxDuration = recycleTime && recycleTime > 0 ? recycleTime : maxDuration;

            if (callback || isRecycle) {
              setTimeout(() => {
                if (ndEffect && ndEffect.parent) {
                  callback && callback();

                  if (isRecycle) {
                    PoolManager.instance.putNode(ndEffect);
                  }
                }
              }, maxDuration * 1000);
            }

            return maxDuration;
          } else {
            console.warn(`###${ndEffect.name}节点下没有粒子特效`);
            return 0;
          }
        }
        /**
         * 展示奖励(金币、爱心)弹跳
         *
         * @param {Node} ndMonster
         * @param {string} modelPath
         * @param {number} [rewardNum=1]
         * @param {Function} [callback=()=>{}]
         * @memberof EffectManager
         */


        showRewardBounce(ndMonster, modelPath, rewardNum = 1, callback = () => {}) {
          let time = rewardNum <= 10 ? 0.15 : 0.07;
          ResourceUtil.loadModelRes(modelPath).then(pf => {
            for (let i = 0; i < rewardNum; i++) {
              let ndReward = PoolManager.instance.getNode(pf, this.ndParent);
              ndReward.setWorldPosition(ndMonster.worldPosition.x, 1.65, ndMonster.worldPosition.z);
              ndReward.active = false;
              let scriptReward = ndReward.getComponent(Reward);
              scriptReward.init((i + 1) * time, this.ndParent);
            }

            callback && callback();
          });
        }
        /**
         * 展示预警
         *
         * @param {string} warningName
         * @param {number} scale
         * @param {*} scriptParent
         * @memberof EffectManager
         */


        showWarning(warningName, scale, scriptParent, callback) {
          ResourceUtil.loadEffectRes(`warning/${warningName}`).then(pf => {
            let ndWarning = PoolManager.instance.getNode(pf, this.ndParent);
            let scriptWarning = null;

            if (warningName === "warningLine") {
              scriptWarning = ndWarning.getComponent(WarningLine);
            } else if (warningName === "warningStrip") {
              scriptWarning = ndWarning.getComponent(WarningStrip);
            } else if (warningName === "warningCircle") {
              scriptWarning = ndWarning.getComponent(WarningCircle);
            }

            scriptWarning.init(scale, scriptParent);
            scriptParent.scriptWarning = scriptWarning;
            callback && callback();
          });
        }
        /**
         * 展示闪电特效连接
         *
         * @param {Node} ndParent
         * @param {Node} ndTarget
         * @memberof EffectManager
         */


        showLightningChain(ndParent, ndTarget) {
          ResourceUtil.loadEffectRes(`lightningChain/lightningChain`).then(pf => {
            let ndEffect = PoolManager.instance.getNode(pf, ndParent);
            ndEffect.setWorldPosition(ndParent.worldPosition.x, 2.3, ndParent.worldPosition.z);
            let offsetPos = new Vec3();
            Vec3.subtract(offsetPos, ndTarget.worldPosition, ndParent.worldPosition);
            ndEffect.setWorldScale(1, offsetPos.length(), 1);
            ndEffect.forward = offsetPos.normalize().negative();
            setTimeout(() => {
              PoolManager.instance.putNode(ndEffect);
            }, 100);
          });
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/storageManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, sys, log, Util;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      log = module.log;
    }, function (module) {
      Util = module.Util;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "5689348bSJGyYo12WGa6eeJ", "storageManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let StorageManager = exports('StorageManager', (_dec = ccclass("StorageManager"), _dec(_class = (_temp = _class2 = class StorageManager {
        constructor() {
          _defineProperty(this, "_path", null);

          _defineProperty(this, "_keyConfig", 'archero');

          _defineProperty(this, "_markSave", false);

          _defineProperty(this, "_saveTimer", -1);

          _defineProperty(this, "jsonData", {});
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
          };
          this._path = this._getConfigPath();
          var content;

          if (sys.isNative) {
            var valueObject = jsb.fileUtils.getValueMapFromFile(this._path);
            content = valueObject[this._keyConfig];
          } else {
            content = sys.localStorage.getItem(this._keyConfig);
          } // // 解密代码
          // if (cc.game.config["encript"]) {
          //     var newContent = new Xxtea("upgradeHeroAbility").xxteaDecrypt(content);
          //     if (newContent && newContent.length > 0) {
          //         content = newContent;
          //     }
          // }


          if (content && content.length) {
            if (content.startsWith('@')) {
              content = content.substring(1);
              content = Util.decrypt(content);
            }

            try {
              //初始化操作
              var jsonData = JSON.parse(content);
              this.jsonData = jsonData;
            } catch (excepaiton) {}
          } //启动无限定时器，每1秒保存一次数据，而不是无限保存数据
          // this._saveTimer = setInterval(() =>{
          //     this.scheduleSave();
          // }, 500);
          //每隔5秒保存一次数据，主要是为了保存最新在线时间，方便离线奖励时间判定


          this._saveTimer = setInterval(() => {
            this.scheduleSave();
          }, 5000);
        }
        /**
         * 存储配置文件，不保存到本地
         * @param {string}key  关键字
         * @param {any}value  存储值
         */


        setConfigDataWithoutSave(key, value) {
          let account = this.jsonData.userId;

          if (this.jsonData[account]) {
            this.jsonData[account][key] = value;
          } else {
            console.error("no account can not save");
          }
        }
        /**
           * 存储配置文件，保存到本地
           * @param {string}key  关键字
           * @param {any}value  存储值
           */


        setConfigData(key, value) {
          this.setConfigDataWithoutSave(key, value);
          this._markSave = true; //标记为需要存储，避免一直在写入，而是每隔一段时间进行写入
        }
        /**
         * 根据关键字获取数值
         * @param {string} key 关键字
         * @returns 
         */


        getConfigData(key) {
          let account = this.jsonData.userId;

          if (this.jsonData[account]) {
            var value = this.jsonData[account][key];
            return value ? value : "";
          } else {
            log("no account can not load");
            return "";
          }
        }
        /**
         * 设置全局数据
         * @param {string} key 关键字
         * @param {any}value  存储值
         * @returns 
         */


        setGlobalData(key, value) {
          this.jsonData[key] = value;
          this.save();
        }
        /**
         * 获取全局数据
         * @param {string} key 关键字
         * @returns 
         */


        getGlobalData(key) {
          return this.jsonData[key];
        }
        /**
         * 设置用户唯一标示符
         * @param {string} userId 用户唯一标示符
         * @param {any}value  存储值
         * @returns 
         */


        setUserId(userId) {
          this.jsonData.userId = userId;

          if (!this.jsonData[userId]) {
            this.jsonData[userId] = {};
          }

          this.save();
        }
        /**
         * 获取用户唯一标示符
         * @returns {string}
         */


        getUserId() {
          return this.jsonData.userId;
        }
        /**
         * 定时存储
         * @returns 
         */


        scheduleSave() {
          if (!this._markSave) {
            return;
          }

          this.save();
        }
        /**
         * 标记为已修改
         */


        markModified() {
          this._markSave = true;
        }
        /**
         * 保存配置文件
         * @returns 
         */


        save() {
          // 写入文件
          var str = JSON.stringify(this.jsonData); // // 加密代码
          // if (cc.game.config["encript"]) {
          //     str = new Xxtea("upgradeHeroAbility").xxteaEncrypt(str);
          // }

          let zipStr = '@' + Util.encrypt(str); // let zipStr = str;

          this._markSave = false;

          if (!sys.isNative) {
            var ls = sys.localStorage;
            ls.setItem(this._keyConfig, zipStr);
            return;
          }

          var valueObj = {};
          valueObj[this._keyConfig] = zipStr; //@ts-ignore

          jsb.fileUtils.writeToFile(valueObj, this._getConfigPath());
        }
        /**
         * 获取配置文件路径
         * @returns 获取配置文件路径
         */


        _getConfigPath() {
          let platform = sys.platform;
          let path = "";

          if (platform === sys.OS.WINDOWS) {
            path = "src/conf";
          } else if (platform === sys.OS.LINUX) {
            path = "./conf";
          } else {
            if (sys.isNative) {
              path = jsb.fileUtils.getWritablePath();
              path = path + "conf";
            } else {
              path = "src/conf";
            }
          }

          return path;
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/audioManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './lodash.ts', './storageManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, AudioClip, ResourceUtil, Lodash, StorageManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Lodash = module.Lodash;
    }, function (module) {
      StorageManager = module.StorageManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "5e2ecZFEJFEHoCgx6lXVYHB", "audioManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let AudioManager = exports('AudioManager', (_dec = ccclass("AudioManager"), _dec(_class = (_temp = _class2 = class AudioManager {
        constructor() {
          _defineProperty(this, "dictWeaponSoundIndex", {});

          _defineProperty(this, "musicVolume", 0.8);

          _defineProperty(this, "soundVolume", 1);

          _defineProperty(this, "audios", {});

          _defineProperty(this, "arrSound", []);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new AudioManager();

          this._instance.init();

          return this._instance;
        }

        init() {
          this.musicVolume = this.getAudioSetting(true) ? 0.8 : 0;
          this.soundVolume = this.getAudioSetting(false) ? 1 : 0;
        }

        onAppShow() {
          for (let name in this.audios) {
            let audio = this.audios[name];

            if (audio.loop) {
              //属于无限循环的，则需要在wx环境下自己开启播放
              audio.clip.play();
            }
          }
        }

        getAudioSetting(isMusic) {
          let state;

          if (isMusic) {
            state = StorageManager.instance.getGlobalData('music');
          } else {
            state = StorageManager.instance.getGlobalData('sound');
          } // console.log('Config for [' + (isMusic ? 'Music' : 'Sound') + '] is ' + state);


          return !state || state === 'true' ? true : false;
        }
        /**
         * 播放音乐
         * @param {String} name 音乐名称可通过constants.AUDIO_MUSIC 获取
         * @param {Boolean} loop 是否循环播放
         */


        playMusic(name, loop) {
          let path = 'audio/music/' + name; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // if (name !== 'click') {
          //     path =  path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // }

          ResourceUtil.loadRes(path, AudioClip, (err, clip) => {
            let tmp = {};
            tmp.clip = clip;
            tmp.loop = loop;
            tmp.isMusic = true;
            this.audios[name] = tmp;
            this.playClip(name, true);
          });
        }
        /**
         * 播放音效
         * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
         * @param {Boolean} loop 是否循环播放
         */


        playSound(name, loop = false) {
          if (!this.soundVolume) {
            return;
          } //音效一般是多个的，不会只有一个


          let path = 'audio/sound/'; // if (name !== 'click') {
          //     path = path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // }

          ResourceUtil.loadRes(path + name, AudioClip, (err, clip) => {
            let tmp = {};
            tmp.clip = clip;
            tmp.loop = loop;
            tmp.isMusic = false;
            this.arrSound.push(tmp);

            if (loop) {
              this.audios[name] = tmp;
              clip.setLoop(loop);
            }

            clip.setVolume(this.soundVolume);
            clip.playOneShot();
            clip.once('ended', () => {
              Lodash.remove(this.arrSound, obj => {
                return obj.clip === tmp.clip;
              });
            });
          });
        }

        playClip(name, isMusic) {
          // console.log('playClip: ' + JSON.stringify(this.audios));
          let audio = this.audios[name]; // if (typeof audio.audioId === "number") {
          //     let state = cc.audioEngine.getState(audio.audioId);
          //     if (state === cc.audioEngine.AudioState.PLAYING && audio.loop) return;
          // }

          let volume = this.musicVolume;

          if (!isMusic) {
            volume = this.soundVolume;
          }

          let clip = audio.clip;
          clip.setVolume(volume);
          clip.setLoop(audio.loop);
          clip.play(); // let audioId = cc.audioEngine.play(audio.clip, audio.loop, volume);
          // audio.audioId = audioId;
        }

        stop(name) {
          if (this.audios.hasOwnProperty(name)) {
            let audio = this.audios[name];
            audio.clip.stop();
          }
        }

        stopAll() {
          for (const i in this.audios) {
            if (this.audios.hasOwnProperty(i)) {
              let audio = this.audios[i];
              audio.clip.stop();
            }
          }
        }

        setMusic(flag) {
          if (typeof flag !== "number") {
            flag = flag ? 1 : 0;
          }

          this.musicVolume = flag;

          for (let item in this.audios) {
            if (this.audios.hasOwnProperty(item) && this.audios[item].isMusic) {
              // this.changeState(item, flag);
              let audio = this.audios[item];
              audio.clip.setVolume(this.musicVolume);
            }
          }
        } //看广告时先将音乐暂停


        pauseAll() {
          console.log("pause all music!!!");

          for (let item in this.audios) {
            if (this.audios.hasOwnProperty(item)) {
              let audio = this.audios[item];
              audio.clip.pause();
            }
          }
        }

        resumeAll() {
          for (let item in this.audios) {
            if (this.audios.hasOwnProperty(item)) {
              let audio = this.audios[item];
              audio.clip.play();
            }
          }
        }

        openMusic() {
          this.setMusic(0.8);
          StorageManager.instance.setGlobalData('music', 'true');
        }

        closeMusic() {
          this.setMusic(0);
          StorageManager.instance.setGlobalData('music', 'false');
        }

        openSound() {
          this.setSound(1);
          StorageManager.instance.setGlobalData('sound', 'true');
        }

        closeSound() {
          this.setSound(0);
          StorageManager.instance.setGlobalData('sound', 'false');
        }

        setSound(flag) {
          this.soundVolume = flag;

          for (let item in this.audios) {
            if (this.audios.hasOwnProperty(item) && !this.audios[item].isMusic) {
              // this.changeState(item, flag);
              let audio = this.audios[item];
              audio.clip.setVolume(this.soundVolume);
            }
          }

          for (let idx = 0; idx < this.arrSound.length; idx++) {
            let audio = this.arrSound[idx];
            audio.clip.setVolume(this.soundVolume);
          }
        }

        stopSingleSound(name) {
          if (this.audios.hasOwnProperty(name) && !this.audios[name].isMusic) {
            let audio = this.audios[name];
            audio.clip.stop();
          }
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/characterRigid.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Vec3, _decorator, Component, RigidBodyComponent, EPSILON, Constant;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      _decorator = module._decorator;
      Component = module.Component;
      RigidBodyComponent = module.RigidBodyComponent;
      EPSILON = module.EPSILON;
    }, function (module) {
      Constant = module.Constant;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "661afbK8/hPNbWGsBzk8GsI", "characterRigid", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const v3_0 = new Vec3();
      const v3_1 = new Vec3();
      let CharacterRigid = exports('CharacterRigid', (_dec = ccclass('CharacterRigid'), _dec(_class = (_class2 = (_temp = class CharacterRigid extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "damping", _descriptor, this);

          _initializerDefineProperty(this, "gravity", _descriptor2, this);

          _defineProperty(this, "_rigidBody", null);

          _defineProperty(this, "_grounded", true);

          _defineProperty(this, "_velocity", new Vec3());

          _defineProperty(this, "_curMaxSpeed", 0);

          _defineProperty(this, "_prevAngleY", 0);

          _defineProperty(this, "_stateX", 0);

          _defineProperty(this, "_stateZ", 0);
        }

        get velocity() {
          return this._velocity;
        }

        get onGround() {
          return this._grounded;
        }

        onLoad() {
          this._rigidBody = this.getComponent(RigidBodyComponent);
        }

        start() {
          this._prevAngleY = this.node.eulerAngles.y;
        }
        /**
         * 初始化角色最大速度
         *
         * @param {number} moveSpeed
         * @param {number} [ratio=1]
         * @memberof CharacterRigid
         */


        initSpeed(moveSpeed, ratio = 1) {
          this._curMaxSpeed = moveSpeed * ratio;
        }
        /**
         * 角色移动传入x和z
         *
         * @param {number} x
         * @param {number} z
         */


        move(x, z) {
          if (x > 0 && this._stateX < 0 || x < 0 && this._stateX > 0 || z > 0 && this._stateZ < 0 || z < 0 && this._stateZ > 0) {
            this.clearVelocity(); // console.log("当前跟之前方向不一致则清除速度,避免惯性太大");
          }

          this._stateX = x;
          this._stateZ = z; // console.log("_stateX", this._stateX, "z", this._stateZ);
        }
        /**
         * 刚体停止移动
         *
         */


        stopMove() {
          this._stateX = 0;
          this._stateZ = 0;
          this.clearVelocity();
        }
        /**
         * 更新刚体状态
         *
         * @private
         * @param {number} dt
         * @return {*} 
         */


        _updateCharacter(dt) {
          this.updateFunction(dt);
          if (!this.onGround) return;

          if (this._stateX || this._stateZ) {
            v3_0.set(this._stateX, 0, this._stateZ);
            v3_0.normalize().negative();
            this.rigidMove(v3_0, 1);
          }
        }
        /**
         * 清除移动速度
         */


        clearVelocity() {
          this._rigidBody.clearVelocity();
        }
        /**
         * 刚体移动
         *
         * @param {Vec3} dir
         * @param {number} speed
         */


        rigidMove(dir, speed) {
          this._rigidBody.getLinearVelocity(v3_1);

          Vec3.scaleAndAdd(v3_1, v3_1, dir, speed); // console.log('v3_1' + v3_1);

          const ms = this._curMaxSpeed;
          const len = v3_1.lengthSqr();
          let ratio = 1;

          if (len > ms) {
            if (Math.abs(this.node.eulerAngles.y - this._prevAngleY) >= 10) {
              ratio = 2;
            }

            this._prevAngleY = this.node.eulerAngles.y;
            v3_1.normalize();
            v3_1.multiplyScalar(ms / ratio);
          }

          this._rigidBody.setLinearVelocity(v3_1); // console.log('setLinearVelocity1' + v3_1);

        }
        /**
         * 刷新
         * @param dt 
         */


        updateFunction(dt) {
          // this._updateContactInfo();
          this._applyGravity();

          this._applyDamping();

          this._saveState();
        }
        /**
         * 施加阻尼
         *
         * @private
         * @param {number} [dt=1 / constant.GAME_FRAME]
         */


        _applyDamping(dt = 1 / Constant.GAME_FRAME) {
          this._rigidBody.getLinearVelocity(v3_1); // console.log('getLinearVelocity2' + v3_1);


          if (v3_1.lengthSqr() > EPSILON) {
            v3_1.multiplyScalar(Math.pow(1.0 - this.damping, dt));

            this._rigidBody.setLinearVelocity(v3_1); // console.log('setLinearVelocity2' + v3_1);

          }
        }
        /**
         * 施加重力
         *
         * @private
         */


        _applyGravity() {
          const g = this.gravity;
          const m = this._rigidBody.mass;
          v3_1.set(0, m * g, 0);

          this._rigidBody.applyForce(v3_1);
        }
        /**
         * 获取线性速度
         *
         * @private
         */


        _saveState() {
          this._rigidBody.getLinearVelocity(this._velocity); // console.log('getLinearVelocity3' + this._velocity  + ":" + this._grounded);

        }

        update(dtS) {
          const dt = 1000 / Constant.GAME_FRAME;

          this._updateCharacter(dt);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "damping", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gravity", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return -10;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/monsterBloodBar.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, UITransformComponent, _decorator, Component, Vec3, clamp, tween, find, PoolManager, Constant, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      UITransformComponent = module.UITransformComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      clamp = module.clamp;
      tween = module.tween;
      find = module.find;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "6a19fvFDdxLCIBJjW6IGGh4", "monsterBloodBar", undefined);

      const {
        ccclass,
        property
      } = _decorator; //怪物血量脚本

      let MonsterBloodBar = exports('MonsterBloodBar', (_dec = ccclass('MonsterBloodBar'), _dec2 = property(UITransformComponent), _dec3 = property(UITransformComponent), _dec4 = property(UITransformComponent), _dec(_class = (_class2 = (_temp = class MonsterBloodBar extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "UIComWhiteBar", _descriptor, this);

          _initializerDefineProperty(this, "UIComRedBar", _descriptor2, this);

          _initializerDefineProperty(this, "UIComBloodBar", _descriptor3, this);

          _defineProperty(this, "_whiteBarHeight", 19);

          _defineProperty(this, "_redBarHeight", 19);

          _defineProperty(this, "_totalBlood", 0);

          _defineProperty(this, "_curBlood", 0);

          _defineProperty(this, "_scriptParent", null);

          _defineProperty(this, "_maxWhiteBarWidth", 104);

          _defineProperty(this, "_maxRedBarWidth", 104);

          _defineProperty(this, "_ndTarget", null);

          _defineProperty(this, "_offsetPos", null);

          _defineProperty(this, "_curPos", new Vec3());

          _defineProperty(this, "_isBloodEmpty", false);

          _defineProperty(this, "_prevBloodPos", new Vec3());
        } //血量为空前的血条位置


        start() {// [3]
        }
        /**
         * 展示血条
         *
         * @param {*} scriptParent 
         * @param {number} totalBlood
         * @param {Vec3} offsetPos
         * @param {Vec3} scale
         * @param {(Function | null)} [callback]
         * @param {boolean} [isInit=true]
         * @memberof MonsterBloodBar
         */


        show(scriptParent, totalBlood, offsetPos, scale, callback, isInit = true) {
          this._scriptParent = scriptParent;
          this._totalBlood = totalBlood * GameManager.hpAddition;
          this._offsetPos = offsetPos;
          this._ndTarget = scriptParent.node;
          this._isBloodEmpty = false;

          this._prevBloodPos.set(this._ndTarget.worldPosition);

          if (isInit) {
            this._curBlood = this._totalBlood;
          } //当前血量占全部的比例


          let ratio = this._curBlood / this._totalBlood;
          ratio = clamp(ratio, 0, 1); //进度条宽度设置

          this.UIComWhiteBar.setContentSize(ratio * this._maxWhiteBarWidth, this._whiteBarHeight);
          this.UIComRedBar.setContentSize(ratio * this._maxRedBarWidth, this._redBarHeight); // this.UIComBloodBar.priority = constant.PRIORITY.BLOOD;

          this.node.setSiblingIndex(Constant.PRIORITY.BLOOD);
          callback && callback();
        }
        /**
         * 刷新血量
         *
         * @param {number} num 血量值
         * @memberof MonsterBloodBar
         */


        refreshBlood(num) {
          this._curBlood += num;
          let ratio = this._curBlood / this._totalBlood;

          if (num < 0) {
            //减血
            ratio = ratio <= 0 ? 0 : ratio;
            this.UIComRedBar.setContentSize(this._maxRedBarWidth * ratio, this._redBarHeight);

            if (!this._isBloodEmpty) {
              this._isBloodEmpty = ratio <= 0;
              tween(this.UIComWhiteBar).to(0.7, {
                width: this._maxWhiteBarWidth * ratio
              }).call(() => {
                if (this._isBloodEmpty) {
                  PoolManager.instance.putNode(this.node);
                }
              }).start();

              if (this._isBloodEmpty) {
                this._scriptParent.isDie = true;
              }
            } else {
              PoolManager.instance.putNode(this.node);
              this._scriptParent.isDie = true;
            }
          }
        }

        update() {
          if (this.node.parent && this.node.active && this._ndTarget && this._ndTarget.parent) {
            var _GameManager$mainCame;

            let worPos = this._ndTarget.worldPosition;

            if (this._isBloodEmpty) {
              worPos = this._prevBloodPos;
            } else {
              this._prevBloodPos.set(worPos);
            }

            (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.convertToUINode(worPos, find("Canvas"), this._curPos);

            this._curPos.add(this._offsetPos);

            this.node.setPosition(this._curPos);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "UIComWhiteBar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "UIComRedBar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "UIComBloodBar", [_dec4], {
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

System.register("chunks:///_virtual/settlementPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './skillList.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, SpriteComponent, LabelComponent, Node, _decorator, Component, Constant, ClientEvent, AudioManager, PlayerData, UIManager, GameManager, SkillList;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SkillList = module.SkillList;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "6bc867ji2JNjZoTsbw3Odz5", "settlementPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //结算界面脚本

      let SettlementPanel = exports('SettlementPanel', (_dec = ccclass('SettlementPanel'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(SpriteComponent), _dec5 = property(LabelComponent), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = class SettlementPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfTitleWin", _descriptor, this);

          _initializerDefineProperty(this, "sfTitleFail", _descriptor2, this);

          _initializerDefineProperty(this, "spTitle", _descriptor3, this);

          _initializerDefineProperty(this, "lbLevel", _descriptor4, this);

          _initializerDefineProperty(this, "ndSkillList", _descriptor5, this);

          _defineProperty(this, "_callback", null);
        }

        start() {// [3]
        }

        show(callback) {
          this._callback = callback;
          this.lbLevel.string = PlayerData.instance.playerInfo.level;

          if (GameManager.isWin) {
            this.spTitle.spriteFrame = this.sfTitleWin;
          } else {
            this.spTitle.spriteFrame = this.sfTitleWin;
          }

          let scriptSkillList = this.ndSkillList.getComponent(SkillList);
          scriptSkillList.init();
        }

        onBtnHomeClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._callback && this._callback();

          if (!GameManager.isWin) {
            //失败的时候清空技能和层级
            PlayerData.instance.playerInfo.arrSkill = [];
            PlayerData.instance.playerInfo.level = 1;
            PlayerData.instance.savePlayerInfoToLocalCache();
          }

          UIManager.instance.hideDialog("settlement/settlementPanel");
          UIManager.instance.showDialog("home/homePanel");
        }

        onBtnPlayAgainClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("settlement/settlementPanel");
          UIManager.instance.showDialog("fight/fightPanel");
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_GAME_INIT);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfTitleWin", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfTitleFail", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spTitle", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ndSkillList", [_dec6], {
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
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerModel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './audioManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, SkeletalAnimationComponent, _decorator, Component, Vec3, AnimationClip, Constant, AudioManager, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      SkeletalAnimationComponent = module.SkeletalAnimationComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      AnimationClip = module.AnimationClip;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "6d341OU0KFKnp6rW79mlG0J", "playerModel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //玩家角色模型脚本

      let PlayerModel = exports('PlayerModel', (_dec = ccclass('PlayerModel'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(SkeletalAnimationComponent), _dec(_class = (_class2 = (_temp = class PlayerModel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndSocketLoose", _descriptor, this);

          _initializerDefineProperty(this, "ndSocketHand", _descriptor2, this);

          _initializerDefineProperty(this, "ndArrow", _descriptor3, this);

          _initializerDefineProperty(this, "aniComPlayer", _descriptor4, this);

          _defineProperty(this, "looseEulerAngles", new Vec3());

          _defineProperty(this, "isAniPlaying", false);

          _defineProperty(this, "_aniType", "");

          _defineProperty(this, "_aniState", null);

          _defineProperty(this, "_stepIndex", 0);
        } //当前动画是否正在播放
        //是否正在跑


        get isRunning() {
          return this._aniType === Constant.PLAYER_ANI_TYPE.RUN && this.isAniPlaying === true;
        } //是否待机


        get isIdle() {
          return this._aniType === Constant.PLAYER_ANI_TYPE.IDLE && this.isAniPlaying === true;
        } //是否正在攻击


        get isAttacking() {
          return this._aniType === Constant.PLAYER_ANI_TYPE.ATTACK && this.isAniPlaying === true;
        } //脚步


        start() {// [3]
        }

        init() {
          this.hideArrow();
        }
        /**
         * attack帧事件:箭射出去的时候触发
         * @returns 
         */


        onFrameAttackLoose() {
          var _this$node$parent;

          if (GameManager.isGameOver || GameManager.isGamePause) {
            return;
          }

          this.looseEulerAngles = (_this$node$parent = this.node.parent) === null || _this$node$parent === void 0 ? void 0 : _this$node$parent.eulerAngles;
          GameManager.scriptPlayer.throwArrowToEnemy();
          this.ndArrow.active = false; // console.log("looseEulerAngles", this.looseEulerAngles);
        }
        /**
         * run帧事件：脚落地的时候播放音效
         *
         * @memberof PlayerModel
         */


        onFrameRun() {
          this._stepIndex = this._stepIndex === 0 ? 1 : 0;
          AudioManager.instance.playSound(Constant.SOUND.FOOT_STEP[this._stepIndex]);
        }
        /**
         * attack帧事件: 拉弓的时候触发
         */


        onFrameAttackDraw() {
          this.ndArrow.active = true;
        }
        /**
         * 隐藏模型手中默认的箭
         */


        hideArrow() {
          this.ndArrow.active = false;
        }
        /**
        * 播放玩家动画
        *
        * @param {string} aniType 动画类型
        * @param {boolean} [isLoop=false] 是否循环
        * @param {Function} [callback] 回调函数
        * @param {number} [callback] 调用播放动画的位置，方便用于测试
        * @returns
        * @memberof Player
        */


        playAni(aniType, isLoop = false, callback, pos) {
          var _this$aniComPlayer, _this$aniComPlayer2; // console.log("playerAniType", aniType, "curAniType", this.aniType, "pos", pos);


          this._aniState = (_this$aniComPlayer = this.aniComPlayer) === null || _this$aniComPlayer === void 0 ? void 0 : _this$aniComPlayer.getState(aniType);

          if (this._aniState && this._aniState.isPlaying) {
            return;
          }

          this._aniType = aniType;

          if (this._aniType !== Constant.PLAYER_ANI_TYPE.ATTACK) {
            this.hideArrow();
          }

          (_this$aniComPlayer2 = this.aniComPlayer) === null || _this$aniComPlayer2 === void 0 ? void 0 : _this$aniComPlayer2.play(aniType);
          this.isAniPlaying = true;

          if (this._aniState) {
            if (isLoop) {
              this._aniState.wrapMode = AnimationClip.WrapMode.Loop;
            } else {
              this._aniState.wrapMode = AnimationClip.WrapMode.Normal;
            }

            switch (aniType) {
              case Constant.PLAYER_ANI_TYPE.ATTACK:
                this._aniState.speed = GameManager.gameSpeed * GameManager.scriptPlayer.curAttackSpeed;
                GameManager.scriptPlayer.hideRunSmoke();
                break;

              case Constant.PLAYER_ANI_TYPE.RUN:
                this._aniState.speed = GameManager.gameSpeed * (GameManager.scriptPlayer.curMoveSpeed / GameManager.scriptPlayer.playerBaseInfo.moveSpeed);
                GameManager.scriptPlayer.playRunSmoke();
                break;

              case Constant.PLAYER_ANI_TYPE.IDLE:
                this._aniState.speed = GameManager.gameSpeed;
                break;

              default:
                this._aniState.speed = GameManager.gameSpeed;
                break;
            }
          }

          if (!isLoop) {
            this.aniComPlayer.once(SkeletalAnimationComponent.EventType.FINISHED, () => {
              this.isAniPlaying = false;
              callback && callback();
            });
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndSocketLoose", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndSocketHand", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndArrow", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "aniComPlayer", [_dec5], {
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

System.register("chunks:///_virtual/gameManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './effectManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './monster.ts', './mapManager.ts', './gameCamera.ts', './player.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, Vec3, CameraComponent, find, AnimationComponent, SkeletalAnimationComponent, ParticleSystemComponent, PoolManager, ResourceUtil, Util, Constant, ClientEvent, AudioManager, EffectManager, LocalConfig, PlayerData, UIManager, Monster, MapManager, GameCamera, Player;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      CameraComponent = module.CameraComponent;
      find = module.find;
      AnimationComponent = module.AnimationComponent;
      SkeletalAnimationComponent = module.SkeletalAnimationComponent;
      ParticleSystemComponent = module.ParticleSystemComponent;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      Monster = module.Monster;
    }, function (module) {
      MapManager = module.MapManager;
    }, function (module) {
      GameCamera = module.GameCamera;
    }, function (module) {
      Player = module.Player;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

      cclegacy._RF.push({}, "74bb5fEKqJBI7792FWkxSP/", "gameManager", undefined);

      const {
        ccclass,
        property
      } = _decorator; //游戏管理脚本

      let GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(GameCamera), _dec3 = property({
        type: MapManager
      }), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = _class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "camera", _descriptor, this);

          _initializerDefineProperty(this, "scriptMapManager", _descriptor2, this);

          _initializerDefineProperty(this, "ndLight", _descriptor3, this);

          _defineProperty(this, "mapInfo", {});

          _defineProperty(this, "_dictMonsterSkill", {});

          _defineProperty(this, "_oriMainLightWorPos", null);

          _defineProperty(this, "_offsetWorPosMainLight", new Vec3());
        } //本层敌人攻速加成


        static set isWin(value) {
          this._isWin = value;

          if (GameManager.isGameStart) {
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_GAME_OVER);
          }
        }

        static get isWin() {
          return this._isWin;
        }

        static set gameSpeed(value) {
          console.log("gameSpeed", GameManager.gameSpeed);
          this._gameSpeed = value;
          GameManager.refreshEffectSpeed(GameManager.ndGameManager, this._gameSpeed);
          GameManager.refreshEffectSpeed(GameManager.ndPlayer, this._gameSpeed);
          GameManager.refreshEffectSpeed(GameManager.ndEffectManager, this._gameSpeed);
        }

        static get gameSpeed() {
          return this._gameSpeed;
        } //是否取得胜利


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.ON_GAME_INIT, this._onGameInit, this);
          ClientEvent.on(Constant.EVENT_TYPE.ON_GAME_OVER, this._onGameOver, this);
          ClientEvent.on(Constant.EVENT_TYPE.ON_GAME_PAUSE, this._onGamePause, this);
          ClientEvent.on(Constant.EVENT_TYPE.REFRESH_LEVEL, this._refreshLevel, this);
          ClientEvent.on(Constant.EVENT_TYPE.RECYCLE_ALL, this._recycleAll, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.ON_GAME_INIT, this._onGameInit, this);
          ClientEvent.off(Constant.EVENT_TYPE.ON_GAME_OVER, this._onGameOver, this);
          ClientEvent.off(Constant.EVENT_TYPE.ON_GAME_PAUSE, this._onGamePause, this);
          ClientEvent.off(Constant.EVENT_TYPE.REFRESH_LEVEL, this._refreshLevel, this);
          ClientEvent.off(Constant.EVENT_TYPE.RECYCLE_ALL, this._recycleAll, this);
        }

        start() {
          var _this$camera, _this$camera2;

          GameManager.mainCamera = (_this$camera = this.camera) === null || _this$camera === void 0 ? void 0 : _this$camera.getComponent(CameraComponent);
          GameManager.scriptGameCamera = (_this$camera2 = this.camera) === null || _this$camera2 === void 0 ? void 0 : _this$camera2.getComponent(GameCamera);
          GameManager.ndGameManager = this.node;
          GameManager.ndMapManager = find("mapManager");
          GameManager.ndEffectManager = find("effectManager");
          this._oriMainLightWorPos = this.ndLight.worldPosition.clone();

          if (GameManager.isTesting) {
            //@ts-ignore
            window.uiManager = UIManager.instance; //@ts-ignore

            window.AudioManager = AudioManager.instance; //@ts-ignore

            window.playerData = PlayerData.instance; //@ts-ignore

            window.clientEvent = ClientEvent; //@ts-ignore

            window.ndGameManager = GameManager.ndGameManager; //@ts-ignore

            window.GameManager = GameManager; //@ts-ignore

            window.ndMapManager = GameManager.ndMapManager; //@ts-ignore

            window.EffectManager = EffectManager.instance; //@ts-ignore

            window.ndEffectManager = GameManager.ndEffectManager; //@ts-ignore

            window.constant = Constant; //@ts-ignore
            //@ts-ignore
          }
        }
        /**
         * 初始化游戏
         */


        _onGameInit() {
          let level = PlayerData.instance.playerInfo.level;
          let totalLevel = LocalConfig.instance.getTableArr("checkpoint").length; //游戏通关后从倒数第10关开始循环(61-70)

          if (level > totalLevel) {
            level = totalLevel - 10 + (level - totalLevel) % 10;
          }

          this.mapInfo = LocalConfig.instance.queryByID("checkpoint", String(level)); //设置本层敌人属性加成比例

          GameManager.attackAddition = this.mapInfo.attackAddition;
          GameManager.defenseAddition = this.mapInfo.defenseAddition;
          GameManager.hpAddition = this.mapInfo.hpAddition;
          GameManager.moveSpeedAddition = this.mapInfo.moveSpeedAddition;
          GameManager.attackSpeedAddition = this.mapInfo.attackSpeedAddition;
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.HIDE_WARP_GATE);
          GameManager.isGameStart = false;
          GameManager.isGamePause = false;
          GameManager.isGameOver = false;
          GameManager.isWin = false;
          GameManager.isRevive = false;
          GameManager.arrMonster = [];
          GameManager.gameSpeed = 1;
          GameManager.ndBoss = null;
          GameManager.existentNum = 0;
          PlayerData.instance.addFightTimes();
          AudioManager.instance.pauseAll(); // if (GameManager.isFirstLoad) {
          //     this._refreshLevel();
          // } else {

          UIManager.instance.showDialog("loading/loadingPanel", [() => {
            this._refreshLevel();
          }]); // }
        }
        /**
         * 刷新关卡, 后期优化写法。。。
         */


        _refreshLevel() {
          //每层随机一张地图
          let arrMap = this.mapInfo.mapName.split("#");
          let mapName = arrMap[Math.floor(Math.random() * arrMap.length)];
          this.preloadMonsterSkill(mapName).then(() => {
            this._recycleAll();

            this._loadMap(mapName, () => {
              //第一次进入或者失败后被销毁需要重新创建
              if (!GameManager.ndPlayer) {
                this._createPlayer();
              } else {
                GameManager.scriptPlayer.preloadArrow(() => {
                  ClientEvent.dispatchEvent(Constant.EVENT_TYPE.HIDE_LOADING_PANEL, () => {
                    GameManager.scriptPlayer.resetPlayerState();
                  });
                });
              }
            });
          });
        }
        /**
         * 加载地图数据
         *
         * @private
         * @param {Function} [cb=()=>{}]
         * @memberof GameManager
         */


        _loadMap(mapName, cb = () => {}) {
          this.scriptMapManager.buildMap(mapName, () => {}, () => {
            cb && cb();
          });
        }
        /**
         * 创建玩家
         *
         * @private
         * @memberof GameManager
         */


        _createPlayer() {
          ResourceUtil.loadModelRes("player/player01").then(pf => {
            var _GameManager$mainCame, _GameManager$ndPlayer;

            GameManager.ndPlayer = PoolManager.instance.getNode(pf, this.node);
            let scriptGameCamera = (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.node.getComponent(GameCamera);
            scriptGameCamera.ndFollowTarget = GameManager.ndPlayer;
            let scriptPlayer = (_GameManager$ndPlayer = GameManager.ndPlayer) === null || _GameManager$ndPlayer === void 0 ? void 0 : _GameManager$ndPlayer.getComponent(Player);
            GameManager.scriptPlayer = scriptPlayer;
            scriptPlayer === null || scriptPlayer === void 0 ? void 0 : scriptPlayer.init(); // if (GameManager.isFirstLoad) {
            //     GameManager.isFirstLoad = false;
            //     scriptPlayer.preloadArrow(()=>{
            //         clientEvent.dispatchEvent(constant.EVENT_TYPE.REMOVE_NODE_GAME_START);
            //     })
            // } else {

            scriptPlayer.preloadArrow(() => {
              ClientEvent.dispatchEvent(Constant.EVENT_TYPE.HIDE_LOADING_PANEL);
            }); // }
          });
        }
        /**
         * 回收怪兽, 武器，特效等
         *
         * @private
         * @memberof GameManager
         */


        _recycleAll() {
          this.scriptMapManager.recycle();

          for (let i = this.node.children.length - 1; i >= 0; i--) {
            const ndChild = this.node.children[i];

            if (ndChild.name !== "player01") {
              PoolManager.instance.putNode(ndChild);
            }
          }

          while (GameManager.ndEffectManager.children.length) {
            PoolManager.instance.putNode(GameManager.ndEffectManager.children[0]);
          }
        }
        /**
         * 游戏结束
         */


        _onGameOver() {
          if (GameManager.isGameOver) {
            return;
          }

          GameManager.isGamePause = true;
          console.log("game over!", "isWin ?", GameManager.isWin);

          if (GameManager.isWin) {
            UIManager.instance.hideDialog("fight/fightPanel");
            GameManager.isGameOver = true;

            this._recycleAll();

            let nextLevel = Number(PlayerData.instance.playerInfo.level) + 1;
            PlayerData.instance.playerInfo.level = nextLevel; //更新已解锁最高层级

            if (nextLevel > PlayerData.instance.playerInfo.highestLevel) {
              PlayerData.instance.playerInfo.highestLevel = nextLevel;
            }

            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_GAME_INIT);
          } else {
            UIManager.instance.showDialog("revive/revivePanel", [() => {
              if (GameManager.ndPlayer) {
                PoolManager.instance.putNode(GameManager.ndPlayer);
                GameManager.ndPlayer = null;
                GameManager.scriptPlayer = null;
              }

              this._recycleAll();
            }]);
          }
        }
        /**
         * 游戏暂停
         */


        _onGamePause() {
          GameManager.isGamePause = true;
        }
        /**
         * 获取距离最近的小怪、boss节点
         * @returns 
         */


        static getNearestMonster() {
          if (GameManager.arrMonster.length) {
            let arr = GameManager.arrMonster.sort((a, b) => {
              let distanceA = Util.getTwoNodeXZLength(GameManager.ndPlayer, a);
              let distanceB = Util.getTwoNodeXZLength(GameManager.ndPlayer, b);
              return distanceA - distanceB;
            });
            arr = arr.filter(item => {
              let scriptMonster = item.getComponent(Monster);
              return item.parent !== null && !scriptMonster.isDie;
            });
            return arr[0];
          } else {
            return null;
          }
        }
        /**
         * 获取除了怪物本身自己外一定范围内的怪物
         *
         * @static
         * @param {Node} ndMonster 被击中的敌人
         * @param {boolean} [isAll=false] 是否返回全部敌人,否则只随机返回一个
         * @param {number} [range=5] 范围
         * @return {*} 
         * @memberof GameManager
         */


        static getNearbyMonster(ndMonster, isAll = false, range = 7) {
          //范围
          let arrMonster = [];

          if (GameManager.arrMonster.length) {
            arrMonster = GameManager.arrMonster.concat();
          }

          arrMonster = arrMonster.filter(item => {
            let scriptMonster = item.getComponent(Monster);
            let length = Util.getTwoNodeXZLength(GameManager.ndPlayer, item);
            return item.parent !== null && !scriptMonster.isDie && length <= range && ndMonster.worldPosition !== item.worldPosition;
          });

          if (arrMonster.length) {
            if (!isAll) {
              let index = Math.floor(Math.random() * arrMonster.length);
              return arrMonster = arrMonster.filter((ndChild, idx) => {
                return idx === index;
              });
            } else {
              return arrMonster;
            }
          } else {
            return arrMonster;
          }
        }
        /**
         * 刷新节点下的动画、粒子播放速度
         * @param targetNode 
         * @param value 
         * @returns 
         */


        static refreshEffectSpeed(targetNode, value) {
          if (!targetNode) {
            return;
          }

          let arrAni = targetNode.getComponentsInChildren(AnimationComponent);
          arrAni.forEach(item => {
            item.clips.forEach(clip => {
              let aniName = clip === null || clip === void 0 ? void 0 : clip.name;
              let aniState = item.getState(aniName);
              aniState.speed = value;
            });
          });
          let arrSkeletalAni = targetNode.getComponentsInChildren(SkeletalAnimationComponent);
          arrSkeletalAni.forEach(item => {
            item.clips.forEach(clip => {
              let aniName = clip === null || clip === void 0 ? void 0 : clip.name;
              let aniState = item.getState(aniName);
              aniState.speed = value;
            });
          });
          let arrParticle = targetNode.getComponentsInChildren(ParticleSystemComponent);
          arrParticle.forEach(item => {
            item.simulationSpeed = value;
          });
        }
        /**
         * 添加金币
         *
         * @static
         * @param {number} [value=1]
         * @memberof GameManager
         */


        static addGold(value = 1) {
          PlayerData.instance.updatePlayerInfo('gold', Math.ceil(value));
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.REFRESH_GOLD);
        }
        /**
         * 每层进入前预加载该层所需的敌人技能
         *
         * @private
         * @memberof GameManager
         */


        preloadMonsterSkill(mapName) {
          return new Promise((resolve, reject) => {
            let arrLoadSkill = []; //等待预加载的技能

            let arrInfo = LocalConfig.instance.getTableArr(mapName); //获取所有敌人信息

            arrInfo = arrInfo.filter(item => {
              return item.ID.startsWith("2");
            }); //获得敌人技能列表

            if (arrInfo.length) {
              let arrSkill = [];
              arrInfo.forEach(element => {
                arrSkill = arrSkill.concat(element.skill === "" ? [] : element.skill.split("#"));
              });
              arrSkill.length && arrSkill.forEach(id => {
                if (!this._dictMonsterSkill[id]) {
                  arrLoadSkill.push(id);
                  this._dictMonsterSkill[id] = {
                    "num": 1
                  };
                } else {
                  let arr = arrSkill.filter(itemId => {
                    return itemId === id;
                  });

                  if (arr.length > this._dictMonsterSkill[id].num) {
                    arrLoadSkill.push(id);
                    this._dictMonsterSkill[id].num += 1;
                  }
                }
              });
              let arrPromise = []; // console.log("需要预加载的技能数组", arrLoadSkill, "已经预加载的敌人技能", this._dictMonsterSkill);

              if (arrLoadSkill.length) {
                for (let i = 0; i < arrLoadSkill.length; i++) {
                  const element = arrLoadSkill[i]; //预加载敌人技能

                  let skillInfo = LocalConfig.instance.queryByID("monsterSkill", element);
                  let p = ResourceUtil.loadEffectRes(`${skillInfo.resName}/${skillInfo.resName}`).then(prefab => {
                    let ndSkillCollider = PoolManager.instance.getNode(prefab, GameManager.ndGameManager);
                    ndSkillCollider.setWorldPosition(this.node.worldPosition.x, 30, this.node.worldPosition.z);
                  });
                  arrPromise.push(p);
                }

                Promise.all(arrPromise).then(() => {
                  resolve(null);
                }).catch(e => {
                  console.error("预加载敌人技能报错", e);
                });
              } else {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          });
        }
        /**
         * 判断本层的爱心、npc是否都已经触发
         *
         * @static
         * @memberof GameManager
         */


        static checkTriggerAll() {
          GameManager.existentNum -= 1;

          if (GameManager.existentNum <= 0) {
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.SHOW_WARP_GATE);
          }
        }

        update(deltaTime) {
          //光源跟随玩家人物移动
          if (GameManager.scriptPlayer && GameManager.scriptPlayer.node && !GameManager.isGameOver) {
            Vec3.subtract(this._offsetWorPosMainLight, GameManager.ndPlayer.worldPosition, this._oriMainLightWorPos);

            this._offsetWorPosMainLight.set(this._offsetWorPosMainLight.x, 0, this._offsetWorPosMainLight.z);

            this.ndLight.setWorldPosition(this._offsetWorPosMainLight.add(this._oriMainLightWorPos));
          }
        }

      }, _defineProperty(_class3, "mainCamera", null), _defineProperty(_class3, "isGameStart", false), _defineProperty(_class3, "isGamePause", false), _defineProperty(_class3, "isGameOver", false), _defineProperty(_class3, "scriptPlayer", null), _defineProperty(_class3, "scriptGameCamera", void 0), _defineProperty(_class3, "ndPlayer", null), _defineProperty(_class3, "ndBoss", null), _defineProperty(_class3, "scriptBoss", null), _defineProperty(_class3, "ndGameManager", void 0), _defineProperty(_class3, "ndEffectManager", null), _defineProperty(_class3, "ndMapManager", null), _defineProperty(_class3, "isRevive", false), _defineProperty(_class3, "isTesting", true), _defineProperty(_class3, "isFirstLoad", false), _defineProperty(_class3, "arrMonster", []), _defineProperty(_class3, "existentNum", 0), _defineProperty(_class3, "attackAddition", 1), _defineProperty(_class3, "defenseAddition", 1), _defineProperty(_class3, "hpAddition", 1), _defineProperty(_class3, "moveSpeedAddition", 1), _defineProperty(_class3, "attackSpeedAddition", 1), _defineProperty(_class3, "_gameSpeed", 1), _defineProperty(_class3, "_isWin", false), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scriptMapManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndLight", [_dec4], {
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

System.register("chunks:///_virtual/monster.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './effectManager.ts', './localConfig.ts', './uiManager.ts', './monsterModel.ts', './energyBall.ts', './fireBall.ts', './dispersionSurround.ts', './dispersion.ts', './fireBallBig.ts', './tornado.ts', './laser.ts', './characterRigid.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, Quat, Vec3, _decorator, Component, macro, PoolManager, ResourceUtil, Util, Constant, ClientEvent, AudioManager, EffectManager, LocalConfig, UIManager, MonsterModel, EnergyBall, FireBall, DispersionSurround, Dispersion, FireBallBig, Tornado, Laser, CharacterRigid, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Vec3 = module.Vec3;
      _decorator = module._decorator;
      Component = module.Component;
      macro = module.macro;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      MonsterModel = module.MonsterModel;
    }, function (module) {
      EnergyBall = module.EnergyBall;
    }, function (module) {
      FireBall = module.FireBall;
    }, function (module) {
      DispersionSurround = module.DispersionSurround;
    }, function (module) {
      Dispersion = module.Dispersion;
    }, function (module) {
      FireBallBig = module.FireBallBig;
    }, function (module) {
      Tornado = module.Tornado;
    }, function (module) {
      Laser = module.Laser;
    }, function (module) {
      CharacterRigid = module.CharacterRigid;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "75fe4NpEqNMNZSSj5Z9vDnA", "monster", undefined);

      let qt_0 = new Quat();
      let v3_0 = new Vec3();
      const {
        ccclass,
        property
      } = _decorator; //普通怪物脚本

      let Monster = exports('Monster', (_dec = ccclass('Monster'), _dec(_class = (_temp = class Monster extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "scriptMonsterModel", null);

          _defineProperty(this, "isMoving", false);

          _defineProperty(this, "scriptBloodBar", null);

          _defineProperty(this, "bloodTipDirection", Constant.BLOOD_TIP_DIRECTION.LEFT_UP);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "allSkillInfo", null);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "layerInfo", null);

          _defineProperty(this, "curAttackSpeed", 0);

          _defineProperty(this, "scriptWarning", null);

          _defineProperty(this, "attackForward", new Vec3());

          _defineProperty(this, "attackPos", new Vec3());

          _defineProperty(this, "scriptCharacterRigid", null);

          _defineProperty(this, "_isDie", false);

          _defineProperty(this, "_curAttackInterval", 0);

          _defineProperty(this, "_isHitByPlayer", false);

          _defineProperty(this, "_isInitBloodBar", false);

          _defineProperty(this, "_bloodTipOffsetPos", new Vec3(0, 50, 0));

          _defineProperty(this, "_hideBloodCountDown", 3);

          _defineProperty(this, "_hitEffectPos", new Vec3(0, 0.2, 0));

          _defineProperty(this, "_isAllowToAttack", false);

          _defineProperty(this, "_playerMonsterOffset", new Vec3());

          _defineProperty(this, "_curAngleY", 0);

          _defineProperty(this, "_horizontal", 0);

          _defineProperty(this, "_vertical", 0);

          _defineProperty(this, "_iceDamageCountDown", 0);

          _defineProperty(this, "_fireDamageCountDown", 0);

          _defineProperty(this, "_ndMonsterSkill", null);

          _defineProperty(this, "_skillIndex", 0);

          _defineProperty(this, "_minLength", 3);

          _defineProperty(this, "_curMoveSpeed", 0);

          _defineProperty(this, "_moveMode", 0);

          _defineProperty(this, "_movePattern", 0);

          _defineProperty(this, "_moveFrequency", 0);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_offsetPos_2", new Vec3());

          _defineProperty(this, "_mixOffset", new Vec3(1, 0, 1));

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_isPlayRotate", false);

          _defineProperty(this, "_curAngle", new Vec3());

          _defineProperty(this, "_curAngle_2", new Vec3());

          _defineProperty(this, "_tempAngle", new Vec3());

          _defineProperty(this, "_rotateDirection", new Vec3());

          _defineProperty(this, "_forWard", new Vec3());

          _defineProperty(this, "_ndRunSmokeEffect", null);

          _defineProperty(this, "_originAngle", new Vec3(0, -90, 0));

          _defineProperty(this, "_targetAngle", new Vec3());

          _defineProperty(this, "_checkInterval", 0.04);

          _defineProperty(this, "_currentTime", 0);

          _defineProperty(this, "_ndBody", null);

          _defineProperty(this, "_curMoveWorPos", new Vec3());

          _defineProperty(this, "_isArrived", false);

          _defineProperty(this, "_checkMoveInterval", 0);

          _defineProperty(this, "_prevMoveWorPos", new Vec3());

          _defineProperty(this, "_moveUnit", new Vec3());

          _defineProperty(this, "_minLengthRatio", 1.1);

          _defineProperty(this, "_randomMoveTryTimes", 5);

          _defineProperty(this, "_action", 0);
        }

        set curMoveSpeed(v) {
          this._curMoveSpeed = v;
          this.scriptCharacterRigid.initSpeed(v, GameManager.moveSpeedAddition);
        }

        get curMoveSpeed() {
          return this._curMoveSpeed;
        }

        set isDie(v) {
          this._isDie = v;

          if (this._isDie) {
            this.showDie();
          }
        }

        get isDie() {
          return this._isDie;
        } //怪物行为


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.MONSTER_MOVE, this._monsterMove, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.MONSTER_MOVE, this._monsterMove, this); //回收血条节点

          if (this.scriptBloodBar) {
            if (this.scriptBloodBar.node.parent) {
              PoolManager.instance.putNode(this.scriptBloodBar.node);
            }

            this.scriptBloodBar = null;
          } //回收预警节点


          this.recycleWarning(); //回收技能节点

          if (this._ndMonsterSkill) {
            PoolManager.instance.putNode(this._ndMonsterSkill);
            this._ndMonsterSkill = null;
          }
        }

        start() {// [3]
        }

        init(baseInfo, layerInfo) {
          this.baseInfo = baseInfo;
          this.layerInfo = layerInfo;
          this.isDie = false;
          this.recycleWarning();
          this._ndBody = this.node.getChildByName("body");
          this.scriptMonsterModel = this._ndBody.getComponent(MonsterModel);
          this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.IDLE, true);
          this.scriptCharacterRigid = this.node.getComponent(CharacterRigid);
          this.scriptCharacterRigid.stopMove();
          this._curAttackInterval = 0;
          this._isHitByPlayer = false;
          this._isInitBloodBar = false;
          this._isAllowToAttack = false;
          this._isArrived = false;
          this._checkMoveInterval = 0;
          this._iceDamageCountDown = 0;
          this._fireDamageCountDown = 0;
          this._ndMonsterSkill = null;
          this._skillIndex = 0;

          this._moveUnit.set(0, 0, 0);

          this._movePattern = layerInfo.movePattern ? layerInfo.movePattern : this.baseInfo.movePattern;
          this.scriptBloodBar = null;

          this._refreshSkill();

          this.scriptMonsterModel.scriptMonster = this;
          this.curAttackSpeed = this.baseInfo.attackSpeed;
          this.curMoveSpeed = this.baseInfo.moveSpeed;

          this._getMinLength();
        }
        /**
         * 获取怪物和玩家之间的最小距离
         *
         * @memberof Monster
         */


        _getMinLength() {
          if (this.node.name === "aula") {
            this._minLength = 2;
          } else if (this.node.name === "boomDragon") {
            this._minLength = 2;
          } else if (this.node.name === "hellFire") {
            this._minLength = 2.5;
          } else if (this.node.name === "magician") {
            this._minLength = 2.5;
          } else if (this.node.name === "dragon") {
            this._minLength = 5;
          }
        }
        /**
         * 刷新当前使用技能
         *
         * @private
         * @memberof Monster
         */


        _refreshSkill() {
          this.allSkillInfo = this.layerInfo.skill === "" ? [] : this.layerInfo.skill.split("#");

          if (this.allSkillInfo.length) {
            this._skillIndex = this._skillIndex >= this.allSkillInfo.length ? 0 : this._skillIndex;
            let skillID = this.allSkillInfo[this._skillIndex];
            this.skillInfo = LocalConfig.instance.queryByID("monsterSkill", skillID);
            this._skillIndex += 1;
          }
        }
        /**
         * 怪物阵亡
         *
         * @memberof Monster
         */


        showDie() {
          this.scriptCharacterRigid.stopMove();
          this.recycleWarning();
          AudioManager.instance.playSound(`${this.node.name}Die`);
          let sound = '';

          if (this.node.name === "aula") {
            sound = Constant.SOUND.AULA_DIE;
          } else if (this.node.name === "boomDragon") {
            sound = Constant.SOUND.BOOM_DRAGON_DIE;
          } else if (this.node.name === "hellFire") {
            sound = Constant.SOUND.HELL_FIRE_DIE;
          } else if (this.node.name === "magician") {
            sound = Constant.SOUND.MAGICIAN_DIE;
          } else if (this.node.name === "dragon") {
            sound = Constant.SOUND.DRAGON_DIE;
          }

          AudioManager.instance.playSound(sound);
          EffectManager.instance.showRewardBounce(this.node, "gold/gold", this.baseInfo.goldNum, () => {
            if (this.baseInfo.heartDropRate >= Math.random()) {
              EffectManager.instance.showRewardBounce(this.node, "heart/heart", 1);
            }
          }); //检查玩家是否拥有嗜血技能：主角击杀敌人时回复自身生命上限2%的生命值。

          if (GameManager.scriptPlayer.isBloodthirsty) {
            let bloodNum = GameManager.scriptPlayer.curHpLimit * 0.02;
            GameManager.scriptPlayer.addBlood(bloodNum);
          }

          this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.DIE, false, () => {
            if (this.isDie) {
              this.scriptBloodBar = null;
              PoolManager.instance.putNode(this.node);
            }
          });
        }

        recycleWarning() {
          //回收预警节点
          if (this.scriptWarning) {
            if (this.scriptWarning.node.parent) {
              PoolManager.instance.putNode(this.scriptWarning.node);
            }

            this.scriptWarning = null;
          }
        }
        /**
         * 怪物播放受击效果
         *
         * @param {boolean} isArrowLaunch 是否被弹射的弓箭射中，如果是则造成普通伤害
         * @param {boolean} isPassiveLightning 是否被动受到电击
         * @return {*} 
         * @memberof Monster
         */


        playHit(isArrowLaunch = false, isPassiveLightning = false) {
          if (this.isDie) {
            return;
          }

          AudioManager.instance.playSound(Constant.SOUND.HIT_MONSTER); //播放受击特效

          let effectPath = "hit/hit";
          let arrEffectPath = [];
          let recycleTime = 1.2;
          let isHasIce = GameManager.scriptPlayer.isArrowIce;
          let isHasFire = GameManager.scriptPlayer.isArrowFire;
          let isHasLightning = GameManager.scriptPlayer.isArrowLightning;

          if (isHasFire || isHasIce || isHasLightning) {
            if (isHasFire && isHasIce && isHasLightning) {
              arrEffectPath = ["hit/hitFire", "hit/hitIce", "hit/hitLightning"];
            } else {
              if (isHasFire && isHasIce || isHasFire && isHasLightning || isHasIce && isHasLightning) {
                if (isHasFire && isHasIce) {
                  arrEffectPath = ["hit/hitFire", "hit/hitIce"];
                } else if (isHasLightning && isHasFire) {
                  arrEffectPath = ["hit/hitFire", "hit/hitLightning"];
                } else if (isHasLightning && isHasIce) {
                  arrEffectPath = ["hit/hitIce", "hit/hitLightning"];
                }
              } else {
                if (isHasFire) {
                  arrEffectPath = ["hit/hitFire"];
                } else if (isHasIce) {
                  arrEffectPath = ["hit/hitIce"];
                } else if (isHasLightning) {
                  arrEffectPath = ["hit/hitLightning"];
                }
              }
            }

            effectPath = arrEffectPath[Math.floor(Math.random() * arrEffectPath.length)];

            if (effectPath === "hit/hitFire") {
              //灼烧技能持续2秒
              recycleTime = 2;
            } else if (effectPath === "hit/hitIce") {
              recycleTime = 1;
            } //被冰冻技能击中


            if (isHasIce && this._iceDamageCountDown <= 0) {
              this._iceDamageCountDown = 1;
            } //被灼烧技能击中


            if (isHasFire && this._fireDamageCountDown <= 0) {
              this._fireDamageCountDown = 2;
            }
          }

          EffectManager.instance.loadAndPlayEffect(true, this.node, effectPath, 1, this._hitEffectPos, null, false, true, GameManager.gameSpeed, true, recycleTime); //攻击的时候霸体状态

          if (!this.scriptMonsterModel.isAttacking) {
            this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.HIT);
          } //受到攻击的敌人会向身旁一定范围内的所有敌人发射闪电，减少生命上限5%的生命值


          if (GameManager.scriptPlayer.isArrowLightning && !isPassiveLightning) {
            let arrTargets = GameManager.getNearbyMonster(this.node, true);

            if (arrTargets) {
              arrTargets.forEach(ndChild => {
                EffectManager.instance.showLightningChain(this.node, ndChild);
                let scriptMonster = ndChild.getComponent(Monster);
                scriptMonster.playHit(false, true);
              });
            }
          } //怪物扣血


          if (Math.random() > this.baseInfo.dodgeRate) {
            //闪避失败
            let tipType = Constant.FIGHT_TIP.REDUCE_BLOOD;
            let damage = GameManager.scriptPlayer.curAttackPower * (1 - this.baseInfo.defensePower * GameManager.defenseAddition / (this.baseInfo.defensePower + 400));
            let isCriticalHit = Math.random() <= GameManager.scriptPlayer.curCriticalHitRate; //是否暴击
            //是否暴击

            if (isCriticalHit) {
              //不是被弹射的箭击中，且不是被动受到电击
              if (!isArrowLaunch && !isPassiveLightning) {
                damage = damage * GameManager.scriptPlayer.curCriticalHitDamage;
                tipType = Constant.FIGHT_TIP.CRITICAL_HIT;
              }
            }

            if (isPassiveLightning) {
              damage = this.baseInfo.hp * 0.05 * (1 - this.baseInfo.defensePower / (this.baseInfo.defensePower + 400));
            }

            this.refreshBlood(-damage, tipType);
          }
        }
        /**
         * 刷新血量
         *
         * @private
         * @param {number} bloodNum
         * @memberof Monster
         */


        refreshBlood(bloodNum, tipType) {
          let cb = () => {
            this.scriptBloodBar.refreshBlood(bloodNum);
            UIManager.instance.showBloodTips(this, tipType, bloodNum, this._bloodTipOffsetPos);
          };

          this._curAttackInterval = 0;

          if (!this._isInitBloodBar) {
            this._isInitBloodBar = true;
            console.log("###小怪生成新的血条", this.node.name);
            UIManager.instance.showMonsterBloodBar(this, this.baseInfo.hp, () => {
              cb();
            });
          } else {
            if (this.scriptBloodBar) {
              this.scriptBloodBar.node.active = true;
              cb();
            }
          }
        }
        /**
         * 怪物行为
         *
         * @param {*} obj
         * @memberof Player
         */


        playAction(obj) {
          this._action = obj.action;

          switch (obj.action) {
            case Constant.MONSTER_ACTION.MOVE:
              //向目标位置移动
              let angle = obj.value + 135;
              let radian = angle * macro.RAD;
              this._horizontal = Math.round(Math.cos(radian) * 1);
              this._vertical = Math.round(Math.sin(radian) * 1);
              this._curAngleY = obj.value;
              this._curAngleY = this._curAngleY < 0 ? this._curAngleY + 360 : this._curAngleY > 360 ? this._curAngleY - 360 : this._curAngleY;
              this.isMoving = true;
              break;

            case Constant.MONSTER_ACTION.STOP_MOVE:
              //停止移动，原地转向玩家，攻击玩家
              let angle_1 = obj.value + 135;
              let radian_1 = angle_1 * macro.RAD;
              this._horizontal = Math.round(Math.cos(radian_1) * 1);
              this._vertical = Math.round(Math.sin(radian_1) * 1);
              this._curAngleY = obj.value;
              this._curAngleY = this._curAngleY < 0 ? this._curAngleY + 360 : this._curAngleY > 360 ? this._curAngleY - 360 : this._curAngleY;
              this.isMoving = false;
              this.scriptCharacterRigid.stopMove();

              if (GameManager.ndPlayer) {
                this._attackPlayer();
              } else {
                this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.IDLE, true);
              }

              break;
          }
        }
        /**
         * 攻击玩家
        */


        _attackPlayer() {
          if (GameManager.scriptPlayer.isDie || this.scriptMonsterModel.isAttacking) {
            return;
          }

          Vec3.subtract(this._offsetPos_2, GameManager.ndPlayer.worldPosition, this.node.worldPosition);

          let length = this._offsetPos_2.length();

          this.attackForward = this._offsetPos_2.normalize().negative();
          this.attackForward.y = 0;
          this.attackPos.set(GameManager.ndPlayer.worldPosition); //预警

          if (this.allSkillInfo.length && this.skillInfo && this.skillInfo.warning) {
            let scale = 1;

            if (this.skillInfo.ID === Constant.MONSTER_SKILL.FIRE_BALL) {
              scale = 0.1;
            } else if (this.skillInfo.ID === Constant.MONSTER_SKILL.FIRE_BALL_BIG) {
              scale = 0.4;
            } else if (this.skillInfo.ID === Constant.MONSTER_SKILL.LASER) {
              scale = 3;
            } else if (this.skillInfo.ID === Constant.MONSTER_SKILL.ENERGY_BALL) {
              scale = length;
            } //回收预警节点


            this.recycleWarning();
            EffectManager.instance.showWarning(this.skillInfo.warning, scale, this, () => {
              this.playAttackAni();
            });
          } else {
            this.playAttackAni();
          }
        }
        /**
         * 播放攻击动画
         *
         * @protected
         * @memberof Monster
         */


        playAttackAni() {
          let attackAniName = Constant.MONSTER_ANI_TYPE.ATTACK;

          if (this.baseInfo.resName === "hellFire") {
            //hellFire的攻击动画有两个，其他小怪动画只有一个
            if (!this.allSkillInfo.length) {
              //近战
              attackAniName = Constant.MONSTER_ANI_TYPE.ATTACK_1;
            } else {
              //远程
              attackAniName = Constant.MONSTER_ANI_TYPE.ATTACK_2;
            }
          } //远程


          if (this.allSkillInfo.length) {
            this.scriptMonsterModel.playAni(attackAniName, false, () => {
              if (!this.isDie && !this.scriptMonsterModel.isHitting) {
                this.scheduleOnce(() => {
                  this._monsterMove();
                }, this.baseInfo.moveFrequency);
              }
            });
          } else {
            //近战
            let offsetLength = Util.getTwoNodeXZLength(this.node, GameManager.ndPlayer);

            if (offsetLength <= this._minLength * this._minLengthRatio) {
              this.scriptMonsterModel.playAni(attackAniName, false, () => {
                if (!this.isDie && !this.scriptMonsterModel.isHitting) {
                  this.scheduleOnce(() => {
                    this._monsterMove();
                  }, this.baseInfo.moveFrequency);
                }
              });
            } else {
              if (!this.isDie && !this.scriptMonsterModel.isHitting) {
                this.scheduleOnce(() => {
                  this._monsterMove();
                }, this.baseInfo.moveFrequency);
              }
            }
          }
        }
        /**
         * 移动到随机位置
         *
         * @private
         * @memberof Monster
         */


        _moveToRandomPos() {
          this._randomMoveTryTimes -= 1; //随机移动：先以怪物圆环区间(1, minLength)随机移动,再朝向玩家,然后攻击

          let x = Util.getRandom(1, 3) * Util.getRandomDirector();
          let z = Util.getRandom(1, 3) * Util.getRandomDirector();

          this._targetWorPos.set(Util.toFixed(this.node.worldPosition.x + x), Util.toFixed(this.node.worldPosition.y), Util.toFixed(this.node.worldPosition.z + z));

          let offsetLength = Util.getTwoPosXZLength(this._targetWorPos.x, this._targetWorPos.z, GameManager.ndPlayer.worldPosition.x, GameManager.ndPlayer.worldPosition.z); //当目标位置和玩家大于最小距离，进行移动

          if (offsetLength > this._minLength) {
            Vec3.subtract(this._offsetPos, this._targetWorPos, this.node.worldPosition);
            this._offsetPos.y = 0;
            Vec3.normalize(this._moveUnit, this._offsetPos);

            this._moveToTargetWorPos(this._targetWorPos);

            this.isMoving = true;
            this._isArrived = false;
          } else {
            //否则尝试5次随机移动，都没合适的位置则进行进攻
            if (this._randomMoveTryTimes <= 0) {
              this._stayRotateAttack();
            } else {
              this._moveToRandomPos();
            }
          }
        }
        /**
         * 先移动
         *
         * @private
         * @memberof Monster
         */


        _monsterMove() {
          if (this.isDie) {
            return;
          }

          if (!this._isAllowToAttack) {
            this._isAllowToAttack = true;
          }

          if (this._movePattern === Constant.MONSTER_MOVE_PATTERN.NO_MOVE) {
            //不移动，原地攻击玩家
            this._stayRotateAttack();
          } else if (this._movePattern === Constant.MONSTER_MOVE_PATTERN.RANDOM) {
            this._randomMoveTryTimes = 5;

            this._moveToRandomPos();
          } else if (this._movePattern === Constant.MONSTER_MOVE_PATTERN.FORWARD_PLAYER) {
            //面向玩家移动：先面向玩家，再移动，然后攻击
            this._moveToTargetWorPos(GameManager.ndPlayer.worldPosition);

            Vec3.subtract(this._offsetPos, GameManager.ndPlayer.worldPosition, this.node.worldPosition);
            this._offsetPos.y = 0;
            let offsetLength = Util.getTwoNodeXZLength(this.node, GameManager.ndPlayer); //当怪物和玩家小于2个最小距离之和或者大于一个最小距离且小于两个最小距离，进行移动

            if (offsetLength > this._minLength * 2 || offsetLength > this._minLength && offsetLength < this._minLength * 2) {
              //单位向量
              Vec3.normalize(this._moveUnit, this._offsetPos);
              Vec3.multiplyScalar(this._offsetPos, this._moveUnit, this._minLength);

              if (offsetLength > this._minLength * 2) {
                //向玩家移动2个单位向量
                Vec3.add(this._targetWorPos, this.node.worldPosition, this._offsetPos);
              } else {
                Vec3.subtract(this._targetWorPos, GameManager.ndPlayer.worldPosition, this._offsetPos);
              }

              this._targetWorPos.set(Util.toFixed(this._targetWorPos.x), Util.toFixed(this.node.worldPosition.y), Util.toFixed(this._targetWorPos.z));

              this._isArrived = false;
              this.isMoving = true;
            } else {
              //与玩家相距小于等于最小距离，怪物原地进行攻击
              this._stayRotateAttack();
            }
          }
        }
        /**
         * 怪物向目标位置移动
         *
         * @private
         * @memberof Monster
         */


        _moveToTargetWorPos(targetWorPos) {
          let angleY = this._getTwoPosAngleY(this.node.worldPosition, targetWorPos);

          this.playAction({
            action: Constant.MONSTER_ACTION.MOVE,
            value: angleY
          });
        }

        _getTwoPosAngleY(selfWorPos, targetWorPos) {
          var _GameManager$mainCame, _GameManager$mainCame2;

          let targetScreenPos = (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.worldToScreen(targetWorPos);
          let selfScreenPos = (_GameManager$mainCame2 = GameManager.mainCamera) === null || _GameManager$mainCame2 === void 0 ? void 0 : _GameManager$mainCame2.worldToScreen(selfWorPos);
          Vec3.subtract(this._playerMonsterOffset, targetScreenPos, selfScreenPos);
          let angleY = Math.round(Math.atan2(this._playerMonsterOffset.y, this._playerMonsterOffset.x) * 180 / Math.PI);
          return angleY;
        }
        /**
         * 怪物原地不动-旋转角度朝向玩家-攻击玩家
         *
         * @protected
         * @memberof Monster
         */


        _stayRotateAttack() {
          let angleY = this._getTwoPosAngleY(this.node.worldPosition, GameManager.ndPlayer.worldPosition);

          this.playAction({
            action: Constant.MONSTER_ACTION.STOP_MOVE,
            value: angleY
          });
        }
        /**
         * 向玩家释放技能
         *
         * @returns
         * @memberof Player
         */


        releaseSkillToPlayer(isNormalAttack) {
          //没有技能则使用近战
          if (!this.allSkillInfo.length) {
            let offsetLength = Util.getTwoNodeXZLength(this.node, GameManager.ndPlayer);

            if (offsetLength <= this._minLength * this._minLengthRatio) {
              GameManager.scriptPlayer.reduceBlood(this.baseInfo);
            }

            return;
          } //加载对应技能


          ResourceUtil.loadEffectRes(`${this.skillInfo.resName}/${this.skillInfo.resName}`).then(prefab => {
            if (this.isMoving) {
              return;
            }

            this._ndMonsterSkill = PoolManager.instance.getNode(prefab, GameManager.ndGameManager);

            this._ndMonsterSkill.setWorldPosition(this.node.worldPosition.x, 2.5, this.node.worldPosition.z);

            this._ndMonsterSkill.forward = this.attackForward.negative();
            let scriptSkillCollider = null; //怪物技能初始化

            switch (this.skillInfo.ID) {
              case Constant.MONSTER_SKILL.ENERGY_BALL:
                scriptSkillCollider = this._ndMonsterSkill.getComponent(EnergyBall);
                scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                break;

              case Constant.MONSTER_SKILL.FIRE_BALL:
                scriptSkillCollider = this._ndMonsterSkill.getComponent(FireBall);
                scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                break;

              case Constant.MONSTER_SKILL.DISPERSION:
                this._ndMonsterSkill.children.forEach((ndChild, idx) => {
                  let scriptSkillCollider = ndChild.getComponent(Dispersion);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo);
                });

                break;

              case Constant.MONSTER_SKILL.TORNADO:
                scriptSkillCollider = this._ndMonsterSkill.getComponent(Tornado);
                scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                break;

              case Constant.MONSTER_SKILL.FIRE_BALL_BIG:
                scriptSkillCollider = this._ndMonsterSkill.getComponent(FireBallBig);
                scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                break;

              case Constant.MONSTER_SKILL.DISPERSION_SURROUND:
                this._ndMonsterSkill.children.forEach(ndChild => {
                  let scriptSkillCollider = ndChild.getComponent(DispersionSurround);
                  scriptSkillCollider.init(this.skillInfo, this.baseInfo);
                });

                break;

              case Constant.MONSTER_SKILL.LASER:
                scriptSkillCollider = this._ndMonsterSkill.getComponent(Laser);
                scriptSkillCollider.init(this.skillInfo, this.baseInfo, this);
                break;
            }

            this._refreshSkill();
          });
        }

        update(deltaTime) {
          if (!GameManager.isGameStart || GameManager.isGameOver || GameManager.isGamePause || this.isDie || !this._isAllowToAttack || !GameManager.scriptPlayer || GameManager.scriptPlayer.isDie) {
            return;
          } //3秒未被攻击则会隐藏血条


          if (!this._isHitByPlayer && this.scriptBloodBar) {
            this._curAttackInterval += deltaTime;

            if (this._curAttackInterval >= this._hideBloodCountDown && this.scriptBloodBar.node.active) {
              this.scriptBloodBar.node.active = false;
            }
          } //是否进行移动


          if (this.isMoving) {
            if (this._movePattern === Constant.MONSTER_MOVE_PATTERN.RANDOM) {
              //如果移动到目标位置就停止移动
              let offsetLength = Util.getTwoPosXZLength(this.node.worldPosition.x, this.node.worldPosition.z, this._targetWorPos.x, this._targetWorPos.z);
              let offsetTarget = 0.05; //爆炸龙的位移是跳，不容易精准到达目标位置,把达到范围适当增大

              if (this.baseInfo.resName === 'boomDragon') {
                offsetTarget = 0.5;
              }

              if (offsetLength <= offsetTarget && !this._isArrived) {
                // console.log("###随机移动，到达目标位置");
                this._isArrived = true;

                this._stayRotateAttack();
              }
            } else if (this._movePattern === Constant.MONSTER_MOVE_PATTERN.FORWARD_PLAYER) {
              let offsetLength = Util.getTwoPosXZLength(this.node.worldPosition.x, this.node.worldPosition.z, this._targetWorPos.x, this._targetWorPos.z);

              if (offsetLength <= 0.05 && !this._isArrived) {
                // console.log("###面向玩家移动，到达目标位置");
                // 进行攻击
                this._isArrived = true;

                this._stayRotateAttack();
              }
            }
          } //怪物旋转


          if (this._isPlayRotate) {
            //当前怪物角度
            this._tempAngle.set(this.node.eulerAngles);

            this._tempAngle.y = this._tempAngle.y < 0 ? this._tempAngle.y + 360 : this._tempAngle.y;

            if (this._curAngle.length() === 0) {
              this._curAngle.set(this._tempAngle);
            }

            this.node.eulerAngles = this._tempAngle; //第二个参数越小朝向越精确

            let isEqual = this._curAngle.equals(this._targetAngle, 0.01);

            if (!isEqual) {
              Vec3.lerp(this._curAngle, this._curAngle, this._targetAngle, 0.167);
              this.node.eulerAngles = this._curAngle;
            } else {
              this._isPlayRotate = false;
              this.node.eulerAngles = this._targetAngle;

              this._curAngle.set(0, 0, 0);
            }
          }

          if (this._horizontal !== 0 || this._vertical !== 0) {
            //计算出旋转角度
            this._rotateDirection.set(this._horizontal, 0, -this._vertical);

            this._rotateDirection = this._rotateDirection.normalize();
            Quat.fromViewUp(qt_0, this._rotateDirection);
            Quat.toEuler(v3_0, qt_0);
            v3_0.y = v3_0.y < 0 ? v3_0.y + 360 : v3_0.y;
            this._isPlayRotate = true; //设置当前怪物角度为正数

            this._curAngle_2.set(this.node.eulerAngles);

            if (this._curAngle_2.y < 0) {
              this._curAngle_2.y += 360;
              this.node.eulerAngles = this._curAngle_2; // 转为0~360
            } else if (this._curAngle_2.y > 360) {
              this._curAngle_2.y -= 360;
              this.node.eulerAngles = this._curAngle_2; // 转为0~360
            } //设置目标旋转角度


            if (!v3_0.equals(this.node.eulerAngles, 0.01)) {
              this._targetAngle.y = this._curAngleY + 225;
              this._targetAngle.y = this._targetAngle.y < 0 ? this._targetAngle.y + 360 : this._targetAngle.y > 360 ? this._targetAngle.y - 360 : this._targetAngle.y;
              this._targetAngle.x = 0;
              this._targetAngle.z = 0;

              if (Math.abs(this._targetAngle.y - this._curAngle_2.y) > 180) {
                if (this._targetAngle.y > this._curAngle_2.y) {
                  this._targetAngle.y -= 360;
                } else {
                  this._targetAngle.y += 360;
                }
              } //每次有新的_targetAngle之后，先将_curAngle初始化


              this._curAngle.set(0, 0, 0);
            } else {
              this._isPlayRotate = false;
              this.node.eulerAngles = v3_0;
            }

            if (!this.isMoving) {
              return;
            } //怪物朝着目标位置移动：


            if (this._movePattern !== Constant.MONSTER_MOVE_PATTERN.NO_MOVE) {
              this.scriptCharacterRigid.move(-this._moveUnit.x * this.curMoveSpeed * GameManager.moveSpeedAddition * 0.5 * deltaTime, -this._moveUnit.z * this.curMoveSpeed * GameManager.moveSpeedAddition * 0.5 * deltaTime);
            }

            if (!this.scriptMonsterModel.isRunning && this._movePattern !== Constant.MONSTER_MOVE_PATTERN.NO_MOVE && this._action !== Constant.MONSTER_ACTION.STOP_MOVE) {
              this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.RUN, true);
            }
          } else {
            if (!this.isDie && !this.scriptMonsterModel.isIdle && !this.scriptMonsterModel.isAttacking && !this.scriptMonsterModel.isHitting) {
              this.scriptMonsterModel.playAni(Constant.MONSTER_ANI_TYPE.IDLE, true);
              this.scriptCharacterRigid.stopMove();
            }
          } //冰冻持续降低攻击力和伤害


          if (this._iceDamageCountDown > 0) {
            this._iceDamageCountDown -= deltaTime;
            this.curAttackSpeed = this.baseInfo.attackSpeed * (1 - 0.1);
            this.curMoveSpeed = this.baseInfo.moveSpeed * (1 - 0.5);

            if (this._iceDamageCountDown <= 0) {
              this.curAttackSpeed = this.baseInfo.attackSpeed;
              this.curMoveSpeed = this.baseInfo.moveSpeed;
            }
          } //灼烧持续扣血


          if (this._fireDamageCountDown > 0) {
            this._fireDamageCountDown -= deltaTime;
            let countDown = Number(this._fireDamageCountDown.toFixed(2));
            countDown = countDown * 100 % 50;

            if (countDown === 0) {
              let bloodNum = this.baseInfo.hp * 0.05;
              this.refreshBlood(-bloodNum, Constant.FIGHT_TIP.REDUCE_BLOOD);
            }
          } //检查当前是否碰到障碍或者其他物体导致无法达到目标位置


          if (this._movePattern !== Constant.MONSTER_MOVE_PATTERN.NO_MOVE && !this._isArrived) {
            this._checkMoveInterval += deltaTime;

            if (this._checkMoveInterval >= 0.2) {
              this._checkMoveInterval = 0;
              let length = Util.getTwoPosXZLength(this._prevMoveWorPos.x, this._prevMoveWorPos.z, this.node.worldPosition.x, this.node.worldPosition.z);

              if (this.scriptMonsterModel.isRunning && length <= 0.01) {
                this._stayRotateAttack(); // console.log("###碰到障碍, 停止移动");

              } else {
                this._prevMoveWorPos.set(this.node.worldPosition);
              }
            }
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/resourceUtil.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, resources, error, Prefab, SpriteFrame, Texture2D, instantiate, find, isValid, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      error = module.error;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      instantiate = module.instantiate;
      find = module.find;
      isValid = module.isValid;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7844e1bOwZK+7JMYjENQU5v", "resourceUtil", undefined);

      const {
        ccclass
      } = _decorator;
      let ResourceUtil = exports('ResourceUtil', (_dec = ccclass("ResourceUtil"), _dec(_class = class ResourceUtil {
        /**
        * 加载资源
        * @param url   资源路径
        * @param type  资源类型
        * @param cb    回调
        * @method loadRes
        */
        static loadRes(url, type, cb = () => {}) {
          resources.load(url, (err, res) => {
            if (err) {
              error(err.message || err);
              cb(err, res);
              return;
            }

            cb && cb(null, res);
          });
        }
        /**
         * 获取特效prefab
         * @param modulePath 路径
         * @returns 
         */


        static loadEffectRes(modulePath) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/effect/${modulePath}`, Prefab, (err, prefab) => {
              if (err) {
                console.error('effect load failed', modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }
        /**
         * 获取模型数据
         * @param modulePath 模型路径
         * @returns 
         */


        static loadModelRes(modulePath) {
          return new Promise((resolve, reject) => {
            this.loadRes(`prefab/model/${modulePath}`, Prefab, (err, prefab) => {
              if (err) {
                console.error("model load failed", modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }
        /**
         * 获取多模型数据
         * @param path 资源路径
         * @param arrName 资源名称
         * @param progressCb 过程回调函数
         * @param completeCb 完成回调函数
         */


        static loadModelResArr(path, arrName, progressCb, completeCb) {
          let arrUrls = arrName.map(item => {
            return `${path}/${item}`;
          });
          resources.load(arrUrls, Prefab, progressCb, completeCb);
        }
        /**
         * 获取贴图资源
         * @param path 贴图路径
         * @returns 
         */


        static loadSpriteFrameRes(path) {
          return new Promise((resolve, reject) => {
            this.loadRes(path, SpriteFrame, (err, img) => {
              if (err) {
                console.error('spriteFrame load failed!', path, err);
                reject && reject();
                return;
              }

              let texture = new Texture2D();
              texture.image = img;
              let sf = new SpriteFrame();
              sf.texture = texture;
              resolve && resolve(sf);
            });
          });
        }
        /**
         * 获取关卡数据
         * @param level 关卡
         * @param cb 回调函数
         */


        static getMap(level, cb) {
          let levelStr = 'map'; //前面补0

          if (level >= 100) {
            levelStr += level;
          } else if (level >= 10) {
            levelStr += '0' + level;
          } else {
            levelStr += '00' + level;
          }

          this.loadRes(`map/config/${levelStr}`, null, (err, txtAsset) => {
            if (err) {
              cb(err, txtAsset);
              return;
            }

            let content = '';

            if (txtAsset._file) {
              //@ts-ignore
              if (window['LZString']) {
                //@ts-ignore
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset._file);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.text) {
              //@ts-ignore
              if (window['LZString']) {
                //@ts-ignore
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset.text);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.json) {
              cb(null, txtAsset.json);
            } else {
              cb('failed');
            }
          });
        }
        /**
         * 获取关卡数据
         * @param type 关卡类型
         * @param arrName 资源名称
         * @param progressCb 过程回调函数
         * @param completeCb 完成回调函数
         */


        static getMapObj(type, arrName, progressCb, completeCb) {
          let arrUrls = [];

          for (let idx = 0; idx < arrName.length; idx++) {
            arrUrls.push(`map/${type}/${arrName[idx]}`);
          }

          resources.load(arrUrls, Prefab, progressCb, completeCb);
        }
        /**
         * 获取UI prefab
         * @param prefabPath prefab路径 
         * @param cb 回调函数
         */


        static getUIPrefabRes(prefabPath, cb) {
          this.loadRes("prefab/ui/" + prefabPath, Prefab, cb);
        }
        /**
         * 创建ui界面
         * @param path ui路径
         * @param cb 回调函数
         * @param parent 父节点
         */


        static createUI(path, cb, parent) {
          this.getUIPrefabRes(path, function (err, prefab) {
            if (err) return;
            let node = instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);
            cb && cb(null, node);
          });
        }
        /**
         * 获取json数据
         * @param fileName 文件名
         * @param cb 回调函数 
         */


        static getJsonData(fileName, cb) {
          this.loadRes("datas/" + fileName, null, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            if (content.json) {
              cb(err, content.json);
            } else {
              cb('failed!!!');
            }
          });
        }
        /**
         * 获取文本数据
         * @param fileName 文件名
         * @param cb  回调函数
         */


        static getTextData(fileName, cb) {
          this.loadRes("datas/" + fileName, null, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            let text = content.text;
            cb(err, text);
          });
        }
        /**
         * 设置精灵贴图
         * @param path 资源路径
         * @param sprite 精灵
         * @param cb 回调函数
         */


        static setSpriteFrame(path, sprite, cb) {
          this.loadRes(path + '/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            if (err) {
              console.error('set sprite frame failed! err:', path, err);
              cb(err);
              return;
            }

            if (sprite && isValid(sprite)) {
              sprite.spriteFrame = spriteFrame;
              cb(null);
            }
          });
        }

      }) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gameCamera.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "7b36dlhjPBALJv1VQ9Wc7M+", "gameCamera", undefined);

      const {
        ccclass,
        property
      } = _decorator; //游戏相机脚本

      let GameCamera = exports('GameCamera', (_dec = ccclass('GameCamera'), _dec(_class = (_temp = class GameCamera extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "ndFollowTarget", null);

          _defineProperty(this, "_oriCameraWorPos", new Vec3());

          _defineProperty(this, "_targetCameraWorPos", new Vec3());

          _defineProperty(this, "_curCameraWorPos", new Vec3());
        } //目标相机世界坐标


        start() {
          this._oriCameraWorPos = this.node.worldPosition.clone();
        }

        resetCamera() {
          this._targetCameraWorPos.set(this._oriCameraWorPos);
        } // update (deltaTime: number) {
        //     // [4]
        // }


        lateUpdate() {
          if (!this.ndFollowTarget || !this.ndFollowTarget.worldPosition || !this.ndFollowTarget.active) {
            return;
          }

          this._targetCameraWorPos = this._targetCameraWorPos.lerp(this.ndFollowTarget.worldPosition, 0.5);

          this._curCameraWorPos.set(this._oriCameraWorPos.x + this._targetCameraWorPos.x, this._oriCameraWorPos.y, this._oriCameraWorPos.z + this._targetCameraWorPos.z);

          this.node.setWorldPosition(this._curCameraWorPos);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/migrate-canvas.ts", ['cc'], function () {
  'use strict';

  var cclegacy, director, Director, Canvas, Camera, game;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
      Director = module.Director;
      Canvas = module.Canvas;
      Camera = module.Camera;
      game = module.game;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7bb93gANKpA/5QU2qBaDZjt", "migrate-canvas", undefined);

      const customLayerMask = 0x000fffff;
      const builtinLayerMask = 0xfff00000;
      director.on(Director.EVENT_AFTER_SCENE_LAUNCH, () => {
        var _director$getScene, _director$getScene2, _director$getScene3;

        const roots = (_director$getScene = director.getScene()) === null || _director$getScene === void 0 ? void 0 : _director$getScene.children;
        let allCanvases = (_director$getScene2 = director.getScene()) === null || _director$getScene2 === void 0 ? void 0 : _director$getScene2.getComponentsInChildren(Canvas);
        if (allCanvases.length <= 1) return;
        allCanvases = allCanvases.filter(x => !!x.cameraComponent);
        let allCameras = (_director$getScene3 = director.getScene()) === null || _director$getScene3 === void 0 ? void 0 : _director$getScene3.getComponentsInChildren(Camera);
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

      let setParentEngine = cc.Node.prototype.setParent;

      cc.Node.prototype.setParent = function (value, keepWorldTransform) {
        setParentEngine.call(this, value, keepWorldTransform);
        if (!value) return; // find canvas

        let layer = getCanvasCameraLayer(this);

        if (layer) {
          this.layer = layer;
          setChildrenLayer(this, layer);
        }
      };

      function getCanvasCameraLayer(node) {
        let layer = null;
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

System.register("chunks:///_virtual/skillList.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './localConfig.ts', './playerData.ts', './skillIcon.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Prefab, _decorator, Component, PoolManager, Constant, LocalConfig, PlayerData, SkillIcon;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      SkillIcon = module.SkillIcon;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "7f904J+miVGoI/YxEAcqFJg", "skillList", undefined);

      const {
        ccclass,
        property
      } = _decorator; //技能列表脚本

      let SkillList = exports('SkillList', (_dec = ccclass('SkillList'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_temp = class SkillList extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "pbSkillIcon", _descriptor, this);
        }

        start() {// [3]
        }

        init(callback) {
          let arrUnLockSkill = PlayerData.instance.playerInfo.arrSkill.concat();
          this.node.children.forEach(ndChild => {
            ndChild.active = false;
          });

          if (arrUnLockSkill.length > Constant.MAX_SKILL_ICON_NUM) {
            arrUnLockSkill.length = Constant.MAX_SKILL_ICON_NUM;
          }

          arrUnLockSkill.forEach((skillInfo, idx) => {
            let ndChild;

            if (idx >= this.node.children.length) {
              ndChild = PoolManager.instance.getNode(this.pbSkillIcon, this.node);
            } else {
              ndChild = this.node.children[idx];
            }

            ndChild.active = true;
            let itemInfo = LocalConfig.instance.queryByID("playerSkill", arrUnLockSkill[idx]);
            let scriptSkillIcon = ndChild.getComponent(SkillIcon);
            scriptSkillIcon.init(idx, itemInfo, callback);
          });
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "pbSkillIcon", [_dec2], {
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

System.register("chunks:///_virtual/fireBall.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, PoolManager, ResourceUtil, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "90320FRD9ZBib7MUibgkbJA", "fireBall", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let FireBall = exports('FireBall', (_dec = ccclass('FireBall'), _dec(_class = (_temp = class FireBall extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "isPlayHitFireBall", false);

          _defineProperty(this, "groundWorPosY", 1.8);

          _defineProperty(this, "scriptWarning", null);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "_isAutoRotate", true);

          _defineProperty(this, "_posStart", new Vec3());

          _defineProperty(this, "_posEnd", new Vec3());

          _defineProperty(this, "_posOffset", new Vec3());

          _defineProperty(this, "_totalFlyTime", 0);

          _defineProperty(this, "_maxFlyHeight", 0);

          _defineProperty(this, "_curFlyTime", 0);

          _defineProperty(this, "_rotateCoolTime", 0);

          _defineProperty(this, "_posNextTarget", new Vec3());

          _defineProperty(this, "_scriptParent", null);

          _defineProperty(this, "_targetPos", new Vec3());
        } //目标位置


        start() {}
        /**
        * 初始化 
        */


        init(skillInfo, baseInfo, scriptParent) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          this._scriptParent = scriptParent;
          this._totalFlyTime = 0;
          this._maxFlyHeight = 0;
          this._curFlyTime = 0;

          this._posStart.set(this.node.worldPosition.x, this.groundWorPosY, this.node.worldPosition.z);

          this._posEnd.set(scriptParent.attackPos);

          Vec3.subtract(this._posOffset, this._posEnd, this._posStart);
          this._totalFlyTime = this._posOffset.length() / skillInfo.flySpeed;
          this._maxFlyHeight = this._totalFlyTime * 3; //最大飞行高度跟飞行距离成正比     

          this.isPlayHitFireBall = false;
          this.node.children.forEach(ndChild => {
            ndChild.active = true;
          });
          EffectManager.instance.playParticle(this.node);
          AudioManager.instance.playSound(Constant.SOUND.FIRE_BALL);
        }

        update(deltaTime) {
          if (!this.node.parent || !GameManager.ndPlayer || GameManager.isGameOver || GameManager.isGamePause) {
            return;
          } //向指定目标飞行


          if (this._totalFlyTime > 0 && this.node.parent) {
            if (this._curFlyTime < this._totalFlyTime) {
              this._curFlyTime += deltaTime;
              this._curFlyTime = this._curFlyTime >= this._totalFlyTime ? this._totalFlyTime : this._curFlyTime;
              let percent = Number((this._curFlyTime / this._totalFlyTime).toFixed(2)); //曲线飞行

              let height = this._maxFlyHeight * Math.cos(percent * Math.PI - Math.PI / 2);

              this._targetPos.set(this._posStart.x + this._posOffset.x * percent, this._posStart.y + height, this._posStart.z + this._posOffset.z * percent);

              this.node.setWorldPosition(this._targetPos);

              if (this._isAutoRotate) {
                this._rotateCoolTime -= deltaTime;

                if (this._rotateCoolTime < 0) {
                  this._rotateCoolTime = 0.1;
                  percent = Number(((this._curFlyTime + deltaTime) / this._totalFlyTime).toFixed(2));

                  if (percent < 1) {
                    //曲线飞行
                    height = this._maxFlyHeight * Math.cos(percent * Math.PI - Math.PI / 2);

                    this._posNextTarget.set(this._posStart.x + this._posOffset.x * percent, this._posStart.y + height, this._posStart.z + this._posOffset.z * percent);

                    this.node.forward = this._posNextTarget.subtract(this._targetPos).normalize();
                  }
                }
              } //小火球碰到地面


              if (Number(this.node.position.y.toFixed(2)) <= this.groundWorPosY && !this.isPlayHitFireBall && this._curFlyTime > 0) {
                var _this$_scriptParent$s;

                this.isPlayHitFireBall = true; //关闭预警

                (_this$_scriptParent$s = this._scriptParent.scriptWarning) === null || _this$_scriptParent$s === void 0 ? void 0 : _this$_scriptParent$s.hideWarning();
                this.node.children.forEach(ndChild => {
                  ndChild.active = false;
                }); //展示火焰爆炸

                ResourceUtil.loadEffectRes("hit/hitFireBall1").then(prefab => {
                  let ndEffect = PoolManager.instance.getNode(prefab, this.node);
                  ndEffect.setWorldPosition(this.node.worldPosition);
                  EffectManager.instance.playParticle(ndEffect, GameManager.gameSpeed, true, 1.1, () => {
                    PoolManager.instance.putNode(this.node);
                  });
                });
              }
            }
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loadingPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './uiManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, AnimationComponent, _decorator, Component, Constant, ClientEvent, UIManager, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      AnimationComponent = module.AnimationComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "951bd+IBg9Bz438MxpTOrH1", "loadingPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //加载界面脚本

      let LoadingPanel = exports('LoadingPanel', (_dec = ccclass('LoadingPanel'), _dec2 = property(AnimationComponent), _dec(_class = (_class2 = (_temp = class LoadingPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "aniCloud", _descriptor, this);

          _defineProperty(this, "_isShowOver", false);

          _defineProperty(this, "_isNeedHide", false);

          _defineProperty(this, "_showCb", null);

          _defineProperty(this, "_hideCb", null);
        }

        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.HIDE_LOADING_PANEL, this._hideLoadingPanel, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.HIDE_LOADING_PANEL, this._hideLoadingPanel, this);
        }

        start() {// [3]
        }

        show(callback) {
          this._isShowOver = false;
          this._isNeedHide = false;
          this._hideCb = null;
          this._showCb = callback;

          this._showLoadingPanel();
        }

        _hideLoadingPanel(callback) {
          this._hideCb = callback;
          this._isNeedHide = true;

          if (this._isShowOver) {
            GameManager.scriptGameCamera.resetCamera();
            this._hideCb && this._hideCb();
            this.aniCloud.getState("cloudAnimationOut").time = 0;
            this.aniCloud.getState("cloudAnimationOut").sample();
            this.aniCloud.play("cloudAnimationOut");
            this.aniCloud.once(AnimationComponent.EventType.FINISHED, () => {
              UIManager.instance.hideDialog("loading/loadingPanel");
              UIManager.instance.showDialog("fight/fightPanel", [this]);
            });
          }
        }

        _showLoadingPanel() {
          this.aniCloud.getState("cloudAnimationIn").time = 0;
          this.aniCloud.getState("cloudAnimationIn").sample();
          this.aniCloud.play("cloudAnimationIn");
          this.aniCloud.once(AnimationComponent.EventType.FINISHED, () => {
            this._showCb && this._showCb();
            this._isShowOver = true;

            if (this._isNeedHide) {
              this._hideLoadingPanel(this._hideCb);
            }
          });
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "aniCloud", [_dec2], {
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

System.register("chunks:///_virtual/settingPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './storageManager.ts', './audioManager.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteFrame, Node, _decorator, Component, Vec3, SpriteComponent, LabelComponent, profiler, Constant, StorageManager, AudioManager, UIManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      profiler = module.profiler;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "97ae7Pk189CwayAava/p+Ah", "settingPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //设置界面脚本

      let SettingPanel = exports('SettingPanel', (_dec = ccclass('SettingPanel'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = class SettingPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sfSelect", _descriptor, this);

          _initializerDefineProperty(this, "sfUnSelect", _descriptor2, this);

          _initializerDefineProperty(this, "ndBtnVibration", _descriptor3, this);

          _initializerDefineProperty(this, "ndBtnMusic", _descriptor4, this);

          _initializerDefineProperty(this, "ndBtnDebug", _descriptor5, this);

          _defineProperty(this, "_isMusicOpen", false);

          _defineProperty(this, "_isVibrationOpen", false);

          _defineProperty(this, "_isDebugOpen", false);

          _defineProperty(this, "_curDotPos", new Vec3());
        } //当前选中点的位置


        start() {// [3]
        }

        show() {
          var _StorageManager$insta, _StorageManager$insta2;

          this._isMusicOpen = AudioManager.instance.getAudioSetting(true);

          this._changeState(this.ndBtnMusic, this._isMusicOpen);

          this._isVibrationOpen = (_StorageManager$insta = StorageManager.instance.getGlobalData("vibration")) !== null && _StorageManager$insta !== void 0 ? _StorageManager$insta : true;

          this._changeState(this.ndBtnVibration, this._isVibrationOpen);

          this._isDebugOpen = (_StorageManager$insta2 = StorageManager.instance.getGlobalData("debug")) !== null && _StorageManager$insta2 !== void 0 ? _StorageManager$insta2 : false;

          this._changeState(this.ndBtnDebug, this._isDebugOpen);
        }

        _changeState(ndParget, isOpen) {
          var _ndDot$getChildByName;

          let spCom = ndParget.getComponent(SpriteComponent);
          let ndDot = ndParget.getChildByName("dot");
          let lbTxt = (_ndDot$getChildByName = ndDot.getChildByName("txt")) === null || _ndDot$getChildByName === void 0 ? void 0 : _ndDot$getChildByName.getComponent(LabelComponent);
          let ndDotPos = ndDot.position;

          if (isOpen) {
            spCom.spriteFrame = this.sfSelect;

            this._curDotPos.set(24, ndDotPos.y, ndDotPos.z);

            ndDot.setPosition(this._curDotPos);
            lbTxt.string = "开";
          } else {
            spCom.spriteFrame = this.sfUnSelect;

            this._curDotPos.set(-24, ndDotPos.y, ndDotPos.z);

            ndDot.setPosition(this._curDotPos);
            lbTxt.string = "关";
          }
        }

        onBtnVibrationClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._isVibrationOpen = !this._isVibrationOpen;

          this._changeState(this.ndBtnVibration, this._isVibrationOpen);

          StorageManager.instance.setGlobalData("vibration", this._isVibrationOpen);
        }

        onBtnMusicClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._isMusicOpen = !this._isMusicOpen;

          this._changeState(this.ndBtnMusic, this._isMusicOpen);

          if (this._isMusicOpen) {
            AudioManager.instance.openMusic();
            AudioManager.instance.openSound();
          } else {
            AudioManager.instance.closeMusic();
            AudioManager.instance.closeSound();
          }
        }

        onBtnDebugClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._isDebugOpen = !this._isDebugOpen;

          this._changeState(this.ndBtnDebug, this._isDebugOpen);

          StorageManager.instance.setGlobalData("debug", this._isDebugOpen);
          this._isDebugOpen === true ? profiler.showStats() : profiler.hideStats();
        }

        onBtnCloseClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("setting/settingPanel");
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfSelect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfUnSelect", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnVibration", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnMusic", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDebug", [_dec6], {
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

System.register("chunks:///_virtual/arrow.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './util.ts', './constant.ts', './monster.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, BoxColliderComponent, ParticleSystemComponent, math, Node, PoolManager, ResourceUtil, Util, Constant, Monster, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      BoxColliderComponent = module.BoxColliderComponent;
      ParticleSystemComponent = module.ParticleSystemComponent;
      math = module.math;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      Monster = module.Monster;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "9b706mx99ZI/ZmcpsAOpihz", "arrow", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Arrow = exports('Arrow', (_dec = ccclass('Arrow'), _dec(_class = (_temp = class Arrow extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "isAutoRotate", true);

          _defineProperty(this, "isArrowLaunch", false);

          _defineProperty(this, "_ndBody", null);

          _defineProperty(this, "_curSpeed", 0);

          _defineProperty(this, "_targetSpeed", 0);

          _defineProperty(this, "_oriPos", null);

          _defineProperty(this, "_oriEulerAngles", null);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_disappearRange", 25);

          _defineProperty(this, "_isLoadEffectOver", false);

          _defineProperty(this, "_isNeedShowEffect", false);

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_curEulerAngles", new Vec3());

          _defineProperty(this, "_oriForward", null);

          _defineProperty(this, "_curForward", new Vec3());

          _defineProperty(this, "_releaseWorPos", new Vec3());

          _defineProperty(this, "_offsetPos_1", new Vec3());

          _defineProperty(this, "_offsetPos_2", new Vec3());

          _defineProperty(this, "_cross", new Vec3());

          _defineProperty(this, "_colliderCom", null);
        } //


        onLoad() {
          this._colliderCom = this.node.getComponent(BoxColliderComponent);
        }

        onEnable() {
          this._colliderCom.on('onTriggerEnter', this._onTriggerEnterCb, this);
        }

        onDisable() {
          this._colliderCom.off('onTriggerEnter', this._onTriggerEnterCb, this);
        }

        start() {// [3]
        }
        /**
        * 初始化 
        */


        init(speed, releaseWorPos) {
          this._releaseWorPos.set(releaseWorPos);

          if (!this._ndBody) {
            this._ndBody = this.node.getChildByName("body");
          }

          this._isLoadEffectOver = false;
          this._isNeedShowEffect = false;
          this.isArrowLaunch = false;

          if (!this._oriPos) {
            this._oriPos = this.node.position.clone();
          }

          if (!this._oriEulerAngles) {
            this._oriEulerAngles = this.node.eulerAngles.clone();
          }

          if (!this._oriForward) {
            this._oriForward = this.node.forward.clone();
          }

          this.node.active = false;
          this.node.setPosition(this._oriPos);
          this.node.eulerAngles = this._oriEulerAngles;

          this._curForward.set(this._oriForward);

          this._targetSpeed = speed;
          this._curSpeed = speed * 0.5;

          this._ndBody.children.forEach(ndChild => {
            if (ndChild.name.startsWith("arrow")) {
              ndChild.active = false;
            }
          });

          let isHasIce = GameManager.scriptPlayer.isArrowIce;
          let isHasFire = GameManager.scriptPlayer.isArrowFire;
          let isHasLightning = GameManager.scriptPlayer.isArrowLightning; //根据玩家拥有的不同技能展示对应特效

          if (isHasFire || isHasIce || isHasLightning) {
            this._isNeedShowEffect = true;

            if (isHasFire && isHasIce && isHasLightning) {
              this._showTrail("arrowAll");
            } else {
              if (isHasFire && isHasIce || isHasFire && isHasLightning || isHasIce && isHasLightning) {
                if (isHasFire && isHasIce) {
                  this._showTrail("arrowFireIce");
                } else if (isHasLightning && isHasFire) {
                  this._showTrail("arrowLightningFire");
                } else if (isHasLightning && isHasIce) {
                  this._showTrail("arrowLightningIce");
                }
              } else {
                if (isHasFire) {
                  this._showTrail("arrowFire");
                } else if (isHasIce) {
                  this._showTrail("arrowIce");
                } else if (isHasLightning) {
                  this._showTrail("arrowLightning");
                }
              }
            }
          } else {
            //不展示特效
            this._ndBody.children.forEach(ndChild => {
              if (ndChild.name.startsWith("arrow")) {
                ndChild.active = false;
              }
            });

            this.node.active = true;
          }
        }
        /**
         * 展示箭的特效拖尾
         *
         * @private
         * @param {string} effectName
         * @memberof Arrow
         */


        _showTrail(effectName) {
          let ndTrail = this._ndBody.getChildByName(effectName);

          if (ndTrail) {
            ndTrail.active = true;
            this.node.active = true;
            this._isLoadEffectOver = true;
          } else {
            ResourceUtil.loadEffectRes(`arrow/${effectName}`).then(pf => {
              ndTrail = PoolManager.instance.getNode(pf, this._ndBody);
              this.node.active = true;
              this._isLoadEffectOver = true;
            });
          }
        }
        /**
         *  回收弓箭组，在weapon/arrow下
         *
         * @memberof Arrow
         */


        recycleArrowGroup() {
          if (this.node.parent) {
            PoolManager.instance.putNode(this.node.parent);
          }
        }
        /**
         * 击中目标,隐藏箭
         *
         * @memberof Arrow
         */


        hideArrow() {
          var _this$node$parent;

          if (!this.node.parent) {
            return;
          } //清除拖尾特效残留


          let arrParticle = this._ndBody.getComponentsInChildren(ParticleSystemComponent);

          arrParticle.forEach(item => {
            item.simulationSpeed = 1;
            item === null || item === void 0 ? void 0 : item.clear();
            item === null || item === void 0 ? void 0 : item.stop();
          });
          this.node.active = false; //如果弓箭组里所有的箭都隐藏了则回收整个弓箭组

          let isAllArrowHide = (_this$node$parent = this.node.parent) === null || _this$node$parent === void 0 ? void 0 : _this$node$parent.children.every(ndArrow => {
            return ndArrow.active === false;
          });

          if (isAllArrowHide) {
            this.recycleArrowGroup();
          }
        }
        /**
         * 箭弹射给一定范围内的某个敌人
         *
         * @param {Node} ndMonster
         * @memberof Arrow
         */


        playArrowLaunch(ndMonster) {
          this.isArrowLaunch = true;
          let arrTargets = GameManager.getNearbyMonster(ndMonster);

          if (arrTargets.length) {
            let ndTarget = arrTargets[0];

            this._offsetPos_1.set(this._releaseWorPos.x - this.node.worldPosition.x, 0, this._releaseWorPos.z - this.node.worldPosition.z);

            this._offsetPos_2.set(this.node.worldPosition.x - ndTarget.worldPosition.x, 0, this.node.worldPosition.z - ndTarget.worldPosition.z); //两个向量之间弧度


            let radian = Vec3.angle(this._offsetPos_1, this._offsetPos_2); //角度

            let angle = math.toDegree(radian); //叉乘

            Vec3.cross(this._cross, this._offsetPos_1, this._offsetPos_2); //判断正反角度

            if (this._cross.y > 0) {
              this._curEulerAngles.y = angle;
            } else {
              this._curEulerAngles.y = -angle;
            }

            this.node.eulerAngles = this._curEulerAngles;
          }
        }

        _onTriggerEnterCb(event) {
          // this._hitTarget(event.otherCollider, event.selfCollider);
          if (GameManager.isGameOver || !GameManager.isGameStart) {
            return;
          }

          let otherCollider = event.otherCollider;

          if (otherCollider.getGroup() === Constant.PHY_GROUP.OBSTACLE) {
            //箭碰到游戏中的障碍则回收
            let scriptArrow = this.node.getComponent(Arrow);
            scriptArrow.hideArrow();
          } else if (otherCollider.getGroup() === Constant.PHY_GROUP.MONSTER) {
            //箭碰到敌人
            let ndMonster = otherCollider.node;
            let scriptMonster = ndMonster.getComponent(Monster);
            let scriptArrow = this.node.getComponent(Arrow); //箭是否弹射

            if (GameManager.scriptPlayer.isArrowLaunch) {
              if (!scriptArrow.isArrowLaunch) {
                //第一次弹射
                scriptArrow.playArrowLaunch(ndMonster);
              } else {
                //第二次直接隐藏
                scriptArrow.hideArrow();
              }
            } else if (GameManager.scriptPlayer.isArrowPenetrate) ;else {
              scriptArrow.hideArrow();
            }

            scriptMonster.playHit(scriptArrow.isArrowLaunch); //龙被射到龙改变颜色

            if (ndMonster.name === "dragon") {
              //@ts-ignore
              scriptMonster.changeDragonMat();
            }
          }
        }

        update(deltaTime) {
          if (!this.node.parent || !GameManager.ndPlayer || GameManager.isGameOver || GameManager.isGamePause || this._isNeedShowEffect && !this._isLoadEffectOver) {
            return;
          } //朝forward方向飞行


          this._curSpeed = Util.lerp(this._targetSpeed, this._curSpeed, 0.25);

          this._targetWorPos.set(0, 0, -deltaTime * this._curSpeed);

          this.node.translate(this._targetWorPos, Node.NodeSpace.LOCAL);

          this._curWorPos.set(this.node.worldPosition); //超过玩家一定范围则隐藏


          Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

          if (this._offsetPos && this._offsetPos.length() >= this._disappearRange) {
            this.hideArrow();
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/login.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, game, assetManager, director, Constant;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      game = module.game;
      assetManager = module.assetManager;
      director = module.director;
    }, function (module) {
      Constant = module.Constant;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "9fc5fQI+hNKNpFq7t/f/YIY", "login", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let Login = exports('Login', (_dec = ccclass('Login'), _dec2 = property(Node), _dec(_class = (_class2 = (_temp = class Login extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndCanvas", _descriptor, this);
        }

        onEnable() {}

        onDisable() {}

        start() {
          console.log("login");
          game.addPersistRootNode(this.ndCanvas);
          Constant.LOGIN_TIME = Date.now();
          let bundleRoot = ["resources", "main"];
          let arr = []; //微信优化开屏加载性能
          //@ts-ignore

          if (window.wx) {
            bundleRoot.forEach(item => {
              let p = new Promise((resolve, reject) => {
                assetManager.loadBundle(item, function (err, bundle) {
                  if (err) {
                    return reject(err);
                  }

                  resolve(bundle);
                });
              });
              arr.push(p);
            });
            Promise.all(arr).then(() => {
              director.loadScene("fight", () => {}, () => {});
            });
          } else {
            director.loadScene("fight", () => {}, () => {});
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndCanvas", [_dec2], {
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

System.register("chunks:///_virtual/colliderItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './playerData.ts', './uiManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Enum, _decorator, Component, Quat, BoxColliderComponent, CylinderColliderComponent, CapsuleColliderComponent, MeshColliderComponent, PoolManager, Constant, PlayerData, UIManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      _decorator = module._decorator;
      Component = module.Component;
      Quat = module.Quat;
      BoxColliderComponent = module.BoxColliderComponent;
      CylinderColliderComponent = module.CylinderColliderComponent;
      CapsuleColliderComponent = module.CapsuleColliderComponent;
      MeshColliderComponent = module.MeshColliderComponent;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "a3c3eSoUrFKl5IFTQQGWnRd", "colliderItem", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      const COLLIDER_NAME = Enum({
        HEART_BIG: 1,
        //大爱心, 玩家吃到后增加生命上限
        WARP_GATE: 2,
        //传送门
        NPC_BUSINESS_MAN: 3,
        //NPC商人
        NPC_WISE_MAN: 4 //NPC智慧老头

      }); //管理游戏中若干碰撞器

      let ColliderItem = exports('ColliderItem', (_dec = ccclass('ColliderItem'), _dec2 = property({
        type: COLLIDER_NAME,
        displayOrder: 1
      }), _dec(_class = (_class2 = (_temp = _class3 = class ColliderItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "colliderName", _descriptor, this);

          _defineProperty(this, "colliderCom", null);

          _defineProperty(this, "ani", null);

          _defineProperty(this, "_curHeartBigQuat", new Quat());

          _defineProperty(this, "_timer", null);
        }

        set timer(obj) {
          if (this._timer) {
            clearTimeout(this._timer);
            this._timer = null;
          }
        } //定时器


        onLoad() {
          this.colliderCom = this.node.getComponent(BoxColliderComponent) || this.node.getComponent(CylinderColliderComponent) || this.node.getComponent(CapsuleColliderComponent) || this.node.getComponent(MeshColliderComponent);

          if (!this.colliderCom) {
            console.error("this node does not have collider component");
          }
        }

        onEnable() {
          if (this.colliderCom.isTrigger) {
            this.colliderCom.on('onTriggerEnter', this._onTriggerEnterCb, this);
          } else {
            this.colliderCom.on('onCollisionEnter', this._onCollisionEnterCb, this);
          }
        }

        onDisable() {
          if (this.colliderCom.isTrigger) {
            this.colliderCom.off('onTriggerEnter', this._onTriggerEnterCb, this);
          } else {
            this.colliderCom.off('onCollisionEnter', this._onCollisionEnterCb, this);
          }
        }

        start() {}
        /**
         * 初始化
         */


        init() {}

        _onTriggerEnterCb(event) {
          this._hitTarget(event.otherCollider, event.selfCollider);
        }

        _onCollisionEnterCb(event) {
          this._hitTarget(event.otherCollider, event.selfCollider);
        }

        _hitTarget(otherCollider, selfCollider) {
          if (GameManager.isGameOver || !GameManager.isGameStart) {
            return;
          } // console.log("getGroup", otherCollider.getGroup());


          if (otherCollider.getGroup() == Constant.PHY_GROUP.PLAYER && GameManager.ndPlayer) {
            switch (this.colliderName) {
              case COLLIDER_NAME.HEART_BIG:
                GameManager.scriptPlayer.addBlood(300);
                PoolManager.instance.putNode(this.node);
                GameManager.checkTriggerAll();
                break;

              case COLLIDER_NAME.WARP_GATE:
                GameManager.scriptPlayer.playAction({
                  action: Constant.PLAYER_ACTION.STOP_MOVE
                });
                GameManager.scriptPlayer.scriptCharacterRigid.stopMove();
                GameManager.ndPlayer.active = false;
                GameManager.isWin = true;
                break;

              case COLLIDER_NAME.NPC_BUSINESS_MAN:
                GameManager.isGamePause = true;
                GameManager.scriptPlayer.scriptCharacterRigid.stopMove();
                GameManager.scriptPlayer.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true);

                if (PlayerData.instance.isPlayerSkillAllUnlock) {
                  //防错
                  UIManager.instance.showTips("所有技能均已解锁");
                  PoolManager.instance.putNode(this.node);
                  GameManager.isGamePause = false;
                } else {
                  UIManager.instance.hideDialog("fight/fightPanel");
                  UIManager.instance.showDialog("shop/shopPanel", [() => {
                    GameManager.isGamePause = false;
                    PoolManager.instance.putNode(this.node);
                  }], () => {}, Constant.PRIORITY.DIALOG);
                }

                GameManager.checkTriggerAll();
                break;

              case COLLIDER_NAME.NPC_WISE_MAN:
                GameManager.isGamePause = true;
                GameManager.scriptPlayer.scriptCharacterRigid.stopMove();
                GameManager.scriptPlayer.scriptPlayerModel.playAni(Constant.PLAYER_ANI_TYPE.IDLE, true);

                if (PlayerData.instance.isPlayerSkillAllUnlock) {
                  UIManager.instance.showTips("所有技能均已解锁");
                  PoolManager.instance.putNode(this.node);
                  GameManager.isGamePause = false;
                } else {
                  UIManager.instance.hideDialog("fight/fightPanel");
                  UIManager.instance.showDialog("skill/skillPanel", [() => {
                    PoolManager.instance.putNode(this.node);
                    GameManager.isGamePause = false;
                  }], () => {}, Constant.PRIORITY.DIALOG);
                }

                GameManager.checkTriggerAll();
                break;
            }
          }
        }

        update(deltaTime) {
          if (GameManager.isGameOver || !GameManager.ndPlayer || !this.node.parent) {
            return;
          }

          if (this.colliderName === COLLIDER_NAME.HEART_BIG) {
            Quat.fromEuler(this._curHeartBigQuat, 0, 120 * deltaTime, 0);
            this.node.rotate(this._curHeartBigQuat);
          }
        }

      }, _defineProperty(_class3, "COLLIDER_NAME", COLLIDER_NAME), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "colliderName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return COLLIDER_NAME.HEART_BIG;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lodash.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "a40a4pGR6lCqo0coR1W4kAl", "lodash", undefined);

      const {
        ccclass
      } = _decorator;
      let Lodash = exports('Lodash', (_dec = ccclass("Lodash"), _dec(_class = (_temp = _class2 = class Lodash {
        /* class member could be defined like this */
        // dummy = '';

        /**
         * 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素
         * @param  {any} collection 一个用来迭代的集合
         * @param {Function} predicate 每次迭代调用的函数。
         * @returns 返回匹配元素，否则返回 undefined。
         */
        static find(collection, predicate) {
          var result;

          if (!Array.isArray(collection)) {
            collection = Lodash._toArray(collection);
          }

          result = collection.filter(predicate);

          if (result.length) {
            return result[0];
          }

          return undefined;
        }
        /**
         * 调用 iteratee 遍历 collection(集合) 中的每个元素
         * @param  {any} collection 一个用来迭代的集合
         * @param {Function} iteratee 每次迭代调用的函数。
         */


        static forEach(collection, iteratee) {
          if (!Array.isArray(collection)) {
            var array = Lodash._toArrayKey(collection);

            array.forEach(function (value, index, arr) {
              var key1 = value['key'];
              var value1 = value['value'];
              iteratee(value1, key1, collection);
            });
          } else {
            collection.forEach(iteratee);
          }
        }
        /**
         * 深度拷贝
         * @param {any} sObj 拷贝的对象
         * @returns 
         */


        static cloneDeep(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          let s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (let i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = Lodash.cloneDeep(sObj[i]);
            }
          }

          return s;
        }
        /**
         * 创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns {Array} 返回一个组成集合数组
         */


        static map(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = Lodash._toArray(collection);
          }

          let arr = [];
          collection.forEach(function (value, index, array) {
            arr.push(iteratee(value, index, array));
          });
          return arr;
        }
        /**
         * 
         * @param srcObj 
         * @returns 
         */


        static _toArrayKey(srcObj) {
          var resultArr = []; // to array

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push({
              key: key,
              value: srcObj[key]
            });
          }

          return resultArr;
        }

        static _toArray(srcObj) {
          let resultArr = []; // to array

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push(srcObj[key]);
          }

          return resultArr;
        }
        /**
         * 遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns 返回一个新的过滤后的数组。
         */


        static filter(collection, iteratees) {
          if (!Array.isArray(collection)) {
            collection = Lodash._toArray(collection);
          }

          return collection.filter(iteratees);
        }
        /**
         * 执行深比较来确定两者的值是否相等。
         * @param {any}x 
         * @param {any}y 
         * @returns {boolean} 如果 两个值完全相同，那么返回 true，否则返回 false。
         */


        static isEqual(x, y) {
          var in1 = x instanceof Object;
          var in2 = y instanceof Object;

          if (!in1 || !in2) {
            return x === y;
          }

          if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
          }

          for (var p in x) {
            var a = x[p] instanceof Object;
            var b = y[p] instanceof Object;

            if (a && b) {
              return Lodash.isEqual(x[p], y[p]);
            } else if (x[p] !== y[p]) {
              return false;
            }
          }

          return true;
        }
        /**
         * 接收一个要移除值的数组。
         * @param {Array} array 修改的数组
         * @param {Array} value 移除值的数组
         * @param  {Function} comparator comparator（比较器）调用每个元素。
         * @returns 
         */


        static pullAllWith(array, value, comparator) {
          value.forEach(function (item) {
            var res = array.filter(function (n) {
              return comparator(n, item);
            });
            res.forEach(function (item) {
              var index = array.indexOf(item);

              if (array.indexOf(item) !== -1) {
                array.splice(index, 1);
              }
            });
          });
          return array;
        }
        /**
         * 返回当前时间戳
         * @returns 
         */


        static now() {
          return Date.now();
        }
        /**
         * 接收一个要移除值的数组。
         * @param {Array} array 修改的数组
         * @param {Array} value 移除值的数组
         * @returns 
         */


        static pullAll(array, value) {
          value.forEach(function (item) {
            var index = array.indexOf(item);

            if (array.indexOf(item) !== -1) {
              array.splice(index, 1);
            }
          });
          return array;
        }
        /**
         * 从右到左遍历集合中每一个元素的。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         */


        static forEachRight(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = Lodash._toArray(collection);
          } //@ts-ignore


          for (var i = collection.length - 1; i >= 0; i--) {
            //@ts-ignore
            var ret = iteratee(collection[i]);
            if (!ret) break;
          }
        }
        /**
         * 检查字符串string是否以 target 开头。
         * @param {string} str 要检索的字符串。
         * @param {string}target  要检查的字符串。
         * @param {number}position 检索的位置。
         * @returns 
         */


        static startsWith(str, target, position) {
          str = str.substr(position);
          return str.startsWith(target);
        }
        /**
         * 检查字符串string是否以 target 结束。
         * @param {string} str 要检索的字符串。
         * @param {string}target  要检查的字符串。
         * @param {number}position 检索的位置。
         * @returns 
         */


        static endsWith(str, target, position) {
          str = str.substr(position);
          return str.endsWith(target);
        }
        /**
         * 移除数组中predicate（断言）返回为真值的所有元素
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns 
         */


        static remove(array, predicate) {
          var result = [];
          var indexes = [];
          array.forEach(function (item, index) {
            if (predicate(item)) {
              result.push(item);
              indexes.push(index);
            }
          });

          Lodash._basePullAt(array, indexes);

          return result;
        }

        static _basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          var lastIndex = length - 1;
          var previous;

          while (length--) {
            var index = indexes[length];

            if (length === lastIndex || index !== previous) {
              previous = index;
              Array.prototype.splice.call(array, index, 1);
            }
          }

          return array;
        }
        /**
         * 返回第一个通过 predicate 判断为真值的元素的索引值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @param {number} fromIndex 开始查找索引值
         * @returns 
         */


        static findIndex(array, predicate, fromIndex) {
          array = array.slice(fromIndex);
          var i;

          if (typeof predicate === "function") {
            for (i = 0; i < array.length; i++) {
              if (predicate(array[i])) {
                return i;
              }
            }
          } else if (Array.isArray(predicate)) {
            for (i = 0; i < array.length; i++) {
              var key = predicate[0];
              var vaule = true; //@ts-ignore

              if (predicate.length > 1) {
                vaule = predicate[1];
              }

              if (array[i][key] === vaule) {
                return i;
              }
            }
          } else {
            for (i = 0; i < array.length; i++) {
              if (array[i] === predicate) {
                return i;
              }
            }
          }

          return -1;
        }
        /**
         * 创建一个新数组，将array与任何数组 或 值连接在一起。
         * @returns 
         */


        static concat() {
          var length = arguments.length;

          if (!length) {
            return [];
          }

          var array = arguments[0];
          var index = 1;

          while (index < length) {
            array = array.concat(arguments[index]);
            index++;
          }

          return array;
        }
        /**
         * 检查 value 是否是原始Number数值型 或者 对象。
         * @param {any }value 
         * @returns 
         */


        static isNumber(value) {
          return typeof value === 'number';
        }
        /**
         * 返回首次 value 在数组array中被找到的 索引值
         * @param {Array}array 
         * @param {any}value 
         * @param {number} fromIndex 
         * @returns 
         */


        static indexOf(array, value, fromIndex) {
          array = array.slice(fromIndex);
          return array.indexOf(value);
        }
        /**
         * 将 array 中的所有元素转换为由 separator 分隔的字符串。
         * @param {any} array 要转换的数组
         * @param {string} separator 分隔元素。
         * @returns 
         */


        static join(array, separator) {
          if (array === null) return '';
          var result = '';
          array.forEach(function (item) {
            result += item + separator;
          });
          return result.substr(0, result.length - 1);
        }
        /**
         * 根据separator 拆分字符串string。
         * @param {string} str 要转换的数组
         * @param {RegExp|string} separator 分隔元素。
         * @param {number} limit 限制结果的数量。
         * @returns 
         */


        static split(str, separator, limit) {
          return str.split(separator, limit);
        }
        /**
         * 计算 array 中的最大值。 如果 array 是 空的或者假值将会返回 undefined。
         * @param {Array}array 
         * @returns 
         */


        static max(array) {
          if (array && array.length) {
            var result;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = array[0];
              } else if (result < array[i]) {
                result = array[i];
              }
            }

            return result;
          }

          return undefined;
        }
        /**
         * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
         * @param {Array}array : 要查询的数组。
         * @param {number}n 要去除的元素个数。
         * @returns 
         */


        static drop(array, n) {
          var length = array === null ? 0 : array.length;

          if (!length) {
            return [];
          }

          return array.slice(n);
        }
        /**
         * 将array递归为一维数组。
         * @param {Array} arr 
         * @returns 
         */


        static flattenDeep(arr) {
          return arr.reduce(function (prev, cur) {
            return prev.concat(Array.isArray(cur) ? Lodash.flattenDeep(cur) : cur);
          }, []);
        }
        /**
         * 创建一个去重后的array数组副本。使用了SameValueZero 做等值比较。只有第一次出现的元素才会被保留。
         * @param {Array} array 
         * @returns 
         */


        static uniq(array) {
          let result = [];
          array.forEach(function (item) {
            if (result.indexOf(item) === -1) {
              result.push(item);
            }
          });
          return result;
        }
        /**
         * 检查 value 是否是 NaN。
         * @param {any}value 
         * @returns 
         */


        static isNaN(value) {
          // An `NaN` primitive is the only value that is not equal to itself.
          // Perform the `toStringTag` check first to avoid errors with some
          // ActiveX objects in IE.
          return Lodash.isNumber(value) && value !== +value;
        }
        /**
         * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组
         * @param {Array}array 
         * @param {number}size 
         * @returns 
         */


        static chunk(array, size) {
          var length = array === null ? 0 : array.length;

          if (!length || size < 1) {
            return [];
          }

          var result = [];

          while (array.length > size) {
            result.push(array.slice(0, size));
            array = array.slice(size);
          }

          result.push(array);
          return result;
        }
        /**
         * 转换 value 为一个有限数字
         * @param {any} value 
         * @returns 
         */


        static toFinite(value) {
          var INFINITY = 1 / 0;
          var MAX_INTEGER = 1.7976931348623157e+308;

          if (!value) {
            return value === 0 ? value : 0;
          }

          value = Number(value);

          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }

          return value === value ? value : 0;
        }
        /**
         * 判断是否为对象
         * @param {any}value  
         * @returns {boolean}
         */


        static isObject(value) {
          var type = typeof value;
          return value !== null && (type === 'object' || type === 'function');
        }
        /**
         * 
         * @param value 
         * @returns 
         */


        static isLength(value) {
          return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= Lodash.MAX_SAFE_INTEGER;
        }

        static _isArrayLike(value) {
          return value !== null && Lodash.isLength(value.length)
          /*&& !isFunction(value)*/
          ;
        }
        /**
         * 返回数组总符合条件的最大值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回最大值
         */


        static maxBy(array, predicate) {
          if (array && array.length) {
            var result;
            var objResult;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result < array[i]) {
                result = array[i];
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }
        /**
         * 返回数组总符合条件的最小值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回最小值
         */


        static minBy(array, predicate) {
          if (array && array.length) {
            let result;
            let objResult;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result > array[i]) {
                result = predicate(array[i]);
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }
        /**
         * 返回复合迭代函数的总和
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回总和
         */


        static sumBy(collection, predicate) {
          let sum = 0;

          for (let key in collection) {
            //@ts-ignore
            sum += predicate(collection[key]);
          }

          return sum;
        }
        /**
         * 返回复合迭代函数的次数
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns {Object} 返回一个组成集合对象
         */


        static countBy(collection, predicate) {
          let objRet = {};

          for (let key in collection) {
            let value = predicate(key);

            if (objRet.hasOwnProperty(value)) {
              objRet[value] += 1;
            } else {
              objRet[value] = 1;
            }
          }

          return objRet;
        }

      }, _defineProperty(_class2, "MAX_SAFE_INTEGER", 9007199254740991), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/warningStrip.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, PoolManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "a816bqAQNtKtp+4XcORW3SO", "warningStrip", undefined);

      const {
        ccclass,
        property
      } = _decorator; //长条状预警脚本

      let WarningStrip = exports('WarningStrip', (_dec = ccclass('WarningStrip'), _dec(_class = (_temp = class WarningStrip extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_scriptParent", null);
        }

        start() {// [3]
        }

        init(scale, scriptParent) {
          scriptParent.recycleWarning();
          this._scriptParent = scriptParent;
          this.node.setWorldPosition(scriptParent.node.worldPosition.x, 2.5, scriptParent.node.worldPosition.z);
          this.node.forward = scriptParent.attackForward;
          this.node.setScale(1, 1, scale);
          this.showWarning();
        }

        showWarning() {}

        hideWarning() {
          PoolManager.instance.putNode(this.node);
        }

      }, _temp)) || _class));
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

System.register("chunks:///_virtual/sdkUtil.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './storageManager.ts', './playerData.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, sys, StorageManager, PlayerData;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a8753/f8aJIM6kpa2WkESB8", "sdkUtil", undefined);

      class SdkUtil {
        //平台
        //登录后会检查是否展示登录界面，而且只检查一次
        //是否正在播放广告
        //是否允许屏幕上下移动
        //是否允许屏幕缩放
        //未解锁日记
        //两次震动之间的间隔,AppActivity里面的震动间隔也是100
        //上次震动时间

        /**
           * 自定义事件统计
           *
           * @param {string} eventType
           * @param {object} objParams
           */
        static customEventStatistics(eventType, objParams) {
          eventType = eventType.toString();

          if (!objParams) {
            objParams = {};
          } // console.log({'eventType': eventType},{'objParams': objParams});


          objParams.isNewBee = PlayerData.instance.isNewBee;

          if (this.platform === 'wx') {
            //@ts-ignore
            if (window['wx'] && window['wx']['aldSendEvent']) {
              //@ts-ignore
              window.wx['aldSendEvent'](eventType, objParams);
            }
          } //@ts-ignore


          if (this.platform === 'cocos' && window.cocosAnalytics && window.cocosAnalytics.isInited()) {
            console.log("###统计", eventType, objParams); //@ts-ignore

            window.cocosAnalytics.CACustomEvent.onStarted(eventType, objParams);
          }
        }
        /**
         * 调用震动
         */


        static vibrateShort() {
          var _StorageManager$insta;

          let isEnableVibrate = (_StorageManager$insta = StorageManager.instance.getGlobalData("vibration")) !== null && _StorageManager$insta !== void 0 ? _StorageManager$insta : true;

          if (isEnableVibrate) {
            let now = Date.now();

            if (now - this.vibratePreTime >= this.vibrateInterval) {
              if (sys.isNative) {
                jsb.reflection.callStaticMethod("com/cocos/game/AppActivity", "vibrator", "()V"); //@ts-ignore
              } else if (window.wx) {
                //@ts-ignore
                wx.vibrateShort({
                  success: result => {},
                  fail: () => {},
                  complete: () => {}
                });
              }

              this.vibratePreTime = now;
            }
          }
        }
        /**
         * 微信分享
         * 
         * @static
         * @param {string} title
         * @param {string} imageUrl
         * @returns
         * @memberof SdkUtil
         */


        static shareGame(title, imageUrl) {
          //@ts-ignore
          if (!window.wx) {
            return;
          } //@ts-ignore


          wx.showShareMenu({
            withShareTicket: true,
            complete: () => {}
          }); //@ts-ignore

          if (wx.aldOnShareAppMessage) {
            //@ts-ignore
            wx.aldOnShareAppMessage(function () {
              // 用户点击了“转发”按钮
              return {
                title: title,
                imageUrl: imageUrl
              };
            });
          } else {
            //@ts-ignore
            wx.onShareAppMessage(function () {
              // 用户点击了“转发”按钮
              return {
                title: title,
                imageUrl: imageUrl
              };
            });
          }
        }

      }

      exports('SdkUtil', SdkUtil);

      _defineProperty(SdkUtil, "platform", 'cocos');

      _defineProperty(SdkUtil, "imgAd", null);

      _defineProperty(SdkUtil, "imgShare", null);

      _defineProperty(SdkUtil, "isDebugMode", false);

      _defineProperty(SdkUtil, "onlineInterval", -1);

      _defineProperty(SdkUtil, "isEnableVibrate", true);

      _defineProperty(SdkUtil, "isCheckOffline", false);

      _defineProperty(SdkUtil, "isWatchVideoAd", false);

      _defineProperty(SdkUtil, "isEnableMoving", false);

      _defineProperty(SdkUtil, "isEnableZoom", false);

      _defineProperty(SdkUtil, "arrLockDiary", []);

      _defineProperty(SdkUtil, "vibrateInterval", 100);

      _defineProperty(SdkUtil, "vibratePreTime", 0);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tips.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, LabelComponent, SpriteComponent, UIOpacityComponent, SpriteFrame, _decorator, Component, Vec3, UITransformComponent, isValid, Color, tween, PoolManager, Util;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      LabelComponent = module.LabelComponent;
      SpriteComponent = module.SpriteComponent;
      UIOpacityComponent = module.UIOpacityComponent;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      UITransformComponent = module.UITransformComponent;
      isValid = module.isValid;
      Color = module.Color;
      tween = module.tween;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "a91d7M56W1FG4vm4cXb+REy", "tips", undefined);

      const {
        ccclass,
        property
      } = _decorator; //提示脚本

      let tips = exports('tips', (_dec = ccclass('tips'), _dec2 = property(LabelComponent), _dec3 = property(SpriteComponent), _dec4 = property(SpriteComponent), _dec5 = property(UIOpacityComponent), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec(_class = (_class2 = (_temp = class tips extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lbTips", _descriptor, this);

          _initializerDefineProperty(this, "spIcon", _descriptor2, this);

          _initializerDefineProperty(this, "spBg", _descriptor3, this);

          _initializerDefineProperty(this, "UIOpacityBg", _descriptor4, this);

          _initializerDefineProperty(this, "sfGold", _descriptor5, this);

          _initializerDefineProperty(this, "sfHeart", _descriptor6, this);

          _defineProperty(this, "_movePos", new Vec3());

          _defineProperty(this, "_curTipPos", new Vec3());

          _defineProperty(this, "_uiTipTargetPos", new Vec3(0, 230, 0));
        } //文字提示目标位置


        start() {}

        show(content, type, targetPos, scale, callback = () => {}) {
          var _this$lbTips, _this$lbTips$node, _this$lbTips$node$get;

          this.node.setScale(scale, scale, scale);
          let size = (_this$lbTips = this.lbTips) === null || _this$lbTips === void 0 ? void 0 : (_this$lbTips$node = _this$lbTips.node) === null || _this$lbTips$node === void 0 ? void 0 : (_this$lbTips$node$get = _this$lbTips$node.getComponent(UITransformComponent)) === null || _this$lbTips$node$get === void 0 ? void 0 : _this$lbTips$node$get.contentSize;

          if (!isValid(size)) {
            //size不存在，自我销毁
            PoolManager.instance.putNode(this.node);
            return;
          }

          this.lbTips.string = content;
          this.lbTips.color = new Color(214, 132, 53, 255);

          if (type === 'gold' || type === 'heart') {
            this.spBg.enabled = false;

            this._movePos.set(0, 0, 0);

            this._curTipPos.set(0, 0, 0);

            this.UIOpacityBg.opacity = 50;

            if (type === 'gold') {
              this.spIcon.spriteFrame = this.sfGold;
            } else if (type === 'heart') {
              this.spIcon.spriteFrame = this.sfHeart;
            }

            this.lbTips.color = new Color(255, 255, 255, 255);
            this.lbTips.string = Util.formatValue(Number(content));
            tween(this.node).to(1.2, {
              scale: new Vec3(scale, scale, scale)
            }, {
              easing: 'smooth'
            }).start();
            tween(this.UIOpacityBg).to(0.8, {
              opacity: 255
            }, {
              easing: 'smooth'
            }).to(0.4, {
              opacity: 0
            }, {
              easing: 'smooth'
            }).call(() => {
              callback && callback();
              PoolManager.instance.putNode(this.node);
            }).start();
          } else {
            //纯文字提示
            this.spBg.enabled = true;
            this.UIOpacityBg.opacity = 255;
            this.node.setPosition(targetPos);
            this.spIcon.node.active = false;
            this.scheduleOnce(() => {
              tween(this.node).to(1.1, {
                position: this._uiTipTargetPos
              }, {
                easing: 'smooth'
              }).call(() => {
                callback && callback();
                PoolManager.instance.putNode(this.node);
              }).start();
              tween(this.UIOpacityBg).to(0.7, {
                opacity: 220
              }, {
                easing: 'smooth'
              }).to(0.4, {
                opacity: 0
              }, {
                easing: 'smooth'
              }).call(() => {}).start();
            }, 0.8);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spBg", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "UIOpacityBg", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sfHeart", [_dec7], {
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

System.register("chunks:///_virtual/constant.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b08f08kiOlEA7e6qUWa7AnA", "constant", undefined);

      class Constant {}

      exports('Constant', Constant);

      _defineProperty(Constant, "GAME_NAME", 'archero');

      _defineProperty(Constant, "GAME_VERSION", '1.0.1');

      _defineProperty(Constant, "GAME_FRAME", 60);

      _defineProperty(Constant, "GAME_INIT_FRAME", 60);

      _defineProperty(Constant, "GAME_NAME_CH", "幽灵射手");

      _defineProperty(Constant, "LOCAL_CACHE", {
        PLAYER: 'player',
        //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
        SETTINGS: 'settings',
        //设置相关，所有杂项都丢里面进去
        DATA_VERSION: 'dataVersion',
        //数据版本
        ACCOUNT: 'account',
        //玩家账号
        // TMP_DATA: 'tmpData',             //临时数据，不会存储到云盘
        HISTORY: "history",
        //关卡通关数据
        BAG: "bag" //玩家背包，即道具列表，字典类型

      });

      _defineProperty(Constant, "SETTINGS_KEY", {
        FIGHT_TIMES: "fightTimes" //过关次数

      });

      _defineProperty(Constant, "PLAYER_ANI_TYPE", {
        IDLE: "idle",
        //待机
        RUN: "run",
        //向前跑
        ATTACK: "attack",
        //攻击
        DIE: "die",
        //死亡动作，后仰倒地
        REVIVE: "revive" //复活s

      });

      _defineProperty(Constant, "MONSTER_ANI_TYPE", {
        IDLE: "idle",
        //待机
        RUN: "run",
        //向前跑
        ATTACK: "attack",
        //攻击
        DIE: "die",
        //死亡动作，后仰倒地
        HIT: "hit",
        //受到打击(无)
        ATTACK_1: "attack1",
        //hellFire独有的攻击1
        ATTACK_2: "attack2" //hellFire独有的攻击2

      });

      _defineProperty(Constant, "PLAYER_ACTION", {
        MOVE: 1,
        STOP_MOVE: 2
      });

      _defineProperty(Constant, "MONSTER_ACTION", {
        MOVE: 1,
        STOP_MOVE: 2
      });

      _defineProperty(Constant, "PHY_GROUP", {
        DEFAULT: 1 << 0,
        //
        PLAYER: 1 << 1,
        //玩家
        COLLIDER_ITEM: 1 << 2,
        //碰撞器
        MONSTER: 1 << 3,
        //小怪
        REWARD: 1 << 4,
        //奖品
        MONSTER_SKILL_COLLIDER: 1 << 5,
        //怪物技能
        OBSTACLE: 1 << 6 //障碍

      });

      _defineProperty(Constant, "BLOOD_BAR", {
        PLAYER: 1,
        MONSTER: 2,
        BOSS: 3
      });

      _defineProperty(Constant, "EVENT_TYPE", {
        ATTACK_PLAYER: "attackPlayer",
        //攻击玩家
        CHANGE_SKIN: "changeSkin",
        //改变皮肤
        ON_GAME_INIT: "onInitGame",
        //监听游戏初始化
        ON_GAME_OVER: "onGameOver",
        //监听游戏结束
        ON_GAME_PAUSE: "onGamePause",
        //监听游戏暂停
        ON_REVIVE: "onRevive",
        //监听玩家复活
        REFRESH_DIAMOND: "refreshDiamond",
        //更新钻石
        REFRESH_GOLD: "refreshGold",
        //更新金币
        REFRESH_LEVEL: "refreshLevel",
        //刷新关卡
        REFRESH_BOSS_BLOOD: 'refreshBossBlood',
        //刷新boss血量
        RECYCLE_ALL: "recycleAll",
        //回收所有模型、特效
        REMOVE_NODE_GAME_START: "removeNodeGameStart",
        //隐藏“游戏初始化gameStart”界面节点
        HIDE_LOADING_PANEL: "hideLoadingPanel",
        //隐藏加载界面
        HIDE_BOSS_BLOOD_BAR: "hideBossBloodBar",
        //隐藏boss血条
        HIDE_SKILL_ICON_SELECTED: "hideSkillIconSelected",
        //隐藏其他技能图标选择
        HIDE_DEBUG_LEVEL_SELECTED: "hideDebugLevelSelected",
        //调试界面隐藏其他关卡选中状态
        HIDE_WARP_GATE: "hideWarpGate",
        //隐藏传送门
        SHOW_LOADING_PANEL: "showLoadingPanel",
        //展示加载界面
        SHOW_BOSS_BLOOD_BAR: "showBossBloodBar",
        //展示boss血条
        SHOW_WARP_GATE: "showWarpGate",
        //展示传送门
        INHALE_REWARD: "inhaleReward",
        //吸入奖品(金币、爱心)
        PARSE_PLAYER_SKILL: "parsePlayerSkill",
        //解析玩家技能
        MONSTER_MOVE: "monsterMove" //怪物开始移动

      });

      _defineProperty(Constant, "FIGHT_TIP", {
        ADD_BLOOD: 0,
        //加血
        REDUCE_BLOOD: 1,
        //扣血
        CRITICAL_HIT: 2 //暴击

      });

      _defineProperty(Constant, "PRIORITY", {
        ZERO: 0,
        //最底层
        BLOOD: 5,
        //血条
        BLOOD_TIP: 6,
        //血量提示
        BLOOD_CRITICAL_TIP: 7,
        //暴击血量提示
        NORMAL: 10,
        //普通界面
        DIALOG: 100,
        //弹窗的Z序
        REWARD: 200,
        //奖励的弹窗
        WAITING: 300,
        //等待界面弹窗
        TIPS: 400 //提示

      });

      _defineProperty(Constant, "BLOOD_TIP_DIRECTION", {
        MID_UP: 0,
        //中间向上
        LEFT_UP: 1,
        //左边向上
        RIGHT_UP: 2 //右边向上

      });

      _defineProperty(Constant, "OPEN_REWARD_TYPE", {
        AD: 0,
        SHARE: 1,
        NULL: 2
      });

      _defineProperty(Constant, "PLAYER_SKILL", {
        //箭形态变化技能
        ARROW_DOUBLE: "10101",
        //双重射击
        ARROW_CONTINUOUS: "10201",
        //连续射击
        ARROW_UMBRELLA: "10301",
        //伞型射击
        ARROW_REVERSE: "10401",
        //反向射击
        ARROW_SIDE: "10501",
        //侧面射击
        ARROW_PENETRATE: "10601",
        //穿透
        //数值变化技能
        RAISE_ATTACK_01: "20101",
        //攻击1
        RAISE_ATTACK_02: "20102",
        //攻击2
        RAISE_DODGE: "20201",
        //闪避
        RAISE_CRITICAL_HIT_DAMAGE_01: "20301",
        //暴击+爆伤1
        RAISE_CRITICAL_HIT_DAMAGE_02: "20302",
        //暴击+爆伤2
        RAISE_ATTACK_SPEED_01: "20401",
        //攻速提升1
        RAISE_ATTACK_SPEED_02: "20402",
        //攻速提升2
        RAISE_HP_LIMIT: "20501",
        //提升生命上限
        RECOVERY: "20601",
        //回复生命值
        MOVE_SPEED: "20701",
        //移动速度
        //buff变化技能
        ARROW_ICE: "30101",
        //冰冻
        ARROW_FIRE: "30201",
        //灼烧
        //触发技能
        ARROW_LIGHTNING: "40101",
        //闪电
        BLOODTHIRSTY: "40201",
        //嗜血
        ARROW_LAUNCH: "40301" //弹射

      });

      _defineProperty(Constant, "GAME_LEVEL_TYPE", {
        DARK_CASTLE: 1,
        //幽暗城堡
        HOT_HELL: 2 //炙热地狱

      });

      _defineProperty(Constant, "BASE", {
        PLAYER_01: "1001",
        AULA: "2001",
        BOOM_DRAGON: "2002",
        MAGICIAN: "2003",
        HELL_FIRE: "2004",
        BOSS_01: "3001",
        BLOOD_BAG: "4001",
        SHOP_NPC: "5001",
        SKILL_NPC: "6001"
      });

      _defineProperty(Constant, "BASE_TYPE", {
        PLAYER: "player",
        MONSTER: "monster",
        BOSS: "boss",
        HEART: "heart",
        NPC: "npc",
        OBSTACLE: "obstacle"
      });

      _defineProperty(Constant, "MAX_SKILL_ICON_NUM", 12);

      _defineProperty(Constant, "PLAYER_SKILL_USE", {
        FORM_CHANGE: "1",
        //形态
        VALUE: "2",
        //数值
        BUFF: "3",
        //buf
        TRIGGER: "4" //触发

      });

      _defineProperty(Constant, "MONSTER_SKILL", {
        ENERGY_BALL: "101",
        //能量球
        FIRE_BALL: "102",
        //小火球
        JET_FIRES: "103",
        //直线火焰
        DISPERSION: "104",
        //180度散射子弹
        TORNADO: "105",
        //s形龙卷风
        FIRE_BALL_BIG: "106",
        //大火团
        DISPERSION_SURROUND: "107",
        //360度六角散射
        LASER: "108" //直线激光

      });

      _defineProperty(Constant, "MONSTER_MOVE_PATTERN", {
        RANDOM: 1,
        //随机移动
        FORWARD_PLAYER: 2,
        //朝向玩家
        NO_MOVE: 3 //在原地，不移动

      });

      _defineProperty(Constant, "MONSTER_MOVE_MODE", {
        WALK: 1,
        //行走
        FLY: 2 //飞行

      });

      _defineProperty(Constant, "SOUND", {
        CLICK: "click",
        //按钮点击
        HOME_PANEL_CLICK: "homePanelClick",
        //主界面点击按钮
        AULA_DIE: "aulaDie",
        //死亡-蜘蛛
        BOOM_DRAGON_DIE: "boomDragonDie",
        //死亡-爆炸龙
        DRAGON_DIE: "dragonDie",
        //死亡-巨龙
        HELL_FIRE_DIE: "hellFireDie",
        //死亡-地狱火.
        MAGICIAN_DIE: "magicianDie",
        //死亡-法师
        PLAYER_01_DIE: "player01Die",
        //死亡-主角
        FOOT_STEP: ["footStep1", //脚步声1
        "footStep2" //脚步声2
        ],
        GOLD_DROP: "goldDrop",
        //金币掉落
        HIT_PLAYER: "hitPlayer",
        //主角受击
        HIT_MONSTER: 'hitMonster',
        //怪物受击
        SELL: "sell",
        //购买出售成功
        SHOW_WRAP_GATE: "showWarpGate",
        //展示传送门
        ENERGY_BALL: "energyBall",
        //技能-能量球
        TORNADO: "tornado",
        // 技能-龙卷风
        JET_FIRE: 'jetFire',
        //技能-直线范围火焰
        LASER: "laser",
        //技能-激光
        FIRE_BALL: 'fireBall',
        //小火球
        FIRE_BALL_BIG: "fireBallBig",
        //大火球
        REVIVE: "revive",
        //主角复活
        LOOSE: "loose",
        //主角射箭
        GET_SKILL: "getSkill",
        //主角技能获得
        ICE: "ice",
        //技能-冰冻
        RECOVERY: "recovery",
        //技能-生命恢复
        LIGHTNING: 'lightning',
        //技能-闪电
        FIRE: 'fire',
        //技能-火焰
        GOLD_COLLECT: "goldCollect" //金币收集
        // 技能-丢石头.mp3			

      });

      _defineProperty(Constant, "LOGIN_TIME", 0);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/dispersion.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, Node, PoolManager, Util, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "bac69sUZyxD3pVsY06Z2vf1", "dispersion", undefined);

      const {
        ccclass,
        property
      } = _decorator; //180度散射球脚本: 挂载每个球上, 不是挂在父节点上

      let Dispersion = exports('Dispersion', (_dec = ccclass('Dispersion'), _dec(_class = (_temp = class Dispersion extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "_curSpeed", 0);

          _defineProperty(this, "_targetSpeed", 0);

          _defineProperty(this, "_oriPos", null);

          _defineProperty(this, "_oriEulerAngles", null);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_disappearRange", 20);

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_oriScale", new Vec3());
        } //初始缩放大小


        start() {// [3]
        }
        /**
        * 初始化 
        */


        init(skillInfo, baseInfo) {
          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          this.node.active = true;

          if (!this._oriPos) {
            this._oriPos = this.node.position.clone();
          }

          if (!this._oriEulerAngles) {
            this._oriEulerAngles = this.node.eulerAngles.clone();
          }

          this.node.setPosition(this._oriPos);
          this.node.eulerAngles.set(this._oriEulerAngles);
          this._targetSpeed = skillInfo.flySpeed;
          this._curSpeed = skillInfo.flySpeed * 0.5;
          EffectManager.instance.playParticle(this.node);
          AudioManager.instance.playSound(Constant.SOUND.ENERGY_BALL);
        }
        /**
         * 击中玩家后隐藏
         *
         * @memberof Arrow
         */


        hide() {
          var _this$node$parent;

          if (!this.node.parent) {
            return;
          }

          this.node.active = false; //如果dispersionSurround组里所有的球都隐藏了则回收整个dispersion预制体

          let isAllHide = (_this$node$parent = this.node.parent) === null || _this$node$parent === void 0 ? void 0 : _this$node$parent.children.every(ndChild => {
            return ndChild.active === false;
          });

          if (isAllHide && this.node.parent) {
            PoolManager.instance.putNode(this.node.parent);
          }
        }

        update(deltaTime) {
          if (!this.node.parent || !GameManager.ndPlayer || GameManager.isGameOver || GameManager.isGamePause) {
            return;
          } //朝forward方向飞行


          this._curSpeed = Util.lerp(this._targetSpeed, this._curSpeed, 0.25);

          this._targetWorPos.set(0, 0, -deltaTime * this._curSpeed);

          this.node.translate(this._targetWorPos, Node.NodeSpace.LOCAL); //超过玩家一定范围则隐藏

          this._curWorPos.set(this.node.worldPosition);

          Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

          if (this._offsetPos && this._offsetPos.length() >= this._disappearRange) {
            this.hide();
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tornado.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './util.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, AnimationComponent, _decorator, Component, Vec3, Node, PoolManager, Util, Constant, AudioManager, EffectManager, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      AnimationComponent = module.AnimationComponent;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "c5fdbt9RkFOCaHUSrwAIUTs", "tornado", undefined);

      const {
        ccclass,
        property
      } = _decorator; //台风S型脚本

      let Tornado = exports('Tornado', (_dec = ccclass('Tornado'), _dec2 = property(AnimationComponent), _dec(_class = (_class2 = (_temp = class Tornado extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "aniMove", _descriptor, this);

          _defineProperty(this, "skillInfo", null);

          _defineProperty(this, "baseInfo", null);

          _defineProperty(this, "_offsetPos", new Vec3());

          _defineProperty(this, "_oriWorPos", new Vec3());

          _defineProperty(this, "_targetSpeed", 0);

          _defineProperty(this, "_curSpeed", 0);

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_curWorPos", new Vec3());

          _defineProperty(this, "_disappearRange", 25);
        } //箭节点超过玩家这个范围则隐藏


        start() {// [3]
        }

        init(skillInfo, baseInfo, scriptParent) {
          var _scriptParent$scriptW;

          this.skillInfo = skillInfo;
          this.baseInfo = baseInfo;
          scriptParent === null || scriptParent === void 0 ? void 0 : (_scriptParent$scriptW = scriptParent.scriptWarning) === null || _scriptParent$scriptW === void 0 ? void 0 : _scriptParent$scriptW.hideWarning();

          this._oriWorPos.set(this.node.worldPosition);

          this._curWorPos.set(this.node.worldPosition);

          Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

          this._offsetPos.normalize().negative();

          Vec3.add(this._curWorPos, this._curWorPos, this._offsetPos.multiplyScalar(2));
          this.node.setWorldPosition(this._curWorPos);
          EffectManager.instance.playParticle(this.node);
          this._targetSpeed = skillInfo.flySpeed;
          this._curSpeed = this._targetSpeed * 0.5;
          this.aniMove.getState("tornado").time = 0;
          this.aniMove.getState("tornado").sample();
          this.aniMove.play();
          AudioManager.instance.playSound(Constant.SOUND.TORNADO);
        }

        update(deltaTime) {
          if (GameManager.ndPlayer) {
            //朝forward方向飞行
            this._curSpeed = Util.lerp(this._targetSpeed, this._curSpeed, 0.25);

            this._targetWorPos.set(0, 0, -deltaTime * this._curSpeed);

            this.node.translate(this._targetWorPos, Node.NodeSpace.LOCAL);

            this._curWorPos.set(this.node.worldPosition); //超过玩家一定范围则隐藏


            Vec3.subtract(this._offsetPos, this._curWorPos, GameManager.ndPlayer.worldPosition);

            if (this._offsetPos && this._offsetPos.length() >= this._disappearRange) {
              PoolManager.instance.putNode(this.node);
            }
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "aniMove", [_dec2], {
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

System.register("chunks:///_virtual/backPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './audioManager.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Constant, AudioManager, UIManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "cb044J/UWlCka6m1ViHFqYi", "backPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //返回界面提示脚本

      let BackPanel = exports('BackPanel', (_dec = ccclass('BackPanel'), _dec(_class = (_temp = class BackPanel extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_callback", null);
        }

        start() {// [3]
        }

        show(callback) {
          this._callback = callback;
        }

        onBtnYesClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("back/backPanel");
          this._callback && this._callback();
        }

        onBtnNoClick() {
          UIManager.instance.hideDialog("back/backPanel");
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/skillPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts', './constant.ts', './audioManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './skillItem.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, SpriteComponent, LabelComponent, _decorator, Component, Util, Constant, AudioManager, LocalConfig, PlayerData, UIManager, GameManager, SkillItem;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      SkillItem = module.SkillItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "ccff8loXZRAR5uAetyAqv+L", "skillPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //技能界面脚本

      let SkillPanel = exports('SkillPanel', (_dec = ccclass('SkillPanel'), _dec2 = property(Node), _dec3 = property(SpriteComponent), _dec4 = property(LabelComponent), _dec(_class = (_class2 = (_temp = class SkillPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndSkills", _descriptor, this);

          _initializerDefineProperty(this, "spRefreshIcon", _descriptor2, this);

          _initializerDefineProperty(this, "lbGold", _descriptor3, this);

          _defineProperty(this, "_gold", 50);

          _defineProperty(this, "_callback", null);
        }

        start() {// [3]
        }

        show(callback) {
          this._callback = callback;
          this.lbGold.string = `获得 ${this._gold}`;
          let arrLock = PlayerData.instance.getLockPlyerSkill();
          arrLock = Util.shuffle(arrLock);
          this.ndSkills.children.forEach((ndChild, idx, arr) => {
            if (arrLock[idx]) {
              let info = LocalConfig.instance.queryByID("playerSkill", arrLock[idx].ID);
              ndChild.active = true;
              let scriptItem = ndChild.getComponent(SkillItem);
              scriptItem.init(info, () => {
                this._close();
              });
            } else {
              ndChild.active = false;
            }
          });
        }

        onBtnGiveUpClick() {
          AudioManager.instance.playSound(Constant.SOUND.SELL);
          GameManager.addGold(this._gold);

          this._close();
        }

        onBtnRefreshClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this.show(this._callback);
        }

        _close() {
          this._callback && this._callback();
          UIManager.instance.hideDialog("skill/skillPanel");
          UIManager.instance.showDialog("fight/fightPanel");
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndSkills", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spRefreshIcon", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec4], {
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

System.register("chunks:///_virtual/joystick.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Enum, view, Node, _decorator, Component, Vec3, UITransformComponent, Constant, ClientEvent, AudioManager, PlayerData, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Enum = module.Enum;
      view = module.view;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      UITransformComponent = module.UITransformComponent;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "ce11cUqRdBM+6FZLQY6qG6q", "joystick", undefined);

      const {
        ccclass,
        property
      } = _decorator; //触摸类型

      const TOUCH_TYPE = Enum({
        DEFAULT: 0,
        //按钮和背景距离不变，背景位置与触碰点一致，不可改变按钮背景位置，按钮背景随着按钮移动而移动，松手后无法恢复到初始位置
        FOLLOW: 1,
        //按钮和背景距离不变，背景位置与触碰点一致，不可改变按钮背景位置，按钮背景随着按钮移动而移动，松手后恢复到初始位置
        FOLLOW_ALWAYS: 2,
        //按钮和背景距离不变，背景位置与触碰点一致，可改变按钮背景位置，按钮背景随着按钮移动而移动，松手后恢复到初始位置
        FOLLOW_DOT: 3 //按钮和背景距离可改变，按钮位置与触碰点可不一致，不可改变按钮背景位置，按钮背景不随着按钮移动而移动，松手后恢复到初始位置

      }); //方向

      const DIRECTION_TYPE = Enum({
        FOUR: 4,
        EIGHT: 8,
        ALL: 0
      });
      const screenHeight = view.getVisibleSize().height; //屏幕可视范围高度

      let Joystick = exports('Joystick', (_dec = ccclass("Joystick"), _dec2 = property({
        type: Node,
        displayName: '摇杆背景节点'
      }), _dec3 = property({
        type: Node,
        displayName: '摇杆节点'
      }), _dec4 = property({
        type: TOUCH_TYPE,
        displayName: '触摸类型'
      }), _dec5 = property({
        type: DIRECTION_TYPE,
        displayName: '方向类型'
      }), _dec6 = property({
        displayName: '启动半透明'
      }), _dec7 = property({
        displayName: '点击跟随'
      }), _dec8 = property({
        displayName: '内圈大小'
      }), _dec9 = property(Node), _dec(_class = (_class2 = (_temp = class Joystick extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndRing", _descriptor, this);

          _initializerDefineProperty(this, "ndDot", _descriptor2, this);

          _initializerDefineProperty(this, "touchType", _descriptor3, this);

          _initializerDefineProperty(this, "directionType", _descriptor4, this);

          _initializerDefineProperty(this, "isEnableTransparent", _descriptor5, this);

          _initializerDefineProperty(this, "isFollowStart", _descriptor6, this);

          _initializerDefineProperty(this, "innerSize", _descriptor7, this);

          _initializerDefineProperty(this, "ndTip", _descriptor8, this);

          _defineProperty(this, "onClickCb", null);

          _defineProperty(this, "onEndCb", null);

          _defineProperty(this, "clearFECb", null);

          _defineProperty(this, "onBeginFECb", null);

          _defineProperty(this, "onSuccessFECb", null);

          _defineProperty(this, "isMoving", false);

          _defineProperty(this, "_angle", 0);

          _defineProperty(this, "_oriRingPos", null);

          _defineProperty(this, "_targetRingPos", new Vec3());

          _defineProperty(this, "_touchStartLocation", new Vec3());

          _defineProperty(this, "_touchMoveLocation", new Vec3());

          _defineProperty(this, "_touchEndLocation", new Vec3());

          _defineProperty(this, "_isOutInnerSize", false);

          _defineProperty(this, "_distanceRate", 0);

          _defineProperty(this, "_checkInterval", 0.04);

          _defineProperty(this, "_oldAngle", 0);

          _defineProperty(this, "_currentTime", 0);

          _defineProperty(this, "_oriDotPos", new Vec3());

          _defineProperty(this, "_movePos", new Vec3());

          _defineProperty(this, "_curRingPos_1", new Vec3());

          _defineProperty(this, "_curRingPos_2", new Vec3());
        } //是否正在移动


        get distanceRate() {
          return this._distanceRate;
        }

        get angle() {
          return this._angle;
        }

        set angle(v) {
          this._angle = v;
        } //


        start() {
          // Your initialization goes here.
          if (PlayerData.instance.playerInfo.level > 1 && this.ndTip.active) {
            this.ndTip.active = false;
          }
        }

        onEnable() {
          this.node.on(Node.EventType.TOUCH_START, this._touchStartEvent, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this); // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0

          this.node.on(Node.EventType.TOUCH_END, this._touchEndEvent, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this);
        }

        onDisable() {
          this.node.off(Node.EventType.TOUCH_START, this._touchStartEvent, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this._touchMoveEvent, this); // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0

          this.node.off(Node.EventType.TOUCH_END, this._touchEndEvent, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this._touchEndEvent, this); //重置

          this.isMoving = false;
          this.ndDot.setPosition(this._oriDotPos);

          if (this._oriRingPos) {
            this.ndRing.setPosition(this._oriRingPos);
          }
        }

        _touchStartEvent(event) {
          var _this$node$getCompone; // 记录触摸的世界坐标，给touch move使用
          // this.dot.opacity = 255;


          this._targetRingPos = null;
          let touch = event.getUILocation();

          this._touchStartLocation.set(touch.x, touch.y, 0);

          let touchPos = (_this$node$getCompone = this.node.getComponent(UITransformComponent)) === null || _this$node$getCompone === void 0 ? void 0 : _this$node$getCompone.convertToNodeSpaceAR(this._touchStartLocation);

          if (!this._oriRingPos) {
            this._oriRingPos = this.ndRing.getPosition().clone();
          } // 记录摇杆位置，给touch move使用
          // this._stickPos.set(touchPos);


          this._isOutInnerSize = false;

          if (!this.isFollowStart) {
            var _this$ndRing$getCompo, _this$ndRing$getCompo2;

            touchPos = (_this$ndRing$getCompo = this.ndRing.getComponent(UITransformComponent)) === null || _this$ndRing$getCompo === void 0 ? void 0 : _this$ndRing$getCompo.convertToNodeSpaceAR(this._touchStartLocation); //触摸点与圆圈中心的距离

            let distance = touchPos.length();
            let width = (_this$ndRing$getCompo2 = this.ndRing.getComponent(UITransformComponent)) === null || _this$ndRing$getCompo2 === void 0 ? void 0 : _this$ndRing$getCompo2.contentSize.width; //圆圈半径

            let radius = width / 2; //手指在圆圈内触摸,控杆跟随触摸点

            if (radius > distance) {
              this.ndDot.setPosition(touchPos);

              this._updateAngle(touchPos);

              return true;
            }

            return false;
          } else {
            //设置遥感可移动范围
            if (this.touchType === TOUCH_TYPE.FOLLOW) {
              touchPos.y = touchPos.y >= -screenHeight / 6 ? -screenHeight / 6 : touchPos.y;
            }

            this.ndRing.setPosition(touchPos);
          }
        }

        _touchMoveEvent(event) {
          var _this$ndRing$getCompo3, _this$ndRing$getCompo4;

          let touch = event.getUILocation();

          this._touchMoveLocation.set(touch.x, touch.y, 0);

          let touchPos = (_this$ndRing$getCompo3 = this.ndRing.getComponent(UITransformComponent)) === null || _this$ndRing$getCompo3 === void 0 ? void 0 : _this$ndRing$getCompo3.convertToNodeSpaceAR(this._touchMoveLocation); // if (this.touchType === TOUCH_TYPE.FOLLOW) {
          //     let offsetPos = cc.v3(touchPos.x - this._stickPos.x, touchPos.y - this._stickPos.y, 0);
          //     touchPos = offsetPos;
          // }

          let distance = touchPos.length();

          if (distance > this.innerSize) {
            this.isMoving = true;
            this._isOutInnerSize = true;
          } else {
            this._isOutInnerSize = false;
          } //有拖动且有角度才视为开始游戏


          if (!GameManager.isGameStart && this.isMoving) {
            GameManager.isGameStart = true;
            AudioManager.instance.resumeAll();
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.MONSTER_MOVE);

            if (this.ndTip.active) {
              this.ndTip.active = false;
            }

            this._currentTime = this._checkInterval;
          }

          let width = (_this$ndRing$getCompo4 = this.ndRing.getComponent(UITransformComponent)) === null || _this$ndRing$getCompo4 === void 0 ? void 0 : _this$ndRing$getCompo4.contentSize.width; //圆圈半径

          let radius = width / 2;
          let rate = 0; // 由于摇杆的postion是以父节点为锚点，所以定位要加上ring和dot当前的位置(stickX,stickY)

          if (radius > distance) {
            rate = Number((distance / radius).toFixed(3));
            this.ndDot.setPosition(touchPos);
          } else if (this.touchType !== TOUCH_TYPE.FOLLOW_DOT) {
            rate = 1; //控杆永远保持在圈内，并在圈内跟随触摸更新角度

            let radian = Math.atan2(touchPos.y, touchPos.x);
            let x = Math.cos(radian) * radius;
            let y = Math.sin(radian) * radius;

            this._movePos.set(x, y, 0);

            if (this.touchType === TOUCH_TYPE.FOLLOW_ALWAYS) {
              var _this$node$getCompone2;

              this._curRingPos_2.set(touch.x - x, touch.y - y, 0);

              let ringPos = (_this$node$getCompone2 = this.node.getComponent(UITransformComponent)) === null || _this$node$getCompone2 === void 0 ? void 0 : _this$node$getCompone2.convertToNodeSpaceAR(this._curRingPos_2);
              this._targetRingPos = ringPos;
            }

            this.ndDot.setPosition(this._movePos);
          } else {
            // 点跟随移动
            this.ndDot.setPosition(touchPos);
          } //更新角度


          this._updateAngle(touchPos); //更新遥感移动距离百分比


          this._distanceRate = rate;
        }

        _touchEndEvent(event) {
          if (!this.isMoving) {
            //可以判断为点击
            this.onClickCb && this.onClickCb();
          } else {
            var _this$ndRing$getCompo5;

            let touch = event.getUILocation();

            this._touchEndLocation.set(touch.x, touch.y, 0);

            let touchPos = (_this$ndRing$getCompo5 = this.ndRing.getComponent(UITransformComponent)) === null || _this$ndRing$getCompo5 === void 0 ? void 0 : _this$ndRing$getCompo5.convertToNodeSpaceAR(this._touchEndLocation);
            let isDragToInner = false;

            if (touchPos.length() < this.innerSize) {
              //取消掉
              isDragToInner = true;
              this.onEndCb && this.onEndCb(isDragToInner);
            } else {
              this.onEndCb && this.onEndCb(isDragToInner);
            }
          }

          this.isMoving = false;
          this.ndDot.setPosition(this._oriDotPos);

          if (this.touchType === TOUCH_TYPE.FOLLOW || this.touchType === TOUCH_TYPE.FOLLOW_ALWAYS || this.touchType === TOUCH_TYPE.FOLLOW_DOT) {
            this._targetRingPos = null;
            this.ndRing.setPosition(this._oriRingPos);
          }
        }

        _updateAngle(pos) {
          this._angle = Math.round(Math.atan2(pos.y, pos.x) * 180 / Math.PI);
          return this._angle;
        }

        reset() {
          this.isMoving = false;
          this.ndDot.setPosition(this._oriDotPos);
        }

        update(deltaTime) {
          // Your update function goes here.
          if (!GameManager.isGameStart || GameManager.isGameOver || GameManager.isGamePause || !GameManager.scriptPlayer) {
            return;
          } //设置终终点按钮位置


          if (this._targetRingPos) {
            this._curRingPos_1.set(0, 0, 0);

            Vec3.lerp(this._curRingPos_1, this.ndRing.position, this._targetRingPos, 20 * deltaTime);
            this.ndRing.setPosition(this._curRingPos_1);
          }

          this._currentTime += deltaTime;

          if (this._currentTime >= this._checkInterval) {
            this._currentTime = 0;

            if (this.isMoving) {
              if (this.angle !== this._oldAngle) {
                this._oldAngle = this.angle;
                GameManager.scriptPlayer.playAction({
                  action: Constant.PLAYER_ACTION.MOVE,
                  value: this.angle
                });
              }
            } else {
              this.isMoving = false;

              if (GameManager.scriptPlayer.isMoving) {
                GameManager.scriptPlayer.playAction({
                  action: Constant.PLAYER_ACTION.STOP_MOVE
                });
              }
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndRing", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndDot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "touchType", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return TOUCH_TYPE.DEFAULT;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "directionType", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return DIRECTION_TYPE.ALL;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isEnableTransparent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "isFollowStart", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return false;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "innerSize", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndTip", [_dec9], {
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

System.register("chunks:///_virtual/mapManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './localConfig.ts', './monster.ts', './boss.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, Node, PoolManager, ResourceUtil, Constant, ClientEvent, AudioManager, LocalConfig, Monster, Boss, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      Node = module.Node;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      Monster = module.Monster;
    }, function (module) {
      Boss = module.Boss;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "d3b32wEGk5A9ptwhpJ6lghY", "mapManager", undefined);

      const {
        ccclass,
        property
      } = _decorator; //关卡模型管理脚本（怪物、爱心、障碍、npc）

      let MapManager = exports('MapManager', (_dec = ccclass('MapManager'), _dec(_class = (_temp = _class2 = class MapManager extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_dictModuleType", void 0);

          _defineProperty(this, "arrModuleData", {});

          _defineProperty(this, "_ndAn", null);

          _defineProperty(this, "_ndAnS", null);

          _defineProperty(this, "_warpGateWorPos_1", new Vec3(16.414, 1.635, -0.804));

          _defineProperty(this, "_warpGateWorPos_2", new Vec3(34.61, 1.635, -20));

          _defineProperty(this, "_ndWarpGate", null);

          _defineProperty(this, "_completeListener", null);

          _defineProperty(this, "_arrItem", []);

          _defineProperty(this, "_arrMap", []);
        } //当前关卡数据表


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.SHOW_WARP_GATE, this._showWarpGate, this);
          ClientEvent.on(Constant.EVENT_TYPE.HIDE_WARP_GATE, this._hideWarpGate, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.SHOW_WARP_GATE, this._showWarpGate, this);
          ClientEvent.off(Constant.EVENT_TYPE.HIDE_WARP_GATE, this._hideWarpGate, this);
        }

        start() {// [3]
        }

        buildMap(mapName, progressCb, completeCb) {
          this._completeListener = completeCb;
          this._dictModuleType = {};
          this._arrItem = [];
          this._arrMap = [];
          this._arrMap = LocalConfig.instance.getTableArr(mapName).concat();

          let cb = () => {
            if (mapName.startsWith("map1")) {
              this._ndAn && (this._ndAn.active = false);
              this._ndAnS && (this._ndAnS.active = true);
              MapManager.isMapAnS = true;
            } else {
              this._ndAn && (this._ndAn.active = true);
              this._ndAnS && (this._ndAnS.active = false);
              MapManager.isMapAnS = false;
            }

            for (let i = this._arrMap.length - 1; i >= 0; i--) {
              const item = this._arrMap[i];
              let baseInfo = LocalConfig.instance.queryByID('base', item.ID);

              if (!this._dictModuleType.hasOwnProperty(baseInfo.type)) {
                this._dictModuleType[baseInfo.type] = [];
              }

              this._dictModuleType[baseInfo.type].push(item);
            }

            let arrPromise = [];

            for (const i in this._dictModuleType) {
              let item = this._dictModuleType[i];

              if (item.length) {
                arrPromise.push(this._buildModel(i));
              }
            }

            Promise.all(arrPromise).then(() => {
              this._completeListener && this._completeListener();
              console.log(`load ${mapName} over`);
            }).catch(e => {
              console.error("load item module err", e);
            });

            if (!this._ndWarpGate) {
              this.initWarpGate();
            }
          };

          if (mapName.startsWith("map0") && !this._ndAn) {
            ResourceUtil.loadModelRes('scene/an').then(prefab => {
              this._ndAn = PoolManager.instance.getNode(prefab, this.node.parent);
              cb();
            });
          } else if (mapName.startsWith("map1") && !this._ndAnS) {
            ResourceUtil.loadModelRes('scene/anS').then(prefab => {
              this._ndAnS = PoolManager.instance.getNode(prefab, this.node.parent);
              cb();
            });
          } else {
            cb();
          }
        }

        _buildModel(type) {
          return new Promise((resolve, reject) => {
            let arrPromise = [];
            let objItems = this._dictModuleType[type]; //同类型的信息

            this._dictModuleType[type] = [];

            for (let idx = 0; idx < objItems.length; idx++) {
              //怪物在该层级别的配置信息
              let layerInfo = objItems[idx]; //怪物的模块数据

              let baseInfo = LocalConfig.instance.queryByID("base", layerInfo.ID);
              let modelPath = `${type}/${baseInfo.resName}`;
              let p = ResourceUtil.loadModelRes(modelPath).then(prefab => {
                let parentName = type + 'Group'; //先创建父节点

                let ndParent = this.node.getChildByName(parentName);

                if (!ndParent) {
                  ndParent = new Node(parentName);
                  ndParent.parent = this.node;
                }

                let ndChild = PoolManager.instance.getNode(prefab, ndParent);
                let position = layerInfo.position ? layerInfo.position.split(',') : baseInfo.position.split(',');
                let angle = layerInfo.angle ? layerInfo.angle.split(',') : baseInfo.angle.split(',');
                let scale = layerInfo.scale ? layerInfo.scale.split(',') : baseInfo.scale.split(',');
                ndChild.setPosition(new Vec3(Number(position[0]), Number(position[1]), Number(position[2])));
                ndChild.eulerAngles = new Vec3(Number(angle[0]), Number(angle[1]), Number(angle[2]));
                ndChild.setScale(new Vec3(Number(scale[0]), Number(scale[1]), Number(scale[2]))); //test

                if (baseInfo.type === Constant.BASE_TYPE.MONSTER) {
                  let scriptMonster = ndChild === null || ndChild === void 0 ? void 0 : ndChild.getComponent(Monster);
                  scriptMonster.init(baseInfo, layerInfo);
                  GameManager.arrMonster.push(ndChild);
                } else if (baseInfo.type === Constant.BASE_TYPE.BOSS) {
                  GameManager.arrMonster.push(ndChild);
                  GameManager.ndBoss = ndChild;
                  GameManager.scriptBoss = ndChild === null || ndChild === void 0 ? void 0 : ndChild.getComponent(Boss);
                  GameManager.scriptBoss.init(baseInfo, layerInfo);
                } else if (baseInfo.type === Constant.BASE_TYPE.NPC) {
                  GameManager.existentNum += 1;
                } else if (baseInfo.type === Constant.BASE_TYPE.HEART) {
                  GameManager.existentNum += 1;
                }

                this._arrItem.push(ndChild);
              });
              arrPromise.push(p);
            }

            Promise.all(arrPromise).then(() => {
              resolve(null);
            }).catch(e => {
              console.error("e", e);
            });
          });
        }
        /**
         * 回收模块
         */


        recycle() {
          for (let index = 0; index < this._arrItem.length; index++) {
            const element = this._arrItem[index];

            this._recycleModel(element);
          }

          this.node.removeAllChildren();
        }
        /**
         * 回收子模块
         * @param ndItem 
         */


        _recycleModel(ndItem) {
          PoolManager.instance.putNode(ndItem);
        }
        /**
         * 初始化传送门
         *
         * @private
         * @memberof MapManager
         */


        initWarpGate() {
          ResourceUtil.loadModelRes(`warpGate/warpGate`).then(pf => {
            this._ndWarpGate = PoolManager.instance.getNode(pf, this.node.parent);
            this._ndWarpGate.active = false;
          });
        }
        /**
         * 展示传送门
         *
         * @private
         * @memberof GameManager
         */


        _showWarpGate() {
          AudioManager.instance.playSound(Constant.SOUND.SHOW_WRAP_GATE);

          if (this._ndAn && this._ndAn.active) {
            this._ndWarpGate.setWorldPosition(this._warpGateWorPos_1);
          } else {
            this._ndWarpGate.setWorldPosition(this._warpGateWorPos_2);
          }

          this._ndWarpGate.active = true;
        }
        /**
         * 隐藏传送门
         *
         * @private
         * @memberof GameManager
         */


        _hideWarpGate() {
          if (this._ndWarpGate) {
            this._ndWarpGate.active = false;
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _defineProperty(_class2, "isMapAnS", false), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/csvManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "d7554BuqnJLAKibwVUWte5P", "csvManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      var CELL_DELIMITERS = [",", ";", "\t", "|", "^"];
      var LINE_DELIMITERS = ["\r\n", "\r", "\n"];

      var getterCast = function (value, index, cast, d) {
        if (cast instanceof Array) {
          if (cast[index] === "number") {
            return Number(d[index]);
          } else if (cast[index] === "boolean") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        } else {
          if (!isNaN(Number(value))) {
            return Number(d[index]);
          } else if (value == "false" || value == "true" || value == "t" || value == "f") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        }
      };

      var CSV = {
        //

        /* =========================================
            * Constants ===============================
            * ========================================= */
        STANDARD_DECODE_OPTS: {
          skip: 0,
          limit: false,
          header: false,
          cast: false,
          comment: ""
        },
        STANDARD_ENCODE_OPTS: {
          delimiter: CELL_DELIMITERS[0],
          newline: LINE_DELIMITERS[0],
          skip: 0,
          limit: false,
          header: false
        },
        quoteMark: '"',
        doubleQuoteMark: '""',
        quoteRegex: /"/g,

        /* =========================================
            * Utility Functions =======================
            * ========================================= */
        assign: function () {
          var args = Array.prototype.slice.call(arguments);
          var base = args[0];
          var rest = args.slice(1);

          for (var i = 0, len = rest.length; i < len; i++) {
            for (var attr in rest[i]) {
              base[attr] = rest[i][attr];
            }
          }

          return base;
        },
        map: function (collection, fn) {
          var results = [];

          for (var i = 0, len = collection.length; i < len; i++) {
            results[i] = fn(collection[i], i);
          }

          return results;
        },
        getType: function (obj) {
          return Object.prototype.toString.call(obj).slice(8, -1);
        },
        getLimit: function (limit, len) {
          return limit === false ? len : limit;
        },
        buildObjectConstructor: function (fields, sample, cast) {
          return function (d) {
            var object = new Object();

            var setter = function (attr, value) {
              return object[attr] = value;
            };

            if (cast) {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            } // body.push("return object;");
            // body.join(";\n");


            return object;
          };
        },
        buildArrayConstructor: function (fields, sample, cast) {
          return function (d) {
            var row = new Array(sample.length);

            var setter = function (idx, value) {
              return row[idx] = value;
            };

            if (cast) {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            }

            return row;
          };
        },
        frequency: function (coll, needle, limit) {
          if (limit === void 0) limit = false;
          var count = 0;
          var lastIndex = 0;
          var maxIndex = this.getLimit(limit, coll.length);

          while (lastIndex < maxIndex) {
            lastIndex = coll.indexOf(needle, lastIndex);
            if (lastIndex === -1) break;
            lastIndex += 1;
            count++;
          }

          return count;
        },
        mostFrequent: function (coll, needles, limit) {
          var max = 0;
          var detected;

          for (var cur = needles.length - 1; cur >= 0; cur--) {
            if (this.frequency(coll, needles[cur], limit) > max) {
              detected = needles[cur];
            }
          }

          return detected || needles[0];
        },
        unsafeParse: function (text, opts, fn) {
          var lines = text.split(opts.newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          var fields;
          var constructor;

          function cells(lines) {
            var line = lines.shift();

            if (line.indexOf('"') >= 0) {
              // 含引号
              // 找到这行完整的数据, 找到对称的双引号
              var lastIndex = 0;
              var findIndex = 0;
              var count = 0;

              while (lines.length > 0) {
                lastIndex = line.indexOf('"', findIndex);
                if (lastIndex === -1 && count % 2 === 0) break;

                if (lastIndex !== -1) {
                  findIndex = lastIndex + 1;
                  count++;
                } else {
                  line = line + opts.newline + lines.shift();
                }
              }

              var list = [];
              var item;
              var quoteCount = 0;
              var start = 0;
              var end = 0;
              var length = line.length;

              for (var key in line) {
                if (!line.hasOwnProperty(key)) {
                  continue;
                }

                let numKey = parseInt(key);
                var value = line[key];

                if (numKey === 0 && value === '"') {
                  quoteCount++;
                  start = 1;
                }

                if (value === '"') {
                  quoteCount++;

                  if (line[numKey - 1] === opts.delimiter && start === numKey) {
                    start++;
                  }
                }

                if (value === '"' && quoteCount % 2 === 0) {
                  if (line[numKey + 1] === opts.delimiter || numKey + 1 === length) {
                    end = numKey;
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 2;
                    end = start;
                  }
                }

                if (value === opts.delimiter && quoteCount % 2 === 0) {
                  end = numKey;

                  if (end > start) {
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 1;
                    end = start;
                  } else if (end === start) {
                    list.push("");
                    start = end + 1;
                    end = start;
                  }
                }
              }

              end = length;

              if (end >= start) {
                item = line.substring(start, end);
                list.push(item);
              }

              return list;
            } else {
              return line.split(opts.delimiter);
            }
          }

          if (opts.header) {
            if (opts.header === true) {
              opts.comment = cells(lines); // 第一行是注释

              opts.cast = cells(lines); // 第二行是数据类型

              fields = cells(lines);
            } else if (this.getType(opts.header) === "Array") {
              fields = opts.header;
            }

            constructor = this.buildObjectConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          } else {
            constructor = this.buildArrayConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          }

          while (lines.length > 0) {
            var row = cells(lines);

            if (row.length > 1) {
              fn(constructor(row), fields[0]);
            }
          }

          return true;
        },
        safeParse: function (text, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;
          var lines = text.split(newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          return true;
        },
        encodeCells: function (line, delimiter, newline) {
          var row = line.slice(0);

          for (var i = 0, len = row.length; i < len; i++) {
            if (row[i].indexOf(this.quoteMark) !== -1) {
              row[i] = row[i].replace(this.quoteRegex, this.doubleQuoteMark);
            }

            if (row[i].indexOf(delimiter) !== -1 || row[i].indexOf(newline) !== -1) {
              row[i] = this.quoteMark + row[i] + this.quoteMark;
            }
          }

          return row.join(delimiter);
        },
        encodeArrays: function (coll, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;

          if (opts.header && this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          }

          for (var cur = 0, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            fn(this.encodeCells(coll[cur], delimiter, newline));
          }

          return true;
        },
        encodeObjects: function (coll, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;
          var header;
          var row;
          header = [];
          row = [];

          for (var key in coll[0]) {
            header.push(key);
            row.push(coll[0][key]);
          }

          if (opts.header === true) {
            fn(this.encodeCells(header, delimiter, newline));
          } else if (this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          } //@ts-ignore


          fn(this.encodeCells(row, delimiter));

          for (var cur = 1, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            row = [];

            for (var key$1 = 0, len = header.length; key$1 < len; key$1++) {
              row.push(coll[cur][header[key$1]]);
            }

            fn(this.encodeCells(row, delimiter, newline));
          }

          return true;
        },
        parse: function (text, opts, fn) {
          var rows;

          if (this.getType(opts) === "Function") {
            fn = opts;
            opts = {};
          } else if (this.getType(fn) !== "Function") {
            rows = [];
            fn = rows.push.bind(rows);
          } else {
            rows = [];
          } //@ts-ignore


          opts = this.assign({}, this.STANDARD_DECODE_OPTS, opts); //@ts-ignore

          this.opts = opts;

          if (!opts.delimiter || !opts.newline) {
            var limit = Math.min(48, Math.floor(text.length / 20), text.length);
            opts.delimiter = opts.delimiter || this.mostFrequent(text, CELL_DELIMITERS, limit);
            opts.newline = opts.newline || this.mostFrequent(text, LINE_DELIMITERS, limit);
          } // modify by jl 由表自行控制不要含有双引号.提高解析效率


          return this.unsafeParse(text, opts, fn) && (rows.length > 0 ? rows : true);
        },
        encode: function (coll, opts, fn) {
          var lines;

          if (this.getType(opts) === "Function") {
            fn = opts;
            opts = {};
          } else if (this.getType(fn) !== "Function") {
            lines = [];
            fn = lines.push.bind(lines);
          } //@ts-ignore


          opts = this.assign({}, this.STANDARD_ENCODE_OPTS, opts);

          if (opts.skip > 0) {
            coll = coll.slice(opts.skip);
          }

          return (this.getType(coll[0]) === "Array" ? this.encodeArrays : this.encodeObjects)(coll, opts, fn) && (lines.length > 0 ? lines.join(opts.newline) : true);
        }
      };
      let CSVManager = exports('CSVManager', (_dec = ccclass("CSVManager"), _dec(_class = (_temp = _class2 = class CSVManager {
        constructor() {
          _defineProperty(this, "_csvTables", {});

          _defineProperty(this, "_csvTableForArr", {});

          _defineProperty(this, "_tableCast", {});

          _defineProperty(this, "_tableComment", {});
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new CSVManager();
          return this._instance;
        }

        addTable(tableName, tableContent, force) {
          if (this._csvTables[tableName] && !force) {
            return;
          }

          let tableData = {};
          let tableArr = [];
          let opts = {
            header: true
          };
          CSV.parse(tableContent, opts, function (row, keyName) {
            tableData[row[keyName]] = row;
            tableArr.push(row);
          });
          this._tableCast[tableName] = CSV.opts.cast;
          this._tableComment[tableName] = CSV.opts.comment;
          this._csvTables[tableName] = tableData;
          this._csvTableForArr[tableName] = tableArr; //this.csvTables[tableName].initFromText(tableContent);
        }
        /**
        * 根据表名获取表的所有内容
        * @param {string} tableName  表名
        * @returns {object} 表内容
        */


        getTableArr(tableName) {
          return this._csvTableForArr[tableName];
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */


        getTable(tableName) {
          return this._csvTables[tableName];
        }
        /**
         * 查询一条表内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object} 一条表内容
         */


        queryOne(tableName, key, value) {
          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          if (key) {
            for (var tbItem in table) {
              if (!table.hasOwnProperty(tbItem)) {
                continue;
              }

              if (table[tbItem][key] === value) {
                return table[tbItem];
              }
            }
          } else {
            return table[value];
          }
        }
        /**
         * 根据ID查询一条表内容
         * @param {string}tableName 表名
         * @param {string}ID
         * @returns {Object} 一条表内容
         */


        queryByID(tableName, ID) {
          //@ts-ignore
          return this.queryOne(tableName, null, ID);
        }
        /**
         * 查询key和value对应的所有行内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object}
         */


        queryAll(tableName, key, value) {
          var table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          var ret = {};

          for (var tbItem in table) {
            if (!table.hasOwnProperty(tbItem)) {
              continue;
            }

            if (table[tbItem][key] === value) {
              ret[tbItem] = table[tbItem];
            }
          }

          return ret;
        }
        /**
         * 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID
         * @param {string} tableName 表名
         * @param {string} key  列名
         * @param {Array}values 数值
         * @returns 
         */


        queryIn(tableName, key, values) {
          var table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          var ret = {};
          var keys = Object.keys(table);
          var length = keys.length;

          for (var i = 0; i < length; i++) {
            var item = table[keys[i]];

            if (values.indexOf(item[key]) > -1) {
              ret[keys[i]] = item;
            }
          }

          return ret;
        }
        /**
         * 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据
         * @param {string} tableName 表名
         * @param {any} condition 筛选条件
         * @returns 
         */


        queryByCondition(tableName, condition) {
          if (condition.constructor !== Object) {
            return null;
          }

          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          var ret = {};
          var tableKeys = Object.keys(table);
          var tableKeysLength = tableKeys.length;
          var keys = Object.keys(condition);
          var keysLength = keys.length;

          for (var i = 0; i < tableKeysLength; i++) {
            var item = table[tableKeys[i]];
            var fit = true;

            for (var j = 0; j < keysLength; j++) {
              var key = keys[j];
              fit = fit && condition[key] === item[key] && !ret[tableKeys[i]];
            }

            if (fit) {
              ret[tableKeys[i]] = item;
            }
          }

          return ret;
        }

        queryOneByCondition(tableName, condition) {
          if (condition.constructor !== Object) {
            return null;
          }

          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          var keys = Object.keys(condition);
          var keysLength = keys.length;

          for (let keyName in table) {
            var item = table[keyName];
            var fit = true;

            for (var j = 0; j < keysLength; j++) {
              var key = keys[j];
              fit = fit && condition[key] === item[key];
            }

            if (fit) {
              return item;
            }
          }

          return null;
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/revivePanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteComponent, LabelComponent, Node, _decorator, Component, UITransformComponent, Constant, ClientEvent, AudioManager, PlayerData, UIManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      UITransformComponent = module.UITransformComponent;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "e234a52wbRAh4xy02FAvDwv", "revivePanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //复活界面脚本

      let RevivePanel = exports('RevivePanel', (_dec = ccclass('RevivePanel'), _dec2 = property(SpriteComponent), _dec3 = property(LabelComponent), _dec4 = property(Node), _dec5 = property(LabelComponent), _dec(_class = (_class2 = (_temp = class RevivePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spPayIcon", _descriptor, this);

          _initializerDefineProperty(this, "lbLevel", _descriptor2, this);

          _initializerDefineProperty(this, "ndMask", _descriptor3, this);

          _initializerDefineProperty(this, "lbCountDown", _descriptor4, this);

          _defineProperty(this, "_countDown", 10);

          _defineProperty(this, "_maxMaskHeight", 190);

          _defineProperty(this, "_curMaskHeight", 0);

          _defineProperty(this, "_callback", null);
        }

        set countDown(value) {
          var _this$ndMask$getCompo;

          this._countDown = value;
          this.lbCountDown.string = String(Math.floor(this._countDown));
          this.lbLevel.string = PlayerData.instance.playerInfo.level;
          this._curMaskHeight += this._maxMaskHeight / (this._countDown * 120);
          this._curMaskHeight = this._curMaskHeight >= this._maxMaskHeight ? this._maxMaskHeight : this._curMaskHeight;
          (_this$ndMask$getCompo = this.ndMask.getComponent(UITransformComponent)) === null || _this$ndMask$getCompo === void 0 ? void 0 : _this$ndMask$getCompo.setContentSize(260, this._curMaskHeight);

          if (value < 0) {
            this._close();
          }
        }

        get countDown() {
          return this._countDown;
        }

        start() {// [3]
        }

        show(callback) {
          this._countDown = 10;
          this._curMaskHeight = 0;
          this._callback = callback;
        }

        onBtnSkipClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);

          this._close();
        }

        onBtnReviveClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.hideDialog("revive/revivePanel");
          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_REVIVE);
        }

        _close() {
          this._callback && this._callback();
          UIManager.instance.hideDialog("fight/fightPanel");
          UIManager.instance.hideDialog("revive/revivePanel");
          UIManager.instance.showDialog("settlement/settlementPanel");
        }

        update(deltaTime) {
          if (this.countDown > 0) {
            this.countDown -= deltaTime;
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spPayIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndMask", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbCountDown", [_dec5], {
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

System.register("chunks:///_virtual/skillItem.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './resourceUtil.ts', './constant.ts', './audioManager.ts', './effectManager.ts', './playerData.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteComponent, LabelComponent, _decorator, Component, ResourceUtil, Constant, AudioManager, EffectManager, PlayerData, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "e3994yV5qxHeapY6CuIe8SC", "skillItem", undefined);

      const {
        ccclass,
        property
      } = _decorator; //技能脚本

      let SkillItem = exports('SkillItem', (_dec = ccclass('SkillItem'), _dec2 = property(SpriteComponent), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec(_class = (_class2 = (_temp = class SkillItem extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spIcon", _descriptor, this);

          _initializerDefineProperty(this, "lbName", _descriptor2, this);

          _initializerDefineProperty(this, "lbDesc", _descriptor3, this);

          _defineProperty(this, "_callback", null);

          _defineProperty(this, "_itemInfo", null);
        }

        start() {// [3]
        }

        init(itemInfo, callback) {
          this._itemInfo = itemInfo;
          this._callback = callback;
          this.lbName.string = itemInfo.name;
          this.lbDesc.string = itemInfo.desc;
          ResourceUtil.setSpriteFrame(`texture/skillIcon/${itemInfo.icon}`, this.spIcon, err => {});
        }

        onBtnItemClick() {
          AudioManager.instance.playSound(Constant.SOUND.GET_SKILL);
          this._callback && this._callback();
          PlayerData.instance.addPlayerSkill(this._itemInfo);
          EffectManager.instance.loadAndPlayEffect(true, GameManager.ndPlayer, "levelUp/levelUp", 1, null, null, false, true, GameManager.gameSpeed, true);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDesc", [_dec4], {
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

System.register("chunks:///_virtual/poolManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, instantiate, NodePool;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e4ab6T5/1VCqK/Vn+UcADNM", "poolManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let PoolManager = exports('PoolManager', (_dec = ccclass("PoolManager"), _dec(_class = (_temp = _class2 = class PoolManager {
        constructor() {
          _defineProperty(this, "_dictPool", {});

          _defineProperty(this, "_dictPrefab", {});
        }
        /* class member could be defined like this */
        // dummy = '';

        /* use `property` decorator if your want the member to be serializable */
        // @property
        // serializableDummy = 0;


        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new PoolManager();
          return this._instance;
        }
        /**
         * 根据预设从对象池中获取对应节点
         */


        getNode(prefab, parent) {
          let name = prefab.name; //@ts-ignore

          if (!prefab.position) {
            //@ts-ignore
            name = prefab.data.name;
          }

          this._dictPrefab[name] = prefab;
          let node = null;

          if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            let pool = this._dictPool[name];

            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            //没有对应对象池，创建他！
            let pool = new NodePool();
            this._dictPool[name] = pool;
            node = instantiate(prefab);
          }

          node.parent = parent;
          node.active = true;
          return node;
        }
        /**
         * 将对应节点放回对象池中
         */


        putNode(node) {
          if (!node) {
            return;
          }

          let name = node.name;
          let pool = null;

          if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
          } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
          }

          pool.put(node);
        }
        /**
         * 根据名称，清除对应对象池
         */


        clearPool(name) {
          if (this._dictPool.hasOwnProperty(name)) {
            let pool = this._dictPool[name];
            pool.clear();
          }
        }
        /**
        * 预生成对象池
        * @param prefab
        * @param nodeNum
        * 使用——PoolManager.instance.prePool(prefab, 40);
        */


        preloadPool(prefab, nodeNum) {
          let name = prefab.name; // @ts-ignore

          if (!prefab.position) {
            // @ts-ignore
            name = prefab.data.name;
          }

          let pool = null;

          if (this._dictPool.hasOwnProperty(name)) {
            // 已有对应的对象池
            pool = this._dictPool[name];
          } else {
            // 没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
          }

          for (let i = 0; i < nodeNum; i++) {
            const node = instantiate(prefab);
            pool.put(node);
          }
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/clientEvent.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e55dbzBNn1NUrh8r5zusvCZ", "clientEvent", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let ClientEvent = exports('ClientEvent', (_dec = ccclass("ClientEvent"), _dec(_class = (_temp = _class2 = class ClientEvent {
        /**
         * 监听事件
         * @param {string} eventName 事件名称
         * @param {function} handler 监听函数
         * @param {object} target 监听目标
         */
        static on(eventName, handler, target) {
          var objHandler = {
            handler: handler,
            target: target
          };
          var handlerList = ClientEvent._handlers[eventName];

          if (!handlerList) {
            handlerList = [];
            ClientEvent._handlers[eventName] = handlerList;
          }

          for (var i = 0; i < handlerList.length; i++) {
            if (!handlerList[i]) {
              handlerList[i] = objHandler;
              return i;
            }
          }

          handlerList.push(objHandler);
          return handlerList.length;
        }
        /**
         * 取消监听
         * @param {string} eventName 监听事件
         * @param {function} handler 监听函数
         * @param {object} target 监听目标
         */


        static off(eventName, handler, target) {
          var handlerList = ClientEvent._handlers[eventName];

          if (!handlerList) {
            return;
          }

          for (var i = 0; i < handlerList.length; i++) {
            var oldObj = handlerList[i];

            if (oldObj.handler === handler && (!target || target === oldObj.target)) {
              handlerList.splice(i, 1);
              break;
            }
          }
        }
        /**
         * 分发事件
         * @param {string} eventName 分发事件名
         * @param  {...any} params 分发事件参数
         */


        static dispatchEvent(eventName, ...args) {
          var handlerList = ClientEvent._handlers[eventName];
          var args1 = [];
          var i;

          for (i = 1; i < arguments.length; i++) {
            args1.push(arguments[i]);
          }

          if (!handlerList) {
            return;
          }

          for (i = 0; i < handlerList.length; i++) {
            var objHandler = handlerList[i];

            if (objHandler.handler) {
              objHandler.handler.apply(objHandler.target, args1);
            }
          }
        }

      }, _defineProperty(_class2, "_handlers", {}), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerData.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts', './constant.ts', './clientEvent.ts', './storageManager.ts', './localConfig.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Util, Constant, ClientEvent, StorageManager, LocalConfig;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e5927B2lO9C6o5eLg2NmcKB", "playerData", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let PlayerData = exports('PlayerData', (_dec = ccclass("PlayerData"), _dec(_class = (_temp = _class2 = class PlayerData extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "serverTime", 0);

          _defineProperty(this, "localTime", 0);

          _defineProperty(this, "_userId", '');

          _defineProperty(this, "_playerInfo", null);

          _defineProperty(this, "_history", null);

          _defineProperty(this, "_settings", null);

          _defineProperty(this, "_isNewBee", false);

          _defineProperty(this, "_dataVersion", '');
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new PlayerData();
          return this._instance;
        }

        get userId() {
          return this._userId;
        }

        set userId(v) {
          this._userId = v;
        }

        get settings() {
          return this._settings;
        }

        set settings(v) {
          this._settings = v;
        }

        get playerInfo() {
          return this._playerInfo;
        }

        set playerInfo(v) {
          this._playerInfo = v;
        }

        get history() {
          return this._history;
        }

        set history(v) {
          this._history = v;
        }

        get isNewBee() {
          return this._isNewBee;
        }

        set isNewBee(v) {
          this._isNewBee = v;
        } //是否已经解锁完成所有技能


        get isPlayerSkillAllUnlock() {
          let arrSkill = LocalConfig.instance.getTableArr("playerSkill"); //生命回复技能不在技能列表里面出现，而是在游戏内多次出现，所以减去1

          return this.playerInfo.arrSkill.length === arrSkill.length - 1;
        }
        /**
         * 加上用户数据
         */


        loadGlobalCache() {
          let userId = StorageManager.instance.getUserId();

          if (userId) {
            this._userId = userId;
          }
        }
        /**
         * 加载本地存储数据
         */


        loadFromCache() {
          //读取玩家基础数据
          this._playerInfo = this._loadDataByKey(Constant.LOCAL_CACHE.PLAYER);
          this._history = this._loadDataByKey(Constant.LOCAL_CACHE.HISTORY);
          this._settings = this._loadDataByKey(Constant.LOCAL_CACHE.SETTINGS);
        }
        /**
         * 获取本地存储数据
         * @param {string}keyName 
         * @returns 
         */


        _loadDataByKey(keyName) {
          let ret = {};
          let str = StorageManager.instance.getConfigData(keyName);

          if (str) {
            try {
              ret = JSON.parse(str);
            } catch (e) {
              ret = {};
            }
          }

          return ret;
        }
        /**
         * 创建角色数据
         * @param loginData 
         */


        createPlayerInfo(loginData) {
          this._playerInfo = {
            diamond: 0,
            //钻石总数
            gold: 0,
            //金币数量
            key: 0,
            //钥匙数量
            level: 1,
            //当前层级
            highestLevel: 1,
            //已经解锁的最高层级
            arrSkill: [],
            //已经解锁的玩家技能ID
            createDate: new Date() //记录创建时间

          };
          this._isNewBee = true; //区分新老玩家

          if (loginData) {
            for (let key in loginData) {
              this._playerInfo[key] = loginData[key];
            }
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 生成随机账户
         * @returns
         */


        generateRandomAccount() {
          this.userId = `${Date.now()}${Util.getRandomInt(0, 1000)}`;
          StorageManager.instance.setUserId(this._userId);
        }
        /**
         * 存用户数据
         * @param userId 
         */


        saveAccount(userId) {
          this._userId = userId;
          StorageManager.instance.setUserId(userId);
        }
        /**
         * 保存玩家数据
         */


        savePlayerInfoToLocalCache() {
          StorageManager.instance.setConfigData(Constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
        }
        /**
         * 保存玩家设置相关信息
         */


        saveSettingsToLocalCache() {
          StorageManager.instance.setConfigData(Constant.LOCAL_CACHE.SETTINGS, JSON.stringify(this._settings));
        }
        /**
         * 当数据同步完毕，即被覆盖的情况下，需要将数据写入到本地缓存，以免数据丢失
         */


        saveAll() {
          StorageManager.instance.setConfigDataWithoutSave(Constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
          StorageManager.instance.setConfigDataWithoutSave(Constant.LOCAL_CACHE.HISTORY, JSON.stringify(this._history));
          StorageManager.instance.setConfigDataWithoutSave(Constant.LOCAL_CACHE.SETTINGS, JSON.stringify(this._settings));
          StorageManager.instance.setConfigData(Constant.LOCAL_CACHE.DATA_VERSION, this._dataVersion);
        }
        /**
         * 更新用户信息
         * 例如钻石、金币、道具
         * @param {String} key
         * @param {Number} value
         */


        updatePlayerInfo(key, value) {
          let isChanged = false;

          if (this._playerInfo.hasOwnProperty(key)) {
            if (typeof value === 'number') {
              isChanged = true;
              this._playerInfo[key] += value;

              if (this._playerInfo[key] < 0) {
                this._playerInfo[key] = 0;
              } //return;

            } else if (typeof value === 'boolean' || typeof value === 'string') {
              isChanged = true;
              this._playerInfo[key] = value;
            }
          }

          if (isChanged) {
            //有修改就保存到localcache
            StorageManager.instance.setConfigData(Constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
          }
        }
        /**
         * 获取玩家杂项值
         * @param {string} key 
         */


        getSetting(key) {
          if (!this._settings) {
            return null;
          }

          if (!this._settings.hasOwnProperty(key)) {
            return null;
          }

          return this._settings[key];
        }
        /**
         * 设置玩家杂项值
         * @param {string} key 
         * @param {*} value 
         */


        setSetting(key, value) {
          if (!this._settings) {
            this._settings = {};
          }

          this._settings[key] = value;
          this.saveSettingsToLocalCache();
        }
        /**
         * 清除用户信息
         */


        clear() {
          this._playerInfo = {};
          this._settings = {};
          this.saveAll();
        }
        /**
         * 增加战斗次数
         * @param times 
         */


        addFightTimes(times = 1) {
          let fightTimes = this.getFightTimes();
          fightTimes += 1;
          this.setSetting(Constant.SETTINGS_KEY.FIGHT_TIMES, fightTimes);
        }
        /**
         * 获取战斗次数
         * @returns 
         */


        getFightTimes() {
          let fightTimes = this.getSetting(Constant.SETTINGS_KEY.FIGHT_TIMES);

          if (!fightTimes) {
            fightTimes = 0;
            this.setSetting(Constant.SETTINGS_KEY.FIGHT_TIMES, 0);
          }

          return fightTimes;
        }
        /**
         * 获取未解锁的玩家技能
         *
         * @memberof playerData
         */


        getLockPlyerSkill() {
          let arrSkill = LocalConfig.instance.getTableArr("playerSkill");
          let arrLock = [];
          arrLock = arrSkill.filter(item => {
            return !this.playerInfo.arrSkill.includes(item.ID) && item.ID !== Constant.PLAYER_SKILL.RECOVERY;
          });
          return arrLock;
        }
        /**
         * 添加玩家某项技能
         *
         * @param {*} info
         * @memberof playerData
         */


        addPlayerSkill(info) {
          if (!this.playerInfo.arrSkill.includes(info.ID)) {
            this.playerInfo.arrSkill.push(info.ID);
            this.savePlayerInfoToLocalCache();
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL);
          }
        }
        /**
         * 删除玩家某项技能
         *
         * @param {*} info
         * @memberof playerData
         */


        reducePlayerSkill(info) {
          if (this.playerInfo.arrSkill.includes(info.ID)) {
            let idx = this.playerInfo.arrSkill.findIndex(item => {
              return item === info.ID;
            });
            this.playerInfo.arrSkill.splice(idx, 1);
            this.savePlayerInfoToLocalCache();
            ClientEvent.dispatchEvent(Constant.EVENT_TYPE.PARSE_PLAYER_SKILL);
          }
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerBloodBar.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './constant.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Prefab, Node, LayoutComponent, UITransformComponent, SpriteComponent, SpriteFrame, _decorator, Component, Vec3, clamp, tween, find, PoolManager, Constant, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      LayoutComponent = module.LayoutComponent;
      UITransformComponent = module.UITransformComponent;
      SpriteComponent = module.SpriteComponent;
      SpriteFrame = module.SpriteFrame;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      clamp = module.clamp;
      tween = module.tween;
      find = module.find;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

      cclegacy._RF.push({}, "f051daFE7VBBrMhCIXIdlGE", "playerBloodBar", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let PlayerBloodBar = exports('PlayerBloodBar', (_dec = ccclass('PlayerBloodBar'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(LayoutComponent), _dec5 = property(UITransformComponent), _dec6 = property(Node), _dec7 = property(UITransformComponent), _dec8 = property(Node), _dec9 = property(SpriteComponent), _dec10 = property(SpriteFrame), _dec11 = property(SpriteFrame), _dec12 = property(UITransformComponent), _dec(_class = (_class2 = (_temp = class PlayerBloodBar extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "lineWidth", _descriptor, this);

          _initializerDefineProperty(this, "pbLine", _descriptor2, this);

          _initializerDefineProperty(this, "ndContainer", _descriptor3, this);

          _initializerDefineProperty(this, "layoutContainer", _descriptor4, this);

          _initializerDefineProperty(this, "UIComWhiteBar", _descriptor5, this);

          _initializerDefineProperty(this, "ndWhiteBar", _descriptor6, this);

          _initializerDefineProperty(this, "UIComCurBloodBar", _descriptor7, this);

          _initializerDefineProperty(this, "ndCurBloodBar", _descriptor8, this);

          _initializerDefineProperty(this, "spComBloodBar", _descriptor9, this);

          _initializerDefineProperty(this, "sfRed", _descriptor10, this);

          _initializerDefineProperty(this, "sfGreen", _descriptor11, this);

          _initializerDefineProperty(this, "UIComBloodBar", _descriptor12, this);

          _defineProperty(this, "curBlood", 0);

          _defineProperty(this, "_minBloodBarWidth", 100);

          _defineProperty(this, "_bloodBarWidth", 0);

          _defineProperty(this, "_minBloodBarItemWidth", 10);

          _defineProperty(this, "_maxItemBlood", 200);

          _defineProperty(this, "_totalBlood", 0);

          _defineProperty(this, "_ndTarget", null);

          _defineProperty(this, "_offsetPos", null);

          _defineProperty(this, "_curPos", new Vec3());

          _defineProperty(this, "_scriptParent", null);

          _defineProperty(this, "_scale", new Vec3());

          _defineProperty(this, "_bloodBarHeight", 15);

          _defineProperty(this, "_oriContainerPos", new Vec3());

          _defineProperty(this, "_curContainerPos", new Vec3());

          _defineProperty(this, "_bloodBarPos", new Vec3());

          _defineProperty(this, "_whiteBarPos", new Vec3());
        } //白条位置


        start() {// [3]
        }
        /**
         * 展示血条
         *
         * @param {*} scriptParent 血条使用者绑定的节点，如玩家或者小怪
         * @param {number} totalBlood 总血量
         * @param {number} bloodBarType 血条类型
         * @param {Vec3} offsetPos 血条位置偏差
         * @param {Vec3} scale 血条缩放大小
         * @param {(Function | null)} [callback] 
         * @memberof BloodBar
         */


        show(scriptParent, totalBlood, curBlood, offsetPos, scale, callback) {
          this._scriptParent = scriptParent;
          this._totalBlood = totalBlood;
          this._offsetPos = offsetPos;
          this._scale = scale;
          this._ndTarget = scriptParent.node;
          this.node.setScale(scale); // if (isInit) {
          // this._curBlood = this._totalBlood;
          // }

          this.curBlood = curBlood; //血块数量

          let bloodItemNum = Math.ceil(totalBlood / this._maxItemBlood); //当前血量条最小长度

          this._bloodBarWidth = this._minBloodBarItemWidth * bloodItemNum; //所需血条总宽度大于最小整体血条宽度，需增大血条大小，反之使用最小血条宽度

          let isOutOfRange = this._bloodBarWidth > this._minBloodBarWidth;

          this._oriContainerPos.set(this.ndContainer.position);

          if (isOutOfRange) {
            this._curContainerPos.set(-this._bloodBarWidth * 0.5, this._oriContainerPos.y, 0);

            this.ndContainer.setPosition(this._curContainerPos);
          } else {
            this._bloodBarWidth = this._minBloodBarWidth;
          } //每个间隔线之间的距离，1为它本身的宽度，默认前后不显示


          this.layoutContainer.spacingX = this._bloodBarWidth / bloodItemNum - 1;
          this.ndContainer.children.forEach(item => {
            item.active = false;
          }); //当前血量占全部的比例

          let ratio = this.curBlood / this._totalBlood;
          ratio = clamp(ratio, 0, 1); //设置整体大小

          this.UIComBloodBar.setContentSize(this._bloodBarWidth + 2, this._bloodBarHeight); // this.UIComBloodBar.priority = constant.PRIORITY.BLOOD;

          this.node.setSiblingIndex(Constant.PRIORITY.ZERO); //根据当前血量刷新中间连接线

          for (let i = 0; i < bloodItemNum + 1; i++) {
            let ndLineItem;

            if (i >= this.ndContainer.children.length) {
              ndLineItem = PoolManager.instance.getNode(this.pbLine, this.ndContainer);
            } else {
              ndLineItem = this.ndContainer.children[i];
            }

            ndLineItem.active = true;
            let UICom = ndLineItem.getComponent(UITransformComponent);

            if (i % 5 === 0) {
              UICom.setContentSize(1.5, 7);
            } else {
              UICom.setContentSize(1, 5);
            }
          }

          let layCom = this.ndContainer.getComponent(LayoutComponent); //立即执行更新布局

          layCom.updateLayout(); //头尾不展示中间线

          this.ndContainer.children.forEach((ndLineItem, i) => {
            let spComLine = ndLineItem.getComponent(SpriteComponent);

            if (i === 0 || i === bloodItemNum || ndLineItem.position.x > this._bloodBarWidth * ratio) {
              spComLine.enabled = false;
            } else {
              spComLine.enabled = true;
            }
          }); //设置白色进度条长度和位置

          this.UIComWhiteBar.setContentSize(ratio * this._bloodBarWidth, this._bloodBarHeight * 0.8);

          this._whiteBarPos.set(this.ndContainer.position.x, 0.5, this.ndContainer.position.z);

          this.ndWhiteBar.setPosition(this._whiteBarPos); //设置血量进度条长度和位置

          this.UIComCurBloodBar.setContentSize(ratio * this._bloodBarWidth, this._bloodBarHeight * 0.8);

          this._bloodBarPos.set(this.ndContainer.position.x, 0, this.ndContainer.position.z);

          this.ndCurBloodBar.setPosition(this._bloodBarPos);
          callback && callback();
        }
        /**
         * 刷新血量
         *
         * @param {number} num 血量值
         * @param {boolean} [isIncreaseLimit=false] //是否增加上限
         * @memberof PlayerBloodBar
         */


        refreshBlood(num, isIncreaseLimit = false) {
          this.curBlood += num;
          this.curBlood = clamp(this.curBlood, 0, this._totalBlood);
          let ratio = this.curBlood / this._totalBlood;

          if (num < 0) {
            //减血
            ratio = ratio <= 0 ? 0 : ratio;
            this.UIComCurBloodBar.setContentSize(this._bloodBarWidth * ratio, this._bloodBarHeight * 0.8);

            if (ratio > 0) {
              this.ndContainer.children.forEach(ndChild => {
                let spComLine = ndChild.getComponent(SpriteComponent);

                if (spComLine.enabled && ndChild.position.x > this._bloodBarWidth * ratio) {
                  spComLine.enabled = false;
                }
              });
              tween(this.UIComWhiteBar).to(0.7, {
                width: this._bloodBarWidth * ratio
              }).call(() => {}).start();
            } else {
              // PoolManager.instance.putNode(this.node);
              this.node.active = false;
              this._scriptParent.isDie = true;
              this.curBlood = 0;
            }
          } else {
            //加血
            if (isIncreaseLimit) {
              //增加上限,并增加多出来的血量，最多不超过上限
              this.curBlood += num;
              this._totalBlood += num;
              this.curBlood = this.curBlood >= this._totalBlood ? this._totalBlood : this.curBlood;
              ratio = this.curBlood / this._totalBlood;
            } else {
              //普通加血，最多不超过上限                
              ratio = ratio >= 1 ? 1 : ratio;
            }

            tween(this.UIComCurBloodBar).to(1, {
              width: this._bloodBarWidth * ratio
            }).call(() => {
              this.show(this._scriptParent, this._totalBlood, this.curBlood, this._offsetPos, this._scale, null);
            }).start();
          }
        }

        update(deltaTime) {
          // [4]
          //血条跟随人物移动
          if (this.node.parent && this.node.active && this._ndTarget && this._ndTarget.parent) {
            var _GameManager$mainCame;

            (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.convertToUINode(this._ndTarget.worldPosition, find("Canvas"), this._curPos);

            this._curPos.add(this._offsetPos);

            this.node.setPosition(this._curPos);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lineWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pbLine", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndContainer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "layoutContainer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "UIComWhiteBar", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndWhiteBar", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "UIComCurBloodBar", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndCurBloodBar", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spComBloodBar", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sfRed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfGreen", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "UIComBloodBar", [_dec12], {
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

System.register("chunks:///_virtual/camera.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, systemEvent, SystemEvent, macro, EventMouse, Quat, Node;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      systemEvent = module.systemEvent;
      SystemEvent = module.SystemEvent;
      macro = module.macro;
      EventMouse = module.EventMouse;
      Quat = module.Quat;
      Node = module.Node;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "f3a75nrXmNBnonqqdUdW9xz", "camera", undefined);

      const {
        ccclass,
        property
      } = _decorator; //方便上下移动摄像机观察

      let Camera = exports('Camera', (_dec = ccclass('Camera'), _dec(_class = (_temp = class Camera extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "lookButtonDown", false);

          _defineProperty(this, "_targetPos", new Vec3());

          _defineProperty(this, "_vertical", 0);

          _defineProperty(this, "_horizontal", 0);

          _defineProperty(this, "_speed", 50);

          _defineProperty(this, "_rotateSpeed", 0.1);

          _defineProperty(this, "_panButtonDown", false);

          _defineProperty(this, "_ratio", 0.2);

          _defineProperty(this, "_translatePos", new Vec3());

          _defineProperty(this, "_mouseWheelPos", new Vec3());
        }

        onLoad() {}

        start() {
          this._targetPos = this.node.position;
        }

        onEnable() {
          this._addEvents();
        }

        onDisable() {
          this._removeEvents();
        }

        _addEvents() {
          systemEvent.on(SystemEvent.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_MOVE, this._onMouseMove, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_UP, this._onMouseUp, this);
          systemEvent.on(SystemEvent.EventType.MOUSE_DOWN, this._onMouseDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
          systemEvent.on(SystemEvent.EventType.KEY_UP, this._onKeyUp, this);
        }

        _removeEvents() {
          systemEvent.off(SystemEvent.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
          systemEvent.off(SystemEvent.EventType.MOUSE_MOVE, this._onMouseMove, this);
          systemEvent.off(SystemEvent.EventType.MOUSE_UP, this._onMouseUp, this);
          systemEvent.off(SystemEvent.EventType.MOUSE_DOWN, this._onMouseDown, this);
          systemEvent.off(SystemEvent.EventType.KEY_DOWN, this._onKeyDown, this);
          systemEvent.off(SystemEvent.EventType.KEY_UP, this._onKeyUp, this);
        }

        _onKeyDown(event) {
          if (event.keyCode == macro.KEY.w) {
            this._vertical = -1 * this._ratio;
          } else if (event.keyCode == macro.KEY.s) {
            this._vertical = 1 * this._ratio;
          } else if (event.keyCode == macro.KEY.a) {
            this._horizontal = -1 * this._ratio;
          } else if (event.keyCode == macro.KEY.d) {
            this._horizontal = 1 * this._ratio;
          }
        }

        _onKeyUp(event) {
          if (event.keyCode == macro.KEY.w && this._vertical < 0) {
            this._vertical = 0;
          } else if (event.keyCode == macro.KEY.s && this._vertical > 0) {
            this._vertical = 0;
          } else if (event.keyCode == macro.KEY.a && this._horizontal < 0) {
            this._horizontal = 0;
          } else if (event.keyCode == macro.KEY.d && this._horizontal > 0) {
            this._horizontal = 0;
          }
        }

        _onMouseDown(event) {
          switch (event.getButton()) {
            case EventMouse.BUTTON_LEFT:
              // this.lookButtonDown = true;
              break;
            // case EventMouse.BUTTON_MIDDLE:

            case EventMouse.BUTTON_RIGHT:
              this._panButtonDown = true;
              break;
          }
        }

        _onMouseUp(event) {
          switch (event.getButton()) {
            case EventMouse.BUTTON_LEFT:
              // this.lookButtonDown = false;
              break;
            // case EventMouse.BUTTON_MIDDLE:

            case EventMouse.BUTTON_RIGHT:
              this._panButtonDown = false;
              break;
          }
        }

        _onMouseMove(event) {
          if (this._panButtonDown) {
            let delta = event.getDelta(); // this.targetPos.x -= delta.x;
            // this.targetPos.y -= delta.y;

            this.node.rotate(Quat.fromEuler(new Quat(), 0, -delta.x * this._rotateSpeed, 0), Node.NodeSpace.WORLD);
            this.node.rotate(Quat.fromEuler(new Quat(), delta.y * this._rotateSpeed, 0, 0), Node.NodeSpace.LOCAL);
          }
        }

        _onMouseWheel(event) {
          let wheel = 0;

          if (event.getScrollY() > 0) {
            wheel = -1 * this._ratio;
          } else if (event.getScrollY() < 0) {
            wheel = 1 * this._ratio;
          }

          this._mouseWheelPos.set(0, 0, wheel * 10);

          this.node.translate(this._mouseWheelPos, Node.NodeSpace.LOCAL);
        }

        update(deltaTime) {
          // Your update function goes here.
          this._translatePos.set(this._horizontal * deltaTime * this._speed, 0, this._vertical * deltaTime * this._speed);

          this.node.translate(this._translatePos, Node.NodeSpace.LOCAL);
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/warningCircle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Vec3, tween, PoolManager, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "f4b57yoodpAooaYvsjlnvtZ", "warningCircle", undefined);

      const {
        ccclass,
        property
      } = _decorator; //圆圈预警脚本

      let WarningCircle = exports('WarningCircle', (_dec = ccclass('WarningCircle'), _dec(_class = (_temp = class WarningCircle extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_tweenLoop", null);

          _defineProperty(this, "_tweenHide", null);

          _defineProperty(this, "_targetWorPos", new Vec3());

          _defineProperty(this, "_targetScale_1", new Vec3());

          _defineProperty(this, "_targetScale_2", new Vec3());

          _defineProperty(this, "_targetScale_3", new Vec3());

          _defineProperty(this, "_scriptParent", null);
        }

        start() {// [3]
        }

        init(scale, scriptParent) {
          scriptParent.recycleWarning();
          this._scriptParent = scriptParent;

          this._targetScale_1.set(scale, scale, scale);

          this._targetScale_2.set(scale * 0.8, scale * 0.8, scale * 0.8);

          this.node.setScale(this._targetScale_3);
          let playerWorPos = GameManager.ndPlayer.worldPosition;

          this._targetWorPos.set(playerWorPos.x, playerWorPos.y + 0.2, playerWorPos.z);

          this.node.setWorldPosition(this._targetWorPos);

          this._closeTween();

          this.showWarning();
        }

        showWarning() {
          let showTime = 0.4;
          this._tweenLoop = tween(this.node).to(showTime, {
            scale: this._targetScale_1
          }, {
            easing: "smooth"
          }).start();
        }

        hideWarning() {
          this._closeTween();

          this._tweenHide = tween(this.node).to(0.3, {
            scale: this._targetScale_3
          }, {
            easing: "backInOut"
          }).call(() => {
            PoolManager.instance.putNode(this.node);

            this._closeTween();
          }).start();
        }

        _closeTween() {
          if (this._tweenHide) {
            this._tweenHide.stop();

            this._tweenHide = null;
          }

          if (this._tweenLoop) {
            this._tweenLoop.stop();

            this._tweenLoop = null;
          }
        }

      }, _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/homePanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './constant.ts', './clientEvent.ts', './audioManager.ts', './playerData.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, SpriteComponent, LabelComponent, _decorator, Component, Constant, ClientEvent, AudioManager, PlayerData, UIManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      SpriteComponent = module.SpriteComponent;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "f5e45oxGR1Ka5fIEbXV4xsh", "homePanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //主界面脚本

      let HomePanel = exports('HomePanel', (_dec = ccclass('HomePanel'), _dec2 = property(SpriteComponent), _dec3 = property(LabelComponent), _dec(_class = (_class2 = (_temp = class HomePanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "spLevelName", _descriptor, this);

          _initializerDefineProperty(this, "lbLevel", _descriptor2, this);

          _defineProperty(this, "_callback", null);
        }

        onEnable() {}

        onDisable() {}

        start() {// [3]
        }

        show(callback) {
          this._callback = callback; //已经解锁的最高层级

          this.lbLevel.string = `${PlayerData.instance.playerInfo.highestLevel}层`;
        }

        onBtnSettingClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.showDialog("setting/settingPanel", [], () => {}, Constant.PRIORITY.DIALOG);
        }

        onBtnStartClick() {
          AudioManager.instance.playSound(Constant.SOUND.HOME_PANEL_CLICK);
          UIManager.instance.hideDialog("home/homePanel"); // if (this._callback) {
          //     this._callback();
          // } else {

          ClientEvent.dispatchEvent(Constant.EVENT_TYPE.ON_GAME_INIT); // }
        } // onBtnLeftClick () {
        //     AudioManager.instance.playSound(constant.SOUND.CLICK);
        // }
        // onBtnRightClick () {
        //     AudioManager.instance.playSound(constant.SOUND.CLICK);
        // }
        // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spLevelName", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [_dec3], {
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
       * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/uiManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './poolManager.ts', './resourceUtil.ts', './constant.ts', './fightTip.ts', './tips.ts', './playerBloodBar.ts', './monsterBloodBar.ts', './gameManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, Vec3, _decorator, isValid, find, PoolManager, ResourceUtil, Constant, FightTip, tips, PlayerBloodBar, MonsterBloodBar, GameManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      _decorator = module._decorator;
      isValid = module.isValid;
      find = module.find;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ResourceUtil = module.ResourceUtil;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      FightTip = module.FightTip;
    }, function (module) {
      tips = module.tips;
    }, function (module) {
      PlayerBloodBar = module.PlayerBloodBar;
    }, function (module) {
      MonsterBloodBar = module.MonsterBloodBar;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "f9384FYDp5GqoW+CtrCla3U", "uiManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      let SHOW_STR_INTERVAL_TIME = 800;
      let v3_playerBloodOffsetPos = new Vec3(-10, 100, 0); //血条距离玩家节点位置

      let v3_playerBloodScale = new Vec3(1.5, 1.5, 1.5); //玩家血条缩放大小

      let v3_monsterBloodOffsetPos = new Vec3(-10, 100, 0); //血条距离小怪节点位置

      let v3_monsterBloodScale = new Vec3(1.5, 1.5, 1.5); //小怪血条缩放大小

      let UIManager = exports('UIManager', (_dec = ccclass("UIManager"), _dec(_class = (_temp = _class2 = class UIManager {
        constructor() {
          _defineProperty(this, "_dictSharedPanel", {});

          _defineProperty(this, "_dictLoading", {});

          _defineProperty(this, "_arrPopupDialog", []);

          _defineProperty(this, "_showTipsTime", 0);
        }

        static get instance() {
          if (this._instance) {
            return this._instance;
          }

          this._instance = new UIManager();
          return this._instance;
        }
        /**
         * 检查当前界面是否正在展示
         * @param panelPath 
         */


        isDialogVisible(panelPath) {
          if (!this._dictSharedPanel.hasOwnProperty(panelPath)) {
            return false;
          }

          let panel = this._dictSharedPanel[panelPath];
          return isValid(panel) && panel.active && panel.parent;
        }
        /**
         * 显示单例界面
         * @param {String} panelPath 
         * @param {Array} args 
         * @param {Function} cb 回调函数，创建完毕后回调
         */


        showDialog(panelPath, args, cb, panelPriority = Constant.PRIORITY.NORMAL) {
          if (this._dictLoading[panelPath]) {
            return;
          }

          let idxSplit = panelPath.lastIndexOf('/');
          let scriptName = panelPath.slice(idxSplit + 1);

          if (!args) {
            args = [];
          }

          if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this._dictSharedPanel[panelPath];

            if (isValid(panel)) {
              panel.parent = find("Canvas");
              panel.active = true;
              let script = panel.getComponent(scriptName);
              let script2 = panel.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));

              if (script && script.show) {
                script.show.apply(script, args);
                cb && cb(script);
              } else if (script2 && script2.show) {
                script2.show.apply(script2, args);
                cb && cb(script2);
              } else {
                throw `查找不到脚本文件${scriptName}`;
              }

              return;
            }
          }

          this._dictLoading[panelPath] = true;
          ResourceUtil.createUI(panelPath, (err, node) => {
            //判断是否有可能在显示前已经被关掉了？
            let isCloseBeforeShow = false;

            if (!this._dictLoading[panelPath]) {
              //已经被关掉
              isCloseBeforeShow = true;
            }

            this._dictLoading[panelPath] = false;

            if (err) {
              console.error(err);
              return;
            } // node.getComponent(UITransformComponent).priority = panelPriority;


            node.setSiblingIndex(panelPriority);
            this._dictSharedPanel[panelPath] = node;
            let script = node.getComponent(scriptName);
            let script2 = node.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));

            if (script && script.show) {
              script.show.apply(script, args);
              cb && cb(script);
            } else if (script2 && script2.show) {
              script2.show.apply(script2, args);
              cb && cb(script2);
            } else {
              throw `查找不到脚本文件${scriptName}`;
            }

            if (isCloseBeforeShow) {
              //如果在显示前又被关闭，则直接触发关闭掉
              this.hideDialog(panelPath);
            }
          });
        }
        /**
         * 隐藏单例界面
         * @param {String} panelPath 
         * @param {fn} callback
         */


        hideDialog(panelPath, callback) {
          if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            let panel = this._dictSharedPanel[panelPath];

            if (panel && isValid(panel)) {
              let ani = panel.getComponent('animationUI');

              if (ani) {
                ani.close(() => {
                  panel.parent = null;

                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                });
              } else {
                panel.parent = null;

                if (callback && typeof callback === 'function') {
                  callback();
                }
              }
            } else if (callback && typeof callback === 'function') {
              callback();
            }
          }

          this._dictLoading[panelPath] = false;
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {string} panelPath 
         * @param {string} scriptName 
         * @param {*} param 
         */


        pushToPopupSeq(panelPath, scriptName, param) {
          let popupDialog = {
            panelPath: panelPath,
            scriptName: scriptName,
            param: param,
            isShow: false
          };

          this._arrPopupDialog.push(popupDialog);

          this._checkPopupSeq();
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {number} index 
         * @param {string} panelPath 
         * @param {string} scriptName 
         * @param {*} param 
         */


        insertToPopupSeq(index, panelPath, param) {
          let popupDialog = {
            panelPath: panelPath,
            param: param,
            isShow: false
          };

          this._arrPopupDialog.splice(index, 0, popupDialog); //this._checkPopupSeq();

        }
        /**
         * 将弹窗从弹出窗队列中移除
         * @param {string} panelPath 
         */


        shiftFromPopupSeq(panelPath) {
          this.hideDialog(panelPath, () => {
            if (this._arrPopupDialog[0] && this._arrPopupDialog[0].panelPath === panelPath) {
              this._arrPopupDialog.shift();

              this._checkPopupSeq();
            }
          });
        }
        /**
         * 检查当前是否需要弹窗
         */


        _checkPopupSeq() {
          if (this._arrPopupDialog.length > 0) {
            let first = this._arrPopupDialog[0];

            if (!first.isShow) {
              this.showDialog(first.panelPath, first.param);
              this._arrPopupDialog[0].isShow = true;
            }
          }
        }
        /**
         * 显示提示
         * @param {String} content 
         * @param {Function} cb 
         */


        showTips(content, type = 'txt', targetPos = new Vec3(), scale = 1, callback = () => {}) {
          let str = String(content);

          let next = () => {
            this._showTipsAni(str, type, targetPos, scale, callback);
          };

          var now = Date.now();

          if (now - this._showTipsTime < SHOW_STR_INTERVAL_TIME && type !== 'gold' && type !== 'heart') {
            var spareTime = SHOW_STR_INTERVAL_TIME - (now - this._showTipsTime);
            setTimeout(() => {
              next();
            }, spareTime);
            this._showTipsTime = now + spareTime;
          } else {
            next();
            this._showTipsTime = now;
          }
        }
        /**
         * 内部函数
         * @param {String} content 
         * @param {Function} cb 
         */


        _showTipsAni(content, type, targetPos, scale, callback) {
          ResourceUtil.getUIPrefabRes('common/tips', function (err, prefab) {
            if (err) {
              return;
            }

            let tipsNode = PoolManager.instance.getNode(prefab, find("Canvas"));
            let tipScript = tipsNode.getComponent(tips);
            tipScript.show(content, type, targetPos, scale, callback);
          });
        }
        /**
         * 展示血条
         * @param scriptParent 
         * @param totalBlood 
         * @param bloodBarType 
         * @param offsetPos 
         * @param scale 
         */


        showPlayerBloodBar(scriptParent, totalBlood, curBlood, callback = () => {}, offsetPos = v3_playerBloodOffsetPos, scale = v3_playerBloodScale) {
          ResourceUtil.getUIPrefabRes('fight/playerBloodBar', function (err, prefab) {
            if (err) {
              return;
            }

            let ndBloodBar = PoolManager.instance.getNode(prefab, find("Canvas"));
            ndBloodBar.setSiblingIndex(0);
            let scriptBloodBar = ndBloodBar.getComponent(PlayerBloodBar);
            scriptParent.scriptBloodBar = scriptBloodBar;
            scriptBloodBar.show(scriptParent, totalBlood, curBlood, offsetPos, scale, callback);
          });
        }
        /**
         * 展示小怪血条
         *  
         * @param {*} scriptParent 
         * @param {number} totalBlood
         * @param {number} bloodBarType
         * @param {Function} [callback=()=>{}]
         * @param {Vec3} [offsetPos=MONSTER_BLOOD_OFFSET_POS]
         * @param {Vec3} [scale=MONSTER_BLOOD_SCALE]
         * @memberof uiManager
         */


        showMonsterBloodBar(scriptParent, totalBlood, callback = () => {}, offsetPos = v3_monsterBloodOffsetPos, scale = v3_monsterBloodScale) {
          ResourceUtil.getUIPrefabRes('fight/monsterBloodBar', function (err, prefab) {
            if (err) {
              return;
            }

            let ndBloodBar = PoolManager.instance.getNode(prefab, find("Canvas"));
            let scriptBloodBar = ndBloodBar.getComponent(MonsterBloodBar);
            scriptParent.scriptBloodBar = scriptBloodBar;
            scriptBloodBar.show(scriptParent, totalBlood, offsetPos, scale, callback);
          });
        }
        /**
         * 展示血量提示
         */


        showBloodTips(scriptParent, type, bloodNum, offset, callback) {
          ResourceUtil.getUIPrefabRes('common/fightTip', (err, prefab) => {
            var _GameManager$mainCame;

            if (err) {
              return;
            }

            let ndTip = PoolManager.instance.getNode(prefab, find("Canvas"));
            let pos = (_GameManager$mainCame = GameManager.mainCamera) === null || _GameManager$mainCame === void 0 ? void 0 : _GameManager$mainCame.convertToUINode(scriptParent.node.worldPosition, find('Canvas'));
            pos.add(offset);
            ndTip.setPosition(pos);
            let scriptTip = ndTip.getComponent(FightTip);
            scriptTip.show(scriptParent, type, bloodNum, callback);
          });
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightPanel.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './util.ts', './constant.ts', './clientEvent.ts', './audioManager.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameManager.ts', './bossBloodBar.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, LabelComponent, _decorator, Component, Util, Constant, ClientEvent, AudioManager, LocalConfig, PlayerData, UIManager, GameManager, BossBloodBar;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      LabelComponent = module.LabelComponent;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Util = module.Util;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      ClientEvent = module.ClientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      LocalConfig = module.LocalConfig;
    }, function (module) {
      PlayerData = module.PlayerData;
    }, function (module) {
      UIManager = module.UIManager;
    }, function (module) {
      GameManager = module.GameManager;
    }, function (module) {
      BossBloodBar = module.BossBloodBar;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "f952f4sQGRHoaTmPC6i11vU", "fightPanel", undefined);

      const {
        ccclass,
        property
      } = _decorator; //战斗界面脚本

      let FightPanel = exports('FightPanel', (_dec = ccclass('FightPanel'), _dec2 = property(Node), _dec3 = property(LabelComponent), _dec4 = property(LabelComponent), _dec5 = property(Node), _dec(_class = (_class2 = (_temp = class FightPanel extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ndJoystick", _descriptor, this);

          _initializerDefineProperty(this, "lbGold", _descriptor2, this);

          _initializerDefineProperty(this, "lbLevel", _descriptor3, this);

          _initializerDefineProperty(this, "ndBossBloodBar", _descriptor4, this);

          _defineProperty(this, "_debugClickTimes", 0);
        } //调试点击次数


        onEnable() {
          ClientEvent.on(Constant.EVENT_TYPE.REFRESH_GOLD, this._refreshGold, this);
          ClientEvent.on(Constant.EVENT_TYPE.REFRESH_LEVEL, this._refreshLevel, this);
        }

        onDisable() {
          ClientEvent.off(Constant.EVENT_TYPE.REFRESH_GOLD, this._refreshGold, this);
          ClientEvent.off(Constant.EVENT_TYPE.REFRESH_LEVEL, this._refreshLevel, this);
        }

        start() {// [3]
        }

        show() {
          this.ndBossBloodBar.active = false;

          this._refreshGold();

          this._refreshLevel();

          if (GameManager.ndBoss) {
            let bossInfo = LocalConfig.instance.queryByID("base", Constant.BASE.BOSS_01);
            let scriptBossBloodBar = this.ndBossBloodBar.getComponent(BossBloodBar);
            scriptBossBloodBar.show(GameManager.scriptBoss, bossInfo.hp);
          }

          this._debugClickTimes = 0;
        }

        _refreshGold() {
          this.lbGold.string = Util.formatMoney(PlayerData.instance.playerInfo.gold);
        }

        _refreshLevel() {
          this.lbLevel.string = `第${PlayerData.instance.playerInfo.level}层`;
        }

        onBtnPauseClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          UIManager.instance.showDialog("pause/pausePanel", [], () => {}, Constant.PRIORITY.DIALOG);
          GameManager.isGamePause = true;
        }

        onBtnDebugClick() {
          AudioManager.instance.playSound(Constant.SOUND.CLICK);
          this._debugClickTimes += 1;

          if (this._debugClickTimes >= 1) {
            this._debugClickTimes = 0;
            UIManager.instance.showDialog("debug/debugPanel", [], () => {}, Constant.PRIORITY.DIALOG);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndJoystick", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndBossBloodBar", [_dec5], {
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

System.register("chunks:///_virtual/main", ['./poolManager.ts', './resourceUtil.ts', './warningCircle.ts', './util.ts', './constant.ts', './clientEvent.ts', './lodash.ts', './storageManager.ts', './audioManager.ts', './reward.ts', './warningStrip.ts', './warningLine.ts', './effectManager.ts', './csvManager.ts', './localConfig.ts', './playerData.ts', './fightTip.ts', './tips.ts', './playerBloodBar.ts', './monsterBloodBar.ts', './uiManager.ts', './monsterModel.ts', './energyBall.ts', './fireBall.ts', './dispersionSurround.ts', './dispersion.ts', './fireBallBig.ts', './tornado.ts', './laser.ts', './characterRigid.ts', './monster.ts', './jetFires.ts', './boss.ts', './mapManager.ts', './gameCamera.ts', './playerModel.ts', './arrow.ts', './player.ts', './gameManager.ts', './monsterSkillCollider.ts', './shopItem.ts', './skillIcon.ts', './skillList.ts', './pausePanel.ts', './debugLevelItem.ts', './test.ts', './debugSkillItem.ts', './debugPanel.ts', './bossBloodBar.ts', './sdkUtil.ts', './main.ts', './shopPanel.ts', './settlementPanel.ts', './migrate-canvas.ts', './loadingPanel.ts', './settingPanel.ts', './login.ts', './colliderItem.ts', './backPanel.ts', './skillItem.ts', './skillPanel.ts', './joystick.ts', './revivePanel.ts', './camera.ts', './homePanel.ts', './fightPanel.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
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