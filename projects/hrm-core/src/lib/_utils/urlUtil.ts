export class UrlUtil {
  public static setUrl(url: string, key: string, value: any) {
    if (!url) return url;
    var urlNew, hash;

    urlNew = url.substring(0, url.indexOf('?') + 1);
    var hashes = url
      .replace(/&amp;/g, '&')
      .slice(url.indexOf('?') + 1)
      .split('&');

    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      if (i != 0) urlNew += '&';
      if (hash[0].toLowerCase() == key.toLowerCase()) {
        urlNew += hash[0] + '=' + value;
        key = '';
      } else {
        urlNew += hash.join('=');
      }
    }

    if (key != '') {
      urlNew += (urlNew.indexOf('?') < 0 ? '?' : '') + '&' + key + '=' + value;
    }
    return urlNew;
  }

  public static getUrls(url?: string, name?: string) {
    let vars = new Map<string, string>(),
      hashes: string[],
      hash: string[] = [];
    if (url)
      hashes = url
        .replace(/&amp;/g, '&')
        .slice(url.indexOf('?') + 1)
        .split('&');
    else
      hashes = window.location.href
        .slice(window.location.href.indexOf('?') + 1)
        .split('&');

    hashes.forEach(function (hash) {
      var i = hash.indexOf('=');
      if (i > -1) {
        var hashName = hash.substring(0, i);
        hashName = hashName.toLowerCase();
        vars.set(hashName, hash.substring(i + 1));

        if (name && name.toLowerCase() == hashName) {
          return;
        }
      }
    });
    return vars;
  }

  public static getUrl(name: string, url?: string) {
    name = name.toLowerCase();

    var data = this.getUrls(url, name);
    if (data && data.has(name)) return data.get(name);

    return '';
  }

  public static modifiedUrlByObj(url: string, object: any, sp: string) {
    if (!url) return url;
    var urlNew;
    var indexStart = url.indexOf('[');
    if (indexStart < 0) return url;

    var indexEnd = url.indexOf(']') - indexStart;
    urlNew = url.substring(0, indexStart);
    url = url.substring(indexStart);
    var hashes = url.split(']');
    for (var i = 0; i < hashes.length; i++) {
      if (hashes[i] == '') continue;
      var hash = hashes[i];
      indexStart = hash.indexOf('[');
      if (indexStart > -1) {
        urlNew += hash.substring(0, indexStart);
        var field = hash.substring(indexStart + 1),
          field = field.charAt(0).toLowerCase() + field.substring(1),
          vl = object[field];
        if (!vl) {
          field = field.charAt(0).toUpperCase() + field.substring(1);
          vl = object[field];
        }

        if (vl) {
          if (Object.prototype.toString.call(vl) === '[object Date]')
            urlNew += vl.toISOString();
          else if (typeof vl === 'string' || vl instanceof String) {
            if (sp == '' || sp == null || sp == undefined) {
              urlNew += encodeURIComponent(
                (vl || '')
                  .replace(/'/g, "\\'")
                  .replace(/(<([^>]+)>)|&nbsp;|;/gi, '')
              );
            } else {
              urlNew +=
                sp +
                encodeURIComponent(
                  (vl || '')
                    .replace(/'/g, "\\'")
                    .replace(/(<([^>]+)>)|&nbsp;|;/gi, '')
                ) +
                sp;
            }
          } else urlNew += vl;
        }
      } else {
        urlNew += hash;
      }
    }

    return urlNew;
  }

  public static modifiedUrl(url: string, key: string, value: any) {
    if (!url) return url;
    var urlNew, hash;

    urlNew = url.substring(0, url.indexOf('?') + 1);
    var hashes = url
      .replace(/&amp;/g, '&')
      .slice(url.indexOf('?') + 1)
      .split('&');

    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      if (i != 0) urlNew += '&';
      if (hash[0].toLowerCase() == key.toLowerCase()) {
        urlNew += hash[0] + '=' + value;
        key = '';
      } else {
        urlNew += hash.join('='); //hash[0] + "=" + hash[1];
      }
    }
    return urlNew;
  }

  public static removeUrlVar(url: string, key: string) {
    var urlNew, hash;

    urlNew = url.substring(0, url.indexOf('?') + 1);
    var hashes = url
      .replace(/&amp;/g, '&')
      .slice(url.indexOf('?') + 1)
      .split('&');

    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      if (hash[0].toLowerCase() != key.toLowerCase()) {
        if (i != 0) urlNew += '&';
        urlNew += hash.join('='); //hash[0] + "=" + hash[1];
      }
    }
    return urlNew;
  }
}
