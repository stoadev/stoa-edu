import { Link } from 'react-router-dom'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { Button } from '../components/ui/Button'

export default function Cart() {
  const { items, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <ShoppingCart className="h-14 w-14 text-gray-300 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sepetiniz boş</h1>
        <p className="text-gray-500 text-sm mb-6">Beğendiğiniz kursu sepete ekleyerek başlayın.</p>
        <Link to="/courses">
          <Button variant="primary">Kurslara Göz At</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Sepetim ({items.length})</h1>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-4">
          {items.map(({ course }) => (
            <div
              key={course.id}
              className="flex gap-4 items-start rounded-xl border border-gray-200 bg-white p-4"
            >
              {course.thumbnail_url && (
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  width={120}
                  height={68}
                  loading="lazy"
                  decoding="async"
                  className="w-28 h-16 rounded-lg object-cover shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/courses/${course.slug}`}
                  className="text-sm font-medium text-gray-900 hover:underline line-clamp-2"
                >
                  {course.title}
                </Link>
                {course.category && (
                  <p className="text-xs text-gray-400 mt-1">{course.category.name}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => removeItem(course.id)}
                  aria-label="Sepetten kaldır"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6 sticky top-24">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
            <div className="text-sm text-gray-600 mb-6">
              <span>{items.length} kurs</span>
            </div>
            <Link to="/checkout">
              <Button variant="primary" className="w-full">Ödemeye Geç</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
