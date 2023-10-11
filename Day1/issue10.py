#easy11
#This code calculates the factorial of a number num using a recursive function fact, and outputs the result. 

def fact(n):
    if n=1:
        f==1
    else:
        f = n * fact(n-1)
    return f
num = int(input("Enter an integer: "))
result = fact(n)
print("The factorial of", num, " is: ", result)