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
					<VStack key={day.dt ?? index}>
						<Text>{index === 0 ? "Today" : formatDay(day.dt, index)}</Text>
						<VStack>
							<WeatherIcon code={day.weather[0].icon} />
							<Text>{day.weather[0].description}</Text>
						</VStack>
						<HStack>
							<Text>{convert(day.temp.max)}°</Text>
							<Text>{convert(day.temp.min)}°</Text>
						</HStack>
					</VStack>
				))}
			</HStack>
		</Box>
	);
};

export default DailyForecast;
