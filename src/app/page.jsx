import hero1 from "../../public/images/heroy.webp" //1920 x 900
import card1 from "../../public/images/services-cards/organizate.webp"
import card2 from "../../public/images/services-cards/listaImg.webp"
import card3 from "../../public/images/services-cards/shareList.webp"
import Image from "next/image";

function HomePage() {
 return (
    <div className="mx-auto mb-24 h-full w-full">
      <div className="min-h-screen">
        <section id="hero" className="w-full lg:w-[1312px] bg-cover flex flex-col justify-center relative mx-auto">
          <div className='w-full h-[600px] flex items-center overflow-hidden m-0'>
            <Image src={hero1} alt="Oferta 1" width={1920} height={900} className="max-h-[1312px] w-full h-auto object-cover"/>
          </div>
        </section>
        <section id="services" className="mt-24 text-center">
          <div className="services-titles">
            <h2 className="text-white">Anime Tracker es la opción que te permite llevar el hilo de los anime que estás viendo</h2>
            <p className="text-[#aca2a2]">Déja de anotarlos en tu anotador y crea tu propia agenda de anime para que no te olvides de tus animes favoritos</p>
          </div>
          <div className="w-full lg:w-[1312px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-24 justify-center">
            <div className="w-[285px] h-[300px] mx-auto bg-secondary pt-4 rounded-2xl">
              <Image src={card2} alt="Card 1" width={100} height={95} className="mx-auto"/>
              <h3 className="text-white font-bold">Lista de animes</h3>
              <p className="text-[#e9e3e3]">Organiza tus animes favoritos en una tabla fácil de usar para tu comodidad</p>
            </div>
            <div className="w-[285px] h-[300px] mx-auto bg-secondary pt-4 rounded-2xl">
              <Image src={card1} alt="Card 2" width={100} height={95} className="mx-auto"/>
              <h3 className="text-white font-bold">Seguimiento de animes</h3>
              <p className="text-[#e9e3e3]">Haz un seguimiento de tu progreso en los animes que estás viendo</p>
            </div>
            <div className="w-[285px] h-[300px] mx-auto bg-secondary pt-4 rounded-2xl">
              <Image src={card3} alt="Card 3" width={100} height={95} className="mx-auto"/>
              <h3 className="text-white font-bold">Comparte tu lista</h3>
              <p className="text-[#e9e3e3]">Muestrales a tus amigos y compara con ellos la lista de animes que creaste</p>
            </div>
          </div>
        </section>
      </div>
    </div>
 );
}

export default HomePage;