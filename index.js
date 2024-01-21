const state = {
    day: {
        value: '--',
        status: '',
        errors: []
    },
    month: {
        value: '--',
        errors: [],
        status: ''
    },
    year: {
        value: '--',
        errors: [],
        status: ''
    } 
}

const dictDayMonth = {
    '01': 31,
    '02': 29,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31
};


const render = (state) => {
    // alert(JSON.stringify(state))
    Object.keys(state).forEach((item) => {
        // alert(state[item].status)
        if (state[item].status == 'invalid') {
            const input = document.querySelector(`#${item}`);
            // alert(item)
            const parent = input.parentNode;
            const errorDiv = document.createElement('div');
            errorDiv.textContent = state[item].errors;
            errorDiv.classList.add('input-invalid')
            parent.innerHTML = '';
            parent.appendChild(input);
            parent.appendChild(errorDiv);
        } else {
        }
    })
}

function validateInteger(value, errors, status, fieldName, minValue = 1, maxValue = 2023) {
    alert(value, status, fieldName)
    if (!Number.isInteger(value)) {
        errors.push(`${fieldName} must be an integer`);
        state[fieldName].status = 'invalid';
        
    // alert(state[fieldName].status)
    }
    if (value < minValue || value > maxValue) {
        errors.push(`must be a valid ${fieldName}`);
        status = 'invalid';
    }
}

// function validateDate(day, month, year, dictDayMonth, state) {
//     if (day >= dictDayMonth[month] || day < 1) {
//         state.day.errors.push('must be a valid day');
//         state.day.status = 'invalid';
//     }
//     if (month > 12 || month < 1) {
//         state.month.errors.push('must be a valid month');
//         state.month.status = 'invalid';
//     }
// }


const validate = (state) => {
    const day = parseInt(state.day.value);
    const month = parseInt(state.month.value);
    const year = parseInt(state.year.value);

    validateInteger(day, state.day.errors, state.day.status, 'day', 1, dictDayMonth[month]);
    validateInteger(month, state.month.errors, state.month.status, 'month', 1, 12);
    validateInteger(year, state.year.errors, state.year.status, 'year', 1, 2023);

    // validateDate(day, month, year, dictDayMonth, state);


    render(state);
}


const submitData = () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        state.day.value = formData.get('day'); 
        state.month.value = formData.get('month');
        state.year.value = formData.get('year');
        validate(state);
    });
};


submitData();