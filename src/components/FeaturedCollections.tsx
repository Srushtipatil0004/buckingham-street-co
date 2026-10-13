'use client'

import Link from 'next/link'
import Image from 'next/image'
import { categories, Category } from '@/lib/products'
import { getCategoryImage, fallbackImage } from '@/lib/images'

interface CategoryCardProps {
  category: Category
  index: number
  label?: string
}

function CategoryCard({ category, index, label }: CategoryCardProps) {
  const categoryData = categories.find((c) => c.value === category)
  if (!categoryData) return null

  const displayLabel = label ?? categoryData.label
  const imageSrc = getCategoryImage(category)

  return (
    <Link
      href={`/collections?category=${category}`}
      className="group flex flex-col bg-white rounded-none card-hover overflow-hidden"
      aria-label={`View ${displayLabel} collection`}
    >
      <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover image-zoom"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = fallbackImage
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-midnight/20 to-transparent group-hover:from-midnight/70 transition-opacity duration-300" />
      </div>

      <div className="p-4 text-center">
        <h3 className="font-serif text-lg sm:text-xl font-medium text-midnight flex items-center justify-center gap-1">
          {displayLabel}
          <span className="text-bronze" aria-hidden="true">›</span>
        </h3>
      </div>
    </Link>
  )
}

export function FeaturedCollections() {
  const featuredCategories: Category[] = [
    'formalwear',
    'wedding',
    'blazers',
    'shirts',
    'smart-casual',
  ]

  const customLabels: Record<Category, string> = {
    formalwear: 'Formal Wear',
    wedding: 'Wedding Occasions',
    blazers: 'Blazers',
    shirts: 'Shirt',
    'smart-casual': 'Smart Casuals',
  }

  return (
    <section
      className="py-20 sm:py-28 lg:py-32 bg-ivory"
      aria-labelledby="collections-heading"
    >
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2
            id="collections-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-midnight mb-4"
          >
            Featured Collections
          </h2>
          <p className="text-midnight/60 text-lg leading-relaxed">
            Each collection is carefully curated to reflect the pinnacle of
            menswear craftsmanship and contemporary style.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          role="list"
          aria-label="Featured collections"
        >
          {featuredCategories.map((category, index) => (
            <CategoryCard
              key={category}
              category={category}
              index={index}
              label={customLabels[category]}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="btn-secondary inline-flex"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  )
}