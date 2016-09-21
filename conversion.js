//eservices("lesmeilleurs");
Conversion = {

    handleEvent : function (event) {
        this.convert = "";
        this.convertion();
    },

    convertion : function() {
        var toConvert = document.getElementById("icsData").value;
        this.splitAll(toConvert);
    },

    splitAll : function (icsData) {
        var tab1 = icsData.split("BEGIN:VEVENT");
        tab1.shift();
        for (var i=0; i<tab1.length;i++){
            this.convert +="{ \n";
            var tab2 = tab1[i].split("\n");
            this.splitChamps(tab2);
        }
        document.getElementById("jsonData").value = this.convert;
    },

    splitChamps : function (tab) {
        tab.shift();
        for (var j=0;j<tab.length;j++) {
            if(tab[j].indexOf(":")!=-1){
                var tab3 = tab[j].split(":");
                this.convert += tab3[0] + " : '" + tab3[1] + "'\n";
            }
        }
        this.convert += "}\n";
    },
}

/*conversion.addEventListener("click", function(evenement) {alert(lesmeilleurs);},false);
conversion.addEventListener {
"click", {texte : "bonjour", handleEvent : function(event) {alert(this.texte);}, false}
}*/
