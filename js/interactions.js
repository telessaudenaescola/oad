/* =====================================================
   OAD Telessaúde — Sprint 3 · Interações M1–M4
   M1: Drag-and-Drop Classificação NOVA/TBCA
   M2: Simulador de Prato + Calculadora VET/TMB (Mifflin-St Jeor)
   M3: Protocolo Interativo de Higiene do Sono + Ritmo Circadiano
   M4: Árvore de Decisão — Fome Emocional × Fisiológica
   ===================================================== */

/* ---------- Dispatcher ---------- */
window.renderInteraction = function(mid){
  if(mid==='m1') return renderNovaGame();
  if(mid==='m2') return renderPlateSim();
  if(mid==='m3') return renderSleepProtocol();
  if(mid==='m4') return renderFomeBranching();
  return '';
};

/* =====================================================
   M1 — DETETIVE DE RÓTULOS · Drag-and-Drop NOVA
   ===================================================== */
const NOVA_FOODS = [
  {name:"🍚 Arroz integral", cat:0},{name:"🫘 Feijão carioca", cat:0},{name:"🥬 Alface", cat:0},
  {name:"🧂 Sal iodado", cat:1},{name:"🫒 Azeite de oliva", cat:1},{name:"🍬 Açúcar", cat:1},
  {name:"🧀 Queijo artesanal", cat:2},{name:"🥖 Pão de ferm. natural", cat:2},{name:"🥒 Conserva de pepino", cat:2},
  {name:"🥤 Refrigerante", cat:3},{name:"🍜 Macarrão instantâneo", cat:3},{name:"🌭 Salsicha", cat:3}
];
const NOVA_CATS = [
  {name:"In Natura / Min. Processados", color:"#10b981"},
  {name:"Ingredientes Culinários", color:"#fbbf24"},
  {name:"Processados", color:"#fb923c"},
  {name:"Ultraprocessados", color:"#ef4444"}
];
let novaSelected = null, novaScore = 0, novaDone = 0;

function renderNovaGame(){
  novaSelected=null; novaScore=0; novaDone=0;
  const shuffled=[...NOVA_FOODS].sort(()=>Math.random()-.5);
  return `
  <div class="simulator">
    <h4>🕵️ Interação · Classifique pelo grau de processamento (NOVA/TBCA)</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">
      <strong>Toque/arraste</strong> cada alimento para a categoria correta. Acertar: +5 XP · Errar: o alimento volta. Complete os 12!
    </p>
    <div class="nova-tray" id="novaTray">
      ${shuffled.map((f,i)=>`<div class="nova-food" draggable="true" data-cat="${f.cat}" id="nf${i}">${f.name}</div>`).join('')}
    </div>
    <div class="nova-zones">
      ${NOVA_CATS.map((c,i)=>`
        <div class="nova-zone" data-cat="${i}" style="border-color:${c.color}">
          <div class="nova-zone-title" style="color:${c.color}">${c.name}</div>
          <div class="nova-drop" data-cat="${i}"></div>
        </div>`).join('')}
    </div>
    <div class="sim-result" id="novaResult"><strong>Placar:</strong> 0/12 classificados</div>
  </div>`;
}

window.novaInit = function(){
  const tray=$('#novaTray'); if(!tray) return;
  // Seleção por toque/clique (mobile-friendly)
  $$('.nova-food').forEach(el=>{
    el.addEventListener('click',()=>{
      if(el.classList.contains('placed'))return;
      $$('.nova-food').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
      novaSelected=el;
      toast('Agora toque na categoria correta 👇','info');
    });
    // Drag-and-drop desktop
    el.addEventListener('dragstart',e=>{
      novaSelected=el;
      e.dataTransfer.setData('text/plain',el.id);
    });
  });
  $$('.nova-zone').forEach(z=>{
    z.addEventListener('click',()=>novaPlace(z));
    z.addEventListener('dragover',e=>e.preventDefault());
    z.addEventListener('drop',e=>{e.preventDefault();novaPlace(z)});
  });
};

