/* Fast Code 128 barcode — offline, no CDN */
(function (global) {
  var PATTERNS = [
    '11011001100','11001101100','11001100110','10010011000','10010001100','10001001100','10011001000','10011000100','10001100100','11001001000',
    '11001000100','11000100100','10110011100','10011011100','10011001110','10111001100','10011101100','10011100110','11001110010','11001011100',
    '11001001110','11011100100','11001110100','11101101110','11101001100','11100101100','11100100110','11101100100','11100110100','11100110010',
    '11011011000','11011000110','11000110110','10100011000','10001011000','10001000110','10110001000','10001101000','10001100010','11010001000',
    '11000101000','11000100010','10110111000','10110001110','10001101110','10111011000','10111000110','10001110110','11101110110','11010001110',
    '11000101110','11011101000','11011100010','11011101110','11101011000','11101000110','11100010110','11101101000','11101100010','11100011010',
    '11101111010','11001000010','11110001010','10100110000','10100001100','10010110000','10010000110','10000101100','10000100110','10110010000',
    '10110000100','10011010000','10011000010','10000110100','10000110010','11000010010','11001010000','11110111010','11000010100','10001111010',
    '10100111100','10010111100','10010011110','10111100100','10011110100','10011110010','11110100100','11110010100','11110010010','11011011110',
    '11011110110','11110110110','10101111000','10100011110','10001011110','10111101000','10111100010','11110101000','11110100010','10111011110',
    '10111101110','11101011110','11110101110','11010000100','11010010000','11010011100','1100011101011'
  ];

  var START_B = 104;
  var STOP = 106;

  function encode128B(text) {
    var codes = [START_B];
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c < 32 || c > 126) c = 45;
      codes.push(c - 32);
    }
    var sum = START_B;
    for (i = 1; i < codes.length; i++) sum += codes[i] * i;
    codes.push(sum % 103);
    codes.push(STOP);
    return codes;
  }

  function uniqueUrl(page) {
    var base = new URL(page, window.location.href);
    base.searchParams.set('v', Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
    return base.href;
  }

  function draw(canvas, text, opts) {
    opts = opts || {};
    var dark = opts.dark || '#2c2416';
    var light = opts.light || '#ffffff';
    var height = opts.height || 72;
    var maxWidth = opts.maxWidth || 320;
    var padX = opts.padX == null ? 12 : opts.padX;
    var padY = opts.padY == null ? 10 : opts.padY;

    var codes = encode128B(text);
    var bits = '';
    for (var i = 0; i < codes.length; i++) bits += PATTERNS[codes[i]];

    var moduleW = opts.moduleWidth || 2;
    var barW = bits.length * moduleW;
    if (barW > maxWidth - padX * 2) {
      moduleW = Math.max(1, Math.floor((maxWidth - padX * 2) / bits.length));
      barW = bits.length * moduleW;
    }

    var w = barW + padX * 2;
    var h = height + padY * 2 + (opts.showText ? 16 : 0);
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = light;
    ctx.fillRect(0, 0, w, h);

    var x = padX;
    var barTop = padY;
    var barH = height;
    ctx.fillStyle = dark;
    for (var j = 0; j < bits.length; j++) {
      if (bits.charAt(j) === '1') ctx.fillRect(x, barTop, moduleW, barH);
      x += moduleW;
    }

    if (opts.showText !== false) {
      ctx.fillStyle = dark;
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'center';
      var label = text.length > 42 ? text.slice(0, 40) + '…' : text;
      ctx.fillText(label, w / 2, h - 4);
    }

    return { ok: true, width: w, height: h };
  }

  global.WeddingBarcode = { draw: draw, uniqueUrl: uniqueUrl };
  global.WeddingQR = global.WeddingBarcode;
})(typeof window !== 'undefined' ? window : this);
