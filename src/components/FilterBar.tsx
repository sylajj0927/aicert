interface Props {
  categories: string[]
  difficulties: string[]
  courses: string[]
  selectedCategory: string
  selectedDifficulty: string
  selectedCourse: string
  onCategoryChange: (v: string) => void
  onDifficultyChange: (v: string) => void
  onCourseChange: (v: string) => void
}

interface ChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
        ${selected
          ? 'bg-gray-900 text-white'
          : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'
        }`}
    >
      {label}
    </button>
  )
}

export default function FilterBar({
  categories, difficulties, courses,
  selectedCategory, selectedDifficulty, selectedCourse,
  onCategoryChange, onDifficultyChange, onCourseChange,
}: Props) {
  return (
    <div className="space-y-2">
      {/* 主分類 */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip label="全部分類" selected={!selectedCategory} onClick={() => onCategoryChange('')} />
        {categories.map(cat => (
          <Chip key={cat} label={cat} selected={selectedCategory === cat} onClick={() => onCategoryChange(cat)} />
        ))}
      </div>

      {/* 難度 */}
      <div className="flex flex-wrap gap-2 pb-1">
        <Chip label="全部難度" selected={!selectedDifficulty} onClick={() => onDifficultyChange('')} />
        {difficulties.map(d => (
          <Chip key={d} label={d} selected={selectedDifficulty === d} onClick={() => onDifficultyChange(d)} />
        ))}
      </div>

      {/* 課程系統：mobile dropdown / desktop chips */}
      <div className="md:hidden">
        <select
          value={selectedCourse}
          onChange={e => onCourseChange(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm bg-white
                     focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">全部課程</option>
          {courses.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="hidden md:flex md:gap-2 md:overflow-x-auto md:pb-1">
        <Chip label="全部課程" selected={!selectedCourse} onClick={() => onCourseChange('')} />
        {courses.map(c => (
          <Chip key={c} label={c} selected={selectedCourse === c} onClick={() => onCourseChange(c)} />
        ))}
      </div>
    </div>
  )
}
