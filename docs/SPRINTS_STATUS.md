# Status de Produção — OAD Telessaúde na Escola
## Agência Telessaúde: Jornada do Equilíbrio Bio-Sócio-Emocional
**Atualizado em:** 04/09/2026 (4ª sessão — Sprint 3 entregue)

**Repositório oficial:** https://github.com/telessaudenaescola/oad · **Site publicado:** https://telessaudenaescola.github.io/oad/

---

## ✅ Sprint 0 — Fundação e Identidade Visual (CONCLUÍDO)
Estrutura de diretórios · logos (Bio+Tech, Gov. MT, FAPEMAT tipográfico) · CSS base · hero + favicon IA · estilos do painel de identificação com escola em aberto (OAD/REA).

## ✅ Sprint 1 — Mentoras (CONCLUÍDO: 6/6) · Badges (1/9 em PNG)
- 6 mentoras em PNG/IA: Zilda Arns, Nise da Silveira, Celina Turchi, Jaqueline Goes, Bertha Lutz, Ruth Nussenzweig.
- Badge M1 (Detetive de Rótulos) em PNG 3D/IA: `badges/badge_m1.png`.

## ✅ Sprint 2 — Núcleo Gamificado (CONCLUÍDO nesta sessão)

### Engine entregue (`index.html` + `js/app.js` + `css/style.css`)
- 🪪 **Painel de identificação do agente**: nome/codinome, série e **escola em campo aberto** (caráter REA — qualquer escola pode usar);
- 🛡️ **TCLE + LGPD**: checkbox de consentimento obrigatório para iniciar; dados apenas no `localStorage` do navegador (nada vai a servidores); botão **"Apagar meus dados (LGPD)"** no certificado; oferta de continuação de jornada salva com confirmação do usuário;
- 👩‍🔬 **Seleção de mentora** (6 cards com bio);
- 💚 **HUD de Vitalidade Tripla**: barras EN (Energia Nutricional) / FN (Foco Neurocognitivo) / VF (Vigor Físico), atualizadas a cada desafio (+8 acerto / −5 erro no eixo da missão; +10 ao concluir);
- 🔥 **Health XP + Streak ×2 (Sinergia Metabólica)**: 3 acertos consecutivos ativam multiplicador ×2 (+60 XP/questão);
- 🗺️ **Trilha de 8 missões** desbloqueáveis com cards, badges e progresso;
- 🏅 **Galeria de 9 badges** (8 missões + Badge Ouro do Hackathon, concedido a XP ≥ 420 ou streak ≥ 3 no boss final);
- 🎓 **Certificado final** com ranking S/A/B/C, XP, vitalidade média, escola/série, impressão e apagamento LGPD;
- 📚 **16 questões** (2 por missão) com feedback duplo (`textoOk`/`textoErr` com resolução passo a passo), cobrindo: classificação NOVA/TBCA, leitura de rótulos, VET/TMB, calorias vazias, ritmo circadiano, grelina/leptina, fome emocional, mindful eating, diretrizes OMS, fisiologia do exercício, teletriagem/tele-educação, LGPD, zinco/vitamina C/fibras, eixo intestino-imunidade, síntese H14 e proposta H17 (hackathon);
- 🎥 Embed do Ciclo de Palestras (IA na Saúde — Rosa Maria E. M. Costa/UERJ);
- 💾 **Save/Load local** com chave versionada.

### Badges M2–M8 + Ouro
⚠️ Entregues como **arte vetorial SVG funcional** (`badge_m2.svg` … `badge_m8.svg`, `badge_ouro.svg`) — geração dos PNGs 3D segue bloqueada por créditos. Substituir pelos arquivos IA mantendo os mesmos nomes/caminhos (basta trocar extensão no `badges[]` do `app.js`).

## ✅ Sprint 3 — Interações M1–M4 (CONCLUÍDO nesta sessão)

Alinhamentos com o repositório publicado:
- Avatares renomeados para o padrão oficial (`nise_silveira.png`, `celina_turchi.png`, `jacqueline_goes.png`);
- Vídeo da tela inicial alinhado ao site publicado (explainer de telessaúde, Dr. Gabriel de Paula — `qKZHJNGVAfs`);
- Novo módulo `js/interactions.js` conectado ao engine via `renderInteraction(mid)`.

Interações implementadas (integradas com XP, Vitalidade Tripla e confetti):
- **M1 · Detetive de Rótulos** — Drag-and-drop/toque de 12 alimentos nas 4 categorias NOVA (in natura / ingredientes culinários / processados / ultraprocessados), +5 XP por acerto, placar em tempo real, animação de erro (shake);
- **M2 · Mestre da TBCA** — Simulador de Prato (7 alimentos com dados reais TBCA, sliders 0–300 g, cálculo ao vivo de kcal/carboidratos/proteínas/gorduras + feedback nutricional) e Calculadora VET/TMB (Mifflin-St Jeor com sexo, idade, peso, altura e fator de atividade), +10 XP por uso correto;
- **M3 · Guardião do Sono** — Protocolo interativo de Higiene do Sono (6 hábitos para julgar como ✅ ajuda / ❌ prejudica, com explicações) + Simulador de Ritmo Circadiano (slider de horário de dormir → impacto em melatonina, cortisol, grelina/leptina);
- **M4 · Mente Sã** — Árvore de Decisão "A Tarde da Nota Baixa": branching narrative com 9 nós, múltiplos caminhos (impulso/pausa/confusão → aprendizado), recompensas de +20/+30 XP por insight.

**Validação técnica:** sintaxe JS OK (`app.js` + `interactions.js`), integração conferida (5 pontos de injeção), 2 scripts carregados no `index.html`.

## ⬜ Sprints 4–6 — Pendentes
- **Sprint 4**: M5–M8 interativas (calculadora MET; formulário de teletriagem + gráficos; flashcards imunomoduladores; hackathon com rubrica);
- **Sprint 5**: Camada Telessaúde (página tele-educação em nova guia; Ciclo de Palestras completo — 5 dias; Cornell Notes com exportação PDF; canal de dúvidas);
- **Sprint 6**: Wiki colaborativo (TCLE, LGPD, BNCC/BNCC Computação, uso responsável de IA, Sprints), QA, README final, ZIP e deploy GitHub Pages.

---

## ▶️ Retomada
**"Continuar o OAD Telessaúde no Sprint 3"** — missões interativas M1–M4 já têm teoria e questões prontas no engine; falta implementar as interações especiais (drag-and-drop, simuladores) descritas no `modelo_conceitual_OAD_telessaude.md`.
