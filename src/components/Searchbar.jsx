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
	const [open, setOpen] = useState(false); // Manage open state

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
			setInputValue(newValue.label); // Optional: Set the input value to the selected option
		} else {
			setSelectedCompany("");
		}
		setOpen(false); // Close the dropdown after selecting an option
	};

	const handleOpen = () => {
		setOpen(true); // Open the dropdown when the user focuses on the input
	};

	const handleClose = () => {
		setOpen(false); // Close the dropdown when the user clicks outside
	};

	return (
		<Autocomplete
			open={open} // Controlled open state
			onOpen={handleOpen}
			onClose={handleClose}
			onInputChange={handleInputChange}
			onChange={handleChange}
			inputValue={inputValue}
			options={options}
			forcePopupIcon={false}
			getOptionLabel={(option) => option.label}
			sx={{ width: "50%" }}
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
