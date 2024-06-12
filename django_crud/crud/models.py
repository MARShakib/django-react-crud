from django.db import models


class StockTrade(models.Model):
    date = models.DateField()
    trade_code = models.CharField(max_length=20)
    high = models.CharField(max_length=20)
    low = models.CharField(max_length=20)
    open = models.CharField(max_length=20)
    close = models.CharField(max_length=20)
    volume = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.trade_code} on {self.date}"
