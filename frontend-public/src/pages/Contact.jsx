import Background from '../assets/background.webp'
import Breadcrumbs from '../components/Handlers/BreadCrumbs'

const Contact = () => {
    return (
        <section className="py-24 font-[Alexandria] bg-[#F4F1DE]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Breadcrumbs/>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="lg:mb-0 mb-10">
                        <div className="group w-full h-full">
                            <div className="relative h-full">
                                <div className="relative h-full">
                                    <img src={Background} alt="Contáctanos" className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"/>
                                    <div className="absolute inset-0 bg-[#E07A5F]/70 backdrop-blur-sm lg:rounded-l-2xl rounded-2xl"></div>
                                </div>
                                <h1 className="text-white text-4xl font-bold leading-10 absolute top-11 left-11">Contáctanos</h1>
                                <div className="absolute bottom-0 w-full lg:p-11 p-5">
                                    <div className="bg-white rounded-lg p-6 block space-y-6">
                                        <div className="flex items-center transition-all duration-300 hover:translate-x-2">
                                        <svg width="30" height="30" fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M22.3 18.3c-.3-.1-.5-.1-.8-.1s-.6.1-1.1.2l-3.3.6c-.4.1-.6.1-.9.1s-.5-.1-.8-.2c-2.5-1.4-4.1-3-5.2-5.3-.1-.3-.2-.5-.2-.7s.1-.5.2-.8l.6-3.4c.1-.3.1-.5.1-.7s-.1-.3-.2-.6l-.9-2.3c-.3-.7-.4-1-.7-1.2s-.7-.2-1.4-.2H5.9C4.6 3.8 3.6 4.8 3.8 6.1c.5 3.1 1.9 8.8 6 12.9 4.3 4.3 10.4 6.2 13.8 6.9 1.3.3 2.5-.7 2.5-2v-2.5c0-.7 0-1.1-.2-1.4-.2-.3-.6-.5-1.3-.8l-2.3-.9Z" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <h5 className="text-[#7A6E6E] text-base ml-5">+ 503 1122-3344</h5>
                                        </div>
                                        <a href="mailto:mixart@gmail.com" className="flex items-center transition-all duration-300 hover:translate-x-2">
                                        <svg width="30" height="30" fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.8 8.8l7.4 4.9c2.6 1.6 3.9 2.4 5.4 2.4s2.5-.9 5.1-2.5l6.3-4.6M12.5 25h5c4.7 0 7.1 0 8.5-1.4 1.4-1.4 1.4-3.8 1.4-8.6 0-4.7 0-7.1-1.4-8.5C24.6 5 22.2 5 17.5 5h-5C7.8 5 5.4 5 4 6.4 2.5 7.9 2.5 10.3 2.5 15c0 4.7 0 7.1 1.4 8.5 1.4 1.4 3.8 1.4 8.6 1.4Z" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        <h5 className="text-[#7A6E6E] text-base ml-5">mixart@gmail.com</h5>
                                        </a>
                                        <div className="flex items-center transition-all duration-300 hover:translate-x-2">
                                        <svg width="30" height="30" fill="none" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M25 12.9c0 4.8-3.8 8.7-6.7 12.1-1.4 1.7-2.1 2.6-3.3 2.6s-1.9-.9-3.3-2.6C8.8 21.6 5 17.7 5 12.9c0-2.8 1.1-5.5 3-7.4C9.8 3.6 12.3 2.5 15 2.5s5.2 1.1 7.1 3c1.9 1.9 2.9 4.6 2.9 7.4Z" stroke="#E07A5F" strokeWidth="2"/>
                                            <path d="M17.5 11.6c0 1.4-1.1 2.6-2.5 2.6s-2.5-1.2-2.5-2.6 1.1-2.6 2.5-2.6 2.5 1.2 2.5 2.6Z" stroke="#E07A5F" strokeWidth="2"/>
                                        </svg>
                                        <h5 className="text-[#7A6E6E] text-base ml-5">Calle La Mascota, San Salvador, El Salvador</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form action="https://formspree.io/f/xrbkoazq" method="POST" className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
                        <h2 className="text-[#E07A5F] text-4xl font-semibold leading-10 mb-11 font-[Alexandria]">Envíanos un mensaje</h2>
                        <label htmlFor="name" className="block text-[#7A6E6E] mb-2 font-[Alexandria]">
                            Nombre <span className="text-[#E07A5F]">*</span>
                        </label>
                        <input required type="text" name="name" id="name" className="bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria] w-full mb-6" placeholder="Tu nombre"/>
                        <label htmlFor="email" className="block text-[#7A6E6E] mb-2 font-[Alexandria]">
                            Correo electrónico <span className="text-[#E07A5F]">*</span>
                        </label>
                        <input required type="email" name="email" id="email" nsmr className="bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria] w-full mb-6" placeholder="ejemplo@correo.com"/>
                        <label htmlFor="phone" className="block text-[#7A6E6E] mb-2 font-[Alexandria]">
                            Teléfono <span className="text-[#E07A5F]">*</span>
                        </label>
                        <input required type="tel" name="phone" id="phone" className="bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria] w-full mb-6" placeholder="Tu número"/>
                        <label htmlFor="message" className="block text-[#7A6E6E] mb-2 font-[Alexandria]">
                            Mensaje <span className="text-[#E07A5F]">*</span>
                        </label>
                        <textarea required name="message" id="message" className="bg-[#EBFEF5] border border-[#81B29A] rounded-md px-3 py-2 outline-none text-[#7A6E6E] font-[Alexandria] w-full h-32 resize-none mb-10" placeholder="Escribe tu mensaje aquí..."/>
                        <button type="submit" className="w-full h-12 bg-[#E07A5F] hover:bg-transparent border-2 border-[#E07A5F] hover:border-[#E07A5F] text-white hover:text-[#E07A5F] text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] cursor-pointer">
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact