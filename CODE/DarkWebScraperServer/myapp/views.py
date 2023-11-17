from django.shortcuts import HttpResponse

# Create your views here.
from django.http import JsonResponse
import pysolr
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
SOLR_URL = os.environ.get('SOLR_URL', '')

def solr_search(searchString, outputFields="", order=""):

    # Setup a Solr instance. The timeout is optional.
    # solr = pysolr.Solr('http://localhost:8983/solr/', timeout=10)
    solr = pysolr.Solr(SOLR_URL, timeout=30)


    # Do a health check.
    solr.ping()


    params = {}

    if searchString:
        params["q"] = searchString

    if outputFields:
        params["fl"] = outputFields

    return solr.search(**params)


def home(request):
    response = HttpResponse('This is DarkWebScraper server!')
    response['Access-Control-Allow-Origin'] = 'null'
    return response

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
    response = JsonResponse(res,safe=False)

    # Set the Access-Control-Allow-Origin header
    response['Access-Control-Allow-Origin'] = 'null'

    # Return the response with the custom header
    return response
