# Generated by Django 5.0.6 on 2024-06-11 18:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("crud", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="stocktrade",
            name="close",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="stocktrade",
            name="high",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="stocktrade",
            name="low",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="stocktrade",
            name="open",
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name="stocktrade",
            name="volume",
            field=models.CharField(max_length=20),
        ),
    ]
