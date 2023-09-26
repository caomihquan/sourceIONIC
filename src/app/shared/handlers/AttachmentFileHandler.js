const AttachmentFileHandler = {
    getFileType: (file) => {
        const arrSplit = file.split('.');
        const len = arrSplit.length > 0 ? arrSplit.length - 1 : 0
        const ext = arrSplit[len];
        let fileType = "";
        switch (ext) {
            case "x3d":
                fileType = "application/vnd.hzn-3d-crossword";
                break;
            case "3gp":
                fileType = "video/3gpp";
                break;
            case "3g2":
                fileType = "video/3gpp2";
                break;
            case "mseq":
                fileType = "application/vnd.mseq";
                break;
            case "pwn":
                fileType = "application/vnd.3m.post-it-notes";
                break;
            case "plb":
                fileType = "application/vnd.3gpp.pic-bw-large";
                break;
            case "psb":
                fileType = "application/vnd.3gpp.pic-bw-small";
                break;
            case "pvb":
                fileType = "application/vnd.3gpp.pic-bw-var";
                break;
            case "tcap":
                fileType = "application/vnd.3gpp2.tcap";
                break;
            case "7z":
                fileType = "application/x-7z-compressed";
                break;
            case "abw":
                fileType = "application/x-abiword";
                break;
            case "ace":
                fileType = "application/x-ace-compressed";
                break;
            case "acc":
                fileType = "application/vnd.americandynamics.acc";
                break;
            case "acu":
                fileType = "application/vnd.acucobol";
                break;
            case "atc":
                fileType = "application/vnd.acucorp";
                break;
            case "adp":
                fileType = "audio/adpcm";
                break;
            case "aab":
                fileType = "application/x-authorware-bin";
                break;
            case "aam":
                fileType = "application/x-authorware-map";
                break;
            case "aas":
                fileType = "application/x-authorware-seg";
                break;
            case "air":
                fileType = "application/vnd.adobe.air-application-installer-package+zip";
                break;
            case "swf":
                fileType = "application/x-shockwave-flash";
                break;
            case "fxp":
                fileType = "application/vnd.adobe.fxp";
                break;
            case "pdf":
                fileType = "application/pdf";
                break;
            case "ppd":
                fileType = "application/vnd.cups-ppd";
                break;
            case "dir":
                fileType = "application/x-director";
                break;
            case "xdp":
                fileType = "application/vnd.adobe.xdp+xml";
                break;
            case "xfdf":
                fileType = "application/vnd.adobe.xfdf";
                break;
            case "aac":
                fileType = "audio/x-aac";
                break;
            case "ahead":
                fileType = "application/vnd.ahead.space";
                break;
            case "azf":
                fileType = "application/vnd.airzip.filesecure.azf";
                break;
            case "azs":
                fileType = "application/vnd.airzip.filesecure.azs";
                break;
            case "azw":
                fileType = "application/vnd.amazon.ebook";
                break;
            case "ami":
                fileType = "application/vnd.amiga.ami";
                break;
            case "N/A":
                fileType = "application/andrew-inset";
                break;
            case "apk":
                fileType = "application/vnd.android.package-archive";
                break;
            case "cii":
                fileType = "application/vnd.anser-web-certificate-issue-initiation";
                break;
            case "fti":
                fileType = "application/vnd.anser-web-funds-transfer-initiation";
                break;
            case "atx":
                fileType = "application/vnd.antix.game-component";
                break;
            case "dmg":
                fileType = "application/x-apple-diskimage";
                break;
            case "mpkg":
                fileType = "application/vnd.apple.installer+xml";
                break;
            case "aw":
                fileType = "application/applixware";
                break;
            case "les":
                fileType = "application/vnd.hhe.lesson-player";
                break;
            case "swi":
                fileType = "application/vnd.aristanetworks.swi";
                break;
            case "s":
                fileType = "text/x-asm";
                break;
            case "atomcat":
                fileType = "application/atomcat+xml";
                break;
            case "atomsvc":
                fileType = "application/atomsvc+xml";
                break;
            case "atom":
                fileType = "application/atom+xml";
                break;
            case "ac":
                fileType = "application/pkix-attr-cert";
                break;
            case "aif":
                fileType = "audio/x-aiff";
                break;
            case "avi":
                fileType = "video/x-msvideo";
                break;
            case "aep":
                fileType = "application/vnd.audiograph";
                break;
            case "dxf":
                fileType = "image/vnd.dxf";
                break;
            case "dwf":
                fileType = "model/vnd.dwf";
                break;
            case "par":
                fileType = "text/plain-bas";
                break;
            case "bcpio":
                fileType = "application/x-bcpio";
                break;
            case "bin":
                fileType = "application/octet-stream";
                break;
            case "bmp":
                fileType = "image/bmp";
                break;
            case "torrent":
                fileType = "application/x-bittorrent";
                break;
            case "cod":
                fileType = "application/vnd.rim.cod";
                break;
            case "mpm":
                fileType = "application/vnd.blueice.multipass";
                break;
            case "bmi":
                fileType = "application/vnd.bmi";
                break;
            case "sh":
                fileType = "application/x-sh";
                break;
            case "btif":
                fileType = "image/prs.btif";
                break;
            case "rep":
                fileType = "application/vnd.businessobjects";
                break;
            case "bz":
                fileType = "application/x-bzip";
                break;
            case "bz2":
                fileType = "application/x-bzip2";
                break;
            case "csh":
                fileType = "application/x-csh";
                break;
            case "c":
                fileType = "text/x-c";
                break;
            case "cdxml":
                fileType = "application/vnd.chemdraw+xml";
                break;
            case "css":
                fileType = "text/css";
                break;
            case "cdx":
                fileType = "chemical/x-cdx";
                break;
            case "cml":
                fileType = "chemical/x-cml";
                break;
            case "csml":
                fileType = "chemical/x-csml";
                break;
            case "cdbcmsg":
                fileType = "application/vnd.contact.cmsg";
                break;
            case "cla":
                fileType = "application/vnd.claymore";
                break;
            case "c4g":
                fileType = "application/vnd.clonk.c4group";
                break;
            case "sub":
                fileType = "image/vnd.dvb.subtitle";
                break;
            case "cdmia":
                fileType = "application/cdmi-capability";
                break;
            case "cdmic":
                fileType = "application/cdmi-container";
                break;
            case "cdmid":
                fileType = "application/cdmi-domain";
                break;
            case "cdmio":
                fileType = "application/cdmi-object";
                break;
            case "cdmiq":
                fileType = "application/cdmi-queue";
                break;
            case "c11amc":
                fileType = "application/vnd.cluetrust.cartomobile-config";
                break;
            case "c11amz":
                fileType = "application/vnd.cluetrust.cartomobile-config-pkg";
                break;
            case "ras":
                fileType = "image/x-cmu-raster";
                break;
            case "dae":
                fileType = "model/vnd.collada+xml";
                break;
            case "csv":
                fileType = "text/csv";
                break;
            case "cpt":
                fileType = "application/mac-compactpro";
                break;
            case "wmlc":
                fileType = "application/vnd.wap.wmlc";
                break;
            case "cgm":
                fileType = "image/cgm";
                break;
            case "ice":
                fileType = "x-conference/x-cooltalk";
                break;
            case "cmx":
                fileType = "image/x-cmx";
                break;
            case "xar":
                fileType = "application/vnd.xara";
                break;
            case "cmc":
                fileType = "application/vnd.cosmocaller";
                break;
            case "cpio":
                fileType = "application/x-cpio";
                break;
            case "clkx":
                fileType = "application/vnd.crick.clicker";
                break;
            case "clkk":
                fileType = "application/vnd.crick.clicker.keyboard";
                break;
            case "clkp":
                fileType = "application/vnd.crick.clicker.palette";
                break;
            case "clkt":
                fileType = "application/vnd.crick.clicker.template";
                break;
            case "clkw":
                fileType = "application/vnd.crick.clicker.wordbank";
                break;
            case "wbs":
                fileType = "application/vnd.criticaltools.wbs+xml";
                break;
            case "cryptonote":
                fileType = "application/vnd.rig.cryptonote";
                break;
            case "cif":
                fileType = "chemical/x-cif";
                break;
            case "cmdf":
                fileType = "chemical/x-cmdf";
                break;
            case "cu":
                fileType = "application/cu-seeme";
                break;
            case "cww":
                fileType = "application/prs.cww";
                break;
            case "curl":
                fileType = "text/vnd.curl";
                break;
            case "dcurl":
                fileType = "text/vnd.curl.dcurl";
                break;
            case "mcurl":
                fileType = "text/vnd.curl.mcurl";
                break;
            case "scurl":
                fileType = "text/vnd.curl.scurl";
                break;
            case "car":
                fileType = "application/vnd.curl.car";
                break;
            case "pcurl":
                fileType = "application/vnd.curl.pcurl";
                break;
            case "cmp":
                fileType = "application/vnd.yellowriver-custom-menu";
                break;
            case "dssc":
                fileType = "application/dssc+der";
                break;
            case "xdssc":
                fileType = "application/dssc+xml";
                break;
            case "deb":
                fileType = "application/x-debian-package";
                break;
            case "uva":
                fileType = "audio/vnd.dece.audio";
                break;
            case "uvi":
                fileType = "image/vnd.dece.graphic";
                break;
            case "uvh":
                fileType = "video/vnd.dece.hd";
                break;
            case "uvm":
                fileType = "video/vnd.dece.mobile";
                break;
            case "uvu":
                fileType = "video/vnd.uvvu.mp4";
                break;
            case "uvp":
                fileType = "video/vnd.dece.pd";
                break;
            case "uvs":
                fileType = "video/vnd.dece.sd";
                break;
            case "uvv":
                fileType = "video/vnd.dece.video";
                break;
            case "dvi":
                fileType = "application/x-dvi";
                break;
            case "seed":
                fileType = "application/vnd.fdsn.seed";
                break;
            case "dtb":
                fileType = "application/x-dtbook+xml";
                break;
            case "res":
                fileType = "application/x-dtbresource+xml";
                break;
            case "ait":
                fileType = "application/vnd.dvb.ait";
                break;
            case "svc":
                fileType = "application/vnd.dvb.service";
                break;
            case "eol":
                fileType = "audio/vnd.digital-winds";
                break;
            case "djvu":
                fileType = "image/vnd.djvu";
                break;
            case "dtd":
                fileType = "application/xml-dtd";
                break;
            case "mlp":
                fileType = "application/vnd.dolby.mlp";
                break;
            case "wad":
                fileType = "application/x-doom";
                break;
            case "dpg":
                fileType = "application/vnd.dpgraph";
                break;
            case "dra":
                fileType = "audio/vnd.dra";
                break;
            case "dfac":
                fileType = "application/vnd.dreamfactory";
                break;
            case "dts":
                fileType = "audio/vnd.dts";
                break;
            case "dtshd":
                fileType = "audio/vnd.dts.hd";
                break;
            case "dwg":
                fileType = "image/vnd.dwg";
                break;
            case "geo":
                fileType = "application/vnd.dynageo";
                break;
            case "es":
                fileType = "application/ecmascript";
                break;
            case "mag":
                fileType = "application/vnd.ecowin.chart";
                break;
            case "mmr":
                fileType = "image/vnd.fujixerox.edmics-mmr";
                break;
            case "rlc":
                fileType = "image/vnd.fujixerox.edmics-rlc";
                break;
            case "exi":
                fileType = "application/exi";
                break;
            case "mgz":
                fileType = "application/vnd.proteus.magazine";
                break;
            case "epub":
                fileType = "application/epub+zip";
                break;
            case "eml":
                fileType = "message/rfc822";
                break;
            case "nml":
                fileType = "application/vnd.enliven";
                break;
            case "xpr":
                fileType = "application/vnd.is-xpr";
                break;
            case "xif":
                fileType = "image/vnd.xiff";
                break;
            case "xfdl":
                fileType = "application/vnd.xfdl";
                break;
            case "emma":
                fileType = "application/emma+xml";
                break;
            case "ez2":
                fileType = "application/vnd.ezpix-album";
                break;
            case "ez3":
                fileType = "application/vnd.ezpix-package";
                break;
            case "fst":
                fileType = "image/vnd.fst";
                break;
            case "fvt":
                fileType = "video/vnd.fvt";
                break;
            case "fbs":
                fileType = "image/vnd.fastbidsheet";
                break;
            case "fe_launch":
                fileType = "application/vnd.denovo.fcselayout-link";
                break;
            case "f4v":
                fileType = "video/x-f4v";
                break;
            case "flv":
                fileType = "video/x-flv";
                break;
            case "fpx":
                fileType = "image/vnd.fpx";
                break;
            case "npx":
                fileType = "image/vnd.net-fpx";
                break;
            case "flx":
                fileType = "text/vnd.fmi.flexstor";
                break;
            case "fli":
                fileType = "video/x-fli";
                break;
            case "ftc":
                fileType = "application/vnd.fluxtime.clip";
                break;
            case "fdf":
                fileType = "application/vnd.fdf";
                break;
            case "f":
                fileType = "text/x-fortran";
                break;
            case "mif":
                fileType = "application/vnd.mif";
                break;
            case "fm":
                fileType = "application/vnd.framemaker";
                break;
            case "fh":
                fileType = "image/x-freehand";
                break;
            case "fsc":
                fileType = "application/vnd.fsc.weblaunch";
                break;
            case "fnc":
                fileType = "application/vnd.frogans.fnc";
                break;
            case "ltf":
                fileType = "application/vnd.frogans.ltf";
                break;
            case "ddd":
                fileType = "application/vnd.fujixerox.ddd";
                break;
            case "xdw":
                fileType = "application/vnd.fujixerox.docuworks";
                break;
            case "xbd":
                fileType = "application/vnd.fujixerox.docuworks.binder";
                break;
            case "oas":
                fileType = "application/vnd.fujitsu.oasys";
                break;
            case "oa2":
                fileType = "application/vnd.fujitsu.oasys2";
                break;
            case "oa3":
                fileType = "application/vnd.fujitsu.oasys3";
                break;
            case "fg5":
                fileType = "application/vnd.fujitsu.oasysgp";
                break;
            case "bh2":
                fileType = "application/vnd.fujitsu.oasysprs";
                break;
            case "spl":
                fileType = "application/x-futuresplash";
                break;
            case "fzs":
                fileType = "application/vnd.fuzzysheet";
                break;
            case "g3":
                fileType = "image/g3fax";
                break;
            case "gmx":
                fileType = "application/vnd.gmx";
                break;
            case "gtw":
                fileType = "model/vnd.gtw";
                break;
            case "txd":
                fileType = "application/vnd.genomatix.tuxedo";
                break;
            case "ggb":
                fileType = "application/vnd.geogebra.file";
                break;
            case "ggt":
                fileType = "application/vnd.geogebra.tool";
                break;
            case "gdl":
                fileType = "model/vnd.gdl";
                break;
            case "gex":
                fileType = "application/vnd.geometry-explorer";
                break;
            case "gxt":
                fileType = "application/vnd.geonext";
                break;
            case "g2w":
                fileType = "application/vnd.geoplan";
                break;
            case "g3w":
                fileType = "application/vnd.geospace";
                break;
            case "gsf":
                fileType = "application/x-font-ghostscript";
                break;
            case "bdf":
                fileType = "application/x-font-bdf";
                break;
            case "gtar":
                fileType = "application/x-gtar";
                break;
            case "texinfo":
                fileType = "application/x-texinfo";
                break;
            case "gnumeric":
                fileType = "application/x-gnumeric";
                break;
            case "kml":
                fileType = "application/vnd.google-earth.kml+xml";
                break;
            case "kmz":
                fileType = "application/vnd.google-earth.kmz";
                break;
            case "gqf":
                fileType = "application/vnd.grafeq";
                break;
            case "gif":
                fileType = "image/gif";
                break;
            case "gv":
                fileType = "text/vnd.graphviz";
                break;
            case "gac":
                fileType = "application/vnd.groove-account";
                break;
            case "ghf":
                fileType = "application/vnd.groove-help";
                break;
            case "gim":
                fileType = "application/vnd.groove-identity-message";
                break;
            case "grv":
                fileType = "application/vnd.groove-injector";
                break;
            case "gtm":
                fileType = "application/vnd.groove-tool-message";
                break;
            case "tpl":
                fileType = "application/vnd.groove-tool-template";
                break;
            case "vcg":
                fileType = "application/vnd.groove-vcard";
                break;
            case "h261":
                fileType = "video/h261";
                break;
            case "h263":
                fileType = "video/h263";
                break;
            case "h264":
                fileType = "video/h264";
                break;
            case "hpid":
                fileType = "application/vnd.hp-hpid";
                break;
            case "hps":
                fileType = "application/vnd.hp-hps";
                break;
            case "hdf":
                fileType = "application/x-hdf";
                break;
            case "rip":
                fileType = "audio/vnd.rip";
                break;
            case "hbci":
                fileType = "application/vnd.hbci";
                break;
            case "jlt":
                fileType = "application/vnd.hp-jlyt";
                break;
            case "pcl":
                fileType = "application/vnd.hp-pcl";
                break;
            case "hpgl":
                fileType = "application/vnd.hp-hpgl";
                break;
            case "hvs":
                fileType = "application/vnd.yamaha.hv-script";
                break;
            case "hvd":
                fileType = "application/vnd.yamaha.hv-dic";
                break;
            case "hvp":
                fileType = "application/vnd.yamaha.hv-voice";
                break;
            case "sfd":
                fileType = "application/vnd.hydrostatix.sof-data";
                break;
            case "stk":
                fileType = "application/hyperstudio";
                break;
            case "hal":
                fileType = "application/vnd.hal+xml";
                break;
            case "html":
                fileType = "text/html";
                break;
            case "irm":
                fileType = "application/vnd.ibm.rights-management";
                break;
            case "sc":
                fileType = "application/vnd.ibm.secure-container";
                break;
            case "ics":
                fileType = "text/calendar";
                break;
            case "icc":
                fileType = "application/vnd.iccprofile";
                break;
            case "ico":
                fileType = "image/x-icon";
                break;
            case "igl":
                fileType = "application/vnd.igloader";
                break;
            case "ief":
                fileType = "image/ief";
                break;
            case "ivp":
                fileType = "application/vnd.immervision-ivp";
                break;
            case "ivu":
                fileType = "application/vnd.immervision-ivu";
                break;
            case "rif":
                fileType = "application/reginfo+xml";
                break;
            case "3dml":
                fileType = "text/vnd.in3d.3dml";
                break;
            case "spot":
                fileType = "text/vnd.in3d.spot";
                break;
            case "igs":
                fileType = "model/iges";
                break;
            case "i2g":
                fileType = "application/vnd.intergeo";
                break;
            case "cdy":
                fileType = "application/vnd.cinderella";
                break;
            case "xpw":
                fileType = "application/vnd.intercon.formnet";
                break;
            case "fcs":
                fileType = "application/vnd.isac.fcs";
                break;
            case "ipfix":
                fileType = "application/ipfix";
                break;
            case "cer":
                fileType = "application/pkix-cert";
                break;
            case "pki":
                fileType = "application/pkixcmp";
                break;
            case "crl":
                fileType = "application/pkix-crl";
                break;
            case "pkipath":
                fileType = "application/pkix-pkipath";
                break;
            case "igm":
                fileType = "application/vnd.insors.igm";
                break;
            case "rcprofile":
                fileType = "application/vnd.ipunplugged.rcprofile";
                break;
            case "irp":
                fileType = "application/vnd.irepository.package+xml";
                break;
            case "jad":
                fileType = "text/vnd.sun.j2me.app-descriptor";
                break;
            case "jar":
                fileType = "application/java-archive";
                break;
            case "class":
                fileType = "application/java-vm";
                break;
            case "jnlp":
                fileType = "application/x-java-jnlp-file";
                break;
            case "ser":
                fileType = "application/java-serialized-object";
                break;
            case "java":
                fileType = "text/x-java-source,java";
                break;
            case "js":
                fileType = "application/javascript";
                break;
            case "json":
                fileType = "application/json";
                break;
            case "joda":
                fileType = "application/vnd.joost.joda-archive";
                break;
            case "jpm":
                fileType = "video/jpm";
                break;
            case "jpg":
                fileType = "image/jpeg";
                break;
            case "jpeg":
                fileType = "image/jpeg";
                break;
            case "jpeg":
                fileType = "image/x-citrix-jpeg";
                break;
            case "pjpeg":
                fileType = "image/pjpeg";
                break;
            case "jpgv":
                fileType = "video/jpeg";
                break;
            case "ktz":
                fileType = "application/vnd.kahootz";
                break;
            case "mmd":
                fileType = "application/vnd.chipnuts.karaoke-mmd";
                break;
            case "karbon":
                fileType = "application/vnd.kde.karbon";
                break;
            case "chrt":
                fileType = "application/vnd.kde.kchart";
                break;
            case "kfo":
                fileType = "application/vnd.kde.kformula";
                break;
            case "flw":
                fileType = "application/vnd.kde.kivio";
                break;
            case "kon":
                fileType = "application/vnd.kde.kontour";
                break;
            case "kpr":
                fileType = "application/vnd.kde.kpresenter";
                break;
            case "ksp":
                fileType = "application/vnd.kde.kspread";
                break;
            case "kwd":
                fileType = "application/vnd.kde.kword";
                break;
            case "htke":
                fileType = "application/vnd.kenameaapp";
                break;
            case "kia":
                fileType = "application/vnd.kidspiration";
                break;
            case "kne":
                fileType = "application/vnd.kinar";
                break;
            case "sse":
                fileType = "application/vnd.kodak-descriptor";
                break;
            case "lasxml":
                fileType = "application/vnd.las.las+xml";
                break;
            case "latex":
                fileType = "application/x-latex";
                break;
            case "lbd":
                fileType = "application/vnd.llamagraphics.life-balance.desktop";
                break;
            case "lbe":
                fileType = "application/vnd.llamagraphics.life-balance.exchange+xml";
                break;
            case "jam":
                fileType = "application/vnd.jam";
                break;
            case "123":
                fileType = "application/vnd.lotus-1-2-3";
                break;
            case "apr":
                fileType = "application/vnd.lotus-approach";
                break;
            case "pre":
                fileType = "application/vnd.lotus-freelance";
                break;
            case "nsf":
                fileType = "application/vnd.lotus-notes";
                break;
            case "org":
                fileType = "application/vnd.lotus-organizer";
                break;
            case "scm":
                fileType = "application/vnd.lotus-screencam";
                break;
            case "lwp":
                fileType = "application/vnd.lotus-wordpro";
                break;
            case "lvp":
                fileType = "audio/vnd.lucent.voice";
                break;
            case "m3u":
                fileType = "audio/x-mpegurl";
                break;
            case "m4v":
                fileType = "video/x-m4v";
                break;
            case "hqx":
                fileType = "application/mac-binhex40";
                break;
            case "portpkg":
                fileType = "application/vnd.macports.portpkg";
                break;
            case "mgp":
                fileType = "application/vnd.osgeo.mapguide.package";
                break;
            case "mrc":
                fileType = "application/marc";
                break;
            case "mrcx":
                fileType = "application/marcxml+xml";
                break;
            case "mxf":
                fileType = "application/mxf";
                break;
            case "nbp":
                fileType = "application/vnd.wolfram.player";
                break;
            case "ma":
                fileType = "application/mathematica";
                break;
            case "mathml":
                fileType = "application/mathml+xml";
                break;
            case "mbox":
                fileType = "application/mbox";
                break;
            case "mc1":
                fileType = "application/vnd.medcalcdata";
                break;
            case "mscml":
                fileType = "application/mediaservercontrol+xml";
                break;
            case "cdkey":
                fileType = "application/vnd.mediastation.cdkey";
                break;
            case "mwf":
                fileType = "application/vnd.mfer";
                break;
            case "mfm":
                fileType = "application/vnd.mfmp";
                break;
            case "msh":
                fileType = "model/mesh";
                break;
            case "mads":
                fileType = "application/mads+xml";
                break;
            case "mets":
                fileType = "application/mets+xml";
                break;
            case "mods":
                fileType = "application/mods+xml";
                break;
            case "meta4":
                fileType = "application/metalink4+xml";
                break;
            case "mcd":
                fileType = "application/vnd.mcd";
                break;
            case "flo":
                fileType = "application/vnd.micrografx.flo";
                break;
            case "igx":
                fileType = "application/vnd.micrografx.igx";
                break;
            case "es3":
                fileType = "application/vnd.eszigno3+xml";
                break;
            case "mdb":
                fileType = "application/x-msaccess";
                break;
            case "asf":
                fileType = "video/x-ms-asf";
                break;
            case "exe":
                fileType = "application/x-msdownload";
                break;
            case "cil":
                fileType = "application/vnd.ms-artgalry";
                break;
            case "cab":
                fileType = "application/vnd.ms-cab-compressed";
                break;
            case "ims":
                fileType = "application/vnd.ms-ims";
                break;
            case "application":
                fileType = "application/x-ms-application";
                break;
            case "clp":
                fileType = "application/x-msclip";
                break;
            case "mdi":
                fileType = "image/vnd.ms-modi";
                break;
            case "eot":
                fileType = "application/vnd.ms-fontobject";
                break;
            case "xls":
                fileType = "application/vnd.ms-excel";
                break;
            case "xlam":
                fileType = "application/vnd.ms-excel.addin.macroenabled.12";
                break;
            case "xlsb":
                fileType = "application/vnd.ms-excel.sheet.binary.macroenabled.12";
                break;
            case "xltm":
                fileType = "application/vnd.ms-excel.template.macroenabled.12";
                break;
            case "xlsm":
                fileType = "application/vnd.ms-excel.sheet.macroenabled.12";
                break;
            case "chm":
                fileType = "application/vnd.ms-htmlhelp";
                break;
            case "crd":
                fileType = "application/x-mscardfile";
                break;
            case "lrm":
                fileType = "application/vnd.ms-lrm";
                break;
            case "mvb":
                fileType = "application/x-msmediaview";
                break;
            case "mny":
                fileType = "application/x-msmoney";
                break;
            case "pptx":
                fileType = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
                break;
            case "sldx":
                fileType = "application/vnd.openxmlformats-officedocument.presentationml.slide";
                break;
            case "ppsx":
                fileType = "application/vnd.openxmlformats-officedocument.presentationml.slideshow";
                break;
            case "potx":
                fileType = "application/vnd.openxmlformats-officedocument.presentationml.template";
                break;
            case "xlsx":
                fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
            case "xltx":
                fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.template";
                break;
            case "docx":
                fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                break;
            case "dotx":
                fileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template";
                break;
            case "obd":
                fileType = "application/x-msbinder";
                break;
            case "thmx":
                fileType = "application/vnd.ms-officetheme";
                break;
            case "onetoc":
                fileType = "application/onenote";
                break;
            case "pya":
                fileType = "audio/vnd.ms-playready.media.pya";
                break;
            case "pyv":
                fileType = "video/vnd.ms-playready.media.pyv";
                break;
            case "ppt":
                fileType = "application/vnd.ms-powerpoint";
                break;
            case "ppam":
                fileType = "application/vnd.ms-powerpoint.addin.macroenabled.12";
                break;
            case "sldm":
                fileType = "application/vnd.ms-powerpoint.slide.macroenabled.12";
                break;
            case "pptm":
                fileType = "application/vnd.ms-powerpoint.presentation.macroenabled.12";
                break;
            case "ppsm":
                fileType = "application/vnd.ms-powerpoint.slideshow.macroenabled.12";
                break;
            case "potm":
                fileType = "application/vnd.ms-powerpoint.template.macroenabled.12";
                break;
            case "mpp":
                fileType = "application/vnd.ms-project";
                break;
            case "pub":
                fileType = "application/x-mspublisher";
                break;
            case "scd":
                fileType = "application/x-msschedule";
                break;
            case "xap":
                fileType = "application/x-silverlight-app";
                break;
            case "stl":
                fileType = "application/vnd.ms-pki.stl";
                break;
            case "cat":
                fileType = "application/vnd.ms-pki.seccat";
                break;
            case "vsd":
                fileType = "application/vnd.visio";
                break;
            case "vsdx":
                fileType = "application/vnd.visio2013";
                break;
            case "wm":
                fileType = "video/x-ms-wm";
                break;
            case "wma":
                fileType = "audio/x-ms-wma";
                break;
            case "wax":
                fileType = "audio/x-ms-wax";
                break;
            case "wmx":
                fileType = "video/x-ms-wmx";
                break;
            case "wmd":
                fileType = "application/x-ms-wmd";
                break;
            case "wpl":
                fileType = "application/vnd.ms-wpl";
                break;
            case "wmz":
                fileType = "application/x-ms-wmz";
                break;
            case "wmv":
                fileType = "video/x-ms-wmv";
                break;
            case "wvx":
                fileType = "video/x-ms-wvx";
                break;
            case "wmf":
                fileType = "application/x-msmetafile";
                break;
            case "trm":
                fileType = "application/x-msterminal";
                break;
            case "doc":
                fileType = "application/msword";
                break;
            case "docm":
                fileType = "application/vnd.ms-word.document.macroenabled.12";
                break;
            case "dotm":
                fileType = "application/vnd.ms-word.template.macroenabled.12";
                break;
            case "wri":
                fileType = "application/x-mswrite";
                break;
            case "wps":
                fileType = "application/vnd.ms-works";
                break;
            case "xbap":
                fileType = "application/x-ms-xbap";
                break;
            case "xps":
                fileType = "application/vnd.ms-xpsdocument";
                break;
            case "mid":
                fileType = "audio/midi";
                break;
            case "mpy":
                fileType = "application/vnd.ibm.minipay";
                break;
            case "afp":
                fileType = "application/vnd.ibm.modcap";
                break;
            case "rms":
                fileType = "application/vnd.jcp.javame.midlet-rms";
                break;
            case "tmo":
                fileType = "application/vnd.tmobile-livetv";
                break;
            case "prc":
                fileType = "application/x-mobipocket-ebook";
                break;
            case "mbk":
                fileType = "application/vnd.mobius.mbk";
                break;
            case "dis":
                fileType = "application/vnd.mobius.dis";
                break;
            case "plc":
                fileType = "application/vnd.mobius.plc";
                break;
            case "mqy":
                fileType = "application/vnd.mobius.mqy";
                break;
            case "msl":
                fileType = "application/vnd.mobius.msl";
                break;
            case "txf":
                fileType = "application/vnd.mobius.txf";
                break;
            case "daf":
                fileType = "application/vnd.mobius.daf";
                break;
            case "fly":
                fileType = "text/vnd.fly";
                break;
            case "mpc":
                fileType = "application/vnd.mophun.certificate";
                break;
            case "mpn":
                fileType = "application/vnd.mophun.application";
                break;
            case "mj2":
                fileType = "video/mj2";
                break;
            case "mpga":
                fileType = "audio/mpeg";
                break;
            case "mxu":
                fileType = "video/vnd.mpegurl";
                break;
            case "mpeg":
                fileType = "video/mpeg";
                break;
            case "m21":
                fileType = "application/mp21";
                break;
            case "mp4a":
                fileType = "audio/mp4";
                break;
            case "mp4":
                fileType = "video/mp4";
                break;
            case "mp4":
                fileType = "application/mp4";
                break;
            case "m3u8":
                fileType = "application/vnd.apple.mpegurl";
                break;
            case "mus":
                fileType = "application/vnd.musician";
                break;
            case "msty":
                fileType = "application/vnd.muvee.style";
                break;
            case "mxml":
                fileType = "application/xv+xml";
                break;
            case "ngdat":
                fileType = "application/vnd.nokia.n-gage.data";
                break;
            case "n":
                fileType = "application/vnd.nokia.n-gage.symbian.install";
                break;
            case "ncx":
                fileType = "application/x-dtbncx+xml";
                break;
            case "nc":
                fileType = "application/x-netcdf";
                break;
            case "nlu":
                fileType = "application/vnd.neurolanguage.nlu";
                break;
            case "dna":
                fileType = "application/vnd.dna";
                break;
            case "nnd":
                fileType = "application/vnd.noblenet-directory";
                break;
            case "nns":
                fileType = "application/vnd.noblenet-sealer";
                break;
            case "nnw":
                fileType = "application/vnd.noblenet-web";
                break;
            case "rpst":
                fileType = "application/vnd.nokia.radio-preset";
                break;
            case "rpss":
                fileType = "application/vnd.nokia.radio-presets";
                break;
            case "n3":
                fileType = "text/n3";
                break;
            case "edm":
                fileType = "application/vnd.novadigm.edm";
                break;
            case "edx":
                fileType = "application/vnd.novadigm.edx";
                break;
            case "ext":
                fileType = "application/vnd.novadigm.ext";
                break;
            case "gph":
                fileType = "application/vnd.flographit";
                break;
            case "ecelp4800":
                fileType = "audio/vnd.nuera.ecelp4800";
                break;
            case "ecelp7470":
                fileType = "audio/vnd.nuera.ecelp7470";
                break;
            case "ecelp9600":
                fileType = "audio/vnd.nuera.ecelp9600";
                break;
            case "oda":
                fileType = "application/oda";
                break;
            case "ogx":
                fileType = "application/ogg";
                break;
            case "oga":
                fileType = "audio/ogg";
                break;
            case "ogv":
                fileType = "video/ogg";
                break;
            case "dd2":
                fileType = "application/vnd.oma.dd2+xml";
                break;
            case "oth":
                fileType = "application/vnd.oasis.opendocument.text-web";
                break;
            case "opf":
                fileType = "application/oebps-package+xml";
                break;
            case "qbo":
                fileType = "application/vnd.intu.qbo";
                break;
            case "oxt":
                fileType = "application/vnd.openofficeorg.extension";
                break;
            case "osf":
                fileType = "application/vnd.yamaha.openscoreformat";
                break;
            case "weba":
                fileType = "audio/webm";
                break;
            case "webm":
                fileType = "video/webm";
                break;
            case "odc":
                fileType = "application/vnd.oasis.opendocument.chart";
                break;
            case "otc":
                fileType = "application/vnd.oasis.opendocument.chart-template";
                break;
            case "odb":
                fileType = "application/vnd.oasis.opendocument.database";
                break;
            case "odf":
                fileType = "application/vnd.oasis.opendocument.formula";
                break;
            case "odft":
                fileType = "application/vnd.oasis.opendocument.formula-template";
                break;
            case "odg":
                fileType = "application/vnd.oasis.opendocument.graphics";
                break;
            case "otg":
                fileType = "application/vnd.oasis.opendocument.graphics-template";
                break;
            case "odi":
                fileType = "application/vnd.oasis.opendocument.image";
                break;
            case "oti":
                fileType = "application/vnd.oasis.opendocument.image-template";
                break;
            case "odp":
                fileType = "application/vnd.oasis.opendocument.presentation";
                break;
            case "otp":
                fileType = "application/vnd.oasis.opendocument.presentation-template";
                break;
            case "ods":
                fileType = "application/vnd.oasis.opendocument.spreadsheet";
                break;
            case "ots":
                fileType = "application/vnd.oasis.opendocument.spreadsheet-template";
                break;
            case "odt":
                fileType = "application/vnd.oasis.opendocument.text";
                break;
            case "odm":
                fileType = "application/vnd.oasis.opendocument.text-master";
                break;
            case "ott":
                fileType = "application/vnd.oasis.opendocument.text-template";
                break;
            case "ktx":
                fileType = "image/ktx";
                break;
            case "sxc":
                fileType = "application/vnd.sun.xml.calc";
                break;
            case "stc":
                fileType = "application/vnd.sun.xml.calc.template";
                break;
            case "sxd":
                fileType = "application/vnd.sun.xml.draw";
                break;
            case "std":
                fileType = "application/vnd.sun.xml.draw.template";
                break;
            case "sxi":
                fileType = "application/vnd.sun.xml.impress";
                break;
            case "sti":
                fileType = "application/vnd.sun.xml.impress.template";
                break;
            case "sxm":
                fileType = "application/vnd.sun.xml.math";
                break;
            case "sxw":
                fileType = "application/vnd.sun.xml.writer";
                break;
            case "sxg":
                fileType = "application/vnd.sun.xml.writer.global";
                break;
            case "stw":
                fileType = "application/vnd.sun.xml.writer.template";
                break;
            case "otf":
                fileType = "application/x-font-otf";
                break;
            case "osfpvg":
                fileType = "application/vnd.yamaha.openscoreformat.osfpvg+xml";
                break;
            case "dp":
                fileType = "application/vnd.osgi.dp";
                break;
            case "pdb":
                fileType = "application/vnd.palm";
                break;
            case "p":
                fileType = "text/x-pascal";
                break;
            case "paw":
                fileType = "application/vnd.pawaafile";
                break;
            case "pclxl":
                fileType = "application/vnd.hp-pclxl";
                break;
            case "efif":
                fileType = "application/vnd.picsel";
                break;
            case "pcx":
                fileType = "image/x-pcx";
                break;
            case "psd":
                fileType = "image/vnd.adobe.photoshop";
                break;
            case "prf":
                fileType = "application/pics-rules";
                break;
            case "pic":
                fileType = "image/x-pict";
                break;
            case "chat":
                fileType = "application/x-chat";
                break;
            case "p10":
                fileType = "application/pkcs10";
                break;
            case "p12":
                fileType = "application/x-pkcs12";
                break;
            case "p7m":
                fileType = "application/pkcs7-mime";
                break;
            case "p7s":
                fileType = "application/pkcs7-signature";
                break;
            case "p7r":
                fileType = "application/x-pkcs7-certreqresp";
                break;
            case "p7b":
                fileType = "application/x-pkcs7-certificates";
                break;
            case "p8":
                fileType = "application/pkcs8";
                break;
            case "plf":
                fileType = "application/vnd.pocketlearn";
                break;
            case "pnm":
                fileType = "image/x-portable-anymap";
                break;
            case "pbm":
                fileType = "image/x-portable-bitmap";
                break;
            case "pcf":
                fileType = "application/x-font-pcf";
                break;
            case "pfr":
                fileType = "application/font-tdpfr";
                break;
            case "pgn":
                fileType = "application/x-chess-pgn";
                break;
            case "pgm":
                fileType = "image/x-portable-graymap";
                break;
            case "png":
                fileType = "image/png";
                break;
            case "png":
                fileType = "image/x-citrix-png";
                break;
            case "png":
                fileType = "image/x-png";
                break;
            case "ppm":
                fileType = "image/x-portable-pixmap";
                break;
            case "pskcxml":
                fileType = "application/pskc+xml";
                break;
            case "pml":
                fileType = "application/vnd.ctc-posml";
                break;
            case "ai":
                fileType = "application/postscript";
                break;
            case "pfa":
                fileType = "application/x-font-type1";
                break;
            case "pbd":
                fileType = "application/vnd.powerbuilder6";
                break;
            case "pgp":
                fileType = "application/pgp-encrypted";
                break;
            case "pgp":
                fileType = "application/pgp-signature";
                break;
            case "box":
                fileType = "application/vnd.previewsystems.box";
                break;
            case "ptid":
                fileType = "application/vnd.pvi.ptid1";
                break;
            case "pls":
                fileType = "application/pls+xml";
                break;
            case "str":
                fileType = "application/vnd.pg.format";
                break;
            case "ei6":
                fileType = "application/vnd.pg.osasli";
                break;
            case "dsc":
                fileType = "text/prs.lines.tag";
                break;
            case "psf":
                fileType = "application/x-font-linux-psf";
                break;
            case "qps":
                fileType = "application/vnd.publishare-delta-tree";
                break;
            case "wg":
                fileType = "application/vnd.pmi.widget";
                break;
            case "qxd":
                fileType = "application/vnd.quark.quarkxpress";
                break;
            case "esf":
                fileType = "application/vnd.epson.esf";
                break;
            case "msf":
                fileType = "application/vnd.epson.msf";
                break;
            case "ssf":
                fileType = "application/vnd.epson.ssf";
                break;
            case "qam":
                fileType = "application/vnd.epson.quickanime";
                break;
            case "qfx":
                fileType = "application/vnd.intu.qfx";
                break;
            case "qt":
                fileType = "video/quicktime";
                break;
            case "rar":
                fileType = "application/x-rar-compressed";
                break;
            case "ram":
                fileType = "audio/x-pn-realaudio";
                break;
            case "rmp":
                fileType = "audio/x-pn-realaudio-plugin";
                break;
            case "rsd":
                fileType = "application/rsd+xml";
                break;
            case "rm":
                fileType = "application/vnd.rn-realmedia";
                break;
            case "bed":
                fileType = "application/vnd.realvnc.bed";
                break;
            case "mxl":
                fileType = "application/vnd.recordare.musicxml";
                break;
            case "musicxml":
                fileType = "application/vnd.recordare.musicxml+xml";
                break;
            case "rnc":
                fileType = "application/relax-ng-compact-syntax";
                break;
            case "rdz":
                fileType = "application/vnd.data-vision.rdz";
                break;
            case "rdf":
                fileType = "application/rdf+xml";
                break;
            case "rp9":
                fileType = "application/vnd.cloanto.rp9";
                break;
            case "jisp":
                fileType = "application/vnd.jisp";
                break;
            case "rtf":
                fileType = "application/rtf";
                break;
            case "rtx":
                fileType = "text/richtext";
                break;
            case "link66":
                fileType = "application/vnd.route66.link66+xml";
                break;
            case "rss":
                fileType = "application/rss+xml";
                break;
            case "shf":
                fileType = "application/shf+xml";
                break;
            case "st":
                fileType = "application/vnd.sailingtracker.track";
                break;
            case "svg":
                fileType = "image/svg+xml";
                break;
            case "sus":
                fileType = "application/vnd.sus-calendar";
                break;
            case "sru":
                fileType = "application/sru+xml";
                break;
            case "setpay":
                fileType = "application/set-payment-initiation";
                break;
            case "setreg":
                fileType = "application/set-registration-initiation";
                break;
            case "sema":
                fileType = "application/vnd.sema";
                break;
            case "semd":
                fileType = "application/vnd.semd";
                break;
            case "semf":
                fileType = "application/vnd.semf";
                break;
            case "see":
                fileType = "application/vnd.seemail";
                break;
            case "snf":
                fileType = "application/x-font-snf";
                break;
            case "spq":
                fileType = "application/scvp-vp-request";
                break;
            case "spp":
                fileType = "application/scvp-vp-response";
                break;
            case "scq":
                fileType = "application/scvp-cv-request";
                break;
            case "scs":
                fileType = "application/scvp-cv-response";
                break;
            case "sdp":
                fileType = "application/sdp";
                break;
            case "etx":
                fileType = "text/x-setext";
                break;
            case "movie":
                fileType = "video/x-sgi-movie";
                break;
            case "ifm":
                fileType = "application/vnd.shana.informed.formdata";
                break;
            case "itp":
                fileType = "application/vnd.shana.informed.formtemplate";
                break;
            case "iif":
                fileType = "application/vnd.shana.informed.interchange";
                break;
            case "ipk":
                fileType = "application/vnd.shana.informed.package";
                break;
            case "tfi":
                fileType = "application/thraud+xml";
                break;
            case "shar":
                fileType = "application/x-shar";
                break;
            case "rgb":
                fileType = "image/x-rgb";
                break;
            case "slt":
                fileType = "application/vnd.epson.salt";
                break;
            case "aso":
                fileType = "application/vnd.accpac.simply.aso";
                break;
            case "imp":
                fileType = "application/vnd.accpac.simply.imp";
                break;
            case "twd":
                fileType = "application/vnd.simtech-mindmapper";
                break;
            case "csp":
                fileType = "application/vnd.commonspace";
                break;
            case "saf":
                fileType = "application/vnd.yamaha.smaf-audio";
                break;
            case "mmf":
                fileType = "application/vnd.smaf";
                break;
            case "spf":
                fileType = "application/vnd.yamaha.smaf-phrase";
                break;
            case "teacher":
                fileType = "application/vnd.smart.teacher";
                break;
            case "svd":
                fileType = "application/vnd.svd";
                break;
            case "rq":
                fileType = "application/sparql-query";
                break;
            case "srx":
                fileType = "application/sparql-results+xml";
                break;
            case "gram":
                fileType = "application/srgs";
                break;
            case "grxml":
                fileType = "application/srgs+xml";
                break;
            case "ssml":
                fileType = "application/ssml+xml";
                break;
            case "skp":
                fileType = "application/vnd.koan";
                break;
            case "sgml":
                fileType = "text/sgml";
                break;
            case "sdc":
                fileType = "application/vnd.stardivision.calc";
                break;
            case "sda":
                fileType = "application/vnd.stardivision.draw";
                break;
            case "sdd":
                fileType = "application/vnd.stardivision.impress";
                break;
            case "smf":
                fileType = "application/vnd.stardivision.math";
                break;
            case "sdw":
                fileType = "application/vnd.stardivision.writer";
                break;
            case "sgl":
                fileType = "application/vnd.stardivision.writer-global";
                break;
            case "sm":
                fileType = "application/vnd.stepmania.stepchart";
                break;
            case "sit":
                fileType = "application/x-stuffit";
                break;
            case "sitx":
                fileType = "application/x-stuffitx";
                break;
            case "sdkm":
                fileType = "application/vnd.solent.sdkm+xml";
                break;
            case "xo":
                fileType = "application/vnd.olpc-sugar";
                break;
            case "au":
                fileType = "audio/basic";
                break;
            case "wqd":
                fileType = "application/vnd.wqd";
                break;
            case "sis":
                fileType = "application/vnd.symbian.install";
                break;
            case "smi":
                fileType = "application/smil+xml";
                break;
            case "xsm":
                fileType = "application/vnd.syncml+xml";
                break;
            case "bdm":
                fileType = "application/vnd.syncml.dm+wbxml";
                break;
            case "xdm":
                fileType = "application/vnd.syncml.dm+xml";
                break;
            case "sv4cpio":
                fileType = "application/x-sv4cpio";
                break;
            case "sv4crc":
                fileType = "application/x-sv4crc";
                break;
            case "sbml":
                fileType = "application/sbml+xml";
                break;
            case "tsv":
                fileType = "text/tab-separated-values";
                break;
            case "tiff":
                fileType = "image/tiff";
                break;
            case "tao":
                fileType = "application/vnd.tao.intent-module-archive";
                break;
            case "tar":
                fileType = "application/x-tar";
                break;
            case "tcl":
                fileType = "application/x-tcl";
                break;
            case "tex":
                fileType = "application/x-tex";
                break;
            case "tfm":
                fileType = "application/x-tex-tfm";
                break;
            case "tei":
                fileType = "application/tei+xml";
                break;
            case "txt":
                fileType = "text/plain";
                break;
            case "dxp":
                fileType = "application/vnd.spotfire.dxp";
                break;
            case "sfs":
                fileType = "application/vnd.spotfire.sfs";
                break;
            case "tsd":
                fileType = "application/timestamped-data";
                break;
            case "tpt":
                fileType = "application/vnd.trid.tpt";
                break;
            case "mxs":
                fileType = "application/vnd.triscape.mxs";
                break;
            case "t":
                fileType = "text/troff";
                break;
            case "tra":
                fileType = "application/vnd.trueapp";
                break;
            case "ttf":
                fileType = "application/x-font-ttf";
                break;
            case "ttl":
                fileType = "text/turtle";
                break;
            case "umj":
                fileType = "application/vnd.umajin";
                break;
            case "uoml":
                fileType = "application/vnd.uoml+xml";
                break;
            case "unityweb":
                fileType = "application/vnd.unity";
                break;
            case "ufd":
                fileType = "application/vnd.ufdl";
                break;
            case "uri":
                fileType = "text/uri-list";
                break;
            case "utz":
                fileType = "application/vnd.uiq.theme";
                break;
            case "ustar":
                fileType = "application/x-ustar";
                break;
            case "uu":
                fileType = "text/x-uuencode";
                break;
            case "vcs":
                fileType = "text/x-vcalendar";
                break;
            case "vcf":
                fileType = "text/x-vcard";
                break;
            case "vcd":
                fileType = "application/x-cdlink";
                break;
            case "vsf":
                fileType = "application/vnd.vsf";
                break;
            case "wrl":
                fileType = "model/vrml";
                break;
            case "vcx":
                fileType = "application/vnd.vcx";
                break;
            case "mts":
                fileType = "model/vnd.mts";
                break;
            case "vtu":
                fileType = "model/vnd.vtu";
                break;
            case "vis":
                fileType = "application/vnd.visionary";
                break;
            case "viv":
                fileType = "video/vnd.vivo";
                break;
            case "ccxml":
                fileType = "application/ccxml+xml,";
                break;
            case "vxml":
                fileType = "application/voicexml+xml";
                break;
            case "src":
                fileType = "application/x-wais-source";
                break;
            case "wbxml":
                fileType = "application/vnd.wap.wbxml";
                break;
            case "wbmp":
                fileType = "image/vnd.wap.wbmp";
                break;
            case "wav":
                fileType = "audio/x-wav";
                break;
            case "davmount":
                fileType = "application/davmount+xml";
                break;
            case "woff":
                fileType = "application/x-font-woff";
                break;
            case "wspolicy":
                fileType = "application/wspolicy+xml";
                break;
            case "webp":
                fileType = "image/webp";
                break;
            case "wtb":
                fileType = "application/vnd.webturbo";
                break;
            case "wgt":
                fileType = "application/widget";
                break;
            case "hlp":
                fileType = "application/winhlp";
                break;
            case "wml":
                fileType = "text/vnd.wap.wml";
                break;
            case "wmls":
                fileType = "text/vnd.wap.wmlscript";
                break;
            case "wmlsc":
                fileType = "application/vnd.wap.wmlscriptc";
                break;
            case "wpd":
                fileType = "application/vnd.wordperfect";
                break;
            case "stf":
                fileType = "application/vnd.wt.stf";
                break;
            case "wsdl":
                fileType = "application/wsdl+xml";
                break;
            case "xbm":
                fileType = "image/x-xbitmap";
                break;
            case "xpm":
                fileType = "image/x-xpixmap";
                break;
            case "xwd":
                fileType = "image/x-xwindowdump";
                break;
            case "der":
                fileType = "application/x-x509-ca-cert";
                break;
            case "fig":
                fileType = "application/x-xfig";
                break;
            case "xhtml":
                fileType = "application/xhtml+xml";
                break;
            case "xml":
                fileType = "application/xml";
                break;
            case "xdf":
                fileType = "application/xcap-diff+xml";
                break;
            case "xenc":
                fileType = "application/xenc+xml";
                break;
            case "xer":
                fileType = "application/patch-ops-error+xml";
                break;
            case "rl":
                fileType = "application/resource-lists+xml";
                break;
            case "rs":
                fileType = "application/rls-services+xml";
                break;
            case "rld":
                fileType = "application/resource-lists-diff+xml";
                break;
            case "xslt":
                fileType = "application/xslt+xml";
                break;
            case "xop":
                fileType = "application/xop+xml";
                break;
            case "xpi":
                fileType = "application/x-xpinstall";
                break;
            case "xspf":
                fileType = "application/xspf+xml";
                break;
            case "xul":
                fileType = "application/vnd.mozilla.xul+xml";
                break;
            case "xyz":
                fileType = "chemical/x-xyz";
                break;
            case "yaml":
                fileType = "text/yaml";
                break;
            case "yang":
                fileType = "application/yang";
                break;
            case "yin":
                fileType = "application/yin+xml";
                break;
            case "zir":
                fileType = "application/vnd.zul";
                break;
            case "zip":
                fileType = "application/zip";
                break;
            case "zmm":
                fileType = "application/vnd.handheld-entertainment+xml";
                break;
            case "zaz":
                fileType = "application/vnd.zzazz.deck+xml"
            default:
                fileType = '';
        }
        return fileType;
    }
};
export default AttachmentFileHandler;