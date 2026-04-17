import type { Concept } from '../types/concept'

interface Props {
  concept: Concept
  isExpanded: boolean
  onToggle: () => void
  idToTermEn: Record<string, string>
}

// ── 難度 badge 顏色
const difficultyStyle: Record<string, string> = {
  '初級': 'bg-green-100 text-green-700',
  '中級': 'bg-amber-100 text-amber-700',
  '高級': 'bg-orange-100 text-orange-700',
}

const courseStyle: Record<string, string> = {
  'Google Gen AI Leader': 'bg-blue-100 text-blue-700',
  'iPAS': 'bg-purple-100 text-purple-700',
  '共同': 'bg-slate-100 text-slate-700',
}

function CourseBadges({ courseSystem }: { courseSystem: string }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${courseStyle[courseSystem] ?? 'bg-gray-100 text-gray-600'}`}>
      {courseSystem}
    </span>
  )
}

// ── 小節標題
function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{children}</p>
  )
}

function normalizePronunciationTerm(termEn: string) {
  const leadingAcronymMatch = termEn.match(/^[A-Z][A-Z0-9/& -]*\s+\(([^()]+)\)$/)
  if (leadingAcronymMatch && /[a-z]/.test(leadingAcronymMatch[1])) {
    return leadingAcronymMatch[1].trim()
  }

  const trailingAcronymMatch = termEn.match(/^(.+?)\s+\(([A-Z][A-Z0-9/& -]*)\)$/)
  if (trailingAcronymMatch) {
    return trailingAcronymMatch[1].trim()
  }

  return termEn
}

// ── Web Speech API 發音按鈕
function SpeakButton({ termEn }: { termEn: string }) {
  const speak = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(normalizePronunciationTerm(termEn))
    utt.lang = 'en-US'
    window.speechSynthesis.speak(utt)
  }
  return (
    <button
      onClick={speak}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200
                 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
    >
      ▶ 播放發音
    </button>
  )
}

export default function ConceptCard({ concept, isExpanded, onToggle, idToTermEn }: Props) {
  const {
    conceptId, termEn, termZh, category, difficulty, courseSystem,
    childExplanation, professionalExplanation, mentalModel,
    proTips, exampleSentenceEn, exampleSentenceZh, confusionWithIds,
  } = concept

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ── 卡片標題（永遠顯示，點擊展開） */}
      <div
        className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-gray-900 text-base leading-snug">{termEn}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{termZh}</p>
          </div>
          <span className="text-gray-300 text-xs mt-1 flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          <span className="px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">{category}</span>
          <span className={`px-2 py-0.5 rounded text-xs ${difficultyStyle[difficulty] ?? 'bg-gray-100 text-gray-500'}`}>
            {difficulty}
          </span>
          <CourseBadges courseSystem={courseSystem} />
        </div>
      </div>

      {/* ── 展開內容 */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-5 py-5 space-y-5">

          {/* 小孩版解釋 */}
          <div>
            <SectionLabel>小孩版解釋</SectionLabel>
            <p className="text-sm text-gray-700 leading-relaxed">{childExplanation}</p>
          </div>

          {/* 專業版解釋 */}
          <div>
            <SectionLabel>專業版解釋</SectionLabel>
            <p className="text-sm text-gray-700 leading-relaxed">{professionalExplanation}</p>
          </div>

          {/* 心智模型 */}
          {mentalModel && (
            <div>
              <SectionLabel>心智模型</SectionLabel>
              <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded-lg px-3 py-2 leading-relaxed">
                {mentalModel}
              </p>
            </div>
          )}

          {/* 例句 */}
          {exampleSentenceEn && (
            <div>
              <SectionLabel>例句</SectionLabel>
              <p className="text-sm italic text-gray-700 leading-relaxed">{exampleSentenceEn}</p>
              {exampleSentenceZh && (
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{exampleSentenceZh}</p>
              )}
            </div>
          )}

          {/* 容易混淆 */}
          {confusionWithIds.length > 0 && (
            <div>
              <SectionLabel>容易混淆</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {confusionWithIds.map(id => (
                  <span
                    key={id}
                    className="px-2 py-0.5 rounded border border-amber-200 bg-amber-50 text-amber-700 text-xs"
                  >
                    {idToTermEn[id] ?? id}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pro Tips */}
          {proTips && (
            <div>
              <SectionLabel>Pro Tips</SectionLabel>
              <div className="text-sm text-blue-800 bg-blue-50 border border-blue-100 rounded-lg px-3 py-3 leading-relaxed whitespace-pre-wrap">
                {proTips}
              </div>
            </div>
          )}

          {/* 發音按鈕 + conceptId */}
          <div className="flex items-center justify-between pt-1">
            <SpeakButton termEn={termEn} />
            <span className="text-xs text-gray-300">{conceptId}</span>
          </div>
        </div>
      )}
    </div>
  )
}
