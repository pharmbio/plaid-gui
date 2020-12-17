FROM ubuntu

ENV TZ=Europe/Stockholm
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update -y && \
    apt-get install -y python3-pip && \
    apt-get install -y minizinc

WORKDIR /src
COPY . /src

EXPOSE 5000

ENV PATH="/minizinc:${PATH}"

RUN pip3 install --no-cache-dir -r requirements.txt


CMD ["python3", "./src/app.py"]