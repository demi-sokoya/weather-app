import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TempProvider } from "./context/TempContext.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ChakraProvider value={defaultSystem}>
			<TempProvider>
				<App />
			</TempProvider>
		</ChakraProvider>
	</StrictMode>,
);
