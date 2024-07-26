import { getSpecificData } from "./getSpecificData";

//function to make all API calls related to specific company data
export async function getFullCompanyData(company) {
	try {
		//get the ticket symbol
		const companySymbol = company.split("-")[0].trim();

		//define date range for the api calls:
		const today = new Date();
		const yearAgo = new Date(today);
		yearAgo.setFullYear(yearAgo.getFullYear() - 1);
		const upperDate = formatDate(today);
		const lowerDate = formatDate(yearAgo);

		//define URLs
		const profileUrl = `https://financialmodelingprep.com/api/v3/profile/${companySymbol}?apikey=9ea462a62531d93aa2be881a058c3951`;
		const chartUrl = `https://fmpcloud.io/api/v3/historical-price-full/${companySymbol}?from=${lowerDate}&to=${upperDate}&serietype=line&apikey=9ea462a62531d93aa2be881a058c3951`;
		const incomeStatementUrl = `https://financialmodelingprep.com/api/v3/income-statement/${companySymbol}?period=annual&apikey=9ea462a62531d93aa2be881a058c3951`;
		const ratiosUrl = `https://financialmodelingprep.com/api/v3/ratios/${companySymbol}??period=annual&apikey=9ea462a62531d93aa2be881a058c3951`;

		//?from=2018-03-12&to=2019-03-12&apikey=9ea462a62531d93aa2be881a058c3951

		//make API calls and wait for all to be ready
		const [companyData, chartData, incomeStatementData, ratiosData] =
			await Promise.all([
				getSpecificData(profileUrl),
				getSpecificData(chartUrl),
				getSpecificData(incomeStatementUrl),
				getSpecificData(ratiosUrl),
			]);

		//reorder
		chartData.historical.sort(
			(a, b) => new Date(a.date) - new Date(b.date)
		);
		incomeStatementData.sort((a, b) => new Date(a.date) - new Date(b.date));
		ratiosData.sort((a, b) => new Date(a.date) - new Date(b.date));

		//calculate full costs
		const incomeStatementDataCalc = incomeStatementData.map((item) => ({
			...item,
			fullCosts:
				item.costAndExpenses +
				item.incomeTaxExpense +
				item.interestExpense,
		}));

		console.log(ratiosData);

		//return data object
		return {
			companyData: companyData,
			chartData: chartData.historical,
			incomeStatementData: incomeStatementDataCalc,
			ratiosData: ratiosData,
		};
	} catch (error) {
		console.error("Error fetching full company data:", error);
		throw error;
	}
}

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
