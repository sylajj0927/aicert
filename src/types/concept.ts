export interface Concept {
  conceptId: string
  termEn: string
  termZh: string
  childExplanation: string
  professionalExplanation: string
  category: string
  learningGroup: string
  learningOrder: number
  courseSystem: string   // 'Google Gen AI Leader' | 'iPAS' | '共同'
  difficulty: string     // '初級' | '中級' | '高級'
  proTips: string
  mentalModel: string
  confusionWithIds: string[]
  exampleSentenceEn: string
  exampleSentenceZh: string
}

// CSV 欄位名稱 ↔ 型別欄位名稱對應表
// 英文詞彙              → termEn
// 中文詞彙              → termZh
// 小孩版解釋            → childExplanation
// 專業版解釋            → professionalExplanation
// 主分類               → category
// 學習群組              → learningGroup
// 學習順序              → learningOrder
// 課程系統              → courseSystem
// 難度                 → difficulty
// Pro Tips            → proTips
// mental_model        → mentalModel
// confusion_with_ids  → confusionWithIds  (string split by | → string[])
// example_sentence_en → exampleSentenceEn
// example_sentence_zh → exampleSentenceZh
