import { useState } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon

/* import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiAutocomplete-popupIndicator': {
    display: 'none',
  },
})); */

const stocks = [
	{ label: "Apple" },
	{ label: "Google" },
	{ label: "Microsoft" },
	{ label: "Amazon" },
	{ label: "Facebook" },
];

function Searchbar() {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([]);

	const handleInputChange = (event, newInputValue) => {
		setInputValue(newInputValue);

		// Show options only if input is not empty
		if (newInputValue.trim() !== "") {
			// Filter options based on input value
			setOptions(
				stocks.filter((option) =>
					option.label
						.toLowerCase()
						.includes(newInputValue.toLowerCase())
				)
			);
		} else {
			setOptions([]);
		}
	};

	return (
		<Autocomplete
			open={inputValue.length > 0} // Open dropdown only when inputValue has length
			onInputChange={handleInputChange}
			inputValue={inputValue}
			options={options}
			getOptionLabel={(option) => option.label}
			renderInput={(params) => (
				<TextField
					{...params}
					noOptionsText="Please Enter a Valid Stock"
					label="Search Companies"
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			)}
		/>
	);
}

export default Searchbar;
