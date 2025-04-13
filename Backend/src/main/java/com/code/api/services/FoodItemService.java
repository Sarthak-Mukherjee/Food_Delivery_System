package com.code.api.services;

import com.code.api.entity.FoodItem;
import com.code.api.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService implements IFoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepo;

    @Override
    public List<FoodItem> findAll() {
        return foodItemRepo.findAll();
    }

    @Override
    public FoodItem findById(int id) {
        Optional<FoodItem> optional = foodItemRepo.findById(id);
        return optional.orElse(null);
    }

    @Override
    public FoodItem save(FoodItem foodItem) {
        // Save new food item, including category and image
        return foodItemRepo.save(foodItem);
    }

    @Override
    public String deleteById(int id) {
        if (foodItemRepo.existsById(id)) {
            foodItemRepo.deleteById(id);
            return "Food item deleted successfully";
        } else {
            return "Food item not found";
        }
    }

    @Override
    public FoodItem update(int id, FoodItem updatedItem) {
        Optional<FoodItem> optional = foodItemRepo.findById(id);
        if (optional.isPresent()) {
            FoodItem existingItem = optional.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setDescription(updatedItem.getDescription());
            existingItem.setPrice(updatedItem.getPrice());
            existingItem.setCategory(updatedItem.getCategory());  // Set category
            existingItem.setImage(updatedItem.getImage());        // Set image
            return foodItemRepo.save(existingItem);
        } else {
            return null;
        }
    }
}
