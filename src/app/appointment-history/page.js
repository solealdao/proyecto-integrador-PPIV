'use client';

import PageLayout from '@/components/PageLayout';
import HistorialTabla from '@/components/history-table';

export default function HistorialDeTurnos() {
	return (
		<PageLayout
			showImage={true}
			imageUrl="/icono_calendario.svg"
			title="Gestión de Turnos"
			showClock={true}
		>
			<HistorialTabla />
		</PageLayout>
	);
}
