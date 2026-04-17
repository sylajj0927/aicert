import concepts from '../src/data/concepts.json' with { type: 'json' }

const EXPECTED_COUNT = 31
const REQUIRED_CORE_IDS = [
  'C_AI',
  'C_ML',
  'C_DL',
  'C_GENERATIVE_AI',
  'C_LLM',
  'C_FOUNDATION_MODEL',
  'C_TASK_SPECIFIC_MODEL',
  'C_NLP',
  'C_MODALITY',
  'C_CONTEXT_WINDOW',
  'C_DOWNSTREAM_TASKS',
]

// MVP field mapping assumptions for the frontend dataset:
// CSV `conceptId`            -> JSON `conceptId`
// CSV `mental_model`         -> JSON `mentalModel`
// CSV `confusion_with_ids`   -> JSON `confusionWithIds` (split by `|`)
// CSV `example_sentence_en`  -> JSON `exampleSentenceEn`
// CSV `example_sentence_zh`  -> JSON `exampleSentenceZh`
const REQUIRED_FIELDS = [
  'conceptId',
  'mentalModel',
  'confusionWithIds',
  'exampleSentenceEn',
  'exampleSentenceZh',
]

const OPTIONAL_STRING_FIELDS = ['proTips']
const errors = []

if (!Array.isArray(concepts)) {
  errors.push('Dataset must be an array.')
} else {
  if (concepts.length !== EXPECTED_COUNT) {
    errors.push(`MVP dataset must contain exactly ${EXPECTED_COUNT} concepts, found ${concepts.length}.`)
  }

  const ids = concepts.map((concept) => concept.conceptId)
  const idSet = new Set(ids)

  if (idSet.size !== ids.length) {
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
    errors.push(`Duplicate conceptId found: ${[...new Set(duplicates)].join(', ')}`)
  }

  for (const requiredId of REQUIRED_CORE_IDS) {
    if (!idSet.has(requiredId)) {
      errors.push(`Missing required MVP concept: ${requiredId}`)
    }
  }

  for (const concept of concepts) {
    for (const field of REQUIRED_FIELDS) {
      const value = concept[field]
      const missing = value === undefined
        || value === null
        || value === ''
        || (Array.isArray(value) && value.length === 0 && field !== 'confusionWithIds')

      if (missing) {
        errors.push(`${concept.conceptId || '(missing conceptId)'} is missing required field: ${field}`)
      }
    }

    if (!Array.isArray(concept.confusionWithIds)) {
      errors.push(`${concept.conceptId} confusionWithIds must be an array.`)
    } else {
      for (const refId of concept.confusionWithIds) {
        if (refId === concept.conceptId) {
          errors.push(`${concept.conceptId} must not reference itself in confusionWithIds.`)
        }
        if (!idSet.has(refId)) {
          errors.push(`${concept.conceptId} references missing confusionWithId: ${refId}`)
        }
      }
    }

    for (const field of OPTIONAL_STRING_FIELDS) {
      const value = concept[field]
      if (typeof value === 'string' && value.trim().toLowerCase() === 'null') {
        errors.push(`${concept.conceptId} contains accidental "null" text in optional field: ${field}`)
      }
    }
  }
}

if (errors.length > 0) {
  console.error('MVP dataset validation failed:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(`MVP dataset validation passed for ${concepts.length} concepts.`)
