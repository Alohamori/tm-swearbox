const names = "Frank Skinner,Josh Widdicombe,Roisin Conaty,Romesh Ranganathan,Tim Key,Doc Brown,Joe Wilkinson,Jon Richardson,Katherine Ryan,Richard Osman,Al Murray,Dave Gorman,Paul Chowdhry,Rob Beckett,Sara Pascoe,Hugh Dennis,Joe Lycett,Lolly Adefope,Mel Giedroyc,Noel Fielding,Aisling Bea,Bob Mortimer,Mark Watson,Nish Kumar,Sally Phillips,Alice Levine,Asim Chaudhry,Liza Tarbuck,Russell Howard,Tim Vine,James Acaster,Jessica Knappett,Kerry Godliman,Phil Wang,Rhod Gilbert,Iain Stirling,Joe Thomas,Lou Sanders,Paul Sinha,Sian Gibson,David Baddiel,Ed Gamble,Jo Brand,Katy Wix,Rose Matafeo,Daisy May Cooper,Johnny Vegas,Katherine Parkinson,Mawaan Rizwan,Richard Herring,Charlotte Ritchie,Jamali Maddix,Lee Mack,Mike Wozniak,Sarah Kendall,Alan Davies,Desiree Burch,Guz Khan,Morgana Robinson,Victoria Coren Mitchell,Ardal O'Hanlon,Bridget Christie,Chris Ramsey,Judi Love,Sophie Duker,Dara Ó Briain,Fern Brady,John Kearns,Munya Chawawa,Sarah Millican,Frankie Boyle,Ivo Graham,Jenny Eclair,Kiell Smith-Bynoe,Mae Martin".split(',');

const cids = '3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 63 64 65 66 67 68 69 70 71 72 78 79 80 81 82 88 89 90 91 92 98 99 100 101 102'.split(' ');
const eps = [6,5,5,8,8,10,10,10,10,10,10,10,10,10,10];

