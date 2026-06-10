import { useQuery } from '@tanstack/react-query'
import type { Category } from '../../types/course'
import { mockCategories } from '../mockData'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: (): Category[] => mockCategories,
  })
}
