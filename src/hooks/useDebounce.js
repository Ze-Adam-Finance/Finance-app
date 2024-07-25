import { useState, useEffect } from "react";

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	// Set up a timeout to update debouncedValue
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Clean up function clears timeout if value or delay changes before it fires
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Run effect when value or delay changes

	return debouncedValue; // Return debounced value
}

export default useDebounce;
