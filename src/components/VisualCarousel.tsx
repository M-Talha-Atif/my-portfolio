'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface VisualCarouselProps {
    images?: string[]
}

export default function VisualCarousel({ images = [] }: VisualCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!images || images.length === 0) {
        return <p className="text-subtext text-sm">No images available</p>
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="relative">
            {/* Main Image */}
            <div className="aspect-video relative rounded-lg overflow-hidden bg-[var(--color-surface)]">
                <Image
                    src={images[currentIndex]}
                    alt={`Design ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                    loading={currentIndex === 0 ? 'eager' : 'lazy'}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="tooltip absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm"
                        aria-label="Previous image"
                        data-tooltip="Previous"
                    >
                        <ChevronLeft className="w-5 h-5 text-[var(--color-text-on-dark)]" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="tooltip absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition backdrop-blur-sm"
                        aria-label="Next image"
                        data-tooltip="Next"
                    >
                        <ChevronRight className="w-5 h-5 text-[var(--color-text-on-dark)]" />
                    </button>
                </>
            )}

            {/* Thumbnails - Load only visible ones */}
            {images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                                idx === currentIndex
                                    ? 'border-[var(--color-accent-solid)]'
                                    : 'border-transparent hover:border-[var(--color-border-strong)]'
                            }`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            <div className="text-center mt-2 text-sm text-subtext">
                {currentIndex + 1} / {images.length}
            </div>
        </div>
    )
}