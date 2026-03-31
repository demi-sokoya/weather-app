import { Icon, Switch } from "@chakra-ui/react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { useTemp } from "../context/TempContext";

const Slider = () => {
	const { unit, toggleUnit } = useTemp();
	return (
		<Switch.Root
			colorPalette="blue"
			size="lg"
			checked={unit === "F"}
			onCheckedChange={toggleUnit}>
			<Switch.HiddenInput />
			<Switch.Control>
				<Switch.Thumb />
				<Switch.Indicator
					fallback={<Icon as={TbTemperatureCelsius} color="gray.400" />}>
					<Icon as={TbTemperatureFahrenheit} color="yellow.400" />
				</Switch.Indicator>
			</Switch.Control>
			<Switch.Label></Switch.Label>
		</Switch.Root>
	);
};

export default Slider;
