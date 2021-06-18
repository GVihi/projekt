import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.preprocessing import image
import numpy as np
from imagePredictor import ImagePredictor

model = tf.keras.models.load_model("model6.hv5")
pred=ImagePredictor(model)
pred.predictImageClass('sea2.jpg')
pred.predictImageClass('city.jpg')
pred.predictImageClass('frog.jpg')
pred.predictImageClass('lion.jpg')
pred.predictImageClass('sunflower.jpg')
pred.predictImageClass('tulips.jpg')
