# PROJECT_STATUS.md

Last updated: 2026-04-15  
Current phase: Concept Hub / Learning Mode MVP + IPAS Practice MVP  
Project: AI Magic Dictionary

---

## 1. Project Overview

AI Magic Dictionary is not just a quiz site or a flashcard tool.

It is a concept-centered AI learning product designed to help users:

1. understand core AI concepts in simple language, including “8-year-old friendly” explanations
2. prepare for AI-related certifications, currently focused on Google Gen AI Leader and iPAS, with future expansion potential
3. learn AI English, including vocabulary, example sentences, and pronunciation

The product is built around **concepts**, with a lightweight iPAS practice mode for exam preparation.

---

## 2. Product Core Structure

Each concept is intended to connect to:

- English term
- Chinese term
- child-friendly explanation
- professional explanation
- mental model
- Pro Tips
- example sentence in English
- example sentence in Chinese
- pronunciation
- confusion_with_ids
- future quiz / progress linkage

Current MVP focus is:
- **Concept Hub / Learning Mode**
- **IPAS Practice**

---

## 3. Current MVP Scope

### In scope now
- concept browsing
- concept search
- concept filtering
- concept detail reading
- child explanation / professional explanation
- mental model
- example sentences
- pronunciation
- confusion concept display
- IPAS Practice topic + type filtering
- IPAS Practice single-question flow (submit → reveal answer/explanation/whyNot → next)
- IPAS Practice round flow (randomized order, no-repeat per round, explicit restart action)
- IPAS Practice local dataset (`src/data/ipasQuestions.json`)

### Explicitly out of scope for now
- full exam engine / full platform merge
- progress tracking
- dashboard
- PWA
- IndexedDB / Dexie
- Zustand
- backend API
- GitHub Actions
- full generic question authoring platform
- full multi-page app architecture

The current goal is to keep the MVP small, conservative, concept-centered, and exam-practice-ready.

---

## 4. Current Data Status

### Source master file
Canonical source CSV:
- `/Users/huapeichang/Sylvia_Cert_Coach/AI learning Project/ai_vocabulary_restructured.csv`

Important:
- use only the canonical root CSV above as source of truth
- ignore the duplicate CSV under `AI Magic  (CSV)`

### Current source columns
Original fields include:
- 英文詞彙
- 中文詞彙
- 小孩版解釋
- 專業版解釋
- 主分類
- 學習群組
- 學習順序
- 課程系統
- 難度
- Pro Tips
- 已審閱

Added fields include:
- conceptId
- mental_model
- confusion_with_ids
- example_sentence_en
- example_sentence_zh

### Source CSV enrichment status
The canonical root CSV currently contains:
- **156 total rows**
- **156 enriched concepts** with assigned `conceptId`

Progress summary:
- Batch 1: first 11 core concepts
- Batch 2: second curated batch of 5 concepts
- Batch 3 through Batch 5: 15 concepts completed on 2026-04-09
- Batch 6 through Batch 9: 40 concepts completed by 2026-04-10
- 2026-04-11: enrichment progressed to 111 total concepts, Batch 12 and Batch 13 completed, and the bad duplicate Decision Tree row was removed
- 2026-04-12: Batch 14 and Batch 15 are completed; enrichment progressed to 131 concepts
- 2026-04-12: Batch 16 is completed; enrichment progressed to 141 concepts
- 2026-04-12: Batch 17 completed; `C_INSTITUTIONAL_SUPPRESSION` follow-up brought enrichment to 152 concepts
- 2026-04-12: single-concept follow-ups for `C_PRACTITIONERS` and `C_SKEWED_SAMPLES` are completed; enrichment progressed to 154 concepts
- 2026-04-15 (latest): PCF (`C_FACTOR_ANALYSIS`) and LDA (`C_LATENT_DIRICHLET_ALLOCATION`) enrichment completed; enrichment progressed to 156 concepts — all conceptId blanks resolved

For all enriched concepts, the following fields have been filled:
- `conceptId`
- `mental_model`
- `confusion_with_ids`
- `example_sentence_en`
- `example_sentence_zh`

