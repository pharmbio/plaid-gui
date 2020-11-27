FROM python:3.8.3

WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 5000

RUN pip install --no-cache-dir -r requirements.txt


CMD ["python", "./app.py"]
