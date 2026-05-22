import { useParams, Link } from 'react-router-dom'
import { useCourse } from '../lib/queries/courses'

const formatPrice = (price: number, currency: string) =>
  new Intl.NumberFormat('tr-TR', { style: 'currency', currency }).format(price)

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: course, isLoading, isError } = useCourse(slug)

  if (isLoading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (isError) {
    return <div className="text-center py-12 text-sm text-red-600">Bir hata oluştu.</div>
  }

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-2">Kurs bulunamadı</h1>
        <p className="text-sm text-gray-500 mb-6">Aradığınız kurs mevcut değil.</p>
        <Link to="/courses" className="text-sm underline">
          Tüm kurslara dön
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {course.thumbnail_url && (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div>
          {course.category && (
            <Link to="/categories" className="text-xs text-gray-500 hover:text-gray-900">
              {course.category.name}
            </Link>
          )}
          <h1 className="text-3xl font-bold mt-2 mb-4">{course.title}</h1>
          <p className="text-gray-700 mb-6 whitespace-pre-line">{course.description}</p>
          <div className="text-2xl font-semibold mb-6">
            {formatPrice(course.price, course.currency)}
          </div>
          <button
            type="button"
            className="w-full bg-gray-900 text-white py-3 rounded text-sm font-medium hover:bg-gray-700"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  )
}
