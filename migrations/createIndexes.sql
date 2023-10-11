-- For WHERE clause in `citiesPopulationQuery` and `cityMembersQuery` and for GROUP BY and ORDER BY clauses.
CREATE INDEX idx_cities_name ON cities(name);

-- For JOIN condition in `citiesPopulationQuery` and `cityMembersQuery`.
CREATE INDEX idx_residents_city_id ON residents(city_id);

-- For GROUP BY clause in `cityMembersQuery`.
CREATE INDEX idx_residents_first_name ON residents(first_name);