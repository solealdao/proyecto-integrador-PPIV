export function dateFormatter(dateString) {
	if (!dateString) return '-';
	const date = new Date(dateString);
	return date.toLocaleDateString('es-AR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
}

export function timeFormatter(timeString) {
	if (!timeString) return '-';
	const [hour, minute] = timeString.split(':');
	return `${hour}:${minute}`;
}
