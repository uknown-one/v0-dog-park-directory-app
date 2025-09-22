-- Database schema for dog park directory
-- Create tables for parks, users, reviews, and favorites

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Parks table
CREATE TABLE IF NOT EXISTS parks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    average_rating DECIMAL(3, 2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    is_approved BOOLEAN DEFAULT FALSE,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    park_id UUID NOT NULL REFERENCES parks(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_name VARCHAR(255) NOT NULL,
    user_avatar TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(park_id, user_id)
);

-- Favorites table (many-to-many relationship between users and parks)
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    park_id UUID NOT NULL REFERENCES parks(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, park_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_parks_location ON parks(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_parks_city_state ON parks(city, state);
CREATE INDEX IF NOT EXISTS idx_parks_approved ON parks(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_park_id ON reviews(park_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_park_id ON favorites(park_id);

-- Function to update average rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_park_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE parks 
    SET 
        average_rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM reviews 
            WHERE park_id = COALESCE(NEW.park_id, OLD.park_id) 
            AND is_approved = TRUE
        ),
        total_reviews = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE park_id = COALESCE(NEW.park_id, OLD.park_id) 
            AND is_approved = TRUE
        )
    WHERE id = COALESCE(NEW.park_id, OLD.park_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update park ratings
DROP TRIGGER IF EXISTS trigger_update_park_rating_insert ON reviews;
CREATE TRIGGER trigger_update_park_rating_insert
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_park_rating();

DROP TRIGGER IF EXISTS trigger_update_park_rating_update ON reviews;
CREATE TRIGGER trigger_update_park_rating_update
    AFTER UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_park_rating();

DROP TRIGGER IF EXISTS trigger_update_park_rating_delete ON reviews;
CREATE TRIGGER trigger_update_park_rating_delete
    AFTER DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_park_rating();
