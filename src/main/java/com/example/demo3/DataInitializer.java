package com.example.demo3;

import com.example.demo3.service.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private final BookService bookService;

    public DataInitializer(BookService bookService) {
        this.bookService = bookService;
    }
    @Override
    public void run(String... args) throws Exception {
        if (bookService.isBooksTableEmpty()) {
            bookService.saveBooksFromCSV();
        } else {
            System.out.println("Books table's been updated before");
        }

    }
}
