const generateAvatar = (fullName, id, saturation, lightness) => {
	const words = fullName.match(/[A-Z]*[A-Z]/g);

	let badge = words ? words.join('').substring(0, 2) : fullName.charAt(0).toUpperCase();

	let hash = 0;
	for (let i = 0; i < id.length; i++) {
		hash = id.charCodeAt(i) + ((hash << 5) - hash);
	}

	let h = hash % 360;

	return { badge, color: `hsl(${h},${saturation}%,${lightness}%)` };
};

export default generateAvatar;
