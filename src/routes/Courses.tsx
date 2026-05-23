import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCourses } from '../lib/queries/courses'
import { useCategories } from '../lib/queries/categories'
import { formatPrice } from '../lib/format'

export default function Courses() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { data: categories } = useCategories()
  const { data: courses, isLoading, isError } = useCourses({
    search: search.trim() || undefined,
    categoryId: selectedCategory ?? undefined,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside>
          <h2 className="font-semibold text-sm mb-3">Kategoriler</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                  selectedCategory === null ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                Tümü
              </button>
            </li>
            {categories?.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                    selectedCategory === cat.id ? 'bg-gray-100 font-medium' : ''
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          <h1 className="text-2xl font-bold mb-6">Tüm Kurslar</h1>
          <input
            type="text"
            placeholder="Kurs ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border rounded px-3 py-2 text-sm mb-6 outline-none focus:ring-2 focus:ring-gray-900"
          />

          {isLoading && <div className="text-sm text-gray-500">Yükleniyor...</div>}
          {isError && <div className="text-sm text-red-600">Bir hata oluştu.</div>}
          {courses && courses.length === 0 && (
            <div className="text-sm text-gray-500">Sonuç bulunamadı.</div>
          )}
          {courses && courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.slug}`}
                  className="group border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {course.thumbnail_url && (
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={course.thumbnail_url}
                        alt={course.title}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    {course.category && (
                      <p className="text-xs text-gray-500">{course.category.name}</p>
                    )}
                    <h3 className="font-semibold mt-1">{course.title}</h3>
                    <p className="text-sm mt-2 font-medium">
                      {formatPrice(course.price, course.currency)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
