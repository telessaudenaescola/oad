# 🏥 OAD Telessaúde na Escola — Estilo de Vida Saudável

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Pronto-brightgreen)](#-como-publicar-no-github-pages)
[![Metodologias](https://img.shields.io/badge/Metodologias-ABP%20%2B%20Gamifica%C3%A7%C3%A3o%20%2B%20Storytelling-blueviolet)](#-metodologias-ativas)

> **Objeto de Aprendizagem Digital (OAD) interativo e gamificado**: nutrição humana, classificação de alimentos (TBCA/Guia Alimentar), regulação do sono, saúde mental, exercício físico e introdução à Telessaúde — com **6 cientistas brasileiras** como mentoras, dinâmica de **Agência Telessaúde** e **simuladores de hábitos de vida**. 

---

## 🎯 Sobre o Projeto

O **OAD Telessaúde na Escola** é uma iniciativa educacional para estudantes do Ensino Médio (1ª a 3ª série), integrando os componentes de Biologia, Química, Educação Física e Tecnologias Digitais (Ciências da Natureza).

O projeto convida o aluno a atuar como um *Agente de Saúde Digital*, combatendo a "Névoa do Esgotamento" em *Bio-Metrópole* por meio do letramento científico e do uso de Tecnologias Digitais de Informação e Comunicação (TDIC).

---

## 🧭 Objetivos Pedagógicos

- Avaliar e calcular necessidades nutricionais e energéticas utilizando a **Tabela Brasileira de Composição de Alimentos (TBCA)**;
- Diferenciar os impactos de alimentos *in natura*, processados e ultraprocessados no metabolismo humano;
- Compreender as inter-relações entre alimentação, higiene do sono, saúde mental e atividade física (homeostase);
- Desenvolver a autonomia para identificar fatores de risco e propor soluções preventivas através da **Telessaúde Escolar**.

**Habilidades BNCC/ENEM**: EM13CNT207 · EM13CNT301 · EM13CNT310 · Matriz ENEM H14/H17.

---

## 🎓 Metodologias Ativas

### 🔹 ABP — Aprendizagem Baseada em Problemas e Missões

| Missão | Tema (Cenário) | Mentora | Desafio / Simulação |
|---|---|---|---|
| **M1** | O Enigma dos Rótulos (Supermercado) | Dra. Bertha Lutz | Análise de rótulos via TBCA vs. Ultraprocessados. |
| **M2** | A Engenharia do Prato (Cantina) | Dra. Zilda Arns | Montagem de refeição balanceada e cálculo VET/TMB. |
| **M3** | O Código do Sono (Quarto) | Dra. Nise da Silveira | Simulação de ciclo circadiano e higiene do sono. |
| **M4** | Mente Sã, Corpo São (Convivência) | Dra. Nise da Silveira | Regulação emocional e *Mindful Eating*. |
| **M5** | A Engrenagem do Movimento (Parque) | Dra. Ruth Nussenzweig | Cálculo de gasto calórico (MET) e treino funcional. |
| **M6** | Rastreio Telessaúde (Lab. Informática)| Dra. Celina Turchi | Formulário de teletriagem e painel epidemiológico. |
| **M7** | A Escultura da Imunidade (Clínica) | Dra. Jacqueline Goes | Eixo intestino-imunidade (Zinco, Vit C, Fibras). |
| **M8** | Hackathon Telessaúde (Boss / Auditório)| Zilda & Jacqueline | Proposta de intervenção comunitária inovadora. |

### 🔹 Gamificação + Storytelling
- 👩‍🔬 **6 mentoras brasileiras históricas e contemporâneas**: Zilda Arns, Nise da Silveira, Bertha Lutz, Ruth Nussenzweig, Celina Turchi e Jacqueline Goes de Jesus.
- 💚 **HUD de Vitalidade Tripla**: o avatar possui barras de Energia Nutricional (EN), Foco Neurocognitivo (FN) e Vigor Físico (VF), alteradas pelas decisões do jogador.
- 🔥 **Health XP e Streak**: multiplicador de pontuação *Sinergia Metabólica* (x2) ativado ao acertar questões consecutivas.
- 🛡️ **Segurança e Privacidade (LGPD)**: os dados ficam apenas no `localStorage` do navegador com opção nativa de apagamento total dos dados pelo usuário no painel de identificação (escola em campo aberto - REA).

### 🔹 Recursos Tecnológicos (H5P Integrado)
- **Simuladores**: Branching scenarios para escolhas de estilo de vida, Drag and Drop para montagem de pratos.
- **Multimídia**: Vídeos interativos, Chart para gráficos epidemiológicos e Cornell Notes para síntese com exportação em PDF.

---

## 📚 Banco de Questões (16 Questões · Feedback Duplo)

- **16 questões inéditas**: abordam classificação NOVA/TBCA, leitura de rótulos, VET/TMB, ritmo circadiano, grelina/leptina, fome emocional, diretrizes OMS, fisiologia do exercício, tele-educação e LGPD.
- **Feedback explicativo duplo**: `textoOk` para reforço positivo e validação do acerto; `textoErr` para correção passo a passo, desconstruindo o equívoco de forma formativa (aprendizado com o erro).

---

## 🖼️ Assets Visuais (Status)

| Asset | Formato | Status atual |
|---|---|---|
| 6 Avatares das Mentoras | PNG gerado por IA | ✅ Finalizado |
| Badge M1 (Detetive de Rótulos) | PNG 3D gerado por IA | ✅ Finalizado |
| Badges M2 ao M8 + Badge Ouro | SVG vetorial | ⚠️ **Versões vetoriais provisórias**. Substituir por artes 3D em atualizações futuras. |
| hero / favicon | IA gerada | ✅ Finalizado |
| Logos (Bio+Tech, Gov. MT, FAPEMAT) | PNG / Tipográfico | ✅ Finalizado |

---

## 🚀 Como Publicar no GitHub Pages

```bash
unzip oad-telessaude-escola.zip
cd oad-telessaude-escola
git init
git add .
git commit -m "🏥 Lançamento OAD Telessaúde na Escola"
git branch -M main
git remote add origin https://github.com/<SEU-USUARIO>/oad-telessaude-escola.git
git push -u origin main
# Settings → Pages → Source: main / (root)
```

**URL final:** `https://<SEU-USUARIO>.github.io/oad-telessaude-escola/`

Uso local: abra `index.html` em qualquer navegador moderno. Como os dados usam `localStorage`, o salvamento do progresso funcionará 100% offline.

---

## 📁 Estrutura do Repositório

```
oad-telessaude-escola/
├── index.html
├── README.md
├── LICENSE
├── css/style.css
├── js/app.js
├── assets/
│   ├── hero.png · favicon.png
│   ├── avatars/  (zilda_arns.png, nise_silveira.png, bertha_lutz.png,
│   │              ruth_nussenzweig.png, celina_turchi.png, jacqueline_goes.png)
│   ├── badges/   (badge_m1.png, badge_m2.svg ... badge_m8.svg, badge_ouro.svg)
│   └── logos/    (biotech_edudesign.png, gov_mato_grosso.png, fapemat.png)
└── docs/
    ├── modelo_conceitual_OAD_telessaude_na_escola.md
    ├── banco_questoes.md
    └── SPRINTS_STATUS.md
```

---

## 🤝 Créditos

- **Projeto**: Telessaúde na Escola
- **Desenvolvimento & Autoria**: Bio+Tech EduDesign
- **Apoios/Logos**: Gov. MT / FAPEMAT
- **Base Científica**: Tabela Brasileira de Composição de Alimentos (TBCA - USP/FoRC) e Guia Alimentar para a População Brasileira.
- **Documentação OAD**: Projeto colaborativo disponibilizado na Wiki integrada.

## 📜 Licença

**MIT** — Recurso Educacional Aberto (REA) livre para uso em qualquer escola, preservando o modelo e segurança de dados do estudante. Veja [LICENSE](LICENSE).

---
<div align="center">

**🇧🇷 Feito para promover a Saúde Escolar e o Letramento Científico 🇧🇷**

</div>
