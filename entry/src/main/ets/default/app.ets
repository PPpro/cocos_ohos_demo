import nativerender from "libcocos2d.so";
import { ContextType } from "./common/Constants"
import { WorkerManager } from './cocos/WorkerManager.ets'
import {log} from './cocos/log_utils'


log('===========================================')

console.log('pptest non-worker data view test 1');
let uint8s = new Uint8Array([1,1,3,0,0,0,0,0,0,0,0,0,192,63,0,0,64,64,82,0,0,0,0,0,128,63,2,0,0,128,63,0,0,128,63,82,0,0,0,92,143,130,63,2,0,0,128,63,0,0,128,63,82,0,0,0,0,0,128,63,2,0,0,128,63,0,0,128,63]);
console.log('pptest non-worker data view test 2' + uint8s.byteOffset + uint8s.byteLength);
let dv = new DataView(uint8s.buffer, uint8s.byteOffset, uint8s.byteLength);
console.log('pptest non-worker data view test 3');
dv.getFloat32(6, true);
console.log('pptest non-worker data view test 4');


const nativeAppLifecycle = nativerender.getContext(ContextType.APP_LIFECYCLE);
export default {
  onCreate() {
    console.info('[LIFECYCLE-App] kee cocos onCreate')
    /***App 生命周期回调在Host JS Runtime中完成***/
    nativeAppLifecycle.onCreate();

  },
  onShow() {
    console.info('[LIFECYCLE-App] kee cocos onShow')
    nativeAppLifecycle.onShow();
  },
  onHide() {
    console.info('[LIFECYCLE-App] kee cocos onHide')
    nativeAppLifecycle.onHide();
  },
  onDestroy() {
    console.info('[LIFECYCLE-App] kee cocos onDestroy')
    nativeAppLifecycle.onDestroy();
  },
}