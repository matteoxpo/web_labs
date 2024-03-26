let offset = 0;
const sliderLine = document.querySelector('.slider-line');

document.querySelector('.slider-next').addEventListener('click', function(){
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

document.getElementById('deposit-type').addEventListener('change', function() {
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

document.getElementById('calculator-form').addEventListener('submit', function(event) {
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
