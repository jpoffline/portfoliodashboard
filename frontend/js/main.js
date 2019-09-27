
renderDashboardItems()

function renderDashboardItems(){
    var main = document.getElementById("dashboarditems");
    var port = renderPortfolioChanges();
    main.innerHTML = ""
    main.appendChild(port);
    addAllPortfolioDataToDashboard();
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
    
    if(periodcol.childElementCount > 0){
        periodcol.innerHTML = ""
    }
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

function replaceIfExists(id, data){
    var row = document.getElementById(id)
    
    if(row.childElementCount > 0){
        row.innerHTML = ""
    }
    row.appendChild(data);
}

function addPeriodDataToDashboard(period){
    console.log("adding to period col: " + period.name)

    replaceIfExists("period:" + period.name,renderPeriodCol(period))
 
    
}

function addAllPortfolioDataToDashboard(){
    var items = loadData();
    items.periods.forEach(period =>{
        addPeriodDataToDashboard(period);
    });
    
}


function submitNewItem(){
    var input_periodname = document.getElementById("input_periodname").value
    var input_itemlabel = document.getElementById("input_itemlabel").value
    var input_itemvalue = parseFloat(document.getElementById("input_itemvalue").value)
    var input_itemvposition = parseFloat(document.getElementById("input_itemvposition").value)
    var p = addItem(
        input_periodname,
        input_itemlabel,
        input_itemvposition,
        input_itemvalue
    )
    addPeriodDataToDashboard(p)
}