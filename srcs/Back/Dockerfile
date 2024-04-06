FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
RUN pip install python-multipart sqlalchemy jinja2 asyncpg uvicorn[standard]
COPY ./app /code/app

RUN mkdir /cert
RUN openssl req -x509 -nodes -days 365 -newkey \
	rsa:2048 -keyout /cert/key.pem -out /cert/cert.pem -subj \
	"/C=FR/ST=France/L=Lyon/O=42/OU=Chezmoi/CN=my_matcha.tv"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--reload", "--host", "0.0.0.0", "--port", "8000"]
