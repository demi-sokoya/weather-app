import { useTemp } from "../context/TempContext";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = () => {
	const { weather, convert, location } = useTemp();

	if (!weather) return null;

	const { current } = weather;

	return (
		<Box className="weather-hero">
			{/* Outermost Box */}
			<HStack justifyContent="space-between">
				{/* Left Box */}
				<VStack alignItems="flex-start" gap={4}>
					<Text className="weather-city-label">{location.cityName}</Text>
					{/* Temperature Box */}
					<VStack alignItems="flex-start">
						<Text className="weather-temp-hero">{convert(current.temp)}°</Text>
						<HStack>
							{/* High */}
							<Text className="weather-temp-high">
								{convert(weather.daily[0].temp.max)}°
							</Text>
							{/* Low */}
							<Text className="weather-temp-low">
								{convert(weather.daily[0].temp.min)}°
							</Text>
						</HStack>
					</VStack>

					{/* Stat Block */}
					<HStack gap={10}>
						<HStack>
							<Text className="weather-stat-label">Feels Like:</Text>
							<Text className="weather-stat-value">
								{convert(current.feels_like)}°
							</Text>
						</HStack>
						<HStack>
							<Text className="weather-stat-label">Humidity:</Text>
							<Text className="weather-stat-value">{current.humidity}%</Text>
						</HStack>
						<HStack gap={1}>
							<Text className="weather-stat-label">Wind:</Text>
							<HStack gap={1}>
								<Text className="weather-stat-value">
									{Math.round(current.wind_speed * 3.6)}
								</Text>
								<Text className="weather-stat-unit">KM/H</Text>
							</HStack>
						</HStack>
					</HStack>
				</VStack>

				{/* Right Side */}
				<VStack gap={0}>
					<WeatherIcon code={current.weather[0].icon} size={64} />
					<Text className="weather-hero-condition">
						{current.weather[0].description}
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
};

export default CurrentWeather;