function novaPlace(zone){
  if(!novaSelected||novaSelected.classList.contains('placed'))return;
  const foodCat=parseInt(novaSelected.dataset.cat);
  const zoneCat=parseInt(zone.dataset.cat);
  if(foodCat===zoneCat){
    novaSelected.classList.add('placed');
    novaSelected.classList.remove('selected');
    zone.querySelector('.nova-drop').appendChild(novaSelected);
    novaScore++; novaDone++;
    state.xp+=5;
    toast('✔ Correto! +5 XP','gold');
  }else{
    novaDone++;
    novaSelected.classList.remove('selected');
    novaSelected.style.animation='shake .4s';
    setTimeout(()=>novaSelected.style.animation='',400);
    toast('✘ Categoria errada — lembre: aditivos industriais = ultraprocessado','error');
  }
  novaSelected=null;
  const total=NOVA_FOODS.length;
  $('#novaResult').innerHTML=`<strong>Placar:</strong> ${novaScore}/${total} corretos`+
    (novaScore===total ? ' · 🏆 <strong>PERFEITO! Você zerou o Detetive de Rótulos!</strong>' : '');
  if(novaScore===total){confetti();bumpVitality('en',+6)}
  updateHud();saveGame();
}

/* =====================================================
   M2 — MESTRE DA TBCA · Simulador de Prato + VET/TMB
   ===================================================== */
const TBCA = [
  {name:"Arroz branco cozido", kcal:128, carb:28.1, prot:2.5, fat:0.2, emoji:"🍚"},
  {name:"Feijão carioca cozido", kcal:77, carb:13.6, prot:4.8, fat:0.5, emoji:"🫘"},
  {name:"Frango grelhado", kcal:159, carb:0, prot:32.0, fat:2.5, emoji:"🍗"},
  {name:"Salada de folhas", kcal:11, carb:2.0, prot:0.9, fat:0.1, emoji:"🥗"},
  {name:"Banana", kcal:92, carb:23.8, prot:1.4, fat:0.1, emoji:"🍌"},
  {name:"Refrigerante", kcal:40, carb:10.2, prot:0, fat:0, emoji:"🥤"},
  {name:"Batata frita", kcal:267, carb:36.0, prot:5.0, fat:13.0, emoji:"🍟"}
];

function renderPlateSim(){
  return `
  <div class="simulator">
    <h4>🍽️ Interação · Simulador de Prato (TBCA/USP)</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">Ajuste as gramaturas e veja em tempo real a energia e os macronutrientes do prato:</p>
    ${TBCA.map((f,i)=>`
      <div class="plate-row">
        <span class="plate-food">${f.emoji} ${f.name} <small style="color:var(--text-muted)">(${f.kcal} kcal/100g)</small></span>
        <input type="range" min="0" max="300" step="10" value="0" id="food${i}" oninput="plateCalc()">
        <span class="plate-grams" id="pg${i}">0 g</span>
      </div>`).join('')}
    <div class="sim-result" id="plateResult">
      <strong>Energia:</strong> 0 kcal · <strong>Carb:</strong> 0 g · <strong>Prot:</strong> 0 g · <strong>Gord:</strong> 0 g
    </div>
    <div id="plateFeedback" style="margin-top:.8rem;font-size:.9rem;color:var(--text-muted)"></div>
  </div>

  <div class="simulator">
    <h4>⚡ Calculadora VET/TMB (Mifflin-St Jeor)</h4>
    <div class="sim-grid">
      <div><label>Sexo biológico</label>
        <select id="vetSex" onchange="vetCalc()"><option value="m">Masculino</option><option value="f">Feminino</option></select></div>
      <div><label>Idade (anos)</label><input type="number" id="vetAge" value="16" min="10" max="100" oninput="vetCalc()"></div>
      <div><label>Peso (kg)</label><input type="number" id="vetWeight" value="60" min="25" max="250" oninput="vetCalc()"></div>
      <div><label>Altura (cm)</label><input type="number" id="vetHeight" value="165" min="120" max="230" oninput="vetCalc()"></div>
      <div class="full" style="grid-column:1/-1"><label>Nível de atividade</label>
        <select id="vetAct" onchange="vetCalc()">
          <option value="1.2">Sedentário</option>
          <option value="1.375">Leve (1–3x/sem)</option>
          <option value="1.55" selected>Moderado (3–5x/sem)</option>
          <option value="1.725">Intenso (6–7x/sem)</option>
        </select></div>
    </div>
    <div class="sim-result" id="vetResult"></div>
  </div>`;
}

