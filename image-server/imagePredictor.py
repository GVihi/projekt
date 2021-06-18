import os
import numpy as np
import os
import PIL
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

class ImagePredictor:
  def __init__(self, model):
    self.model = model
    self.model.summary()
    self.base_dir = './dataset'
    self.train_dir = os.path.join(self.base_dir, 'train-set')
    self.category=['city','daisy','dandelion','frog','lion','roses','sea','sunflowers','tulips']
    self.batch_size = 32
    self.img_height = 180
    self.img_width = 180

  def predictImageClass(self, imageName):
    img = keras.preprocessing.image.load_img(
    imageName, target_size=(self.img_height, self.img_width)
    )
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) 

    predictions = self.model.predict(img_array)
    score = tf.nn.softmax(predictions[0])
    result = []
    result.append(self.category[np.argmax(score)])
    result.append(100 * np.max(score))
    return result
    

