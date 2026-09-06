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

/* =====================================================
   SPRINT 4 · Interações M5–M8
   M5: Calculadora de Gasto Calórico (MET)
   M6: Formulário de Teletriagem + Painel Epidemiológico
   M7: Flashcards de Alimentação Imunomoduladora
   M8: Hackathon Telessaúde (proposta + rubrica)
   ===================================================== */

/* ---------- Dispatcher M5–M8 (estende o da M1–M4) ---------- */
(function(){
  const baseRender = window.renderInteraction;
  window.renderInteraction = function(mid){
    if(mid==='m5') return renderMETCalc();
    if(mid==='m6') return renderTriagem();
    if(mid==='m7') return renderFlashcards();
    if(mid==='m8') return renderHackathon();
    return baseRender(mid);
  };
})();

/* =====================================================
   M5 — ENGRENAGEM DO MOVIMENTO · Calculadora MET
   ===================================================== */
const MET_ACTIVITIES = [
  {name:"🚶 Caminhada", met:3.5},
  {name:"🚴 Bicicleta leve", met:5.5},
  {name:"🏃 Corrida leve", met:7.0},
  {name:"⚽ Futebol", met:8.0},
  {name:"🏀 Basquete", met:6.5},
  {name:"🏊 Natação", met:8.0},
  {name:"💃 Dança", met:5.0},
  {name:"🧘 Yoga", met:2.5},
  {name:"🛹 Skate", met:5.0},
  {name:"🥊 Artes marciais", met:9.0}
];

function renderMETCalc(){
  return `
  <div class="simulator">
    <h4>🏃 Interação · Calculadora de Gasto Calórico (MET)</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">
      Gasto ≈ <strong>MET × peso (kg) × tempo (h)</strong>. Monte seu plano semanal e veja se atinge a meta da OMS:
    </p>
    <div class="sim-grid">
      <div><label>Modalidade</label>
        <select id="metAct" onchange="metCalc()">
          ${MET_ACTIVITIES.map((a,i)=>`<option value="${a.met}">${a.name} (${a.met} MET)</option>`).join('')}
        </select></div>
      <div><label>Peso corporal (kg)</label><input type="number" id="metWeight" value="60" min="25" max="250" oninput="metCalc()"></div>
      <div><label>Minutos por sessão</label><input type="number" id="metMin" value="30" min="5" max="300" step="5" oninput="metCalc()"></div>
      <div><label>Sessões por semana</label><input type="number" id="metFreq" value="3" min="1" max="14" oninput="metCalc()"></div>
    </div>
    <div class="sim-result" id="metResult"></div>
    <div id="metBar" class="oms-bar"><div id="omsFill"></div></div>
    <div id="metFeedback" style="margin-top:.6rem;font-size:.88rem;color:var(--text-muted)"></div>
  </div>`;
}

window.metCalc = function(){
  const met=parseFloat($('#metAct').value), w=parseFloat($('#metWeight').value)||0,
        min=parseFloat($('#metMin').value)||0, freq=parseInt($('#metFreq').value)||0;
  if(w<=0){$('#metResult').innerHTML='<strong>⚠️ Informe o peso.</strong>';return}
  const kcalSession = met*w*(min/60);
  const kcalWeek = kcalSession*freq;
  const minWeek = min*freq;
  // Meta OMS adolescente: 60 min/dia ≈ 420 min/sem · adulto: 150 min/sem moderada
  const pct = Math.min(100, Math.round(minWeek/420*100));
  $('#metResult').innerHTML=`
    <strong>Por sessão:</strong> ${Math.round(kcalSession)} kcal · <strong>Por semana:</strong> ${Math.round(kcalWeek).toLocaleString('pt-BR')} kcal<br>
    <strong>Tempo semanal:</strong> ${minWeek} min <span style="color:var(--text-muted)">(meta OMS adolescente: ~420 min)</span>`;
  $('#omsFill').style.width=pct+'%';
  $('#omsFill').style.background = pct>=100 ? 'linear-gradient(90deg,#10b981,#34d399)' : pct>=35 ? 'linear-gradient(90deg,#fbbf24,#fde047)' : 'linear-gradient(90deg,#ef4444,#fb7185)';
  let fb;
  if(pct>=100){ fb='🌟 <strong>Meta OMS para adolescentes SUPERADA!</strong> Seu corpo agradece: mais mitocôndrias, melhor humor e sono. +10 XP';
    if(!window._metBonus){state.xp+=10;bumpVitality('vf',+6);window._metBonus=true;toast('🏃 Meta OMS atingida! +10 XP','gold')} }
  else if(pct>=35) fb='👍 Bom ritmo! Faltam '+(420-minWeek)+' min semanais para a meta de adolescentes (60 min/dia). Tente somar caminhadas ao plano.';
  else fb='💡 Comece devagar: 3 caminhadas de 30 min já somam 90 min/semana. O importante é a constância, não a intensidade.';
  $('#metFeedback').innerHTML=fb;
  updateHud();
};

