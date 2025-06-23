const Terms = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 font-[Alexandria] text-[#7A6E6E]">
        <h1 className="text-4xl font-bold mb-4">Términos y Condiciones de MixArt</h1>
        <p className="text-customGray mb-8">Última actualización: 22/03/2025</p>
        <div className="space-y-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los Términos</h2>
            <p className="text-customGray mb-4">
            Al usar, navegar, registrarse, comprar o acceder de cualquier otra forma a nuestro sitio web y a los 
            servicios disponibles en él, usted reconoce haber leído, comprendido y aceptado en su totalidad estos 
            términos y condiciones. Esta aceptación constituye un acuerdo legal vinculante entre usted y MixArt. 
            Si no está de acuerdo con alguna parte de estos términos, le rogamos que no visite nuestro sitio web 
            ni acceda a nuestros servicios. El uso continuado de nuestro sitio web y servicios después de que se 
            hayan realizado cambios en estos términos constituirá su aceptación de dichos cambios.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">2. Propiedad Intelectual</h2>
            <p className="text-customGray mb-4">
            Todo el contenido de este sitio web, como textos, gráficos, imágenes, fotos, ilustraciones, vídeos, audio, 
            logotipos, nombres comerciales, marcas de servicio, software, código fuente, bases de datos y diseños, 
            pertenece exclusivamente a MixArt o a sus respectivos licenciantes y está protegido por las leyes nacionales 
            e internacionales de propiedad intelectual y derechos de autor. Queda prohibida la reproducción, distribución, 
            modificación, exhibición, venta o explotación de dicha información sin obtener previamente el consentimiento 
            por escrito de MixArt.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">3. Compras y Transacciones</h2>
            <p className="text-customGray mb-4">
            Todos los precios de los productos y servicios se expresan en USD (dólares estadounidenses) junto con los 
            impuestos aplicables de acuerdo con la legislación vigente. Los gastos de envío se indicarán por separado antes 
            de finalizar el pedido, salvo que se indique lo contrario.
            <br/>
            <br/>
            Nos reservamos el derecho a cancelar cualquier pedido realizado a través de nuestro sitio web en caso de error 
            manifiesto en el precio del producto o servicio, o si el producto o servicio no se encuentra en nuestro 
            inventario. En este caso, se le notificará de inmediato y se emitirá un reembolso completo si ya se ha abonado.
            <br/>
            <br/>
            La forma de pago estándar para los pedidos en línea realizados a través de nuestro sitio web es la que se describe 
            al finalizar la compra. Podemos añadir tarjetas de crédito y débito, transferencias bancarias y otros métodos de pago 
            electrónicos similares que habilitaremos en el futuro.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">4. Devoluciones y Reembolsos</h2>
            <p className="text-customGray mb-4">
            Permitimos la devolución de productos en un plazo de 14 días naturales a partir de la recepción del pedido. Para que 
            se acepte una devolución, los productos deben estar en su estado original, sin usar, dañados ni alterados de alguna 
            manera, y deben devolverse con el embalaje original intacto, con todas las etiquetas, accesorios y documentación que 
            los acompaña. Los gastos de envío de la devolución del producto correrán a cargo del cliente, a menos que la 
            devolución se deba a un defecto de fabricación o a un error nuestro. Una vez recibido el producto devuelto y 
            comprobado que cumple con los requisitos anteriores, realizaremos el reembolso correspondiente a través del mismo 
            canal de pago utilizado para la compra, dentro de un plazo razonable.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-customGray mb-4">
            En la medida máxima permitida por la ley, MixArt no será responsable bajo ninguna circunstancia de daños indirectos,
            incidentales, especiales, consecuentes o punitivos (incluyendo, sin limitación, lucro cesante, pérdida de datos, 
            pérdida de uso, pérdida de prestigio u otras pérdidas intangibles) que puedan resultar del uso o la imposibilidad de 
            usar nuestros productos o servicios, incluso si MixArt ha sido advertido de la posibilidad de dichos daños. En cualquier
            caso, la responsabilidad total de MixArt ante usted por cualquier reclamación derivada o relacionada con una compra 
            específica se limitará al importe total pagado por dicho producto o servicio.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">6. Modificaciones</h2>
            <p className="text-customGray mb-4">
            MixArt se reserva el derecho de modificar, actualizar o sustituir estos términos y condiciones en cualquier momento y 
            sin previo aviso. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. Le 
            recomendamos que revise esta sección periódicamente para mantenerse al día sobre cualquier actualización o cambio. Su uso 
            continuado del sitio web después de la publicación de cualquier cambio implicará su aceptación de dichos cambios.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">7. Contacto</h2>
            <p className="text-customGray">
            Si tiene alguna duda o pregunta sobre estos términos y condiciones, póngase en contacto con nuestro departamento legal en 
            la siguiente dirección de correo electrónico: {' '}
              <a href="mailto:mixart@gmail.com" 
                 className="text-[#4d6bfe] hover:text-[#3a56d4] transition-colors duration-200 font-medium">
                mixart@gmail.com.
              </a> Intentaremos atender sus inquietudes lo antes posible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Terms