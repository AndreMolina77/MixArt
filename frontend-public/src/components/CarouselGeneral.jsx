import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"

const ImageCarousel = ({ images }) => {
    const [current, setCurrent] = useState(0);
    const [controlsVisible, setControlsVisible] = useState(true);
    const timerRef = useRef(null);
    const containerRef = useRef(null);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const pauseOnHover = () => {
            clearTimeout(timerRef.current);
            setControlsVisible(true);
        };

        const resume = () => {
            setControlsVisible(true);
            timerRef.current = setTimeout(nextSlide, 5000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mouseenter', pauseOnHover);
            container.addEventListener('mouseleave', resume);
        }

        timerRef.current = setTimeout(nextSlide, 5000);

        return () => {
            clearInterval(timerRef.current);
            if (container) {
                container.removeEventListener('mouseenter', pauseOnHover);
                container.removeEventListener('mouseleave', resume);
            }
        };
    }, [images]);

    const slideVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-lg group"
            style={{  margin: '0 auto' }}
        >
            <div className="relative w-full">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={current}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={images[current]}
                            alt={`Obra de Arte ${current + 1}`}
                            className="w-full h-auto rounded-lg object-cover"
                            style={{ maxHeight: '300px' }}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {controlsVisible && (
                    <>
                        <button
                            onClick={prevSlide}
                            className={cn(
                                "absolute left-4 top-1/2 transform -translate-y-1/2",
                                "bg-white/50 text-white p-2 rounded-full z-10",
                                "hover:bg-white/70",
                                "transition-colors duration-200",
                                "shadow-md"
                            )}
                            aria-label="Slide anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className={cn(
                                "absolute right-4 top-1/2 transform -translate-y-1/2",
                                "bg-white/50 text-white p-2 rounded-full z-10",
                                "hover:bg-white/70",
                                "transition-colors duration-200",
                                "shadow-md"
                            )}
                            aria-label="Siguiente Slide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "w-3 h-3 rounded-full",
                                        index === current ? 'bg-white' : 'bg-gray-400 hover:bg-white/80',
                                        "transition-colors duration-300"
                                    )}
                                    onClick={() => setCurrent(index)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImageCarousel;
