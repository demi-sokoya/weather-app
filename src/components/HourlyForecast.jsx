import { useTemp } from "../context/TempContext";
import WeatherIcon from "./WeatherIcon";
import { formatHour } from "../utils/time";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";

const HourlyForecast = () => {
	const { weather, convert, unit } = useTemp();

	if (!weather) return null;

	const hours = weather.hourly.slice(0, 10);

	return (
		<Box>
			<HStack>
				{hours.map((hour, index) => (
					<VStack key={hour.dt ?? index}>
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
