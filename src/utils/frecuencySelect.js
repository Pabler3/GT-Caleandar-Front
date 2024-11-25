let state = {
    selectedFrequency: 0,
    weekDays: [],
    weekFrequency: null,
    monthlyOption: null
};

let frequencyButtons, weeklyOptions, monthlyOptions, dayButtons, weekFrequencyButtons, monthlyOptionButtons;

frequencyButtons = document.querySelectorAll('.freq-btn:not(.week-frequency .freq-btn)');
weeklyOptions = document.getElementById('weekly-options');
monthlyOptions = document.getElementById('monthly-options');
dayButtons = document.querySelectorAll('.day-btn');
weekFrequencyButtons = document.querySelectorAll('.week-frequency .freq-btn');
monthlyOptionButtons = document.querySelectorAll('.monthly-option');

function updateFrequencySelection(button) {
    const value = parseInt(button.dataset.value, 10);

    frequencyButtons.forEach(btn => { btn.classList.remove("active"); btn.classList.remove("expanded"); });
    button.classList.add("active");

    state.selectedFrequency = value;

    // Si tiene opciones adicionales, añade "expanded"
    if (value === 2 || value === 3) {
        button.classList.add("expanded");
    }

    weeklyOptions.classList.toggle("visible", value === 2);
    monthlyOptions.classList.toggle("visible", value === 3);

    if (value !== 2) {
        state.weekDays = [];
        state.weekFrequency = null;
        dayButtons.forEach(btn => btn.classList.remove('active'));
        weekFrequencyButtons.forEach(btn => btn.classList.remove('active'));
    }
    if (value !== 3) {
        state.monthlyOption = null;
        monthlyOptionButtons.forEach(btn => btn.classList.remove('active'));
    }
}

frequencyButtons.forEach((button) => {
    button.addEventListener("click", () => updateFrequencySelection(button));
});

//week days selection
dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const value = parseInt(button.dataset.value);

        if (button.classList.contains('active')) {
            state.weekDays.push(value);
        } else {
            state.weekDays = state.weekDays.filter(day => day !== value);
        }

        checkWeeklyComplete();
    });
});

//week frequency selection
weekFrequencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        weekFrequencyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.weekFrequency = parseInt(button.dataset.value);
        checkWeeklyComplete();
    });
});

//monthly option selection
monthlyOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
        monthlyOptionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        state.monthlyOption = parseInt(button.dataset.value);
        monthlyOptions.classList.remove('visible');
        document.querySelector('[data-value="3"]').classList.remove('expanded');
    });
});

function checkWeeklyComplete() {
    if (state.weekDays.length > 0 && state.weekFrequency !== null) {
        weeklyOptions.classList.remove('visible');
        document.querySelector('[data-value="2"]').classList.remove('expanded');
    }
}

// Initialize with "no repeat" selected
resetFrequencyForm();

export function resetFrequencyForm() {
    state = {
        selectedFrequency: 0,
        weekDays: [],
        weekFrequency: null,
        monthlyOption: null
    };

    frequencyButtons.forEach(btn => btn.classList.remove('active'));
    dayButtons.forEach(btn => btn.classList.remove('active'));
    weekFrequencyButtons.forEach(btn => btn.classList.remove('active'));
    monthlyOptionButtons.forEach(btn => btn.classList.remove('active'));

    weeklyOptions.classList.remove('visible');
    monthlyOptions.classList.remove('visible');

    // Establecer "No repetir" como predeterminado
    const noRepeatButton = document.querySelector('.freq-btn[data-value="0"]');
    if (noRepeatButton) {
        noRepeatButton.classList.add('active');
        state.selectedFrequency = 0;
    }
}

export function getFrequencyData() {
    switch (state.selectedFrequency) {
        case 0:
            return { frequency: 0 };
        case 1:
            return { frequency: 1 };
        case 2:
            return {
                frequency: 2,
                weekDays: state.weekDays,
                repeatEvery: state.weekFrequency || 1
            };
        case 3:
            return {
                frequency: 3,
                monthlySelection: state.monthlyOption || 1
            };
        case 4:
            return { frequency: 4 };
        default:
            return { frequency: 0 };
    }
}
