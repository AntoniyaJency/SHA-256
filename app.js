// Minimal MD5 implementation (RFC 1321) adapted for browser usage.
// Source derived from public domain implementations, simplified for clarity.
// Note: For security, do not use MD5 for anything sensitive; included for comparison only.
(function(){
  function toWords(input) {
    var n = (((input.length + 8) >>> 6) + 1) * 16;
    var words = new Array(n).fill(0);
    var i;
    for (i = 0; i < input.length; i++) {
      words[i >> 2] |= input.charCodeAt(i) << ((i % 4) * 8);
    }
    words[i >> 2] |= 0x80 << ((i % 4) * 8);
    var bitLen = input.length * 8;
    words[n - 2] = bitLen & 0xffffffff;
    words[n - 1] = (bitLen / 0x100000000) | 0;
    return words;
  }
  function leftRotate(x, c) { return (x << c) | (x >>> (32 - c)); }
  function add(x, y) { return (x + y) | 0; }
  function cmn(q, a, b, x, s, t) { return add(leftRotate(add(add(a, q), add(x, t)), s), b); }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
  function md5core(words) {
    var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (var i = 0; i < words.length; i += 16) {
      var oa = a, ob = b, oc = c, od = d;
      a = ff(a,b,c,d,words[i+0],7,-680876936); d = ff(d,a,b,c,words[i+1],12,-389564586);
      c = ff(c,d,a,b,words[i+2],17,606105819); b = ff(b,c,d,a,words[i+3],22,-1044525330);
      a = ff(a,b,c,d,words[i+4],7,-176418897); d = ff(d,a,b,c,words[i+5],12,1200080426);
      c = ff(c,d,a,b,words[i+6],17,-1473231341); b = ff(b,c,d,a,words[i+7],22,-45705983);
      a = ff(a,b,c,d,words[i+8],7,1770035416); d = ff(d,a,b,c,words[i+9],12,-1958414417);
      c = ff(c,d,a,b,words[i+10],17,-42063); b = ff(b,c,d,a,words[i+11],22,-1990404162);
      a = ff(a,b,c,d,words[i+12],7,1804603682); d = ff(d,a,b,c,words[i+13],12,-40341101);
      c = ff(c,d,a,b,words[i+14],17,-1502002290); b = ff(b,c,d,a,words[i+15],22,1236535329);

      a = gg(a,b,c,d,words[i+1],5,-165796510); d = gg(d,a,b,c,words[i+6],9,-1069501632);
      c = gg(c,d,a,b,words[i+11],14,643717713); b = gg(b,c,d,a,words[i+0],20,-373897302);
      a = gg(a,b,c,d,words[i+5],5,-701558691); d = gg(d,a,b,c,words[i+10],9,38016083);
      c = gg(c,d,a,b,words[i+15],14,-660478335); b = gg(b,c,d,a,words[i+4],20,-405537848);
      a = gg(a,b,c,d,words[i+9],5,568446438); d = gg(d,a,b,c,words[i+14],9,-1019803690);
      c = gg(c,d,a,b,words[i+3],14,-187363961); b = gg(b,c,d,a,words[i+8],20,1163531501);
      a = gg(a,b,c,d,words[i+13],5,-1444681467); d = gg(d,a,b,c,words[i+2],9,-51403784);
      c = gg(c,d,a,b,words[i+7],14,1735328473); b = gg(b,c,d,a,words[i+12],20,-1926607734);

      a = hh(a,b,c,d,words[i+5],4,-378558); d = hh(d,a,b,c,words[i+8],11,-2022574463);
      c = hh(c,d,a,b,words[i+11],16,1839030562); b = hh(b,c,d,a,words[i+14],23,-35309556);
      a = hh(a,b,c,d,words[i+1],4,-1530992060); d = hh(d,a,b,c,words[i+4],11,1272893353);
      c = hh(c,d,a,b,words[i+7],16,-155497632); b = hh(b,c,d,a,words[i+10],23,-1094730640);
      a = hh(a,b,c,d,words[i+13],4,681279174); d = hh(d,a,b,c,words[i+0],11,-358537222);
      c = hh(c,d,a,b,words[i+3],16,-722521979); b = hh(b,c,d,a,words[i+6],23,76029189);
      a = hh(a,b,c,d,words[i+9],4,-640364487); d = hh(d,a,b,c,words[i+12],11,-421815835);
      c = hh(c,d,a,b,words[i+15],16,530742520); b = hh(b,c,d,a,words[i+2],23,-995338651);

      a = ii(a,b,c,d,words[i+0],6,-198630844); d = ii(d,a,b,c,words[i+7],10,1126891415);
      c = ii(c,d,a,b,words[i+14],15,-1416354905); b = ii(b,c,d,a,words[i+5],21,-57434055);
      a = ii(a,b,c,d,words[i+12],6,1700485571); d = ii(d,a,b,c,words[i+3],10,-1894986606);
      c = ii(c,d,a,b,words[i+10],15,-1051523); b = ii(b,c,d,a,words[i+1],21,-2054922799);
      a = ii(a,b,c,d,words[i+8],6,1873313359); d = ii(d,a,b,c,words[i+15],10,-30611744);
      c = ii(c,d,a,b,words[i+6],15,-1560198380); b = ii(b,c,d,a,words[i+13],21,1309151649);
      a = ii(a,b,c,d,words[i+4],6,-145523070); d = ii(d,a,b,c,words[i+11],10,-1120210379);
      c = ii(c,d,a,b,words[i+2],15,718787259); b = ii(b,c,d,a,words[i+9],21,-343485551);

      a = add(a, oa); b = add(b, ob); c = add(c, oc); d = add(d, od);
    }
    return [a, b, c, d];
  }
  function toHex(arr) {
    var hex = "";
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      for (var j = 0; j < 4; j++) {
        var v = (x >>> (j * 8)) & 0xff;
        hex += (v + 0x100).toString(16).slice(1);
      }
    }
    return hex;
  }
  window.md5 = function md5(input) { return toHex(md5core(toWords(input))); };
})();

