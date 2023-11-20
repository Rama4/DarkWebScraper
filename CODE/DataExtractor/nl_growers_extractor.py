from bs4 import BeautifulSoup
from scrapy.selector import Selector
import json
import pysolr


class Product:
    def __init__(self, id, name, cost_eu, cost_btc, quantity, quality):
        self.id = id
        self.name = name
        self.quantity = quantity
        self.cost_eu = cost_eu
        self.cost_btc = cost_btc
        self.quality = quality

with open("./Scraped-NLGrowers.html") as fp:
    response = BeautifulSoup(fp, 'html.parser')
    products = []

    table = response.find_all('table', {'class' : 'table1'})[0]      
    # print(table)
    for row in table.find_all('tr'):
        if row.parent.name == 'thead':
            continue
        else:
            list_of_td = row.find_all('td')
            quantity_name = list_of_td[0].string  
            quantity_end_idx = quantity_name.index('g')
            quantity = quantity_name[0:quantity_end_idx + 1]
            name = quantity_name[quantity_end_idx + 1:].strip()
            quality = ""
            if "," in name:
                quality_start_idx = name.index(',')
                quality = name[quality_start_idx + 1:].strip()
                name = name[:quality_start_idx].strip()

            cost_combined = list_of_td[1].string
            cost_eu_end_idx = cost_combined.index('EUR')
            cost_eu = cost_combined[:cost_eu_end_idx+3]
            cost_btc = cost_combined[cost_eu_end_idx+5:].strip()

            id = list_of_td[2].find('form').find_all('input')[0]['value']
            new_product = Product(id, name, cost_eu, cost_btc, quantity, quality)
            products.append(new_product)
            a = vars(new_product)

    products_json = [vars(ob) for ob in products]

    with open('../../DATA/nl_growers.json', 'w') as f:
        json.dump(products_json, f, ensure_ascii=False, indent=4)

    print("All products", products_json)

    # Create a client instance. The timeout and authentication options are not required.
    # solr = pysolr.Solr('http://localhost:8000/solr', timeout=10)

    # # Do a health check.
    # solr.ping()

    # d = dict()
    # d["id"] = "1"
    # d["name"] = 'sushmita'

    # #How you'd index data.
    # print("add", a)
    # solr.add(products_json)

    # # Later, searching is easy. In the simple case, just a plain Lucene-style
    # # query is fine.
    # results = solr.search('bananas')

    # # The ``Results`` object stores total results found, by default the top
    # # ten most relevant results and any additional data like
    # # facets/highlighting/spelling/etc.
    # print("Saw {0} result(s).".format(len(results)))

    # # Just loop over it to access the results.
    # for result in results:
    #     print("The title is '{0}'.".format(result['title']))




