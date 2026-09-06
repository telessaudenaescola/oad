/* =====================================================
   OAD Telessaúde na Escola — Agência Telessaúde:
   Jornada do Equilíbrio Bio-Sócio-Emocional
   Bio+Tech EduDesign © 2026 · REA aberto
   Engine: ABP + Gamificação + Storytelling + TCLE/LGPD
   ===================================================== */

// ================= STATE =================
const state = {
  name:"", school:"", grade:"", mentor:null,
  xp:0, streak:0,
  vit:{ en:20, fn:20, vf:20 },   // Energia Nutricional / Foco Neurocognitivo / Vigor Físico
  currentMission:null, currentQ:0,
  missionsDone:[], badges:[]
};

const SAVE_KEY = "oad_telessaude_save_v1";

// ================= MENTORAS =================
const mentors = [
  {
    id:"ruth", name:"Dra. Ruth Nussenzweig",
    role:"Parasitologista · Detetive de Rótulos",
    img:"assets/avatars/ruth_nussenzweig.png",
    bio:"Parasitologista paulista, referência mundial no combate à malária. Ensina que ciência de precisão começa observando os detalhes — inclusive os escondidos nos rótulos.",
    quotes:[
      "Um pesquisador lê cada detalhe antes de concluir. Um consumidor deveria fazer o mesmo com o rótulo!",
      "Os ingredientes são listados em ORDEM DECRESCENTE de quantidade. Se o açúcar aparece primeiro... ele É o produto.",
      "Ultraprocessado não é comida com aditivo: é uma FORMULAÇÃO industrial que substitui a comida de verdade."
    ]
  },
  {
    id:"zilda", name:"Dra. Zilda Arns",
    role:"Pediatra · Saúde Pública",
    img:"assets/avatars/zilda_arns.png",
    bio:"Pediatra paranaense, fundadora da Pastoral da Criança. Salvou milhões de crianças com ações simples de nutrição — prova de que dados e cuidado mudam destinos.",
    quotes:[
      "Cada grama de alimento conta uma história no corpo. A TBCA é o mapa dessa história.",
      "Sua TMB é a energia que seu corpo gasta só para existir: coração batendo, cérebro pensando, você respirando.",
      "Comida de verdade não precisa de rótulo complicado. O prato colorido é a melhor fórmula."
    ]
  },
  {
    id:"nise", name:"Dra. Nise da Silveira",
    role:"Psiquiatra · Mente Sã",
    img:"assets/avatars/nise_silveira.png",
    bio:"Psiquiatra alagoana que revolucionou o tratamento da saúde mental com afeto e arte. Pioneira em entender que emoção e corpo são um só sistema.",
    quotes:[
      "A mente que não descansa não regula a fome. Sono é o primeiro nutriente do equilíbrio emocional.",
      "Fome emocional chega de repente e pede um alimento específico. Fome fisiológica cresce devagar e aceita qualquer comida de verdade.",
      "Comer com atenção plena é um ato de respeito ao próprio corpo — mastigue, sinta, perceba a saciedade."
    ]
  },
  {
    id:"bertha", name:"Dra. Bertha Lutz",
    role:"Bióloga · Engrenagem do Movimento",
    img:"assets/avatars/bertha_lutz.png",
    bio:"Bióloga e líder feminista paulista. Lutou por direitos com estratégia e persistência — as mesmas qualidades de quem constrói um corpo ativo, dia após dia.",
    quotes:[
      "A OMS recomenda 150 minutos de atividade por semana. Parece muito? São só 22 minutos por dia!",
      "Seu músculo é uma usina: o exercício constrói mais mitocôndrias, e mais mitocôndrias significam mais energia.",
      "Movimento não é castigo pelo que você comeu. É celebração do que seu corpo pode fazer."
    ]
  },
  {
    id:"turchi", name:"Dra. Celina Turchi",
    role:"Epidemiologista · Fiocruz",
    img:"assets/avatars/celina_turchi.png",
    bio:"Epidemiologista da Fiocruz que desvendou a relação entre zika e microcefalia. Mostrou ao mundo que dados bem coletados salvam vidas — a base da telessaúde.",
    quotes:[
      "Um formulário de triagem é ciência cidadã: cada resposta dos estudantes vira um dado que protege a escola inteira.",
      "Epidemiologia é enxergar padrões onde os outros veem números soltos.",
      "Telessaúde não é tecnologia pela tecnologia: é cuidado chegando a quem está longe."
    ]
  },
  {
    id:"jaqueline", name:"Dra. Jaqueline Goes de Jesus",
    role:"Biomédica · Imunidade",
    img:"assets/avatars/jacqueline_goes.png",
    bio:"Biomédica baiana que sequenciou o genoma do SARS-CoV-2 no Brasil em 48 horas. Símbolo de que ciência jovem e diversa transforma a saúde pública.",
    quotes:[
      "Seu sistema imune trabalha 24h — e a matéria-prima dele vem do seu prato.",
      "Zinco, vitamina C e fibras não são 'remédios mágicos': são ferramentas que suas células de defesa usam todos os dias.",
      "70% da sua imunidade mora no intestino. Cuide da sua microbiota e ela cuida de você."
    ]
  }
];

// ================= BADGES =================
const badges = [
  {id:"m1", name:"Detetive de Rótulos", img:"assets/badges/badge_m1.png", desc:"Classificou alimentos pelo grau de processamento"},
  {id:"m2", name:"Mestre da TBCA", img:"assets/badges/badge_m2.png", desc:"Calculou necessidades energéticas com dados científicos"},
  {id:"m3", name:"Guardião do Sono", img:"assets/badges/badge_m3.png", desc:"Dominou a higiene do sono e o ritmo circadiano"},
  {id:"m4", name:"Bem-Estar", img:"assets/badges/badge_m4.png", desc:"Diferenciou fome fisiológica de emocional"},
  {id:"m5", name:"Engrenagem do Movimento", img:"assets/badges/badge_m5.png", desc:"Planejou atividade física com metas da OMS"},
  {id:"m6", name:"Painel Epidemiológico", img:"assets/badges/badge_m6.png", desc:"Interpretou dados de saúde da comunidade escolar"},
  {id:"m7", name:"Imunidade Nutricional", img:"assets/badges/badge_m7.png", desc:"Relacionou nutrientes às defesas do corpo"},
  {id:"m8", name:"Agente Telessaúde", img:"assets/badges/badge_m8.png", desc:"Completou a Jornada do Equilíbrio"},
  {id:"ouro", name:"Badge Ouro · Hackathon", img:"assets/badges/badge_ouro.png", desc:"Elite: propôs solução de saúde para a comunidade"}
];

