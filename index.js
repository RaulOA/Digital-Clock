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
        const hour = getElement("hour").value.padStart(2, '0');
        const minute = getElement("minute").value.padStart(2, '0');
        const second = getElement("second").value.padStart(2, '0');
        const daysOfWeek = this.getSelectedDaysOfWeek();
        //console.log("Selected days: " + daysOfWeek)
        const randomNumber = Math.floor(Math.random() * 100000) + 1;
        const rank = parseInt(hour + minute + second);
        const alarm = { id: randomNumber, state: 1, name, hour, minute, second, daysOfWeek, rank };
        alarms.push(alarm);
        this.clearForm();
        this.displayAlarms();
        console.log(alarms)
    }

    getSelectedDaysOfWeek = () => {
        var checkboxes = document.querySelectorAll('input.form-check-input[type=checkbox]');
        var selectedDays = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedDays.push(checkboxes[i].value);
            }
        }
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
        //checkbox.classList.add("my-checkbox-class");
        checkbox.type = "checkbox";
        // Si el estado es 1 entonces el checkbox aparecera activado
        if (alarm.state == 1) {
            checkbox.checked = true;
        }
        //checkbox.id = `checkbox-${alarm.id}`;
        checkbox.addEventListener("change", (event) => {
            if (event.target.checked) {
                // Checkbox activado, realizar acción
                // Buscamos el objeto en el array de alarmas
                const alarmFound = alarms.find(alarm => alarm.id === alarm.id);
                // Si encontramos el objeto, actualizamos el valor del atributo state
                if (alarmFound) {
                    alarmFound.state = 1;
                }
                //console.log(`Checkbox activado para alarma ${alarm.id}`);
                //console.log(alarms)
            } else {
                // Checkbox desactivado, realizar acción                
                // Buscamos el objeto en el array de alarmas
                const alarmFound = alarms.find(alarm => alarm.id === alarm.id);
                // Si encontramos el objeto, actualizamos el valor del atributo state
                if (alarmFound) {
                    alarmFound.state = 0;
                }
                //console.log(`Checkbox desactivado para alarma ${alarm.id}`);
                //console.log(alarms)
            }
        });
        checkboxTd.appendChild(checkbox);
        tr.appendChild(checkboxTd);

        // Se crea la casilla Name "visible"

        const nameTd = createElement("td");
        const nameInput = createElement("input");
        nameInput.type = "text";
        nameInput.value = alarm.name;
        nameTd.appendChild(nameInput);
        tr.appendChild(nameTd);

        //const nameTd = createElement("td");
        //nameTd.textContent = alarm.name;
        //tr.appendChild(nameTd);

        // Se crea la casilla Hour "visible"
        const timeTd = createElement("td");
        timeTd.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second}`;
        tr.appendChild(timeTd);

        // Se crea la casilla Days "visible"
        const daysTd = createElement("td");
        daysTd.textContent = alarm.daysOfWeek.join(", ");
        tr.appendChild(daysTd);

        // Se crea el boton de eliminar
        const deleteButtonTd = createElement("td");
        const deleteButton = createElement("button");
        deleteButton.type = "button";;
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            // Buscamos el indice del objeto en el array de alarmas y lo eliminamos
            const alarmIndex = alarms.findIndex(alarm => alarm.id === alarm.id);
            alarms.splice(alarmIndex, 1);
            this.displayAlarms();
            alert(`Alarm ${alarm.name} Deleted`);
        });
        deleteButtonTd.appendChild(deleteButton)
        tr.appendChild(deleteButtonTd);

        // Se crea el boton de modificar
        const modifyButtonTd = createElement("td");
        const modifyButton = createElement("button");
        modifyButton.type = "button";;
        modifyButton.className = "btn btn-warning";
        modifyButton.textContent = "Modify";
        modifyButton.addEventListener("click", () => {
            // Buscamos el indice del objeto en el array de alarmas y lo modificamos
            const alarmIndex = alarms.findIndex(alarm => alarm.id === alarm.id);



            this.displayAlarms();
            alert(`Alarm ${alarm.name} Modified`);
        });
        modifyButtonTd.appendChild(modifyButton)
        tr.appendChild(modifyButtonTd);

        // Se agregan todas las casillas a la fila
        alarmList.appendChild(tr);

    }

    displayAlarms = () => {
        // Ordenar el array
        alarms.sort(function (a, b) { return a.rank - b.rank; });
        const alarmList = getElement("alarmList")
        alarmList.innerHTML = "";
        // Pintar cada una de las alarmas(objetos) del array
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