import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import type { Category } from '../../types/course'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('stoaedu_categories')
        .select('*')
        .order('name', { ascending: true })
      if (error) throw error
      return data as Category[]
    },
  })
}
