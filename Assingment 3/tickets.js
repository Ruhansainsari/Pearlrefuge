document.addEventListener('alpine:init', () => {
  Alpine.data('tickets', () => ({
      date: null,
      guestTicket: [
          {
              category: 'Sri Lankan Adult',
              normal: 4,
              peak: 6,
              numberOfTickets: 0,
              totalPerCategory: 0
          },
          {
              category: 'Sri Lankan Child',
              normal: 2,
              peak: 3,
              numberOfTickets: 0,
              totalPerCategory: 0
          },
          {
              category: 'Foreign Adult',
              normal: 10,
              peak: 13,
              numberOfTickets: 0,
              totalPerCategory: 0
          },
          {
              category: 'Foreign Child',
              normal: 5,
              peak: 8,
              numberOfTickets: 0,
              totalPerCategory: 0
          },
          {
              category: 'Infant',
              peak: 0,
              normal: 0,
              numberOfTickets: 0,
              totalPerCategory: 0
          },
      ],
      showTimeDropDown: false,
      timeSlots: [
          {
              slot: '7AM to 8AM',
              isPeak: false
          },
          {
              slot: '8AM to 9AM',
              isPeak: false
          },
          {
              slot: '9AM to 10AM',
              isPeak: false
          },
          {
              slot: '10AM to 11AM (peak)',
              isPeak: true
          },
          {
              slot: '11AM to 12PM (peak)',
              isPeak: true
          },
          {
              slot: '12PM to 1PM (peak)',
              isPeak: true
          },
          {
              slot: '1PM to 2PM',
              isPeak: false
          },
          {
              slot: '2PM to 3PM',
              isPeak: false
          },
          {
              slot: '3PM to 4PM (peak)',
              isPeak: true
          },
          {
              slot: '4PM to 5PM (peak)',
              isPeak: true
          },
          {
              slot: '5PM to 6PM (peak)',
              isPeak: true
          },
      ],

      pickedTime: [],

      picktimedurtion(index) {
          if (this.pickedTime.includes(index)) {
              this.pickedTime = this.pickedTime.filter(item => item !== index);

          } else {
              let lastElement = this.pickedTime[this.pickedTime.length - 1];
              if (!this.pickedTime.length || index - 1 == lastElement) {
                  this.pickedTime.push(index);

              } else {
                  alert('Please select consecutive time slots');
              }
          }

          this.pickedTime = this.pickedTime.sort();

          console.log(this.pickedTime);
          this.duration=this.pickedTime.length;
      },

      calculate(guestCategory) {
          let totalPerCategory = 0;
          this.pickedTime.forEach((timeDurationIndex) => {
              totalPerCategory += parseInt(guestCategory.numberOfTickets * (this.timeSlots[timeDurationIndex].isPeak ? guestCategory.peak : guestCategory.normal));
          });
          guestCategory.totalPerCategory = totalPerCategory;
      
      },
      totalGuests() {
       let totalPerCategory = 0;
       this.guestTicket.forEach((guestCategory) => {
           totalPerCategory += guestCategory.numberOfTickets;
       });
       return totalPerCategory;
   },

  calculateTotalAmount() {
      let totalAmount = 0;
      this.pickedTime.forEach((timeDurationIndex) => {
          this.guestTicket.forEach((guestCategory) => {
              const ticketPrice = this.timeSlots[timeDurationIndex].isPeak ? guestCategory.peak : guestCategory.normal;
              totalAmount += guestCategory.numberOfTickets * ticketPrice;
          });
      });
      return totalAmount;
  },

  pickedDates() {
      const uniqueDates = [];
      this.pickedTime.forEach((timeIndex) => {
          const date = this.date;
          if (!uniqueDates.includes(date)) {
              uniqueDates.push(date);
          }
      });
      return uniqueDates;
  },

      gotoDetails(){
          localStorage.setItem('guestTicket', JSON.stringify(this.guestTicket));
          localStorage.setItem('selectedDate',this.date);
          localStorage.setItem('selectedTimeSlots', JSON.stringify(this.pickedTime));
          localStorage.setItem('duration', this.duration);
          

          const totalPayable = this.calculateTotalAmount();
          localStorage.setItem('totalPayable', totalPayable);

          window.location.href = 'details.html';
      }
      

  }));
})
