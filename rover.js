class Rover {
   // Write code here!
   constructor (position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

   receiveMessage (message){
     let responseMsg = {
       message: message.name,
       results: [],
     };
     let resultObj = {           
     };
    
    for (let i = 0; i < message.commands.length; i++){
      if (message.commands[i].commandType === 'MODE_CHANGE') { 
        resultObj.completed = true;
        responseMsg.results.push(resultObj);
        this.mode = message.commands[i].value;
      } else if (message.commands[i].commandType === 'STATUS_CHECK') {                
        resultObj.roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };        
        resultObj.completed = true;
        responseMsg.results.push(resultObj);
      } else if (message.commands[i].commandType === 'MOVE') {       
        if (this.mode === 'LOW_POWER'){     
          resultObj.completed = false;
          responseMsg.results.push(resultObj);
        } else {            
            resultObj.completed = true;
            responseMsg.results.push(resultObj);            
            this.position = message.commands[i].value;
        }
        
      }
    }    
    return responseMsg;
   }
}

module.exports = Rover;