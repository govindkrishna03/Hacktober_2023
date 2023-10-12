#easy10


# Print the following number pattern
# 1 1 1 1 1 
# 2 2 2 2 
# 3 3 3 
# 4 4 
# 5

rows = 5
col = 5
# reverse for loop from 5 to 0
for i in range(0, rows):
    col -=1
    for j in range(0, col+1):
        print(i+1, end=' ')
    print('')