// ================= MISSÕES =================
const missions = [
  {
    id:"m1", mentorId:"ruth", vit:"en",
    title:"Missão 01 · Detetive de Rótulos", region:"Classificação NOVA × TBCA",
    intro:"Em Bio-Metrópole, as prateleiras escondem armadilhas: produtos que parecem saudáveis, mas são formulações ultraprocessadas. Sua missão: aprender a classificar os alimentos pelo grau de processamento.",
    theory:[
      {h:"Classificação NOVA (Guia Alimentar × TBCA)", p:"<span class='highlight'>In natura / minimamente processados</span>: preservam fibras, minerais e vitaminas → digestão gradativa, baixo índice glicêmico, saciedade prolongada. <span class='highlight'>Ingredientes culinários</span> (óleos, sal, açúcar): uso moderado. <span class='highlight'>Processados</span>: in natura + sal/açúcar/óleo para conservação. <span class='highlight'>Ultraprocessados</span>: formulações industriais com aditivos (emulsificantes, corantes), sódio e gorduras — ligados a picos hiperglicêmicos, inflamação crônica, obesidade e ansiedade."},
      {h:"Exemplos", p:"In natura: arroz integral, feijão, mandioca, castanha-do-pará. Processados: queijo artesanal, conserva de vegetais, pão de fermentação natural. Ultraprocessados: refrigerante, macarrão instantâneo, salgadinhos, embutidos."},
      {h:"Leitura de rótulos", p:"Os ingredientes aparecem em <span class='highlight'>ordem decrescente de quantidade</span>. Quanto mais longa e química a lista, maior o grau de processamento."}
    ]
  },
  {
    id:"m2", mentorId:"zilda", vit:"en",
    title:"Missão 02 · Mestre da TBCA", region:"Energia do Prato",
    intro:"A Agência precisa calcular a energia dos moradores de Bio-Metrópole. Com a Tabela Brasileira de Composição de Alimentos (TBCA/USP), você vai medir calorias, macronutrientes e o gasto energético do corpo.",
    theory:[
      {h:"TMB e VET", p:"A <span class='highlight'>Taxa Metabólica Basal (TMB)</span> é a energia gasta em repouso para manter funções vitais. O <span class='highlight'>Valor Energético Total (VET)</span> soma TMB + atividade física + digestão (termogênese).", formula:"VET = TMB × fator de atividade\nTMB (aprox., adolescente ativo): ~1.400–2.000 kcal/dia"},
      {h:"Macronutrientes (valores TBCA)", p:"Carboidratos e proteínas fornecem ~4 kcal/g; lipídeos, ~9 kcal/g; fibras contam para a saciedade e a microbiota, com energia reduzida."},
      {h:"Leitura crítica", p:"100 g de arroz cozido ≈ 128 kcal; 100 g de feijão ≈ 77 kcal; 100 g de refrigerante ≈ 40 kcal de açúcar puro, sem nenhum nutriente útil — as chamadas <span class='highlight'>calorias vazias</span>."}
    ]
  },
  {
    id:"m3", mentorId:"nise", vit:"fn",
    title:"Missão 03 · Guardião do Sono", region:"Ritmo Circadiano",
    intro:"Os moradores de Bio-Metrópole dormem cada vez menos — e as telas são as principais suspeitas. Investigue como o sono regula hormônios, fome e concentração.",
    theory:[
      {h:"Ritmo circadiano", p:"O ciclo de ~24h regula <span class='highlight'>melatonina</span> (sono, sobe no escuro) e <span class='highlight'>cortisol</span> (alerta, sobe pela manhã). A luz azul das telas à noite atrasa a melatonina e adia o sono."},
      {h:"Sono × fome", p:"Dormir pouco altera a <span class='highlight'>grelina</span> (hormônio da fome, sobe) e a <span class='highlight'>leptina</span> (saciedade, desce). Resultado: mais apetite e preferência por alimentos calóricos no dia seguinte."},
      {h:"Protocolo de Higiene do Sono", p:"Horário regular, quarto escuro e fresco, <span class='highlight'>desconexão digital 60 min antes de dormir</span>, evitar cafeína à tarde e refeições pesadas à noite."}
    ]
  },
  {
    id:"m4", mentorId:"nise", vit:"fn",
    title:"Missão 04 · Mente Sã", region:"Fome Emocional × Fisiológica",
    intro:"Estresse, ansiedade e tristeza estão fazendo Bio-Metrópole beliscar sem fome. Sua missão: diferenciar os tipos de fome e aplicar estratégias de mindful eating.",
    theory:[
      {h:"Fome fisiológica × emocional", p:"A <span class='highlight'>fisiológica</span> cresce devagar, aceita qualquer alimento e para na saciedade. A <span class='highlight'>emocional</span> surge de repente, pede um alimento específico (geralmente ultraprocessado) e termina em culpa."},
      {h:"Estresse e cortisol", p:"O estresse crônico eleva o cortisol, que aumenta o desejo por açúcar e gordura — mecanismo evolutivo de busca rápida por energia."},
      {h:"Mindful eating", p:"Comer sem telas, mastigar devagar, perceber sabores e o sinal de saciedade (que leva ~20 minutos para chegar ao cérebro)."}
    ]
  },
  {
    id:"m5", mentorId:"bertha", vit:"vf",
    title:"Missão 05 · Engrenagem do Movimento", region:"Fisiologia do Exercício",
    intro:"A Agência quer tirar Bio-Metrópole do sedentarismo. Com as diretrizes da OMS e a fisiologia do exercício, monte o plano de movimento da cidade.",
    theory:[
      {h:"Diretriz OMS", p:"Adolescentes: ao menos <span class='highlight'>60 min/dia</span> de atividade moderada a vigorosa. Adultos: <span class='highlight'>150–300 min/semana</span> de moderada ou 75–150 de vigorosa + fortalecimento 2×/semana."},
      {h:"Fisiologia", p:"O exercício aumenta as <span class='highlight'>mitocôndrias</span> (usinas de ATP), melhora a sensibilidade à insulina e libera endorfinas — efeito antidepressivo natural."},
      {h:"Gasto calórico (MET)", p:"Caminhada ≈ 3,5 MET; corrida leve ≈ 7 MET; futebol ≈ 8 MET. Gasto ≈ MET × peso(kg) × tempo(h)."}
    ]
  },
  {
    id:"m6", mentorId:"turchi", vit:"fn",
    title:"Missão 06 · Painel Epidemiológico", region:"Teletriagem Escolar",
    intro:"É hora da Telessaúde agir: aplicar um formulário de triagem de hábitos com a comunidade escolar e transformar respostas em um painel epidemiológico.",
    theory:[
      {h:"Telessaúde na escola", p:"A telessaúde usa TDIC para <span class='highlight'>tele-educação, teleorientação, teleconsultoria e teletriagem</span> — levando cuidado em saúde a quem está longe (Plano de Pesquisa EEAGB/FAPEMAT)."},
      {h:"Do dado à decisão", p:"Formulários de autoavaliação geram dados agregados e <span class='highlight'>anônimos</span> (LGPD) que revelam padrões: % de consumo de ultraprocessados, horas de sono, minutos de atividade física."},
      {h:"LGPD na prática", p:"Dados de saúde são <span class='highlight'>sensíveis</span>: exigem consentimento (TCLE), finalidade clara e anonimização nos relatórios."}
    ]
  },
  {
    id:"m7", mentorId:"jaqueline", vit:"en",
    title:"Missão 07 · Imunidade Nutricional", region:"Alimentação Imunomoduladora",
    intro:"Uma onda de gripes atingiu Bio-Metrópole. A defesa começa no prato: investigue como nutrientes fortalecem o sistema imune.",
    theory:[
      {h:"Nutrientes-chave", p:"<span class='highlight'>Zinco</span> (carnes, castanhas, leguminosas): maturação de células de defesa. <span class='highlight'>Vitamina C</span> (acerola, goiaba, laranja): função dos leucócitos. <span class='highlight'>Fibras</span>: alimentam a microbiota intestinal."},
      {h:"Eixo intestino-imunidade", p:"Cerca de <span class='highlight'>70% das células imunes estão no intestino</span>. Fibras e fermentados naturais mantêm a microbiota equilibrada; ultraprocessados promovem disbiose e inflamação."},
      {h:"Mito × evidência", p:"Nenhum alimento 'blinda' sozinho. O padrão alimentar variado e rico em in natura é o que sustenta a resposta imune."}
    ]
  },
  {
    id:"m8", mentorId:"turchi", vit:"vf",
    title:"Missão 08 · Hackathon Telessaúde", region:"Boss Final",
    intro:"Última missão: a Agência convocou você para o Hackathon de Saúde de Bio-Metrópole. Integre tudo — alimentação, sono, mente, movimento e dados — para propor uma solução real à comunidade.",
    theory:[
      {h:"Síntese da jornada", p:"Saúde integral é <span class='highlight'>sistema</span>: ultraprocessados + sono curto + estresse + sedentarismo se potencializam no risco metabólico e cardiovascular (H14/ENEM)."},
      {h:"Propor soluções (H17)", p:"Tecnologias digitais (formulários, painéis, tele-educação) permitem rastrear riscos e promover saúde coletiva em escala — é a alma do projeto Telessaúde na Escola."},
      {h:"Badge Ouro", p:"Complete a missão final com acertos consecutivos (streak) e conquiste o Badge Ouro do Hackathon."}
    ]
  }
];

