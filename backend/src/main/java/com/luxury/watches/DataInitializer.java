package com.luxury.watches;

import com.luxury.watches.model.Watch;
import com.luxury.watches.repository.WatchRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(WatchRepository repository) {
        return args -> {
            repository.saveAll(List.of(
                new Watch(null, "Submariner", "Rolex", "The reference among divers' watches.", 12500.0, "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800", "Diver", 5),
                new Watch(null, "Speedmaster Professional", "Omega", "The first watch worn on the moon.", 6400.0, "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800", "Chronograph", 10),
                new Watch(null, "Nautilus", "Patek Philippe", "The embodiment of elegant sports watch.", 85000.0, "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800", "Luxury", 2),
                new Watch(null, "Royal Oak", "Audemars Piguet", "A revolution in fine watchmaking.", 45000.0, "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&q=80&w=800", "Luxury", 3),
                new Watch(null, "Carrera", "TAG Heuer", "A classic chronograph for the racetrack.", 5200.0, "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800", "Chronograph", 8),
                new Watch(null, "Navitimer B01", "Breitling", "The favorite pilot's watch for over 70 years.", 9200.0, "https://images.unsplash.com/photo-1548171916-c0ea9869275a?auto=format&fit=crop&q=80&w=800", "Pilot", 4),
                new Watch(null, "Reverso Tribute", "Jaeger-LeCoultre", "A masterpiece of Art Deco design.", 11800.0, "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&q=80&w=800", "Dress", 6),
                new Watch(null, "Luminor Marina", "Panerai", "A robust diving watch with an iconic crown guard.", 7900.0, "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800", "Diver", 7)
            ));
        };
    }
}
