//=====================
// Ввод номера телефона
//=====================
const phoneInput = document.getElementById("phone");

// Подставляем +7 при фокусировке в поле
phoneInput.addEventListener("focus", function () {
  if (this.value === "") {
    this.value = "+7";
    this.setSelectionRange(2, 2); // каретка после +7
  }
});

// Разрешаем только + и цифры, применяем маску
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.replace(/[^+\d]/g, ""); // Оставляем только + и цифры

  if (value.startsWith("+")) {
    // Удаляем лишние плюсы
    value = "+" + value.slice(1).replace(/\+/g, "");
  } else {
    // Если нет + — убираем его вообще
    value = value.replace(/\+/, "");
  }

  // Применяем маску для формата +7 (999) 999-99-99
  let formatted = "";
  if (value) {
    if (value.startsWith("+")) {
      formatted = "+";
      value = value.slice(1);
    } else {
      formatted = "+7";
    }

    // Берём не более 11 цифр после +
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length > 0) {
      formatted += digits[0];
      if (digits.length > 1) {
        formatted += " (";
        formatted += digits.substring(1, 4).padEnd(3, "_");
        formatted += ") ";
        formatted += digits.substring(4, 7).padEnd(3, "_");
        if (digits.length > 7) {
          formatted += "-";
          formatted += digits.substring(7, 9).padEnd(2, "_");
          if (digits.length > 9) {
            formatted += "-";
            formatted += digits.substring(9, 11).padEnd(2, "_");
          }
        }
      }
    }
  }

  // Обновляем значение поля
  e.target.value = formatted;

  // Сохраняем позицию каретки (опционально, но полезно)
  // Здесь упрощённо — можно улучшить при необходимости
});

// Защита от вставки мусора
phoneInput.addEventListener("paste", function (e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData).getData("text");
  const clean = pasted.replace(/[^+\d]/g, "");
  document.execCommand("insertText", false, clean);
});

//===========
// Ввод имени
//===========
const nameInput = document.getElementById("name");

nameInput.addEventListener("input", function (e) {
  let value = e.target.value;

  // Оставляем только русские буквы: А-Яа-яёЁ
  const cleaned = value.replace(/[^А-Яа-яёЁ]/g, "");

  if (cleaned) {
    // Переводим всё в нижний регистр и делаем первую заглавной
    const formatted = cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase();

    // Обновляем значение
    e.target.value = formatted;
  } else {
    // Если ничего нет — оставляем пустым
    e.target.value = "";
  }
});

// Защита от вставки недопустимого текста (Ctrl+V)
nameInput.addEventListener("paste", function (e) {
  e.preventDefault();
  const pasted = (e.clipboardData || window.clipboardData).getData("text");
  const cleaned = pasted.replace(/[^А-Яа-яёЁ]/g, "");
  const formatted = cleaned
    ? cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase()
    : "";
  document.execCommand("insertText", false, formatted);
});
