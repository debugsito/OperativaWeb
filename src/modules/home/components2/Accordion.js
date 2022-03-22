import Accordion from "react-bootstrap/Accordion";

export default function AccordionFaq() {
	return (
		<section className="container-accordion">
			<Accordion defaultActiveKey="0" flush>
				<Accordion.Item accordion-collapse eventKey="0">
					<Accordion.Header>
					¿Cómo busco trabajo en Operativa?
					</Accordion.Header>
					<Accordion.Body>
					Para acercarte a tu nuevo empleo, solo debes registrarte en Operativa.pe, crear tu CV Digital y listo. Las empresas se contactarán contigo para ofrecerte una oportunidad laboral acorde a tu perfil. 
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
					Ya me registré ¿Cómo me postulo a una oferta laboral?
					</Accordion.Header>
					<Accordion.Body>
					La plataforma mediante inteligencia artificial, filtrará tu perfil y te postulará a ofertas laborales acorde a tu experiencia laboral y/o rubro de interés, incluyendo la oferta laboral por la que te registraste.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="2">
					<Accordion.Header>
					¿Ya me registré, pero quiero postular a otro empleo?
					</Accordion.Header>
					<Accordion.Body>
					Si tu perfil profesional cumple con los requisitos de la oferta laboral solicitada, la plataforma te postulará automáticamente y serás parte del proceso de selección. 
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="3">
					<Accordion.Header>
					¿Cómo saber si he sido pre-seleccionado para un puesto?
					</Accordion.Header>
					<Accordion.Body>
					Cuando una empresa te pre-seleccione para una oferta laboral, aparecerá una alerta en el panel de control de tu cuenta, donde se especificará detalles y estado del proceso.
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="4">
					<Accordion.Header>
					¿Qué significa ser pre-seleccionado?
					</Accordion.Header>
					<Accordion.Body>
					Si has sido pre-seleccionado, estás cerca a conseguir tu nuevo empleo. Durante este proceso tu perfil laboral será evaluado y verificado, si quedas entre los finalistas, la empresa se comunicará contigo para coordinar. Recuerda mantener tus datos actualizados para facilitar la comunicación.
					</Accordion.Body>
				</Accordion.Item>
				{/* <Accordion.Item eventKey="5">
					<Accordion.Header>
						¿Puedo darme de baja en Operativa?
					</Accordion.Header>
					<Accordion.Body>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</Accordion.Body>
				</Accordion.Item> */}
			</Accordion>
		</section>
	);
}
