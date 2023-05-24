const dirJson = 'assets/data.json';
const containerTask = document.querySelectorAll('.container__task');
const timeDaily = document.getElementById('timeframe_daily');
const timeWeekly = document.getElementById('timeframe_weekly');
const timeMonthly = document.getElementById('timeframe_monthly');

function addTimeframe(objTimeframe) {
   var timeframe;
   fetch(dirJson).then((response) => {
      response.json().then((data) => {
         data.forEach((element, index) => {         
            if(objTimeframe == 'daily') {timeframe = element.timeframes.daily}
            else if(objTimeframe == 'monthly') {timeframe = element.timeframes.monthly}
            else {timeframe = element.timeframes.weekly}
            containerTask[index].innerHTML = `
            <div class="task__tab">
               <div class="task__bar">
                  <span class="task__title">${element.title}</span>
                  <img class="task__img" src="assets/images/icon-ellipsis.svg" alt="...">
               </div>
               <div class="task__time">
                  <span class="task__hours">${timeframe.current}hrs</span>
                  <span class="task__warning">Last Week - ${timeframe.previous}hrs</span>
               </div>
            </div>
         `
         })
      })
   })
}

function selectTimeframe(elementId, objTimeframe, notSelects) {
   elementId.classList.add('is-enabled')
   addTimeframe(objTimeframe=objTimeframe);
   notSelects.map((el) => {
      el.classList.remove('is-enabled')
   })
}

addTimeframe()
timeWeekly.classList.add('is-enabled')

timeDaily.addEventListener('click', () => {
   selectTimeframe(timeDaily, 'daily', [timeWeekly, timeMonthly])}
)
timeWeekly.addEventListener('click', () => {
   selectTimeframe(timeWeekly, 'weekly', [timeDaily, timeMonthly])}
)
timeMonthly.addEventListener('click', () => {
   selectTimeframe(timeMonthly, 'monthly', [timeDaily, timeWeekly])}
)