// ================= QUESTÕES (2 por missão · feedback duplo) =================
const questions = {
  m1:[
    {
      tag:"NOVA · Classificação",
      enunciado:"Uma estudante montou seu lanche com: maçã, pão de fermentação natural, queijo artesanal e um pacote de salgadinho de milho sabor queijo. Pela classificação NOVA, o único ULTRAPROCESSADO do lanche é:",
      options:["a maçã","o pão de fermentação natural","o queijo artesanal","o salgadinho de milho","todos são ultraprocessados"],
      correct:3,
      textoOk:"Exato! O salgadinho é uma formulação industrial com extratos, corantes e aromatizantes — ultraprocessado. Maçã é in natura; pão de fermentação natural e queijo artesanal são processados (in natura + sal/fermento).",
      textoErr:"Classifique cada item: maçã = in natura; pão de fermentação natural e queijo artesanal = PROCESSADOS (alimento in natura + sal/açúcar/óleo para conservação); salgadinho = ULTRAPROCESSADO (formlação industrial com aditivos que substitui comida de verdade). A dica: lista de ingredientes longa e cheia de nomes químicos = ultraprocessado."
    },
    {
      tag:"RÓTULOS · Leitura crítica",
      enunciado:"Num rótulo de 'biscoito integral', a lista de ingredientes começa assim: 'farinha de trigo enriquecida, açúcar, gordura vegetal, ... farelo de trigo...'. Sobre esse produto, a leitura crítica correta é:",
      options:[
        "É rico em fibras, pois contém farelo de trigo.",
        "O ingrediente presente em MAIOR quantidade é a farinha refinada, seguida do açúcar — a propaganda 'integral' não muda a composição majoritária.",
        "É in natura porque tem farinha.",
        "A ordem dos ingredientes no rótulo é aleatória e não informa quantidade.",
        "É proibido pela ANVISA chamar de integral qualquer biscoito."
      ],
      correct:1,
      textoOk:"Perfeito! Ingredientes são listados em ORDEM DECRESCENTE de quantidade. Se farinha refinada e açúcar vêm antes do farelo, o produto é majoritariamente refinado + açúcar. Marketing ≠ composição!",
      textoErr:"A regra de ouro da leitura de rótulos: ingredientes em ordem decrescente de quantidade. O que aparece PRIMEIRO é o que mais tem. 'Integral' no nome não garante fibra em quantidade relevante se o farelo aparece lá no fim da lista. Detetive de rótulos sempre lê a lista, não a propaganda."
    }
  ],
  m2:[
    {
      tag:"TBCA · VET/TMB",
      enunciado:"Um adolescente tem TMB de 1.500 kcal/dia e fator de atividade moderada (×1,4). Seu VET (Valor Energético Total) estimado é:",
      options:["1.500 kcal","1.900 kcal","2.100 kcal","2.500 kcal","3.000 kcal"],
      correct:2,
      textoOk:"Correto! VET = TMB × fator de atividade = 1.500 × 1,4 = 2.100 kcal/dia. Essa é a energia total que o corpo gasta: repouso + movimento + digestão.",
      textoErr:"A fórmula é direta: VET = TMB × fator de atividade. TMB (1.500 kcal) cobre só o repouso. Multiplicando pelo fator 1,4 (atividade moderada): 1.500 × 1,4 = 2.100 kcal. Quem marcou 1.500 esqueceu de aplicar o fator de atividade."
    },
    {
      tag:"TBCA · Densidade energética",
      enunciado:"Pela TBCA: 100 g de arroz cozido ≈ 128 kcal com carboidratos, proteínas e minerais; 100 g de refrigerante ≈ 40 kcal vindos só de açúcar. A melhor análise comparativa é:",
      options:[
        "O refrigerante é melhor porque tem menos calorias.",
        "O arroz é mais calórico, logo deve ser evitado.",
        "O refrigerante fornece 'calorias vazias' (energia sem nutrientes), enquanto o arroz entrega energia acompanhada de nutrientes — qualidade importa mais que o número isolado.",
        "Ambos têm o mesmo valor nutricional.",
        "Calorias de líquidos não são absorvidas pelo corpo."
      ],
      correct:2,
      textoOk:"Excelente análise! Caloria não é tudo igual: 40 kcal de açúcar puro são 'calorias vazias' (zero nutrientes), enquanto 128 kcal do arroz vêm com carboidrato complexo, proteína e minerais. Nutrição é qualidade + quantidade.",
      textoErr:"O erro clássico é comparar só os números de kcal. A TBCA mostra a COMPOSIÇÃO: o refrigerante entrega só açúcar (calorias vazias, pico glicêmico), enquanto o arroz entrega energia + nutrientes. Densidade NUTRICIONAL (nutrientes por kcal) é o critério correto — não a menor caloria."
    }
  ],
  m3:[
    {
      tag:"SONO · Ritmo circadiano",
      enunciado:"Um estudante usa o celular na cama até 1h da manhã todos os dias e relata dificuldade para dormir e sonolência nas aulas. A explicação fisiológica mais adequada é:",
      options:[
        "A luz azul da tela estimula a melatonina, que agita o sono.",
        "A luz azul das telas INIBE a melatonina (hormônio do sono) e mantém o cortisol elevado, atrasando o ritmo circadiano.",
        "O celular consome vitamina C, causando insônia.",
        "Dormir tarde não afeta o rendimento escolar.",
        "O cérebro adolescente não precisa de mais de 5 horas de sono."
      ],
      correct:1,
      textoOk:"Isso! A luz azul das telas suprime a melatonina (que deveria subir no escuro) e mantém o alerta via cortisol — o relógio biológico atrasa. Adolescentes precisam de 8–10h de sono. A solução: desconexão digital 60 min antes de dormir.",
      textoErr:"O ritmo circadiano depende de luz: no escuro, a melatonina sobe e induz o sono. A luz azul da tela engana o cérebro ('ainda é dia'), inibindo a melatonina. Resultado: sono atrasado e fragmentado, pior atenção e MAIS fome no dia seguinte (grelina ↑, leptina ↓)."
    },
    {
      tag:"SONO × FOME",
      enunciado:"Pesquisas mostram que adolescentes que dormem menos de 6h consomem, em média, mais calorias no dia seguinte. O mecanismo hormonal envolvido é:",
      options:[
        "Privação de sono aumenta a leptina e reduz a grelina, gerando saciedade precoce.",
        "Privação de sono aumenta a GRELINA (fome) e reduz a LEPTINA (saciedade), elevando o apetite — especialmente por alimentos calóricos.",
        "O sono não influencia hormônios ligados ao apetite.",
        "Dormir pouco acelera o metabolismo e queima a fome.",
        "A insulina é o único hormônio alterado pelo sono."
      ],
      correct:1,
      textoOk:"Perfeito! Sono curto → grelina ↑ (mais fome) + leptina ↓ (menos saciedade) + cortisol ↑ (desejo por açúcar/gordura). É por isso que noites mal dormidas empurram para beliscos calóricos. Sono é ferramenta de regulação do peso!",
      textoErr:"Decore a dupla: GRELINA = fome (sobe com privação de sono); LEPTINA = saciedade (desce). Com 6h ou menos de sono, o corpo fica hormonalmente 'com fome' e pede alimentos de alta densidade calórica. Letra A inverte os hormônios."
    }
  ],
  m4:[
    {
      tag:"MENTE · Tipos de fome",
      enunciado:"Após receber uma nota baixa, Marina sente vontade súbita de comer especificamente chocolate, mesmo tendo almoçado há 40 minutos. Esse comportamento caracteriza:",
      options:[
        "fome fisiológica, pois o almoço já foi digerido.",
        "fome emocional: início súbito, desejo por alimento ESPECÍFICO e gatilho emocional (frustração), sem necessidade energética real.",
        "hipoglicemia causada pela nota baixa.",
        "necessidade de triptofano que só o chocolate possui.",
        "fome fisiológica, já que chocolate é fonte de energia."
      ],
      correct:1,
      textoOk:"Exato! Três sinais de fome EMOCIONAL: (1) surge de repente; (2) pede um alimento específico (chocolate); (3) tem gatilho emocional (a nota baixa). A fome fisiológica cresce gradualmente e aceita qualquer alimento.",
      textoErr:"Compare os padrões: fome FISIOLÓGICA = gradual + qualquer comida serve + para na saciedade; fome EMOCIONAL = súbita + alimento específico + gatilho emocional + termina em culpa. O cenário de Marina preenche todos os critérios da emocional — e chocolate é o clássico alimento-conforto ultraprocessado."
    },
    {
      tag:"MENTE · Mindful eating",
      enunciado:"Qual estratégia de 'mindful eating' (alimentação consciente) é eficaz para reduzir episódios de fome emocional?",
      options:[
        "Comer assistindo a vídeos para distrair a ansiedade.",
        "Comer o mais rápido possível para acabar logo com a fome.",
        "Comer sem telas, mastigando devagar e observando sabores e o sinal de saciedade — que leva cerca de 20 minutos para ser percebido pelo cérebro.",
        "Substituir todas as refeições por shakes.",
        "Proibir totalmente qualquer doce para evitar recaídas."
      ],
      correct:2,
      textoOk:"Correto! O sinal de saciedade leva ~20 min para chegar ao cérebro. Comer devagar, sem telas e com atenção aos sabores permite perceber a saciedade real e diferenciar fome de vontade. Restrições radicais (letra E) costumam aumentar a compulsão.",
      textoErr:"Mindful eating = presença na refeição: sem telas, mastigação lenta, atenção ao sabor e à saciedade (que demora ~20 min). Comer rápido ou distraído faz você ultrapassar a saciedade sem perceber. Dietas muito restritivas geram efeito rebote — equilíbrio, não proibição."
    }
  ],
  m5:[
    {
      tag:"OMS · Diretriz semanal",
      enunciado:"Segundo a OMS, a recomendação mínima de atividade física moderada para ADULTOS e a recomendação para ADOLESCENTES são, respectivamente:",
      options:[
        "30 min/semana; 30 min/dia",
        "150–300 min/semana de moderada; em média 60 min/dia de moderada a vigorosa",
        "500 min/semana; 3 h/dia",
        "75 min/mês; 20 min/semana",
        "Não há recomendação oficial para adolescentes"
      ],
      correct:1,
      textoOk:"Isso! OMS: adultos → 150–300 min/semana de atividade moderada (ou 75–150 vigorosa) + fortalecimento 2×/semana. Adolescentes (5–17 anos) → média de 60 min/DIA de moderada a vigorosa. São só ~22 min/dia para o adulto atingir o mínimo!",
      textoErr:"Diretriz OMS 2020: ADULTOS precisam de 150–300 min/semana (moderada) ou 75–150 min (vigorosa); ADOLESCENTES precisam de mais: média de 60 min/dia. Sedentarismo é o 4º fator de risco de mortalidade global — e a recomendação mínima cabe em menos de meia hora por dia."
    },
    {
      tag:"FISIOLOGIA · Exercício",
      enunciado:"A prática regular de exercício físico melhora o controle glicêmico e a disposição porque:",
      options:[
        "aumenta o número de mitocôndrias (produção de ATP) e a sensibilidade à insulina, além de liberar endorfinas.",
        "elimina a necessidade de insulina em qualquer pessoa.",
        "impede a absorção de carboidratos no intestino.",
        "transforma gordura diretamente em músculo.",
        "reduz a frequência cardíaca a níveis mínimos permanentes."
      ],
      correct:0,
      textoOk:"Perfeito! Exercício = mais mitocôndrias (mais ATP) + maior sensibilidade à insulina (glicose entra melhor nas células) + endorfinas (bem-estar). Gordura não 'vira' músculo — são tecidos diferentes; ambos melhoram separadamente.",
      textoErr:"Os três efeitos centrais do exercício: (1) biogênese mitocondrial → mais energia celular; (2) músculo capta glicose com MENOS insulina → controle glicêmico; (3) endorfinas/serotonina → efeito antidepressivo. A letra D é mito clássico: gordura e músculo não se convertem um no outro."
    }
  ],
  m6:[
    {
      tag:"TELESSAÚDE · Conceitos",
      enunciado:"O projeto Telessaúde na Escola aplica um formulário digital de autoavaliação de hábitos (sono, alimentação, atividade física) aos estudantes para identificar grupos de risco e orientar ações preventivas. Essa ação é um exemplo de:",
      options:[
        "telecirurgia","teletriagem aliada à tele-educação em saúde","telemarketing de saúde","diagnóstico médico à distância","telepatologia"],
      correct:1,
      textoOk:"Exato! Rastrear hábitos para orientar prevenção é TELETRIAGEM (classificação de risco) + TELE-EDUCAÇÃO (promoção de saúde) — modalidades da telessaúde que não emitem diagnóstico individual, mas organizam o cuidado coletivo.",
      textoErr:"A telessaúde inclui teleorientação, tele-educação, teleconsultoria, teleassistência e TELETRIAGEM. Triagem = classificar/organizar por risco, sem diagnóstico. Um formulário de hábitos que orienta ações preventivas é exatamente teletriagem + tele-educação — e não 'diagnóstico à distância' (D), que exigiria avaliação clínica individual."
    },
    {
      tag:"DADOS · LGPD",
      enunciado:"No painel epidemiológico da escola, os dados de saúde dos estudantes serão exibidos em gráficos. Pela LGPD (Lei 13.709/2018), a conduta OBRIGATÓRIA é:",
      options:[
        "Publicar o nome dos alunos com pior hábito para motivar mudanças.",
        "Coletar dados sem avisar ninguém, para evitar vieses.",
        "Obter consentimento (TCLE), informar a finalidade e apresentar os resultados de forma AGREGADA e ANÔNIMA, pois dados de saúde são sensíveis.",
        "Vender os dados para empresas de planos de saúde.",
        "Guardar os dados para sempre, sem prazo de descarte."
      ],
      correct:2,
      textoOk:"Perfeito! Dados de saúde são SENSÍVEIS: exigem consentimento livre e informado (TCLE), finalidade explícita e proteção da identidade. Relatórios devem ser agregados/anônimos. Nomear alunos (A) viola diretamente a lei.",
      textoErr:"LGPD em 3 pontos para dados sensíveis (saúde): (1) CONSENTIMENTO — o estudante/responsável aceita via TCLE; (2) FINALIDADE — uso apenas para o declarado (promoção de saúde escolar); (3) ANONIMIZAÇÃO — resultados agregados, sem identificar ninguém. Neste OAD, os dados ficam apenas no seu navegador (localStorage) e podem ser apagados a qualquer momento."
    }
  ],
  m7:[
    {
      tag:"IMUNIDADE · Nutrientes",
      enunciado:"Uma escola quer reforçar a imunidade dos alunos pelo cardápio. A combinação de alimentos que melhor cobre ZINCO + VITAMINA C + FIBRAS é:",
      options:[
        "refrigerante, biscoito recheado e salgadinho",
        "carne/feijão (zinco), acerola/goiaba (vitamina C) e aveia/vegetais (fibras)",
        "água tônica, gelatina e bala de goma",
        "pão branco, manteiga e café",
        "vitamina C em excesso dispensa qualquer outra fonte"
      ],
      correct:1,
      textoOk:"Isso! Zinco (carnes, leguminosas, castanhas) → maturação das células de defesa; vitamina C (acerola, goiaba, cítricos) → função dos leucócitos; fibras (aveia, vegetais, frutas) → alimentam a microbiota, onde mora ~70% da imunidade. Ultraprocessados (letra A) fazem o oposto: disbiose e inflamação.",
      textoErr:"Monte o trio imunológico: ZINCO (carnes, feijões, castanhas) + VITAMINA C (acerola, goiaba, laranja) + FIBRAS (aveia, vegetais, frutas). E atenção ao mito da letra E: nenhum nutriente isolado 'blinda' — imunidade é construída pelo PADRÃO alimentar variado rico em in natura."
    },
    {
      tag:"IMUNIDADE · Microbiota",
      enunciado:"Cerca de 70% das células do sistema imune estão associadas ao intestino. O hábito alimentar que MAIS contribui para esse eixo intestino-imunidade é:",
      options:[
        "consumo diário de ultraprocessados ricos em emulsificantes.",
        "consumo regular de fibras e alimentos fermentados naturais, que sustentam uma microbiota equilibrada.",
        "uso contínuo de antibióticos como prevenção.",
        "jejum prolongado de 48h toda semana.",
        "eliminar todos os carboidratos da dieta."
      ],
      correct:1,
      textoOk:"Correto! Fibras são o 'alimento' das bactérias boas (prebióticos) e fermentados naturais trazem micro-organismos vivos (probióticos). Microbiota equilibrada = barreira intestinal forte e resposta imune calibrada. Emulsificantes de ultraprocessados (A) promovem disbiose.",
      textoErr:"O eixo intestino-imunidade depende da MICROBIOTA: fibras (prebióticos) alimentam as bactérias benéficas; fermentados naturais (iogurte natural, kombuchá, kefir) somam probióticos. Ultraprocessados com emulsificantes e excesso de açúcar causam disbiose — desequilíbrio ligado a inflamação crônica e imunidade baixa."
    }
  ],
  m8:[
    {
      tag:"BOSS · Síntese H14",
      enunciado:"Uma cidade apresenta simultaneamente: alto consumo de ultraprocessados, adolescentes dormindo <6h, estresse elevado e sedentarismo. A análise correta do risco à saúde é:",
      options:[
        "Cada fator atua isoladamente; basta tratar um deles.",
        "Os fatores se POTENCIALIZAM: ultraprocessados elevam inflamação e glicemia; sono curto aumenta grelina e cortisol; estresse mantém o cortisol alto; sedentarismo reduz a sensibilidade à insulina — somando risco metabólico e cardiovascular.",
        "Só a genética importa nesse cenário.",
        "O risco desaparece se houver suplementação vitamínica.",
        "Adolescentes não sofrem risco cardiovascular."
      ],
      correct:1,
      textoOk:"Excelente síntese! Saúde é SISTEMA: os quatro fatores formam um ciclo vicioso (sono ruim → mais fome → pior escolha alimentar → mais inflamação → pior sono...). A intervenção eficaz ataca o ciclo inteiro — exatamente a proposta desta jornada.",
      textoErr:"O erro da letra A é tratar fatores isolados. Na prática: ultraprocessados ↑ inflamação; sono <6h ↑ grelina/cortisol; estresse mantém cortisol alto; sedentarismo ↓ sensibilidade à insulina. Todos convergem para o MESMO desfecho: risco metabólico e cardiovascular precoce. ENEM H14 cobra exatamente essa leitura integrada."
    },
    {
      tag:"BOSS · Hackathon H17",
      enunciado:"Sua equipe no Hackathon deve propor UMA ação de telessaúde para a escola. A proposta mais alinhada à promoção de saúde coletiva (H17) é:",
      options:[
        "Criar um grupo para compartilhar dietas da moda sem avaliação profissional.",
        "Aplicar trimestralmente um formulário anônimo de hábitos (teletriagem), gerar painel de dados agregados para a escola e oferecer tele-educação com monitores revisada por professores.",
        "Distribuir remédios para emagrecimento com receita online.",
        "Diagnosticar alunos por inteligência artificial sem consentimento.",
        "Proibir a cantina da escola por decreto dos estudantes."
      ],
      correct:1,
      textoOk:"PERFEITO — visão de Agente Telessaúde! Triagem periódica + dados agregados/anônimos (LGPD) + tele-educação com supervisão = tecnologia a serviço da saúde coletiva. É o DNA do projeto EEAGB/FAPEMAT que originou este OAD.",
      textoErr:"Promoção de saúde coletiva com TDIC exige: (1) rastreio (formulário/teletriagem); (2) dados agregados e anônimos (LGPD); (3) educação continuada com supervisão qualificada. Dietas da moda (A) e remédios sem critério (C) são riscos; diagnóstico por IA sem consentimento (D) viola a LGPD. A letra B é a única que une tecnologia + ética + prevenção."
    }
  ]
};

