export type IpasTopic =
  | 'Data Processing / Data Literacy'
  | 'Machine Learning'
  | 'No-code / Low-code'
  | 'AI Planning / Strategy'
  | 'Financial AI / Governance'

export type IpasQuestionType = 'basic' | 'scenario'

export interface IpasQuestion {
  id: string
  type: IpasQuestionType
  scenario: string
  topic: IpasTopic
  sourceModule: string
  question: string
  options: [string, string, string, string]
  correctAnswer: number
  explanation: string
  whyNot: string
  difficulty: '初級' | '中級' | '高級'
  tags: string[]
}
