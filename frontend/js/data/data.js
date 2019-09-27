

function periodNames(){
    var items = loadData();
    var names = [];
    items.periods.forEach(item =>{
        names.push(item.name)
    })
    return(names)
}

function loadData(){
    return(SAMPLEDATA)
}

function addItem(iperiod, label, position, value){
    var current = loadData();
    var is = {'label': label, 'position': position, 'value': value}
    var exists = false;
    for(var p = 0; p < current.periods.length; p++){
        if(current.periods[p].name == iperiod){
            for(var itm = 0; itm < current.periods[p].items.length; itm++){
                if(current.periods[p].items[itm].label == is.label){
                    current.periods[p].items.splice(itm, 1);
                }
            }
            current.periods[p].items.push(is);
            exists = true;
            break
        }
    }

    if(!exists){
        current.periods.push(
            {
                'name':iperiod,
                'items':[is]
            }
        )
    }
    SAMPLEDATA = current
    return(getPeriod(iperiod))
}

function getPeriod(periodname){
    var current = loadData();
    for(var p = 0; p < current.periods.length; p++){
        if(current.periods[p].name == periodname){
            return(current.periods[p])
        }
    }
}