Remaining unresolved concepts:
- none

All source-data concept enrichment is now complete.

Skewed Samples note:
- source wording was cleaned up before enrichment so `C_SKEWED_SAMPLES` is clearly distinct from `C_SKEWED_DATA`

### Current MVP frontend dataset
Official MVP frontend dataset:
- `src/data/concepts.json`

Current synced dataset scope:
- `src/data/concepts.json` contains **156 rows** synced from the canonical root CSV

Current alignment:
- canonical root CSV total rows: **156**
- canonical root CSV enriched concepts: **156**
- frontend `src/data/concepts.json`: **156 total rows** (synced)
- frontend render-safe concepts in `App.tsx` (non-empty `conceptId`): **156**
- missing conceptIds among enriched concepts: **0**
- duplicate conceptIds: **0**
- blank `conceptId` rows are excluded from rendering for key/state safety
- PCF (`C_FACTOR_ANALYSIS`) and LDA (`C_LATENT_DIRICHLET_ALLOCATION`) now render correctly in frontend
- PCF/LDA English and Chinese terms display correctly
- PCF/LDA child/professional explanations display correctly
- pronunciation path remains working via Web Speech API

Decision Tree cleanup:
- the bad duplicate Decision Tree row was removed
- `C_DECISION_TREE` remains as the only valid Decision Tree record

---

## 5. Confirmed Data Rules

### conceptId
Naming rule:
- use `C_` prefix
- prefer industry-standard abbreviation
- if no common abbreviation exists, use full English uppercase with underscores

Examples:
- `C_AI`
- `C_ML`
- `C_DL`
- `C_GENERATIVE_AI`
- `C_LLM`

### confusion_with_ids
- multiple values use `|`
- do not use commas
- must reference existing concept ids
- must not include the concept’s own id

### 課程系統 allowed values
- `Google Gen AI Leader`
- `iPAS`
- `共同`

### 已審閱
- only allowed value: `TRUE`

### Pro Tips
- may be blank
- blank should remain blank
- do not use literal `"null"`

### Field mapping note
Source CSV uses source-style field names such as:
- `mental_model`
- `confusion_with_ids`
- `example_sentence_en`
- `example_sentence_zh`

Frontend uses mapped camelCase field names such as:
- `mentalModel`
- `confusionWithIds`
- `exampleSentenceEn`
- `exampleSentenceZh`

This mapping should remain stable unless intentionally updated.

---

## 6. Completed Concept Batches

Historical milestone summary:
- Batch 1 and Batch 2 established the first 16 core concepts.
- Batch 3 through Batch 5 added 15 concepts on 2026-04-09 and synced the frontend to 31 concepts.
- Batch 6 through Batch 9 added 40 concepts by 2026-04-10.
- 2026-04-11 enrichment and cleanup brought the canonical root CSV and frontend dataset to 111 aligned concepts.
- 2026-04-12 completed Batch 14 and Batch 15, followed by Batch 16.
- 2026-04-12 completed Batch 17 plus single-concept follow-ups for `C_INSTITUTIONAL_SUPPRESSION`, `C_PRACTITIONERS`, and `C_SKEWED_SAMPLES`.

All enriched concepts include:
- `conceptId`
- `mental_model`
- `confusion_with_ids`
- `example_sentence_en`
- `example_sentence_zh`

Special confirmed cases:
- `C_DL` must have `confusion_with_ids = C_ML|C_AI`
- `C_DECISION_TREE` is the only valid Decision Tree record after duplicate-row cleanup

---

## 7. Current Implementation Status

The current prototype is already running as a working MVP-level Concept Hub + IPAS Practice.

