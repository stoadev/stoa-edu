export interface Category {
  id: string
  slug: string
  name: string
  description: string | null
  created_at: string
}

export interface Course {
  id: string
  slug: string
  title: string
  description: string | null
  thumbnail_url: string | null
  price: number
  currency: string
  category_id: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CourseWithCategory extends Course {
  category: Pick<Category, 'id' | 'slug' | 'name'> | null
}
