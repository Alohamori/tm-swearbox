const qs = s => document.querySelector(s);
const qsa = s => document.querySelectorAll(s);

window.addEventListener('DOMContentLoaded', () => {
  let s = [];
  for (let word in data)
    s.push(`<label><input type="checkbox" checked>${word}</label> `);
  qs('#words').innerHTML += s.join('');
  s = [];
  for (let i = 1; i <= 15; ++i)
    s.push(`<label><input type="checkbox" checked>${i}</label> `);
  qs('#series').innerHTML += s.join('');

  if (s = location.hash) {
    const checks = qsa('input[type=checkbox]');
    const bits = Number(s.slice(1, -1)).toString(2).padStart(38, '0');
    for (let i = 0; i < 38; ++i)
      checks[i].checked = bits[i] * 1 ? false : true;
    qsa('#sort input')['nsp'.indexOf(s.slice(-1))].checked = true;
  }

  update();
  qsa('input').forEach(e => e.onchange = update);
});

const select = (e, s) => {
  qsa(`${e} input`).forEach(e => e.checked = s);
  update();
};

const update = () => {
  const words = Array.from(qsa('#words input')).map(e => e.checked ? e.nextSibling.textContent : '')
  const series = Array.from(qsa('#series input')).map(e => e.checked);
  const [stud, rec, perep] = Array.from(qsa('#misc input')).map(e => e.checked);
  const sort = Array.from(qsa('#sort input')).findIndex(e => e.checked);

  spec.data['values'] = [];
  const seen = {};
  for (const [word, v] of Object.entries(data)) {
    for (let i = 0; i < 75; ++i) {
      const cs = Math.floor(i / 5);
      if (words.includes(word) && series[cs]) {
        let n = 0;
        if (stud) n += (v[1][i] || 0);
        if (rec) n += (v[0][i] || 0);
        if (perep) n /= eps[cs];
        if (n) seen[word] = scheme[word];
        spec.data['values'].push({contestant: names[i], cid: cids[i], word, n});
      }
    }
  };

  if (sort < 2)
    spec.layer[0].encoding.y.sort = {"field": ['contestant', 'cid'][sort]};
  else
    spec.layer[0].encoding.y.sort = {"op": "sum", "field": "n", order: "descending"};

  spec.layer[0].encoding.color.scale['domain'] = Object.keys(seen);
  spec.layer[0].encoding.color.scale['range'] = Object.values(seen);

  let query = "'https://prettygr.im/tdlm/taskmaster/profanity?speaker=' + datum.cid + '&roots__arraycontains=' + datum.word";
  if (stud != rec) query += `+ '&studio=${stud ? 1 : 0}'`;
  spec.layer[0].transform[0]['calculate'] = query

  vegaEmbed('#vis', spec, opts).catch(console.warn);

  const ticks = Array.from(qsa('input[type=checkbox]')).map(e => e.checked ? 0 : 1);
  location.hash = parseInt(ticks.join(''), 2) + 'nsp'[sort];
};
