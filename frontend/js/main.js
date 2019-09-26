
var main = document.getElementById("main");
var port = renderPortfolioChanges();
main.appendChild(port);
addPortfolioDataToDashboard();





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

function renderItemTile(item){
    var div = document.createElement("div");
    div.classList.add("well");
    div.classList.add("portfolioitem");
    var name = document.createElement("div");
    name.classList.add("itemlabel");
    name.innerHTML = item.label;

    div.style.backgroundColor = toRGB(item.label);

    div.appendChild(name);
    div.appendChild(renderItemValue(item.value));
    div.appendChild(renderItemPosition(item.position));
    
    return(div);
}

function sortPeriodItems(items){
    return(
        items.sort(function(a, b){
            if(a.position == b.position){
                if(a.value < b.value){
                    return 1
                } else{
                    return -1
                }
            }
            if(a.position < b.position){
                return 1
            } else {
                return -1
            }
        })
    )
}

function renderPeriod(period){
    
    period.items = sortPeriodItems(period.items)

    var area = document.createElement("div");

    area.setAttribute("id", "period:" + period.name)
    area.appendChild(renderPeriodName(period.name));

    total = 0

    var items = document.createElement("div");
    items.setAttribute("id", "period:" + period.name + ":items")
    period.items.forEach(item =>{
        items.appendChild(renderItemTile(item))
        total += item.value;
    });

    var periodtotal = document.createElement("div");
    periodtotal.innerHTML = "£" + total;
    periodtotal.classList.add("text-center");

    area.appendChild(periodtotal);
    area.appendChild(items);
    
    return(area);
}

function renderPeriodCol(period){
    var periodcol = document.createElement("div");
    periodcol.classList.add("col");
    
    periodcol.appendChild(renderPeriod(period));
    
    return(periodcol);
}

function setupPeriodColumnAnchors(periodnames){
    var a = document.createElement("div");
    a.setAttribute("id", "periods");
    a.classList.add("row");

    periodnames.forEach(period =>{
        var periodcol = document.createElement("div");
        periodcol.classList.add("col");
        periodcol.setAttribute("id", "period:" + period);
        a.appendChild(periodcol);
    });

    return(a);
}

function renderPortfolioChanges(){
    
    var cols = setupPeriodColumnAnchors(periodNames());
    var area = document.createElement("div");
    area.classList.add("container");
    
    area.appendChild(cols);
    
    return(area);
}

function addPortfolioDataToDashboard(){
    var items = loadData();
    items.periods.forEach(period =>{
        var row = document.getElementById("period:" + period.name)
        row.appendChild(renderPeriodCol(period));
    });
    
}
