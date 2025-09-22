-- Seed data with 20 sample dog parks across different cities
-- Insert sample users first
INSERT INTO users (id, name, email, is_admin) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Admin User', 'admin@pawparks.com', TRUE),
('550e8400-e29b-41d4-a716-446655440001', 'John Smith', 'john@example.com', FALSE),
('550e8400-e29b-41d4-a716-446655440002', 'Sarah Johnson', 'sarah@example.com', FALSE),
('550e8400-e29b-41d4-a716-446655440003', 'Mike Wilson', 'mike@example.com', FALSE),
('550e8400-e29b-41d4-a716-446655440004', 'Emily Davis', 'emily@example.com', FALSE)
ON CONFLICT (email) DO NOTHING;

-- Insert sample parks
INSERT INTO parks (id, name, description, address, city, state, zip_code, latitude, longitude, amenities, images, is_approved, created_by) VALUES
('650e8400-e29b-41d4-a716-446655440000', 'Central Bark Dog Park', 'A spacious fenced dog park in the heart of downtown with separate areas for large and small dogs. Features include water fountains, agility equipment, and plenty of shade trees.', '123 Main St', 'Austin', 'TX', '78701', 30.2672, -97.7431, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'small-dogs', 'large-dogs', 'agility'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440000'),

('650e8400-e29b-41d4-a716-446655440001', 'Riverside Paws Park', 'Beautiful riverside location with trails and open fields. Perfect for dogs who love to run and play fetch. The park offers stunning views and a peaceful atmosphere.', '456 River Rd', 'Portland', 'OR', '97201', 45.5152, -122.6784, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440001'),

('650e8400-e29b-41d4-a716-446655440002', 'Pup Paradise', 'Premium dog park with modern amenities including a dog wash station, covered pavilion, and professional-grade agility course. Membership required but worth every penny.', '789 Oak Ave', 'Denver', 'CO', '80202', 39.7392, -104.9903, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'agility', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440002'),

('650e8400-e29b-41d4-a716-446655440003', 'Woofington Commons', 'Community-favorite dog park with a friendly atmosphere. Regular events and meetups make this a great place to socialize both dogs and owners.', '321 Pine St', 'Seattle', 'WA', '98101', 47.6062, -122.3321, ARRAY['fenced', 'off-leash', 'water', 'parking', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440003'),

('650e8400-e29b-41d4-a716-446655440004', 'Sunset Hills Dog Run', 'Hilltop location with panoramic city views. Features multiple fenced areas and is especially beautiful during sunset hours.', '654 Hill Dr', 'San Francisco', 'CA', '94102', 37.7749, -122.4194, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'small-dogs', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440004'),

('650e8400-e29b-41d4-a716-446655440005', 'Bark Avenue Park', 'Urban oasis in the middle of the city. Well-maintained with excellent drainage and artificial turf areas that stay clean year-round.', '987 Broadway', 'New York', 'NY', '10001', 40.7128, -73.9860, ARRAY['fenced', 'off-leash', 'water', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440000'),

('650e8400-e29b-41d4-a716-446655440006', 'Lakeside Leash-Free Zone', 'Scenic lakeside park where dogs can swim and play in the water. Beach area with sand and shallow entry points perfect for all dog sizes.', '147 Lake Shore Dr', 'Chicago', 'IL', '60601', 41.8781, -87.6298, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440001'),

('650e8400-e29b-41d4-a716-446655440007', 'Pawsome Playground', 'Family-friendly park with playground equipment for kids and agility courses for dogs. Perfect for families with children and pets.', '258 Family Way', 'Phoenix', 'AZ', '85001', 33.4484, -112.0740, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'agility', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440002'),

('650e8400-e29b-41d4-a716-446655440008', 'Mountain View Dog Park', 'Elevated park with stunning mountain views. Features natural terrain with rocks and hills that dogs love to explore.', '369 Mountain Rd', 'Boulder', 'CO', '80301', 40.0150, -105.2705, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440003'),

('650e8400-e29b-41d4-a716-446655440009', 'Coastal Canine Club', 'Beachfront dog park where pups can run on the sand and splash in the waves. Open sunrise to sunset with lifeguard supervision.', '741 Beach Blvd', 'San Diego', 'CA', '92101', 32.7157, -117.1611, ARRAY['off-leash', 'water', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440004'),

('650e8400-e29b-41d4-a716-446655440010', 'Forest Friends Dog Area', 'Wooded park with natural trails and streams. Dogs can explore nature while staying safe in designated off-leash areas.', '852 Forest Ave', 'Portland', 'OR', '97202', 45.5051, -122.6750, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440000'),

('650e8400-e29b-41d4-a716-446655440011', 'Downtown Dog District', 'Modern urban park with contemporary design and high-tech amenities including automated water systems and LED lighting for evening use.', '963 Downtown St', 'Miami', 'FL', '33101', 25.7617, -80.1918, ARRAY['fenced', 'off-leash', 'water', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440001'),

('650e8400-e29b-41d4-a716-446655440012', 'Prairie Paws Park', 'Wide open prairie setting with native grasses and wildflowers. Perfect for dogs who love to run free in natural surroundings.', '174 Prairie Dr', 'Kansas City', 'MO', '64101', 39.0997, -94.5786, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440002'),

('650e8400-e29b-41d4-a716-446655440013', 'Suburban Tails Park', 'Neighborhood gem with well-maintained facilities and active community involvement. Regular cleanup days and social events.', '285 Suburban Ln', 'Atlanta', 'GA', '30301', 33.7490, -84.3880, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440003'),

('650e8400-e29b-41d4-a716-446655440014', 'Industrial Paws Zone', 'Converted industrial space with unique urban character. Features include repurposed shipping containers as shelters and artistic murals.', '396 Industrial Way', 'Detroit', 'MI', '48201', 42.3314, -83.0458, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440004'),

('650e8400-e29b-41d4-a716-446655440015', 'Historic Hounds Park', 'Located in the historic district with charming brick pathways and vintage-style amenities. Rich history dating back to the 1920s.', '507 Historic St', 'Boston', 'MA', '02101', 42.3601, -71.0589, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440000'),

('650e8400-e29b-41d4-a716-446655440016', 'Desert Dogs Oasis', 'Desert-themed park with drought-resistant landscaping and cooling stations. Designed specifically for hot climate conditions.', '618 Desert Rd', 'Las Vegas', 'NV', '89101', 36.1699, -115.1398, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'small-dogs', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440001'),

('650e8400-e29b-41d4-a716-446655440017', 'Valley View Dog Run', 'Nestled in a scenic valley with rolling hills and mature oak trees. Multiple elevation levels provide variety and exercise.', '729 Valley View Dr', 'Nashville', 'TN', '37201', 36.1627, -86.7816, ARRAY['off-leash', 'water', 'shade', 'parking', 'large-dogs'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440002'),

('650e8400-e29b-41d4-a716-446655440018', 'Northside Pup Plaza', 'Community-centered park with covered pavilions for events and gatherings. Popular spot for dog birthday parties and meetups.', '830 Northside Ave', 'Minneapolis', 'MN', '55401', 44.9778, -93.2650, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440003'),

('650e8400-e29b-41d4-a716-446655440019', 'Eastside Canine Campus', 'Educational dog park with training areas and informational displays about dog behavior and care. Professional trainers available on weekends.', '941 Eastside Blvd', 'Tampa', 'FL', '33601', 27.9506, -82.4572, ARRAY['fenced', 'off-leash', 'water', 'shade', 'parking', 'restrooms', 'small-dogs', 'large-dogs', 'agility', 'benches'], ARRAY['/placeholder.svg?height=300&width=400'], TRUE, '550e8400-e29b-41d4-a716-446655440004')
ON CONFLICT (id) DO NOTHING;

-- Insert sample reviews
INSERT INTO reviews (park_id, user_id, user_name, rating, comment, is_approved) VALUES
('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'John Smith', 5, 'Amazing park! My golden retriever loves the agility course and the separate small dog area is perfect for my friends chihuahua.', TRUE),
('650e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'Sarah Johnson', 4, 'Great facilities and well-maintained. Can get crowded on weekends but thats because its so popular!', TRUE),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'Mike Wilson', 5, 'The riverside location is absolutely beautiful. My lab loves swimming in the river!', TRUE),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'Emily Davis', 5, 'Worth the membership fee! The dog wash station is incredibly convenient and the staff is always helpful.', TRUE),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'John Smith', 4, 'Great community feel. Met so many other dog owners and our pups have made friends too!', TRUE),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'Sarah Johnson', 5, 'The sunset views are incredible! Perfect spot for evening walks with my dog.', TRUE),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Mike Wilson', 3, 'Good location but can be noisy with city traffic. The artificial turf is nice though.', TRUE),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440004', 'Emily Davis', 5, 'My water-loving retriever is in heaven here! The beach area is well-maintained and safe.', TRUE)
ON CONFLICT (park_id, user_id) DO NOTHING;

-- Insert some favorites
INSERT INTO favorites (user_id, park_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440000'),
('550e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002')
ON CONFLICT (user_id, park_id) DO NOTHING;