Implemented:
- React + Vite + TypeScript + Tailwind project scaffold
- search by English/Chinese term
- filtering by category, difficulty, and course
- concept detail expansion
- child explanation display
- professional explanation display
- mental model display
- example sentence display
- confusion concepts display
- browser-based pronunciation
- local frontend dataset in `src/data/concepts.json`
- controlled frontend sync completed to canonical root CSV (156 rows)
- frontend safety fix: blank `conceptId` rows are excluded from rendering and ID-based UI state
- local frontend UI manually verified after sync and working normally
- IPAS Practice mobile scrolling hotfix completed in `src/App.tsx`:
  - root cause: app layout relied on document-level scrolling; on mobile viewport behavior this could truncate effective scroll range for long IPAS practice content
  - layout fix: convert App into a shell (`flex flex-col` + `h-dvh`) and make `main` the explicit vertical scroll container (`flex-1 min-h-0 overflow-y-auto`)
  - result: mobile can now scroll to submit/answer/explanation/why-not/next-question sections end-to-end
  - validation: `npm run build` passed after the fix
- IPAS Practice round reusability update completed in `src/components/IPASPractice.tsx`:
  - question order stays randomized per selected topic + type filter round, with no repeats in the same round
  - answer option order is now randomized per question
  - round end no longer auto-restarts; user now gets a clear `Restart this set` action
  - topic/type combined filtering remains supported and Concept Hub behavior remains unchanged
- IPAS Practice dataset expansion completed in `src/data/ipasQuestions.json`:
  - added **28** new exam-oriented iPAS questions (data-only scope; no UI/logic changes)
  - current total: **50** questions
  - current type mix: **14 basic** / **36 scenario** (about 28% / 72%)
  - topic coverage after expansion:
    - Data Processing / Data Literacy: 11
    - Machine Learning: 10
    - No-code / Low-code: 9
    - AI Planning / Strategy: 11
    - Financial AI / Governance: 9
  - difficulty coverage after expansion: 初級 13 / 中級 27 / 高級 10
  - validation: JSON schema checks passed and `npm run build` passed

The current structure is intentionally simple and should remain conservative during MVP.

---

## 8. Validation / QA Status

Current validation assets include:
- `data_validation_rules.md`
- `scripts/validate-mvp-data.mjs`
- `MVP_DATASET.md`

Current executable MVP check includes:
- unique conceptId
- valid confusionWithIds references
- no self-reference in confusionWithIds
- required fields present for shipped MVP concepts
- no accidental `"null"` string in optional fields
- field mapping assumptions documented for MVP
- IPAS Practice dataset schema integrity (question type/options/correct answer range)

### Current validation outcome
The source CSV enrichment review is currently considered aligned with the defined rules for the completed concept set.

Confirmed:
- no duplicate `conceptId`
- `confusion_with_ids` uses `|` correctly
- no self-reference in `confusion_with_ids`
- referenced ids exist
- no accidental `"null"` strings introduced
- `課程系統` values remain within allowed values
- `已審閱` values are standardized as `TRUE`

Status:
- source CSV enrichment checks have passed for the current **156 enriched concepts**
- current source CSV review for the enriched concepts is acceptable
- bad duplicate Decision Tree row has been removed
- `C_DECISION_TREE` remains the only valid Decision Tree record

Important note:
- frontend validation / sync status now reflects canonical-root alignment
- canonical root CSV and frontend dataset are currently aligned (source rows 156 / enriched 156 / frontend JSON 156 / render-safe 156 / missing conceptIds 0 / duplicate conceptIds 0)
- the frontend dataset fully matches the canonical root CSV

---

## 9. UX Fixes Already Completed

The following MVP fixes have already been completed:

### Data / content
- suspicious `C_NLP` Pro Tips content is not shown in the shipped frontend dataset
- source-level cleanup is deferred for later

### Pronunciation
- pronunciation was adjusted so terms like `Artificial Intelligence (AI)` read the main English term instead of awkwardly reading the acronym together

### Copyability
- concept text is now selectable/copyable

### Mobile filter hierarchy
Current mobile filter direction:
- search input on its own row
- category remains chip-based / horizontally browsable
- difficulty is directly visible
- course filter currently uses dropdown/select

### Desktop filter hierarchy
Current desktop filter direction:
- course filter remains inline and directly visible as options/chips

---

## 10. Known Issues / Deferred Items

