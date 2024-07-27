
export async function testingSimplywallstAPI(query) {

    const url = 'https://api.simplywall.st/graphql';
    const token = 'sws:MWQzYmQ2ODUtMTkwYS00Y2VmLTkwNDgtYWRjODk0NjNmYjUxOjU1YjdjYTY0MzMwMTg1ZGE=';

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({
        query: `query searchCompanies($query: String!) {
        searchCompanies(query: $query) {
            id,
            name,
            exchangeSymbol,
            tickerSymbol
        }
        }`,
        variables: {
        query: query
        }
    });

    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
        });

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}