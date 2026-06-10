import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { CourseWithCategory } from '../types/course'

interface CartItem {
  course: CourseWithCategory
}

interface CartContextValue {
  items: CartItem[]
  addItem: (course: CourseWithCategory) => void
  removeItem: (courseId: string) => void
  clearCart: () => void
  isInCart: (courseId: string) => boolean
  total: number
}

const STORAGE_KEY = 'stoaedu_cart'

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addItem(course: CourseWithCategory) {
    setItems((prev) =>
      prev.some((i) => i.course.id === course.id) ? prev : [...prev, { course }],
    )
  }

  function removeItem(courseId: string) {
    setItems((prev) => prev.filter((i) => i.course.id !== courseId))
  }

  function clearCart() {
    setItems([])
  }

  function isInCart(courseId: string) {
    return items.some((i) => i.course.id === courseId)
  }

  const total = items.reduce((sum, i) => sum + i.course.price, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
