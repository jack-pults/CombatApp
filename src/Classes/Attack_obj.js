class Attack_obj {
    constructor(name="Unarmed", saving=false, bonus=1, damDie=1, numDie=1, damBonus=0, type="bludgeoning", savingType="DEX", DC=5){

        this.name = name 
        this.saving = saving 
        this.bonus = bonus 
        this.damDie = damDie 
        this.numDie = numDie 
        this.damBonus = damBonus 
        this.type = type

        if (saving) {
            this.savingType = savingType 
            this.DC = DC 
        }

    }



}

export default Attack_obj