async function sha256Hex(str) {
  const enc = new TextEncoder();
  const data = enc.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const bytes = new Uint8Array(hash);
  let hex = '';
  for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2, '0');
  return hex;
}

// UI: live hashing
const inputEl = document.getElementById('inputText');
const shaOut = document.getElementById('sha256Out');
const md5Out = document.getElementById('md5Out');

async function updateHashes() {
  const v = inputEl.value || '';
  if (!v) {
    shaOut.textContent = '–';
    md5Out.textContent = '–';
    return;
  }
  shaOut.textContent = 'Computing...';
  md5Out.textContent = 'Computing...';
  const [sha, md] = await Promise.all([sha256Hex(v), Promise.resolve(window.md5(v))]);
  shaOut.textContent = sha;
  md5Out.textContent = md;
}

inputEl.addEventListener('input', () => { updateHashes(); });
updateHashes();

// Performance benchmark
const bufSizeEl = document.getElementById('bufSize');
const durationEl = document.getElementById('durationMs');
const runPerfBtn = document.getElementById('runPerf');
const perfShaEl = document.getElementById('perfSha256');
const perfMd5El = document.getElementById('perfMd5');

function randomString(len) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return s;
}

async function benchSha256(bytes, durationMs) {
  const end = performance.now() + durationMs;
  let ops = 0;
  while (performance.now() < end) {
    await crypto.subtle.digest('SHA-256', bytes);
    ops++;
  }
  return ops;
}

function benchMd5(str, durationMs) {
  const end = performance.now() + durationMs;
  let ops = 0;
  while (performance.now() < end) {
    window.md5(str);
    ops++;
  }
  return ops;
}

