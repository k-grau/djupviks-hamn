import { fr } from './forecast-retriever.js';
import { du } from './dom-utils.js';
import { su } from './style-utils.js';
import { paths } from './paths.js';



const size = window.matchMedia('(min-width:767px)');
const topNav = du.getClassElement('top-nav');
const menuIconContainer = du.getClassElement('menu-icon-container');
const menuIcon = du.getClassElement('menu-icon');



main();


function main() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    if(currentPage === 'hamn.html') {
        createForecast();
    }

    addListeners(menuIconContainer, expandMobileMenu);
    toggleTopNav(size);
    size.addListener(toggleTopNav);
}


async function createForecast() {
    const forecast = await fr.getForecast(paths.forecastUrl);
    const forecastSection = du.getIdElement("aside-weather");
    const now = 'Just nu';
    const today = 'Idag';
    const tomorrow = 'Imorgon';
    let period = now;

    createHeader(forecastSection, 'Aktuellt hamnväder', 'h3');

    for (let [key, value] of Object.entries(forecast)) {
        let table;
        let tableBody;

        if(key === 'today') {
            period = today;
        } else if(key === 'tomorrow') {
            period = tomorrow;
        }


        createHeader(forecastSection, period, 'h4');
        table = createTable(forecastSection, 'forecast-table');
        createTableHead(table);
        tableBody = createTableBody(table);
        createTableData(tableBody, value);
    }
}

function createHeader(container, textNode, headerType) {
    const header = du.createEl(headerType);
    du.appendCh(header, du.createTextNo(textNode));
    du.appendCh(container, header);
}


function createTable(container, className) {
    const table = du.createEl('table');
    table.setAttribute('class', className)
    du.appendCh(container, table);
    return table;
}


function createTableHead(table) {
    const head = du.createEl('thead');
    const row = du.createEl('tr');
    const headerTexts = ['Tid', 'Temperatur', 'Vindriktning', 'Vindstyrka', 'Väderlek']

    for(let ht of headerTexts) {
        const header = du.createEl('th');
        du.appendCh(header, du.createTextNo(ht));
        du.appendCh(row, header);
    }
    du.appendCh(head, row);
    du.appendCh(table, head)
    return head;
}


function createTableBody(table) {
    const body = du.createEl('tbody');
    du.appendCh(table, body);
    return body;
}


function createTableData(tableBody, data) {
    data.forEach((obj) => {
        const row = du.createEl('tr');

        Object.keys(obj).forEach((key) => {
            const cell = du.createEl('td');
            const cellData = styleTableData(key, obj[key]);

            if(typeof cellData === 'string' || cellData instanceof String) {
                du.appendCh(cell, du.createTextNo(cellData));
            } else {
                du.appendCh(cell, cellData);
            }
            du.appendCh(row, cell);
            du.appendCh(tableBody, row);
        });
    });

}

function styleTableData(key, value) {
    const noData = 'Ingen data';

    if(!value) {
        return value = noData;
    }

    switch(key) {
        case 'time':
            value = su.styleTime(value);
            break;
        case 'temp':
            value = su.styleTemp(value);
            break;
        case 'windDirection':
            if(value === 0) {
                value = su.styleWindDirection(value, paths.icons);
            } else {
                value = createIconContainer(su.styleWindDirection(value, paths.icons, du.createEl('img')));
            }
            break;
        case 'windGust':
            value = su.styleWindGust(value);
            break;
        case 'conditions':
            value = su.translateWeatherCode(value);
            break;
        default:
            value = noData;
    }
    return value;
}


function createIconContainer(elements) {
    const span = du.createEl('span');
    const container = du.createEl('div');

    du.appendCh(span, du.createTextNo(elements[1]));
    du.appendCh(container, elements[0]);
    du.appendCh(container, span);
    return container;
}



function expandMobileMenu() {
    for(let tp of topNav) {
        if (tp.style.display === 'block') {
          tp.style.display = 'none';
        } else {
          tp.style.display = 'block';
        }
    }
    changeMenuIcon(paths.icons, menuIcon);
}


function toggleTopNav(size) {
    for(let tp of topNav) {
        if(size.matches && tp.style.display === 'none') {
            tp.style.display = 'block'
            changeMenuIcon(paths.icons, menuIcon);
        } else if(!size.matches && tp.style.display === 'block') {
            tp.style.display = 'none'
            changeMenuIcon(paths.icons, menuIcon);
        }
    }
}


function addListeners(elements, func) {
    for(let el of elements) {
        el.addEventListener('click', func);
    }
}



function changeMenuIcon(path, icon) {
    const hamburger = 'hamburger-menu.png';
    const cross = 'close-cross.png';
    let file;

    for(let mi of icon) {
        if (mi.src.split('/').slice(-1).pop() == hamburger) {
            file = cross;
        }
        else {
            file = hamburger;
        }
        mi.src = path + file;
    }
}
