import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import type { CourseWithCategory } from '../../types/course'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async (): Promise<CourseWithCategory[]> => {
      const { data, error } = await supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data as CourseWithCategory[]
    },
  })
}
