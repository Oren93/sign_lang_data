#%%
import requests
from bs4 import BeautifulSoup

# URL of the website you want to scrape
url = 'https://is.signwiki.org/index.php/Flokkur:Or%C3%B0ab%C3%B3k_A-%C3%96'

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the website
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Now you can extract information from the parsed HTML
    # For example, let's extract all the <a> tags (links) from the website
    links = soup.find_all('a')
    
    # Print out the href attribute of each link
    for link in links:
        print(link.get('href'))
else:
    print('Failed to retrieve the website. Status code:', response.status_code)
