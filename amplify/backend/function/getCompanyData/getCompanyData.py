import requests


def lambda_handler(event, context):
    
    #company ticker e.g. AAPL
    stockTicker = event["stockTicker"]

    #create object where our data will be stored
    fullData = {}

    #api call and receive response for company general info
    url = "https://financialmodelingprep.com/api/v3/profile/"+stockTicker+"?apikey=9ea462a62531d93aa2be881a058c3951"
    response = requests.get(url)

    #store it into our object
    fullData['stockTicker'] = {
        "status_code" : response.status_code,
        "body" : response.json()
    }

    #next dataset, api call to receive historical daily price data, full set
    url2 = "https://fmpcloud.io/api/v3/historical-price-full/" + stockTicker + "?serietype=line&apikey=9ea462a62531d93aa2be881a058c3951"
    response2 = requests.get(url2)

    #store it into our object in another section
    fullData['historicalPriceData'] = {
        "status_code" : response2.status_code,
        "body" : response2.json()
    }

    print(fullData)
    
    return fullData