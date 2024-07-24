import requests

def lambda_handler(event, context):
    
    searchText = event["searchText"]
    
    print(searchText)

    url = "https://financialmodelingprep.com/api/v3/search-name?query=" + searchText + "&limit=20" + "&apikey=9ea462a62531d93aa2be881a058c3951"

    
    response = requests.get(url)
    
    #print('Status Code:', response.status_code)
    #print('Response Body:', response.json())
    
    return {
        "status_code" : response.status_code,
        "body" : response.json()
    }