runPerfBtn.addEventListener('click', async () => {
  const size = Math.max(32, parseInt(bufSizeEl.value || '65536', 10));
  const duration = Math.max(250, parseInt(durationEl.value || '1500', 10));
  perfShaEl.textContent = 'Running...';
  perfMd5El.textContent = 'Running...';
  const rand = new Uint8Array(size);
  crypto.getRandomValues(rand);
  const str = randomString(size);
  const [shaOps, mdOps] = await Promise.all([
    benchSha256(rand, duration),
    Promise.resolve(benchMd5(str, duration))
  ]);
  const shaMBps = ((shaOps * size) / (1024 * 1024) / (duration / 1000)).toFixed(2);
  const mdMBps = ((mdOps * size) / (1024 * 1024) / (duration / 1000)).toFixed(2);
  perfShaEl.textContent = `${shaOps} ops, ${shaMBps} MiB/s`;
  perfMd5El.textContent = `${mdOps} ops, ${mdMBps} MiB/s`;
  // Draw comparison chart
  drawPerfChart(parseFloat(shaMBps), parseFloat(mdMBps));
});

// Collision demo via worker
const startShaBtn = document.getElementById('startCollisionSha');
const startMd5Btn = document.getElementById('startCollisionMd5');
const stopBtn = document.getElementById('stopCollision');
const bitsEl = document.getElementById('prefixBits');
const shaStatus = document.getElementById('colShaStatus');
const mdStatus = document.getElementById('colMd5Status');
const shaRes = document.getElementById('colShaResult');
const mdRes = document.getElementById('colMd5Result');

let worker;
function createInlineWorker() {
  const workerSource = `
    function md5(str){
      function toWords(input){var n=(((input.length+8)>>>6)+1)*16;var w=new Array(n).fill(0);var i;for(i=0;i<input.length;i++){w[i>>2]|=input.charCodeAt(i)<<((i%4)*8);}w[i>>2]|=0x80<<((i%4)*8);var bl=input.length*8;w[n-2]=bl&0xffffffff;w[n-1]=(bl/0x100000000)|0;return w;}
      function lr(x,c){return(x<<c)|(x>>> (32-c));}
      function add(x,y){return(x+y)|0;} function cmn(q,a,b,x,s,t){return add(lr(add(add(a,q),add(x,t)),s),b);} 
      function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t);} function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t);} 
      function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t);} function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t);} 
      function core(words){var a=1732584193,b=-271733879,c=-1732584194,d=271733878;for(var i=0;i<words.length;i+=16){var oa=a,ob=b,oc=c,od=d;
        a=ff(a,b,c,d,words[i+0],7,-680876936);d=ff(d,a,b,c,words[i+1],12,-389564586);c=ff(c,d,a,b,words[i+2],17,606105819);b=ff(b,c,d,a,words[i+3],22,-1044525330);
        a=ff(a,b,c,d,words[i+4],7,-176418897);d=ff(d,a,b,c,words[i+5],12,1200080426);c=ff(c,d,a,b,words[i+6],17,-1473231341);b=ff(b,c,d,a,words[i+7],22,-45705983);
        a=ff(a,b,c,d,words[i+8],7,1770035416);d=ff(d,a,b,c,words[i+9],12,-1958414417);c=ff(c,d,a,b,words[i+10],17,-42063);b=ff(b,c,d,a,words[i+11],22,-1990404162);
        a=ff(a,b,c,d,words[i+12],7,1804603682);d=ff(d,a,b,c,words[i+13],12,-40341101);c=ff(c,d,a,b,words[i+14],17,-1502002290);b=ff(b,c,d,a,words[i+15],22,1236535329);
        a=gg(a,b,c,d,words[i+1],5,-165796510);d=gg(d,a,b,c,words[i+6],9,-1069501632);c=gg(c,d,a,b,words[i+11],14,643717713);b=gg(b,c,d,a,words[i+0],20,-373897302);
        a=gg(a,b,c,d,words[i+5],5,-701558691);d=gg(d,a,b,c,words[i+10],9,38016083);c=gg(c,d,a,b,words[i+15],14,-660478335);b=gg(b,c,d,a,words[i+4],20,-405537848);
        a=gg(a,b,c,d,words[i+9],5,568446438);d=gg(d,a,b,c,words[i+14],9,-1019803690);c=gg(c,d,a,b,words[i+3],14,-187363961);b=gg(b,c,d,a,words[i+8],20,1163531501);
        a=gg(a,b,c,d,words[i+13],5,-1444681467);d=gg(d,a,b,c,words[i+2],9,-51403784);c=gg(c,d,a,b,words[i+7],14,1735328473);b=gg(b,c,d,a,words[i+12],20,-1926607734);
        a=hh(a,b,c,d,words[i+5],4,-378558);d=hh(d,a,b,c,words[i+8],11,-2022574463);c=hh(c,d,a,b,words[i+11],16,1839030562);b=hh(b,c,d,a,words[i+14],23,-35309556);
        a=hh(a,b,c,d,words[i+1],4,-1530992060);d=hh(d,a,b,c,words[i+4],11,1272893353);c=hh(c,d,a,b,words[i+7],16,-155497632);b=hh(b,c,d,a,words[i+10],23,-1094730640);
        a=hh(a,b,c,d,words[i+13],4,681279174);d=hh(d,a,b,c,words[i+0],11,-358537222);c=hh(c,d,a,b,words[i+3],16,-722521979);b=hh(b,c,d,a,words[i+6],23,76029189);
        a=hh(a,b,c,d,words[i+9],4,-640364487);d=hh(d,a,b,c,words[i+12],11,-421815835);c=hh(c,d,a,b,words[i+15],16,530742520);b=hh(b,c,d,a,words[i+2],23,-995338651);
        a=ii(a,b,c,d,words[i+0],6,-198630844);d=ii(d,a,b,c,words[i+7],10,1126891415);c=ii(c,d,a,b,words[i+14],15,-1416354905);b=ii(b,c,d,a,words[i+5],21,-57434055);
        a=ii(a,b,c,d,words[i+12],6,1700485571);d=ii(d,a,b,c,words[i+3],10,-1894986606);c=ii(c,d,a,b,words[i+10],15,-1051523);b=ii(b,c,d,a,words[i+1],21,-2054922799);
        a=ii(a,b,c,d,words[i+8],6,1873313359);d=ii(d,a,b,c,words[i+15],10,-30611744);c=ii(c,d,a,b,words[i+6],15,-1560198380);b=ii(b,c,d,a,words[i+13],21,1309151649);
        a=ii(a,b,c,d,words[i+4],6,-145523070);d=ii(d,a,b,c,words[i+11],10,-1120210379);c=ii(c,d,a,b,words[i+2],15,718787259);b=ii(b,c,d,a,words[i+9],21,-343485551);
        a=(a+oa)|0;b=(b+ob)|0;c=(c+oc)|0;d=(d+od)|0;}
        return [a,b,c,d];}
      function toHex(arr){var h="";for(var i=0;i<arr.length;i++){var x=arr[i];for(var j=0;j<4;j++){var v=(x>>> (j*8))&0xff;h+=(v+0x100).toString(16).slice(1);} }return h;}
      return toHex(core((function toWords(input){var n=(((input.length+8)>>>6)+1)*16;var w=new Array(n).fill(0);var i;for(i=0;i<input.length;i++){w[i>>2]|=input.charCodeAt(i)<<((i%4)*8);}w[i>>2]|=0x80<<((i%4)*8);var bl=input.length*8;w[n-2]=bl&0xffffffff;w[n-1]=(bl/0x100000000)|0;return w;})(str)));
    }
    async function sha256Hex(str){
      const enc = new TextEncoder();
      const data = enc.encode(str);
      const hash = await crypto.subtle.digest('SHA-256', data);
      const bytes = new Uint8Array(hash);
      let hex = '';
      for (let i = 0; i < bytes.length; i++) hex += bytes[i].toString(16).padStart(2,'0');
      return hex;
    }
    let running=false;
    function prefixBits(hex,bits){const bytesNeeded=Math.ceil(bits/8);const sliced=hex.slice(0,bytesNeeded*2);const val=parseInt(sliced,16);const extra=(bytesNeeded*8-bits);return val>>>extra;}
    onmessage = async (e)=>{
      const { action } = e.data || {};
      if (action === 'stop') { running=false; postMessage({ type:'stopped' }); return; }
      if (action !== 'start') return;
      const { algo, bits, base } = e.data; running=true;
      const seen=new Map(); let attempts=0; let lastProgress=0;
      while (running){
        const m = base + Math.random().toString(36).slice(2);
        let hex;
        if (algo==='SHA-256') hex = await sha256Hex(m); else hex = md5(m);
        const p = prefixBits(hex, bits);
        if (seen.has(p)){
          const m1 = seen.get(p);
          if (m1 !== m){
            const h1 = algo==='SHA-256' ? await sha256Hex(m1) : md5(m1);
            const h2 = hex;
            postMessage({ type:'result', algo, attempts, m1, m2:m, h1, h2 });
            running=false; return;
          }
        } else { seen.set(p, m); }
        attempts++;
        if (attempts - lastProgress > 1000){ lastProgress = attempts; postMessage({ type:'progress', algo, attempts, seen: seen.size }); }
      }
    };`;
  const blob = new Blob([workerSource], { type: 'text/javascript' });
  return new Worker(URL.createObjectURL(blob));
}