// ================= HELPERS =================
function $(s){return document.querySelector(s)}
function $$(s){return document.querySelectorAll(s)}
function show(id){
  $$('.screen').forEach(s=>s.classList.remove('active'));
  $('#'+id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function toast(msg,type='info'){
  const c=$('#toastContainer');const t=document.createElement('div');
  t.className='toast '+(type==='error'?'error':(type==='gold'?'gold':''));
  t.textContent=msg;c.appendChild(t);
  setTimeout(()=>{t.style.opacity=0;setTimeout(()=>t.remove(),300)},3400);
}
function confetti(){
  const colors=['#10b981','#0ea5e9','#fb7185','#fbbf24','#a7f3d0'];
  for(let i=0;i<70;i++){
    const c=document.createElement('div');c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay=Math.random()*.5+'s';
    c.style.animationDuration=(2.4+Math.random()*1.4)+'s';
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4000);
  }
}

// ================= HUD / VITALIDADE =================
function updateHud(){
  $('#hudXp').textContent=state.xp;
  const streakEl=$('#hudStreak');
  streakEl.textContent = state.streak>=3 ? '🔥 Sinergia ×'+2+' ('+state.streak+')' : ('Streak: '+state.streak);
  streakEl.style.color = state.streak>=3 ? 'var(--gold)' : '';
  // Vitalidade
  $('#vitEn').style.width=Math.min(100,state.vit.en)+'%';
  $('#vitFn').style.width=Math.min(100,state.vit.fn)+'%';
  $('#vitVf').style.width=Math.min(100,state.vit.vf)+'%';
  $('#vitEnVal').textContent=Math.min(100,state.vit.en);
  $('#vitFnVal').textContent=Math.min(100,state.vit.fn);
  $('#vitVfVal').textContent=Math.min(100,state.vit.vf);
  $('#progressFill').style.width=(state.missionsDone.length/missions.length*100)+'%';
  if(state.mentor){
    const m=mentors.find(x=>x.id===state.mentor);
    $('#hudAvatar').src=m.img;$('#hudAvatar').style.display='block';
    $('#hudName').textContent=state.name||'Agente';$('#hudName').style.display='inline-flex';
  }
}
function bumpVitality(key,delta){
  state.vit[key]=Math.max(0,Math.min(100,state.vit[key]+delta));
}

// ================= SAVE / LOAD (LGPD: dados só no navegador) =================
function saveGame(){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(state))}catch(e){}
}
function loadGame(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);
    if(!raw)return false;
    const s=JSON.parse(raw);
    if(!s||!s.name)return false;
    Object.assign(state,s);
    return true;
  }catch(e){return false}
}
window.eraseData=function(){
  localStorage.removeItem(SAVE_KEY);
  toast('Seus dados locais foram apagados (LGPD).','gold');
  setTimeout(()=>location.reload(),900);
};

