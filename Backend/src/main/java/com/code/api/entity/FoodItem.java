package com.code.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "food_items")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private int id;

    private String name;
    private String description;
    private double price;
    private String category;  // New category field
    private String image;     // New image field

    @ManyToMany(mappedBy = "foodItems")
    @JsonIgnore
    private List<Cart> carts;

    // Default constructor
    public FoodItem() {}

    // Constructor including category and image
    public FoodItem(String name, String description, double price, String category, String image) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;  // Getter for category
    }

    public void setCategory(String category) {
        this.category = category;  // Setter for category
    }

    public String getImage() {
        return image;  // Getter for image
    }

    public void setImage(String image) {
        this.image = image;  // Setter for image
    }

    public List<Cart> getCarts() {
        return carts;
    }

    public void setCarts(List<Cart> carts) {
        this.carts = carts;
    }
}
