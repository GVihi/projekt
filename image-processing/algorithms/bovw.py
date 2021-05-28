"""
import mysql.connector
cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
cur = cnx.cursor()
cur.execute("SELECT * FROM pePhotos")
for row in cur.fetchall():
    print(row)
cnx.close()
"""


# gremo skozi vse tagge znotraj baze, dobimo polje taggov

# gremo skozi vse slike, ki imajo ta dolocen tag, to je nasa testna mnozica

# za vsako sliko naredimo sift izracun znacilnic in deskriptorjev

# vse znacilnice slik staknemo skupaj v eno veliko 1d polje

# to polje razdelimo na segmente, oz najdemo centre segmentov, ti nam predstavljajo delce slike,  to je ustvarjen slovar

# naredimo histoogram za slike nad katerimi se ucimo, kot rezultat dobimo polje hisogramov za vsako sliko

# naredimo k-nn algoritem, ki nam vrne slike, ki jih je prepoznal za ujemajocec, prejme pa mnozico histogramo in testno sliko

# na koncu poracunamo natacnost

# vrnemo polje indeksov tagov, kjer je veliko ujemanje