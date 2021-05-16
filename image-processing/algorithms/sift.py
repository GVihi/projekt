import numpy as np
import cv2 as cv
import sys
import json
import _pickle as cPickle


img = cv.imread(sys.argv[1])
gray= cv.cvtColor(img,cv.COLOR_BGR2GRAY)

sift = cv.SIFT_create()
kp, des = sift.detectAndCompute(gray,None)


index = []
for point in kp:
    temp = (point.pt, point.size, point.angle, point.response, point.octave, 
        point.class_id) 
    index.append(temp)

# Dump the keypoints
f = open("/home/projekt/image-processing/images-keypoints/keypoints.txt", "wb")
f.write(cPickle.dumps(index))
f.close()


print(kp)


# pridobimo pot slike kot parameter poti

# preberemo sliko

# izvedemo sift iskanje znacilnic

# naredimo json dump in shranimo v bazo kot json


