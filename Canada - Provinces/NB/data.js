var juris = [	"seat001",	"seat002",	"seat003",	"seat004",	"seat005",	"seat006",	"seat007",	"seat008",	"seat009",	"seat010",	"seat011",	"seat012",	"seat013",	"seat014",	"seat015",	"seat016",	"seat017",	"seat018",	"seat019",	"seat020",	"seat021",	"seat022",	"seat023",	"seat024",	"seat025",	"seat026",	"seat027",	"seat028",	"seat029",	"seat030",	"seat031",	"seat032",	"seat033",	"seat034",	"seat035",	"seat036",	"seat037",	"seat038",	"seat039",	"seat040",	"seat041",	"seat042",	"seat043",	"seat044",	"seat045",	"seat046",	"seat047",	"seat048",	"seat049",	]	
var jurisnames = [	"Restigouche West",	"Campbellton-Dalhousie",	"Restigouche-Chaleur",	"Bathurst West-Beresford",	"Bathurst East-Nepisiguit-Saint-Isidore",	"Caraquet",	"Shippagan-Lamèque-Miscou",	"Tracadie-Sheila",	"Miramichi Bay-Neguac",	"Miramichi",	"Southwest Miramichi-Bay du Vin",	"Kent North",	"Kent South",	"Shediac Bay-Dieppe",	"Shediac-Beaubassin-Cap-Pelé",	"Memramcook-Tantramar",	"Dieppe",	"Moncton East",	"Moncton Centre",	"Moncton South",	"Moncton Northwest",	"Moncton Southwest",	"Riverview",	"Albert",	"Gagetown-Petitcodiac",	"Sussex-Fundy-St. Martins",	"Hampton",	"Quispamsis",	"Rothesay",	"Saint John East",	"Portland-Simonds",	"Saint John Harbour",	"Saint John Lancaster",	"Kings Centre",	"Fundy-The Isles-Saint John West",	"Saint Croix",	"Oromocto-Lincoln-Fredericton",	"Fredericton-Grand Lake",	"New Maryland-Sunbury",	"Fredericton South",	"Fredericton North",	"Fredericton-York",	"Fredericton West-Hanwell",	"Carleton-York",	"Carleton",	"Carleton-Victoria",	"Victoria-La Vallée",	"Edmundston-Madawaska Centre",	"Madawaska Les Lacs-Edmundston",	]	

var pcnbraw = [	1247,	1369,	1149,	1985,	1568,	985,	714,	2059,	2751,	1508,	3887,	1363,	2817,	2971,	1820,	1678,	1680,	3525,	1642,	2734,	4111,	3679,	4695,	5040,	4773,	4366,	4351,	5697,	4265,	3507,	3170,	2181,	3560,	4583,	4740,	3570,	3374,	2479,	5342,	2342,	3227,	3730,	4726,	4750,	3536,	3330,	2071,	1380,	1763,		]
var libraw = [	5022,	4540,	3823,	3730,	4163,	5928,	6834,	6175,	3561,	2239,	1760,	2933,	5148,	5839,	4949,	2902,	4564,	2759,	2448,	1966,	2448,	1561,	1281,	921,	867,	971,	1084,	1225,	1463,	1639,	1654,	1207,	1471,	911,	726,	401,	2072,	749,	1048,	895,	1464,	872,	1510,	940,	1239,	2939,	4365,	5236,	4583,	]	
var grnraw = [	1755,	1054,	1896,	965,	798,	1290,	609,	645,	825,	398,	0,	4021,	996,	0,	2453,	3425,	1142,	989,	1725,	1245,	702,	927,	800,	1056,	1003,	969,	816,	528,	719,	394,	483,	1224,	938,	1006,	686,	1238,	1306,	1005,	1463,	4213,	2464,	2110,	1745,	890,	581,	372,	426,	415,	542,	]	
var panbraw = [	0,	0,	0,	0,	0,	0,	0,	0,	898,	3527,	2268,	0,	243,	371,	0,	192,	0,	378,	308,	331,	493,	667,	778,	977,	1303,	1321,	687,	414,	413,	434,	282,	186,	394,	693,	688,	2546,	745,	3759,	1254,	234,	591,	1991,	825,	1524,	1909,	610,	292,	0,	0,	]	
var ndpraw = [	0,	0,	0,	0,	0,	0,	0,	0,	139,	92,	188,	0,	118,	528,	0,	0,	200,	153,	168,	220,	229,	224,	261,	0,	131,	129,	251,	501,	0,	248,	164,	309,	201,	254,	291,	147,	127,	87,	141,	117,	100,	68,	131,	110,	80,	113,	0,	0,	0,	]	

var othraw = [	56,	0,	0,	0,	0,	0,	0,	0,	0,	54,	0,	154,	0,	0,	0,	34,	0,	0,	0,	0,	0,	0,	0,	90,	0,	0,	0,	0,	44,	0,	0,	47,	0,	0,	0,	0,	0,	18,	0,	0,	0,	24,	0,	0,	41,	0,	92,	0,	0,	]	


var othrawinit = []

for(let y = 0; y < partyabbrv.length; y++){
  eval('var ' + partyabbrv[y] + 'rawinit = []')
  for(let x = 0; x < juris.length; x++){
    eval(partyabbrv[y] + 'rawinit[x] = ' + partyabbrv[y] + 'raw[x]')
    othrawinit[x] = othraw[x]
    //lpcrawinit[x] = lpcraw[x]
  }
}

idprefix = ""