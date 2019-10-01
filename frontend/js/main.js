
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

function setupPeriodColumnAnchors(periodnames){
    var a = document.createElement("div");
    a.setAttribute("id", "periods");
    a.classList.add("row");

    periodnames.forEach(period =>{
        var periodcol = document.createElement("div");
        periodcol.classList.add("col-sm-3");
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

function getValue(id){
    return document.getElementById(id).value
}


function submitNewItem(){
    var input_periodname = getValue("input_periodname")
    var input_itemlabel = getValue("input_itemlabel")
    var input_itemvalue = parseFloat(getValue("input_itemvalue"))
    var input_itemvposition = parseFloat(getValue("input_itemvposition"))
    var p = addItem(
        input_periodname,
        input_itemlabel,
        input_itemvposition,
        input_itemvalue
    )
    addPeriodDataToDashboard(p)
}