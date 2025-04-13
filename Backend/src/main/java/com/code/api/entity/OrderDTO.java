package com.code.api.entity;

import com.code.api.entity.FoodItem;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {
    private int id;
    private int userId;
    private String username;
    private List<FoodItem> foodItems;
    private LocalDateTime dateTime;
    private String status;

    // Constructors
    public OrderDTO() {}

    public OrderDTO(int id, int userId, String username, List<FoodItem> foodItems, LocalDateTime dateTime, String status) {
        this.id = id;
        this.userId = userId;
        this.username = username;
        this.foodItems = foodItems;
        this.dateTime = dateTime;
        this.status = status;
    }

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<FoodItem> getFoodItems() {
		return foodItems;
	}

	public void setFoodItems(List<FoodItem> foodItems) {
		this.foodItems = foodItems;
	}

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

    // Getters and Setters
    // (generate using your IDE or Lombok if you're using it)
}
