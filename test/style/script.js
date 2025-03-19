document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("quiz-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Правильные ответы
        const correctAnswers = {
            q1: "b",
            q2: "c",
            q3: "b",
            q4: "a",
            q5: "b",
            q6: "c",
            q7: "a",
            q8: "a",
            q9: ["a", "d"], // Несколько правильных ответов
            q10: ["a", "b"], // Несколько правильных ответов
        };

        // Максимальные баллы для каждой области
        const maxScores = {
            "Сбор информации": 2, // 4 вопроса × 0,5 балла
            "Формализация требований": 2, // 4 вопроса × 0,5 балла
            "Анализ и управление требованиями": 6, // 2 вопроса × 3 балла (1,5 за каждый правильный ответ)
        };

        // Подсчет баллов
        let totalScore = 0;
        let areaScores = {
            "Сбор информации": 0,
            "Формализация требований": 0,
            "Анализ и управление требованиями": 0,
        };

        // Проверка ответов
        for (let i = 1; i <= 10; i++) {
            const questionName = `q${i}`;
            const userAnswers = getSelectedAnswers(questionName);
            const correct = correctAnswers[questionName];

            if (Array.isArray(correct)) {
                // Для вопросов с несколькими правильными ответами (вопросы 9 и 10)
                let questionScore = 0;
                userAnswers.forEach((answer) => {
                    if (correct.includes(answer)) {
                        questionScore += 1.5; // 1,5 балла за каждый правильный ответ
                    }
                });
                totalScore += questionScore;
                if (i === 9 || i === 10) {
                    areaScores["Анализ и управление требованиями"] += questionScore;
                }
            } else {
                // Для вопросов с одним правильным ответом (вопросы 1–8)
                if (userAnswers.length > 0 && userAnswers[0] === correct) {
                    totalScore += 0.5; // 0,5 балла за правильный ответ
                    if (i <= 4) areaScores["Сбор информации"] += 0.5;
                    else if (i <= 8) areaScores["Формализация требований"] += 0.5;
                }
            }
        }

        // Выделение правильных ответов
        highlightCorrectAnswers(correctAnswers);

        // Вывод результатов
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = `
      <h2>Результаты</h2>
      <p>Общий балл: ${totalScore}</p>
      <p>Сбор информации: ${areaScores["Сбор информации"]} баллов (${(
            (areaScores["Сбор информации"] / maxScores["Сбор информации"]) *
            100
        ).toFixed(2)}%)</p>
      <p>Формализация требований: ${
            areaScores["Формализация требований"]
        } баллов (${(
            (areaScores["Формализация требований"] / maxScores["Формализация требований"]) *
            100
        ).toFixed(2)}%)</p>
      <p>Анализ и управление требованиями: ${
            areaScores["Анализ и управление требованиями"]
        } баллов (${(
            (areaScores["Анализ и управление требованиями"] / maxScores["Анализ и управление требованиями"]) *
            100
        ).toFixed(2)}%)</p>
      <button onclick="location.reload()">Пройти тест снова</button>
    `;
    });

    // Функция для получения выбранных ответов
    function getSelectedAnswers(questionName) {
        const inputs = document.querySelectorAll(`input[name="${questionName}"]:checked`);
        return Array.from(inputs).map((input) => input.value);
    }

    // Функция для выделения правильных ответов
    function highlightCorrectAnswers(correctAnswers) {
        for (const [questionName, correct] of Object.entries(correctAnswers)) {
            const inputs = document.querySelectorAll(`input[name="${questionName}"]`);
            inputs.forEach((input) => {
                const label = input.closest("label");
                if (Array.isArray(correct)) {
                    // Для вопросов с несколькими правильными ответами
                    if (correct.includes(input.value)) {
                        label.classList.add("correct"); // Добавляем класс correct
                    }
                } else {
                    // Для вопросов с одним правильным ответом
                    if (input.value === correct) {
                        label.classList.add("correct"); // Добавляем класс correct
                    }
                }
            });
        }
    }
});