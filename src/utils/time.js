export const formatHour = (unixTime) => {
	const date = new Date(unixTime * 1000);
	let hours = date.getHours();
	const period = hours >= 12 ? "PM" : "AM";
	const hour = hours % 12 || 12;
	return `${hour} ${period}`;
};

export const formatDay = (unixTime) => {
	const date = new Date(unixTime * 1000);
	return date.toLocaleDateString("en-US", { weekday: "long" });
};
