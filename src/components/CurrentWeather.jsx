import { useTemp } from "../context/TempContext";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = () => {
	const { weather, convert, location, loading } = useTemp();

	if (loading)
		return (
			<Box className="weather-hero">
				<VStack alignItems="flex-start" gap={4}>
					<HStack justifyContent="space-between" w="100%">
						<VStack alignItems="flex-start" gap={2}>
							<Box className="shimmer" w="80px" h="12px" />
							<Box className="shimmer" w="120px" h="52px" />
							<Box className="shimmer" w="80px" h="14px" />
						</VStack>
						<VStack gap={2} alignItems="center">
							<Box className="shimmer" w="64px" h="64px" borderRadius="full" />
							<Box className="shimmer" w="80px" h="12px" />
						</VStack>
					</HStack>
					<HStack gap={10}>
						<Box className="shimmer" w="100px" h="14px" />
						<Box className="shimmer" w="100px" h="14px" />
						<Box className="shimmer" w="100px" h="14px" />
					</HStack>
				</VStack>
			</Box>
		);

	if (!weather) return null;

	const { current } = weather;

	return (
		<Box className="weather-hero">
			<VStack alignItems="flex-start" gap={4}>
				<HStack justifyContent="space-between" w="100%">
					{/* Left Side */}
					<VStack alignItems="flex-start" gap={4}>
						<Text className="weather-city-label">{location.cityName}</Text>
						{/* Temperature Box */}
						<VStack alignItems="flex-start">
							<Text className="weather-temp-hero">
								{convert(current.temp)}°
							</Text>
							<HStack>
								<Text className="weather-temp-high">
									{convert(weather.daily[0].temp.max)}°
								</Text>
								<Text className="weather-temp-low">
									{convert(weather.daily[0].temp.min)}°
								</Text>
							</HStack>
						</VStack>
					</VStack>

					{/* Right Side */}
					<VStack gap={0}>
						<WeatherIcon code={current.weather[0].icon} size={64} />
						<Text className="weather-hero-condition">
							{current.weather[0].description}
						</Text>
					</VStack>
				</HStack>

				{/* Stat Block */}
				<HStack gap={{ base: 3, md: 10 }}>
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
		</Box>
	);
};

export default CurrentWeather;
