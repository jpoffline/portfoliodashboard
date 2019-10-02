
renderDashboardItems()
autocomplete(document.getElementById("input_periodname"), periodNames());
autocomplete(document.getElementById("input_itemlabel"),  allItemNames());

function renderDashboardItems(){
    var main = document.getElementById("dashboarditems");
    var port = renderPortfolioChanges();
    main.innerHTML = ""
    main.appendChild(port);
    addAllPortfolioDataToDashboard();
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

function setupPeriodColumnAnchor(periodname){
    var periodcol = document.createElement("div");
    periodcol.classList.add("col-sm-2");
    periodcol.setAttribute("id", periodname);
    return(periodcol)
}

function periodcolid(periodname){
    return("period:" + periodname)
}


function setupPeriodColumnAnchors(periodnames){
    var a = document.createElement("div");
    a.setAttribute("id", "periods");
    a.classList.add("row");

    periodnames.forEach(periodname =>{
        
        a.appendChild(setupPeriodColumnAnchor(periodcolid(periodname)));
    });

    return(a);
}

function renderPortfolioChanges(){
    
    var area = document.createElement("div");
    area.classList.add("container");
    area.setAttribute("id", "periodcolumns")
    
    area.appendChild(setupPeriodColumnAnchors(periodNames()));
    
    return(area);
}

function updatePeriodColumn(id, data){
    var col = document.getElementById(id)
    
    if(col == null){
        
        var a = document.getElementById("periods")
        a.appendChild(setupPeriodColumnAnchor(id))
        col = document.getElementById(id)
        
    }
    col = document.getElementById(id)
    
    if(col.childElementCount > 0){
        col.innerHTML = ""
    }
    col.appendChild(data);
}

function addPeriodDataToDashboard(period){
    console.log("adding to period col: " + period.name)

    updatePeriodColumn(periodcolid(period.name), renderPeriodCol(period))

}

function addAllPortfolioDataToDashboard(){
    var items = loadData();
    items.periods.forEach(period =>{
        addPeriodDataToDashboard(period);
    });
    
}

function getValue(id){
    return document.getElementById(id).value
}


function submitNewItem(){
    var input_periodname = getValue("input_periodname")
    var input_itemlabel = getValue("input_itemlabel")
    var input_itemvalue = parseFloat(getValue("input_itemvalue"))
    var input_itemvposition = parseFloat(getValue("input_itemvposition"))
    var updatedPeriod = addItem(
        input_periodname,
        input_itemlabel,
        input_itemvposition,
        input_itemvalue
    )
    addPeriodDataToDashboard(updatedPeriod)
}