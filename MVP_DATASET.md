# MVP Dataset v0.1

This project currently treats [`src/data/concepts.json`](./src/data/concepts.json) as the official frontend dataset for Concept Hub / Learning Mode MVP v0.1.

Current scope:

- exactly 16 shipped concepts
- frontend-only static dataset
- no automatic CSV import in this MVP prototype

Current status note:

- source CSV is the reference/progress context
- `src/data/concepts.json` is the shipped frontend source of truth

Field mapping assumptions between source CSV and frontend JSON:

- `conceptId` -> `conceptId`
- `mental_model` -> `mentalModel`
- `confusion_with_ids` -> `confusionWithIds`
- `example_sentence_en` -> `exampleSentenceEn`
- `example_sentence_zh` -> `exampleSentenceZh`

Notes:

- `confusion_with_ids` is stored as a `|`-delimited string in CSV, and as a string array in frontend JSON
- the known suspicious `C_NLP` Pro Tips content is intentionally blanked in the shipped MVP dataset to avoid showing unverified content to users
- source CSV cleanup remains a separate data task and is out of scope for this MVP prototype
