import requests

url = 'http://localhost:8983/solr/admin/cores?action=STATUS'
response = requests.get(url)
data = response.json()

core_names = list(data['status'].keys())
print(core_names)
