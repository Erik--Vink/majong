module.exports = function() {
    return function(input, timeStamp) {
        var tiles = input;
        var outputTiles = [];

        if(tiles){
            tiles.forEach(function(tile){
                if(timeStamp){

                    if(tile.match){
                        if(timeStamp == tile.match.foundOn){
                            tile.matchHighlight = true;
                            outputTiles.push(tile);
                        }
                        else{
                            tile.matchHighlight = false;
                            if(timeStamp < tile.match.foundOn){
                                outputTiles.push(tile);
                            }
                        }
                    }
                    else{
                        outputTiles.push(tile);
                    }
                }
                else{
                    if(!tile.match){
                        outputTiles.push(tile);
                    }
                }
            });

            return outputTiles;
        }
        else{
            return tiles;
        }
    };
};