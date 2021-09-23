# docker/backend/Dockerfile

FROM python:3.9.6-alpine


# install psycopg2 dependencies
RUN apk update \
  && apk add --virtual build-deps gcc python3-dev musl-dev \
  && apk add postgresql-dev \
  && apk add jpeg-dev zlib-dev libjpeg \
  && pip install Pillow \
  && apk del build-deps

WORKDIR /app
ADD ./requirements.txt /app/backend/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r backend/requirements.txt --default-timeout=100

ADD ./docker /app/docker
ADD ./app /app/backend
ADD ./api /app/backend
ADD ./manage.py /app/backend

