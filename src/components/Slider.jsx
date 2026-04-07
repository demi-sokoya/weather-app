"use client";

import { Icon, Switch } from "@chakra-ui/react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
import { useTemp } from "../context/TempContext";

const Slider = () => {
	const { unit, toggleUnit } = useTemp();
	return (
		<Switch.Root
			size="lg"
			checked={unit === "F"}
			onCheckedChange={toggleUnit}
			css={{
				"--switch-bg": "var(--weather-input-bg)",
				"[data-state=checked] &": {
					"--switch-bg": "var(--weather-input-bg)",
				},
			}}>
			<Switch.HiddenInput />
			<Switch.Control
				style={{
					backgroundColor: "var(--weather-input-bg)",
				}}>
				<Switch.Thumb
					style={{
						backgroundColor: "var(--weather-text-secondary)",
					}}
				/>
				<Switch.Indicator
					fallback={
						<Icon
							as={TbTemperatureCelsius}
							style={{ color: "var(--weather-text-secondary)" }}
						/>
					}>
					<Icon
						as={TbTemperatureFahrenheit}
						style={{ color: "var(--weather-text-primary)" }}
					/>
				</Switch.Indicator>
			</Switch.Control>
			<Switch.Label></Switch.Label>
		</Switch.Root>
	);
};

export default Slider;
