update characters
set char_name = $1,
classes = $2,
lvl = $3,
health = $4,
strength = $5,
dexterity = $6,
constitution = $7,
intelligence = $8,
wisdom = $9,
charisma = $10
where character_id = $11;
