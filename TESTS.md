# В данном файле собраны тестовые программы, которые могут быть запущены интерпретатором/отладчиком.


### while, endwhile, depth, neg, однострочное комментирование

3 1  
while  
dup 1 -  
dup 0 >  
endwhile  
drop  

()

(0 1 2 3)

---

depth  
0 5  
depth  

()  

(3 5 0 0)

---

10 neg  
-7 neg  
0 neg 

()

(0 7 -10)

---

15  
// neg (Данная строка не должна выполниться)

(3)

(15 3)

---
---

### drop, drop-all, dup, rot

1 2 3 4 5  
drop

()

(4 3 2 1)

---

1 2 3 4 5  
drop-all

()

()

---

1 2 3 4 5  
dup

()

(5 5 4 3 2 1)

---

1 2 3 4 5  
rot

()

(3 4 5 2 1)

---
---  
  
### +, swap, over, if, endif  
  
1 2  
3 4 +  
5 6  
7 8 +  
9 10  
  
()  
  
(10 9 15 6 5 7 2 1)  
  
---  
  
70 80  
swap  
50 60  
swap   
  
()  
  
(50 60 70 80)  
  
---  
  
33 99 121  
over  
over  
55  
over  
over  
  
()  
  
(55 121 55 121 99 121 99 33)  
  
---  
  
1 2 3 4 5  
over 4 =  
if  
6 7 8  
endif  
over 8 =  
if  
9 10  
endif  
  
()  
  
(8 7 6 5 4 3 2 1)  
  
---  
---  

### div, mod, -, /, *

0 -15 -  
2.857 -  
E Tau + -  
Pi -  

()  

(0)  

---

\*  
1.443 0.434  \*  
\=  
-1 *  

(Log2E Log10E)  

(1)  

---

0 1 /  
15 -2 /  
Ln10 2 /  
Ln2 -1 /  

()  

(-0.693, 1.151, -7.5, 0)  

---

0 1 div  
15 -2 div  
Ln10 2 div  
Ln2 -1 div  

()

(-1, 1, -7, 0)

---

6 6 mod  
17 -3 mod  
Sqrt2 Sqrt3 +  
4 mod  

()  

(3, 2, 0)  

---
---

### and, or, not, var, exit

10 0 and  
-1 5 and  

()  

(-1, 0)  

---

0 0 or  
5 0 or  
-1 0 or  
10 6 or  

()  

(-1, -1, -1, 0)  

---

10 not  
0 not  

()  

(-1, 0)  

---

var x 5  
x  
var x 6  
x

()  

(6, 5)  

---

define func  
dup 0 =  
if -1 exit endif  
1  
end  
0 func  
3 func  

(4)  

(1, 3, -1, 0, 4)  

---
---

### многострочное комментирование, define...end, <, >, =

-3 -3 =  
-3 0 =  
-3 6.9 =  

()  

(0, 0, -1)  

---

2 -1 <  
2 2 <  
2 9 <  

()  

(-1, 0, 0)  

---

-5 -5 >  
-5 1 >  
-5 -10.5 >  

()  

(-1, 0, 0)  

---

1 2 3  
dup  
/* test  
  block  
comment */  
+  
7  

()  

(7, 6, 2, 1) 

---

define even  
dup  
2 mod 0 =  
if drop endif  
end  

9 even  
8 even  
7 even  
6 even  
5 even  
4 even  
3 even  
2 even  
1 even  

()  

(1, 3, 5, 7, 9)  

---
---
