from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
import json
from .models import StockTrade
from django.views.decorators.csrf import csrf_exempt

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

    # # get data from sql model
    # if request.method == "GET":
    #     data = list(StockTrade.objects.values())
    #     return JsonResponse(data, safe=False)

    # Using pagination and sql model
    page = request.GET.get("page", 1)
    page_size = request.GET.get("page_size", 100)

    objects = StockTrade.objects.all()
    paginator = Paginator(objects, page_size)

    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        items = paginator.page(1)
    except EmptyPage:
        items = paginator.page(paginator.num_pages)

    data = list(items.object_list.values())
    response = {
        "data": data,
        "page": page,
        "total_pages": paginator.num_pages,
        "total_items": paginator.count,
    }
    return JsonResponse(response, safe=False)


def delete_data(request, id):
    if request.method == "DELETE":
        item = get_object_or_404(StockTrade, id=id)
        item.delete()
        return HttpResponse(status=204)


def update_data(request, id):
    if request.method == "PUT":
        print(f"Update {id}")
        return HttpResponse(status=204)
