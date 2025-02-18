package com.tutorial.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "User")
public class User {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email",unique=true)
    private String email;
    @Column(name = "mobile_number")
    private String mobileNumber;

    public User(String firstName, String lastName, String email, String mobileNumber){

        this.firstName = firstName;
        this.lastName = lastName;
        this.email =email;
        this.mobileNumber = mobileNumber;
    }

}