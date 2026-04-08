import { useEffect, useState, useRef } from "react";
import { useTemp } from "../context/TempContext";
import { HStack, Spinner, Input, VStack, Text } from "@chakra-ui/react";
import { MdLocationPin } from "react-icons/md";
import WeatherIcon from "./WeatherIcon";

const SearchBar = () => {
	const { setLocation, convert } = useTemp();
	const [input, setInput] = useState("");
	const [results, setResults] = useState([]);
	const [searching, setSearching] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (containerRef.current && !containerRef.current.contains(e.target)) {
				setResults([]);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	});

	useEffect(() => {
		if (input.length < 2) {
			setResults([]);
			return;
		}

		const timeout = setTimeout(() => {
			setSearching(true);
			fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${import.meta.env.VITE_WEATHER_KEY}`,
			)
				.then((res) => res.json())
				.then((data) => {
					const unique = data.filter(
						(result, index, self) =>
							index ===
							self.findIndex(
								(r) => r.lat === result.lat && r.lon === result.lon,
							),
					);
					return Promise.all(
						unique.map((city) =>
							fetch(
								`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`,
							)
								.then((res) => res.json())
								.then((w) => ({
									name: city.name,
									state: city.state,
									country: city.country,
									lat: city.lat,
									lon: city.lon,
									temp: w.main.temp,
									tempMax: w.main.temp_max,
									tempMin: w.main.temp_min,
									icon: w.weather[0].icon,
									description: w.weather[0].description,
								})),
						),
					);
				})
				.then((enhanced) => setResults(enhanced))
				.catch(() => setResults([]))
				.finally(() => setSearching(false));
		}, 300);

		return () => clearTimeout(timeout);
	}, [input]);

	const handleSelect = (result) => {
		setLocation(() => ({
			countryName: result.country,
			cityName: result.name,
			coords: { lat: result.lat, lon: result.lon },
		}));
		setInput(result.name);
		setResults([]);
	};

	return (
		<div className="search-container" ref={containerRef}>
			<Input
				className="weather-search"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Search for a location..."
				id="Search"
			/>
			{searching && (
				<ul className="search-results">
					<li className="search-result-item search-result-loading">
						<Spinner size="sm" />
					</li>
				</ul>
			)}

			{!searching && results.length > 0 && (
				<ul className="search-results">
					{results.map((result) => (
						<li
							key={`${result.lat}-${result.lon}`}
							onClick={() => handleSelect(result)}>
							<HStack className="search-result-item">
								{/* Left Side */}
								<HStack>
									<MdLocationPin className="search-result-pin" />
									<VStack alignItems="flex-start">
										<Text className="search-result-city">
											{result.name} {result.state}, {result.country}
										</Text>
										<Text className="search-result-condition">
											{result.description}
										</Text>
									</VStack>
								</HStack>

								{/* Right Side */}
								<HStack>
									<WeatherIcon code={result.icon} size={28} />
									<Text className="search-result-temp">
										{convert(result.temp)}°
									</Text>
									<VStack>
										<Text className="search-result-high">
											{convert(result.tempMax)}°
										</Text>
										<Text className="search-result-low">
											{convert(result.tempMin)}°
										</Text>
									</VStack>
								</HStack>
							</HStack>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
