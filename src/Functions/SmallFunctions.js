

class SmallFunctions  {


    static numAboveZero(array) {

        let alive = array.reduce( 
            (total, element) => 
                { 
                if (element > 0) 
                    return (total + 1) 
                else 
                    return (total) 
                }
            , 0
            )

        return alive
            }
            
        
    static shuffle(array) {
        let m = array.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
      
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
      
        return array;
      }

    static rollDice(rolltype, length) {
        let roll = 0;
        let array = []
        for (let i =0; i < length; i++) {
            switch(rolltype) {
                case "Advantage":
                    roll = Math.max( Math.floor(Math.random()*20+1), Math.floor(Math.random()*20+1))
                    break;
                case "Disadvantage":
                    roll = Math.min( Math.floor(Math.random()*20+1), Math.floor(Math.random()*20+1))
                    break;
                default:
                    roll = Math.floor(Math.random()*20+1)
                    break;
            }
            array.push(roll)
        }
        return array
    }

}

export default SmallFunctions