// ================= WELCOME / IDENTIFICAÇÃO =================
function renderMentors(){
  $('#mentorGrid').innerHTML=mentors.map(m=>`
    <div class="mentor-card" data-id="${m.id}">
      <img src="${m.img}" alt="${m.name}">
      <h3>${m.name}</h3>
      <div class="role">${m.role}</div>
      <div class="bio">${m.bio}</div>
    </div>`).join('');
  $$('#mentorGrid .mentor-card').forEach(el=>{
    el.addEventListener('click',()=>{
      $$('#mentorGrid .mentor-card').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
      state.mentor=el.dataset.id;
      checkStart();
    });
  });
  ['inputName','inputSchool','selectGrade'].forEach(id=>{
    $('#'+id).addEventListener('input',checkStart);
  });
  $('#checkTCLE').addEventListener('change',checkStart);
}
function checkStart(){
  const ok = $('#inputName').value.trim().length>=2
    && $('#checkTCLE').checked
    && !!state.mentor;
  $('#btnStartTrail').disabled=!ok;
}
function startJourney(){
  state.name=$('#inputName').value.trim();
  state.school=$('#inputSchool').value.trim();   // escola em aberto (OAD/REA)
  state.grade=$('#selectGrade').value;
  updateHud();saveGame();
  toast('🌿 Bem-vinda(o) à Agência Telessaúde, '+state.name+'!','gold');
  renderTrail();show('screenTrail');
}

