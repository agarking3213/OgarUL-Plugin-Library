
this.init = function(index, gameServer) {
  this.gameServer = gameServer;
this.index = index;
this.default = 0;
}


this.beforespawn = function (player,gameServer) {
if (!player.auth && gameServer.auon == 1) {
  player.frozen = true;
  if (this.index.config.allowregister != 1 && this.index.config.requirelogin != 1) this.default = 1;
  
  
  if (!player.astage) player.astage = this.default;
  if (player.astage == 0) {
    if (this.index.config.reservename == 1) {
      var ok true;
      for (var i in gameServer.account) {
        var account = gameServer.account[i];
        if (account.username == player.name) {
          ok = false;
          player.mupa = account.pass;
          break;
        }
      }
      if (ok) {
        if (this.index.config.allowregister == 1) {
          player.un = player.name;
        player.name = 'Account Unregistered, press w to register it!';
        if (this.index.config.requirelogin != 1) player.name = player.name + ', Press q to play as guest';
        player.astage = 99;
        } else {
          
          return true;
        }
      } else {
       player.un = player.name;
       player.name = 'Account registered, Press w to login';
       player.astage = 30;
      }
      
      
    } else {
    
    player.aname = player.name;
  var name = 'w = login';
  if (this.index.config.allowregister == 1) {
    name = name + ', Space = register';
  }
  if (this.index.config.requirelogin != 1) {
    name = name + ', q = playasguest';
  }
  player.name = name;
    }
  } else if (player.astage == 97) {
    player.pas = player.name;
    player.name = 'Press w to confirm';
    
  } else if (player.astage == 1) {
    player.name = 'Login, Username: (press w)';
    
  } else if (player.astage == 2) {
    player.un = player.name;
    player.name = 'pass: (press w)';
    
  } else if (player.astage == 3) {
    player.pa = player.name;
    player.name = 'Press w to confirm';
  } else if (player.astage == 5) {
    player.name = 'Username (press w)';
  
  
    
  } else if (player.astage == 6) {
    var ok = true;
    for (var i in gameServer.account) {
      if (gameServer.account[i].username == player.name) {
        ok = false
        break;
      }
      
    }
    if (ok) {
    player.un = player.name;
    player.name = 'Pass: (pres w)';
    player.astage = 7;
    } else {
      player.name = 'Username taken (press w)';
      player.astage = 50;
    }
    
  } else if (player.astage == 8) {
    player.pass = player.name;
    player.astage = 9;
    var ac = {
      username: player.un,
      pass: player.pass,
      
    };
    gameServer.account.push(ac);
    
    player.name = 'Success!, Press w to login'
    player.astage = 50;
  }
  
  return true;
}
return true;

};
this.beforeeject = function(player, gameServer) {
  if (player.cells && player.cells.length > 0 && gameServer.auon == 1) {
  if (player.astage = 0) {
    
  player.name = 'Username: (press w)';
  player.astage = 2
 } else if (player.astage > 0 && player.astage < 3) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage ++;
  return false;
 } else if (player.astage == 30) {
   player.name = 'Pass: (press w)';
   player.astage = 31;
 } else if (player.astage == 31) {
   player.cells.forEach((cell)=>gameServer.removeNode(cell));
   player.astage = 32;
 } else if (player.astage == 32) {
   var ok = false;
   for (var i in gameServer.account) {
     if (gameServer.account[i].username == player.un && gameServer.account[i].pass = player.pas) {
       ok = true;
       player.accountid = i;
       player.auth = true;
       player.astage = 100;
     }
     
   }
   
 } else if (player.astage == 99) {
  player.name = 'Password: (pressw)';
  player.astage = 98;
 } else if (player.astage == 98) {
   player.cells.forEach((cell)=>gameServer.removeNode(cell));
   player.astage = 97;
 } else if (player.astage == 97) { 
   var p = {
     username: player.un,
     pass: player.pas,
   }
   gameServer.account.push(p);
   player.name = 'Success! Press w to log in';
   player.astage == 96
 } else if (player.astage == 95) {  
   player.name = 'Pass: (pressw)';
   player.astage = 30;
} else if (player.astage == 3) {
  var ok = false;
  for (var i in gameServer.account) {
    var account = gameServer.account[i];
   if (account && account.pass == player.pa && account.un == account.username) {
     ok = true;
     player.accountid = i;
     break;
   }
  }
  if (!ok) {
    player.name = 'Wrong pass or username , press w';
    player.astage = 50;
  } else {
    player.name = 'Success, press w'
    player.astage = 4;
    player.auth = true;
  }
  return false
} else if (player.astage == 4) {
  player.frozen = false;
  player.name = player.aname;
  player.astage = 100;
  return false
} else if (player.astage == 5) {
player.cells.forEach((cell)=>gameServer.removeNode(cell));
player.astage = 6;
} else if (player.astage == 50) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = this.default;
} else if (player.astage == 7) {
  player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = 8;
  } else {
  return true;
}
}
return false;

};
this.beforesplit = function(player,gameServer) {
   if (player.cells && player.cells.length > 0 && gameServer.auon == 1) {
if (player.astage == 0 && this.index.config.allowregister == 1) {
  player.name = 'Username: (press w)'
  player.astage = 6;
} else {
  return true;
}
}
return false;
};
this.beforeq = function(player, gameServer) {
   if (player.cells && player.cells.length > 0 && gameServer.auon == 1) {
  if (player.astage == 0 && this.index.config.requirelogin != 1) {
    player.frozen = false;
    player.name = player.aname;
    player.astage = 50
  } else if (player.astage > 0 && player.astage < 100) {
    player.cells.forEach((cell)=>gameServer.removeNode(cell));
  player.astage = this.default;
    
  }
  
   }
};
module.exports = this;



