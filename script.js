// --- Переключение между вкладками сайта ---
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('href').slice(1);

    // Активируем страницу
    document.querySelectorAll('.page').forEach(page => {
      page.classList.toggle('active', page.id === target);
    });

    // Активируем ссылку в меню
    document.querySelectorAll('nav a').forEach(l => {
      l.classList.toggle('active', l === link);
    });

    // При переключении вкладок очищаем квизы, если переходим в квизы
    if(target === 'quizzes') {
      document.querySelectorAll('.quiz-container').forEach(container => {
        container.style.display = container.id === 'quiz1' ? 'block' : 'none';
        container.querySelector('.quiz-result').textContent = '';
        container.querySelector('form').reset();
      });
    }
  });
});

// --- Переключение между квизами внутри раздела ---
document.querySelectorAll('.quiz-switch').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    document.querySelectorAll('.quiz-container').forEach(container => {
      container.style.display = (container.id === targetId) ? 'block' : 'none';
      if(container.id === targetId) {
        container.querySelector('.quiz-result').textContent = '';
        container.querySelector('form').reset();
      }
    });
  });
});

// --- Обработка результатов квизов ---
document.querySelectorAll('.quiz-form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const container = form.closest('.quiz-container');
    const formData = new FormData(form);
    let result = '';

    if(container.id === 'quiz1') {
      // Квиз "Кто ты в Хогвартсе?"
      const scores = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };
      for(let [key, value] of formData.entries()) {
        if(scores[value] !== undefined) scores[value]++;
      }
      const house = Object.entries(scores).sort((a,b) => b[1] - a[1])[0][0];
      const names = {
        gryffindor: 'Гриффиндор',
        slytherin: 'Слизерин',
        ravenclaw: 'Когтевран',
        hufflepuff: 'Пуффендуй'
      };
      result = `Твой факультет — <strong>${names[house]}</strong>!`;
    }
    else if(container.id === 'quiz2') {
      // Квиз "Мир Гарри Поттера"
      // Правильные ответы: q1=a, q2=b, q3=b, q4=a, q5=a, q6=a
      let correct = 0;
      if(formData.get('q1') === 'a') correct++;
      if(formData.get('q2') === 'b') correct++;
      if(formData.get('q3') === 'b') correct++;
      if(formData.get('q4') === 'a') correct++;
      if(formData.get('q5') === 'a') correct++;
      if(formData.get('q6') === 'a') correct++;

      result = `Ты ответил правильно на <strong>${correct}</strong> из 6 вопросов.`;
    }
    else if(container.id === 'quiz3') {
      // Квиз "Заклинания и зелья"
      // Правильные ответы: q1=a, q2=a, q3=b, q4=a, q5=a, q6=a
      let correct = 0;
      if(formData.get('q1') === 'a') correct++;
      if(formData.get('q2') === 'a') correct++;
      if(formData.get('q3') === 'b') correct++;
      if(formData.get('q4') === 'a') correct++;
      if(formData.get('q5') === 'a') correct++;
      if(formData.get('q6') === 'a') correct++;

      result = `Ты ответил правильно на <strong>${correct}</strong> из 6 вопросов.`;
    }

    container.querySelector('.quiz-result').innerHTML = result;
  });
});
