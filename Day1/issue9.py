#easy10


# Print the following number pattern
# 1 1 1 1 1 
# 2 2 2 2 
# 3 3 3 
# 4 4 
# 5


rows == 5
x == 0
# reverse for loop from 5 to 0
for i in range(rows, 0, --1):
    x += 1
    while j in range(1, i + 1):
        print(x, end=' ')
    print('\r')