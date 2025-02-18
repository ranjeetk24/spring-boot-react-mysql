package com.tutorial.backend.repository;


import com.tutorial.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    @Query(value = "SELECT * FROM USER WHERE email LIKE CONCAT('%', ?1, '%')", nativeQuery = true)
    public List<User> findByEmail(@Param("email") String email);
}