// ================= TRAIL =================
function renderTrail(){
  $('#trailGrid').innerHTML=missions.map((m,i)=>{
    const done=state.missionsDone.includes(m.id);
    const locked=i>0 && !state.missionsDone.includes(missions[i-1].id);
    const badge=badges[i];
    const mtr=mentors.find(x=>x.id===m.mentorId);
    return `
    <div class="mission-card ${done?'completed':''} ${locked?'locked':''}">
      <div class="status">${done?'✅':(locked?'🔒':'🚀')}</div>
      <img src="${badge.img}" class="badge-img" alt="${badge.name}">
      <h3>${m.title}</h3>
      <div class="region">${m.region} · ${mtr.name.split(' ')[1]||''} ${mtr.name.split(' ')[2]||''}</div>
      <div class="desc">${m.intro.slice(0,110)}...</div>
      <div class="meta"><span>🎯 ${questions[m.id].length} desafios</span><span>+${questions[m.id].length*30} XP</span></div>
      <button class="btn ${done?'btn-ghost':'btn-primary'}" style="width:100%;justify-content:center" ${locked?'disabled':''} onclick="startMission('${m.id}')">
        ${done?'Revisitar':(locked?'Bloqueada':'Iniciar')}
      </button>
    </div>`;
  }).join('');
  $('#badgesGallery').innerHTML=badges.map(b=>{
    const earned=state.badges.includes(b.id);
    return `<div class="badge-item ${earned?'earned':''}" title="${b.desc}">
      <img src="${b.img}" alt="${b.name}"><div class="name">${b.name}</div></div>`;
  }).join('');
}

