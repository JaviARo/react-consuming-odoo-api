FROM odoo:14.0

USER root

COPY requirements.txt ./

RUN apt-get update
RUN apt-get install -y nano git build-essential libssl-dev libffi-dev cargo
RUN pip3 install --no-cache-dir --upgrade pip
RUN pip3 install -r requirements.txt
