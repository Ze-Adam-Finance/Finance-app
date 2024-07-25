import PropTypes from "prop-types";
import { useState } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../index.css";

const stocks = [
	{ label: "Apple" },
	{ label: "Google" },
	{ label: "Microsoft" },
	{ label: "Amazon" },
	{ label: "Facebook" },
];

function Searchbar({ setSelectedCompany }) {
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

	const handleChange = (event, newValue) => {
		if (newValue) {
			setSelectedCompany(newValue.label);
			setInputValue(newValue.label);
		} else {
			setSelectedCompany("");
		}
	};

	return (
		<Autocomplete
			open={inputValue.length > 0 && options.length > 0}
			onInputChange={handleInputChange}
			onChange={handleChange}
			inputValue={inputValue}
			options={options}
			forcePopupIcon={false}
			getOptionLabel={(option) => option.label}
			sx={{ width: "100%" }}
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

// Define prop types
Searchbar.propTypes = {
	setSelectedCompany: PropTypes.func.isRequired,
};

export default Searchbar;
