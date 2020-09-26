
const CreatureData = [
    { 
      name: "Goblins", 
      initialSize: 18,
      creatureHp: 7, 
      armorClass: 15, 
      attackOptions:[{name:"Scimitar",  saving: false, bonus:4, damDie:6, numDie:1, damBonus:2, type:"Slashing"}, 
                      {name:"Shortbow",  saving: false, bonus:4, damDie:6, numDie:1, damBonus:2, type:"Piercing"},
                        {name:"Sacred Flame", saving:true, savingType: "DEX", DC:12, damDie:8, numDie:1, damBonus:0, type:"Radiant"}],
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
      initialSize: 2,
      creatureHp: 5, 
      armorClass: 12, 
      attackOptions:[{name:"Dagger", saving: false, bonus:4, damDie:4, numDie:1, damBonus:2, type:"Piercing"},
                      {name:"Sling", saving: false, bonus:4, damDie:4, numDie:1, damBonus:2, type:"Bludgeoning"},],
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
      initialSize: 13,
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
    }
  ]

  export default CreatureData