import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Datos de las subcategorías (puedes expandir esto)
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

    const handleScroll = (containerRef) => {
        // Verifica si containerRef.current existe antes de continuar
        if (!containerRef.current) {
            console.error("containerRef is not valid");
            return; // Detiene la ejecución si no hay referencia al contenedor
        }
    
        const containerWidth = containerRef.current.offsetWidth;
        const contentWidth = containerRef.current.scrollWidth;
    
        return (direction) => {
            const scrollAmount = containerWidth * 0.75;
            const maxX = contentWidth - containerWidth;
            
            containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
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

export default SubcategoriesCarousel;
