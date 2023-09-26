module.exports = function(ctx) {
    //android
    var fs = require("fs");
    var srcfile = "configs/ivsamobile/google-services.json";
    var destfile = "android/app/google-services.json";
    if (fs.existsSync('android/app')) {
        fs.createReadStream(srcfile).pipe(fs.createWriteStream(destfile));
    }
    //ios
    var srcfileios = "configs/ivsamobile/GoogleService-Info.plist";
    var destfileios = "ios/App/App/GoogleService-Info.plist";
    if (fs.existsSync('ios/App/App')) {
        fs.createReadStream(srcfileios).pipe(fs.createWriteStream(destfileios));
    }
}
