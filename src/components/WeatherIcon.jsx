import { getIcon } from "../utils/weatherIcons";

const WeatherIcon = ({ code, size = 64 }) => {
	const Icon = getIcon(code);
	return (
		<img
			src={Icon}
			width={size}
			height={size}
			//   style={{ filter: "var(--icon-tint)" }}
		/>
	);
};

export default WeatherIcon;
