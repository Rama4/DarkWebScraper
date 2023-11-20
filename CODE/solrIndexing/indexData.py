import pysolr
import json
import os
from dotenv import load_dotenv
import time

start_time = time.time()  # Start timer


# Load environment variables from .env file
load_dotenv()

# Get the ALLOWED_HOSTS from the environment variable
SOLR_URL = os.environ.get('SOLR_URL', '')
solr = pysolr.Solr(SOLR_URL, timeout=30)
# Do a health check.
solr.ping()

# # How you'd index data.
with open('../../DATA/nl_growers.json') as f:
    data = json.load(f)

solr.add(data)
print("data successfully indexed in solr!")

end_time = time.time()  # End timer

elapsed_time = end_time - start_time  # Calculate elapsed time
print("Elapsed time: ", elapsed_time, "seconds")
#==============================================================================
# Testing code

# Traverse a cursor using its iterator:
# print('hi')
# for doc in solr.search('*:*',fl='id',sort='id ASC',cursorMark='*'):
#     print(doc['id'])


# for doc in solr.search('*:*',fl='title'):
#     print(doc['title'])

#==============================================================================
# ...or all documents.
# solr.delete(q='*:*')
#==============================================================================