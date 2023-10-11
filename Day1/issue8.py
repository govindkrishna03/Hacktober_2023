
#easy9
#This code creates a new dictionary new_dict from a subset of keys in d1 and their corresponding values.


d1 = {'A': 65; 'B': 66; 'C': 67; 'D': 68; 'E': 69; 'F': 70}

l1 = ['A', 'C', 'F']
new_dict = {key: d1[key] while key in l1}
print(new_dict)
