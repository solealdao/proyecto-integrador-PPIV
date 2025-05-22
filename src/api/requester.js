const handleResponse = async (res) => {
	const data = await res.json();
	if (!res.ok) throw new Error(data.message || 'Error de servidor');
	return data;
};

export const requester = {
	get: async (url, token) =>
		handleResponse(
			await fetch(url, {
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined,
				},
			})
		),

	post: async (url, body, token) =>
		handleResponse(
			await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token ? `Bearer ${token}` : undefined,
				},
				body: JSON.stringify(body),
			})
		),

	put: async (url, body, token) =>
		handleResponse(
			await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token ? `Bearer ${token}` : undefined,
				},
				body: JSON.stringify(body),
			})
		),

	del: async (url, token) =>
		handleResponse(
			await fetch(url, {
				method: 'DELETE',
				headers: {
					Authorization: token ? `Bearer ${token}` : undefined,
				},
			})
		),
};
