import SearchBar from "./SearchBar";
import Slider from "./Slider";
import { MdOutlineMyLocation } from "react-icons/md";
import { useTemp } from "../context/TempContext";
import { HStack, Box } from "@chakra-ui/react";

const Navbar = () => {
	const { useCurrentLocation } = useTemp();

	return (
		<header>
			<Box>
				<HStack justifyContent="space-between" alignItems="center">
					<Slider />
					<SearchBar />
					<button onClick={useCurrentLocation}>
						<MdOutlineMyLocation />
					</button>
				</HStack>
			</Box>
		</header>
	);
};

export default Navbar;
