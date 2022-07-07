set tool=D:\openharmony_SDK\toolchains\3.1.6.6\hdc_std.exe
set pack_local_path=C:\Users\pp\Desktop\OpenHarmony\cocos_ohos_demo\entry\build\default\outputs\default\entry-default-signed.hap
set pack_name=ohos.example.test

%tool% uninstall %pack_name%
%tool% install %pack_local_path%

%tool% shell aa start -b %pack_name% -a %pack_name%.MainAbility

%tool% hilog -r > ./log.txt