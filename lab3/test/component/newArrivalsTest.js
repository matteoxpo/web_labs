describe('New Arrivals Component Test', function() {

  let component;

  before(async () => {
    component = await browser.mountVueComponent('/src/components/new-arrivals/NewArrivals.vue', {
      plugins: {
        store: '/src/lib/store.js',
        router: '/src/lib/router.js'
      },

      mocks: {
        '/data/new-arrivals.json': {
          type: 'fetch',
          body: {
            books: [
              {
                "title": "Добрый кола 0.25л стекло",
                "author": "Мултон",
                "image": "https://mosprivoz.ru/upload/iblock/32c/32c824bf8fe344f97b53e1fc5c3f9e94.jpeg",
                "price": 119.99,
                "currency": "руб.",
                "category": "Газированные напикти > в стекле",
                "isbn13": 9781101911815,
                "description": "Новый сильногазированный напиток Добрый «Кола» — это яркий и освежающий заряд хорошего настроения, которым так хочется делиться с тем, кто рядом! Пейте охлажденным!"
              }
            ]
          }
        }
      }
    })
  });

  it('tests the component', function(browser) {
    // const newArrivalsValue = await component.getProperty('newArrivals');
    // console.log('newArrivals', newArrivalsValue)

    expect(component).to.be.visible;
    expect(component).to.have.property('newArrivals');

    expect(component).text.toContain('The Memory Police')

    expect(component.findAll('div.col-md-6')).length(1);

    expect(component.property('newArrivals')).to.be.an('array').with.length(1);
  });

  it('logs the innerHTML property', async function(browser) {
    const innerHTML = await browser.getElementProperty(component, 'innerHTML');
    browser.assert.textContains(component, 'The Memory Police');
  });
});
