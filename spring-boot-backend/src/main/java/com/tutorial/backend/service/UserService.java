package com.tutorial.backend.service;

import com.tutorial.backend.entity.User;
import com.tutorial.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User create(User user) {
        return repository.save(user);
    }

    public void delete(int id) {
        Optional<User> user = findById(id);
        if (user != null) {
            repository.delete(user.get());
        }
    }

    public List<User> findAll() {
        List<User> userList = new ArrayList<User>();
        repository.findAll().forEach(userList::add);
        return userList;
    }

    public Optional<User> findById(long id) {
        Optional<User> user = repository.findById(id);
        return user;
    }

    public User update(User user) {
        return repository.save(user);
    }

    public void deleteAll() {
        repository.deleteAll();
    }

    public List<User> findByEmail(String email) {

        return repository.findByEmail(email);
    }
}
