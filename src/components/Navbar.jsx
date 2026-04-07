import SearchBar from "./SearchBar";
import Slider from "./Slider";
import { MdOutlineMyLocation } from "react-icons/md";
import { useTemp } from "../context/TempContext";
import { HStack, Box, IconButton } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

const Navbar = () => {
	const { useCurrentLocation } = useTemp();

	return (
		<header>
			<Box>
				<HStack justifyContent="space-between" alignItems="center">
					<Slider />
					<HStack>
						<SearchBar />
						<IconButton
							onClick={useCurrentLocation}
							rounded="full"
							variant="plain"
							style={{ backgroundColor: "var(--weather-input-bg)", color: "var(--weather-text-primary)" }}>
							<MdOutlineMyLocation size={36} />
						</IconButton>
					</HStack>
					<ColorModeButton />
				</HStack>
			</Box>
		</header>
	);
};

export default Navbar;
