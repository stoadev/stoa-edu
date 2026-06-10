import { useQuery } from '@tanstack/react-query'
import type { CourseWithCategory } from '../../types/course'
import { mockCourses } from '../mockData'

interface CoursesFilter {
  search?: string
  categoryId?: string
}

export function useCourses(filter?: CoursesFilter) {
  return useQuery({
    queryKey: ['courses', filter],
    queryFn: (): CourseWithCategory[] => {
      let result = mockCourses.filter((c) => c.is_published)
      if (filter?.search) {
        const q = filter.search.toLowerCase()
        result = result.filter((c) => c.title.toLowerCase().includes(q))
      }
      if (filter?.categoryId) {
        result = result.filter((c) => c.category_id === filter.categoryId)
      }
      return result
    },
  })
}

export function useCourse(slug: string | undefined) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: (): CourseWithCategory | null => {
      if (!slug) return null
      return mockCourses.find((c) => c.slug === slug && c.is_published) ?? null
    },
    enabled: !!slug,
  })
}
