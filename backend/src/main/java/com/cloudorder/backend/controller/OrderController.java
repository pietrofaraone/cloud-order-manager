package com.cloudorder.backend.controller;

import com.cloudorder.backend.model.Order;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {


    private List<Order> orders = new ArrayList<>();

    public OrderController() {
        orders.add(new Order("Mario Rossi", 99.99));
        orders.add(new Order("Pietro Faraone", 150.50));
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orders;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        orders.add(order);
        return order;
    }
}