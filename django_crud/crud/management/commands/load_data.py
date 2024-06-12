import json
from django.core.management.base import BaseCommand
from crud.models import StockTrade


# def remove_commas_and_convert_to_int(value_str):
#     return int(value_str.replace(",", ""))


class Command(BaseCommand):
    help = "Load data from JSON file"

    def add_arguments(self, parser):
        parser.add_argument("file_path", type=str)

    def handle(self, *args, **options):
        StockTrade.objects.all().delete()
        file_path = options["file_path"]
        with open(file_path, "r") as file:
            data = json.load(file)
            for item in data:
                StockTrade.objects.create(**item)
        self.stdout.write(self.style.SUCCESS("Data loaded successfully"))
