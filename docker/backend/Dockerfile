# docker/backend/Dockerfile

FROM python:3.8.3-alpine

WORKDIR /app
ADD ./requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt --default-timeout=100

ADD ./docker /app/docker
ADD ./app /app/backend
ADD ./api /app/backend
ADD ./manage.py /app/backend

