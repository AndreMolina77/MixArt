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

const ProductCard = ({ image, title, price, rating, label }) => (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 relative">
      {label && (
        <span className="absolute top-2 left-2 bg-green-200 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          {label}
        </span>
      )}
      <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 font-semibold text-gray-800 text-sm">{title}</h3>
      <p className="text-orange-700 text-sm">{price}</p>
      <div className="flex text-yellow-500 text-xs">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} fill={i < Math.floor(rating) ? '#fbbf24' : 'none'} />
        ))}
      </div>
    </div>
  );
  
  const HeroSection = () => (
    <section className="bg-[#264734] text-white py-10 px-8 rounded-xl flex justify-between items-center">
      <div>
        <p className="text-sm mb-2">Categorías</p>
        <h1 className="text-3xl font-bold mb-4">Decora tu espacio de trabajo</h1>
        <div className="flex gap-2 mb-4">
          {["23 horas", "05 min", "59 segundos", "35 segundos"].map((item, idx) => (
            <span key={idx} className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold">
              {item}
            </span>
          ))}
        </div>
        <button className="bg-[#bcd2c1] text-[#264734] font-semibold py-2 px-4 rounded">
          ¡Compra ahora!
        </button>
      </div>
      <img
        src="https://via.placeholder.com/150x200/007744/ffffff?text=Artwork"
        alt="Green trees"
        className="w-40 h-52 object-cover rounded shadow-lg"
      />
    </section>
  );
  
  const FeaturedSection = () => (
    <section className="bg-black text-white rounded-lg p-6 grid grid-cols-2 gap-4 mt-10">
      <div className="col-span-1">
        <img
          src="https://via.placeholder.com/300x300?text=Abstract"
          alt="Lo que no puedes cambiar"
          className="w-full h-60 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-semibold">Lo que no puedes cambiar</h3>
        <p className="text-sm mb-2">Explora la galería en expansión</p>
        <button className="text-blue-200 text-sm underline">Compra ahora</button>
      </div>
      <div className="col-span-1 grid grid-cols-2 gap-2">
        {['Abstract composition', 'Dying Light', 'Colorful Woman'].map((text, i) => (
          <div key={i} className="bg-[#111] rounded p-2">
            <p className="text-sm font-semibold mb-1">{text}</p>
            <button className="text-blue-200 text-xs underline">Compra ahora</button>
          </div>
        ))}
      </div>
    </section>
  );
  
  const HomePage = () => (
    <div className="bg-[#f4f1de] min-h-screen font-[Alexandria] px-6 py-8">
      <HeroSection />
  
      <div className="mt-10">
        <p className="text-sm text-[#d2643b] font-semibold mb-1">Nuestros productos</p>
        <h2 className="text-2xl font-bold mb-6">Explora nuestros productos</h2>
        <div className="flex flex-wrap gap-4 justify-start">
          <ProductCard image="https://via.placeholder.com/150" title="Two trees" price="$110.000" rating={5} />
          <ProductCard image="https://via.placeholder.com/150" title="Figure study" price="$1.100" rating={4.5} />
          <ProductCard image="https://via.placeholder.com/150" title="Pintura reflexión" price="$6.200" rating={5} />
          <ProductCard image="https://via.placeholder.com/150" title="WILD Sculpture" price="$5.068" rating={4} />
          <ProductCard image="https://via.placeholder.com/150" title="Hello Kitty!" price="$540" rating={4.5} label="Nuevo" />
          <ProductCard image="https://via.placeholder.com/150" title="ABANDONED DREAMS" price="$1.130" rating={5} />
          <ProductCard image="https://via.placeholder.com/150" title="Bai Tho Mountain Print" price="$322" rating={5} label="NUEVO" />
          <ProductCard image="https://via.placeholder.com/150" title="Quilted Satin Jacket" price="$8.260" rating={4.5} />
        </div>
        <div className="text-center mt-6">
          <button className="bg-[#d2643b] text-white px-6 py-2 rounded font-semibold">
            Ver todos los productos
          </button>
        </div>
      </div>
  
      <div className="mt-12">
        <p className="text-sm text-[#d2643b] font-semibold mb-1">Destacados</p>
        <h2 className="text-2xl font-bold mb-6">Recién llegado</h2>
        <FeaturedSection />
      </div>
    </div>
  );
  
  
  

export default HomePage;



