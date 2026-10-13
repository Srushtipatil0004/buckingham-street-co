'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { businessConfig } from '@/config/business'
import { products } from '@/lib/products'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Collections', subItems: [
      { name: 'All Collections', href: '/collections' },
      { name: 'Formal Wear', href: '/collections?category=formalwear' },
      { name: 'Wedding & Occasion', href: '/collections?category=wedding' },
      { name: 'Blazers', href: '/collections?category=blazers' },
      { name: 'Shirts', href: '/collections?category=shirts' },
      { name: 'Smart Casuals', href: '/collections?category=smart-casual' },
    ] },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Visit Us', href: '/visit-us' },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
        setIsCollectionsOpen(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsCollectionsOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false) }
  const closeMenu = () => { setIsMenuOpen(false); setIsCollectionsOpen(false) }
  const toggleCollections = () => setIsCollectionsOpen(!isCollectionsOpen)
  const toggleSearch = () => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false) }
  const closeSearch = () => setIsSearchOpen(false)

  const filteredProducts = searchQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  // Premium metallic gradient classes (exclusive to header)
  const shopNameClass = 'font-serif font-extrabold text-3xl sm:text-4xl tracking-tight truncate bg-gradient-to-r from-[#D4A843] via-[#F5D76A] to-[#D4A843] bg-clip-text text-transparent'
  const brandNameClass = 'font-sans font-semibold text-sm sm:text-base tracking-widest uppercase bg-gradient-to-r from-[#A67C52] via-[#C9A96C] to-[#A67C52] bg-clip-text text-transparent'

  return (
    <>
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-midnight/95 backdrop-blur-md border-b border-bronze/20 shadow-sm"
      role="banner"
    >
      <nav className="w-full px-4 sm:px-6 lg:px-12" aria-label="Main navigation">
        {/* Top row – hamburger left, brand centered, search right */}
        <div className="flex items-center justify-between py-3 relative">
          {/* Hamburger menu button */}
          <button
            type="button"
            className="flex items-center p-2 rounded-md text-bronze hover:bg-bronze/10 transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="nav-dropdown"
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Shop identity centered */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 min-w-0 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-ivory rounded"
              aria-label={`${businessConfig.brand.retail} · ${businessConfig.brand.parent} - Home`}
            >
              <span className={shopNameClass}>
                {businessConfig.brand.retail}
              </span>
              <span className="hidden sm:inline-block w-px h-8 bg-midnight/20" aria-hidden="true" />
              <span className={`${brandNameClass} translate-y-[6px]`}>
                {businessConfig.brand.parent}
              </span>
            </Link>
          </div>

          {/* Search button */}
          <button
            type="button"
            className="flex items-center p-2 rounded-md text-bronze hover:bg-bronze/10 transition-colors"
            onClick={toggleSearch}
            aria-expanded={isSearchOpen}
            aria-controls="search-overlay"
            aria-label="Open search"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Dropdown menu anchored to left */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            id="nav-dropdown"
            className="absolute left-4 top-full mt-2 w-56 bg-ivory border border-midnight/10 rounded-lg shadow-lg py-2 animate-fade-in"
            role="menu"
          >
            {navigation.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      type="button"
                      onClick={toggleCollections}
                      className={`w-full text-left px-4 py-2 text-sm tracking-wider uppercase transition-colors ${pathname.startsWith('/collections') ? 'text-bronze font-medium bg-bronze/5' : 'text-midnight/80 hover:text-midnight hover:bg-midnight/5'}`}
                      role="menuitem"
                      aria-expanded={isCollectionsOpen}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <svg className="inline w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollectionsOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>
                    {isCollectionsOpen && (
                      <div className="pl-6 pb-2" role="group" aria-label={`${item.name} subcategories`}>
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={closeMenu}
                            className="block px-4 py-1.5 text-xs tracking-wider uppercase transition-colors text-midnight/70 hover:text-midnight hover:bg-midnight/5"
                            role="menuitem"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-4 py-2 text-sm tracking-wider uppercase transition-colors ${pathname === item.href ? 'text-bronze font-medium bg-bronze/5' : 'text-midnight/80 hover:text-midnight hover:bg-midnight/5'}`}
                    role="menuitem"
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div
            ref={searchRef}
            id="search-overlay"
            className="fixed inset-0 z-50 bg-ivory/98 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="w-full max-w-xl bg-ivory border border-midnight/10 rounded-lg shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-medium text-midnight">Search</h2>
                <button
                  type="button"
                  onClick={closeSearch}
                  className="text-midnight/60 hover:text-midnight transition-colors"
                  aria-label="Close search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, categories…"
                className="w-full px-4 py-3 text-midnight bg-transparent border border-midnight/20 rounded-lg focus:outline-none focus:border-bronze focus:ring-2 focus:ring-bronze/20"
                autoComplete="off"
                aria-label="Search products"
              />
              <div className="mt-4 max-h-64 overflow-y-auto">
                {searchQuery ? (
                  filteredProducts.length > 0 ? (
                    <ul role="list" className="space-y-2">
                      {filteredProducts.slice(0, 10).map(product => (
                        <li key={product.id}>
                          <Link
                            href={`/product/${product.id}`}
                            onClick={closeSearch}
                            className="block px-2 py-2 text-sm text-midnight/80 hover:text-bronze hover:bg-midnight/5 rounded transition-colors"
                          >
                            <span className="font-medium">{product.name}</span>
                            <span className="text-xs text-midnight/50 ml-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('-', ' ')}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-midnight/60 text-center py-4">No products found matching “{searchQuery}”.</p>
                  )
                ) : (
                  <p className="text-midnight/50 text-center py-4">Start typing to search…</p>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}