# Generated by Django 2.2.9 on 2021-07-04 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_merge_20210704_0211'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detalle',
            name='cerrado',
        ),
        migrations.AddField(
            model_name='proyecto',
            name='cerrado',
            field=models.BooleanField(default=False),
        ),
    ]
