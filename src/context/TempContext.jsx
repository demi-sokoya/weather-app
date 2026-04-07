import { createContext, useContext, useEffect, useState } from "react";

const TempContext = createContext(null);

export const TempProvider = ({ children }) => {
	const [unit, setUnit] = useState("C");
	const [location, setLocation] = useState({
		cityName: "",
		countryName: "",
		coords: { lat: null, lon: null },
	});
	const [weather, setWeather] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const toggleUnit = () => setUnit((u) => (u === "C" ? "F" : "C"));

	const convert = (celsius) =>
		unit === "C" ? Math.round(celsius) : Math.round((celsius * 9) / 5 + 32);

	const useCurrentLocation = () => {
		if (!navigator.geolocation) {
			setError("Geolocation not supported by this browser");
			return;
		}
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				fetch(
					`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_WEATHER_KEY}`,
				)
					.then((res) => res.json())
					.then((data) => {
						setLocation({
							cityName: data[0].name ?? "Your location",
							coords: { lat: latitude, lon: longitude },
						});
					})
					.catch(() => {
						setLocation({
							cityName: "Your location",
							coords: { lat: latitude, lon: longitude },
						});
					});
			},
			() => {
				setLoading(false);
				setError("Location access denied");
			},
		);
	};

	useEffect(() => {
		if (!location.coords.lat || !location.coords.lon) return;
		setLoading(true);
		setError(null);

		fetch(
			`https://api.openweathermap.org/data/3.0/onecall?lat=${location.coords.lat}&lon=${location.coords.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`,
		)
			.then((res) => {
				if (!res.ok) throw new Error("Weather not found");
				return res.json();
			})
			.then((data) => setWeather(data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [location]);

	return (
		<TempContext.Provider
			value={{
				unit,
				toggleUnit,
				convert,
				weather,
				location,
				setLocation,
				useCurrentLocation,
				loading,
				error,
			}}>
			{children}
		</TempContext.Provider>
	);
};

export const useTemp = () => {
	const ctx = useContext(TempContext);
	if (!ctx) throw new Error("useTemp must be used inside TempProvider");
	return ctx;
};
