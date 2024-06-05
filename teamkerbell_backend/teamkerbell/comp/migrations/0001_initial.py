# Generated by Django 5.0.4 on 2024-06-03 10:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Comp",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=225, null=True)),
                ("startDate", models.CharField(max_length=225, null=True)),
                ("endDate", models.CharField(max_length=225, null=True)),
                ("organization", models.CharField(max_length=225, null=True)),
                ("eligibillty", models.TextField(null=True)),
                ("applicationMethod", models.TextField(null=True)),
                ("context", models.TextField(null=True)),
                ("reward", models.TextField(max_length=225, null=True)),
                ("contact", models.TextField(null=True)),
                ("link", models.CharField(max_length=225, null=True)),
                ("img", models.TextField(null=True)),
                ("theme", models.CharField(default="", max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="CompReview",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("review", models.TextField(default="default_value")),
                (
                    "comp",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="compreviews",
                        to="comp.comp",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="RandomMatching",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("city", models.CharField(default="default_value", max_length=50)),
                ("dong", models.CharField(default="default_value", max_length=50)),
                ("isLeader", models.BooleanField(default=False)),
                ("role", models.CharField(max_length=50)),
                ("recruitNum", models.IntegerField(default=0)),
                ("priority", models.IntegerField(default=100, null=True)),
                ("isMatched", models.BooleanField(default=False)),
                (
                    "comp",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="randommatchings",
                        to="comp.comp",
                    ),
                ),
            ],
        ),
    ]
