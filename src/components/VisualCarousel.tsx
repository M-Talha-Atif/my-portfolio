'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VisualCarouselProps {
  images?: string[]
}

export default function VisualCarousel({ images = [] }: VisualCarouselProps) {
  // Filter out invalid or empty URLs
  const validImages = images.filter((img) => img && img.trim() !== '')

  const [index, setIndex] = useState(0)

  // If no valid images, return placeholder
  if (validImages.length === 0) {
    return (
      <div className="text-center text-subtext p-8 border border-[rgba(255,255,255,0.05)] rounded-xl">
        No visuals available for this project.
      </div>
    )
  }

  // Handle keyboard navigation
  const next = () => setIndex((prev) => (prev + 1) % validImages.length)
  const prev = () => setIndex((prev) => (prev - 1 + validImages.length) % validImages.length)

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    },
    [validImages.length]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.05)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={validImages[index]}
              alt={`Design ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Thumbnails */}
      <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2">
        {validImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-20 h-14 rounded-md overflow-hidden border ${
              i === index
                ? 'border-[var(--color-accent-solid)]'
                : 'border-transparent opacity-70 hover:opacity-100'
            } transition`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
