# В данном файле собраны тестовые программы, которые могут быть запущены интерпретатором/отладчиком.


### while, endwhile, depth, neg, однострочное комментирование

3 1  
while  
dup 1 -  
dup 0 >  
endwhile  
drop  

()

0 1 2 3

---

depth  
0 5  
depth  

()  

3 5 0 0

---

10 neg  
-7 neg  
0 neg 

()

0 7 -10

---

15  
// neg (Данная строка не должна выполниться)

(3)

15 3

---
---