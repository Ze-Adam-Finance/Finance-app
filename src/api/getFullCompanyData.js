import { getSpecificData } from "./getSpecificData";

// Function to make all API calls related to specific company data
export async function getFullCompanyData(company) {
    try {
        // Get the ticker symbol from the company string (assumes format "symbol - name")
        const companySymbol = company.split("-")[0].trim();

        // Define date range for the API calls (from one year ago to today)
        const today = new Date();
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        const upperDate = formatDate(today);
        const lowerDate = formatDate(yearAgo);

        // Define URLs for the API calls
        const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${companySymbol}?apikey=9ea462a62531d93aa2be881a058c3951`;
        const chartUrl = `https://fmpcloud.io/api/v3/historical-price-full/${companySymbol}?from=${lowerDate}&to=${upperDate}&serietype=line&apikey=9ea462a62531d93aa2be881a058c3951`;
        const incomeStatementUrl = `https://financialmodelingprep.com/api/v3/income-statement/${companySymbol}?period=annual&apikey=9ea462a62531d93aa2be881a058c3951`;
        const ratiosUrl = `https://financialmodelingprep.com/api/v3/ratios/${companySymbol}??period=annual&apikey=9ea462a62531d93aa2be881a058c3951`;

		//?from=2018-03-12&to=2019-03-12&apikey=9ea462a62531d93aa2be881a058c3951

        // Make API calls and wait for all to be ready
        const [companyData, chartData, incomeStatementData, ratiosData] =
            await Promise.all([
                getSpecificData(profileUrl),
                getSpecificData(chartUrl),
                getSpecificData(incomeStatementUrl),
                getSpecificData(ratiosUrl),
            ]);

        // Log chart data for debugging purposes
        console.log(chartData);

        // Sort historical chart data by date if it exists
        if (chartData.historical) {
            chartData.historical.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }

        // Sort income statement data by date if it exists
        if (incomeStatementData) {
            incomeStatementData.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
        }

        // Sort ratios data by date if it exists
        if (ratiosData) {
            ratiosData.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        // Calculate full costs for each income statement entry
        const incomeStatementDataCalc = incomeStatementData.map((item) => ({
            ...item,
            fullCosts:
                item.costAndExpenses +
                item.incomeTaxExpense +
                item.interestExpense,
        }));

        // Log ratios data for debugging purposes
        console.log(ratiosData);

        // Return data object containing all fetched and processed data
        return {
            companyData: companyData,
            chartData: chartData.historical,
            incomeStatementData: incomeStatementDataCalc,
            ratiosData: ratiosData,
        };
    } catch (error) {
        // Log and rethrow error if any API call fails
        console.error("Error fetching full company data:", error);
        throw error;
    }
}

// Helper function to format a date object as "YYYY-MM-DD"
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}