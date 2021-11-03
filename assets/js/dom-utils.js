const domUtils = {
    createEl: function(elementType) {
        return document.createElement(elementType);
    },

    appendCh: function (parent, child) {
        parent.appendChild(child);
    },

    createTextNo: function (str) {
        return document.createTextNode(str);
    },

    getIdElement: function (id) {
        return document.getElementById(id);
    },

    getClassElement: function (className) {
        return document.getElementsByClassName(className);
    },

    getScreenWidth: function() {
        return screen.width;
    }
};


export { domUtils as du };
