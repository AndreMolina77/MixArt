import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/button.jsx'
import { ArrowLeft, ArrowRight } from 'lucide-react'; // Importa iconos




// Componente para mostrar la tarjeta del producto
const ProductCard = ({ image, title, price, rating }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<span key={i} className="text-yellow-400">★</span>); // Estrella llena
            } else if (i < rating) {
                stars.push(<span key={i} className="text-yellow-400">★</span>); // Estrella parcial
            }
             else {
                stars.push(<span key={i} className="text-gray-300">★</span>); // Estrella vacía
            }
        }
        return stars;
    };

    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4" style={{ fontFamily: 'Alexandria' }}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Alexandria' }}>{title}</h3>
                    <p className="text-gray-600 mt-2" style={{ fontFamily: 'Alexandria' }}>{price}</p>
                    <div className="mt-2 flex items-center">{renderStars()}</div>
                </div>
            </div>
        </div>
    );
};

// Componente para el carrusel de imágenes
const ImageCarousel = ({ images }) => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const intervalRef = useRef(null);

      useEffect(() => {
        setCurrentImage(images[0]);
    }, [images]);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setCurrentImage((prev) => {
                const currentIndex = images.indexOf(prev);
                const nextIndex = (currentIndex + 1) % images.length;
                return images[nextIndex];
            });
        }, 5000); // Cambia la imagen cada 5 segundos

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [images]);

    const handleDotClick = (image) => {
        setCurrentImage(image);
         if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <div className="relative w-full" style={{ fontFamily: 'Alexandria' }}>
            <img src={currentImage} alt="Carrusel" className="w-full h-[300px] object-cover rounded-lg" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(image)}
                        className={`w-3 h-3 rounded-full ${currentImage === image ? "bg-white" : "bg-gray-500"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Componente del contador de tiempo (frizado)
const FrizadoCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

    useEffect(() => {
        const interval = setInterval(() => {
             setTimeLeft({ days: 3, hours: 23, minutes: 19, seconds: 56 });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-block ml-2" style={{ fontFamily: 'Alexandria' }}>
            {timeLeft.days} Días {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
        </span>
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
            const scrollAmount = 300; // Ajusta la cantidad de desplazamiento según sea necesario
            containerRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
        }
    };

    // Definición del componente Button directamente, ya que parece ser un componente local
    const Button = ({ variant, className, children, ...props }) => {
      let baseClass = "px-4 py-2 rounded font-semibold";
      let variantClasses = "";

        switch (variant) {
            case "outline":
                variantClasses = "border border-gray-700";
                break;
            default:
                variantClasses = "bg-[#81b29a] text-[#f4f1de] hover:bg-[#81b29a] hover:text-[#f4f1de]"; // Aplica los colores aquí
        }

        const combinedClasses = `${baseClass} ${variantClasses} ${className || ''}`;

        return (
            <button className={combinedClasses} {...props} style={{ fontFamily: 'Alexandria' }}>
                {children}
            </button>
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
                 <div className="hidden md:block w-px h-auto bg-gray-300 mr-8 self-stretch" style={{height: 'auto'}}></div>

                {/* Carrusel */}
                <div className="flex-1 w-full md:w-auto" style={{ fontFamily: 'Alexandria' }}>
                   <ImageCarousel images={['https://via.placeholder.com/800x300', 'https://via.placeholder.com/800x300/0000FF', 'https://via.placeholder.com/800x300/FF0000']}/>
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
                            <FrizadoCountdown />
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
                <div className="flex flex-nowrap overflow-x-auto -ml-4" ref={containerRef} style={{ fontFamily: 'Alexandria' }}>
                    <ProductCard
                        image="https://via.placeholder.com/150"
                        title="In the rain II"
                        price="$5,000 $5.990"
                        rating={4.5}
                    />
                    <ProductCard
                        image="https://via.placeholder.com/150/0000FF"
                        title="Charlotte Sometimes Hums as She Paints Painting"
                        price="$3600 $4.075"
                        rating={4}
                    />
                    <ProductCard
                        image="https://via.placeholder.com/150/FF0000"
                        title="Small Life forms III"
                        price="$370 $420"
                        rating={5}
                    />
                     <ProductCard
                        image="https://via.placeholder.com/150/00FF00"
                        title="Morning Rain III"
                        price="$500 $600"
                        rating={5}
                    />
                    <ProductCard
                        image="https://via.placeholder.com/150/800080"
                        title="Larkspur"
                        price="$1560 $1800"
                        rating={4.8}
                    />
                </div>
                <div className='mt-8 flex justify-center' style={{ fontFamily: 'Alexandria' }}>
                  <Button variant="outline" className="mt-2 text-gray-700 hover:text-black">
                      Ver todos los productos
                  </Button>
                </div>

                {/* Línea divisoria horizontal */}
                <div className="w-3/4 mx-auto mt-8 border-t border-gray-300" style={{ fontFamily: 'Alexandria' }}></div>
            </div>
        </div>
    );
};

export default HomePage;



