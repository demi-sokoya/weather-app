import { useTemp } from "../context/TempContext";
import { HStack, VStack, Box, Text, Image } from "@chakra-ui/react";

const CurrentWeather = () => {
	const { weather, convert, location } = useTemp();

	if (!weather) return null;

	const { current } = weather;
	return (
		<Box>
			{/* Outermost Box */}
			<HStack>
				{/* Left Box */}
				<VStack>
					<Text>{location.cityName}</Text>
					{/* Temperature Box */}
					<VStack>
						<Text>{convert(current.temp)}°</Text>
						<HStack>
							{/* High */}
							<Text>{convert(weather.daily[0].temp.max)}°</Text>
							{/* Low */}
							<Text>{convert(weather.daily[0].temp.min)}°</Text>
						</HStack>
					</VStack>

					{/* Stat Block */}
					<HStack>
						<HStack>
							<Text>Feels Like:</Text>
							<Text>{convert(current.feels_like)}</Text>
						</HStack>
						<HStack>
							<Text>Humidity:</Text>
							<Text>{current.humidity}</Text>
						</HStack>
						<HStack>
							<Text>Wind:</Text>
							<HStack>
								<Text>{Math.round(current.wind_speed * 3.6)}</Text>
								<Text>KM/H</Text>
							</HStack>
						</HStack>
					</HStack>
				</VStack>

				{/* Right Side */}
				<VStack>
					<Image></Image>
					<Text textTransform="capitalize">
						{current.weather[0].description}
					</Text>
				</VStack>
			</HStack>
		</Box>
	);
};

export default CurrentWeather;
