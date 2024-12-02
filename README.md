# Pokémon Data Pipeline Project

## Description
This project retrieves Pokémon data from the PokéAPI, processes it, stores it in a relational database (SQLite), and provides advanced analytics via SQL queries. Analytics include classifying Pokémon by characteristics such as weight, number of abilities, base experience, and damage relationships between types.

## Setup
1. Clone the repository.
2. Make sure you have Node.js installed (latest version) and its dependencies. You may also need C++ and Python development packages to get SQLite3 working properly.
3. Install dependencies using `npm install` (if using Node.js).
4. Run `npm run start` or `node src/index.js` to fetch and store Pokémon data.

## SQL Queries

### 1. Top 5 Heaviest Pokémon per Type
```sql
SELECT t.type_name, p.name AS pokemon_name, p.weight
FROM pokemon p
JOIN pokemon_types pt ON p.id = pt.pokemon_id
JOIN types t ON pt.type_id = t.id
ORDER BY t.type_name, p.weight DESC
LIMIT 5;
```

--- Expected result: This query returns the top 5 heaviest Pokémon per each type, ordered by weight in descending order: 
type_name   pokemon_name       weight
bug	        beedrill	       295
bug	        metapod	           99
bug	        caterpie	       29
dragon	    dratini	           33
electric	pikachu	           60

---

### 2. Pokémons with the Most Abilities
```sql
SELECT p.name AS pokemon_name, COUNT(pa.ability_id) AS ability_count
FROM pokemon p
JOIN pokemon_abilities pa ON p.id = pa.pokemon_id
GROUP BY p.id
ORDER BY ability_count DESC;
```


--- Expected result: this query returns the Pokémons with the most abilities (3).
pokemon_name     ability_count
pidgey	              3
rattata         	  3
clefairy	          3
diglett	              3
psyduck	              3
mankey	              3
machop	              3
tentacool	          3
slowpoke	          3
seel	              3
grimer	              3
shellder	          3
hitmonlee	          3
chansey	              3
pinsir	              3
eevee	              3

---



### 3. Average Base Experience per Type (Optional)
```sql
SELECT t.type_name, AVG(p.base_experience) AS average_experience
FROM pokemon p
JOIN pokemon_types pt ON p.id = pt.pokemon_id
JOIN types t ON pt.type_id = t.id
GROUP BY t.type_name
ORDER BY average_experience DESC;
```
--- expected resut: 
type_name             average_experience
flying	                    194.5
ice	                        166.0
grass	                    163.5
water	                156.666666666667
poison	                156.333333333333
fire	                147.666666666667
psychic	                    130.0
fairy	                    113.0
electric	                112.0
bug	                    96.3333333333333
steel	                    68.5
ghost	                    62.0
fighting	                61.0
rock	                    60.0
ground	                    60.0
dragon	                    60.0
normal	                    50.0
----



### 4. Strongest and Weakest Damage Relations (Optional)
This query retrieves the relationships between Pokémon types, indicating which types deal double damage, half damage, or no damage to other types. This is useful for understanding type effectiveness in battles.

```sql
SELECT tr.attacking_type, tr.defending_type, tr.relation_type
FROM type_relations tr
ORDER BY tr.attacking_type, tr.defending_type;
```
--- Expected result:
This query returns a list of type matchups with the type of damage dealt (double, half, or no damage):


Attacking Type	     Defending Type	                Relation Type
dragon	                  fairy	                     no_damage_to
electric	             electric	                 half_damage_to
electric	              flying	                 double_damage_to
electric	              ground	                 no_damage_to
electric	              water	                     double_damage_to
fighting	              flying	                 half_damage_to
fighting	              ghost	                     no_damage_to
fighting	              psychic	                 half_damage_to
fire	                   bug	                     double_damage_to
fire	                   fire	                     half_damage_to
fire	                   grass	                 double_damage_to
fire	                   ice	                     double_damage_to
ghost	                   normal	                 no_damage_to
grass	                  electric	                 half_damage_to
grass	                    fire	                 half_damage_to
grass	                   water	                 double_damage_to
ground	                  electric	                 half_damage_to
normal	                   ghost	                  no_damage_to
psychic	                  fighting	                 double_damage_to
water	                    fire	                 double_damage_to
water	                    water	                   half_damage_to




Description:
double_damage_to: The attacking type deals double damage to the defending type.
half_damage_to: The attacking type deals half damage to the defending type.
no_damage_to: The attacking type deals no damage to the defending type.
These relationships are central to Pokémon battle strategies, where knowing the strengths and weaknesses of each type can give players a tactical advantage.