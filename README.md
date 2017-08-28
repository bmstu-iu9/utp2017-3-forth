# IU9ForthDebugger
Интерпретатор стекового языка программирования с пошаговым отладчиком и сменой тем оформления

## Описание языка
Язык является видоизмененным ограниченным подмножеством  языка Forth. В языке операции
осуществляются с рациональными числами. Используется постфиксная запись операторов. 
Все вычисления осуществляются на стеке данных. При запуске интерпретатора стек может быть
инициализирован некоторыми исходными данными или быть пустым.

### Встроенные в язык слова
Далее стек будет изображен следующим образом:  
(n1 n2 n3)  
Вершина стека находится слева.  

##### Арифметические операции:
* \+  (n2 n1) → (сумма)         Сумма n1 и n2  
* −   (n2 n1) → (разность)      Разность: n1 − n2  
* \*  (n2 n1) → (произведение)  Произведение n2 на n1  
* \/  (n2 n1) → (частное)       Целочисленное деление n1 на n2  
* mod (n2 n1) → (остаток)       Остаток от деления n1 на n2  
* neg (n) → (−n)                Смена знака числа  
  
Булевы значения представлены с помощью целых чисел:  
-1 соответствует значению "истина", 0 - значению "ложь".

##### Операции сравнения:
* \=  (n2 n1) → (флаг)  Флаг равен −1, если n1 = n2, иначе флаг равен 0  
* \>  (n2 n1) → (флаг)  Флаг равен −1, если n1 > n2, иначе флаг равен 0  
* \<  (n2 n1) → (флаг)  Флаг равен −1, если n1 < n2, иначе флаг равен 0  
  
##### Логические операции:
* not  (n) → (результат)      НЕ n  
* and  (n2 n1) → (результат)  n2 И n1  
* or   (n2 n1) → (результат)  n2 ИЛИ n1  

##### Операции со стеком:
* drop  (n1) → ()               Удаляет элемент на вершине стека  
* drop-all (nN ... n1) → ()     Очищает стек
* swap  (n2 n1) → (n1 n2)       Меняет местами два элемента на вершине стека  
* dup   (n1) → (n1 n1)          Дублирует элемент на вершине стека  
* over  (n2 n1) → (n1 n2 n1)    Копирует предпоследний элемент на вершину стека  
* rot  (n3 n2 n1) → (n1 n2 n3)  Меняет местами первый и третий элемент от головы стека  
* depth (...) → (n ...)         Возвращает число элементов в стеке перед своим вызовом  

##### Управляющие конструкции:
* define  () → ()  Начинает словарную статью — определение слова word  
* end     () → ()  Завершает статью  
* exit    () → ()  Завершает выполнение процедуры (кода статьи)  
* if      (флаг) → ()  Если флаг не равен 0, то выполняется код в теле if..endif, иначе выполнение кода до endif пропускается  
* endif   () → ()  Завершает тело if  
* while   (флаг) → ()  Создает цикл, если флаг не равен 0, то выполняется код в теле цикла (while..endwhile), иначе выполнение кода до endwhile включительно пропускается  
* endwhile () → () Запускает выполнение соответствующего while (проверка флага и т.д.)

Слово define word начинает определение слова word. В теле определения
(словарной статьи) следуют слова, которые надо вычислить, чтобы вычислить слово word.
Статья заканчивается словом end. Определенное таким образом слово может быть
использовано в программе так же, как и встроенное. В статьях допускаются рекурсивные
определения. Вложенные словарные статьи не допускаются. Конструкции if...endif могут
быть вложенными.

В тексте программы можно оставлять комментарии. Комментарием является текст, заключенный между "/*" и "*/" или находящийся в строке после "//". Пример:  
  
define abs/*этот текст  
не будет учтен*/dup 0 <  
if neg endif  
end  //и этот также
abs  

### Участники:
* Царукян Геворг (старший) — @TSARukyanGT
* Зобнев Игорь — @IgorZobnev
* Мамедов Владислав — @StructDeStruct
* Кошелев Андрей — @koshelevandrey
* Докучаева Екатерина — @opium-poppy
* Внукова Анастасия — @AnAirport
* Молчанов Всеволод — @KabudoWiseMan
