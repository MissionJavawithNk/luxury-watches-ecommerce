package com.luxury.watches.repository;

import com.luxury.watches.model.Watch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchRepository extends JpaRepository<Watch, Long> {
    List<Watch> findByBrand(String brand);
    List<Watch> findByCategory(String category);
}
