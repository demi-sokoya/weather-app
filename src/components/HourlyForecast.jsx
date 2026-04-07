import { useTemp } from "../context/TempContext";
import WeatherIcon from "./WeatherIcon";
import { formatHour } from "../utils/time";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

const HourlyForecast = () => {
	const { weather, convert, loading } = useTemp();

	if (loading)
		return (
			<Box>
				<Box className="shimmer" w="120px" h="14px" mb={3} />
				<HStack className="weather-hourly-container" gap={4}>
					{Array.from({ length: 8 }).map((_, i) => (
						<VStack key={i} className="weather-hourly-card" gap={2}>
							<Box className="shimmer" w="30px" h="10px" />
							<Box className="shimmer" w="36px" h="36px" borderRadius="full" />
							<Box className="shimmer" w="28px" h="14px" />
						</VStack>
					))}
				</HStack>
			</Box>
		);

	if (!weather) return null;

	const hours = weather.hourly.slice(0, 24);

	return (
		<Box>
			<Text className="weather-section-heading">Hourly Forecast</Text>
			<HStack className="weather-hourly-container" gap={4}>
				{hours.map((hour, index) => (
					<VStack className="weather-hourly-card" key={hour.dt ?? index}>
						<Text className="weather-hourly-time">
							{index === 0 ? "NOW" : formatHour(hour.dt)}
						</Text>
						<WeatherIcon code={hour.weather[0].icon} size={36} />
						<Text className="weather-hourly-temp">{convert(hour.temp)}°</Text>
					</VStack>
				))}
			</HStack>
		</Box>
	);
};

export default HourlyForecast;