function ensureWorker() {
  if (!worker) {
    try {
      // Prefer inline worker for file:// compatibility
      worker = createInlineWorker();
    } catch (e) {
      // Fallback to external file if needed
      worker = new Worker('./collision.worker.js');
    }
    worker.onmessage = (e) => {
      const msg = e.data;
      if (msg.type === 'progress') {
        const target = msg.algo === 'SHA-256' ? shaStatus : mdStatus;
        target.textContent = `Attempts: ${msg.attempts.toLocaleString()} | Seen prefixes: ${msg.seen}`;
      } else if (msg.type === 'result') {
        const status = msg.algo === 'SHA-256' ? shaStatus : mdStatus;
        const out = msg.algo === 'SHA-256' ? shaRes : mdRes;
        status.textContent = `Done in ${msg.attempts.toLocaleString()} attempts`;
        out.textContent = `m1: ${msg.m1}\nH:  ${msg.h1}\n\nm2: ${msg.m2}\nH:  ${msg.h2}`;
      } else if (msg.type === 'stopped') {
        shaStatus.textContent = 'Stopped';
        mdStatus.textContent = 'Stopped';
      }
    };
  }
}

function startAlgo(algo) {
  ensureWorker();
  const bits = Math.max(8, Math.min(28, parseInt(bitsEl.value || '20', 10)));
  const base = 'demo:' + new Date().toISOString() + ':';
  if (algo === 'SHA-256') {
    shaStatus.textContent = 'Searching...';
    shaRes.textContent = '–';
  } else {
    mdStatus.textContent = 'Searching...';
    mdRes.textContent = '–';
  }
  worker.postMessage({ action: 'start', algo, bits, base });
}

startShaBtn.addEventListener('click', () => startAlgo('SHA-256'));
startMd5Btn.addEventListener('click', () => startAlgo('MD5'));
stopBtn.addEventListener('click', () => { ensureWorker(); worker.postMessage({ action: 'stop' }); });

// Simple bar chart for performance
const perfChartCanvas = document.getElementById('perfChart');
const ctx = perfChartCanvas.getContext('2d');
function drawPerfChart(shaMBps, mdMBps) {
  const w = perfChartCanvas.width;
  const h = perfChartCanvas.height;
  ctx.clearRect(0, 0, w, h);
  // Axes
  ctx.strokeStyle = '#203247';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, 10);
  ctx.lineTo(40, h - 30);
  ctx.lineTo(w - 10, h - 30);
  ctx.stroke();
  const maxVal = Math.max(shaMBps, mdMBps, 1);
  const barWidth = 140;
  const gap = 60;
  const baseY = h - 30;
  const scale = (h - 60) / maxVal;
  // Bars
  function bar(x, val, color, label){
    const bh = val * scale;
    ctx.fillStyle = color;
    ctx.fillRect(x, baseY - bh, barWidth, bh);
    ctx.fillStyle = '#e6edf3';
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(label, x, baseY + 16);
    ctx.fillText(`${val.toFixed(2)} MiB/s`, x, baseY - bh - 6);
  }
  const startX = 70;
  bar(startX, shaMBps, '#4aa3ff', 'SHA-256');
  bar(startX + barWidth + gap, mdMBps, '#22c55e', 'MD5');
}


