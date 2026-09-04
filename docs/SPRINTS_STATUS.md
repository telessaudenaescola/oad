# Status de Produção — OAD Telessaúde na Escola
## Agência Telessaúde: Jornada do Equilíbrio Bio-Sócio-Emocional
**Atualizado em:** 04/09/2026 (3ª sessão — Sprint 2 entregue)

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

## ⬜ Sprints 3–6 — Pendentes
- **Sprint 3**: M1–M4 interativas (drag-and-drop NOVA/TBCA; simulador de prato + VET/TMB; protocolo de higiene do sono; branching de fome emocional);
- **Sprint 4**: M5–M8 interativas (calculadora MET; formulário de teletriagem + gráficos; flashcards imunomoduladores; hackathon com rubrica);
- **Sprint 5**: Camada Telessaúde (página tele-educação em nova guia; Ciclo de Palestras completo — 5 dias; Cornell Notes com exportação PDF; canal de dúvidas);
- **Sprint 6**: Wiki colaborativo (TCLE, LGPD, BNCC/BNCC Computação, uso responsável de IA, Sprints), QA, README final, ZIP e deploy GitHub Pages.

---

## ▶️ Retomada
**"Continuar o OAD Telessaúde no Sprint 3"** — missões interativas M1–M4 já têm teoria e questões prontas no engine; falta implementar as interações especiais (drag-and-drop, simuladores) descritas no `modelo_conceitual_OAD_telessaude.md`.
