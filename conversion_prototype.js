function Conversion(source, cible) {
    this.source = document.getElementById(source);
    this.cible = document.getElementById(cible);
}

Conversion.prototype.handleEvent = function(event) {
    this.demarrer();
}

Conversion.prototype.demarrer = function() {
    this.convert = "";
    this.convertion();
}

Conversion.prototype.convertion = function() {
    var toConvert = document.getElementById("icsData").value;
    this.splitAll(toConvert);
}

Conversion.prototype.splitAll = function (icsData) {
    var tab1 = icsData.split("BEGIN:VEVENT");
    tab1.shift();
    for (var i=0; i<tab1.length;i++){
        this.convert += "{";
        var creneau = new Creneau();
        var tab2 = tab1[i].split("\n");
        this.splitChamps(tab2, creneau);
    }
    document.getElementById("jsonData").value = this.convert;
}

Conversion.prototype.splitChamps = function (tab, creneau) {
    tab.shift();
    for (var j=0;j<tab.length;j++) {
        this.conversionChamp(creneau, tab[j]);
        /*if(tab[j].indexOf(":")!=-1){
            var tab3 = tab[j].split(":");
            this.convert += tab3[0] + " : '" + tab3[1] + "'\n";
        }*/
    }
    //mettre dans un tableau de créneau et afficher le tableau avec json.stringify
    this.convert = JSON.stringify(creneau);
    /*this.convert += "debut : " + creneau.start;
    this.convert += "; fin : " + creneau.end;
    this.convert += "; résumé : " + creneau.summary;
    this.convert += "; lieu : " + creneau.location;*/
    this.convert += ";}\n";
}

Conversion.prototype.conversionChamp = function(creneau, champActuel) {
    if(champActuel.indexOf(":") != -1){
        var couple = champActuel.split(":");
        if(couple[0].startsWith("DTSTART"))
            creneau.start = couple[1];
        if(couple[0].startsWith("DTEND"))
            creneau.end = couple[1];
        if(couple[0].startsWith("SUMMARY"))
            creneau.summary = couple[1];
        if(couple[0].startsWith("LOCATION"))
            creneau.location = couple[1];
    }
}
