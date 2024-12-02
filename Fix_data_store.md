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

### 1. To add fire type in Charizard:
```sql
`UPDATE pokemon_types
SET type_id = (SELECT id FROM types WHERE type_name = 'fire')
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'charizard');
```

Then add Flying type:
```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
SELECT (SELECT id FROM pokemon WHERE name = 'charizard'), (SELECT id FROM types WHERE type_name = 'flying');
```

### 2. To add grass and poison types in Venusaur:
```sql
UPDATE pokemon_types
SET type_id = (SELECT id FROM types WHERE type_name = 'grass')
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'venusaur');
```

```sql
UPDATE pokemon_types
SET type_id = (SELECT id FROM types WHERE type_name = 'poison')
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'venusaur');


### 3. Remove water and update with fire in Charmeleon:

```sql
DELETE FROM pokemon_types
WHERE pokemon_id = (SELECT id FROM pokemon WHERE name = 'charmeleon')
AND type_id = (SELECT id FROM types WHERE type_name = 'water');`
```

```sql
INSERT INTO pokemon_types (pokemon_id, type_id)
SELECT (SELECT id FROM pokemon WHERE name = 'charmeleon'), (SELECT id FROM types WHERE type_name = 'fire');
```

### 4. You can also check with this queries if you have wrong types associated with character:

```sql
SELECT p.name, GROUP_CONCAT(t.type_name) AS types
FROM pokemon p
JOIN pokemon_types pt ON p.id = pt.pokemon_id
JOIN types t ON pt.type_id = t.id
GROUP BY p.name
HAVING p.name = 'charmeleon';`
```

