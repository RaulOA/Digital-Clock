class Reloj {
    init() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.toLocaleString('default', { weekday: 'short' });
/*

        let date = new Date;
        let actualTime = date.toLocaleTimeString().split(":");
        const options = { weekday: 'short'};

        let actualDay = date.toLocaleDateString('en-EN', options) ;
        let actualHour = actualTime[0];
        let actualMinute = actualTime[1];
        let actualSecond = actualTime[2];

        */

        console.log("Dia: " + actualDay + " - Hora: " + actualHour + " - Min: " + actualMinute + " - Sec: " + actualSecond)
    }
}
const reloj = new Reloj;
reloj.init();