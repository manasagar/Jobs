package com.Job.restservices.service;

import com.Job.restservices.repository.UserRepository;
import com.Job.restservices.entity.User;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    public User register(User user) throws Exception{
        if(userRepository.findByEmail(user.getEmail()).isPresent()){
         throw new BadRequestException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public User get(String userId) {
        return userRepository.findByEmail(userId).get();
    }

}
