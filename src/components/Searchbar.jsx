import PropTypes from "prop-types";
import { useState } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../index.css";

const companies = [
	{ label: "Apple" },
	{ label: "Google" },
	{ label: "Microsoft" },
	{ label: "Amazon" },
	{ label: "Facebook" },
];

// eslint-disable-next-line react/prop-types
function Searchbar({ selectedCompany, setSelectedCompany }) {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([]);
	const [open, setOpen] = useState(false);

	const handleInputChange = (event, newInputValue) => {
		setInputValue(newInputValue);

		// Show options only if input is not empty
		if (newInputValue.trim() !== "") {
			// Filter options based on input value
			setOptions(
				companies.filter((option) =>
					option.label
						.toLowerCase()
						.includes(newInputValue.toLowerCase())
				)
			);
			setOpen(true);
		} else {
			setOptions([]);
			setOpen(false);
		}
	};
	// Handles selection of an option from the dropdown
	const handleChange = (event, newValue) => {
		if (newValue) {
			setSelectedCompany(newValue.label);
			setInputValue(""); // Clear the input field
			setOptions([]); // Clear the options
			setOpen(false); // Close the dropdown
		} else {
			setSelectedCompany("");
			setInputValue(""); // Clear input field
			setOptions([]); // Clear options
		}
	};

	return (
		<Autocomplete
			open={open}
			onInputChange={handleInputChange}
			onChange={handleChange}
			inputValue={inputValue}
			options={options}
			value={
				options.find((option) => option.label === selectedCompany) ||
				null
			}
			disableCloseOnSelect={false} // This ensures that the dropdown does not immediately close
			clearOnBlur={true}
			getOptionLabel={(option) => option.label}
			sx={{ width: "100%" }}
			renderInput={(params) => (
				<TextField
					{...params}
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

Searchbar.propTypes = {
	selectedCompany: PropTypes.string,
	setSelectedCompany: PropTypes.func.isRequired,
};

export default Searchbar;
