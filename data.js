// JAPON Educational Content & Question Banks
const JAPON_DATA = {
  subjects: {
    english: {
      title: "English & Academic Terminology",
      description: "Vocabulary, Grammar, Reading, Writing, Speaking, and Academic English for MEXT scientific exams.",
      modules: [
        {
          id: "eng_academic",
          title: "Academic & Scientific English",
          lessons: [
            {
              id: "eng_1",
              title: "Essential Scientific Vocabulary",
              mextConfirmed: true,
              objectives: [
                "Master core scientific nouns used in Mathematics, Physics, and Chemistry prompts. (Засвоїти базові наукові іменники, що використовуються в екзаменаційних завданнях.)",
                "Recognize bilingual English-Ukrainian equivalents. (Розпізнавати двомовні англо-українські відповідники.)"
              ],
              introduction: "MEXT Natural Sciences A questions are written in English or Japanese. Understanding exact scientific terminology prevents misreading problems. (Екзаменаційні питання MEXT пишуться англійською або японською. Розуміння точної наукової термінології запобігає неправильному прочитанню задач.)",
              theory: "Scientific terms have strict, unambiguous meanings unlike everyday conversational words. (Наукові терміни мають суворі, однозначні значення на відміну від повсякденних слів.)",
              definitions: [
                { term: "Equation", ua: "Рівняння", def: "A mathematical statement that two expressions are equal.", defUa: "Математичне твердження про те, що два вирази рівні." },
                { term: "Variable", ua: "Змінна", def: "A symbol representing a quantity that can change.", defUa: "Символ, що представляє величину, яка може змінюватися." },
                { term: "Velocity", ua: "Швидкість (векторна)", def: "The rate of change of displacement with direction.", defUa: "Швидкість зміни переміщення із зазначенням напрямку." },
                { term: "Acceleration", ua: "Прискорення", def: "The rate of change of velocity per unit time.", defUa: "Швидкість зміни швидкості за одиницю часу." },
                { term: "Force", ua: "Сила", def: "An interaction that changes the motion of an object.", defUa: "Взаємодія, що змінює рух об'єкта." },
                { term: "Energy", ua: "Енергія", def: "The capacity for doing work.", defUa: "Здатність виконувати роботу." },
                { term: "Density", ua: "Густина", def: "Mass per unit volume of a substance.", defUa: "Маса на одиницю об'єму речовини." },
                { term: "Mole", ua: "Моль", def: "The SI base unit for amount of substance.", defUa: "Базова одиниця СІ для кількості речовини." },
                { term: "Concentration", ua: "Концентрація", def: "Amount of solute per unit volume of solution.", defUa: "Кількість розчиненої речовини в одиниці об'єму розчину." }
              ],
              formulas: [
                {
                  formula: "ρ = m / V",
                  desc: "Density formula (Формула густини)",
                  variables: [
                    { symbol: "ρ", name: "density", ua: "густина" },
                    { symbol: "m", name: "mass", ua: "маса" },
                    { symbol: "V", name: "volume", ua: "об'єм" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Translate and interpret: 'Determine the acceleration of a body when a constant net force acts on it.'",
                  solution: "Identify 'acceleration' (прискорення) and 'net force' (рівнодійна сила). Use Newton's Second Law a = F/m.",
                  ua: "Визначте прискорення тіла, коли на нього діє стала рівнодійна сила. Використовуйте другий закон Ньютона a = F/m."
                }
              ],
              commonMistakes: [
                "Confusing 'velocity' (векторна швидкість) with 'speed' (скалярна швидкість). (Плутанина між векторною та скалярною швидкістю.)"
              ],
              practice: [
                "Write definitions for Equation, Mole, and Density in your own words. (Запишіть визначення для Equation, Mole та Density своїми словами.)"
              ],
              quiz: [
                {
                  id: "q_eng_1",
                  question: "Which term means 'the rate of change of velocity per unit time'?",
                  options: ["Density (Густина)", "Acceleration (Прискорення)", "Concentration (Концентрація)", "Variable (Змінна)"],
                  correct: 1,
                  explanation: "Acceleration is the rate of change of velocity. (Прискорення — це швидкість зміни швидкості.)"
                },
                {
                  id: "q_eng_2",
                  question: "What is the Ukrainian translation of 'Density'?",
                  options: ["Густина", "Концентрація", "Сила", "Рівняння"],
                  correct: 0,
                  explanation: "Density translates to густина (mass per unit volume). (Density перекладається як густина — маса на одиницю об'єму.)"
                }
              ]
            },
            {
              id: "eng_2",
              title: "Academic Grammar: Passive Voice & Conditionals",
              mextConfirmed: true,
              objectives: [
                "Understand passive constructions common in scientific texts. (Зрозуміти пасивні конструкції, поширені в наукових текстах.)",
                "Analyze conditional clauses in problem statements. (Аналізувати умовні речення в умовах задач.)"
              ],
              introduction: "Scientific English uses passive voice to focus on processes rather than the person performing them. (Наукова англійська використовує пасивний стан, щоб зосередитися на процесах, а не на виконавці.)",
              theory: "Passive structure: Subject + to be + Past Participle (V3). Example: 'The solution is heated to 100°C.' (Структура пасиву: Підмет + to be + дієприкметник минулого часу. Приклад: 'Розчин нагрівають до 100°C.')",
              definitions: [
                { term: "Passive Voice", ua: "Пасивний стан", def: "Grammatical voice where the subject receives the action.", defUa: "Граматичний стан, де підмет зазнає дії." }
              ],
              formulas: [],
              examples: [
                {
                  problem: "Analyze: 'Assuming friction is negligible, find the final velocity.'",
                  solution: "'Assuming... is negligible' sets an ideal physical condition (тертям можна знехтувати).",
                  ua: "'Припускаючи, що тертям можна знехтувати, знайдіть кінцеву швидкість.'"
                }
              ],
              commonMistakes: [
                "Ignoring words like 'negligible' (нехтовно малий) or 'respectively' (відповідно). (Ігнорування слів 'negligible' або 'respectively'.)"
              ],
              practice: [
                "Convert 'We dissolve 5 g of salt in water' into passive voice. (Перетворіть 'Ми розчиняємо 5 г солі у воді' у пасивний стан.)"
              ],
              quiz: [
                {
                  id: "q_eng_3",
                  question: "What does 'friction is negligible' mean in a physics problem?",
                  options: ["Friction is very large (Тертя дуже велике)", "Friction can be ignored (Тертям можна знехтувати)", "Friction doubles (Тертя подвоюється)", "Friction is unknown (Тертя невідоме)"],
                  correct: 1,
                  explanation: "'Negligible' means small enough to be safely ignored. ('Negligible' означає настільки малий, що ним можна знехтувати.)"
                }
              ]
            }
          ]
        }
      ]
    },
    mathematics: {
      title: "Mathematics (Natural Sciences A)",
      description: "Progressive curriculum from Foundations and Algebra to Trigonometry and Calculus (MEXT Math Course 2).",
      modules: [
        {
          id: "math_foundations",
          title: "Foundations & Number Systems",
          lessons: [
            {
              id: "math_1",
              title: "Number Sets, Powers & Roots",
              mextConfirmed: false,
              objectives: [
                "Distinguish Natural, Integer, Rational, and Real numbers. (Розрізняти натуральні, цілі, раціональні та дійсні числа.)",
                "Apply exponent and radical laws accurately. (Точно застосовувати закони степенів та коренів.)"
              ],
              introduction: "Every algebraic manipulation relies on understanding number sets and exponent rules. (Кожне алгебраїчне перетворення спирається на розуміння числових множин та правил степенів.)",
              theory: "Real numbers (ℝ) include rational numbers (ℚ, expressible as p/q) and irrational numbers (like √2, π). (Дійсні числа включають раціональні та ірраціональні числа.)",
              definitions: [
                { term: "Rational Number", ua: "Раціональне число", def: "Any number expressible as a fraction p/q where p, q are integers and q ≠ 0.", defUa: "Будь-яке число, яке можна подати у вигляді дробу p/q, де p, q — цілі числа і q ≠ 0." },
                { term: "Absolute Value", ua: "Модуль числа", def: "The non-negative distance of a number from zero on the number line.", defUa: "Невід'ємна відстань числа від нуля на числовій прямій." }
              ],
              formulas: [
                {
                  formula: "a^m · a^n = a^(m+n)   |   (a^m)^n = a^(m·n)",
                  desc: "Laws of Exponents (Закони степенів)",
                  variables: [
                    { symbol: "a", name: "base", ua: "основа степеня" },
                    { symbol: "m, n", name: "exponents", ua: "показники степеня" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Simplify (2³ · 2⁴) / 2⁵.",
                  solution: "Step 1: 2^(3+4) = 2⁷. Step 2: 2⁷ / 2⁵ = 2^(7-5) = 2² = 4.",
                  ua: "Крок 1: 2^(3+4) = 2⁷. Крок 2: 2⁷ / 2⁵ = 2² = 4."
                }
              ],
              commonMistakes: [
                "Writing √(a² + b²) = a + b. This is false! (Помилково писати √(a² + b²) = a + b.)"
              ],
              practice: [
                "Evaluate | -7 | + 3² - √16. (Обчисліть | -7 | + 3² - √16.)"
              ],
              quiz: [
                {
                  id: "q_math_1",
                  question: "Simplify (x⁴)³:",
                  options: ["x⁷", "x¹²", "x⁶⁴", "3x⁴"],
                  correct: 1,
                  explanation: "When raising a power to a power, multiply exponents: 4 × 3 = 12. (При піднесенні степеня до степеня показники перемножуються: 4 × 3 = 12.)"
                }
              ]
            }
          ]
        },
        {
          id: "math_algebra",
          title: "Algebra & Quadratic Equations",
          lessons: [
            {
              id: "math_2",
              title: "Quadratic Equations & Discriminant",
              mextConfirmed: true,
              objectives: [
                "Solve quadratic equations using the discriminant formula. (Розв'язувати квадратні рівняння за допомогою формули дискримінанта.)",
                "Determine the number of real solutions from D. (Визначати кількість дійсних розв'язків за дискримінантом D.)"
              ],
              introduction: "A quadratic equation is an equation of the second degree. (Квадратне рівняння — це рівняння другого степеня.)",
              theory: "Standard form: ax² + bx + c = 0 (a ≠ 0). If D > 0, there are 2 distinct real roots; if D = 0, 1 repeated real root; if D < 0, 2 complex conjugate roots. (Стандартна форма: ax² + bx + c = 0. Якщо D > 0 — два дійсні корені; D = 0 — один корінь; D < 0 — комплексні корені.)",
              definitions: [
                { term: "Discriminant", ua: "Дискримінант", def: "The expression D = b² - 4ac that determines root nature.", defUa: "Вираз D = b² - 4ac, який визначає характер коренів." }
              ],
              formulas: [
                {
                  formula: "x = (-b ± √(b² - 4ac)) / 2a",
                  desc: "Quadratic Formula (Формула коренів квадратного рівняння)",
                  variables: [
                    { symbol: "x", name: "unknown variable", ua: "невідома змінна" },
                    { symbol: "a, b, c", name: "coefficients", ua: "коефіцієнти" },
                    { symbol: "D = b² - 4ac", name: "discriminant", ua: "дискримінант" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Solve 2x² - 7x + 3 = 0.",
                  solution: "a = 2, b = -7, c = 3. D = (-7)² - 4(2)(3) = 49 - 24 = 25. x = (7 ± 5) / 4 → x₁ = 3, x₂ = 0.5.",
                  ua: "a = 2, b = -7, c = 3. D = 49 - 24 = 25. x = (7 ± 5) / 4 → x₁ = 3, x₂ = 0.5."
                }
              ],
              commonMistakes: [
                "Forgetting to divide the entire numerator (-b ± √D) by 2a. (Забувати ділити весь чисельник на 2a.)"
              ],
              practice: [
                "Find the roots of x² - 6x + 9 = 0. (Знайдіть корені рівняння x² - 6x + 9 = 0.)"
              ],
              quiz: [
                {
                  id: "q_math_2",
                  question: "How many real roots does x² + 4x + 5 = 0 have?",
                  options: ["2 distinct real roots (2 різні дійсні корені)", "1 repeated real root (1 дійсний корінь)", "0 real roots (0 дійсних коренів)", "Infinite roots (Безліч коренів)"],
                  correct: 2,
                  explanation: "D = 4² - 4(1)(5) = 16 - 20 = -4 < 0, so there are no real roots. (D = -4 < 0, тому дійсних коренів немає.)"
                }
              ]
            },
            {
              id: "math_3",
              title: "Logarithms & Exponential Functions",
              mextConfirmed: true,
              objectives: [
                "Convert between exponential and logarithmic forms. (Переходити між показниковою та логарифмічною формами.)",
                "Apply logarithm properties in MEXT algebra problems. (Застосовувати властивості логарифмів у задачах MEXT.)"
              ],
              introduction: "Logarithms are the inverse operations of exponentiation. (Логарифми є оберненою операцією до піднесення до степеня.)",
              theory: "For a > 0, a ≠ 1, and x > 0: log_a(x) = y is equivalent to a^y = x. (Для a > 0, a ≠ 1 та x > 0: log_a(x) = y еквівалентно a^y = x.)",
              definitions: [
                { term: "Logarithm", ua: "Логарифм", def: "The exponent to which a base must be raised to produce a given number.", defUa: "Показник степеня, до якого треба піднести основу, щоб отримати дане число." }
              ],
              formulas: [
                {
                  formula: "log_a(xy) = log_a(x) + log_a(y)   |   log_a(x^k) = k·log_a(x)",
                  desc: "Product and Power Rules of Logarithms (Правила добутку та степеня логарифмів)",
                  variables: [
                    { symbol: "a", name: "logarithm base (a > 0, a ≠ 1)", ua: "основа логарифма" },
                    { symbol: "x, y", name: "positive arguments (x, y > 0)", ua: "додатні аргументи" },
                    { symbol: "k", name: "real exponent", ua: "дійсний показник" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Evaluate log₂(32) + log₃(9).",
                  solution: "2⁵ = 32 → log₂(32) = 5. 3² = 9 → log₃(9) = 2. Sum = 5 + 2 = 7.",
                  ua: "2⁵ = 32 → log₂(32) = 5. 3² = 9 → log₃(9) = 2. Сума = 7."
                }
              ],
              commonMistakes: [
                "Writing log_a(x + y) = log_a(x) + log_a(y). Addition inside a logarithm does NOT split! (Додавання всередині логарифма не розкладається на суму логарифмів!)"
              ],
              practice: [
                "Solve log₅(x) = 3. (Розв'яжіть log₅(x) = 3.)"
              ],
              quiz: [
                {
                  id: "q_math_3",
                  question: "What is the value of log₂(16)?",
                  options: ["2", "4", "8", "16"],
                  correct: 1,
                  explanation: "Since 2⁴ = 16, log₂(16) = 4. (Оскільки 2⁴ = 16, то log₂(16) = 4.)"
                }
              ]
            }
          ]
        },
        {
          id: "math_calculus",
          title: "Trigonometry & Calculus (MEXT Course 2)",
          lessons: [
            {
              id: "math_4",
              title: "Trigonometric Identities & Derivatives",
              mextConfirmed: true,
              objectives: [
                "Use the Pythagorean trigonometric identity. (Використовувати основну тригонометричну тотожність.)",
                "Compute basic polynomial derivatives. (Обчислювати базові похідні многочленів.)"
              ],
              introduction: "Trigonometry and calculus form the core of MEXT Natural Sciences A Mathematics. (Тригонометрія та математичний аналіз складають основу математики MEXT.)",
              theory: "For any angle θ, sin²θ + cos²θ = 1. The derivative f'(x) measures the instantaneous rate of change of f(x). (Для будь-якого кута θ виконується sin²θ + cos²θ = 1. Похідна f'(x) вимірює миттєву швидкість зміни функції.)",
              definitions: [
                { term: "Derivative", ua: "Похідна", def: "The limit of the ratio of change in function value to change in input.", defUa: "Границя відношення приросту функції до приросту аргументу." }
              ],
              formulas: [
                {
                  formula: "d/dx (x^n) = n · x^(n-1)   |   sin²θ + cos²θ = 1",
                  desc: "Power Rule for Derivatives & Fundamental Identity (Правило диференціювання степеня та основна тотожність)",
                  variables: [
                    { symbol: "n", name: "real constant", ua: "дійсна константа" },
                    { symbol: "θ", name: "angle in radians", ua: "кут у радіанах" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Find f'(x) for f(x) = 3x⁴ - 5x + 7.",
                  solution: "f'(x) = 3·4x³ - 5·1 + 0 = 12x³ - 5.",
                  ua: "f'(x) = 12x³ - 5 (похідна константи 7 дорівнює 0)."
                }
              ],
              commonMistakes: [
                "Forgetting that the derivative of a constant is 0. (Забувати, що похідна константи дорівнює 0.)"
              ],
              practice: [
                "Differentiate g(x) = x³ + 2x². (Знайдіть похідну g(x) = x³ + 2x².)"
              ],
              quiz: [
                {
                  id: "q_math_4",
                  question: "What is the derivative of f(x) = 5x³?",
                  options: ["15x²", "5x²", "15x³", "3x²"],
                  correct: 0,
                  explanation: "Using d/dx(x^n) = n·x^(n-1): 5 · 3x² = 15x². (За правилом степеня: 5 · 3x² = 15x².)"
                }
              ]
            }
          ]
        }
      ]
    },
    chemistry: {
      title: "Chemistry",
      description: "Foundations, Atomic Structure, Periodic Table, Bonding, Stoichiometry, Solutions, and Equilibrium.",
      modules: [
        {
          id: "chem_quantitative",
          title: "Atomic Structure & Quantitative Chemistry",
          lessons: [
            {
              id: "chem_1",
              title: "Mole Concept & Molarity",
              mextConfirmed: true,
              objectives: [
                "Calculate amount of substance in moles from mass. (Обчислювати кількість речовини в молях за масою.)",
                "Calculate molarity of solutions. (Обчислювати молярну концентрацію розчинів.)"
              ],
              introduction: "Quantitative chemistry links microscopic atoms to measurable laboratory masses. (Кількісна хімія пов'язує мікроскопічні атоми з вимірюваними масами.)",
              theory: "One mole contains Avogadro's constant N_A = 6.02 × 10²³ particles. Molarity (C) is moles of solute per liter of solution. (Один моль містить сталу Авогадро 6.02 × 10²³ частинок. Молярність — це кількість молів речовини на літр розчину.)",
              definitions: [
                { term: "Molarity", ua: "Молярна концентрація", def: "Number of moles of solute divided by volume of solution in liters.", defUa: "Кількість молів розчиненої речовини, поділена на об'єм розчину в літрах." }
              ],
              formulas: [
                {
                  formula: "n = m / M   |   C = n / V",
                  desc: "Mole & Molarity Equations (Формули кількості речовини та молярності)",
                  variables: [
                    { symbol: "n", name: "amount of substance (mol)", ua: "кількість речовини (моль)" },
                    { symbol: "m", name: "mass (g)", ua: "маса (г)" },
                    { symbol: "M", name: "molar mass (g/mol)", ua: "молярна маса (г/моль)" },
                    { symbol: "C", name: "molarity (mol/L)", ua: "молярна концентрація (моль/л)" },
                    { symbol: "V", name: "solution volume (L)", ua: "об'єм розчину (л)" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "What is the molarity of 40 g of NaOH (M = 40 g/mol) dissolved in 0.5 L of water?",
                  solution: "n = 40 / 40 = 1.0 mol. C = 1.0 mol / 0.5 L = 2.0 mol/L.",
                  ua: "n = 40 / 40 = 1.0 моль. C = 1.0 / 0.5 = 2.0 моль/л."
                }
              ],
              commonMistakes: [
                "Using milliliters (mL) instead of liters (L) in C = n / V. (Використання мілілітрів замість літрів у формулі C = n / V.)"
              ],
              practice: [
                "Calculate the mass of 0.25 mol of CO₂ (M = 44 g/mol). (Обчисліть масу 0.25 моль CO₂.)"
              ],
              quiz: [
                {
                  id: "q_chem_1",
                  question: "How many moles are in 36 g of H₂O (M = 18 g/mol)?",
                  options: ["0.5 mol", "1.0 mol", "2.0 mol", "18 mol"],
                  correct: 2,
                  explanation: "n = m / M = 36 g / 18 g/mol = 2.0 mol. (n = 36 / 18 = 2.0 моль.)"
                }
              ]
            },
            {
              id: "chem_2",
              title: "Acids, Bases & pH Scale",
              mextConfirmed: true,
              objectives: [
                "Define acids and bases according to Brønsted-Lowry theory. (Визначати кислоти та основи за теорією Бренстеда-Лоурі.)",
                "Calculate pH from hydrogen ion concentration [H⁺]. (Обчислювати pH за концентрацією іонів водню [H⁺].)"
              ],
              introduction: "Acidity and basicity govern aqueous chemical reactions in MEXT chemistry exams. (Кислотність та основність керують водними хімічними реакціями на іспитах MEXT.)",
              theory: "An acid is a proton (H⁺) donor; a base is a proton acceptor. pH = -log₁₀[H⁺]. At 25°C, neutral water has pH = 7. (Кислота — донор протонів H⁺; основа — акцептор протонів. pH = -log₁₀[H⁺]. При 25°C нейтральна вода має pH = 7.)",
              definitions: [
                { term: "pH", ua: "Водневий показник", def: "Negative base-10 logarithm of hydrogen ion molarity.", defUa: "Від'ємний десятковий логарифм молярної концентрації іонів водню." }
              ],
              formulas: [
                {
                  formula: "pH = -log₁₀[H⁺]",
                  desc: "pH Definition Formula (Формула водневого показника pH)",
                  variables: [
                    { symbol: "[H⁺]", name: "hydrogen ion concentration (mol/L)", ua: "концентрація іонів водню (моль/л)" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Find the pH of a 0.001 mol/L HCl solution.",
                  solution: "[H⁺] = 10⁻³ mol/L → pH = -log₁₀(10⁻³) = 3.",
                  ua: "[H⁺] = 10⁻³ моль/л → pH = 3."
                }
              ],
              commonMistakes: [
                "Thinking a higher pH means stronger acidity (lower pH = higher [H⁺]). (Вважати, що вищий pH означає сильнішу кислотність.)"
              ],
              practice: [
                "Determine pH when [H⁺] = 1.0 × 10⁻⁵ mol/L. (Визначте pH, якщо [H⁺] = 1.0 × 10⁻⁵ моль/л.)"
              ],
              quiz: [
                {
                  id: "q_chem_2",
                  question: "What is the pH of a solution with [H⁺] = 10⁻² mol/L?",
                  options: ["2", "7", "12", "-2"],
                  correct: 0,
                  explanation: "pH = -log₁₀(10⁻²) = 2. (pH = -log₁₀(10⁻²) = 2.)"
                }
              ]
            }
          ]
        }
      ]
    },
    physics: {
      title: "Physics",
      description: "Mechanics, Energy, Thermodynamics, Electricity, Magnetism, Waves, and Modern Physics.",
      modules: [
        {
          id: "phys_mechanics",
          title: "Mechanics & Energy",
          lessons: [
            {
              id: "phys_1",
              title: "Newton's Laws & Kinematics",
              mextConfirmed: true,
              objectives: [
                "Apply equations of uniformly accelerated motion. (Застосовувати рівняння рівноприскореного руху.)",
                "Use Newton's Second Law F = ma. (Використовувати другий закон Ньютона F = ma.)"
              ],
              introduction: "Mechanics is the foundation of MEXT Physics and appears in every exam paper. (Механіка є основою фізики MEXT і зустрічається в кожному білеті.)",
              theory: "Newton's Second Law states that net force equals mass times acceleration. (Другий закон Ньютона стверджує, що рівнодійна сила дорівнює добутку маси на прискорення.)",
              definitions: [
                { term: "Inertia", ua: "Інерція", def: "Tendency of an object to resist changes in its state of motion.", defUa: "Властивість тіла зберігати стан спокою або рівномірного прямолінійного руху." }
              ],
              formulas: [
                {
                  formula: "F_net = m · a   |   v = v₀ + a·t",
                  desc: "Newton's Second Law & Velocity Equation (Другий закон Ньютона та рівняння швидкості)",
                  variables: [
                    { symbol: "F_net", name: "net force (N)", ua: "рівнодійна сила (Н)" },
                    { symbol: "m", name: "mass (kg)", ua: "маса (кг)" },
                    { symbol: "a", name: "acceleration (m/s²)", ua: "прискорення (м/с²)" },
                    { symbol: "v, v₀", name: "final and initial velocity (m/s)", ua: "кінцева та початкова швидкість (м/с)" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "A 4 kg block is pushed with a net force of 12 N. Find its acceleration.",
                  solution: "a = F_net / m = 12 N / 4 kg = 3 m/s².",
                  ua: "a = 12 Н / 4 кг = 3 м/с²."
                }
              ],
              commonMistakes: [
                "Using mass (kg) directly as weight (N) without multiplying by g ≈ 9.8 m/s². (Використання маси в кг як ваги в Н без множення на g.)"
              ],
              practice: [
                "Find the net force required to accelerate a 10 kg object at 2.5 m/s². (Знайдіть силу для прискорення тіла масою 10 кг на 2.5 м/с².)"
              ],
              quiz: [
                {
                  id: "q_phys_1",
                  question: "A net force of 20 N acts on a 5 kg mass. What is its acceleration?",
                  options: ["4 m/s²", "100 m/s²", "0.25 m/s²", "15 m/s²"],
                  correct: 0,
                  explanation: "a = F / m = 20 / 5 = 4 m/s². (a = F / m = 20 / 5 = 4 м/с².)"
                }
              ]
            },
            {
              id: "phys_2",
              title: "Kinetic & Potential Energy",
              mextConfirmed: true,
              objectives: [
                "Calculate kinetic energy and gravitational potential energy. (Обчислювати кінетичну та потенціальну енергію.)",
                "Apply conservation of mechanical energy. (Застосовувати закон збереження механічної енергії.)"
              ],
              introduction: "Energy conservation allows solving complex mechanics problems without tracking forces over time. (Збереження енергії дозволяє розв'язувати складні задачі механіки.)",
              theory: "In the absence of non-conservative forces like friction, total mechanical energy E = K + U remains constant. (За відсутності тертя повна механічна енергія E = K + U залишається сталою.)",
              definitions: [
                { term: "Kinetic Energy", ua: "Кінетична енергія", def: "Energy possessed by an object due to its motion.", defUa: "Енергія, яку має тіло внаслідок свого руху." }
              ],
              formulas: [
                {
                  formula: "K = ½ m v²   |   U = m g h",
                  desc: "Kinetic & Gravitational Potential Energy (Кінетична та потенціальна енергія)",
                  variables: [
                    { symbol: "K", name: "kinetic energy (J)", ua: "кінетична енергія (Дж)" },
                    { symbol: "U", name: "potential energy (J)", ua: "потенціальна енергія (Дж)" },
                    { symbol: "g", name: "gravitational acceleration (9.8 m/s²)", ua: "прискорення вільного падіння (9.8 м/с²)" },
                    { symbol: "h", name: "height (m)", ua: "висота (м)" }
                  ]
                }
              ],
              examples: [
                {
                  problem: "Find the kinetic energy of a 2 kg ball moving at 3 m/s.",
                  solution: "K = 0.5 × 2 × 3² = 9 J.",
                  ua: "K = 0.5 × 2 × 9 = 9 Дж."
                }
              ],
              commonMistakes: [
                "Forgetting to square the velocity v in K = ½mv². (Забувати підносити швидкість v до квадрату.)"
              ],
              practice: [
                "Calculate potential energy of a 5 kg mass at height 2 m (take g = 9.8 m/s²). (Обчисліть потенціальну енергію маси 5 кг на висоті 2 м.)"
              ],
              quiz: [
                {
                  id: "q_phys_2",
                  question: "If an object's speed doubles, its kinetic energy increases by a factor of:",
                  options: ["2", "4", "8", "1"],
                  correct: 1,
                  explanation: "Since K = ½mv², doubling v multiplies K by 2² = 4. (Оскільки K пропорційна v², подвоєння швидкості збільшує K у 4 рази.)"
                }
              ]
            }
          ]
        }
      ]
    },
    japanese: {
      title: "Japanese Language & Vocabulary",
      description: "Hiragana, Katakana, Kanji, JLPT Vocabulary, Flashcards, and Spaced Repetition.",
      modules: [
        {
          id: "jp_core",
          title: "Japanese Writing & MEXT Vocabulary",
          lessons: [
            {
              id: "jp_1",
              title: "Hiragana, Katakana & Scientific Kanji",
              mextConfirmed: true,
              objectives: [
                "Understand the three Japanese scripts: Hiragana, Katakana, Kanji. (Зрозуміти три японські системи письма: хірагана, катакана, кандзі.)",
                "Learn core MEXT academic Kanji compounds. (Вивчити базові академічні слова кандзі для MEXT.)"
              ],
              introduction: "Even in Natural Sciences A, basic Japanese literacy helps navigate exam instructions and university life in Japan. (Базова грамотність японською допомагає орієнтуватися в інструкціях іспиту та навчанні в Японії.)",
              theory: "Hiragana is used for grammar particles; Katakana for foreign loanwords; Kanji for core nouns and verb stems. (Хірагана використовується для граматики; катакана — для запозичених слів; кандзі — для основних іменників та дієслів.)",
              definitions: [
                { term: "Kanji (漢字)", ua: "Кандзі", def: "Logographic Chinese characters adopted into Japanese.", defUa: "Ієрогліфи, запозичені в японську писемність." }
              ],
              formulas: [],
              examples: [
                {
                  problem: "Read: 数学 (すうがく / suugaku)",
                  solution: "Means 'Mathematics' (Математика).",
                  ua: "Означає 'Математика'."
                }
              ],
              commonMistakes: [
                "Confusing 科学 (kagaku - science) and 化学 (kagaku - chemistry), which share the same pronunciation. (Плутанина між 科学 'наука' та 化学 'хімія', які мають однакову вимову.)"
              ],
              practice: [
                "Practice all 12 flashcards in the Japanese Flashcard Trainer below. (Потренуйте всі 12 карток у тренажері нижче.)"
              ],
              quiz: [
                {
                  id: "q_jp_1",
                  question: "What does 物理 (butsuri) mean?",
                  options: ["Chemistry (Хімія)", "Physics (Фізика)", "Mathematics (Математика)", "Equation (Рівняння)"],
                  correct: 1,
                  explanation: "物理 (butsuri) means Physics. (物理 означає фізика.)"
                }
              ]
            }
          ]
        }
      ]
    }
  },
  vocabularyDatabase: [
    { id: 1, japanese: "勉強する", reading: "benkyou suru", english: "to study", ua: "вчитися", jlpt: "N5", category: "Verbs", example: "毎日日本語を勉強します。", exampleUa: "Я вивчаю японську щодня." },
    { id: 2, japanese: "学校", reading: "gakkou", english: "school", ua: "школа", jlpt: "N5", category: "Nouns", example: "学校へ行きます。", exampleUa: "Я йду до школи." },
    { id: 3, japanese: "科学", reading: "kagaku", english: "science", ua: "наука", jlpt: "N3", category: "Academic", example: "科学は面白いです。", exampleUa: "Наука цікава." },
    { id: 4, japanese: "物理", reading: "butsuri", english: "physics", ua: "фізика", jlpt: "N3", category: "Academic", example: "物理の試験を受けます。", exampleUa: "Я складаю іспит з фізики." },
    { id: 5, japanese: "化学", reading: "kagaku", english: "chemistry", ua: "хімія", jlpt: "N3", category: "Academic", example: "化学反応を調べます。", exampleUa: "Я досліджую хімічну реакцію." },
    { id: 6, japanese: "数学", reading: "suugaku", english: "mathematics", ua: "математика", jlpt: "N4", category: "Academic", example: "数学の問題を解きます。", exampleUa: "Я розв'язую задачу з математики." },
    { id: 7, japanese: "方程式", reading: "houteishiki", english: "equation", ua: "рівняння", jlpt: "N2", category: "Academic", example: "二次方程式を解く。", exampleUa: "Розв'язати квадратне рівняння." },
    { id: 8, japanese: "変数", reading: "hensuu", english: "variable", ua: "змінна", jlpt: "N2", category: "Academic", example: "xは変数です。", exampleUa: "x — це змінна." },
    { id: 9, japanese: "速度", reading: "sokudo", english: "velocity", ua: "швидкість", jlpt: "N2", category: "Physics", example: "光の速度は速い。", exampleUa: "Швидкість світла велика." },
    { id: 10, japanese: "加速度", reading: "kasokudo", english: "acceleration", ua: "прискорення", jlpt: "N1", category: "Physics", example: "重力加速度。", exampleUa: "Прискорення вільного падіння." },
    { id: 11, japanese: "濃度", reading: "noudo", english: "concentration", ua: "концентрація", jlpt: "N2", category: "Chemistry", example: "水溶液の濃度。", exampleUa: "Концентрація водного розчину." },
    { id: 12, japanese: "密度", reading: "mitsudo", english: "density", ua: "густина", jlpt: "N2", category: "Physics", example: "水の密度を計算する。", exampleUa: "Обчислити густину води." }
  ],
  kanaCharts: {
    hiragana: [
      { char: "あ", romaji: "a" }, { char: "い", romaji: "i" }, { char: "う", romaji: "u" }, { char: "え", romaji: "e" }, { char: "お", romaji: "o" },
      { char: "か", romaji: "ka" }, { char: "き", romaji: "ki" }, { char: "く", romaji: "ku" }, { char: "け", romaji: "ke" }, { char: "こ", romaji: "ko" },
      { char: "さ", romaji: "sa" }, { char: "し", romaji: "shi" }, { char: "す", romaji: "su" }, { char: "せ", romaji: "se" }, { char: "そ", romaji: "so" },
      { char: "た", romaji: "ta" }, { char: "ち", romaji: "chi" }, { char: "つ", romaji: "tsu" }, { char: "て", romaji: "te" }, { char: "と", romaji: "to" }
    ],
    katakana: [
      { char: "ア", romaji: "a" }, { char: "イ", romaji: "i" }, { char: "ウ", romaji: "u" }, { char: "エ", romaji: "e" }, { char: "オ", romaji: "o" },
      { char: "カ", romaji: "ka" }, { char: "キ", romaji: "ki" }, { char: "ク", romaji: "ku" }, { char: "ケ", romaji: "ke" }, { char: "コ", romaji: "ko" },
      { char: "サ", romaji: "sa" }, { char: "シ", romaji: "shi" }, { char: "ス", romaji: "su" }, { char: "セ", romaji: "se" }, { char: "ソ", romaji: "so" },
      { char: "タ", romaji: "ta" }, { char: "チ", romaji: "chi" }, { char: "ツ", romaji: "tsu" }, { char: "テ", romaji: "te" }, { char: "ト", romaji: "to" }
    ]
  }
};
