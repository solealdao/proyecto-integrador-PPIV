import PageLayout from '@/components/PageLayout';
import MenuCard from '@/components/MenuCard';

export default function PrincipalAdministrativo() {
	return (
		//TODO: el 'title' recibirá un valor dinámico de quien esté logueado
		<PageLayout
			showImage={true}
			imageUrl="/doctor_profile.jpg"
			title={'Dra. Valentina Gómez'}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					gap: '40px',
					flexWrap: 'wrap',
				}}
			>
				<MenuCard text="Gestión de Turnos" url="#" />
				<MenuCard text="Configuraciones" url="#" />
			</div>
		</PageLayout>
	);
}
