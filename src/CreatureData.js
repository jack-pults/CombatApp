
const CreatureData = [
    { 
      name: "Acolytes", 
      creatureHp: 9, 
      armorClass: 10, 
      attackOptions:[{name:"Club", saving: false, bonus:2, damDie:4, numDie:1, damBonus:0, type:"Bludgeoning"},
      {name:"Sacred Flame", saving: true, bonus:0, damDie:8, numDie:1, damBonus:0, type:"Radiant", savingType:"DEX", DC:12, range:"60"}],
      Saves: {
        STR:0, 
        DEX:0, 
        CON:0, 
        INT:0, 
        WIS:2, 
        CHA:0
      },
      notes: "Spellcasting. The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared: Cantrips (at will): light, sacred flame, thaumaturgy. 1st level (3 slots): bless, cure wounds, sanctuary"
    },
    { 
      name: "Animated Armor", 
      creatureHp: 33, 
      armorClass: 18, 
      attackOptions:[{name:"Slam", saving: false, bonus:4, damDie:6, numDie:1, damBonus:2, type:"Bludgeoning"}],
      Saves: {
        STR:2, 
        DEX:0, 
        CON:1, 
        INT:-5, 
        WIS:-4, 
        CHA:-5
      },
      notes: "Multiattack. The armor makes two melee attacks. Antimagic Susceptibility. The armor is incapacitated while in the area of an antimagic field. If targeted by dispel magic, the armor must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute. False Appearance. While the armor remains motionless, it is indistinguishable from a normal suit of armor."
    },
    { 
      name: "Apes", 
      creatureHp: 19, 
      armorClass: 12, 
      attackOptions:[{name:"Fist", saving: false, bonus:5, damDie:6, numDie:1, damBonus:3, type:"Bludgeoning"},
                      {name:"Rock", saving: false, bonus:5, damDie:6, numDie:1, damBonus:3, type:"Bludgeoning", range:"25/50"}],
      Saves: {
        STR:3, 
        DEX:2, 
        CON:2, 
        INT:-2, 
        WIS:1, 
        CHA:-2
      },
      notes: "Multiattack. The ape makes two fist attacks."
    },
    { 
      name: "Giant Badgers", 
      creatureHp: 13, 
      armorClass: 10, 
      attackOptions:[{name:"Bite", saving: false, bonus:3, damDie:6, numDie:1, damBonus:1, type:"Piercing"},
                      {name:"Claws", saving: false, bonus:3, damDie:4, numDie:2, damBonus:1, type:"Slashing"}],
      Saves: {
        STR:1, 
        DEX:0, 
        CON:2, 
        INT:-4, 
        WIS:1, 
        CHA:-3
      },
      notes: "Keen Smell. The badger has advantage on Wisdom (Perception) checks that rely on smell. Multiattack. The badger makes two attacks: one with its bite and one with its claws."
    }, 
    { 
      name: "Goblins", 
      creatureHp: 7, 
      armorClass: 15, 
      attackOptions:[{name:"Scimitar",  saving: false, bonus:4, damDie:6, numDie:1, damBonus:2, type:"Slashing"}, 
                      {name:"Shortbow",  saving: false, bonus:4, damDie:6, numDie:1, damBonus:2, type:"Piercing", range:"80/320"}],
      Saves: {
        STR:-1, 
        DEX:2, 
        CON:0, 
        INT:0, 
        WIS:-1, 
        CHA:-1
      },
      notes: "Nimble Escape. The goblin can take the Disengage or Hide action as a bonus action on each of its turns."
    },
    { 
      name: "Kobolds", 
      creatureHp: 5, 
      armorClass: 12, 
      attackOptions:[{name:"Dagger", saving: false, bonus:4, damDie:4, numDie:1, damBonus:2, type:"Piercing"},
                      {name:"Sling", saving: false, bonus:4, damDie:4, numDie:1, damBonus:2, type:"Bludgeoning", range:"30/120"},],
      Saves: {
        STR:-2, 
        DEX:2, 
        CON:-1, 
        INT:-1, 
        WIS:-2, 
        CHA:-1
      },
      notes: "Sunlight Sensitivity. While in sunlight, the kobold has disadvantage on attack rolls, as well as on Wisdom (Perception) checks that rely on sight. Pack Tactics. The kobold has advantage on an attack roll against a creature if at least one of the kobold's allies is within 5 ft. of the creature and the ally isn't incapacitated."
    },
    { 
      name: "Reef Sharks", 
      creatureHp: 22, 
      armorClass: 12, 
      attackOptions:[{name:"Bite", saving: false, bonus:4, damDie:8, numDie:1, damBonus:2, type:"Piercing"}],
      Saves: {
        STR:2, 
        DEX:1, 
        CON:1, 
        INT:-5, 
        WIS:0, 
        CHA:-3
      },
      notes: "Pack Tactics. The shark has advantage on an attack roll against a creature if at least one of the shark's allies is within 5 ft. of the creature and the ally isn't incapacitated. Water Breathing. The shark can breathe only underwater."
    },
    { 
      name: "Zombies", 
      creatureHp: 22, 
      armorClass: 8, 
      attackOptions:[{name:"Slam", saving: false, bonus:3, damDie:6, numDie:1, damBonus:1, type:"Bludgeoning"}],
      Saves: {
        STR:1, 
        DEX:-2, 
        CON:+3, 
        INT:-4, 
        WIS:-2, 
        CHA:-3
      },
      notes: "Undead Fortitude. If damage reduces the zombie to 0 hit points, it must make a Constitution saving throw with a DC of 5+the damage taken, unless the damage is radiant or from a critical hit. On a success, the zombie drops to 1 hit point instead."
    }
  ]

  export default CreatureData


/*   ,
    { 
      name: "", 
      creatureHp: 22, 
      armorClass: 12, 
      attackOptions:[{name:"Bite", saving: false, bonus:4, damDie:8, numDie:1, damBonus:2, type:"Piercing"}],
      Saves: {
        STR:2, 
        DEX:1, 
        CON:1, 
        INT:-5, 
        WIS:0, 
        CHA:-3
      },
      notes: ""
    } */