import "./style.css"
document.addEventListener('DOMContentLoaded', function () {
    let offset = 0;
    const sliderLine = document.querySelector('.slider-line');

    document.querySelector('.slider-next').addEventListener('click', function () {
        offset = offset + 256;
        if (offset > 768) {
            offset = 0;
        }
        sliderLine.style.left = -offset + 'px';
    });

    document.querySelector('.slider-prev').addEventListener('click', function () {
        offset = offset - 256;
        if (offset < 0) {
            offset = 768;
        }
        sliderLine.style.left = -offset + 'px';
    });

    document.getElementById('deposit-type').addEventListener('change', function () {
        const depositType = this.value;
        const investmentPeriodSelect = document.getElementById('investment-period');
        investmentPeriodSelect.innerHTML = '';

        if (depositType === 'popolnyaemy') {
            const options = ['6 месяцев', '1 год', '1,5 года', '2 года'];
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                investmentPeriodSelect.appendChild(optionElement);
            });
        } else if (depositType === 'srochnyy') {
            const options = ['3 месяца', '6 месяцев'];
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                investmentPeriodSelect.appendChild(optionElement);
            });
        }
    });

    document.getElementById('calculator-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const depositType = document.getElementById('deposit-type').value;
        const investmentPeriod = document.getElementById('investment-period').value;
        const initialAmount = parseFloat(document.getElementById('initial-amount').value);

        let interestRate;

        if (depositType === 'popolnyaemy') {
            switch (investmentPeriod) {
                case '6 месяцев':
                    interestRate = 20 * 0.5;
                    break;
                case '1 год':
                    interestRate = 22;
                    break;
                case '1,5 года':
                    interestRate = 15 * 1.5;
                    break;
                case '2 года':
                    interestRate = 10 * 2;
                    break;
            }
        } else if (depositType === 'srochnyy') {
            switch (investmentPeriod) {
                case '3 месяца':
                    interestRate = 20 * 0.25;
                    break;
                case '6 месяцев':
                    interestRate = 22 * 0.5;
                    break;
            }
        }

        const totalAmount = initialAmount + initialAmount * interestRate / 100;

        document.getElementById('result').innerHTML = `
        <p>Через ${investmentPeriod} ваш вклад вырастет до ${totalAmount.toFixed(2)} рублей.</p>
    `;
    });
});

const axios = require('axios');

// Функция для выполнения запроса к API hh.ru и вывода результатов
const searchBtn = document.getElementById('search-btn');
    const keywordInput = document.getElementById('keyword');
    const vacancyList = document.getElementById('vacancy-list');

    searchBtn.addEventListener('click', function () {
        const keyword = keywordInput.value.trim();

        if (keyword === '') {
            alert('Please enter a keyword for job search.');
            return;
        }

        searchVacancies(keyword);
    });

    async function searchVacancies(keyword) {
        try {
            const response = await axios.get(`https://api.hh.ru/vacancies?text=${encodeURIComponent(keyword)}`);
            displayVacancies(response.data.items);
        } catch (error) {
            console.error('Error fetching vacancies:', error.message);
        }
    }

    function displayVacancies(vacancies) {
        vacancyList.innerHTML = '';

        if (vacancies.length === 0) {
            vacancyList.innerHTML = '<li>No vacancies found.</li>';
            return;
        }

        vacancies.forEach(vacancy => {
            const listItem = document.createElement('li');
            listItem.classList.add('vacancy-item');
            listItem.innerHTML = `<a href="${vacancy.alternate_url}" target="_blank">${vacancy.name} (${vacancy.area.name}) - ${vacancy.salary ? vacancy.salary.from + '-' + vacancy.salary.to : 'Salary not specified'}</a>`;
            vacancyList.appendChild(listItem);
        });
    }
