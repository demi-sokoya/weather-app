import { useEffect, useState } from "react";

const useCityImage = (cityName) => {
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (!cityName) return;

		const controller = new AbortController();

		const tryFetch = (query) =>
			fetch(
				`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
				{ signal: controller.signal },
			)
				.then((r) => r.json())
				.then((d) => {
					return d?.originalimage?.source ?? null;
				});

		setImageUrl(null);

		tryFetch(cityName)
			.then((url) => {
				return url ?? tryFetch(`${cityName} city`);
			})
			.then((url) => {
				if (!url) return;
				const img = new Image();
				img.onload = () => {
					setImageUrl(url);
				};
				img.onerror = () => console.log("Image failed to load:", url);
				img.src = url;
			})
			.catch(() => {});
	}, [cityName]);

	return imageUrl;
};

export default useCityImage;
