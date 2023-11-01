from django.shortcuts import HttpResponse

# Create your views here.
from django.http import JsonResponse
import pysolr
import json

def solr_search(searchString, outputFields="", order=""):

    # Setup a Solr instance. The timeout is optional.
    # solr = pysolr.Solr('http://localhost:8983/solr/', timeout=10)
    solr = pysolr.Solr('http://localhost:8983/solr/darkwebcore', timeout=10)


    # Do a health check.
    solr.ping()


    params = {}

    if searchString:
        params["q"] = searchString

    if outputFields:
        params["fl"] = outputFields

    return solr.search(**params)


def home(request):
    return HttpResponse('Hello!!')


def search(request):
    query = request.GET.get('q', '')
    field = request.GET.get('fl', '')
    order = request.GET.get('order', '')
    print("query=", query)
    print("field=", field)
    print("order=", order)
    results = solr_search(query, field, order)
    res = []
    for r in results:
        res.append(r)
    
    print(res)
    
# Return the results as a JsonResponse.
    # return HttpResponse('Hello!!')
    return JsonResponse(res,safe=False)
