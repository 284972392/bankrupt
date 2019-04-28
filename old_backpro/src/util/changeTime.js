function changeTime(param) { 
    var times = ''
    if(param){
        var d = new Date(param);
        function changeLenth(i){     
            if(i < 10){
                i = '0'+ i
            }
            return i;
        }
     times=d.getFullYear() + '-' + (changeLenth(d.getMonth() + 1)) + '-' + changeLenth(d.getDate()) + ' ' + changeLenth(d.getHours()) + ':' + changeLenth(d.getMinutes()) + ':' + changeLenth(d.getSeconds());       
    }
    return times;
 }

 function changeSmallTime(param) { 
    var d = new Date(param);
    function changeLenth(i){     
        if(i < 10){
            i = '0'+ i
        }
        return i;
    }
   var times=d.getFullYear() + '-' + (changeLenth(d.getMonth() + 1)) + '-' + changeLenth(d.getDate());
    return times;
 }

export {changeTime,changeSmallTime}