window.plateCalc = function(){
  let kcal=0,carb=0,prot=0,fat=0,totalG=0,sodaG=0;
  TBCA.forEach((f,i)=>{
    const g=parseInt($('#food'+i).value)||0;
    $('#pg'+i).textContent=g+' g';
    kcal+=f.kcal*g/100; carb+=f.carb*g/100; prot+=f.prot*g/100; fat+=f.fat*g/100;
    totalG+=g;
    if(f.name==='Refrigerante'||f.name==='Batata frita') sodaG+=g;
  });
  $('#plateResult').innerHTML=`<strong>Energia:</strong> ${Math.round(kcal)} kcal · <strong>Carb:</strong> ${carb.toFixed(1)} g · <strong>Prot:</strong> ${prot.toFixed(1)} g · <strong>Gord:</strong> ${fat.toFixed(1)} g`;
  let fb='';
  if(totalG===0) fb='Monte seu prato arrastando os controles acima 👆';
  else if(kcal>0 && sodaG===0 && prot>=15) { fb='🌟 <strong>Prato equilibrado!</strong> Proteína adequada, sem ultraprocessados. +10 XP'; if(!window._plateBonus){state.xp+=10;bumpVitality('en',+5);window._plateBonus=true;toast('🍽️ Prato equilibrado! +10 XP','gold')} }
  else if(sodaG>0) fb='⚠️ Ultraprocessado no prato! Refrigerante e batata frita elevam a densidade calórica sem nutrientes.';
  else if(prot<10 && totalG>100) fb='💡 Faltou proteína! Inclua feijão, frango ou ovos para saciedade prolongada.';
  else fb='👍 Bom caminho! Busque: metade do prato de vegetais + proteína + carboidrato complexo.';
  $('#plateFeedback').innerHTML=fb;
  updateHud();
};

window.vetCalc = function(){
  const sex=$('#vetSex').value, age=parseFloat($('#vetAge').value)||0,
        w=parseFloat($('#vetWeight').value)||0, h=parseFloat($('#vetHeight').value)||0,
        act=parseFloat($('#vetAct').value)||1.2;
  if(w<=0||h<=0||age<=0){$('#vetResult').innerHTML='<strong>⚠️ Preencha peso, altura e idade.</strong>';return}
  const tmb = sex==='m' ? (10*w + 6.25*h - 5*age + 5) : (10*w + 6.25*h - 5*age - 161);
  const vet = tmb*act;
  $('#vetResult').innerHTML=`
    <strong>TMB</strong> = ${Math.round(tmb).toLocaleString('pt-BR')} kcal/dia <span style="color:var(--text-muted)">(repouso)</span><br>
    <strong>VET</strong> = TMB × ${act} = <span class="big">${Math.round(vet).toLocaleString('pt-BR')} kcal/dia</span><br>
    <span style="color:var(--text-muted);font-size:.85rem">Fórmula de Mifflin-St Jeor · a energia que seu corpo precisa por dia</span>`;
  if(!window._vetBonus){state.xp+=10;window._vetBonus=true;toast('⚡ VET calculado! +10 XP','gold');bumpVitality('en',+4);updateHud();saveGame()}
};

/* =====================================================
   M3 — GUARDIÃO DO SONO · Protocolo Interativo + Circadiano
   ===================================================== */
const SLEEP_ITEMS = [
  {t:"📵 Desconexão digital 60 min antes de dormir", good:true, why:"A luz azul inibe a melatonina — afaste as telas."},
  {t:"☕ Café ou energético depois das 16h", good:false, why:"A cafeína tem meia-vida de ~5h e bloqueia a adenosina (sinal de sono)."},
  {t:"🛏️ Horário regular para dormir e acordar", good:true, why:"Regularidade fortalece o ritmo circadiano."},
  {t:"🍔 Jantar pesado e gorduroso às 23h", good:false, why:"Digestão pesada compete com o sono profundo."},
  {t:"🌑 Quarto escuro, silencioso e fresco", good:true, why:"Escuridão é o gatilho natural da melatonina."},
  {t:"📱 Dormir com o celular sob o travesseiro", good:false, why:"Notificações fragmentam o sono e mantêm hipervigilância."}
];
let sleepChecked = {};

