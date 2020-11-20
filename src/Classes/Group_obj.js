import Attack_obj from './Attack_obj'


class Saves_obj {
    constructor() {
        this.STR = 0;
        this.DEX = 0;
        this.CON = 0;
        this.WIS = 0;
        this.INT = 0;
        this.CHA = 0;
    }



}




class Group_obj {
    constructor(key) {
        this.key = key

        this.name = "Name"
        this.creatures = [5]
        this.initialSize = 1
        this.creatureHp = 5
        this.armorClass = 10
        this.attackOptions = [new Attack_obj("Unarmed")]
        this.Saves = new Saves_obj()
        this.notes = "This is where you can write additional notes"
    }

    

}

export default Group_obj




