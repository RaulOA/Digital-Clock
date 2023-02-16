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
        this.checkAlarms();
    }

    clearForm = () => {
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false;
        }

        getElement("name").value = "";
        getElement("hour").value = "00";
        getElement("minute").value = "00";
        getElement("second").value = "00";
        getElement("name").focus();
    }

    addAlarm = () => {
        const name = getElement("name").value;
        const hour = parseInt(getElement("hour").value);
        const minute = parseInt(getElement("minute").value);
        const second = parseInt(getElement("second").value);
        const daysOfWeek = this.getSelectedDaysOfWeek();

        console.log("Selected days: " + daysOfWeek)

        const randomNumber = Math.floor(Math.random() * 100000) + 1;
        const alarm = { id: randomNumber, state: 1, name, hour, minute, second, daysOfWeek };
        alarms.push(alarm);
        this.clearForm();
        this.displayAlarms();
        console.log(alarms)
    }

    getSelectedDaysOfWeek = () => {
        var checkboxes = document.querySelectorAll('input.form-check-input[type=checkbox]');
        var selectedDays = [];
        for (var i = 0; i < checkboxes.length; i++) {
            console.log("Checks: "+ i + " = " + checkboxes[i].checked)
            if (checkboxes[i].checked) {
                selectedDays.push(checkboxes[i].value);
            }
        }
        //checkboxes = null;
        //selectedDays = null;
        return selectedDays
    }

    // Crear elementos de la tabla de forma dinamica
    renderAlarm = (alarm, alarmList) => {
        // Se crea la fila
        const tr = createElement("tr");
        // Se crea la casilla ID "oculta"
        const idTd = createElement("td");
        idTd.textContent = alarm.id;
        idTd.style.display = "none";
        tr.appendChild(idTd);
        // Se crea la casilla para el checkbox "visible"
        const checkboxTd = createElement("td");
        const checkbox = createElement("input");
        checkbox.type = "checkbox";
        // Si el estado es 1 entonces el checkbox aparecera activado
        if (alarm.state == 1) {
            checkbox.checked = true;
        }
        checkbox.id = `checkbox-${alarm.id}`;
        checkbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                // Checkbox activado, realizar acción                
                // Buscamos el objeto en el array de alarmas
                const alarmFound = alarms.find(alarm => alarm.id === alarm.id);
                // Si encontramos el objeto, actualizamos el valor del atributo state
                if (alarmFound) {
                    alarmFound.state = 1;
                }
                console.log(`Checkbox activado para alarma ${alarm.id}`);
                console.log(alarms)
            } else {
                // Checkbox desactivado, realizar acción                
                // Buscamos el objeto en el array de alarmas
                const alarmFound = alarms.find(alarm => alarm.id === alarm.id);
                // Si encontramos el objeto, actualizamos el valor del atributo state
                if (alarmFound) {
                    alarmFound.state = 0;
                }
                console.log(`Checkbox desactivado para alarma ${alarm.id}`);
                console.log(alarms)
            }
        });
        checkboxTd.appendChild(checkbox);
        tr.appendChild(checkboxTd);
        // Se crea la casilla Name "visible"
        const nameTd = createElement("td");
        nameTd.textContent = alarm.name;
        tr.appendChild(nameTd);
        // Se crea la casilla Hour "visible"
        const timeTd = createElement("td");
        timeTd.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second}`;
        tr.appendChild(timeTd);
        // Se crea la casilla Days "visible"
        const daysTd = createElement("td");
        daysTd.textContent = alarm.daysOfWeek.join(", ");
        tr.appendChild(daysTd);




        // Se agregan todas las casillas a la fila
        alarmList.appendChild(tr);
    }

    displayAlarms = () => {
        const alarmList = getElement("alarmList")
        alarmList.innerHTML = "";
        for (let i = 0; i < alarms.length; i++) {
            this.renderAlarm(alarms[i], alarmList);
        }
    }

    checkAlarms = () => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();
        const currentDay = now.toLocaleString('en-EN', { weekday: 'short' });
        //console.log("H:" + currentHour + " M: " + currentMinute + " S: " + currentSecond + " D: " + currentDay);
        for (let i = 0; i < alarms.length; i++) {
            if (alarms[i].state == 1) {
                if (alarms[i].daysOfWeek.includes(currentDay)) {
                    if (alarms[i].hour == currentHour && alarms[i].minute == currentMinute && alarms[i].second == currentSecond) {
                        alert(`Alarm to: ${alarms[i].name}`);
                    }
                }
            }
        }
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