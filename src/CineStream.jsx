import { useState, useEffect, useRef } from "react";
import { Search, Play, Plus, Info, Star, X, ChevronRight, ChevronLeft, Bell, User, Heart, Film, Loader, AlertCircle, ExternalLink } from "lucide-react";

if (!document.getElementById("cs-style")) {
  const s = document.createElement("style");
  s.id = "cs-style";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body,#root{background:#07070f!important;min-height:100vh}
    ::-webkit-scrollbar{width:4px;height:4px}
    ::-webkit-scrollbar-track{background:transparent}
    ::-webkit-scrollbar-thumb{background:#2a2a45;border-radius:10px}
    .noscroll::-webkit-scrollbar{display:none}
    .noscroll{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn{from{opacity:0}to{opacity:1}}
    @keyframes kbzoom{from{transform:scale(1)}to{transform:scale(1.06)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
    @keyframes rowIn{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
    @keyframes pulse2{0%,100%{opacity:1}50%{opacity:.4}}
    .card-wrap{transition:transform .28s cubic-bezier(.25,.46,.45,.94)}
    .card-wrap:hover{transform:scale(1.06) translateY(-6px);z-index:20}
    .arrow-btn{opacity:0;transition:opacity .2s,background .2s}
    .row-wrap:hover .arrow-btn{opacity:1}
    .tab-pill{background:none;border:1px solid transparent;padding:6px 14px;border-radius:20px;color:#8080a8;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:all .2s}
    .tab-pill:hover{color:#f0f0ff;border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.05)}
    .tab-pill.on-gold{background:#d4a017;color:#07070f;border-color:#d4a017;font-weight:600}
    .tab-pill.on-pink{background:#e84393;color:#fff;border-color:#e84393;font-weight:600}
    .search-box{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:8px;padding:8px 14px 8px 38px;color:#f0f0ff;font-family:'DM Sans',sans-serif;font-size:14px;width:200px;transition:all .25s;outline:none}
    .search-box:focus{background:rgba(255,255,255,.12);width:250px}
    .search-box::placeholder{color:#5858a0}
    .btn-gold{background:#d4a017;color:#07070f;border:none;padding:10px 22px;border-radius:6px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .2s,transform .15s}
    .btn-gold:hover{background:#e8b820;transform:translateY(-1px)}
    .btn-pink{background:#e84393;color:#fff;border:none;padding:10px 22px;border-radius:6px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .2s,transform .15s}
    .btn-pink:hover{background:#ff5ca8;transform:translateY(-1px)}
    .btn-ghost{background:rgba(255,255,255,.1);color:#f0f0ff;border:1px solid rgba(255,255,255,.2);padding:10px 20px;border-radius:6px;font-family:'DM Sans',sans-serif;font-weight:500;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .2s}
    .btn-ghost:hover{background:rgba(255,255,255,.2)}
    .icon-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);color:#f0f0ff;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
    .icon-btn:hover{background:rgba(255,255,255,.22);transform:scale(1.1)}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.87);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);animation:fadeIn .2s ease}
    .modal-box{background:#0d0d1c;border:1px solid rgba(255,255,255,.1);border-radius:16px;width:min(780px,95vw);max-height:90vh;overflow-y:auto;animation:fadeUp .3s ease}
    .genre-tag{background:rgba(212,160,23,.14);border:1px solid rgba(212,160,23,.28);color:#d4a017;padding:3px 10px;border-radius:12px;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500}
    .genre-tag-pink{background:rgba(232,67,147,.14);border:1px solid rgba(232,67,147,.28);color:#e84393;padding:3px 10px;border-radius:12px;font-size:12px;font-family:'DM Sans',sans-serif;font-weight:500}
    .mode-btn{display:flex;align-items:center;gap:7px;padding:7px 16px;border-radius:8px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:13px;cursor:pointer;border:1px solid rgba(255,255,255,.12);background:transparent;color:#7070a0;transition:all .22s}
    .mode-btn:hover{color:#f0f0ff;border-color:rgba(255,255,255,.28);background:rgba(255,255,255,.05)}
    .mode-btn.mf{background:rgba(212,160,23,.13);border-color:#d4a017;color:#d4a017}
    .mode-btn.ma{background:rgba(232,67,147,.13);border-color:#e84393;color:#e84393}
    .skeleton{background:linear-gradient(90deg,#0e0e1a 25%,#1a1a2e 50%,#0e0e1a 75%);background-size:600px 100%;animation:shimmer 1.5s infinite linear;border-radius:8px}
    .row-anim{animation:rowIn .4s ease}
  `;
  document.head.appendChild(s);
}

// ============================== FILMS DATA ==============================
const T = "https://image.tmdb.org/t/p/w500";
const TW = "https://image.tmdb.org/t/p/w1280";
const PLATS = {
  NETFLIX:{label:"Netflix",color:"#E50914"}, DISNEY:{label:"Disney+",color:"#2563EB"},
  AMAZON:{label:"Prime",color:"#00A8E0"}, HBO:{label:"HBO Max",color:"#8B5CF6"},
  APPLE:{label:"Apple TV+",color:"#888"}, ARTE:{label:"Arte",color:"#E96100"},
  FRANCE:{label:"France.tv",color:"#0066CC"}, CRUNCHYROLL:{label:"Crunchyroll",color:"#F47521"},
  ADN:{label:"ADN",color:"#00B4E4"}, WAKANIM:{label:"Wakanim",color:"#00D4AA"},
};
const FB = ["linear-gradient(135deg,#1a1a2e,#0f3460,#533483)","linear-gradient(135deg,#0d0d20,#1a1040,#2d1b69)","linear-gradient(135deg,#0f2027,#203a43,#2c5364)","linear-gradient(135deg,#1a0a0a,#3a1515,#5a2828)","linear-gradient(135deg,#0a1a0a,#1a3a1a,#2a5a2a)","linear-gradient(135deg,#1a0f00,#3a2a10,#5a4a20)","linear-gradient(135deg,#0a0f1a,#1a253a,#2a3f5a)","linear-gradient(135deg,#1a0a20,#2a1540,#4a2560)"];
const gfb = (id) => FB[(String(id).charCodeAt(0)||0)%FB.length];

// URL directe vers la page de visionnage sur chaque plateforme
const getPlatformUrl = (item) => {
  const t = encodeURIComponent(item.title);
  const urls = {
    NETFLIX:     `https://www.netflix.com/search?q=${t}`,
    DISNEY:      `https://www.disneyplus.com/search/${t}`,
    AMAZON:      `https://www.amazon.fr/s?k=${t}&i=instant-video`,
    HBO:         `https://www.max.com/search?q=${t}`,
    APPLE:       `https://tv.apple.com/search?term=${t}`,
    ARTE:        `https://www.arte.tv/fr/search/#q=${t}`,
    FRANCE:      `https://www.france.tv/recherche?q=${t}`,
    CRUNCHYROLL: `https://www.crunchyroll.com/search?q=${t}`,
    ADN:         `https://www.animedigitalnetwork.fr/video#search?search=${t}`,
    WAKANIM:     `https://wakanim.tv/fr/search?query=${t}`,
  };
  return urls[item.platform] || `https://www.google.com/search?q=${encodeURIComponent(item.title+" streaming")}`;
};

// Trailers YouTube connus pour les films/séries du catalogue
const KNOWN_TRAILERS = {
  "Inception":              "https://www.youtube.com/embed/YoHD9XEInc0",
  "The Dark Knight":        "https://www.youtube.com/embed/EXeTwQWrcwY",
  "Intouchables":           "https://www.youtube.com/embed/oJkKDFTFNtw",
  "Interstellar":           "https://www.youtube.com/embed/zSWdZVtXT7E",
  "Joker":                  "https://www.youtube.com/embed/zAGVQLHvwOY",
  "Parasite":               "https://www.youtube.com/embed/5xH0HfJHsaY",
  "Top Gun: Maverick":      "https://www.youtube.com/embed/qSqVVswa420",
  "Dune: Partie 1":         "https://www.youtube.com/embed/n9xhJrPXop4",
  "Dune: Partie 2":         "https://www.youtube.com/embed/Way9Dexny3w",
  "Oppenheimer":            "https://www.youtube.com/embed/uYPbbksJxIg",
  "Avengers: Endgame":      "https://www.youtube.com/embed/TcMBFSGVi1c",
  "Spider-Man: Spider-Verse":"https://www.youtube.com/embed/shW9i6k8cR0",
  "Lupin":                  "https://www.youtube.com/embed/ga0iTWXCGa0",
  "Squid Game":             "https://www.youtube.com/embed/oqxAJKy0ii4",
  "Stranger Things":        "https://www.youtube.com/embed/b9EkMc79ZSU",
  "Wednesday":              "https://www.youtube.com/embed/Di310WS9rfc",
  "Breaking Bad":           "https://www.youtube.com/embed/HhesaQXLuRY",
  "Game of Thrones":        "https://www.youtube.com/embed/bjqEWgDVPe0",
  "Arcane":                 "https://www.youtube.com/embed/fP7b7U1vPMs",
  "Peaky Blinders":         "https://www.youtube.com/embed/oVzVdvGIC7U",
  "Dark":                   "https://www.youtube.com/embed/rrwycJ08PSA",
  "Succession":             "https://www.youtube.com/embed/OqiI5EmFIsI",
  "Severance":              "https://www.youtube.com/embed/xEQP4VVuyrY",
  "House of the Dragon":    "https://www.youtube.com/embed/DotnJ7tTA34",
  "The Batman":             "https://www.youtube.com/embed/mqqft2x_Aa4",
  "Amélie Poulain":         "https://www.youtube.com/embed/SrFt0BoNMOs",
};
const getTrailerEmbed = (item) => item.trailerEmbed || KNOWN_TRAILERS[item.title] || null;

const FI = [
  {id:1,type:"Série",title:"Lupin",year:2021,info:"3 saisons",rating:7.5,platform:"NETFLIX",genres:["Action","Crime","Thriller"],lang:"🇫🇷 Français",desc:"Assane Diop, inspiré par Arsène Lupin, cherche à venger son père injustement accusé d'un crime qu'il n'a pas commis.",poster:`${T}/sgxkHLMDVGGHYmGq7oc4bSmTbnB.jpg`,backdrop:`${TW}/4rl0zrFnFJITaKaRR9HYj0bFKP9.jpg`,cats:["tendances","series","action","francais"],featured:true},
  {id:2,type:"Série",title:"Squid Game",year:2021,info:"2 saisons",rating:8.1,platform:"NETFLIX",genres:["Drame","Thriller","Survival"],lang:"🇰🇷 Coréen",desc:"Des joueurs criblés de dettes risquent leur vie dans des jeux d'enfants pour remporter 45,6 milliards de wons.",poster:`${T}/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg`,backdrop:`${TW}/oaGvjB0DvdhXhOAuADfHb261ZHa.jpg`,cats:["tendances","series","thriller","primes"],featured:false},
  {id:3,type:"Série",title:"Stranger Things",year:2016,info:"4 saisons",rating:8.7,platform:"NETFLIX",genres:["Horreur","Sci-Fi","Drame"],lang:"🇺🇸 Anglais",desc:"Quand un garçon disparaît, ses amis découvrent un mystère impliquant des expériences secrètes et une dimension parallèle.",poster:`${T}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,backdrop:`${TW}/56v2KjBlU4XaOv9rVYEQypROD7P.jpg`,cats:["tendances","series","scifi","action","primes"],featured:true},
  {id:4,type:"Série",title:"Wednesday",year:2022,info:"2 saisons",rating:8.1,platform:"NETFLIX",genres:["Horreur","Comédie","Mystère"],lang:"🇺🇸 Anglais",desc:"Wednesday Addams enquête sur des meurtres monstrueux tout en maîtrisant ses pouvoirs dans son lycée hanté.",poster:`${T}/9PFonBhy4cQy7Jz20NpMygczOkv.jpg`,backdrop:`${TW}/eiDlkODSMK4Z9wTL3f9l6Eg2FZ.jpg`,cats:["series","comedie","nouveautes"],featured:false},
  {id:5,type:"Série",title:"Breaking Bad",year:2008,info:"5 saisons",rating:9.5,platform:"NETFLIX",genres:["Crime","Drame","Thriller"],lang:"🇺🇸 Anglais",desc:"Un professeur de chimie atteint d'un cancer fabrique de la drogue et devient un criminel redouté.",poster:`${T}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,backdrop:`${TW}/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg`,cats:["series","thriller","primes"],featured:false},
  {id:6,type:"Série",title:"Game of Thrones",year:2011,info:"8 saisons",rating:9.2,platform:"HBO",genres:["Fantasy","Action","Drame"],lang:"🇺🇸 Anglais",desc:"Neuf familles nobles s'affrontent pour le contrôle des Sept Royaumes de Westeros.",poster:`${T}/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg`,backdrop:`${TW}/suopoADq0k8YZr4dQXcU6pToj6s.jpg`,cats:["series","action","scifi","primes"],featured:false},
  {id:7,type:"Série",title:"Arcane",year:2021,info:"2 saisons",rating:9.0,platform:"NETFLIX",genres:["Animation","Action","Fantasy"],lang:"🇺🇸 Anglais",desc:"Deux sœurs luttent de part et d'autre d'une guerre naissante entre Piltover et les bidonvilles de Zaun.",poster:`${T}/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg`,backdrop:`${TW}/uQKIMnXq7GVl4wEXE1d5Ws7Gqzw.jpg`,cats:["tendances","series","animation","scifi","primes","nouveautes"],featured:true},
  {id:8,type:"Série",title:"Succession",year:2018,info:"4 saisons",rating:8.9,platform:"HBO",genres:["Drame","Comédie","Satire"],lang:"🇺🇸 Anglais",desc:"Les enfants d'un patriarche s'affrontent pour contrôler l'empire médiatique familial.",poster:`${T}/e2X8VVOaAYbFt75Jvkb8XkKumxr.jpg`,backdrop:`${TW}/4EYPN5mVTAnupwqBd1oQFDNmATj.jpg`,cats:["tendances","series","comedie","primes"],featured:false},
  {id:9,type:"Série",title:"Dark",year:2017,info:"3 saisons",rating:8.7,platform:"NETFLIX",genres:["Sci-Fi","Thriller","Mystère"],lang:"🇩🇪 Allemand",desc:"Quatre familles s'entrecroisent à travers le temps dans la ville de Winden.",poster:`${T}/apbrbWs5M2yBE3aOzkiL9Y2BGAK.jpg`,backdrop:`${TW}/95wMXFvnl8cRBTqCpKptnrqUlhb.jpg`,cats:["series","scifi","thriller","primes"],featured:false},
  {id:10,type:"Série",title:"Le Bureau des Légendes",year:2015,info:"5 saisons",rating:8.6,platform:"FRANCE",genres:["Espionnage","Thriller"],lang:"🇫🇷 Français",desc:"Un officier de la DGSE revient d'une mission d'infiltration à Damas.",poster:`${T}/iKlyI8LdmAnlFQGnhMkADSKHe7L.jpg`,backdrop:`${TW}/4rl0zrFnFJITaKaRR9HYj0bFKP9.jpg`,cats:["tendances","series","thriller","francais","primes"],featured:false},
  {id:11,type:"Série",title:"House of the Dragon",year:2022,info:"2 saisons",rating:8.5,platform:"HBO",genres:["Fantasy","Action","Drame"],lang:"🇺🇸 Anglais",desc:"La guerre civile Targaryen, 200 ans avant les événements de Game of Thrones.",poster:`${T}/z2yahl2uefxDCl0nogcRBstwruJ.jpg`,backdrop:`${TW}/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg`,cats:["tendances","series","action","scifi","nouveautes"],featured:false},
  {id:12,type:"Série",title:"Severance",year:2022,info:"2 saisons",rating:8.7,platform:"APPLE",genres:["Sci-Fi","Mystère","Thriller"],lang:"🇺🇸 Anglais",desc:"Des employés séparent leurs souvenirs professionnels et personnels avec des conséquences terribles.",poster:`${T}/jMi7tpceFWC3mOAkB1EWDQV7U6A.jpg`,backdrop:`${TW}/3RoRgkiep8PdQpWObzz6iuETHHH.jpg`,cats:["tendances","series","scifi","thriller","primes","nouveautes"],featured:false},
  {id:20,type:"Film",title:"Inception",year:2010,info:"2h 28min",rating:8.8,platform:"NETFLIX",genres:["Sci-Fi","Action","Thriller"],lang:"🇺🇸 Anglais",desc:"Un voleur spécialiste de l'intrusion dans les rêves se voit offrir une chance d'effacer son passé.",poster:`${T}/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg`,backdrop:`${TW}/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`,cats:["tendances","films","scifi","action","primes"],featured:true},
  {id:21,type:"Film",title:"The Dark Knight",year:2008,info:"2h 32min",rating:9.0,platform:"HBO",genres:["Action","Crime","Drame"],lang:"🇺🇸 Anglais",desc:"Batman affronte le Joker, un criminel anarchiste qui plonge Gotham dans le chaos.",poster:`${T}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,backdrop:`${TW}/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg`,cats:["films","action","primes"],featured:false},
  {id:22,type:"Film",title:"Intouchables",year:2011,info:"1h 52min",rating:8.5,platform:"NETFLIX",genres:["Comédie","Drame","Biographie"],lang:"🇫🇷 Français",desc:"Un aristocrate tétraplégique et son aide-soignant développent une amitié improbable.",poster:`${T}/6QAmkdoIBH1KxrJ01h2UO1LqxFT.jpg`,backdrop:`${TW}/7uoiKOEjCGTc4XJKC2SKHfCmqzT.jpg`,cats:["films","comedie","francais","primes"],featured:false},
  {id:23,type:"Film",title:"Interstellar",year:2014,info:"2h 49min",rating:8.6,platform:"NETFLIX",genres:["Sci-Fi","Aventure","Drame"],lang:"🇺🇸 Anglais",desc:"Des explorateurs voyagent à travers un trou de ver pour assurer la survie de l'humanité.",poster:`${T}/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg`,backdrop:`${TW}/xJHokMbljvjADYdit5fK5VQsXEG.jpg`,cats:["films","scifi","primes"],featured:false},
  {id:24,type:"Film",title:"Dune: Partie 2",year:2024,info:"2h 46min",rating:8.7,platform:"AMAZON",genres:["Sci-Fi","Action","Aventure"],lang:"🇺🇸 Anglais",desc:"Paul Atréides s'unit aux Fremen pour son voyage vers un destin mystique.",poster:`${T}/8b8R8l88Qje9dn9OE8PY05Nxl1Z.jpg`,backdrop:`${TW}/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg`,cats:["tendances","films","scifi","action","primes","nouveautes"],featured:false},
  {id:25,type:"Film",title:"Oppenheimer",year:2023,info:"3h 00min",rating:8.9,platform:"AMAZON",genres:["Biographie","Drame","Historique"],lang:"🇺🇸 Anglais",desc:"L'histoire de J. Robert Oppenheimer et du développement de la première bombe atomique.",poster:`${T}/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg`,backdrop:`${TW}/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg`,cats:["tendances","films","primes","nouveautes"],featured:false},
  {id:26,type:"Film",title:"Joker",year:2019,info:"2h 02min",rating:8.4,platform:"AMAZON",genres:["Drame","Crime","Thriller"],lang:"🇺🇸 Anglais",desc:"Arthur Fleck sombre dans la folie et devient le symbole d'une rébellion à Gotham.",poster:`${T}/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg`,backdrop:`${TW}/f5F4cRhQdUx3rGEHxFhLRrX9Dej.jpg`,cats:["films","thriller","primes"],featured:false},
  {id:27,type:"Film",title:"Parasite",year:2019,info:"2h 12min",rating:8.5,platform:"AMAZON",genres:["Thriller","Drame","Comédie Noire"],lang:"🇰🇷 Coréen",desc:"La famille Ki-taek s'infiltre dans la vie luxueuse des Park avec des conséquences inattendues.",poster:`${T}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,backdrop:`${TW}/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg`,cats:["films","thriller","comedie","primes"],featured:false},
  {id:28,type:"Film",title:"Amélie Poulain",year:2001,info:"2h 02min",rating:8.3,platform:"ARTE",genres:["Romance","Comédie","Fantaisie"],lang:"🇫🇷 Français",desc:"Amélie, serveuse solitaire à Montmartre, décide secrètement de changer la vie des gens.",poster:`${T}/hpTc0A8KtJbRDQrAiM1kRKijEm3.jpg`,backdrop:`${TW}/4rl0zrFnFJITaKaRR9HYj0bFKP9.jpg`,cats:["films","romance","comedie","francais","primes"],featured:false},
  {id:29,type:"Film",title:"Top Gun: Maverick",year:2022,info:"2h 11min",rating:8.3,platform:"AMAZON",genres:["Action","Drame","Aventure"],lang:"🇺🇸 Anglais",desc:"Maverick forme une nouvelle génération de pilotes d'élite pour une mission impossible.",poster:`${T}/62HCnUTziyWcpDaBO2i1DX17ljH.jpg`,backdrop:`${TW}/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg`,cats:["tendances","films","action"],featured:false},
  {id:30,type:"Film",title:"Spider-Man: Spider-Verse",year:2018,info:"1h 57min",rating:8.4,platform:"AMAZON",genres:["Animation","Action","Aventure"],lang:"🇺🇸 Anglais",desc:"Miles Morales devient Spider-Man et rencontre ses homologues d'autres dimensions.",poster:`${T}/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg`,backdrop:`${TW}/aCyMxOgKAIp28T8M8OWdqiRHjNh.jpg`,cats:["films","animation","action","primes"],featured:false},
  {id:31,type:"Documentaire",title:"Our Planet",year:2019,info:"2 saisons",rating:9.3,platform:"NETFLIX",genres:["Nature","Environnement"],lang:"🇬🇧 Anglais",desc:"David Attenborough présente la beauté et la fragilité de notre planète.",poster:`${T}/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg`,backdrop:`${TW}/evO9EVHPYH5Oiwqvnk5sMdMfzYZ.jpg`,cats:["documentaires","primes"],featured:false},
  {id:32,type:"Documentaire",title:"The Last Dance",year:2020,info:"10 épisodes",rating:9.1,platform:"NETFLIX",genres:["Sport","Biographie"],lang:"🇺🇸 Anglais",desc:"Dans les coulisses des Chicago Bulls de Michael Jordan lors de la mythique saison 1997-98.",poster:`${T}/pBRBR8opcFZTxfZ6SREiPAGHHjV.jpg`,backdrop:`${TW}/dM3nKPLePALWlzIGzxDuDoNc2S0.jpg`,cats:["documentaires","primes"],featured:false},
];

const FC=[
  {id:"all",l:"Tout"},{id:"tendances",l:"🔥 Tendances"},{id:"nouveautes",l:"✨ Nouveautés"},
  {id:"series",l:"📺 Séries"},{id:"films",l:"🎬 Films"},{id:"action",l:"💥 Action"},
  {id:"thriller",l:"😱 Thriller"},{id:"scifi",l:"🚀 Sci-Fi"},{id:"animation",l:"🎨 Animation"},
  {id:"comedie",l:"😂 Comédie"},{id:"romance",l:"💝 Romance"},
  {id:"documentaires",l:"🌍 Docs"},{id:"francais",l:"🇫🇷 Français"},{id:"primes",l:"🏆 Primés"},
];
const FR=[
  {id:"tendances",l:"🔥 Tendances du moment"},{id:"nouveautes",l:"✨ Dernières nouveautés"},
  {id:"francais",l:"🇫🇷 Contenu français"},{id:"series",l:"📺 Séries populaires"},
  {id:"films",l:"🎬 Grands films"},{id:"action",l:"💥 Action & Aventure"},
  {id:"scifi",l:"🚀 Science-Fiction"},{id:"animation",l:"🎨 Animation"},
  {id:"thriller",l:"😱 Thriller & Suspense"},{id:"comedie",l:"😂 Comédies"},
  {id:"romance",l:"💝 Romance"},{id:"documentaires",l:"🌍 Documentaires"},{id:"primes",l:"🏆 Primés"},
];

// ============================== ANIME CONFIG ==============================
const JIKAN = "https://api.jikan.moe/v4";
const ARC = [
  {id:"top",    l:"🔥 Top Anime Tous Temps",    url:`${JIKAN}/top/anime?limit=20&type=tv`},
  {id:"airing", l:"📡 En cours de diffusion",   url:`${JIKAN}/top/anime?filter=airing&limit=20`},
  {id:"popular",l:"❤️ Les plus populaires",     url:`${JIKAN}/top/anime?filter=bypopularity&limit=20`},
  {id:"action", l:"⚔️ Action & Combat",         url:`${JIKAN}/anime?genres=1&order_by=score&sort=desc&limit=20&min_score=7.5&type=tv`},
  {id:"fantasy",l:"✨ Fantasy & Magie",         url:`${JIKAN}/anime?genres=10&order_by=score&sort=desc&limit=20&min_score=7.5&type=tv`},
  {id:"romance",l:"🌸 Romance",                 url:`${JIKAN}/anime?genres=22&order_by=score&sort=desc&limit=20&min_score=7`},
  {id:"shonen", l:"👊 Shōnen",                  url:`${JIKAN}/anime?genres=27&order_by=score&sort=desc&limit=20&min_score=7.5`},
  {id:"scifi",  l:"🔬 Science-Fiction",         url:`${JIKAN}/anime?genres=24&order_by=score&sort=desc&limit=20&min_score=7.5`},
  {id:"seinen", l:"🎭 Seinen",                  url:`${JIKAN}/anime?genres=42&order_by=score&sort=desc&limit=20&min_score=7.5`},
  {id:"isekai", l:"🌀 Isekai",                  url:`${JIKAN}/anime?genres=62&order_by=score&sort=desc&limit=20&min_score=7`},
  {id:"comedy", l:"😂 Comédie",                 url:`${JIKAN}/anime?genres=4&order_by=score&sort=desc&limit=20&min_score=7.5&type=tv`},
  {id:"horror", l:"👻 Horreur & Mystère",       url:`${JIKAN}/anime?genres=14&order_by=score&sort=desc&limit=20&min_score=7`},
  {id:"mecha",  l:"🤖 Mecha",                   url:`${JIKAN}/anime?genres=18&order_by=score&sort=desc&limit=20&min_score=7`},
  {id:"sports", l:"⚽ Sports",                  url:`${JIKAN}/anime?genres=30&order_by=score&sort=desc&limit=20&min_score=7.5`},
  {id:"slice",  l:"🏡 Tranche de Vie",          url:`${JIKAN}/anime?genres=36&order_by=score&sort=desc&limit=20&min_score=7.5`},
  {id:"movies", l:"🎬 Films d'Animation",       url:`${JIKAN}/top/anime?limit=20&type=movie`},
  {id:"shojos", l:"🎀 Shōjo",                   url:`${JIKAN}/anime?genres=25&order_by=score&sort=desc&limit=20&min_score=7`},
  {id:"award",  l:"🏆 Primés",                  url:`${JIKAN}/top/anime?limit=20`},
];
const AC=[
  {id:"all",l:"Tout"},{id:"top",l:"🔥 Top"},{id:"airing",l:"📡 En cours"},
  {id:"action",l:"⚔️ Action"},{id:"fantasy",l:"✨ Fantasy"},{id:"romance",l:"🌸 Romance"},
  {id:"shonen",l:"👊 Shōnen"},{id:"seinen",l:"🎭 Seinen"},{id:"isekai",l:"🌀 Isekai"},
  {id:"scifi",l:"🔬 Sci-Fi"},{id:"comedy",l:"😂 Comédie"},{id:"horror",l:"👻 Horreur"},
  {id:"mecha",l:"🤖 Mecha"},{id:"sports",l:"⚽ Sports"},{id:"slice",l:"🏡 SoL"},
  {id:"movies",l:"🎬 Films"},{id:"shojos",l:"🎀 Shōjo"},
];

const j2i = (a) => ({
  id:`anime_${a.mal_id}`, malId:a.mal_id, isAnime:true,
  type: a.type==="Movie"?"Film":"Série",
  title: a.title_english||a.title,
  titleJP: a.title_japanese||"",
  year: a.year||(a.aired?.from?new Date(a.aired.from).getFullYear():""),
  info: a.type==="Movie"?(a.duration||"Film"):`${a.episodes||"?"} ép.`,
  rating: a.score||0,
  platform:"CRUNCHYROLL",
  genres:(a.genres||[]).map(g=>g.name).slice(0,4),
  lang:"🇯🇵 Japonais (VOSTFR/VF)",
  desc:(a.synopsis||"Synopsis non disponible.").replace(/\[Written by MAL Rewrite\]/g,"").trim(),
  poster:a.images?.jpg?.large_image_url||a.images?.jpg?.image_url||"",
  backdrop:a.images?.jpg?.large_image_url||a.images?.jpg?.image_url||"",
  status:a.status||"", rank:a.rank, popularity:a.popularity, members:a.members,
  trailerEmbed: a.trailer?.embed_url ? a.trailer.embed_url.replace("autoplay=1","autoplay=0") : null,
});

// ============================== COMPONENTS ==============================
function PImg({src,alt,id,isAnime,style}){
  const [e,setE]=useState(false);
  if(e||!src) return <div style={{...style,background:isAnime?"linear-gradient(135deg,#1a0528,#380a50,#1a0a30)":gfb(id),display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:4,padding:8}}>
    {isAnime&&<span style={{fontSize:26}}>⛩️</span>}
    <span style={{color:"rgba(255,255,255,.4)",fontSize:10,fontFamily:"'DM Sans',sans-serif",textAlign:"center",lineHeight:1.4}}>{alt}</span>
  </div>;
  return <img src={src} alt={alt} style={style} onError={()=>setE(true)} loading="lazy"/>;
}

function Card({item,onSelect,accent="#d4a017"}){
  const [hov,setHov]=useState(false);
  const pl=PLATS[item.platform]||PLATS.NETFLIX;
  return (
    <div className="card-wrap" style={{flexShrink:0,width:152,cursor:"pointer"}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onSelect(item)}>
      <div style={{borderRadius:9,overflow:"hidden",aspectRatio:"2/3",position:"relative",background:"#0e0e1a"}}>
        <PImg src={item.poster} alt={item.title} id={item.id} isAnime={item.isAnime} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(7,7,15,.96) 0%,rgba(7,7,15,.3) 50%,transparent 100%)",opacity:hov?1:0,transition:"opacity .25s",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:9}}>
          <div style={{color:"#f0f0ff",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600,marginBottom:5,lineHeight:1.3}}>{item.title}</div>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:6}}>
            {item.rating>0&&<><Star size={9} fill={accent} color={accent}/><span style={{color:accent,fontSize:10,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{item.rating.toFixed(1)}</span></>}
            <span style={{color:"#6060a0",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>{item.year}</span>
          </div>
          <div style={{display:"flex",gap:5}}>
            <div style={{background:accent,borderRadius:4,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center"}}><Play size={10} fill="#07070f" color="#07070f"/></div>
            <div style={{background:"rgba(255,255,255,.14)",borderRadius:4,width:24,height:24,display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid rgba(255,255,255,.2)"}}><Plus size={10} color="#f0f0ff"/></div>
          </div>
        </div>
        <div style={{position:"absolute",top:7,right:7,background:pl.color,borderRadius:3,padding:"1px 5px",fontSize:9,fontWeight:700,fontFamily:"'DM Sans',sans-serif",color:"#fff"}}>{pl.label}</div>
        {item.status==="Currently Airing"&&<div style={{position:"absolute",top:7,left:7,background:"#16a34a",borderRadius:3,padding:"1px 5px",fontSize:8,fontWeight:700,fontFamily:"'DM Sans',sans-serif",color:"#fff",display:"flex",alignItems:"center",gap:2}}><span style={{width:4,height:4,borderRadius:"50%",background:"#fff",animation:"pulse2 1.4s infinite"}}/>EN COURS</div>}
      </div>
      <div style={{marginTop:6,padding:"0 2px"}}>
        <div style={{color:"#d8d8f0",fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:500,lineHeight:1.3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{item.title}{item.titleJP&&<span style={{color:"#4040a0",fontSize:9,fontFamily:"serif",marginLeft:3}}>{item.titleJP}</span>}</div>
        <div style={{color:"#4040a0",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{item.type} · {item.year}</div>
      </div>
    </div>
  );
}

function SkCard(){return(
  <div style={{flexShrink:0,width:152}}>
    <div className="skeleton" style={{borderRadius:9,aspectRatio:"2/3",width:"100%"}}/>
    <div className="skeleton" style={{height:10,borderRadius:4,marginTop:7,width:"80%"}}/>
    <div className="skeleton" style={{height:9,borderRadius:4,marginTop:4,width:"50%"}}/>
  </div>
);}

function Row({label,items,loading,onSelect,accent="#d4a017"}){
  const ref=useRef(null);
  const sc=(d)=>{if(ref.current)ref.current.scrollBy({left:d*520,behavior:"smooth"});};
  return(
    <div style={{marginBottom:34,animation:"rowIn .4s ease"}} className="row-wrap">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,padding:"0 26px"}}>
        <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:600,color:"#f0f0ff"}}>{label}</h2>
        {loading?<Loader size={13} style={{color:"#4040a0",animation:"spin 1s linear infinite"}}/>:<span style={{color:accent,fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>Tout voir<ChevronRight size={12}/></span>}
      </div>
      <div style={{position:"relative"}}>
        {!loading&&items.length>5&&<>
          <button className="arrow-btn" style={{left:6,position:"absolute",top:"38%",transform:"translateY(-50%)",background:"rgba(7,7,15,.92)",border:"1px solid rgba(255,255,255,.14)",color:"#f0f0ff",width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:5}} onClick={()=>sc(-1)}><ChevronLeft size={16}/></button>
          <button className="arrow-btn" style={{right:6,position:"absolute",top:"38%",transform:"translateY(-50%)",background:"rgba(7,7,15,.92)",border:"1px solid rgba(255,255,255,.14)",color:"#f0f0ff",width:32,height:32,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:5}} onClick={()=>sc(1)}><ChevronRight size={16}/></button>
        </>}
        <div ref={ref} className="noscroll" style={{display:"flex",gap:9,overflowX:"auto",padding:"6px 26px 12px"}}>
          {loading?Array.from({length:8}).map((_,i)=><SkCard key={i}/>):items.map(it=><Card key={it.id} item={it} onSelect={onSelect} accent={accent}/>)}
        </div>
      </div>
    </div>
  );
}

function Hero({items,onSelect,accent="#d4a017"}){
  const [idx,setIdx]=useState(0);
  const [ie,setIe]=useState(false);
  const item=items[idx]||items[0];
  useEffect(()=>{setIe(false);},[idx]);
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%Math.min(items.length,5)),7000);return()=>clearInterval(t);},[items.length]);
  if(!item)return null;
  const pl=PLATS[item.platform]||PLATS.NETFLIX;
  const ia=item.isAnime;
  return(
    <div style={{position:"relative",height:490,overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0}}>
        {(ie||!item.backdrop)?<div style={{width:"100%",height:"100%",background:ia?"linear-gradient(135deg,#1a0528,#380a50,#0d0d20)":gfb(item.id)}}/>
          :<img src={item.backdrop} alt="" style={{width:"100%",height:"100%",objectFit:"cover",animation:"kbzoom 8s ease forwards"}} onError={()=>setIe(true)}/>}
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(7,7,15,.97) 0%,rgba(7,7,15,.65) 55%,rgba(7,7,15,.12) 100%)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:160,background:"linear-gradient(to top,#07070f,transparent)"}}/>
      </div>
      <div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",justifyContent:"flex-end",height:"100%",padding:"0 42px 40px"}}>
        <div style={{animation:"fadeUp .5s ease"}} key={item.id}>
          <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:9}}>
            <span style={{background:pl.color+"22",color:pl.color,border:`1px solid ${pl.color}45`,padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{pl.label}</span>
            <span style={{color:accent,fontSize:11,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{item.type?.toUpperCase()}</span>
            {ia&&item.status==="Currently Airing"&&<span style={{background:"#16a34a22",color:"#22c55e",border:"1px solid #22c55e44",padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>● EN COURS</span>}
          </div>
          <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:50,fontWeight:700,color:"#f0f0ff",lineHeight:1.05,marginBottom:5}}>{item.title}</h1>
          {item.titleJP&&<p style={{fontFamily:"serif",fontSize:15,color:"#7070b0",marginBottom:10,fontStyle:"italic"}}>{item.titleJP}</p>}
          <div style={{display:"flex",alignItems:"center",gap:13,marginBottom:13}}>
            {item.rating>0&&<span style={{display:"flex",alignItems:"center",gap:4,color:accent,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14}}><Star size={13} fill={accent}/> {item.rating.toFixed(1)}/10</span>}
            <span style={{color:"#8080c0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{item.year}</span>
            <span style={{color:"#8080c0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{item.info}</span>
            <span style={{color:"#8080c0",fontSize:13,fontFamily:"'DM Sans',sans-serif"}}>{item.lang}</span>
          </div>
          <p style={{color:"#b0b0d0",fontSize:14,fontFamily:"'DM Sans',sans-serif",lineHeight:1.7,maxWidth:490,marginBottom:20}}>{item.desc?.slice(0,200)}{item.desc?.length>200?"…":""}</p>
          <div style={{display:"flex",gap:9}}>
            <a href={getPlatformUrl(item)} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
              <button className={ia?"btn-pink":"btn-gold"}><Play size={14} fill="currentColor"/> Regarder sur {PLATS[item.platform]?.label||"la plateforme"}</button>
            </a>
            <button className="btn-ghost" onClick={()=>onSelect(item)}><Info size={14}/> Détails</button>
            <div className="icon-btn" style={{width:40,height:40}}><Plus size={16}/></div>
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginTop:20}}>
          {Array.from({length:Math.min(items.length,5)}).map((_,i)=>(
            <div key={i} onClick={()=>setIdx(i)} style={{width:i===idx?20:6,height:6,borderRadius:4,background:i===idx?accent:"rgba(255,255,255,.22)",cursor:"pointer",transition:"all .3s"}}/>
          ))}
        </div>
      </div>
    </div>
  );
}

function Grid({items,onSelect,title,loading,accent="#d4a017"}){
  return(
    <div style={{padding:"22px 26px"}}>
      <h2 style={{fontFamily:"'DM Sans',sans-serif",fontSize:19,fontWeight:600,color:"#f0f0ff",marginBottom:20}}>{title}</h2>
      {loading&&<div style={{display:"flex",justifyContent:"center",padding:"50px 0"}}><Loader size={28} style={{color:accent,animation:"spin 1s linear infinite"}}/></div>}
      {!loading&&items.length===0&&<div style={{textAlign:"center",color:"#4040a0",fontFamily:"'DM Sans',sans-serif",padding:"50px 0"}}>Aucun résultat trouvé 🔍</div>}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",gap:"17px 9px"}}>
        {items.map(it=><Card key={it.id} item={it} onSelect={onSelect} accent={accent}/>)}
      </div>
    </div>
  );
}

// ============================== ANIME SECTION ==============================
function AnimeSection({search,activeCat,onSelect}){
  const [rows,setRows]=useState({});
  const [loading,setLoading]=useState(new Set(ARC.map(r=>r.id)));
  const [srRes,setSrRes]=useState([]);
  const [srLoad,setSrLoad]=useState(false);
  const [err,setErr]=useState(null);

  useEffect(()=>{
    if(search||activeCat!=="all") return;
    let cancelled=false;
    const fetch_=async()=>{
      for(const r of ARC){
        if(cancelled) break;
        try{
          const res=await fetch(r.url);
          if(!res.ok) throw new Error();
          const d=await res.json();
          if(!cancelled){
            setRows(prev=>({...prev,[r.id]:(d.data||[]).map(j2i)}));
            setLoading(prev=>{const s=new Set(prev);s.delete(r.id);return s;});
          }
        }catch(e){
          if(!cancelled){
            setLoading(prev=>{const s=new Set(prev);s.delete(r.id);return s;});
            setErr("Certaines catégories sont limitées par l'API Jikan. Patientez quelques secondes.");
          }
        }
        if(!cancelled) await new Promise(r=>setTimeout(r,450));
      }
    };
    fetch_();
    return()=>{cancelled=true;};
  },[]);

  useEffect(()=>{
    if(!search){setSrRes([]);return;}
    let cancelled=false;
    const t=setTimeout(async()=>{
      setSrLoad(true);
      try{
        const res=await fetch(`${JIKAN}/anime?q=${encodeURIComponent(search)}&limit=24&order_by=score&sort=desc`);
        const d=await res.json();
        if(!cancelled) setSrRes((d.data||[]).map(j2i));
      }catch(e){}
      if(!cancelled) setSrLoad(false);
    },600);
    return()=>{cancelled=true;clearTimeout(t);};
  },[search]);

  if(search) return <Grid items={srRes} onSelect={onSelect} title={`Anime · « ${search} »`} loading={srLoad} accent="#e84393"/>;

  if(activeCat!=="all"){
    const rc=ARC.find(r=>r.id===activeCat);
    return <Grid items={rows[activeCat]||[]} onSelect={onSelect} title={rc?.l||activeCat} loading={loading.has(activeCat)} accent="#e84393"/>;
  }

  const featured=rows["top"]?.slice(0,5)||[];
  return(
    <div>
      {featured.length>0?<Hero items={featured} onSelect={onSelect} accent="#e84393"/>:(
        <div style={{height:180,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:10}}>
          <Loader size={30} style={{color:"#e84393",animation:"spin 1s linear infinite"}}/>
          <p style={{color:"#7070a0",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>Chargement des animes depuis MyAnimeList…</p>
        </div>
      )}
      {err&&<div style={{margin:"10px 26px",padding:"10px 14px",background:"rgba(232,67,147,.08)",border:"1px solid rgba(232,67,147,.2)",borderRadius:8,display:"flex",alignItems:"center",gap:9}}>
        <AlertCircle size={15} color="#e84393"/>
        <span style={{color:"#b060a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{err}</span>
      </div>}
      <div style={{paddingTop:14}}>
        {ARC.map(r=>(
          <Row key={r.id} label={r.l} items={rows[r.id]||[]} loading={loading.has(r.id)} onSelect={onSelect} accent="#e84393"/>
        ))}
      </div>
      <div style={{padding:"6px 26px 0",display:"flex",alignItems:"center",gap:5}}>
        <span style={{color:"#222248",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>Données:</span>
        <a href="https://jikan.moe" target="_blank" rel="noopener noreferrer" style={{color:"#3a3a80",fontSize:10,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:2,textDecoration:"none"}}>Jikan API (MyAnimeList)<ExternalLink size={9}/></a>
      </div>
    </div>
  );
}

// ============================== FILMS SECTION ==============================
function FilmsSection({search,activeCat,onSelect}){
  const filt=FI.filter(it=>{
    const q=search.toLowerCase();
    const m=!search||it.title.toLowerCase().includes(q)||it.genres.some(g=>g.toLowerCase().includes(q))||it.type.toLowerCase().includes(q);
    return activeCat==="all"?m:m&&it.cats.includes(activeCat);
  });
  const ri=(c)=>FI.filter(i=>i.cats.includes(c));
  const feat=FI.filter(i=>i.featured);
  const isF=search||activeCat!=="all";
  return(
    <div>
      {!isF&&<Hero items={feat} onSelect={onSelect} accent="#d4a017"/>}
      {isF?<Grid items={filt} onSelect={onSelect} title={search?`Résultats · « ${search} »`:FC.find(c=>c.id===activeCat)?.l} accent="#d4a017"/>:
        <div style={{paddingTop:14}}>
          {FR.map(r=>{const it=ri(r.id);return it.length>0&&<Row key={r.id} label={r.l} items={it} loading={false} onSelect={onSelect} accent="#d4a017"/>;})
          }
        </div>
      }
    </div>
  );
}

// ============================== MODAL ==============================
function Modal({item,onClose,accent}){
  const [ie,setIe]=useState(false);
  const [showTrailer,setShowTrailer]=useState(false);
  const pl=PLATS[item.platform]||PLATS.NETFLIX;
  const ia=item.isAnime;
  const c=accent||(ia?"#e84393":"#d4a017");
  const trailerEmbed=getTrailerEmbed(item);
  const watchUrl=getPlatformUrl(item);

  return(
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        {/* Header backdrop ou lecteur trailer */}
        <div style={{position:"relative",borderRadius:"16px 16px 0 0",overflow:"hidden",background:"#000"}}>
          {showTrailer && trailerEmbed
            ? <div style={{position:"relative",paddingBottom:"56.25%",height:0}}>
                <iframe
                  src={trailerEmbed+"&autoplay=1"}
                  style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`Trailer ${item.title}`}
                />
              </div>
            : <div style={{height:240,position:"relative"}}>
                {(ie||!item.backdrop)
                  ?<div style={{width:"100%",height:"100%",background:ia?"linear-gradient(135deg,#1a0528,#380a50,#0d0d20)":gfb(item.id)}}/>
                  :<img src={item.backdrop} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} onError={()=>setIe(true)}/>}
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,#0d0d1c 0%,rgba(13,13,28,.15) 60%,transparent 100%)"}}/>
                {/* Bouton play trailer sur le backdrop */}
                {trailerEmbed&&<button onClick={()=>setShowTrailer(true)} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",background:"rgba(0,0,0,.7)",border:`2px solid ${c}`,color:c,width:60,height:60,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",backdropFilter:"blur(8px)",transition:"all .2s"}} title="Voir la bande-annonce">
                  <Play size={24} fill={c}/>
                </button>}
                <div style={{position:"absolute",bottom:14,left:20}}><span style={{background:pl.color+"25",color:pl.color,border:`1px solid ${pl.color}45`,padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{pl.label}</span></div>
                {trailerEmbed&&<div style={{position:"absolute",bottom:14,right:20,color:"rgba(255,255,255,.5)",fontSize:11,fontFamily:"'DM Sans',sans-serif"}}>▶ Cliquer pour la bande-annonce</div>}
              </div>
          }
          <button onClick={()=>{setShowTrailer(false);onClose();}} style={{position:"absolute",top:10,right:10,background:"rgba(13,13,28,.85)",border:"1px solid rgba(255,255,255,.2)",color:"#f0f0ff",width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:10}}><X size={15}/></button>
          {showTrailer&&<button onClick={()=>setShowTrailer(false)} style={{position:"absolute",top:10,left:10,background:"rgba(13,13,28,.85)",border:"1px solid rgba(255,255,255,.2)",color:"#f0f0ff",padding:"3px 10px",borderRadius:6,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",zIndex:10}}>← Retour</button>}
        </div>

        <div style={{padding:"0 24px 24px"}}>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:34,fontWeight:700,color:"#f0f0ff",marginBottom:3,lineHeight:1.1,marginTop:16}}>{item.title}</h2>
          {item.titleJP&&<p style={{fontFamily:"serif",fontSize:13,color:"#6060a0",marginBottom:9,fontStyle:"italic"}}>{item.titleJP}</p>}
          <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:11,marginBottom:12}}>
            {item.rating>0&&<span style={{display:"flex",alignItems:"center",gap:4,color:c,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:14}}><Star size={13} fill={c}/> {item.rating.toFixed(2)}/10</span>}
            <span style={{color:"#6060a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{item.year}</span>
            <span style={{color:"#6060a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{item.info}</span>
            <span style={{color:"#6060a0",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>{item.lang}</span>
            {item.status&&<span style={{color:"#22c55e",fontSize:11,fontFamily:"'DM Sans',sans-serif",background:"rgba(34,197,94,.1)",border:"1px solid rgba(34,197,94,.22)",padding:"1px 6px",borderRadius:10}}>{item.status}</span>}
            {item.rank&&<span style={{color:c,fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Rang #{item.rank}</span>}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
            {item.genres.map(g=><span key={g} className={ia?"genre-tag-pink":"genre-tag"}>{g}</span>)}
          </div>
          <p style={{color:"#b0b0cc",fontSize:14,fontFamily:"'DM Sans',sans-serif",lineHeight:1.8,marginBottom:20}}>{item.desc}</p>
          {ia&&item.members&&(
            <div style={{display:"flex",gap:14,marginBottom:18,padding:"11px 14px",background:"rgba(232,67,147,.05)",borderRadius:9,border:"1px solid rgba(232,67,147,.1)"}}>
              {[["Score",item.rating.toFixed(2)],[item.rank?"Rang":"","#"+(item.rank||"")],[item.popularity?"Popularité":"","#"+(item.popularity||"")],[item.members?"Membres":"",(item.members/1000).toFixed(0)+"k"]].filter(x=>x[0]).map(([k,v])=>(
                <div key={k} style={{textAlign:"center"}}>
                  <div style={{color:k==="Score"?c:"#f0f0ff",fontSize:17,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>{v}</div>
                  <div style={{color:"#4040a0",fontSize:10,fontFamily:"'DM Sans',sans-serif"}}>{k}</div>
                </div>
              ))}
            </div>
          )}

          {/* Boutons principaux */}
          <div style={{display:"flex",gap:9,marginBottom:10,flexWrap:"wrap"}}>
            {/* Bouton regarder → ouvre la plateforme */}
            <a href={watchUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",flex:1,minWidth:180}}>
              <button className={ia?"btn-pink":"btn-gold"} style={{width:"100%",justifyContent:"center"}}>
                <Play size={14} fill="currentColor"/>
                Regarder sur {pl.label}
                <ExternalLink size={12}/>
              </button>
            </a>
            {/* Bouton bande-annonce */}
            {trailerEmbed&&<button className="btn-ghost" onClick={()=>setShowTrailer(true)} style={{whiteSpace:"nowrap"}}>
              🎬 Bande-annonce
            </button>}
          </div>
          <div style={{display:"flex",gap:9}}>
            {ia&&<a href={`https://myanimelist.net/anime/${item.malId}`} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}><button className="btn-ghost"><ExternalLink size={13}/> MAL</button></a>}
            <div className="icon-btn" style={{width:42,height:42}}><Plus size={16}/></div>
            <div className="icon-btn" style={{width:42,height:42}}><Heart size={16}/></div>
          </div>
          <p style={{color:"#202040",fontSize:10.5,fontFamily:"'DM Sans',sans-serif",marginTop:13,lineHeight:1.6}}>
            {ia
              ? `Le bouton "Regarder" ouvre Crunchyroll — connecte-toi avec ton compte premium pour regarder les épisodes complets.`
              : `Le bouton "Regarder" ouvre ${PLATS[item.platform]?.label||"la plateforme"} — abonnement requis pour visionner.`}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================== NAVBAR ==============================
function NavBar({mode,setMode,search,setSearch,cat,setCat}){
  const [sc,setSc]=useState(false);
  const cats=mode==="anime"?AC:FC;
  const acc=mode==="anime"?"#e84393":"#d4a017";
  useEffect(()=>{
    const el=document.getElementById("cs-root");
    if(!el)return;
    const fn=()=>setSc(el.scrollTop>50);
    el.addEventListener("scroll",fn);
    return()=>el.removeEventListener("scroll",fn);
  },[]);
  const sw=(m)=>{setMode(m);setSearch("");setCat("all");};
  return(
    <div style={{position:"sticky",top:0,zIndex:100,background:sc?"rgba(7,7,15,.97)":"linear-gradient(to bottom,rgba(7,7,15,.96),transparent)",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?"1px solid rgba(255,255,255,.06)":"none",transition:"all .3s",padding:"0 26px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
        <div style={{display:"flex",alignItems:"center",gap:18}}>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"#d4a017",letterSpacing:2,lineHeight:1}}>CINÉ<span style={{color:"#f0f0ff"}}>STREAM</span></div>
          <div style={{display:"flex",gap:5}}>
            <button className={`mode-btn${mode==="films"?" mf":""}`} onClick={()=>sw("films")}><Film size={13}/>Films & Séries</button>
            <button className={`mode-btn${mode==="anime"?" ma":""}`} onClick={()=>sw("anime")}><span style={{fontSize:13}}>⛩️</span>Anime</button>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:9}}>
          <div style={{position:"relative"}}>
            <Search size={13} style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:"#5050a0",pointerEvents:"none"}}/>
            <input className="search-box" placeholder={mode==="anime"?"Titre, genre, studio…":"Titre, genre…"} value={search}
              onChange={e=>{setSearch(e.target.value);if(e.target.value)setCat("all");}}
              style={{borderColor:search?acc+"80":undefined}}/>
          </div>
          <div className="icon-btn"><Bell size={14}/></div>
          <div className="icon-btn" style={{background:`linear-gradient(135deg,${acc},${acc}88)`,border:"none"}}><User size={14} style={{color:"#fff"}}/></div>
        </div>
      </div>
      <div style={{display:"flex",gap:5,paddingBottom:9,overflowX:"auto"}} className="noscroll">
        {cats.map(c=>(
          <button key={c.id} className={`tab-pill${cat===c.id?(mode==="anime"?" on-pink":" on-gold"):""}`}
            onClick={()=>{setCat(c.id);setSearch("");}}>
            {c.l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================== FOOTER ==============================
function Footer({mode}){
  const links=mode==="anime"
    ?[{n:"Crunchyroll",d:"Streaming anime légal #1",u:"https://crunchyroll.com",c:"#F47521"},{n:"ADN",d:"Plateforme française d'anime",u:"https://animedigitalnetwork.fr",c:"#00B4E4"},{n:"Wakanim",d:"Simulcasts VOSTFR/VF",u:"https://wakanim.tv",c:"#00D4AA"},{n:"Netflix Anime",d:"Originaux Netflix animés",u:"https://netflix.com",c:"#E50914"}]
    :[{n:"Arte.tv",d:"Films, docs, séries",u:"https://arte.tv",c:"#E96100"},{n:"France.tv",d:"Replay chaînes françaises",u:"https://france.tv",c:"#0066CC"},{n:"Tubi TV",d:"Films/séries gratuits",u:"https://tubi.tv",c:"#FA4616"},{n:"Plex",d:"Films gratuits avec pub",u:"https://plex.tv",c:"#E5A00D"}];
  return(
    <div style={{background:"#04040c",borderTop:"1px solid rgba(255,255,255,.05)",padding:"28px 40px",marginTop:16}}>
      <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,color:"#d4a017",letterSpacing:2,marginBottom:5}}>CINÉ<span style={{color:"#f0f0ff"}}>STREAM</span></div>
      <p style={{color:"#2e2e58",fontSize:11,fontFamily:"'DM Sans',sans-serif",marginBottom:14}}>
        {mode==="anime"?"Regarder légalement :":"Sources légales gratuites :"}
      </p>
      <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
        {links.map(f=>(
          <a key={f.n} href={f.u} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.06)",borderRadius:8,padding:"9px 14px",minWidth:150}}>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:12,color:f.c}}>{f.n}</div>
            <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10,color:"#2e2e58",marginTop:2}}>{f.d}</div>
          </a>
        ))}
      </div>
      <p style={{color:"#151530",fontSize:10,fontFamily:"'DM Sans',sans-serif",marginTop:16}}>CinéStream · Usage personnel · TMDB + Jikan API (MyAnimeList) · Aucun contenu hébergé</p>
    </div>
  );
}

// ============================== APP ==============================
export default function App(){
  const [mode,setMode]=useState("films");
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("all");
  const [sel,setSel]=useState(null);
  return(
    <div style={{background:"#07070f",minHeight:"100vh",overflowY:"auto"}} id="cs-root">
      <NavBar mode={mode} setMode={setMode} search={search} setSearch={setSearch} cat={cat} setCat={setCat}/>
      {mode==="films"
        ?<FilmsSection search={search} activeCat={cat} onSelect={setSel}/>
        :<AnimeSection search={search} activeCat={cat} onSelect={setSel}/>
      }
      <Footer mode={mode}/>
      {sel&&<Modal item={sel} onClose={()=>setSel(null)} accent={sel.isAnime?"#e84393":"#d4a017"}/>}
    </div>
  );
}
