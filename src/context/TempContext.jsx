import { createContext, useContext, useEffect, useState } from "react";

const TempContext = createContext(null);

export const TempProvider = ({ children }) => {
	const [tempC, setTempC] = useState(null);
	const [unit, setUnit] = useState("C");
	const [coords, setCoords] = useState(null);
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
				setCoords({ lat: latitude, lon: longitude });
			},
			() => {
				setLoading(false);
				setError("Location access denied");
			},
		);
	};

	useEffect(() => {
		if (!coords) return;
		setLoading(true);
		setError(null);

		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`,
		)
			.then((res) => {
				if (!res.ok) throw new Error("Weather not found");
				return res.json();
			})
			.then((data) => setTempC(data.main.temp))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [coords]);

	return (
		<TempContext.Provider
			value={{
				unit,
				toggleUnit,
				convert,
				tempC,
				coords,
				setCoords,
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
