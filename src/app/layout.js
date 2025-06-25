import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'MedTurnos | Nueva Clínica',
	description:
		'MedTurnos es una plataforma moderna para la administración eficiente de turnos médicos, pacientes y profesionales de la salud.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}
