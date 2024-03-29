

function periodNames(){
    var items = loadData();
    var names = [];
    items.periods.forEach(item =>{
        names.push(item.name)
    })
    return(names)
}

function allItemNames(){
    var data = loadData();
    var unique = [];
    data.periods.forEach(period =>{
        period.items.forEach(item=>{
            unique.push(item.label)
        })
    })
    return([...new Set(unique)])

}

function loadData(){
    return(SAMPLEDATA)
}

function saveData(data){
    SAMPLEDATA = data
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
    saveData(current)
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