import React from 'react';

const advicesData = [
  {
    id: 1,
    title: "Проверьте свою скорость интернета",
    description: "Перед подключением убедитесь, что ваша скорость интернета соответствует заявленным данным провайдера.",
  },
  {
    id: 2,
    title: "Разместите маршрутизатор в центре дома",
    description: "Чтобы улучшить покрытие Wi-Fi, постарайтесь разместить маршрутизатор в центре вашего дома или квартиры.",
  },
  {
    id: 3,
    title: "Ограничьте количество подключенных устройств",
    description: "Подключение слишком большого числа устройств может существенно снизить скорость интернета.",
  },
];

const Adviceses = () => {
  const goBack = () => {
    window.history.back(); 
  };

  return (
    <div className="adviceses">
      <h2>Рекомендации</h2>
      <button onClick={goBack} className="back-button">
        Назад
      </button>
      <div className="advices-list">
        {advicesData.map((advice) => (
          <div key={advice.id} className="advice-card">
            <h3>{advice.title}</h3>
            <p>{advice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adviceses;
