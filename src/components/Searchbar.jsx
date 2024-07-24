import { useState, useMemo } from "react";
import { Autocomplete, TextField, InputAdornment, CircularProgress } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon
import { debounce } from 'lodash'; // lodash provides a debounce function


const AutocompleteComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced function to fetch options
  const debounceFetchOptions = useMemo(
    () =>
      debounce((newInputValue) => {

        if (newInputValue) {

          	setLoading(true);

			const myHeaders = new Headers();

			myHeaders.append("Content-Type", "application/json");

			const raw = JSON.stringify({searchText: newInputValue})

			const requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: raw,
				redirect: "follow"
			}

			fetch("https://accg99fghl.execute-api.eu-north-1.amazonaws.com/prod", requestOptions)
				.then((results) => results.json() )
				.then((data) => {
					//console.log(data.body);
					const formattedOptions = data.body.map(item => ({
						id: item.symbol,
						label: item.symbol + " - " + item.name
					  }));
					setOptions(formattedOptions);  // Update options with fetched data
					setLoading(false);  // Set loading to false after processing
				})
				.catch((error) => {
					console.error("Error fetching options:", error);
					setLoading(false); // Set loading to false even on error
				});


        } else {
          setOptions([]);
        }
      }, 500),
    []
  );

  // Handle input changes
  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    debounceFetchOptions(newInputValue);
  };

  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={options}
      noOptionsText="Please write to select a stock"
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          placeholder="Type to search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteComponent;