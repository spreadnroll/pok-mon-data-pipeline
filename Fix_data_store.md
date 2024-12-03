# Removing Orphaned Data from `pokemon_types` and `pokemon_abilities` Tables

To maintain data integrity, orphaned records (invalid references) in the `pokemon_types` and `pokemon_abilities` tables were removed using the following SQL queries (you can use "DB browser for SQLite" for this purpose and launch these queries. Link to download: https://sqlitebrowser.org/dl/):

### 1. Remove Orphaned `type_id` in `pokemon_types`:
```sql
DELETE FROM pokemon_types 
WHERE type_id NOT IN (SELECT id FROM types);
```

### 2. Remove Orphaned ability_id in pokemon_abilities:
```sql
DELETE FROM pokemon_abilities 
WHERE ability_id NOT IN (SELECT id FROM abilities);
```
---------------

These queries ensure that all references in the pokemon_types and pokemon_abilities tables are valid by removing rows that reference non-existing type_id or ability_id.

----------

There are types associations wrong in that API so you have to fix them with some queries for characters like charizard, charmeleon, venusaur ecc.

### 1. To add fire type in some of the characters:
Charizard:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (6, 3);

```

Then remove Bug type:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = 6 AND type_id = 6;
```

Add Fire in Vulpix:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (37, 3); 
```

Growlithe:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (58, 3);
```

Arcanine:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (59, 3);
```

Flareon:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (136, 3);
```

Magmar:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (126, 3);
```

Ninetales:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES (38, 3);
```

Query to verify if you add fire type correctly in pokemons:
```sql
SELECT p.name AS pokemon_name, t.type_name
FROM pokemon p
JOIN pokemon_types pt ON p.id = pt.pokemon_id
JOIN types t ON pt.type_id = t.id
WHERE t.type_name = 'fire'
ORDER BY p.name;
```

### 2. To fix type errors in Venusaur:
```sql
Remove fire:
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'venusaur') AND type_id = 3;
```

To insert Grass and Poison types:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'venusaur'), 1), 
       ((SELECT id FROM pokemon WHERE name = 'venusaur'), 2);
```

To verify if is all correct:
```sql
SELECT pt.type_id, t.type_name
FROM pokemon_types pt
JOIN types t ON pt.type_id = t.id
WHERE pt.pokemon_id = (SELECT id FROM pokemon WHERE name = 'venusaur');
```

### 3. Other pokemons to fix:
Beedril.
Remove ice type:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'beedrill') AND type_id = 15;
```

Add bug:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'beedrill'), 6); 
```

Blastoise.
Remove Ground:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'blastoise') AND type_id = 9;
```

Add Water:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'blastoise'), 5);
```

Correct Pidgeotto:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'pidgeotto') AND type_id = 17; 
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'pidgeotto'), 4);  
```

Correct Pidgey:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'pidgey') AND type_id = 16;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'pidgey'), 7), 4;
```

Correct Wartotle:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'wartortle') AND type_id = 8;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'wartortle'), 5);
```

Correct Weedle:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'weedle') AND type_id = 13;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'weedle'), 6), (SELECT id FROM pokemon WHERE name = 'weedle'), 2; 
```

Correct Metapod:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'metapod') AND type_id = 11;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'metapod'), 6);
```

Correct Charmeleon:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'charmeleon') AND type_id = 5;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'charmeleon'), 3);
```

Correct Butterfree:
```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'butterfree') AND type_id = 12;
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'butterfree'), 6),
       ((SELECT id FROM pokemon WHERE name = 'butterfree'), 4);
```

Correct Ivysaur:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
VALUES ((SELECT id FROM pokemon WHERE name = 'ivysaur'), 1);
```

Final control:
```sql
SELECT p.name AS pokemon_name, t.type_name
FROM pokemon p
JOIN pokemon_types pt ON p.id = pt.pokemon_id
JOIN types t ON pt.type_id = t.id
ORDER BY p.name, t.type_name;
```