### Known content issue
- `C_NLP` Pro Tips in source data is suspected to be incorrect
- current frontend dataset hides it
- proper source cleanup is still pending

### Mobile course filter UX
- current mobile “全部課程” dropdown/select is functionally acceptable for MVP
- however, the current display feels too engineering-oriented and needs future UI/UX polish
- keep current version for MVP for now

### Future upgrade direction
- mobile course filter may later be upgraded to a **Bottom Sheet**
- do not implement Bottom Sheet yet during current MVP phase

### Frontend sync status
- canonical root CSV now includes **156 total rows** and **156 enriched concepts**
- frontend dataset `src/data/concepts.json` is **156 total rows** and synced
- frontend render-safe scope is **156 concepts**
- sync result (post-sync): source rows 156 / enriched 156 / frontend JSON 156 / render-safe 156 / missing conceptIds 0 / duplicate conceptIds 0
- validation for source enrichment has passed
- PCF and LDA frontend rendering + terms + explanations were verified; pronunciation still works

---

## 11. What Not To Do Yet

Do not expand scope into these areas yet:
- full exam engine / full platform merge
- progress tracking
- PWA
- IndexedDB / Dexie
- Zustand
- backend API
- large architecture refactor
- aggressive component renaming
- full CSV-to-JSON automation pipeline
- broad UI redesign

The priority is still:
**stabilize Concept Hub + IPAS Practice MVP with conservative iterations.**

---

## 12. Recommended Next Step

Current state is already post-sync and post-expansion:
- Concept Hub MVP and IPAS Practice MVP are both implemented
- IPAS Practice dataset is **50 questions** with **14 basic / 36 scenario**
- mobile scroll fix and round reusability flow are completed

Most reasonable next step:
- continue conservative quality iteration on existing MVP scope:
  - targeted question-quality review and small batch curation for iPAS prep
  - focused QA on mobile/desktop practice flow and Concept Hub stability
  - maintain data consistency checks without introducing large new systems

Do not jump to large-system features yet.

---

## 13. AI Collaboration Guidance

Recommended collaboration split for this project:

### ChatGPT / Claude
Use for:
- architecture thinking
- data review
- task breakdown
- prompt writing
- spec clarification
- validation logic review
- prioritization

### Codex / Gemini CLI / coding agents
Use for:
- code changes
- local file edits
- small UI fixes
- validation script work
- build/test execution
- implementation of clearly scoped tasks

### Human decision role
The human should remain responsible for:
- product judgment
- scope control
- priority decisions
- MVP boundary decisions
- final acceptance review

AI should support execution and structured thinking, not replace product judgment.

---

## 14. Quick Start for New LLM / CLI Sessions

If you are a coding agent or LLM entering this project fresh:

1. read this file first
2. treat this as an existing MVP project, not a new project
3. preserve the concept-centered product direction
4. keep scope conservative
5. avoid overengineering
6. do not introduce large new systems unless explicitly requested
7. when in doubt, prioritize the current Concept Hub + IPAS Practice MVP

Important:
- current frontend MVP dataset is `src/data/concepts.json`
- current validation rules are documented in `data_validation_rules.md`
- current MVP dataset note is in `MVP_DATASET.md`
- canonical root CSV is now at **156 enriched concepts** across **156 total rows** — all conceptId blanks resolved
- frontend JSON dataset is **156 total rows** and synced from canonical root CSV
- frontend render-safe scope is **156 concepts** (`App.tsx` still excludes blank `conceptId`, and none remain)
- latest sync check: source rows 156 / enriched 156 / frontend JSON 156 / render-safe 156 / missing conceptIds 0 / duplicate conceptIds 0
- PCF/LDA now render correctly with correct English/Chinese terms and explanations; pronunciation still works
- the bad duplicate Decision Tree row has been removed; `C_DECISION_TREE` remains the only valid Decision Tree record
- IPAS Practice current dataset is `src/data/ipasQuestions.json` with **50 questions** (**14 basic / 36 scenario**)
- IPAS Practice mobile scrolling and round reusability updates are already completed; keep improvements conservative
