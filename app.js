const cards=[
[1,"RIDER","騎士","🐎","到来・知らせ・動き"],[2,"CLOVER","クローバー","🍀","幸運・チャンス・偶然"],[3,"SHIP","船","🚢","移動・旅・距離"],[4,"HOUSE","家","🏠","家庭・安心・基盤"],[5,"TREE","木","🌳","成長・健康・時間"],[6,"CLOUDS","雲","☁️","混乱・不透明・迷い"],[7,"SNAKE","蛇","🐍","複雑・迂回・誘惑"],[8,"COFFIN","棺","⚰️","終了・停止・区切り"],[9,"BOUQUET","花束","💐","喜び・好意・贈り物"],
[10,"SCYTHE","鎌","🌾","決断・切断・突然"],[11,"WHIP","鞭","〰️","反復・衝突・議論"],[12,"BIRDS","鳥","🐦","会話・緊張・噂"],[13,"CHILD","子ども","👶","始まり・小ささ・純粋"],[14,"FOX","狐","🦊","注意・策略・仕事"],[15,"BEAR","熊","🐻","力・保護・権威"],[16,"STARS","星","⭐","希望・導き・明晰"],[17,"STORK","コウノトリ","🪽","変化・改善・移動"],[18,"DOG","犬","🐕","友情・信頼・忠誠"],
[19,"TOWER","塔","🏛️","距離・孤立・組織"],[20,"GARDEN","庭園","🌷","社交・公の場・交流"],[21,"MOUNTAIN","山","⛰️","障害・停滞・壁"],[22,"CROSSROADS","道","🛤️","選択・分岐・複数"],[23,"MICE","ネズミ","🐭","消耗・減少・心配"],[24,"HEART","ハート","❤️","愛情・好意・喜び"],[25,"RING","指輪","💍","約束・契約・結びつき"],[26,"BOOK","本","📕","秘密・知識・未知"],[27,"LETTER","手紙","✉️","連絡・文書・メッセージ"],
[28,"GENTLEMAN","紳士","👨","男性・重要人物"],[29,"LADY","淑女","👩","女性・重要人物"],[30,"LILY","百合","⚜️","成熟・平和・官能"],[31,"SUN","太陽","☀️","成功・幸福・活力"],[32,"MOON","月","🌙","感情・評価・直感"],[33,"KEY","鍵","🔑","確信・解決・重要"],[34,"FISH","魚","🐟","豊かさ・お金・流れ"],[35,"ANCHOR","錨","⚓","安定・継続・仕事"],[36,"CROSS","十字架","✝️","重荷・試練・運命"]
].map(([n,en,jp,icon,key])=>({n,en,jp,icon,key}));

let count=1,mode="virtual",selected=[];

function showScreen(id){document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));document.getElementById(id).classList.add("active");window.scrollTo(0,0)}
function startReading(n){count=n;selected=[];document.getElementById("setupTitle").textContent=n===1?"1 CARD":"3 CARDS";buildPhysical();showScreen("setup")}
function setMode(m){mode=m;document.getElementById("virtualBtn").classList.toggle("selected",m==="virtual");document.getElementById("physicalBtn").classList.toggle("selected",m==="physical");document.getElementById("virtualArea").classList.toggle("hidden",m!=="virtual");document.getElementById("physicalArea").classList.toggle("hidden",m!=="physical")}
function buildPhysical(){const wrap=document.getElementById("physicalSelects");wrap.innerHTML="";for(let i=0;i<count;i++){const s=document.createElement("select");s.className="physical-select";s.innerHTML=`<option value="">CARD ${i+1} を選択</option>`+cards.map(c=>`<option value="${c.n}">${c.n}. ${c.jp} / ${c.en}</option>`).join("");wrap.appendChild(s)}}
function drawVirtual(){const pool=[...cards];selected=[];for(let i=0;i<count;i++){const j=Math.floor(Math.random()*pool.length);selected.push(pool.splice(j,1)[0])}renderResult()}
function submitPhysical(){const vals=[...document.querySelectorAll(".physical-select")].map(s=>Number(s.value));if(vals.some(v=>!v)){alert("すべてのカードを選んでください🐚");return}if(new Set(vals).size!==vals.length){alert("同じカードが重複しています🐚");return}selected=vals.map(v=>cards.find(c=>c.n===v));renderResult()}
function cardHTML(c){return `<div class="card"><div class="num">${c.n}</div><div class="icon">${c.icon}</div><div class="en">${c.en}</div><div class="jp">${c.jp}</div><div class="key">${c.key}</div></div>`}
function renderResult(){const q=document.getElementById("question").value.trim()||"質問なし";document.getElementById("resultQuestion").textContent=q;const area=document.getElementById("resultCards");area.className="cards "+(count===3?"three":"");area.innerHTML=selected.map(cardHTML).join("");document.getElementById("comboNames").textContent=selected.map(c=>c.en).join(" × ");document.getElementById("comboHint").textContent=count===1?"カード単体の象徴を、質問との関係から読んでみましょう。":"左から右への流れ、中央カード、隣接するカード同士の作用にも注目します。";document.getElementById("copyStatus").textContent="";showScreen("result")}
function makePrompt(){const q=document.getElementById("question").value.trim()||"質問なし";return `ルノルマンWebアプリ「36」でカードを引きました。

【質問】
${q}

【引き方】
${mode==="virtual"?"VIRTUAL（アプリで抽選）":"PHYSICAL（実物のカードを入力）"}

【出たカード】
${selected.map((c,i)=>`CARD ${i+1}: ${c.n}. ${c.en}（${c.jp}）\n基本キーワード：${c.key}`).join("\n\n")}

この結果を、ルノルマンカードの一般的な象徴と私の質問を踏まえて詳しく解釈してください。

カード単体の意味を並べるだけではなく、カードの並び順、隣接するカード同士の作用、3枚の場合は中央カードの役割も踏まえて、全体をひとつの流れとして読んでください。

質問に書かれていない事情をカードが示していないのに補完しすぎず、人物カードやネガティブな象徴を特定の人物・浮気・嘘などに短絡的に固定しないでください。

未来や他者の気持ちを事実として断定するのではなく、カードから考えられる可能性やニュアンスとして読んでください。

質問と同じ言語で回答してください。`}

async function copyPrompt(){const text=makePrompt();try{await navigator.clipboard.writeText(text);document.getElementById("copyStatus").textContent="コピーしました 🫧"}catch(e){const t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();document.getElementById("copyStatus").textContent="コピーしました 🫧"}}
function newReading(){document.getElementById("question").value="";selected=[];showScreen("home")}
function showLibrary(){const grid=document.getElementById("libraryGrid");grid.innerHTML=cards.map(c=>`<div class="lib-card"><div>${c.n}</div><div class="icon">${c.icon}</div><div class="name">${c.en}</div><div class="jp">${c.jp}</div><div class="key">${c.key}</div></div>`).join("");showScreen("library")}