function renderSleepProtocol(){
  sleepChecked={};
  return `
  <div class="simulator">
    <h4>🌙 Interação · Protocolo de Higiene do Sono</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">Avalie cada hábito: ele <strong>AJUDA ✅</strong> ou <strong>PREJUDICA ❌</strong> o sono? Toque para decidir:</p>
    <div id="sleepList">
      ${SLEEP_ITEMS.map((s,i)=>`
        <div class="sleep-item" id="si${i}">
          <span>${s.t}</span>
          <div class="sleep-btns">
            <button class="btn-mini ok" onclick="sleepJudge(${i},true)">✅ Ajuda</button>
            <button class="btn-mini no" onclick="sleepJudge(${i},false)">❌ Prejudica</button>
          </div>
          <div class="sleep-why" id="sw${i}"></div>
        </div>`).join('')}
    </div>
    <div class="sim-result" id="sleepResult"><strong>Protocolo:</strong> 0/6 hábitos avaliados</div>
  </div>

  <div class="simulator">
    <h4>🕒 Simulador de Ritmo Circadiano</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">Arraste para escolher a hora de dormir e veja o impacto nos hormônios:</p>
    <div class="sim-grid">
      <div class="full" style="grid-column:1/-1">
        <label>Hora de dormir: <strong id="bedLabel">23h00</strong></label>
        <input type="range" min="20" max="32" step="0.5" value="23" id="bedTime" oninput="circadianCalc()" style="width:100%">
      </div>
    </div>
    <div class="sim-result" id="circResult"></div>
  </div>`;
}

window.sleepJudge = function(i, saidGood){
  if(sleepChecked[i]!==undefined) return;
  sleepChecked[i]=true;
  const s=SLEEP_ITEMS[i];
  const correct = saidGood===s.good;
  const el=$('#si'+i);
  el.classList.add(correct?'ok':'no');
  $('#sw'+i).innerHTML=(correct?'✔ ':'✘ ')+s.why;
  if(correct){state.xp+=5;toast('✔ +5 XP','gold')}
  else toast('✘ Veja a explicação','error');
  const done=Object.keys(sleepChecked).length;
  const acertos=SLEEP_ITEMS.filter((s2,j)=>sleepChecked[j]!==undefined && el).length;
  $('#sleepResult').innerHTML=`<strong>Protocolo:</strong> ${done}/6 hábitos avaliados`;
  if(done===6){
    const acertou=SLEEP_ITEMS.filter((s2,j)=>{
      const e2=$('#si'+j); return e2 && e2.classList.contains('ok');
    }).length;
    $('#sleepResult').innerHTML=`<strong>Protocolo completo!</strong> ${acertou}/6 corretos`+(acertou>=5?' · 🌙 <strong>Guardião do Sono exemplar!</strong>':'');
    bumpVitality('fn',+6);
    if(acertou>=5)confetti();
  }
  updateHud();saveGame();
};

window.circadianCalc = function(){
  const v=parseFloat($('#bedTime').value);
  const hour=Math.floor(v)%24, min=(v%1===0.5)?'30':'00';
  $('#bedLabel').textContent=hour+'h'+min;
  let mel, cort, quality, color;
  if(v<=22.5){mel='📈 Sobe no horário ideal (21h–22h)';cort='📉 Cai naturalmente';quality='🌟 Excelente: sono profundo garantido, grelina/leptina equilibradas';color='#10b981'}
  else if(v<=24){mel='📊 Sobe com leve atraso';cort='📊 Redução parcial';quality='👍 Bom, mas cada 30 min de atraso reduzem o sono profundo';color='#fbbf24'}
  else{mel='📉 Suprimida (especialmente se houver telas)';cort='📈 Permanece elevado → hiperalerta';quality='⚠️ Crítico: madrugada + telas = grelina ↑ no dia seguinte (mais fome!) e queda de concentração nas aulas';color='#ef4444'}
  $('#circResult').innerHTML=`
    <strong>Melatonina:</strong> ${mel}<br>
    <strong>Cortisol:</strong> ${cort}<br>
    <span style="color:${color};font-weight:600">${quality}</span>`;
};

/* =====================================================
   M4 — MENTE SÃ · Árvore de Decisão (Fome Emocional)
   ===================================================== */
