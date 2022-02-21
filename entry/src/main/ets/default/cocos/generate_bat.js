const fs = require('fs');
const ps = require('path')

const assetsDir = String.raw`c:\Users\l\Desktop\MyApplication_cocos\entry\src\main\ets\default\cocos\assets`;
const hdcPath = String.raw`C:\Users\l\Desktop\openHarmony_config\hdc_std.exe`

const packName = 'ohos.example.test';
const targetAssetFolderName = `/data/accounts/account_0/applications/%packname%/%packname%/assets`;
let targetBat = `set tool=${hdcPath}\nset packname=${packName}\nset assetDir=${assetsDir}\n\n%tool% shell mkdir /data/accounts/account_0/applications/%packname%\n%tool% shell mkdir /data/accounts/account_0/applications/%packname%/%packname%\n`;

function visit (path) {
    const relativePath = ps.relative(assetsDir, path);
    if (fs.statSync(path).isDirectory()) {
        let targetDir = ps.join(targetAssetFolderName, relativePath);
        targetDir = targetDir.replace(/\\/g, '/');
        targetBat += `%tool% shell mkdir ${targetDir}\n`;
        const dirList = fs.readdirSync(path);
        dirList.forEach(item => {
            item = ps.join(path, item);
            visit(item);
        });
    } else {
        let targetDir = ps.dirname(ps.join(targetAssetFolderName, relativePath));
        targetDir = targetDir.replace(/\\/g, '/');
        let fromPath = `%assetDir%\\${relativePath}`;
        targetBat += `%tool% hdc file send ${fromPath} ${targetDir}\n`;
    }
}

visit(assetsDir);

fs.writeFileSync('./output.bat', targetBat, 'utf-8');