import { useTemp } from "../context/TempContext";
import WeatherIcon from "./WeatherIcon";
import { formatDay } from "../utils/time";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

const DailyForecast = () => {
	const { weather, convert, loading } = useTemp();

	if (loading)
		return (
			<Box>
				<Box className="shimmer" w="100px" h="14px" mb={3} />
				<HStack className="weather-daily-container">
					{Array.from({ length: 7 }).map((_, i) => (
						<VStack key={i} className="weather-daily-card" gap={3}>
							<Box className="shimmer" w="50px" h="14px" mt={2} />
							<Box className="shimmer" w="64px" h="64px" borderRadius="full" />
							<Box className="shimmer" w="70px" h="12px" />
							<HStack gap={2} pb={2}>
								<Box className="shimmer" w="28px" h="14px" />
								<Box className="shimmer" w="28px" h="14px" />
							</HStack>
						</VStack>
					))}
				</HStack>
			</Box>
		);

	if (!weather) return null;

	const days = weather.daily.slice(0, 7);

	return (
		<Box>
			<Text className="weather-section-heading">7-Day Forecast</Text>
			<HStack className="weather-daily-container">
				{days.map((day, index) => (
					<VStack className="weather-daily-card" key={day.dt ?? index}>
						<Text className="weather-daily-day">
							{index === 0 ? "Today" : formatDay(day.dt, index)}
						</Text>
						<VStack gap={0}>
							<WeatherIcon code={day.weather[0].icon} />
							<Text className="weather-daily-condition">
								{day.weather[0].main}
							</Text>
						</VStack>
						<HStack className="weather-daily-temp-container">
							<Text className="weather-daily-high">
								{convert(day.temp.max)}°
							</Text>
							<Text className="weather-daily-low">
								{convert(day.temp.min)}°
							</Text>
						</HStack>
					</VStack>
				))}
			</HStack>
		</Box>
	);
};

export default DailyForecast;
