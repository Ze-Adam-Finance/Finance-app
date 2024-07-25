import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import {
	Autocomplete,
	TextField,
	InputAdornment,
	CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import "../index.css";

// eslint-disable-next-line react/prop-types
function Searchbar({ selectedCompany, setSelectedCompany }) {
	const [inputValue, setInputValue] = useState("");
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	// Debounced function to fetch options
	const debounceFetchOptions = useMemo(
		() =>
			debounce((newInputValue) => {
				if (newInputValue.trim() !== "") {
					setLoading(true);

					fetch("https://financialmodelingprep.com/api/v3/search?query=" + newInputValue + "&limit=20" + "&apikey=9ea462a62531d93aa2be881a058c3951")
						.then((results) => results.json())
						.then((data) => {
							const formattedOptions = data.map((item) => ({
								id: item.symbol,
								label: item.symbol + " - " + item.name,
							}));
							setOptions(formattedOptions); // Update options with fetched data
							setLoading(false); // Set loading to false after processing
						})
						.catch((error) => {
							console.error("Error fetching options:", error);
							setLoading(false); // Set loading to false even on error
						});
				} else {
					setOptions([]);
					setOpen(false);
				}
			}, 500),
		[]
	);

	// Handles changes to the input field
	const handleInputChange = (event, newInputValue) => {
		setInputValue(newInputValue);
		debounceFetchOptions(newInputValue);
		setOpen(newInputValue.trim() !== ""); // Open dropdown if input is not empty
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
			disableCloseOnSelect={false} // Ensures the dropdown does not immediately close
			noOptionsText="No options"
			loading={loading}
			clearOnBlur={true}
			getOptionLabel={(option) => option.label}
			sx={{ width: "100%" }}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Search Companies"
					placeholder="Type to search..."
					InputProps={{
						...params.InputProps,
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
								{loading && (
									<CircularProgress
										color="inherit"
										size={20}
										sx={{ ml: 2 }}
									/>
								)}
							</InputAdornment>
						),
						endAdornment: null, // Hide the default dropdown arrow
					}}
					sx={{
						"& .MuiAutocomplete-endAdornment": {
							display: "none", // Hide the default end adornment which includes the dropdown arrow
						},
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
