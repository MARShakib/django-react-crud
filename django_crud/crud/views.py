from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import StockTrade

import os
from django.conf import settings


def index(request):
    return render(request, "index.html")


def get_data(request):
    # # get data from json
    # path = os.path.join(settings.BASE_DIR, "crud/data/stock_market_data.json")
    # with open(path) as f:
    #     data = json.load(f)
    # return JsonResponse(data, safe=False)

    # get data from sql model
    if request.method == "GET":
        data = list(StockTrade.objects.values())
        return JsonResponse(data, safe=False)
