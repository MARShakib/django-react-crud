from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
import json
from .models import StockTrade
from django.views.decorators.csrf import csrf_exempt
import matplotlib

matplotlib.use("Agg")  # Use the 'Agg' backend for non-GUI environments
import matplotlib.pyplot as plt
import io
import base64

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
        try:
            item = get_object_or_404(StockTrade, id=id)
            item.delete()
            response = {"message": f"Item Deleted successfully. Item id: {id}"}
            return JsonResponse(response, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


def update_data(request, id):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            item = get_object_or_404(StockTrade, id=id)
            for key, value in data.items():
                setattr(item, key, value)
            item.save()
            response = {"message": f"Item Updated successfully. Item id: {id}"}
            return JsonResponse(response, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


def add_data(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            item = StockTrade.objects.create(**data)
            response = {"message": f"Item added successfully. Item id: {item.id}"}
            return JsonResponse(response, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


def generate_chart(request):
    trades = StockTrade.objects.all().order_by("date")
    dates = [trade.date for trade in trades]

    fig, ax1 = plt.subplots()

    x = [1, 2, 3, 4, 5]
    y = [10, 200, 3000, 40000, 500000]

    closes = []
    volumes = []

    for trade in trades:
        try:
            closes.append(float(trade.close))
        except ValueError:
            closes.append(None)

        try:
            volumes.append(int(trade.volume.replace(",", "")))
        except ValueError:
            volumes.append(None)

    # Plot close prices
    ax1.set_xlabel("Date")
    ax1.set_ylabel("Close Price", color="tab:blue")
    # ax1.plot(x, y, color="tab:blue")
    ax1.plot(dates, closes, color="tab:blue")
    ax1.tick_params(axis="y", labelcolor="tab:blue")

    # Create a second y-axis for volume
    ax2 = ax1.twinx()
    ax2.set_ylabel("Volume", color="tab:red")
    # ax2.bar(x, y, color="tab:red", alpha=0.3)
    ax2.bar(dates, volumes, color="tab:red", alpha=0.3)
    ax2.tick_params(axis="y", labelcolor="tab:red")

    # Convert the plot to a base64-encoded image
    img = io.BytesIO()
    plt.tight_layout()
    plt.savefig(img, format="png")
    img.seek(0)
    chart_data = base64.b64encode(img.getvalue()).decode()

    plt.close()

    return JsonResponse({"chart_data": chart_data})
