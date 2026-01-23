APP_NAME=currency-converter
PORT=8080

.PHONY: help build run stop clean logs rebuild

help:
	@echo "Comandos disponíveis:"
	@echo "  make build     - Builda a imagem Docker"
	@echo "  make run       - Sobe o container"
	@echo "  make stop      - Para o container"
	@echo "  make rebuild   - Builda do zero e sobe"
	@echo "  make logs      - Mostra logs do container"
	@echo "  make clean     - Remove container e imagem"

build:
	docker build -t $(APP_NAME) .

run:
	docker run -d --name $(APP_NAME) -p $(PORT):8080 $(APP_NAME)

stop:
	docker stop $(APP_NAME) || true
	docker rm $(APP_NAME) || true

logs:
	docker logs -f $(APP_NAME)

rebuild: stop build run

clean: stop
	docker rmi $(APP_NAME) || true
