package com.cloudorder.backend.model;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class Order {

    private String id;
    private String customerName;
    private Double totalAmount;
    private String status;
    private LocalDateTime createdAt;

    public Order() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = LocalDateTime.now();
        this.status = "CREATED";
    }

    public Order(String customerName, Double totalAmount) {
        this();
        this.customerName = customerName;
        this.totalAmount = totalAmount;
    }
}