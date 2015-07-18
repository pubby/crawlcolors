// I stole most of this from stackoverflow

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    return ("#" + componentToHex(rgb.r)
                + componentToHex(rgb.g)
                + componentToHex(rgb.b));
}

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function nameToHex(name) {
    var hash = Math.abs(name.hashCode());
    var hue = (hash % 100) / 100;
    var sat = 0.45 + ((hash / 100) % 100) / 200;
    var val = 0.45 + ((hash / 10000) % 100) / 200;
    var rgb = HSVtoRGB(hue, sat, val);
    return rgbToHex(rgb);
}

$(document).ready(function() {
    console.log("CCCP loaded");

    function update(c) {
        var name = c.text();
        var hex = nameToHex(name);
        c.css("color", hex);
    }

    $('#chat_history').on('DOMNodeInserted', function(e) {
        if($(e.target).is('.chat_sender'))
            update($(e.target));
        document.getElementById("chat_history_container").scrollTop
            = 100000000;
    });
    $('#spectator_list').on('DOMNodeInserted', function(e) {
        if($(e.target).is('.player') || $(e.target).is('.watcher'))
            update($(e.target));
    });
});
