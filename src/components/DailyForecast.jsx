import { useTemp } from "../context/TempContext";
import WeatherIcon from "./WeatherIcon";
import { formatDay } from "../utils/time";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

const DailyForecast = () => {
	const { weather, convert, unit } = useTemp();

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
