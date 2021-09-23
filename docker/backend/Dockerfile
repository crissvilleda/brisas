# docker/backend/Dockerfile

FROM python:3.9.5-slim


RUN apt-get update \
  && apt-get -y install libpq-dev gcc \
  && pip install psycopg2

WORKDIR /app
ADD ./requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt --default-timeout=100

ADD ./docker /app/docker
ADD ./app /app/backend
ADD ./api /app/backend
ADD ./manage.py /app/backend

