'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { products, filterProducts, type Category, categories } from '@/lib/products'
import { fallbackImage } from '@/lib/images'

function categoryFallback(category: string): string {
  const labels: Record<string, string> = {
    formalwear: 'Formal Suit',
    wedding: 'Wedding Attire',
    blazers: 'Blazer',
    shirts: 'Dress Shirt',
    'smart-casual': 'Smart Casual',
    accessories: 'Accessories',
    belts: 'Leather Belt',
  }
  const label = labels[category] || 'Product'
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"%3E%3Crect fill="%23F3EEE4"/%3E%3Ctext x="200" y="250" font-family="Georgia,serif" font-size="14" fill="%23806342" text-anchor="middle"%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`
}

function CollectionsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCategory = (searchParams.get('category') as Category) || undefined

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(initialCategory)

  // Keep selectedCategory in sync with URL query param
  useEffect(() => {
    const cat = searchParams.get('category') as Category | null
    setSelectedCategory(cat || undefined)
  }, [searchParams])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    router.replace(`/collections?${params.toString()}`, { scroll: false })
  }, [selectedCategory, router])

  const filteredProducts = useMemo(
    () => filterProducts(selectedCategory, undefined),
    [selectedCategory]
  )

  const categoryLabel = selectedCategory
    ? categories.find((c) => c.value === selectedCategory)?.label
    : null

  return (
    <main id="main-content" role="main" className="pt-16 sm:pt-20">
      <section className="py-16 sm:py-24 bg-ivory" aria-labelledby="collections-heading">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center justify-center gap-2">
                <li>
                  <Link
                    href="/collections"
                    className="font-semibold text-xl sm:text-2xl text-bronze hover:text-bronze/70 transition-colors"
                    aria-current={!categoryLabel ? 'page' : undefined}
                  >
                    Collections
                  </Link>
                </li>
                {categoryLabel && (
                  <>
                    <li aria-hidden="true" className="text-bronze/40 text-xl sm:text-2xl">›</li>
                    <li>
                      <Link
                        href={`/collections?category=${selectedCategory}`}
                        className="font-medium text-lg sm:text-xl text-midnight/80 hover:text-bronze transition-colors"
                        aria-current="page"
                      >
                        {categoryLabel}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>
            <h1
              id="collections-heading"
              className="sr-only"
            >
              Collections{categoryLabel ? ` – ${categoryLabel}` : ''}
            </h1>
            <p className="text-midnight/60 text-lg leading-relaxed">
              Explore our curated menswear collections.
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
              aria-label="Products"
            >
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group bg-white card-hover"
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block relative aspect-[3/4] overflow-hidden"
                    aria-label={`View ${product.name}`}
                  >
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover image-zoom"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = categoryFallback(product.category)
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                  <div className="p-6">
                    <span className="text-bronze text-xs tracking-widest uppercase font-sans mb-2 block">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-midnight mb-2">
                      {product.name}
                    </h3>
                    <p className="text-midnight/60 text-sm line-clamp-2">
                      {product.description}
                    </p>
                    <Link
                      href={`/product/${product.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-bronze hover:text-bronze/80 transition-colors"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-16 h-16 mx-auto mb-4 text-midnight/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h2 className="font-serif text-2xl text-midnight mb-2">No products found</h2>
              <p className="text-midnight/60 mb-6">
                {selectedCategory
                  ? `No products found in ${categoryLabel}.`
                  : 'No products available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function CollectionsPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze" /></div>}>
        <CollectionsContent />
      </Suspense>
      <Footer />
    </>
  )
}