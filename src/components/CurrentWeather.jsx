import { useTemp } from "../context/TempContext";
import { HStack, VStack, Box, Text } from "@chakra-ui/react";
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = () => {
	const { weather, convert, location } = useTemp();

	if (!weather) return null;

	const { current } = weather;

	return (
		<Box fontFamily="var(--font-display)" background="var(--hero-background)">
			{/* Outermost Box */}
			<HStack justifyContent="space-between">
				{/* Left Box */}
				<VStack alignItems="flex-start">
					<Text color="var(--text-secondary)">{location.cityName}</Text>
					{/* Temperature Box */}
					<VStack>
						<Text>{convert(current.temp)}°</Text>
						<HStack>
							{/* High */}
							<Text>{convert(weather.daily[0].temp.max)}°</Text>
							{/* Low */}
							<Text fontFamily="var(--font-data)">
								{convert(weather.daily[0].temp.min)}°
							</Text>
						</HStack>
					</VStack>

					{/* Stat Block */}
					<HStack fontFamily="var(--font-data)">
						<HStack>
							<Text color="var(--text-secondary)">Feels Like:</Text>
							<Text>{convert(current.feels_like)}°</Text>
						</HStack>
						<HStack>
							<Text color="var(--text-secondary)">Humidity:</Text>
							<Text>{current.humidity}%</Text>
						</HStack>
						<HStack gap={1}>
							<Text color="var(--text-secondary)">Wind:</Text>
							<HStack gap={1}>
								<Text>{Math.round(current.wind_speed * 3.6)}</Text>
								<Text fontSize={12}>KM/H</Text>
							</HStack>
						</HStack>
					</HStack>
				</VStack>

				{/* Right Side */}
				<VStack>
					<WeatherIcon code={current.weather[0].icon} size={64} />
					<Text textTransform="capitalize">
						{current.weather[0].description}
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
};

export default CurrentWeather;
