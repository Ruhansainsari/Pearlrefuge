document.addEventListener('alpine:init', () => {
    Alpine.data('details', () => ({
        guest: {
            fullName: '',
            phone: '',
            email: '',
            confirmEmail: '',
            gender: '',
        },

        confirm: false,

        init() {
            const input = document.querySelector("#phone");
            window.intlTelInput(input, {
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
            });
        },

        loadFromLocalStorage() {
        const storedGuest = localStorage.getItem('guest');
        if (storedGuest) {
          this.guest = JSON.parse(storedGuest);
        }
      },

      saveToLocalStorage() {
        localStorage.setItem('guest', JSON.stringify(this.guest));
      },

      emailValidation() {
        this.confirm = this.guest.email !== this.guest.confirmEmail;
      },

      submitForm() {
      this.showEmailError = this.guest.email !== this.guest.confirmEmail;
      if (this.showEmailError) {
        return;
      }
     },

     fullNameInput(event) {
      const inputValue = event.target.value;
      const lettersAndSpacesValue = inputValue.replace(/[^A-Za-z\s]/g, '');
      this.guest.fullName = lettersAndSpacesValue;
  },
      
        gotoPayment() {
            localStorage.setItem('guest', JSON.stringify(this.guest))
            window.location.href = 'payment.html';
        }
    }))
});
     