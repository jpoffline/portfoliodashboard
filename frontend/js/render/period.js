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
    periodtotal.classList.add("periodtotal");

    area.appendChild(periodtotal);
    area.appendChild(items);
    
    return(area);
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