set tool=C:\Users\l\AppData\Local\OpenHarmony\Sdk\toolchains\3.1.5.5\hdc_std.exe
set pack_local_path=C:\Users\l\Desktop\open_harmony\cocos_ohos_demo\entry\build\default\outputs\default\entry-default-signed.hap
set pack_name=ohos.example.test

%tool% uninstall %pack_name%
%tool% install %pack_local_path%

%tool% shell aa start -b %pack_name% -a %pack_name%.MainAbility

%tool% hilog -b D -D 0x0001 > ./log.txt