import { useMemo, useState } from 'react'
import type { IpasQuestion, IpasQuestionType, IpasTopic } from '../types/ipasQuestion'
import ipasQuestionsRaw from '../data/ipasQuestions.json'

type TopicFilter = IpasTopic | 'Random Mixed'
type TypeFilter = 'All' | IpasQuestionType

const topicFilters: TopicFilter[] = [
  'Random Mixed',
  'Data Processing / Data Literacy',
  'Machine Learning',
  'No-code / Low-code',
  'AI Planning / Strategy',
  'Financial AI / Governance',
]

const typeFilters: { label: string; value: TypeFilter }[] = [
  { label: 'All', value: 'All' },
  { label: 'Basic', value: 'basic' },
  { label: 'Scenario', value: 'scenario' },
]

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

const ipasQuestions = ipasQuestionsRaw as IpasQuestion[]

export default function IPASPractice() {
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('Random Mixed')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('All')
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isRoundFinished, setIsRoundFinished] = useState(false)

  const questionPool = useMemo(() => {
    return ipasQuestions.filter((q) => {
      const matchTopic = topicFilter === 'Random Mixed' || q.topic === topicFilter
      const matchType = typeFilter === 'All' || q.type === typeFilter
      return matchTopic && matchType
    })
  }, [topicFilter, typeFilter])

  const roundQuestions = useMemo(() => {
    const shuffledIds = shuffle(questionPool.map(q => q.id))
    return shuffledIds.map((id) => ({
      id,
      optionOrder: shuffle([0, 1, 2, 3]),
    }))
  }, [questionPool, round])

  const questionMap = useMemo(
    () => new Map(questionPool.map(q => [q.id, q])),
    [questionPool]
  )

  const currentEntry = roundQuestions[index]
  const currentId = currentEntry?.id
  const currentQuestion = currentId ? questionMap.get(currentId) : undefined

  const resetProgress = () => {
    setRound(prev => prev + 1)
    setIndex(0)
    setSelectedOption(null)
    setSubmitted(false)
    setIsRoundFinished(false)
  }

  const submitAnswer = () => {
    if (selectedOption === null) return
    setSubmitted(true)
  }

  const nextQuestion = () => {
    const isEnd = index >= roundQuestions.length - 1
    if (isEnd) {
      setIsRoundFinished(true)
      return
    }

    setIndex(prev => prev + 1)
    setSelectedOption(null)
    setSubmitted(false)
  }

  const switchTopic = (nextTopic: TopicFilter) => {
    setTopicFilter(nextTopic)
    resetProgress()
  }

  const switchType = (nextType: TypeFilter) => {
    setTypeFilter(nextType)
    resetProgress()
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-500">
        目前沒有可練習的題目。
      </div>
    )
  }

  const optionOrder = currentEntry.optionOrder
  const selectedOriginalIndex = selectedOption === null ? null : optionOrder[selectedOption]
  const isCorrect = submitted && selectedOriginalIndex === currentQuestion.correctAnswer

  if (isRoundFinished) {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
          <p className="text-sm font-semibold text-gray-900">本輪題目已完成</p>
          <p className="text-xs text-gray-500 mt-1">
            已完成 {roundQuestions.length} 題（{topicFilter} / {typeFilter}）。
          </p>
          <button
            onClick={resetProgress}
            className="mt-4 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm"
          >
            Restart this set
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">
        <div>
          <p className="text-xs text-gray-400 mb-2">選擇練習主題</p>
          <div className="flex flex-wrap gap-2">
            {topicFilters.map(topic => (
              <button
                key={topic}
                onClick={() => switchTopic(topic)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  topicFilter === topic
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2">選擇題型</p>
          <div className="flex flex-wrap gap-2">
            {typeFilters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => switchType(value)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                  typeFilter === value
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            題目 {index + 1} / {roundQuestions.length}
          </p>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700">{currentQuestion.topic}</span>
            <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600">{currentQuestion.difficulty}</span>
            <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-700">
              {currentQuestion.type === 'basic' ? 'Basic' : 'Scenario'}
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-700">{currentQuestion.sourceModule}</span>
          </div>
        </div>

        {currentQuestion.type === 'scenario' && currentQuestion.scenario.trim() && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-3">
            <p className="text-xs font-semibold text-slate-600 mb-1">情境</p>
            <p className="text-sm text-slate-700 leading-relaxed">{currentQuestion.scenario}</p>
          </div>
        )}

        <h2 className="text-base font-semibold text-gray-900 leading-relaxed">{currentQuestion.question}</h2>

        <div className="space-y-2">
          {optionOrder.map((optionIndex, idx) => {
            const option = currentQuestion.options[optionIndex]
            const isSelected = selectedOption === idx
            const isAnswer = submitted && optionIndex === currentQuestion.correctAnswer
            const isWrongSelected = submitted && isSelected && optionIndex !== currentQuestion.correctAnswer

            let style = 'border-gray-200 bg-white text-gray-700'
            if (isSelected) style = 'border-gray-500 bg-gray-50 text-gray-900'
            if (isAnswer) style = 'border-green-300 bg-green-50 text-green-800'
            if (isWrongSelected) style = 'border-red-300 bg-red-50 text-red-800'

            return (
              <button
                key={option}
                onClick={() => !submitted && setSelectedOption(idx)}
                disabled={submitted}
                className={`w-full text-left rounded-lg border px-3 py-3 text-sm transition-colors ${style}`}
              >
                {String.fromCharCode(65 + idx)}. {option}
              </button>
            )
          })}
        </div>

        {!submitted ? (
          <button
            onClick={submitAnswer}
            disabled={selectedOption === null}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm disabled:opacity-40"
          >
            提交答案
          </button>
        ) : (
          <div className="space-y-3">
            <div className={`rounded-lg border px-3 py-3 text-sm ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              {isCorrect ? '答對了' : '答錯了'}。正確答案是
              {' '}
              <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-3">
              <p className="text-xs font-semibold text-blue-700 mb-1">解析</p>
              <p className="text-sm text-blue-900 leading-relaxed">{currentQuestion.explanation}</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-3">
              <p className="text-xs font-semibold text-gray-600 mb-1">其他選項為何不佳</p>
              <p className="text-sm text-gray-700 leading-relaxed">{currentQuestion.whyNot}</p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Tags: {currentQuestion.tags.join(' · ')}</p>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
              >
                下一題
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
