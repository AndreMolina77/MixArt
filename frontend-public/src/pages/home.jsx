import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/productcard';

// Datos de las subcategorías
const subcategories = [
    { name: 'Impresionismo', icon: '🎨' },
    { name: 'Cubismo', icon: '🔳' },
    { name: 'Renacimiento', icon: '🏛️' },
    { name: 'Surrealismo', icon: '👁️' },
    { name: 'Barroco', icon: '🎻' },
    { name: 'Pop Art', icon: '💥' },
];

const SubcategoriesCarousel = () => {
    const [x, setX] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const [contentWidth, setContentWidth] = useState(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
            if (contentRef.current) {
                setContentWidth(contentRef.current.scrollWidth);
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const handleScroll = (direction) => {
        const scrollAmount = containerWidth * 0.75; // Ajustado para un desplazamiento más suave
        const maxX = contentWidth - containerWidth;

        setX((prevX) => {
            const newX =
                direction === 'left'
                    ? Math.min(0, prevX + scrollAmount)
                    : Math.max(-maxX, prevX - scrollAmount);
            return newX;
        });
    };

    const isAtStart = x === 0;
    const isAtEnd = contentWidth && containerWidth && x <= -(contentWidth - containerWidth);

    return (
        <div className="relative w-full overflow-hidden font-[Alexandria]">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Buscar por subcategoría</h2>
            <div ref={containerRef} className="overflow-x-auto whitespace-nowrap scrollbar-hide">
                <motion.div
                    ref={contentRef}
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -(contentWidth - containerWidth), right: 0 }}
                    className="flex items-center gap-4 transition-transform duration-300"
                >

                    {subcategories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center w-32 h-32 bg-white rounded-lg shadow-md"
                        >
                            <span className="text-2xl">{category.icon}</span>
                            <p className="text-sm mt-2 text-gray-700">{category.name}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
            {/* Flechas de navegación */}
            {!isAtStart && (
                <button
                    onClick={() => handleScroll('left')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                    aria-label="Desplazar a la izquierda"
                >
                    <ArrowLeft className="text-gray-700" size={20} />
                </button>
            )}
            {!isAtEnd && (
                <button
                    onClick={() => handleScroll('right')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                    aria-label="Desplazar a la derecha"
                >
                    <ArrowRight className="text-gray-700" size={20} />
                </button>
            )}
        </div>
    );
};


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
            setControlsVisible(true); // Asegura que los controles estén visibles al pasar el mouse
        };

        const resume = () => {
            setControlsVisible(true);  // Asegura que los controles estén visibles cuando se reinicia el temporizador
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
            style={{ maxWidth: '800px', margin: '0 auto' }}
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
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-white p-2 rounded-full z-10 hover:bg-white/70"
                            aria-label="Slide anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 text-white p-2 rounded-full z-10 hover:bg-white/70"
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
                                    className={`w-3 h-3 rounded-full ${index === current ? 'bg-white' : 'bg-gray-400 hover:bg-white/80'}`}
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


const HomePage = () => {
    const productImages = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/0000FF',
        'https://via.placeholder.com/150/FF0000',
        'https://via.placeholder.com/150/00FF00',
        'https://via.placeholder.com/150/800080'
    ];

    const containerRef = useRef(null);

    const scrollProducts = (direction) => {
        if (containerRef.current) {
            const scrollAmount = 300;
            containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    const Button = ({ variant, className, children, ...props }) => {
        let baseClass = "px-4 py-2 rounded font-semibold";
        let variantClasses = "";

        switch (variant) {
            case "outline":
                variantClasses = "border border-gray-700";
                break;
            default:
                variantClasses = "bg-[#81b29a] text-[#f4f1de] hover:bg-[#6b9985] hover:text-[#f4f1de]"; // Más claro al pasar el mouse
        }

        const combinedClasses = `${baseClass} ${variantClasses} ${className || ''}`;

        return (
            <button className={combinedClasses} {...props} style={{ fontFamily: 'Alexandria' }}>
                {children}
            </button>
        );
    };

    // Valores estáticos para el temporizador
    const dias = 23;
    const horas = 5;
    const minutos = 59;
    const segundos = 35;

    const DestacadosCard = ({ title, description, buttonText, imageSrc }) => {
        return (
            <div className="bg-black shadow-md overflow-hidden flex flex-col justify-between rounded-none">
                <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
                    <p className="text-gray-400 mb-4">{description}</p>
                    <Button variant="default" className="text-white">
                        {buttonText}
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#f4f1de] min-h-screen" style={{ fontFamily: 'Alexandria' }}>
            {/* Sección superior */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start">
                {/* Menú Aside */}
                <aside className="md:w-64 pr-8">
                    <ul className="space-y-4">
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Pinturas</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Materiales</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Dibujos</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Esculturas</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Impresos</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Fotografía</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Tarjetas de regalo</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Decoraciones</li>
                        <li className="text-[#a9a9a9] hover:text-black transition-colors" style={{ fontFamily: 'Alexandria' }}>Exclusivo</li>
                    </ul>
                </aside>

                {/* Línea divisoria vertical */}
                <div className="hidden md:block w-px h-auto bg-gray-300 mr-8 self-stretch" style={{ height: 'auto' }}></div>

                {/* Carrusel */}
                <div className="flex-1 w-full md:w-auto" style={{ fontFamily: 'Alexandria' }}>
                    <ImageCarousel images={[
                        'https://via.placeholder.com/800x300',
                        'https://via.placeholder.com/800x300/0000FF',
                        'https://via.placeholder.com/800x300/FF0000'
                    ]} />
                    <div className="mt-4">
                        <p className="text-sm text-gray-600" style={{ fontFamily: 'Alexandria' }}>Muestra por Ernst Ludwig Kirchner</p>
                        <Button variant="outline" className="mt-2 text-gray-700 hover:text-black">
                            Comprar ahora →
                        </Button>
                    </div>
                </div>
            </div>



            {/* Sección "De hoy" y Ventas Flash */}
            <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Alexandria' }}>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold" style={{ fontFamily: 'Alexandria' }}>
                        <span className="mr-2">De hoy</span>
                        <span className="inline-flex items-center" style={{ fontFamily: 'Alexandria' }}>
                            Ventas Flash
                        </span>
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={() => scrollProducts('left')} aria-label="Scroll left">
                            <ArrowLeft className="w-6 h-6 text-gray-700 hover:text-black" />
                        </button>
                        <button onClick={() => scrollProducts('right')} aria-label="Scroll right">
                            <ArrowRight className="w-6 h-6 text-gray-700 hover:text-black" />
                        </button>
                    </div>
                </div>

                {/* Contenedor de productos con scroll horizontal */}
                <div className="flex  gap-6 overflow-x-auto scrollbar-hide" ref={containerRef} style={{ fontFamily: 'Alexandria' }}>
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150"
                        ProductName="In the rain II"
                        Price="$5,000 $5.990"
                        Rating={4.5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/0000FF"
                        ProductName="Charlotte Sometimes Hums as She Paints Painting"
                        Price="$3600 $4.075"
                        Rating={4}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/FF0000"
                        ProductName="Small Life forms III"
                        Price="$370 $420"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/00FF00"
                        ProductName="Morning Rain III"
                        Price="$500 $600"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="Larkspur"
                        Price="$1560 $1800"
                        Rating={4.8}
                    />
                </div>
                <div className='mt-8 flex justify-center' style={{ fontFamily: 'Alexandria' }}>
                    <Button variant="outline" className="mt-2 text-gray-700 hover:text-black">
                        Ver todos los productos
                    </Button>
                </div>

                {/* Línea divisoria horizontal */}
                <div className="w-full mt-8 border-t border-gray-300"></div>

                {/* Sección de Subcategorías */}
                <div className="mt-12">
                    <SubcategoriesCarousel />
                </div>
                {/* Línea divisoria horizontal */}
                <div className="w-full mt-8 border-t border-gray-300"></div>
            </div>

            {/* Sección de Productos más vendidos */}
            <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Alexandria' }}>
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Alexandria' }}>
                        <span className="mr-2">Productos más vendidos</span>
                    </h2>
                </div>
                <div className="flex  gap-6 overflow-x-auto scrollbar-hide" ref={containerRef} style={{ fontFamily: 'Alexandria' }}>
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150"
                        ProductName="In the rain II"
                        Price="$5,000 $5.990"
                        Rating={4.5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/0000FF"
                        ProductName="Charlotte Sometimes Hums as She Paints Painting"
                        Price="$3600 $4.075"
                        Rating={4}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/FF0000"
                        ProductName="Small Life forms III"
                        Price="$370 $420"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/00FF00"
                        ProductName="Morning Rain III"
                        Price="$500 $600"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="Larkspur"
                        Price="$1560 $1800"
                        Rating={4.8}
                    />
                </div>
            </div>

            {/* Sección "Decora tu espacio de trabajo" */}
            <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between rounded-lg" style={{ fontFamily: 'Alexandria', backgroundColor: '#81b29a' }}>
                <div className="md:w-1/2 p-6">
                    <h2 className="text-3xl font-bold mb-4 text-[#f4f1de]">Decora tu espacio de trabajo</h2>
                    <p className="text-[#f4f1de] mb-4">
                        Dale un toque único a tu oficina con nuestras obras de arte.
                    </p>
                    <div className="flex gap-4 mb-4">
                        <div>
                            <p className="text-sm text-[#f4f1de]">Días</p>
                            <p className="text-2xl font-bold text-black">{dias}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#f4f1de]">Horas</p>
                            <p className="text-2xl font-bold text-black">{horas}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#f4f1de]">Minutos</p>
                            <p className="text-2xl font-bold text-black">{minutos}</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#f4f1de]">Segundos</p>
                            <p className="text-2xl font-bold text-black">{segundos}</p>
                        </div>
                    </div>
                    <Button variant="default" className="mt-2">
                        ¡Compra ahora!
                    </Button>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="https://via.placeholder.com/600x400"  // Reemplazar con la URL de la imagen proporcionada
                        alt="Decora tu espacio de trabajo"
                        className="rounded-lg w-full"
                    />
                </div>
            </div>

            {/* Sección "Nuestros Productos" */}
            <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Alexandria' }}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuestros Productos</h2>
                <div className="flex  gap-6 overflow-x-auto scrollbar-hide" ref={containerRef} style={{ fontFamily: 'Alexandria' }}>
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150"
                        ProductName="Two trees"
                        Price="$110,000"
                        Rating={3.5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/0000FF"
                        ProductName="Figure study"
                        Price="$1,100"
                        Rating={4.5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/FF0000"
                        ProductName="Pintura Reflexión"
                        Price="$6,200"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/00FF00"
                        ProductName="WILD Sculpture"
                        Price="$3,088"
                        Rating={4}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="Hello Kitty!"
                        Price="$540"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="ABANDONED DREAMS"
                        Price="$1,130"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="Bai Tho Mountain Print"
                        Price="$322"
                        Rating={5}
                    />
                    <ProductCard
                        ImageSrc="https://via.placeholder.com/150/800080"
                        ProductName="Quilted Satin Jacket"
                        Price="$8,260"
                        Rating={5}
                    />
                </div>
                <div className='mt-8 flex justify-center' style={{ fontFamily: 'Alexandria' }}>
                    <Button variant="outline" className="mt-2 text-gray-700 hover:text-black">
                        Ver todos los productos
                    </Button>
                </div>
            </div>

            {/* Sección "Destacados" */}
            <div className="container mx-auto px-4 py-8" style={{ fontFamily: 'Alexandria' }}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Destacados</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DestacadosCard
                        imageSrc="https://via.placeholder.com/400x300"
                        title="Lo que no puedes cambiar"
                        description="Acepta 'Lo que no puedes cambiar' porque no es fatalismo ni resignación."
                        buttonText="Comprar ahora"
                    />
                    <DestacadosCard
                        imageSrc="https://via.placeholder.com/400x300/000000"
                        title="Abstract composition"
                        description="Deja que tu imaginación fluya."
                        buttonText="Comprar ahora"
                    />
                    <DestacadosCard
                        imageSrc="https://via.placeholder.com/400x300/800080"
                        title="Dying Light"
                        description="Ningún sonido, ninguna palabra."
                        buttonText="Comprar ahora"
                    />
                    <DestacadosCard
                        imageSrc="https://via.placeholder.com/400x300/00FF00"
                        title="You're mine"
                        description="Art pop expresionista."
                        buttonText="Comprar ahora"
                    />
                </div>
            </div>
        </div>

    );
};




export default HomePage;

