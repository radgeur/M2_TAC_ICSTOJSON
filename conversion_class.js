class Conversion {
    constructor(source, cible) {
        this.source = document.getElementById(source);
        this.cible = document.getElementById(cible);
    }

    handleEvent(event) {
        this.demarrer();
    }

    demarrer() {
        this.convert = "";
        this.creneau = new Array();
        this.convertion();
    }

    convertion() {
        var toConvert = document.getElementById("icsData").value;
        this.splitAll(toConvert);
    }

    splitAll(icsData) {
        var tab1 = icsData.split("BEGIN:VEVENT");
        tab1.shift();
        for (var i=0; i<tab1.length;i++){
            //this.convert += "{";
            var actualCreneau = new Creneau();
            var tab2 = tab1[i].split("\n");
            this.splitChamps(tab2, actualCreneau);
        }
        this.convert = JSON.stringify(this.creneau);
        document.getElementById("jsonData").value = this.convert;;
    }

    splitChamps(tab, creneau) {
        tab.shift();
        for (var j=0;j<tab.length;j++) {
            this.conversionChamp(creneau, tab[j]);
        }
        this.creneau.push(creneau);
    }

    conversionChamp(creneau, champActuel) {
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
}
