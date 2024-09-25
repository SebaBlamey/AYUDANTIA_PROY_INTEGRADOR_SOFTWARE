package config

import (
	"catalog/graph/model"
	"log"

	"github.com/streadway/amqp"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB
var RabbitConnection *amqp.Connection
var RabbitChannel *amqp.Channel

func Init() {
	initDatabase()
	initRabbitMQ()
}

func initDatabase() {
	var err error
	dsn := "host=localhost user=postgres password=password dbname=catalog_db port=5432 sslmode=disable"

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	if err := DB.AutoMigrate(&model.Catalog{}); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
	log.Println("Database connected")
}

func initRabbitMQ() {
	var err error
	RabbitConnection, err = amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("failed to connect to RabbitMQ: %v", err)
	}
	log.Println("RabbitMQ connected")

	RabbitChannel, err = RabbitConnection.Channel()
	if err != nil {
		log.Fatalf("failed to open a channel: %v", err)
	}
	log.Println("RabbitMQ channel connected")

	_, err = RabbitChannel.QueueDeclare(
		"catalogQueue",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("failed to declare a queue: %v", err)
	}
	log.Println("RabbitMQ queue connected")
}

func PublishMessage(message string) error {
	err := RabbitChannel.Publish(
		"",
		"catalogQueue",
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(message),
		})
	if err != nil {
		return err
	}
	return nil
}
