# Removing Orphaned Data from `pokemon_types` and `pokemon_abilities` Tables

To maintain data integrity, orphaned records (invalid references) in the `pokemon_types` and `pokemon_abilities` tables were removed using the following SQL queries:

### 1. Remove Orphaned `type_id` in `pokemon_types`:
```sql
DELETE FROM pokemon_types 
WHERE type_id NOT IN (SELECT id FROM types);

### 2. Remove Orphaned ability_id in pokemon_abilities:

DELETE FROM pokemon_abilities 
WHERE ability_id NOT IN (SELECT id FROM abilities);

---------------

These queries ensure that all references in the pokemon_types and pokemon_abilities tables are valid by removing rows that reference non-existing type_id or ability_id.
