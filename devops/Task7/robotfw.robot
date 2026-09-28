*** Settings ***
Library  OperatingSystem
Library  SeleniumLibrary

*** Test Cases ***
Collect data from webpage
    Comment    Robot framework   
    Open Browser  https://dwbl.dclabra.fi/api/v1/dht1  chrome  
    ${dht}=    Get text   xpath:/html/body/pre             
    Log to console   ${dht}                                
    ${sensor}=    Evaluate  json.loads('''${dht}''')  json  
    Log to console   Temperature: ${sensor["temperature"]} Humidity: ${sensor["humidity"]}
