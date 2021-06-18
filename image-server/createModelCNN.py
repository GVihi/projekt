import matplotlib.pyplot as plt
import numpy as np
import os
import PIL
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

# dolocimo direktorij, kjer imamo ustvarjen train in valid set
base_dir = './dataset'
train_dir = os.path.join(base_dir, 'train-set')
test_dir = os.path.join(base_dir, 'test-set')

# pogledamo koliko direktorijev imamo, to nam pove koliko razredov bomo imeli
numdir = len(os.listdir(train_dir))

# ustvari vrednosti za velikost slike in velikost
# batch size nam pove koliko slik bomo hkrati obdelali, da se pohitri proces, namesto obdelovanja samo ene slike
# https://stackoverflow.com/questions/41175401/what-is-a-batch-in-tensorflow
batch_size = 32
img_height = 180
img_width = 180

# ustvarimo train set iz poti, ki smo jo zgoraj definirali za trian set
# validation_split nam pove kaksno naj bo razmerje med train in valid setom
# seed uporabimo za naključnost izbire elementov iz seta
# bacth pa nam povez koliko slik se obdeluje hkrati
# subset pa je samo poimenovanje seta
train_ds = tf.keras.preprocessing.image_dataset_from_directory(
  train_dir,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

# isto ko zograj, le da za drugo pot, torej za pot validation
val_ds = tf.keras.preprocessing.image_dataset_from_directory(
  test_dir,
  validation_split=0.2,
  subset="validation",
  seed=123,
  image_size=(img_height, img_width),
  batch_size=batch_size)

# definiramo tudi katere razrede imamo
# to vzamemo lastnot, ki je polje - to pa drzi podatke iz train seta, torej imena map skozi katera je zajemalo podatke
class_names = train_ds.class_names

# informativno izpisemo vse razrede
print(class_names)

# pridobimo tudi stevilo razredov, ker 
num_classes = len(class_names)

# data agumentation skrbi za generiranje dodatnih lastnosti v training setu, če imamo manjhno množico slik, ki morda ne pokrije vsega,
# zato se s pomočjo agumentation slika spreminja (rotira), da je v dodatno generirajo lastnosti, ki pomagajo prepoznati feature
# podatmi morali, kako se nam slika rotire, njene dimenzije in barvne kanale

data_augmentation = keras.Sequential(
  [
    layers.experimental.preprocessing.RandomFlip("horizontal",input_shape=(img_height,img_width,3)),
    layers.experimental.preprocessing.RandomRotation(0.1),
    layers.experimental.preprocessing.RandomZoom(0.1),
  ]
)
#padding "same" pomeni, da sliki ob roboih dodamo ničle

#conv2d se uporablja konvolucijsko jedro, da je iščejo lastnosti na sliki, te se prepoznajo
# npr. iščejo se oči, prsti, listi, zatem ko se najdejo manjši elementi pa se spet na večjem pogledu iščejo npr. glava, telo, steblo, ...
# velikokrat pa se gledajo na začetku tudi samo manjhni robovi, potem se gre na manjse feature 
# na koncu imamo zdruzenih vec plasti, ki predstavljajo razlicne feature, glede na te potem predvidevamo vecje znacilke naprej

# maxPooling se uporabi, da se zmanjšajo dimenzije in je manj računanja
# potem tudi zmanjšuje overfitting, ker je manj parametrov
# model je tako tudi manj ranljiv na popačenja v sliki

# conv + maxpooling je prilagodljiv ne glede na lokacijo feature, torej neka lastnost je lahko kjerkoli na sliki, levo, desno in jo še vedno zaznamo

# z relu gledmao, če je večje od 0, takrat obdržimo, če je manjse kot 0 pa nastavimo 0

# dropout se tudi uporablja za preprecevanja overfitting, za podani flot, ki mora biti med 0 in 1, naključno nastavi vrednosti na 0, ostale pa poracuna po: 1 / (1 - rate)
# flatten zdruzi vse v en vektor in iz tega se potem gleda prepoznava objekta
# dense na koncu predstavlja dejansko nevronsko mrežo, v mojem primeru dobimo 128 nevronov, zraven pa še upoštevamo aktivacijo relu
model = Sequential([
  data_augmentation,
  layers.experimental.preprocessing.Rescaling(1.255),
  layers.Conv2D(16, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(32, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Conv2D(64, 3, padding='same', activation='relu'),
  layers.MaxPooling2D(),
  layers.Dropout(0.2),
  layers.Flatten(),
  layers.Dense(128, activation='relu'),
  layers.Dense(num_classes)
])

# zgoraj definiral model moramo prevesti
# za optimizaotr izgube podatkov med razredi in lastnostmi uporabimo optimizator adam
# za izgubo uporabimo vec kategoricno crossentropy, ki 
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

# preberemo povzetek zgrajenea modela
model.summary()

# definiramo stevilo ponovitev urjenja modela
epochs = 20

# model urimo, uporabimo train mnozico, ki smo definirali  cisto na zacetku in uporabimo validation set, ki smo ga uporabili cisto na zacektu
# povedati moramo tudi stevilo ponovitev urjenje, torej epochs
history = model.fit(
  train_ds,
  validation_data=val_ds,
  epochs=epochs
)

# zgrajen model moramo tudi shraniti, saj ga drugače ne moremo spet uporabiti in bi ga morali vedno znova graditi, ta proces pa traja
model.save("model7.hv5")