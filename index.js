const alarms = [];
const getElement = (id) => document.getElementById(id);
const createElement = (tag) => document.createElement(tag);

class Clock {

    init() {
        setInterval(this.build, 1000);
    }

    build = () => {
        const clockEl = getElement("digital-clock");
        const dateEl = getElement("digital-date");
        const time = this.toLocaleTimeString(new Date);
        const date = this.toLocaleDateString(new Date)
        clockEl.innerHTML = time;
        dateEl.innerHTML = date;
        //this.checkAlarms(time);
    }

    clearForm = () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        getElement("name").value = "";
        getElement("hour").value = "";
        getElement("minute").value = "";
        getElement("second").value = "";
        getElement("name").focus();
    }

    addAlarm = () => {
        const name = getElement("name").value;
        const hour = getElement("hour").value;
        const minute = getElement("minute").value;
        const second = getElement("second").value;
        const daysOfWeek = this.getSelectedDaysOfWeek(); // Función que devuelve los días seleccionados en el HTML        
        const alarm = { name, hour, minute, second, daysOfWeek };
        alarms.push(alarm);
        console.log(alarms)
        this.clearForm();
        this.displayAlarms();
    }

    /*
    addAlarm = () => {
        const name = getElement("name");
        const date = new Date;
        date.setHours(getElement("hour").value);
        date.setMinutes(getElement("minute").value);
        date.setSeconds(getElement("second").value);
        alarms.push(date);

        console.log(alarms)

        this.clearForm();
        this.displayAlarms();
    }
    */

    getSelectedDaysOfWeek = () => {
        var checkboxes = document.querySelectorAll('input[type=checkbox]');
        var selectedDays = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedDays.push(checkboxes[i].value);
            }
        }

        console.log("Selected days: " + selectedDays);
        return selectedDays
    }

    renderAlarm = (alarm, alarmList) => {
        //const li = createElement("li");
        //li.innerHTML = `${alarm.name} - ${alarm.hour}:${alarm.minute}:${alarm.second} to ${alarm.daysOfWeek}`;
        //alarmList.appendChild(li);

        const tr = createElement("tr");
        const nameTd = createElement("td");
        nameTd.textContent = alarm.name;
        tr.appendChild(nameTd);

        const timeTd = createElement("td");
        timeTd.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second}`;
        tr.appendChild(timeTd);

        const daysTd = createElement("td");
        daysTd.textContent = alarm.daysOfWeek.join(", ");
        tr.appendChild(daysTd);

        alarmList.appendChild(tr);

    }
    /*
    Primero, la función -sort- se utiliza para ordenar el arreglo alarms de menor a mayor. 
    La función de comparación utilizada para ordenar simplemente resta el segundo elemento
    del primero (d2 - d1), lo que ordena los números en orden ascendente.
    Luego, el método -getElement- se utiliza para obtener una referencia al elemento -HTML- con 
    el atributo id "alarm-list". 
    Luego, la propiedad -innerHTML- se establece en una cadena vacía para borrar cualquier 
    contenido previo del elemento.
    Finalmente, se recorre el arreglo de alarmas y se utiliza la función -renderAlarm- para 
    mostrar cada alarma en el elemento -HTML- especificado.
    */

    displayAlarms = () => {
        alarms.sort((d1, d2) => d1 - d2);
        const alarmList = getElement("alarmList")
        alarmList.innerHTML = "";
        for (let i = 0; i < alarms.length; i++) {
            this.renderAlarm(alarms[i], alarmList);
        }
    }

    checkAlarms = (time) => {
        // Obtener la hora y el día actual
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.toLocaleString('default', { weekday: 'short' });


        // Comparar la hora y los días de la semana del objeto de alarma con la hora y el día actual
        if (alarm.daysOfWeek.includes(currentDay) && currentHour === Number(alarm.hour)) {
            alert(`¡Es hora de ${alarm.name}!`);
        }



        /*
        let date = new Date;
        let actualTime = date.toLocaleTimeString().split(":");
        const options = { weekday: 'short'};
        let actualDay = date.toLocaleDateString('en-EN', options) ;
        let actualHour = actualTime[0];
        let actualMinute = actualTime[1];
        let actualSecond = actualTime[2];
        
        --------------------------------------
        
        for (let i = 0; i < alarms.length; i++) {
            const alarm = this.toLocaleTimeString(alarms[i]);
            if (alarm === time) {
                alarms.splice(i, 1);
                this.displayAlarms();
                alert(`Alarm to ${alarm}`);
            }
        }
        */
    }

    toLocaleTimeString = (date) => {
        return date.toLocaleTimeString()
    }

    toLocaleDateString = (date) => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-EN', options);
    }

}

const clock = new Clock();
clock.init();