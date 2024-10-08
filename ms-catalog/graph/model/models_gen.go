// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Catalog struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Stock       int     `json:"stock"`
	Price       float64 `json:"price"`
	Image       string  `json:"image"`
}

type Mutation struct {
}

type NewCatalog struct {
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Stock       int     `json:"stock"`
	Price       float64 `json:"price"`
	Image       string  `json:"image"`
}

type PurchaseResponse struct {
	Success bool   `json:"success"`
	Message string `json:"message"`
}

type Query struct {
}
