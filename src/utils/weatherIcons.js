import d01 from "../assets/01d.svg";
import n01 from "../assets/01n.svg";
import d02 from "../assets/02d.svg";
import n02 from "../assets/02n.svg";
import d03 from "../assets/03d.svg";
import n03 from "../assets/03n.svg";
import d04 from "../assets/04d.svg";
import n04 from "../assets/04n.svg";
import d09 from "../assets/09d.svg";
import n09 from "../assets/09n.svg";
import d10 from "../assets/10d.svg";
import n10 from "../assets/10n.svg";
import d11 from "../assets/11d.svg";
import n11 from "../assets/11n.svg";
import d13 from "../assets/13d.svg";
import n13 from "../assets/13n.svg";
import d50 from "../assets/50d.svg";
import n50 from "../assets/50n.svg";

const icons = {
	"01d": d01,
	"01n": n01,
	"02d": d02,
	"02n": n02,
	"03d": d03,
	"03n": n03,
	"04d": d04,
	"04n": n04,
	"09d": d09,
	"09n": n09,
	"10d": d10,
	"10n": n10,
	"11d": d11,
	"11n": n11,
	"13d": d13,
	"13n": n13,
	"50d": d50,
	"50n": n50,
};

export const getIcon = (code) => icons[code] ?? icons["01d"];
