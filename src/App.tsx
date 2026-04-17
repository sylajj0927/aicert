import { useState, useMemo } from 'react'
import type { Concept } from './types/concept'
import conceptsRaw from './data/concepts.json'
import ConceptCard from './components/ConceptCard'
import FilterBar from './components/FilterBar'
import IPASPractice from './components/IPASPractice'

type RawConcept = Omit<Concept, 'termEn' | 'termZh' | 'learningOrder'> & {
  termEn?: string
  termZh?: string
  englishTerm?: string
  chineseTerm?: string
  learningOrder?: string | number
}

function normalizeDifficulty(difficulty: string) {
  if (difficulty === '高階' || difficulty === '進階') return '高級'
  return difficulty
}

const concepts: Concept[] = (conceptsRaw as RawConcept[]).map((raw) => ({
  ...raw,
  termEn: raw.termEn ?? raw.englishTerm ?? '',
  termZh: raw.termZh ?? raw.chineseTerm ?? '',
  difficulty: normalizeDifficulty(raw.difficulty),
  learningOrder: Number(raw.learningOrder ?? 0),
}))

export default function App() {
  const [mode, setMode] = useState<'concept' | 'practice'>('concept')
  const [searchQuery, setSearchQuery]         = useState('')
  const [selectedCategory, setSelectedCategory]   = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedCourse, setSelectedCourse]     = useState('')
  const [expandedId, setExpandedId]           = useState<string | null>(null)
  const conceptsWithId = useMemo(
    () => concepts.filter(c => c.conceptId.trim() !== ''),
    []
  )

  // conceptId → termEn 查找表，供 ConceptCard 解析 confusionWithIds
  const idToTermEn = useMemo<Record<string, string>>(() => (
    Object.fromEntries(conceptsWithId.map(c => [c.conceptId, c.termEn]))
  ), [conceptsWithId])

  // 從資料中萃取 filter 選項
  const categories  = useMemo(() => [...new Set(conceptsWithId.map(c => c.category))], [conceptsWithId])
  const difficulties = ['初級', '中級', '高級']
  const courses      = useMemo(() => [...new Set(conceptsWithId.map(c => c.courseSystem))], [conceptsWithId])

  // 篩選邏輯
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return conceptsWithId.filter(c => {
      const matchSearch   = !q
        || c.termEn.toLowerCase().includes(q)
        || c.termZh.includes(searchQuery.trim())
      const matchCategory = !selectedCategory  || c.category    === selectedCategory
      const matchDifficulty = !selectedDifficulty || c.difficulty  === selectedDifficulty
      const matchCourse   = !selectedCourse  || c.courseSystem === selectedCourse
      return matchSearch && matchCategory && matchDifficulty && matchCourse
    })
  }, [conceptsWithId, searchQuery, selectedCategory, selectedDifficulty, selectedCourse])

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="min-h-screen h-dvh bg-gray-50 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-5 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900">AI 魔法詞典</h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {mode === 'concept'
              ? `學習 AI 核心概念 · ${conceptsWithId.length} 個概念`
              : 'IPAS 情境題練習 · 2026-05-16 考前衝刺'}
          </p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setMode('concept')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                mode === 'concept'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              Concept Hub
            </button>
            <button
              onClick={() => setMode('practice')}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                mode === 'practice'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              IPAS Practice
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto space-y-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)]">
          {mode === 'concept' ? (
            <>

              {/* 搜尋 */}
              <input
                type="text"
                placeholder="搜尋英文或中文"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white"
              />

              {/* 篩選 */}
              <FilterBar
                categories={categories}
                difficulties={difficulties}
                courses={courses}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                selectedCourse={selectedCourse}
                onCategoryChange={setSelectedCategory}
                onDifficultyChange={setSelectedDifficulty}
                onCourseChange={setSelectedCourse}
              />

              {/* 筆數 */}
              <p className="text-xs text-gray-400">
                {filtered.length === conceptsWithId.length
                  ? `顯示全部 ${conceptsWithId.length} 個概念`
                  : `找到 ${filtered.length} / ${conceptsWithId.length} 個概念`}
              </p>

              {/* 概念卡片列表 */}
              <div className="space-y-3">
                {filtered.length > 0
                  ? filtered.map(concept => (
                      <ConceptCard
                        key={concept.conceptId}
                        concept={concept}
                        isExpanded={expandedId === concept.conceptId}
                        onToggle={() => handleToggle(concept.conceptId)}
                        idToTermEn={idToTermEn}
                      />
                    ))
                  : (
                    <div className="text-center py-16 text-gray-400">
                      <p className="text-lg">找不到符合的概念</p>
                      <p className="text-sm mt-1">試試其他關鍵字或清除篩選條件</p>
                    </div>
                  )
                }
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-500">
                每次一題、立即解析，優先練習 iPAS 常見情境題思維。
              </p>
              <IPASPractice />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
