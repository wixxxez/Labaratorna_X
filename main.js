class MainGameClass {
    printGameMode(gm){
        $('#GameMode').html('Game mode: '+'<font style="color:orange">'+gm+"</font>");
        if(gm=="2 Players"){
            $('#p2Mode').attr('class','btn btn-outline-primary mb-2 active');
            $('#AIMode').attr('class','btn btn-outline-primary mb-2 ');
        }
        if(gm=="Play vs AI"){
            $('#AIMode').attr('class','btn btn-outline-primary mb-2 active');
            $('#p2Mode').attr('class','btn btn-outline-primary mb-2');
        }
    }
    
    constructor(gameMode){
        this.gameMode = gameMode;
        this.gamePole = [
                            [2,2,2],
                            [2,2,2],
                            [2,2,2]
                        ] ;
        //GameInterfaceVariables
        this.Player1=true;
        this.Player2=false;
        this.FreezeStatus = false;
        this.figureW = '';
        this.PlayerLog = 1;
        this.printGameMode(this.gameMode);
    }
    setGameMode(gM){
        this.gameMode=gm;
    }
    getGameMode(){
        return this.gameMode;
    }
    setGamePole(arrayM){
        this.gamePole=arrayM;
    }
    getGamePole(){
        return this.gamePole;
    }
    createPole(){
        var str = '#f'
        for (var i = 1; i<10; i++){
            $(str+i).html("");
        }
    }
}

class Game extends MainGameClass {
    
    constructor(gm){
        super(gm)
        super.createPole()
        this.FreezeStatus=false;
    }
    findCombination(fig){ //(int) : bool
        var GameArray = this.getGamePole();
        var Combi=0;
        for(var i = 0; i < 3; i++){
            if(GameArray[i][i]==fig){
                Combi=Combi+1;
            }
        }
        if(Combi==3){
            return true;
        }
        Combi = 0;
        var j=0
        for(var i = 2; i >= 0; i--){
            if(GameArray[j][i]==fig){
                Combi=Combi+1;
            }
            j++;
        }
        if(Combi==3){
            return true;
        }
        var CombiX = 0;
        var CombiY = 0;
        
        for (var i = 0;i<3;i++){
            for(var j = 0;j<3;j++){
                if(GameArray[i][j]==fig){
                    CombiX++;
                }
                if(GameArray[j][i]==fig){
                    CombiY++;
                }
            }
             if(CombiX==3 || CombiY == 3){
            return true;
            }
            CombiX=0;
            CombiY=0;
        }
       
        return false;
    }
    
    move(figure,positon) {
        var fig ;
        if(figure=='o'){
                    fig=0;
                }
        if(figure=="x"){
                    fig=1;
            }
        switch(positon){
            case "f1":
                this.gamePole[0][0]=fig;
                  
                break;
            case "f2":
                
                this.gamePole[0][1]=fig;
                
                break;
            case "f3":
            
                this.gamePole[0][2]=fig;
                
                
                break;
            case "f4":
                
                this.gamePole[1][0]=fig;
                
                break;
            case "f5":
               
                this.gamePole[1][1]=fig;
                
                break;
            case "f6":
                
                this.gamePole[1][2]=fig;
                
                break;
            case "f7":
                
                this.gamePole[2][0]=fig;
               
                break;
            case "f8":
               
                this.gamePole[2][1]=fig;
                
                break;
            case "f9":
                
               
                this.gamePole[2][2]=fig;
                
                
                break;
            default:
                 
                break;
        }
        return fig;
            
    }//(str,str)return fig 0 or 1
    
    
    
}
class GameInterface extends MainGameClass {
    
    getFreezeStatus(){
        return this.FrezeeStatus;
    }
    setFreezeStatus(booling){
        this.FrezeeStatus = booling;
    }
    getFigureW(){
        return this.figureW;
    }
    setPlayerLog(log){
        this.PlayerLog = log;
    }
    
    getPlayerLog(){
        return this.PlayerLog;
    }
    setPlayerStatus(PlayerLog){
        if(PlayerLog%2==0){
            this.Player2=true;
            this.Player1=false;
        }
        else {
           this.Player2=false;
            this.Player1=true; 
        }
    }
    getPlayer(){
        if(this.Player1==true){
            return "Player 1";
        }   
        if(this.Player2==true){
            return "Player 2"
        }
    }
    showWinner(figure){
        
        console.log("Player1 = "+this.Player1); 
        var winner = this.getPlayer();
        $('#WinnerText').text("Winner: "+winner+'('+figure+')');
        $('#ModalShow').trigger('click');
    }
    PlayersMode($elem, g,gameInterface){
        if((!gameInterface.getFreezeStatus() && ($elem.find('img').attr('class')!='images-box' ))) {
        $elem.find('.figure').html('<img src="images/'+figure+'.png" class="images-box"alt="">');
        var fig = g.move(figure,$elem.find('.figure').attr('id'))
        gameInterface.setPlayerStatus(gameInterface.getPlayerLog());
        
        if(g.findCombination(fig)){
            gameInterface.setFreezeStatus(true);
            gameInterface.showWinner(figure);
        }
        if(figure=='o'){
            figure='x'
        }
        else {
            figure='o'
        }
        
        gameInterface.setPlayerLog(gameInterface.getPlayerLog()+1);
        }
    }
    AIMode(id, g,gameInterface){
        if((!gameInterface.getFreezeStatus() )) {
        $("#"+id).html('<img src="images/'+figure+'.png" class="images-box"alt="">');
        var fig = g.move(figure,id)
        gameInterface.setPlayerStatus(gameInterface.getPlayerLog());
        
        if(g.findCombination(fig)){
            gameInterface.setFreezeStatus(true);
            gameInterface.showWinner(figure);
        }
        if(figure=='o'){
            figure='x'
        }
        else {
            figure='o'
        }
        
        gameInterface.setPlayerLog(gameInterface.getPlayerLog()+1);
        }
    }
}

figure="o";
var g = new Game("2 Players");
var gameInterface = new GameInterface(g.getGameMode());
var ai = new PseudoSkyNet(g.getGamePole());
$('#p2Mode').click(function(){
    g = new Game("2 Players");
    
    gameInterface.setFreezeStatus(false);
    gameInterface.setPlayerLog(1);
})
$('#AIMode').click(function(){
    g = new Game("Play vs AI")
    
    gameInterface.setFreezeStatus(false);
    gameInterface.setPlayerLog(1);
})
$('.col-4').click(function(){
    var $elem =  $(this)
    if(g.getGameMode()=="2 Players"){
        gameInterface.PlayersMode($elem,g,gameInterface) 
    }
    if(g.getGameMode()=="Play vs AI"){
        if((!gameInterface.getFreezeStatus() && ($elem.find('img').attr('class')!='images-box' ))){
           gameInterface.PlayersMode($elem,g,gameInterface);
            ai.setPole(g.getGamePole());
            //ai move
            var id=ai.convertIntoId(ai.checkGamePole())
            console.log(id)
            gameInterface.AIMode(id,g,gameInterface) 
        }
    }
    
})
$('#NewGame').click(function(){
    
    g = new Game(g.getGameMode());
    gameInterface.setFreezeStatus(false);
    gameInterface.setPlayerLog(1);
})










