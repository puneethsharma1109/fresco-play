package com.example.project.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.Models.Book;
import com.example.project.Models.BorrowBook;
import com.example.project.Models.User;
import com.example.project.Repository.BookRepository;
import com.example.project.Repository.BorrowBookRepository;
import com.example.project.Repository.UserRepository;

@Service
public class BorrowBookService {

    @Autowired
    private BorrowBookRepository repository;

    public BorrowBook save(BorrowBook borrowBook){
        return repository.save(borrowBook);
    }

	public Optional<BorrowBook> findById(int id){
        return repository.findById(id);
    }

    public List<BorrowBook> findAll(){
        return repository.findAll();
    }
}
