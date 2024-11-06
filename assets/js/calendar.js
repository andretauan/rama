		
		document.addEventListener('DOMContentLoaded', function() {
			var dtrange = moment().add(1,'days').format();
			
			var calendarEl = document.getElementById('calendar');
			var calendar = new FullCalendar.Calendar(calendarEl, {
				initialView: 'dayGridMonth',
				locale: 'pt-br',			
				
				buttonText: {
					today: 'hoje',
					month: 'mês',
					week: 'semana',
					day: 'dia'
				},

				contentHeight: 400,
				selectable: false,
				editable: false,
				themeSystem: 'bootstrap',

				validRange: {
					start: dtrange
				},

				hiddenDays: [1, 5],
				
				//events: 'cal/cal.php',

				eventSources: [
      
				{
					url: 'ical/cal.php',
					color: 'white',
					backgroundColor: 'red'					
				}
				],
	
				
				selectAllow: function(selectInfo) {
					
					if (checkSelectedDateWithInDisallowed(selectInfo.start, selectInfo.end)) {
						return false;
					} else {
						return true;
					}
				},


			

				

				select: function(selectInfo) {
					var days = getDaysBetweenDates(selectInfo.start.getTime(), selectInfo.end.getTime());
					
				},

				eventMouseEnter: function (info) {            	
				$(info.el).css('cursor','not-allowed');
        		},

				dateClick: function(info, dateStr) {
					if (info.dayEl.innerText.length<4) {
					var datasel = moment(info.dateStr).format('DD/MM/YYYY');	
					var myModal = new bootstrap.Modal($('#fmodal'));				
					$('#data-sessao').html(datasel);
					$('#data-form').val(info.dateStr);
					myModal.show();
					}
				}


			});

			calendar.render();

		});

		function getDaysBetweenDates(timeStart, timeEnd) {
			return Math.round((timeEnd - timeStart) / (1000 * 60 * 60 * 24 + 1));
		}

		function checkSelectedDateWithInDisallowed(startDate, endDate) {
			for (var i = 0; i < disallowedDays.length; i++) {
				var dd = new Date(disallowedDays[i]);
				if (dd.getTime() >= startDate.getTime() && dd.getTime() <= endDate.getTime()) {
					return true;
				}
			}
			return false;
		}