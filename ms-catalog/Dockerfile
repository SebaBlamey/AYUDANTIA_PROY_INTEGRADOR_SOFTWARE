FROM golang:1.23.1 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o catalog-service .

FROM alpine:latest

COPY --from=builder /app/catalog-service /usr/local/bin/catalog-service

EXPOSE 8080

CMD ["catalog-service"]
