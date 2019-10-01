function renderItemTile(item){
    var div = document.createElement("div");
    div.classList.add("well");
    div.classList.add("portfolioitem");
    div.setAttribute("id", item.label);
    div.setAttribute("onclick", "tileClicked(this.id)");

    div.style.backgroundColor = toRGB(item.label);

    div.appendChild(renderItemName(item.label));
    div.appendChild(renderItemValue(item.value));
    div.appendChild(renderItemPosition(item.position));
    
    return(div);
}


function renderItemValue(val){
    var value = document.createElement("div");
    value.innerHTML = "£" + val;
    return(value);
}

function renderPeriodName(name){
    var periodname = document.createElement("div");
    periodname.classList.add("periodname");
    periodname.classList.add("text-center");
    periodname.innerHTML = name;
    return(periodname);
}

function renderItemName(lbl){
    var name = document.createElement("div");
    name.classList.add("itemlabel");
    name.innerHTML = lbl;
    return(name)
}

function renderItemPosition(itemPosition){
    var position = document.createElement("div");
    
    var lbl = document.createElement("span");
    lbl.innerHTML = itemPosition*100 + "%"

    if(itemPosition < 0){
        position.classList.add("red");
        position.appendChild(genIcon("arrow-down"));
    }else{
        position.classList.add("green");
        position.appendChild(genIcon("arrow-up"));
    }
    position.appendChild(lbl)
    
    return(position);
}