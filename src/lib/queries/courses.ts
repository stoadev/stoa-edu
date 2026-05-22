import { useQuery } from '@tanstack/react-query'
import { supabase } from '../supabase'
import type { CourseWithCategory } from '../../types/course'

interface CoursesFilter {
  search?: string
  categoryId?: string
}

export function useCourses(filter?: CoursesFilter) {
  return useQuery({
    queryKey: ['courses', filter],
    queryFn: async (): Promise<CourseWithCategory[]> => {
      let query = supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (filter?.search) {
        query = query.ilike('title', `%${filter.search}%`)
      }
      if (filter?.categoryId) {
        query = query.eq('category_id', filter.categoryId)
      }

      const { data, error } = await query
      if (error) throw error
      return data as CourseWithCategory[]
    },
  })
}

export function useCourse(slug: string | undefined) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: async (): Promise<CourseWithCategory | null> => {
      if (!slug) return null
      const { data, error } = await supabase
        .from('stoaedu_courses')
        .select('*, category:stoaedu_categories(id, slug, name)')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()
      if (error) throw error
      return data as CourseWithCategory | null
    },
    enabled: !!slug,
  })
}
