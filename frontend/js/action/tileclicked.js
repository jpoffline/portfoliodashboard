function tileClicked(id){
    tiles = document.getElementsByClassName("portfolioitem");
    for(var t = 0; t < tiles.length; t++){
        if(tiles[t].id == id){
            tiles[t].classList.add("highlight")
        }else{
            tiles[t].classList.remove("highlight")
        }
    }
}