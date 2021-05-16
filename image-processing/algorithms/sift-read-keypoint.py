import cv2
import _pickle as cPickle

index = cPickle.loads(open("/home/projekt/image-processing/images-keypoints/keypoints.txt","rb").read())

kp = []

for point in index:
    temp = cv2.KeyPoint(x=point[0][0],y=point[0][1],_size=point[1], _angle=point[2], 
                            _response=point[3], _octave=point[4], _class_id=point[5]) 
    kp.append(temp)

print(kp)

