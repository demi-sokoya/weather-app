import SearchBar from "./SearchBar";
import Slider from "./Slider";
import { MdOutlineMyLocation } from "react-icons/md";
import { useTemp } from "../context/TempContext";
import { HStack, Box } from "@chakra-ui/react";
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
						<button onClick={useCurrentLocation}>
							<MdOutlineMyLocation size={36} />
						</button>
					</HStack>
					<ColorModeButton />
				</HStack>
			</Box>
		</header>
	);
};

export default Navbar;