const data = {
  "ass/arse":[[,,2,,,,4,,,,,,,1,,,,,,,,1,,,2,2,,2,,,3,,,,,,,,,,4,1,2,,1,,2,,,,,,,,,,,3,2,,,,2,,1,3,2,,,,,,1],[,,,,,,,,,,,,,,,,,,,,,,,,,,4,2,2,,1,1,,,,,,,,,1,,,,,,,,2,,,1,1,,,,,3,4,,,,,1]],
  "bastard":[[,,,,,1,,4,1,,,,6,2,,,,,,1,,,,,,,,,2,,,,,,,,,,,,,,1,,,,,1,,,,,2,,,1,,1,2,,,,1,,,,,1,,,2,,2],[,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1]],
  "bitch":[[,,,,,,,,1,,,,,,,,1,,,,,,,,,,,,,1],[,,,2,,,,,2,,,,,,,,,,,,1,,,,,,1,,1,1,,,,,,,,,,,,,,,,,,,1,,,1,,,1,,1,,,,,,,1]],
  "bollock":[[,,,1,1,,,,,,1,,,,,,,,5,,,,,,,,1,2,2,1,,,,,1,,,,,,9,,3,,,,,,,1,,,1,,,,,1,,,,,,,,,,1],[,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,1,,,,,,1,,1,,,1,,,,,,,,,,,,,5]],
  "bugger":[[,,,,,,,,,,,,,,,,,,,1,,,,,1,1,,2,,,,,,,,,,,1,,,,,,,1,,,,,,,1,,,,,,,,,,1,,,,,,,5,,,3],[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,1]],
  "Christ":[[,,,1,1,,,,,,,,,,,,,,,,1,,2,,,,,,1,,,,,,,1,3,,,,,1,,,,,,,,,,,,,,,1,,,,,,1,,,5,,2,,1,1,1,1,,1],[,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1]],
  "cock":[[,,,,,,,,,,,,,,,,,,,,,,,,,1,1,,,,,,,,,,,,,,2,,,,,,,,,1,,,1],[,,,,,,,,2,,,,,,,,,,,,,,,,,,,1,,,,,,,1,,,,,,,,1,,,2,,,,,,,,,,1,,,,,,,,,,,,,,1]],
  "damn":[[,,,1,,,,,,,2,,,,,,,,,1,,1,,1,,,,,,,5,,,1,,3,,,,,,,,,4,,2,,1,1,,1,,,,,4,,,,,,2,2,1,,,,7,,,,1,1],[,,,,1,,,,,,2,,,,,,,,,,1,,,2,,,,1,1,,,,,1,,2,,,,,,,,,1,,,,,,1,,,,,,1,,,,,,,3,,,,,,,,2,,1]],
  "dick":[[,,,,,,,,,,1,,,,,,,,,,,,,1,,1,1,,3,,1,,,,1,1,,,1,,,1,,,1,,,,,,,1,,,,,,,1,,,,,1,,,1,,,2],[,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,1,,,2,,,,,2,,,,,1,,,,,,,,3,,,,,,3,,,,,1,,,,,,,1]],
  "fuck":[[,4,,6,3,6,2,6,3,2,,,2,9,,1,6,,,2,1,8,1,2,,,13,,25,,9,2,,1,7,5,10,,,,5,6,3,3,9,17,,8,4,2,1,7,1,,7,,7,2,8,,1,1,4,3,,,5,17,,3,7,1,12,,5],[,2,1,2,1,3,1,,1,,1,,,2,,4,6,,1,2,3,5,1,2,,,15,,5,,4,4,2,3,2,6,2,2,5,,5,11,12,1,2,8,,2,1,1,,4,,,,,,1,1,,,2,2,3,,2,1,4,,2,7,1,2,6]],
  "hell":[[,1,,3,,1,,1,,,1,1,,,,,,1,1,1,,,1,,,1,2,1,2,1,1,,,,1,,3,1,1,,,2,,,,2,2,1,3,,2,,,,1,,2,,1,,,1,2,1,,2,,3,7,1,,,3],[,,,,,,,,,,1,,,1,,,,,,,1,,1,1,,,1,,1,,,1,,,1,,2,,,,,,,,,1,,,1,,,,1,,,,1,,,,,1,,1,,1,,1]],
  "piss":[[,,,,,,1,,,,,,1,,,,,,,1,1,2,,5,2,1,2,,3,,,,1,,1,,,,,,,,,,,,1,1,,,,,1,,,,,,,,,,,2,,,1,3,,1,,,,,1],[,,1,3,1,1,1,,,,,1,,1,,,,,,,,3,1,2,1,,,,,,,,,,,,,,,1,3,1,3,,,1,,,,,,1,,,,,,,2,,,1,,2,1,,1,,,,1,,,,1]],
  "prick":[[,,,,,1,,1,,,,,,,,,2,,,,,,,,,,,,1,,,,,,1,,,,,,,1,,,,,,,,,,1,,,1,,,,,,,,4,,,,,1],[,,,2,,,,,,,,,,,,,1,,,,3,,2,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,1]],
  "pussy":[[,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1],[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1]],
  "shit":[[,2,2,9,3,5,9,5,,,,,1,2,2,,4,,,1,2,6,,9,,4,18,1,6,,6,,,3,6,2,5,4,,3,3,2,1,2,3,1,2,,14,1,,8,4,,3,4,2,17,1,1,1,1,5,4,1,1,1,4,3,8,1,,5,4,1],[1,,1,16,2,2,2,1,,,,,,2,,2,2,,,1,2,2,1,5,1,1,15,,3,,2,2,4,5,2,4,1,1,1,,5,3,2,2,1,2,1,,4,1,,9,,,1,,1,8,3,,2,,1,2,1,1,2,,1,3,1,2,2,3,1]],
  "slut":[[],[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1]],
  "tits":[[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,2],[,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,1,,1,,1,,,,,,,,,,,1]],
  "twat":[[,,,,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,1,1,,,,,,,,,,2,,,,,,,,,1],[,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,1]],
  "wank":[[,,,,2,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,,,,,,1,,,,,,,1],[,2,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,,,,1,,,,,,,,,2,,,,,,,,,,,,,,,,,,,,,,,,1]],
  "whore":[[],[,,,,,,,1]]
}

const scheme = {"ass/arse":"#4c78a8","bastard":"#9ecae9","bitch":"#f58518","bollock":"#ffbf79","bugger":"#54a24b","Christ":"#88d27a","cock":"#b79a20","damn":"#f2cf5b","dick":"#439894","fuck":"#83bcb6","hell":"#e45756","piss":"#ff9d98","prick":"#79706e","pussy":"#bab0ac","shit":"#d67195","slut":"#fcbfd2","tits":"#b279a2","twat":"#d6a5c9","wank":"#9e765f","whore":"#d8b5a5"};

const spec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {},
  "resolve": {"scale": {"color": "independent"}},
  "layer": [
    {"mark": "bar",
      "transform": [
        {"calculate": null, "as": "query"},
        {"calculate": "datum.word + ': ' + datum.n", "as": "tip"},
      ],
      "encoding": {
        "x": {"aggregate": "sum", "field": "n", "type": "quantitative", "stack": "zero", "title": null},
        "y": {"field": "contestant", "type": "nominal", "title": null},
        "color": {"field": "word", "type": "nominal", "scale": {}},
        "tooltip": {"field": "tip", "type": "nominal"},
        "href": {"field": "query", "type": "nominal"}
      }
    },
  ]
}

const opts = {
  'actions': false,
  'renderer': 'svg',
  'config': {},
  'loader': {'target': '_blank'}
}
