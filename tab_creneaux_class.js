class Tab_creneaux{
    constructor(){
        this.reponse = {};
        this.body = document.getElementsByTagName("body")[0];
        this.splitDateDebut = new Array();
        this.splitDateFin = new Array();
        this.tueTab = new Array();
        this.wedTab = new Array();
        this.thuTab = new Array();
        this.friTab = new Array();
    }

    //afficher l'element de day dans un panel
    createPanelForSoutenance(day, element){
        this.splitDateDebut = element.debut.split(" ");
        this.splitDateFin = element.fin.split(" ");
        var panel = document.createElement("Div");
        day.appendChild(panel);
        panel.className = "panel panel-default";
        var panel_header = document.createElement("P");
        panel_header.className = "panel-heading";
        var panel_body = document.createElement("P");
        panel_body.className = "panel-body";
        var panel_footer = document.createElement("P");
        panel_footer.className = "panel-footer";
        panel.appendChild(panel_header);
        panel.appendChild(panel_body);
        panel.appendChild(panel_footer);
        panel_header.appendChild(document.createTextNode(this.splitDateDebut[4].substring(0,5) + " " + this.splitDateFin[4].substring(0,5)));
        panel_body.appendChild(document.createTextNode(element.resume));
        panel_footer.appendChild(document.createTextNode(element.lieu));
    }

    //Afficher toutes les soutenances à la bonne date
    displayAll(){
        var self = this;
        this.tueTab.sort(this.sortDatesTab);
        console.log(this.tueTab);
        this.wedTab.sort(this.sortDatesTab);
        this.thuTab.sort(this.sortDatesTab);
        this.friTab.sort(this.sortDatesTab);

        var day = document.getElementById("Tue");
        this.tueTab.forEach(function (element, index, array) {
            self.createPanelForSoutenance(day, element);
        });
        day = document.getElementById("Wed");
        this.wedTab.forEach(function (element, index, array) {
            self.createPanelForSoutenance(day, element);
        });
        day = document.getElementById("Thu");
        this.thuTab.forEach(function (element, index, array) {
            self.createPanelForSoutenance(day, element);
        });
        day = document.getElementById("Fri");
        this.friTab.forEach(function (element, index, array) {
            self.createPanelForSoutenance(day, element);
        });
    }

    //remplit les tableaux qui vont etre afficher ensuite
    retrieveSoutenances(){
        var self = this;
        avoirToutLeTableau("tableauZave",function(json){
            self.reponse.tab=json.donnees.tableau;
            self.reponse.tab.forEach(function (element, index, array){
                self.splitDateDebut = element.debut.split(" ");
                console.log(element);
                if(self.splitDateDebut[0] == "Tue")
                    self.tueTab.push(element);
                else if(self.splitDateDebut[0] == "Wed")
                    self.wedTab.push(element);
                else if(self.splitDateDebut[0] == "Thu")
                    self.thuTab.push(element);
                else if(self.splitDateDebut[0] == "Fri")
                    self.friTab.push(element);
            });
            self.displayAll();
        })
    }

    //fonction de comparaison pour trier les dates dans l'ordre croissant
    sortDatesTab(a, b) {
       var dateDebutA = new Date(a.debut);
       var dateDebutB = new Date(b.debut);
       if (dateDebutA > dateDebutB)
         return 1;
       if (dateDebutA < dateDebutB)
         return -1;
       return 0;
    };
}


var toto = new Tab_creneaux();
toto.retrieveSoutenances();
