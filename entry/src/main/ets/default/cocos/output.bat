set tool=C:\Users\Administrator\Desktop\openHarmony_config\hdc_std.exe
set packname=ohos.example.test
set assetDir=c:\Users\Administrator\Desktop\cocos_ohos_demo\entry\src\main\ets\default\cocos\assets

%tool%
shell mkdir /data/app/el1/bundle/public/%packname%
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main
%tool% hdc file send %assetDir%\main\config.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/01
%tool% hdc file send %assetDir%\main\import\01\010317e22.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/01
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/0a
%tool% hdc file send %assetDir%\main\import\0a\0add72918.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/0a
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/0b
%tool% hdc file send %assetDir%\main\import\0b\0bebafe32.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/0b
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/54
%tool% hdc file send %assetDir%\main\import\54\54a8fb2e-e252-4caa-b825-a8262d96379e.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/54
%tool% hdc file send %assetDir%\main\import\54\54a8fb2e-e252-4caa-b825-a8262d96379e.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/54
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/7c
%tool% hdc file send %assetDir%\main\import\7c\7c260f26-3135-47d3-9703-46d4958cce56.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/7c
%tool% hdc file send %assetDir%\main\import\7c\7c260f26-3135-47d3-9703-46d4958cce56.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/7c
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/85
%tool% hdc file send %assetDir%\main\import\85\85961562-cd9f-46d3-b38c-244b3e47b126.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/85
%tool% hdc file send %assetDir%\main\import\85\85961562-cd9f-46d3-b38c-244b3e47b126.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/85
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/fd
%tool% hdc file send %assetDir%\main\import\fd\fd8ec536-a354-4a17-9c74-4f3883c378c8.json /data/app/el1/bundle/public/%packname%/%packname%/assets/main/import/fd
%tool% hdc file send %assetDir%\main\index.js /data/app/el1/bundle/public/%packname%/%packname%/assets/main
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/04
%tool% hdc file send %assetDir%\main\native\04\04e17782-067b-4cf8-a733-423ef0530678.jpg /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/04
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/06
%tool% hdc file send %assetDir%\main\native\06\06494e00-5c00-4dfd-befe-e215b58d798d.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/06
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/0a
%tool% hdc file send %assetDir%\main\native\0a\0a6a7a6b-e884-4c1b-ac89-2f6c954f5002.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/0a
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/12
%tool% hdc file send %assetDir%\main\native\12\1263d74c-8167-4928-91a6-4e2672411f47@2e76e.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/12
%tool% hdc file send %assetDir%\main\native\12\1263d74c-8167-4928-91a6-4e2672411f47@fc873.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/12
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/16
%tool% hdc file send %assetDir%\main\native\16\1680f0d6-6b3f-45ed-bda7-00531580f9ac.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/16
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/19
%tool% hdc file send %assetDir%\main\native\19\19a03ed4-c94b-4f78-b8ff-961154d70254.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/19
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/20
%tool% hdc file send %assetDir%\main\native\20\20835ba4-6145-4fbc-a58a-051ce700aa3e.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/20
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/38
%tool% hdc file send %assetDir%\main\native\38\383141c1-ab5e-4b8b-babd-406e41fc7654.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/38
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/3c
%tool% hdc file send %assetDir%\main\native\3c\3c66444e-6316-4a4c-8307-f0de369480f1.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/3c
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/3f
%tool% hdc file send %assetDir%\main\native\3f\3f8e9852-637e-456c-88c8-3ebaaccb9d87.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/3f
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/41
%tool% hdc file send %assetDir%\main\native\41\41972c30-e4f5-4427-ba84-a2d1884400f1@97298.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/41
%tool% hdc file send %assetDir%\main\native\41\41c84e29-673c-4bc4-9c2e-e72f39d9db19.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/41
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/42
%tool% hdc file send %assetDir%\main\native\42\42a53642-c5c6-4baa-915e-c371a67accfd.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/42
%tool% hdc file send %assetDir%\main\native\42\42fd9447-3d0f-489c-ac39-abc62455bca0.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/42
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/45
%tool% hdc file send %assetDir%\main\native\45\451875d4-a1b1-465a-a9e9-f9dabd464c8a.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/45
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/49
%tool% hdc file send %assetDir%\main\native\49\49e3188a-8816-4cee-8abe-e48c6718ac7d.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/49
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/53
%tool% hdc file send %assetDir%\main\native\53\53ace68b-408a-4ce9-9ddf-574bd583a7e0.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/53
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/54
%tool% hdc file send %assetDir%\main\native\54\544e49d6-3f05-4fa8-9a9e-091f98fc2ce8.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/54
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/58
%tool% hdc file send %assetDir%\main\native\58\58fe4ce0-d561-4149-a051-952a4e688dbb.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/58
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/5b
%tool% hdc file send %assetDir%\main\native\5b\5b04aabd-c660-4a01-b251-a9cf1803b10a.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/5b
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/5f
%tool% hdc file send %assetDir%\main\native\5f\5fa40947-b848-414e-abf1-9439b1e4a9f4.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/5f
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/63
%tool% hdc file send %assetDir%\main\native\63\63e607b1-28e9-4113-8921-732d31ff1de2.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/63
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/6e
%tool% hdc file send %assetDir%\main\native\6e\6ee3d01b-7011-4cfd-92b3-50dff592966b.jpg /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/6e
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/71
%tool% hdc file send %assetDir%\main\native\71\71d0b0a7-6303-4317-986a-2ba0045e0560@fa5f7.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/71
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/76
%tool% hdc file send %assetDir%\main\native\76\76885869-e009-4569-8a4b-ade2273b62bb.jpg /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/76
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/79
%tool% hdc file send %assetDir%\main\native\79\79c83ec5-d0e3-4528-8c76-a85352ec3b5e.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/79
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/7a
%tool% hdc file send %assetDir%\main\native\7a\7af45449-912a-4b80-bf3d-c70fc639af34@d2b5a.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/7a
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/8f
%tool% hdc file send %assetDir%\main\native\8f\8f433cf5-76d4-4952-9035-2bf223f40bf9.jpg /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/8f
%tool% hdc file send %assetDir%\main\native\8f\8feb4bd2-4563-4234-9f73-cb3d966e32e1.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/8f
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/92
%tool% hdc file send %assetDir%\main\native\92\922b020f-49ed-47f5-8ab1-aa8c4930a4f2@76a7a.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/92
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/95
%tool% hdc file send %assetDir%\main\native\95\951249e0-9f16-456d-8b85-a6ca954da16b.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/95
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@0cbd1.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@32630.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@375a8.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@645cc.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@671f5.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@699a3.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@6dfd9.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@ad41d.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@d4e1f.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@dd95a.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@de77e.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@ee276.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% hdc file send %assetDir%\main\native\9c\9cad9c9d-42cc-4a14-a160-dd353bd95c6c@f78c4.bin /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9c
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9e
%tool% hdc file send %assetDir%\main\native\9e\9e310e8b-129f-405d-bca7-c1fdc80cf46d.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9e
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9f
%tool% hdc file send %assetDir%\main\native\9f\9fc11a65-c4c5-403d-b2a8-ded943a0267e.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/9f
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/a5
%tool% hdc file send %assetDir%\main\native\a5\a5344a4f-0205-4f17-8673-24569dce48bc.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/a5
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/ae
%tool% hdc file send %assetDir%\main\native\ae\ae1ee007-e574-460e-a018-828c0503e29f.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/ae
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/af
%tool% hdc file send %assetDir%\main\native\af\af55ae53-397c-404c-ae3d-f7c7300146f0.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/af
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/b0
%tool% hdc file send %assetDir%\main\native\b0\b0c9791b-993a-433b-bc32-165308ec14a9.jpg /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/b0
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/b6
%tool% hdc file send %assetDir%\main\native\b6\b6f847bc-9035-47ac-a203-002b7455cfa1.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/b6
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/bd
%tool% hdc file send %assetDir%\main\native\bd\bda4ec6f-b81f-4727-a41c-9c8e8978864d.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/bd
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/be
%tool% hdc file send %assetDir%\main\native\be\be29a96a-2a67-4b1e-8fd7-0dd2bb10afdc.mp3 /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/be
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c2
%tool% hdc file send %assetDir%\main\native\c2\c2b2405f-b0fe-4f55-a18e-35a863d7251e.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c2
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c4
%tool% hdc file send %assetDir%\main\native\c4\c48afca8-6788-44b7-8059-fddf04107fac.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c4
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c6
%tool% hdc file send %assetDir%\main\native\c6\c694632c-86ef-45d0-a653-7397a296bb1a.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/c6
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/d7
%tool% hdc file send %assetDir%\main\native\d7\d7e0de69-fffb-4fc2-b86a-ef68170f5dd0.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/d7
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/dd
%tool% hdc file send %assetDir%\main\native\dd\dd27994c-a2da-4638-846d-32b58b796dec.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/dd
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/df
%tool% hdc file send %assetDir%\main\native\df\dfd54833-2897-43d9-b3af-0cb4d3e6605f.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/df
%tool% shell mkdir /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/ef
%tool% hdc file send %assetDir%\main\native\ef\ef871ffb-7b74-4fee-878d-7fe9780a1f50.png /data/app/el1/bundle/public/%packname%/%packname%/assets/main/native/ef
