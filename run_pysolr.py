import pysolr

# Setup a Solr instance. The timeout is optional.
# solr = pysolr.Solr('http://localhost:8983/solr/', timeout=10)
solr = pysolr.Solr('http://localhost:8983/solr/darkwebcore', timeout=10)


# Do a health check.
solr.ping()

# # How you'd index data.
# solr.add([
#     {
#         "id": "doc_1",
#         "title": "A test document",
#     },
# ])

# Traverse a cursor using its iterator:
for doc in solr.search('*:*',fl='id',sort='id ASC',cursorMark='*'):
    print(doc['id'])


for doc in solr.search('*:*',fl='title'):
    print(doc['title'])


# ...or all documents.
# solr.delete(q='*:*')