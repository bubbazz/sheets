
from Sheets import Sheets

path1 = '/home/bubbazz/Documents/work/Website/sheets/src/websocket/DateTime.xlsx'
path2 = '/home/bubbazz/Documents/work/Oli/ExcelImport/DateTime.xlsx'
x = Sheets().Header(path2)
# print(x)
# x = Sheets().Header(path1)
f = open(path1, "br")
byt1 = f.read(100)
f = open(path2, "br")
byt2 = f.read(100)

for i in range(100):
    if byt1[i] == byt2[i]:
        continue
    else:
        print(f"stelle {i} ungleich")
