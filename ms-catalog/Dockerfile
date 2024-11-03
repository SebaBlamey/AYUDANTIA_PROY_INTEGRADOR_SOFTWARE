FROM golang:latest

WORKDIR /usr/src/app

COPY go.mod go.sum ./

RUN go mod download

# Copy the rest of the application code
COPY . .

RUN go build -o ms-catalog

EXPOSE 8080

CMD ["./ms-catalog"]
