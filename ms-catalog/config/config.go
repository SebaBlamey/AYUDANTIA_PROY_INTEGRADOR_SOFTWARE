package config

import (
	"catalog/graph/model"
	"encoding/json"
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

	go consumePurchaseMessage()
}

func consumePurchaseMessage() {
	msgs, err := RabbitChannel.Consume(
		"purchaseQueue",
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("failed to consume a message: %v", err)
	}
	for msg := range msgs {
		HandlePurchaseMessage(msg.Body)
	}
}

type IncommingMessage struct {
	Pattern string          `json:"pattern"`
	Data    PurchaseMessage `json:"data"`
	ID      string          `json:"id"`
}

type PurchaseMessage struct {
	UserID    int    `json:"userId"`
	CatalogID string `json:"catalogId"`
	Quantity  int    `json:"quantity"`
}

func HandlePurchaseMessage(body []byte) {
	log.Printf("Received message: %s", body)
	var incommingMessage IncommingMessage

	err := json.Unmarshal(body, &incommingMessage)
	if err != nil {
		log.Fatalf("failed to unmarshal JSON: %v", err)
	}

	purchase := incommingMessage.Data
	log.Println("Purchase data: ", purchase)

	if purchase.CatalogID == "" {
		log.Println("Catalog ID is empty")
		return
	}

	var catalog model.Catalog
	if err := DB.Where("id = ?", purchase.CatalogID).First(&catalog).Error; err != nil {
		log.Println("Catalog not found")
		return
	}
	if catalog.Stock > 0 {
		catalog.Stock -= purchase.Quantity
		if err := DB.Save(&catalog).Error; err != nil {
			log.Print("Failed to update catalog")
		} else {
			log.Println("Catalog stock updated")
		}
	} else {
		log.Println("Catalog out of stock")
	}
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
