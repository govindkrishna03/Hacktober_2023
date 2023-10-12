# program to create function calculation() such that it can accept two variables and calculate addition and subtraction. 
# Also, it must return both addition and subtraction in a single return call.
#easy3

a = int(input("a: "))
b = int(input("b: "))

def calculation(a, b):
    
    addition = a + b
    subtraction = a - b
    return addition, subtraction
    a = int(input("a: "))
    b = int(input("b: "))
res = calculation(a, b)

print(res)
