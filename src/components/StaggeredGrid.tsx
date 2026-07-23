'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/src/lib/utils'
import { Sparkles, Eye, Wand2 } from 'lucide-react'
import { ShowcaseImage } from '@/src/data/showcase'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
    id: number | string
    title: string
    subtitle: string
    description: string
    icon: React.ReactNode
    content?: React.ReactNode
    image?: string
}

export interface StaggeredGridProps {
    images: ShowcaseImage[]
    bentoItems?: BentoItem[]
    onImageClick?: (img: ShowcaseImage) => void
    centerText?: string
    credits?: {
        madeBy: { text: string; href: string }
        moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    scroller?: string | Element | Window | null
}

export function StaggeredGrid({
    images,
    onImageClick,
    credits = {
        madeBy: { text: "Infinite Labs Studio", href: "#" },
        moreDemos: { text: "Create Masterpiece", href: "/ai-image-generator" }
    },
    className,
    showFooter = false,
    scroller
}: StaggeredGridProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const gridFullRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleLoad = () => {
            document.body.classList.remove('loading')
            setIsLoaded(true)
        }

        // Wait for background images to load
        const imgLoad = imagesLoaded(document.querySelectorAll('.grid__item-img'), { background: true }, handleLoad)

        return () => {
            imgLoad.off('always', handleLoad)
        }
    }, [])

    useEffect(() => {
        if (!isLoaded) return

        // Animate Full Grid
        if (gridFullRef.current) {
            const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
            const numColumns = getComputedStyle(gridFullRef.current).getPropertyValue('grid-template-columns').split(' ').length
            const middleColumnIndex = Math.floor(numColumns / 2)

            const columns: Element[][] = Array.from({ length: numColumns }, () => [])
            gridFullItems.forEach((item: any) => {
                const colAttr = item.getAttribute('data-col');
                const columnIndex = colAttr !== null ? parseInt(colAttr, 10) : 0;
                if (columns[columnIndex]) {
                    columns[columnIndex].push(item)
                }
            })

            columns.forEach((columnItems, columnIndex) => {
                const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2

                gsap.timeline({
                    scrollTrigger: {
                        trigger: gridFullRef.current,
                        scroller: scroller || undefined,
                        start: 'top bottom',
                        end: 'center center',
                        scrub: 1.5,
                    }
                })
                    .from(columnItems, {
                        yPercent: 450,
                        autoAlpha: 0,
                        delay: delayFactor,
                        ease: 'sine.out',
                    })
                    .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                        transformOrigin: '50% 0%',
                        ease: 'sine.out',
                    }, 0)
            })
        }
    }, [isLoaded, scroller])

    // Prepare grid items: fill up to 21 slots for a perfectly balanced 7x3 layout
    const mixedGridItems: ShowcaseImage[] = Array.from({ length: 21 }, (_, i) => images[i % images.length]);

    return (
        <div
            className={cn("relative overflow-hidden w-full", className)}
            style={{
                '--grid-item-translate': '0px',
            } as React.CSSProperties}
        >
            <section className="w-full overflow-x-auto overflow-y-hidden custom-scrollbar py-4 select-none">
                <div ref={gridFullRef} className="grid--full relative min-w-[900px] lg:min-w-0 w-full my-[5vh] h-auto aspect-[1.1] max-w-none p-4 grid gap-4 grid-cols-7 grid-rows-3">
                    <div className="grid-overlay absolute inset-0 z-[15] pointer-events-none opacity-0 bg-white/80 rounded-lg transition-opacity duration-500" />
                    {mixedGridItems.map((item, i) => {
                        if (typeof item === 'object') {
                            return (
                                <figure 
                                    key={`img-${i}`} 
                                    data-col={i % 7} 
                                    className="grid__item m-0 relative z-10 [perspective:800px] will-change-[transform,opacity] group cursor-pointer"
                                    onClick={() => onImageClick?.(item)}
                                >
                                    <div 
                                        className="grid__item-img w-full h-full [backface-visibility:hidden] will-change-transform rounded-xl overflow-hidden shadow-sm border border-zinc-200 bg-zinc-150 flex items-center justify-center transition-all duration-500 ease-out group-hover:scale-105 group-hover:shadow-xl group-hover:border-transparent bg-cover bg-center"
                                        style={{ backgroundImage: `url(${item.url})` }}
                                    >
                                        {/* Gradient Overlay for Hover & Background darkening */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                        {/* Content Container */}
                                        <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col items-start gap-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider">
                                                {item.style}
                                            </span>
                                            <span className="text-xs font-bold text-white tracking-tight drop-shadow-md leading-tight text-left line-clamp-1">
                                                {item.title}
                                            </span>
                                        </div>
                                    </div>
                                </figure>
                            )
                        }
                        return null;
                    })}
                </div>
            </section>

            {showFooter && (
                <footer className="frame__footer w-full p-8 flex justify-between items-center relative z-50 text-neutral-900 uppercase font-medium text-xs tracking-wider">
                    <a href={credits.madeBy.href} className="hover:opacity-60 transition-opacity">{credits.madeBy.text}</a>
                    <a href={credits.moreDemos.href} className="hover:opacity-60 transition-opacity">{credits.moreDemos.text}</a>
                </footer>
            )}
        </div>
    )
}

export default StaggeredGrid;