/* =====================================================
   M6 — PAINEL EPIDEMIOLÓGICO · Teletriagem + Gráficos
   ===================================================== */
const TRIAGE_QUESTIONS = [
  {id:"t1", text:"🍔 Quantas vezes por semana você consome ultraprocessados (refrigerante, salgadinho, fast-food)?", opts:["0–1 vez","2–3 vezes","4–6 vezes","Todos os dias"]},
  {id:"t2", text:"🌙 Quantas horas você dorme por noite, em média?", opts:["9h ou mais","7–8h","5–6h","Menos de 5h"]},
  {id:"t3", text:"🏃 Quantos minutos de atividade física você faz por dia?", opts:["60 min ou mais","30–59 min","10–29 min","Quase nunca"]},
  {id:"t4", text:"🧠 Como está seu nível de estresse/ansiedade nas últimas semanas?", opts:["Baixo","Moderado","Alto","Muito alto"]},
  {id:"t5", text:"💧 Quantos copos de água você bebe por dia?", opts:["8 ou mais","5–7","3–4","Menos de 3"]}
];
let triageAnswers = {};

function renderTriagem(){
  triageAnswers={};
  return `
  <div class="simulator">
    <h4>📡 Interação · Teletriagem Escolar (simulação)</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">
      Responda a mini-triagem como se fosse da sua turma. Depois veja o <strong>painel epidemiológico</strong> com dados simulados de 120 estudantes + suas respostas. <em>Dados só neste navegador (LGPD).</em>
    </p>
    <div id="triageList">
      ${TRIAGE_QUESTIONS.map((q,i)=>`
        <div class="triage-q" id="${q.id}">
          <p>${q.text}</p>
          <div class="triage-opts">
            ${q.opts.map((o,j)=>`<button class="btn-mini tri" onclick="triageAnswer(${i},${j},this)">${o}</button>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div id="triagePanel" style="display:none">
      <h4 style="color:var(--gold);margin:1.2rem 0 .6rem">📊 Painel Epidemiológico — Turma simulada (n = 120)</h4>
      <div id="epiCharts"></div>
      <div class="sim-result" id="epiResult"></div>
    </div>
  </div>`;
}

window.triageAnswer = function(qi, oi, btn){
  if(triageAnswers[qi]!==undefined) return;
  triageAnswers[qi]=oi;
  const box=btn.closest('.triage-q');
  box.querySelectorAll('.btn-mini').forEach(b=>b.disabled=true);
  btn.classList.add('chosen');
  const done=Object.keys(triageAnswers).length;
  toast('Resposta registrada ('+done+'/5)','gold');
  if(done===TRIAGE_QUESTIONS.length){
    state.xp+=15; bumpVitality('fn',+6);
    toast('📡 Teletriagem completa! +15 XP','gold');
    buildEpiPanel();
    updateHud();saveGame();
  }
};

// Dados simulados da turma (distribuições plausíveis de EM)
const EPI_DATA = [
  {label:"Ultraprocessados ≥4x/sem", pct:58, color:"#ef4444"},
  {label:"Dormem menos de 7h", pct:64, color:"#a855f7"},
  {label:"Atividade < 60 min/dia", pct:71, color:"#fb7185"},
  {label:"Estresse alto/muito alto", pct:47, color:"#fbbf24"},
  {label:"Bebem menos de 5 copos de água", pct:52, color:"#0ea5e9"}
];

function buildEpiPanel(){
  $('#triagePanel').style.display='block';
  // Ajuste: se a resposta do usuário indica risco, ele "entra" nas estatísticas
  const risk = [triageAnswers[0]>=2, triageAnswers[1]>=2, triageAnswers[2]>=2, triageAnswers[3]>=2, triageAnswers[4]>=2];
  $('#epiCharts').innerHTML = EPI_DATA.map((d,i)=>{
    const user=risk[i]?' <span style="color:var(--gold);font-weight:700">← você está neste grupo</span>':'';
    return `
    <div class="epi-row">
      <span class="epi-label">${d.label}${user}</span>
      <div class="epi-bar"><div style="width:${d.pct}%;background:${d.color}"></div><span>${d.pct}%</span></div>
    </div>`;
  }).join('');
  const totalRisk=risk.filter(Boolean).length;
  $('#epiResult').innerHTML=`
    <strong>Leitura epidemiológica:</strong> a turma apresenta ${totalRisk===0?'padrão de baixo risco geral':'fatores de risco combinados'} —
    ${totalRisk}/5 fatores de risco se aplicam a você nesta simulação.<br>
    <span style="color:var(--text-muted);font-size:.85rem">Na escola real, esse painel (dados AGREGADOS e ANÔNIMOS, conforme LGPD) orienta ações: palestra de sono, desafio de hidratação, interclasse ativo. É assim que teletriagem vira prevenção! 🏥</span>`;
}

/* =====================================================
   M7 — IMUNIDADE · Flashcards Imunomoduladores
   ===================================================== */
const FLASHCARDS = [
  {front:"🌰 ZINCO", back:"Maturação das células de defesa (linfócitos T). Fontes: carnes, feijões, castanha-do-pará, ovos. Deficiência = queda da imunidade celular."},
  {front:"🍊 VITAMINA C", back:"Potencializa a função dos leucócitos e é antioxidante. Fontes: acerola (campeã!), goiaba, laranja, kiwi. Não 'cura' gripe, mas reduz duração."},
  {front:"🌾 FIBRAS", back:"Alimentam a microbiota intestinal (prebióticos). ~70% das células imunes vivem no intestino. Fontes: aveia, feijões, frutas com casca, vegetais."},
  {front:"🥛 FERMENTADOS", back:"Probióticos naturais (iogurte natural, kefir, kombuchá) somam micro-organismos vivos que fortalecem a barreira intestinal."},
  {front:"🧄 VITAMINA D + ÔMEGA 3", back:"Vitamina D (sol + peixes, ovos) regula a resposta imune; ômega 3 (sardinha, linhaça, chia) modula a inflamação."},
  {front:"⚠️ O INIMIGO", back:"Ultraprocessados ricos em açúcar e emulsificantes causam DISBIOSE: desequilíbrio da microbiota → inflamação crônica → imunidade baixa."}
];
let fcIndex=0, fcSeen=new Set(), fcFlipped=false;

function renderFlashcards(){
  fcIndex=0; fcSeen=new Set(); fcFlipped=false;
  return `
  <div class="simulator">
    <h4>🃏 Interação · Flashcards — Alimentação Imunomoduladora</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">Toque no card para virar. Estude os 6 cards para ganhar +15 XP:</p>
    <div class="flashcard" id="flashcard" onclick="flipCard()">
      <div class="fc-face fc-front" id="fcFront">${FLASHCARDS[0].front}</div>
      <div class="fc-face fc-back" id="fcBack">${FLASHCARDS[0].back}</div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.8rem">
      <button class="btn btn-ghost" onclick="prevCard()">← Anterior</button>
      <span id="fcCounter" style="color:var(--text-muted);font-size:.85rem">1/6 · vistos: 0</span>
      <button class="btn btn-ghost" onclick="nextCard()">Próximo →</button>
    </div>
    <div class="sim-result" id="fcResult" style="margin-top:.8rem">Estude todos os cards para dominar a imunonutrição! 🛡️</div>
  </div>`;
}

window.flipCard=function(){
  fcFlipped=!fcFlipped;
  $('#flashcard').classList.toggle('flipped',fcFlipped);
  if(fcFlipped && !fcSeen.has(fcIndex)){
    fcSeen.add(fcIndex);
    updateFcCounter();
  }
};
function showCard(){
  fcFlipped=false;
  $('#flashcard').classList.remove('flipped');
  $('#fcFront').textContent=FLASHCARDS[fcIndex].front;
  $('#fcBack').textContent=FLASHCARDS[fcIndex].back;
  updateFcCounter();
}
function updateFcCounter(){
  $('#fcCounter').textContent=(fcIndex+1)+'/6 · vistos: '+fcSeen.size;
  if(fcSeen.size===6 && !window._fcBonus){
    window._fcBonus=true;
    state.xp+=15;bumpVitality('en',+6);
    $('#fcResult').innerHTML='🛡️ <strong>Todos os cards estudados! +15 XP.</strong> Você agora domina zinco, vitamina C, fibras, probióticos e o perigo da disbiose.';
    toast('🛡️ Imunonutrição completa! +15 XP','gold');confetti();
    updateHud();saveGame();
  }
}
window.nextCard=function(){fcIndex=(fcIndex+1)%FLASHCARDS.length;showCard()};
window.prevCard=function(){fcIndex=(fcIndex-1+FLASHCARDS.length)%FLASHCARDS.length;showCard()};

/* =====================================================
   M8 — HACKATHON TELESSAÚDE · Proposta + Rubrica
   ===================================================== */
const HACKATHON_CRITERIA = [
  {id:"hk1", t:"🎯 Problema real identificado na minha escola/comunidade (ex.: sono, lanches, sedentarismo)"},
  {id:"hk2", t:"📊 Usa dados de teletriagem (formulário + painel agregado e anônimo)"},
  {id:"hk3", t:"🛡️ Respeita a LGPD: consentimento (TCLE) e anonimização"},
  {id:"hk4", t:"🎓 Inclui tele-educação: ação educativa com supervisão de professores"},
  {id:"hk5", t:"♻️ É sustentável: pode se repetir a cada trimestre sem custo alto"}
];

function renderHackathon(){
  return `
  <div class="simulator" style="border-color:var(--gold)">
    <h4>🏆 Interação Final · Hackathon Telessaúde de Bio-Metrópole</h4>
    <p style="color:var(--text-muted);font-size:.9rem;margin-bottom:.9rem">
      Boss final! Escreva sua proposta de ação de saúde digital para a comunidade escolar e autoavalie pela <strong>rubrica oficial</strong>:
    </p>
    <div class="id-grid" style="margin-bottom:1rem">
      <div class="full"><label>Título da proposta</label><input type="text" id="hkTitle" placeholder="Ex.: Desafio 21 Dias de Sono" maxlength="60"></div>
      <div class="full"><label>Descreva sua solução (problema → ação de telessaúde → resultado esperado)</label>
        <textarea id="hkDesc" rows="4" style="width:100%;background:var(--bg-2);border:1px solid var(--border);color:var(--text);padding:.75rem 1rem;border-radius:12px;font-family:inherit;font-size:.92rem;resize:vertical" placeholder="Ex.: Minha turma dorme pouco. Proponho teletriagem de sono + desafio de desconexão digital com painel de progresso da turma..."></textarea></div>
    </div>
    <h4 style="color:var(--gold);margin-bottom:.6rem">📋 Rubrica de Autoavaliação</h4>
    ${HACKATHON_CRITERIA.map((c,i)=>`
      <label style="display:flex;gap:.6rem;align-items:flex-start;padding:.5rem 0;cursor:pointer;border-bottom:1px dashed var(--border)">
        <input type="checkbox" id="${c.id}" style="margin-top:4px" onchange="hkScore()">
        <span style="font-size:.9rem">${c.t}</span>
      </label>`).join('')}
    <div class="sim-result" id="hkResult" style="margin-top:1rem"><strong>Rubrica:</strong> 0/5 critérios atendidos</div>
  </div>`;
}

window.hkScore=function(){
  const done=HACKATHON_CRITERIA.filter(c=>$('#'+c.id).checked).length;
  const title=$('#hkTitle').value.trim(), desc=$('#hkDesc').value.trim();
  let extra='';
  if(done===5){
    if(title.length>=4 && desc.length>=60){
      if(!window._hkBonus){
        window._hkBonus=true;
        state.xp+=50;bumpVitality('vf',+8);bumpVitality('fn',+8);
        if(!state.badges.includes('ouro')){state.badges.push('ouro')}
        toast('🏆 BADGE OURO DO HACKATHON CONQUISTADO! +50 XP','gold');
        confetti();setTimeout(confetti,600);
        updateHud();saveGame();
      }
      extra=' · 🏆 <strong>PROPOSTA APROVADA! Badge Ouro desbloqueado!</strong> Leve sua ideia "'+title+'" para a coordenação da sua escola — ela é implementável de verdade.';
    } else {
      extra=' · ✍️ Rubrica completa! Agora capriche no <strong>título</strong> e na <strong>descrição</strong> (mín. 60 caracteres) para conquistar o Badge Ouro.';
    }
  } else if(done>=3) extra=' · 💪 Quase lá! Fortaleça os critérios restantes.';
  $('#hkResult').innerHTML=`<strong>Rubrica:</strong> ${done}/5 critérios atendidos`+extra;
};
