//Mathemtic Modal Machine
/* 
------------TODO-----------
    Get data is 2d array:
        [ 
            [ 1,0,0 ] //9 x arr = [0 , 1], arr = [x,y] arr[0]=>x 1-9 // +1//2+2+5
            [ 2,0,0 ] //9 y arr = [1,1]
            [ 1,0,0 ] //6 d
        ]
        [ 
            [ 1,2,2 ]
            [ 1,2,2 ] =>
            [ 2,2,2 ]
            
            [ 1,0,1 ]
            [ 2,0,2 ] => 
            [ 2,2,1 ]
            2*(3*3+9*9)
            
        ]
    1. Rules AI Makes first move 
    
        upload data shema
    
    2. If shema return false -> pass data into algorithm
    3. If shema return true -> Pass data to shema
    4. return array [x,y,id]
    
    Algorithm shema: 
        check X and Y coordinate
        Print figure if Combi indicator == 2 
        If Combi method != 2  ? Print random figure position exeption PlayerPositions 
        
    Also realize in Game class methods and called skyNet methods 
    In GameInterface realize some animations
    
   >>>>>>>>>>Shema<<<<<<<<<
   realize class with shema data 
   
   - methods need return position of figure([x,y,id]) or bool:false
*/

class ShemaMachine {
    
    constructor(ArrayM){
        this.pole = ArrayM;
    }
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    getRandomPos(){
       var GameArray = this.pole;
        var x = this.getRandomIntInclusive(0,2);
        var y=this.getRandomIntInclusive(0,2);
        if(GameArray[x][y]!=2){
            return this.getRandomPos();
        }
        else {
            return [x,y];
        }
    }
    checkGamePole(){
        var GameArray=this.pole;
        var Combi0 =0; //0
        var Combi=0; //x
        var EmptyBox=0;
        for(var i = 0; i < 3; i++){
            if(GameArray[i][i]==1){
                Combi=Combi+1;
            }
            
        
            if(GameArray[i][i]==2){
                EmptyBox=[ i, i];
            }
            if(GameArray[i][i]==0){
                Combi0=Combi0+1;
            }
    
        }
        if(Combi==2 || Combi0 == 2){
            return EmptyBox;
        }
        Combi0=0;
        EmptyBox=0;
        Combi = 0;
        var j=0
        for(var i = 2; i >= 0; i--){ //reverse for 
            if(GameArray[j][i]==1){
                Combi=Combi+1;
            }
            if(GameArray[i][i]==2){
                EmptyBox=[ i,i];
            }
            if(GameArray[i][i]==0){
                Combi0=Combi0+1;
            }
            j++;
        }
        if(Combi==2 || Combi0 == 2){
            return EmptyBox;
        }
        var CombiX = 0;
        var CombiY = 0;
        var CombiX0 = 0;
        var CombiY0 = 0;
        for (var i = 0;i<3;i++){
            for(var j = 0;j<3;j++){
                if(GameArray[i][j]==1 || GameArray[i][j]==0){
                    CombiX++;
                }
                if(GameArray[j][i]==1 || GameArray[j][i]==0){
                    CombiY++;
                }
                if(GameArray[j][i] == 2){
                    EmptyBox = [ j, i];
                }
                if(GameArray[i][j] == 2){
                    EmptyBox = [i, j];
                }
            }
             if(CombiX==2 || CombiY == 2){
                return EmptyBox;
            }
            CombiX=0;
            CombiY=0;
        }
        
        return this.getRandomPos();//return [x,y]
    }
}
class PseudoSkyNet extends ShemaMachine {
    constructor(GamePole){
        super(GamePole);
        this.pole  = GamePole;
    
    }
    setPole(arr){
        this.pole=arr;
    }
    getPole(){
        return this.pole;
    }
    
    convertIntoId(arr){ //arr[y,x]
        if(arr[0]==0){
            return '#f'+parseInt(arr[0]+arr[1]+1);//1-3 0+1+1 =2 
        }
        if(arr[0]==1){
            return '#f'+parseInt(arr[0]+arr[1]+3);
        }
        if(arr[0]==2){
            return '#f'+parseInt(arr[0]+arr[1]+5);
        }
        
    }
}

