const FOME_TREE = {
  start:{
    text:"📉 Você tirou nota baixa na prova. Chegando em casa, bate uma vontade SÚBITA de comer chocolate — mesmo tendo almoçado há 40 minutos. O que você faz primeiro?",
    options:[
      {t:"🍫 Vai direto abrir a barra de chocolate", next:"chocolate", tag:"impulso"},
      {t:"⏸️ Pausa de 10 minutos: bebe água e avalia 'é fome mesmo?'", next:"pausa", tag:"consciente"},
      {t:"🥗 Decide almoçar de novo 'para compensar'", next:"realmoço", tag:"confusao"}
    ]
  },
  chocolate:{
    text:"🍫 Você comeu a barra inteira em 5 minutos. Dez minutos depois… a frustração continua, agora acompanhada de CULPA. O que aconteceu?",
    options:[
      {t:"😔 Entendo: era fome emocional — súbita, específica e com gatilho emocional", next:"aprendizado_ok", tag:"insight"},
      {t:"🍫 Como mais um pouco, já estraguei mesmo", next:"espiral", tag:"espiral"}
    ]
  },
  pausa:{
    text:"⏸️ Após 10 minutos respirando e bebendo água, a vontade de chocolate DIMINUIU. Você percebe que não era o estômago — era a frustração falando. E agora?",
    options:[
      {t:"📝 Anoto o gatilho ('prova ruim → vontade de doce') no diário de hábitos", next:"aprendizado_otimo", tag:"insight"},
      {t:"🍫 Como o chocolate mesmo assim, mas só um quadradinho, com atenção", next:"aprendizado_ok", tag:"equilibrio"}
    ]
  },
  realmoço:{
    text:"🥗 Você fez um segundo almoço completo… e percebeu que nem estava com fome de verdade — comeu por impulso, sem saborear. A saciedade nunca chegou direito.",
    options:[
      {t:"💡 Aprendi: fome fisiológica cresce devagar; a minha veio de repente, junto com a emoção", next:"aprendizado_ok", tag:"insight"}
    ]
  },
  espiral:{
    text:"🌀 Comer mais não resolveu: dopamina rápida passou e a culpa aumentou. Esse ciclo (emoção → impulso → culpa → mais impulso) é o padrão da compulsão emocional.",
    options:[
      {t:"🛑 Quero quebrar o ciclo: qual é a estratégia?", next:"estrategia", tag:"busca"}
    ]
  },
  estrategia:{
    text:"🛑 Estratégia validada: (1) RECONHECER o gatilho; (2) Pausa de 10 min + água; (3) Perguntar 'meu corpo ou minha mente pedem?'; (4) Se persistir, comer uma porção consciente, sem culpa.",
    options:[
      {t:"✅ Vou aplicar isso da próxima vez", next:"aprendizado_otimo", tag:"insight"}
    ]
  },
  aprendizado_ok:{
    text:"✅ <strong>Missão emocional cumprida!</strong> Você identificou o padrão da fome emocional. Lembre: o objetivo não é proibir o chocolate — é ESCOLHER com consciência. (+20 XP)",
    options:[{t:"🔄 Reviver a situação", next:"start", tag:"reset"}],
    reward:20
  },
  aprendizado_otimo:{
    text:"🌟 <strong>Autoconhecimento de elite!</strong> Registrar gatilhos é a ferramenta nº 1 do mindful eating. A Dra. Nise ficaria orgulhosa: você transformou emoção em dado científico sobre si mesmo(a). (+30 XP)",
    options:[{t:"🔄 Reviver a situação", next:"start", tag:"reset"}],
    reward:30
  }
};
let fomeRewarded = {};

function renderFomeBranching(){
  fomeRewarded={};
  return `
  <div class="simulator">
    <h4>🧠 Interação · Árvore de Decisão — A Tarde da Nota Baixa</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">Viva a situação e faça escolhas. Cada caminho ensina algo sobre fome emocional × fisiológica:</p>
    <div class="fome-stage" id="fomeStage"></div>
  </div>`;
}

window.fomeGo = function(nodeId){
  const node=FOME_TREE[nodeId];
  const stage=$('#fomeStage');
  if(node.reward && !fomeRewarded[nodeId]){
    fomeRewarded[nodeId]=true;
    state.xp+=node.reward;
    bumpVitality('fn',+5);
    toast('🧠 +'+node.reward+' XP de autoconhecimento!','gold');
    confetti();
    updateHud();saveGame();
  }
  stage.innerHTML=`
    <div class="fome-node">
      <p>${node.text}</p>
      <div class="fome-options">
        ${node.options.map((o,i)=>`<button class="btn ${o.tag==='reset'?'btn-ghost':'btn-primary'}" onclick="fomeGo('${o.next}')">${o.t}</button>`).join('')}
      </div>
    </div>`;
  stage.scrollIntoView({behavior:'smooth',block:'nearest'});
};
window.fomeStart = function(){ fomeGo('start') };
