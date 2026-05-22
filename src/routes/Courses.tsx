import { Link } from 'react-router-dom'
import { useCourses } from '../lib/queries/courses'

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

export default function Courses() {
  const { data: courses, isLoading, error } = useCourses()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tüm Kurslar</h1>

      {isLoading && <p className="text-sm text-gray-500">Yükleniyor...</p>}

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      {courses && courses.length === 0 && (
        <p className="text-sm text-gray-500">Henüz kurs eklenmemiş.</p>
      )}

      {courses && courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-video bg-gray-100">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{course.category?.name ?? ''}</p>
                <p className="font-semibold text-sm leading-snug mb-2">{course.title}</p>
                <p className="text-sm font-medium">{formatPrice(course.price, course.currency)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
