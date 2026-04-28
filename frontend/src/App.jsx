import { useState } from 'react';
import siteData from './db.json';

const {
  services,
  reviews,
  contacts,
} = siteData;

const prices = {
  sand: 2500,
  artesian: 3000,
  equipped: 4000,
  turnkey: 3500,
};

const ContactIcon = ({ children }) => (
  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      {children}
    </svg>
  </span>
);

function App() {
  const [activePage, setActivePage] = useState('home');
  const [wellType, setWellType] = useState('sand');
  const [depth, setDepth] = useState(40);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  });

  const totalCost = depth * prices[wellType];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name || !formData.phone || !formData.location) {
      setSubmitState({
        status: 'error',
        message: 'Пожалуйста, заполните имя, телефон и местоположение.',
      });
      return;
    }

    setSubmitState({
      status: 'loading',
      message: 'Отправляем заявку...',
    });

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          wellType,
          depth,
          totalCost,
          createdAt: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Ошибка при отправке заявки.');
      }

      setFormData({
        name: '',
        phone: '',
        email: '',
        location: '',
        message: '',
      });
      setSubmitState({
        status: 'success',
        message: result.message || 'Заявка отправлена. Мы скоро свяжемся с вами.',
      });
    } catch (error) {
      setSubmitState({
        status: 'error',
        message: error.message || 'Не удалось отправить заявку. Попробуйте позже.',
      });
    }
  };

  const renderHome = () => (
    <>
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-32"
        style={{ backgroundImage: "url('/burr.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mb-4">
            Бурение, обустройство скважин и септиков по Московской области
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Бурим не просто скважины, а создаем автономные системы водоснабжения
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setActivePage('services')}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-semibold transition"
            >
              Посмотреть услуги
            </button>
            <button
              onClick={() => setActivePage('calculator')}
              className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition"
            >
              Рассчитать стоимость
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
              <img src="/about1.png" alt="Буровая установка" className="w-full h-auto object-cover" />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                О компании <span className="font-normal">Источник качества</span>
              </h1>
              <p className="text-gray-700 text-xl mb-6">«Вода в каждый дом и на дачу — это миссия нашей компании»</p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Предлагаем профессиональное бурение скважин на воду под ключ по всей Московской области.
                Мы выполняем полный комплекс работ — от подбора оптимального типа скважины до обустройства и запуска системы водоснабжения.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Собственная техника, опытные буровые бригады и современное оборудование позволяют нам гарантировать стабильный результат и чистую воду круглый год.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">Мы не посредники — бурим сами и лично отвечаем за свою работу.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Как происходит процесс работы</h2>
          <p className="text-center font-bold text-lg mb-12">3 простых шага</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="mb-4"><img src="/about2.jpg" alt="Шаг 1" className="w-full h-40 object-cover rounded-xl" /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Шаг 1</h3>
              <p className="text-gray-600 mb-3"><span className="font-semibold">Звоните:</span><br />+7 999 888 77 66</p>
              <p className="text-gray-600 text-sm mb-4">Познакомимся, проконсультируем и согласуем встречу на объекте</p>
              <button onClick={() => setActivePage('order')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition w-full">Оставить заявку</button>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="mb-4"><img src="/about3.png" alt="Шаг 2" className="w-full h-40 object-cover rounded-xl" /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Шаг 2</h3>
              <p className="text-gray-600 mb-3">Обсудим вашу задачу.<br />Наметим план. Составим смету. Заключим договор</p>
              <p className="text-gray-600 text-sm">Выедем на объект для полного замера и составления точной сметы</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
              <div className="mb-4"><img src="/about4.png" alt="Шаг 3" className="w-full h-40 object-cover rounded-xl" /></div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Шаг 3</h3>
              <p className="text-gray-600">Приступаем к работам<br />По очередности начинаем работы на вашем объекте</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderServices = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Все услуги по водоснабжению</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group flex flex-col h-full"
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>
              <div className="relative z-10 p-6 text-white flex flex-col h-full">
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <ul className="space-y-2 mb-6 text-white/90 flex-grow">
                  {service.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <div className="mt-4"><span className="text-2xl font-bold">{service.price}</span></div>
                <button onClick={() => setActivePage('order')} className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition w-full">Оставить заявку</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderPortfolio = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12">Портфолио</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="h-64 overflow-hidden">
              <img src="/port1kart.jpg" alt="Поиск воды в Московской области" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Поиск воды в Московской области</h3>
              <p className="text-gray-600 text-sm">Скважина глубиной 65 метров с обустройством под ключ</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="h-64 overflow-hidden">
              <img src="/port2kart.jpeg" alt="Септик в коттеджном посёлке" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Септик в коттеджном посёлке</h3>
              <p className="text-gray-600 text-sm">Установка септика для дома</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">
            <div className="h-64 overflow-hidden">
              <img src="/port3kart.jpg" alt="Дренаж участка в Балашихе" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Дренаж участка в Балашихе</h3>
              <p className="text-gray-600 text-sm">Щебеночный дренаж и ливневая система</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderReviews = () => (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Отзывы клиентов</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex items-center gap-4 mb-4">
                <img src="/ava.png" alt={review.name} className="w-16 h-16 rounded-full object-cover border-2 border-amber-500" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{review.name}</h3>
                  <div className="flex text-amber-500">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderContacts = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Контакты</h2>
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-md">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <ContactIcon>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </ContactIcon>
              <span className="text-gray-700 text-lg">{contacts.address}</span>
            </div>
            <div className="flex items-center gap-4">
              <ContactIcon>
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.31.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.26.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
              </ContactIcon>
              <a href="tel:+79998887766" className="text-gray-700 text-lg hover:text-orange-500 transition">{contacts.phone}</a>
            </div>
            <div className="flex items-center gap-4">
              <ContactIcon>
                <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2 .37 6.42 4.51a1 1 0 0 0 1.16 0L19 7.12v-.37a.75.75 0 0 0-.75-.75H5.75A.75.75 0 0 0 5 6.75v.37Zm14 2.44-5.27 3.7a3 3 0 0 1-3.46 0L5 9.56v7.69c0 .41.34.75.75.75h12.5c.41 0 .75-.34.75-.75V9.56Z" />
              </ContactIcon>
              <a href={`mailto:${contacts.email}`} className="text-gray-700 text-lg hover:text-orange-500 transition">{contacts.email}</a>
            </div>
            <div className="flex items-center gap-4">
              <ContactIcon>
                <path d="M12 1.75a.75.75 0 0 1 .75.75v8.81l6.22 3.59a.75.75 0 1 1-.75 1.3l-6.6-3.81A.75.75 0 0 1 11.25 12V2.5a.75.75 0 0 1 .75-.75ZM12 4a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm-9.5 8a9.5 9.5 0 1 1 9.5 9.5A9.51 9.51 0 0 1 2.5 12Z" />
              </ContactIcon>
              <span className="text-gray-700 text-lg">{contacts.workHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const renderCalculator = () => (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Рассчитайте стоимость бурения</h2>
        <p className="text-center text-gray-500 mb-12">Выберите параметры скважины и получите предварительную цену</p>
        <div className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-lg">
          <div className="mb-6">
            <label className="block font-bold mb-3 text-lg text-gray-900">Тип скважины</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button onClick={() => setWellType('sand')} className={`p-3 rounded-xl border-2 transition ${wellType === 'sand' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                <div className="font-semibold text-sm">На песок</div><div className="text-xs text-gray-500">до 40 м</div>
              </button>
              <button onClick={() => setWellType('artesian')} className={`p-3 rounded-xl border-2 transition ${wellType === 'artesian' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                <div className="font-semibold text-sm">На известняк</div><div className="text-xs text-gray-500">от 40 м</div>
              </button>
              <button onClick={() => setWellType('equipped')} className={`p-3 rounded-xl border-2 transition ${wellType === 'equipped' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                <div className="font-semibold text-sm">С обустройством</div><div className="text-xs text-gray-500">под ключ</div>
              </button>
              <button onClick={() => setWellType('turnkey')} className={`p-3 rounded-xl border-2 transition ${wellType === 'turnkey' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                <div className="font-semibold text-sm">Под ключ</div><div className="text-xs text-gray-500">всё включено</div>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <label className="block font-bold mb-3 text-lg text-gray-900">Глубина (м): {depth}</label>
            <input type="range" min="10" max="200" value={depth} onChange={(event) => setDepth(Number(event.target.value))} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-500" />
            <div className="flex justify-between text-sm text-gray-500 mt-1"><span>10 м</span><span>200 м</span></div>
          </div>
          <div className="bg-white rounded-xl p-4 mb-6 flex justify-between items-center border border-gray-200">
            <span className="text-lg font-medium">Предварительная стоимость:</span>
            <span className="text-3xl font-bold text-orange-500">{totalCost.toLocaleString('ru-RU')} ₽</span>
          </div>
          <button onClick={() => setActivePage('order')} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition">Оставить заявку</button>
        </div>
      </div>
    </section>
  );

  const renderOrderForm = () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-8">Оставьте заявку, и мы свяжемся с вами для уточнения деталей</p>
          <form onSubmit={handleContactSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-md">
            <div className="mb-5">
              <label className="block font-semibold text-gray-800 mb-2">Ваше имя</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ваше имя" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition" required />
            </div>
            <div className="mb-5">
              <label className="block font-semibold text-gray-800 mb-2">Номер телефона</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+7 (___) ___-__-__" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition" required />
            </div>
            <div className="mb-5">
              <label className="block font-semibold text-gray-800 mb-2">E-mail</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition" />
            </div>
            <div className="mb-5">
              <label className="block font-semibold text-gray-800 mb-2">Местоположение</label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Например: Москва, Балашиха, Подольск..." className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition" required />
            </div>
            <div className="mb-6">
              <label className="block font-semibold text-gray-800 mb-2">Оставьте ваше пожелание</label>
              <textarea name="message" value={formData.message} onChange={handleInputChange} rows="3" placeholder="Например: хочу пробурить скважину глубиной 40 метров на песок" className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-500 transition"></textarea>
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold text-lg transition disabled:opacity-70" disabled={submitState.status === 'loading'}>
              {submitState.status === 'loading' ? 'Отправляем...' : 'Отправить заявку'}
            </button>
            {submitState.message ? (
              <p className={`mt-4 text-sm ${submitState.status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {submitState.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-2xl font-bold text-stone-800">БурСкважина</div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button onClick={() => setActivePage('home')} className={`hover:text-orange-500 font-medium transition ${activePage === 'home' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Главная</button>
            <button onClick={() => setActivePage('portfolio')} className={`hover:text-orange-500 font-medium transition ${activePage === 'portfolio' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Портфолио</button>
            <button onClick={() => setActivePage('services')} className={`hover:text-orange-500 font-medium transition ${activePage === 'services' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Каталог услуг</button>
            <button onClick={() => setActivePage('calculator')} className={`hover:text-orange-500 font-medium transition ${activePage === 'calculator' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Рассчитать стоимость</button>
            <button onClick={() => setActivePage('reviews')} className={`hover:text-orange-500 font-medium transition ${activePage === 'reviews' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Отзывы</button>
            <button onClick={() => setActivePage('order')} className={`hover:text-orange-500 font-medium transition ${activePage === 'order' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Оставить заявку</button>
            <button onClick={() => setActivePage('contacts')} className={`hover:text-orange-500 font-medium transition ${activePage === 'contacts' ? 'text-stone-800 border-b-2 border-stone-800' : 'text-stone-800'}`}>Контакты</button>
          </nav>
          <div className="text-sm text-stone-600 font-medium">Ежедневно с 9:00 до 21:00</div>
        </div>
      </header>
      <main className="flex-grow">
        {activePage === 'home' && renderHome()}
        {activePage === 'services' && renderServices()}
        {activePage === 'portfolio' && renderPortfolio()}
        {activePage === 'calculator' && renderCalculator()}
        {activePage === 'reviews' && renderReviews()}
        {activePage === 'contacts' && renderContacts()}
        {activePage === 'order' && renderOrderForm()}
      </main>
    </div>
  );
}

export default App;