// ================= MISSION FLOW =================
window.startMission=function(mid){
  state.currentMission=mid;state.currentQ=0;
  renderMissionStudy();
};
function renderMissionStudy(){
  const m=missions.find(x=>x.id===state.currentMission);
  const idx=missions.findIndex(x=>x.id===state.currentMission);
  const badge=badges[idx];
  const mentor=mentors.find(x=>x.id===m.mentorId);
  const totalQ=questions[m.id].length;
  $('#missionContent').innerHTML=`
    <div class="mission-header">
      <img src="${badge.img}" alt="badge">
      <div style="flex:1"><h2>${m.title}</h2><div class="subtitle">${m.region} · ${totalQ} desafios</div></div>
      <div class="q-indicator">📚 Estudo</div>
    </div>
    <div class="mentor-box">
      <img src="${mentor.img}" alt="${mentor.name}">
      <p><strong>${mentor.name.split(',')[0]} diz:</strong> ${mentor.quotes[idx % mentor.quotes.length]}</p>
    </div>
    <div class="content-card"><h3>🎯 Situação-problema</h3><p>${m.intro}</p></div>
    ${m.theory.map(t=>`
      <div class="content-card">
        <h3>📖 ${t.h}</h3><p>${t.p}</p>
        ${t.formula?`<div class="formula">${t.formula}</div>`:''}
      </div>`).join('')}
    ${(typeof renderInteraction==='function')?renderInteraction(m.id):''}
    <div class="nav-footer">
      <button class="btn btn-ghost" onclick="show('screenTrail')">← Voltar à trilha</button>
      <button class="btn btn-primary" onclick="startQuestions()">Começar desafios →</button>
    </div>`;
  show('screenMission');
  // Inicializa interações especiais (Sprint 3 + Sprint 4)
  if(m.id==='m1' && typeof novaInit==='function') novaInit();
  if(m.id==='m2' && typeof vetCalc==='function') vetCalc();
  if(m.id==='m3' && typeof circadianCalc==='function') circadianCalc();
  if(m.id==='m4' && typeof fomeStart==='function') fomeStart();
  if(m.id==='m5' && typeof metCalc==='function') metCalc();
}
window.startQuestions=function(){state.currentQ=0;renderQuestion()};
function renderQuestion(){
  const mid=state.currentMission,qs=questions[mid];
  if(state.currentQ>=qs.length){finishMission();return}
  const q=qs[state.currentQ];
  const m=missions.find(x=>x.id===mid);
  const badge=badges[missions.findIndex(x=>x.id===mid)];
  const mentor=mentors.find(x=>x.id===m.mentorId);
  $('#missionContent').innerHTML=`
    <div class="mission-header">
      <img src="${badge.img}" alt="badge">
      <div style="flex:1"><h2>${m.title}</h2><div class="subtitle">${m.region}</div></div>
      <div class="q-indicator">Desafio ${state.currentQ+1}/${qs.length}</div>
    </div>
    <div class="mentor-box">
      <img src="${mentor.img}" alt="${mentor.name}">
      <p><strong>Dica:</strong> ${mentor.quotes[state.currentQ % mentor.quotes.length]}</p>
    </div>
    <div class="question-card">
      <span class="q-tag">${q.tag}</span>
      <div class="q-enunciado">${q.enunciado}</div>
      <div class="options" id="opts">
        ${q.options.map((op,i)=>`
          <div class="option" data-idx="${i}" onclick="answer(${i})">
            <div class="letter">${String.fromCharCode(65+i)}</div><div>${op}</div>
          </div>`).join('')}
      </div>
      <div id="feedbackBox"></div>
      <div class="nav-footer" id="navBox" style="display:none">
        <button class="btn btn-ghost" onclick="show('screenTrail')">↩ Trilha</button>
        <button class="btn btn-primary" onclick="nextQuestion()">Próxima →</button>
      </div>
    </div>`;
}
window.answer=function(idx){
  const m=missions.find(x=>x.id===state.currentMission);
  const q=questions[state.currentMission][state.currentQ];
  const opts=$$('#opts .option');
  if(opts[0].classList.contains('disabled'))return;
  opts.forEach(o=>o.classList.add('disabled'));
  const correct=idx===q.correct;
  opts[q.correct].classList.add('correct');
  if(!correct)opts[idx].classList.add('wrong');
  if(correct){
    state.streak++;
    const mult = state.streak>=3 ? 2 : 1;   // Sinergia Metabólica ×2
    const gain = 30*mult;
    state.xp+=gain;
    bumpVitality(m.vit,+8);
    if(mult===2)toast('🔥 SINERGIA METABÓLICA! +'+gain+' XP (×2)','gold');
    else{toast('✔ +'+gain+' XP','gold');confetti()}
  }else{
    state.streak=0;
    bumpVitality(m.vit,-5);
    toast('✘ Streak zerado — veja a resolução abaixo','error');
  }
  updateHud();saveGame();
  $('#feedbackBox').innerHTML=`
    <div class="feedback ${correct?'':'wrong'}">
      <h4>${correct?'✔ Excelente!':'✘ Não foi dessa vez'}</h4>
      <p>${correct?q.textoOk:q.textoErr}</p>
      <div class="resolucao"><strong>Resposta correta:</strong> ${String.fromCharCode(65+q.correct)}) ${q.options[q.correct]}</div>
    </div>`;
  $('#navBox').style.display='flex';
};
window.nextQuestion=function(){state.currentQ++;renderQuestion()};
function finishMission(){
  const mid=state.currentMission;
  const m=missions.find(x=>x.id===mid);
  if(!state.missionsDone.includes(mid)){
    state.missionsDone.push(mid);
    state.badges.push(mid);
    bumpVitality(m.vit,+10);
    toast('🏅 Badge: '+badges[missions.findIndex(x=>x.id===mid)].name,'gold');
  }
  updateHud();saveGame();
  if(state.missionsDone.length===missions.length){setTimeout(showCertificate,800)}
  else{renderTrail();show('screenTrail');confetti()}
}
function showCertificate(){
  // Badge Ouro: todas as missões + streak máximo registrado >= 3
  const hasOuro = state.streak>=3 || state.xp>=420;
  if(hasOuro && !state.badges.includes('ouro')){state.badges.push('ouro');toast('🏆 BADGE OURO DO HACKATHON!','gold')}
  const vitAvg=Math.round((state.vit.en+state.vit.fn+state.vit.vf)/3);
  const rank= state.xp>=420?'S — Agente Ouro Telessaúde':
              state.xp>=330?'A — Agente Pleno':
              state.xp>=240?'B — Agente em Formação':'C — Recruta Persistente';
  const totalQ=Object.values(questions).flat().length;
  $('#certContent').innerHTML=`
    <div class="certificate">
      <h2>🎓 Certificado — Agência Telessaúde</h2>
      <p>Concedido a</p>
      <h3 style="font-size:1.6rem;margin:.4rem 0;color:var(--gold)">${state.name}</h3>
      ${state.school?`<p style="color:var(--text-muted);font-size:.9rem">${state.school}${state.grade?' · '+state.grade:''}</p>`:''}
      <p>por completar a <strong>Jornada do Equilíbrio Bio-Sócio-Emocional</strong></p>
      <div class="rank">${rank}</div>
      <div class="stats">
        <div class="stat"><div class="num">${state.xp}</div><div class="lbl">Health XP</div></div>
        <div class="stat"><div class="num">${vitAvg}%</div><div class="lbl">Vitalidade Média</div></div>
        <div class="stat"><div class="num">${state.badges.length}</div><div class="lbl">Badges</div></div>
        <div class="stat"><div class="num">${totalQ}</div><div class="lbl">Desafios</div></div>
      </div>
      <p style="color:var(--text-muted);font-size:.9rem;margin-top:1rem">Mentora guia: <strong>${mentors.find(x=>x.id===state.mentor).name}</strong></p>
      <div style="margin-top:1.5rem;display:flex;gap:.8rem;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="window.print()">🖨️ Imprimir</button>
        <button class="btn btn-ghost" onclick="eraseData()">🗑️ Apagar meus dados (LGPD)</button>
        <button class="btn btn-ghost" onclick="location.reload()">🔄 Recomeçar</button>
      </div>
    </div>`;
  show('screenCert');confetti();setTimeout(confetti,800);setTimeout(confetti,1600);
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded',()=>{
  renderMentors();updateHud();
  $('#btnStartTrail').addEventListener('click',startJourney);
  $('#btnStartHero').addEventListener('click',()=>{
    document.getElementById('mentorSection').scrollIntoView({behavior:'smooth'});
  });
  // Oferta de continuação (dados locais, consentidos)
  if(loadGame()){
    updateHud();renderTrail();
    const resumed=confirm('🌿 Encontramos sua jornada salva neste navegador ('+state.name+'). Deseja continuar de onde parou?');
    if(resumed){show('screenTrail')}
    else{localStorage.removeItem(SAVE_KEY)}
  }
});
