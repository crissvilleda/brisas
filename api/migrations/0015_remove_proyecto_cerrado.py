# Generated by Django 2.2.9 on 2021-08-19 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20210819_0258'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='proyecto',
            name='cerrado',
        ),
    ]