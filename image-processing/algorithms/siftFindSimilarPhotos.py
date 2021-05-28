import mysql.connector
import cv2
import _pickle as cPickle
import numpy as np

cnx = mysql.connector.connect(
    host="139.177.182.18",
    port=3306,
    user="node",
    password="Password1!",
    db="peDatabase")
mysqlQuery = cnx.cursor()


def readDescriptorsFromDatabase(imgId, mysqlQuery):
    mysqlQuery.execute("SELECT descriptorsFile FROM pePhotos WHERE idPhoto = %s", (imgId,))
    descriptorsFile = mysqlQuery.fetchone()
    descriptors = cPickle.loads(open("../images-descriptors/"+descriptorsFile[0],"rb").read())
    return descriptors

def readKeypointsFromDatabase(imgId, mysqlQuery):
    mysqlQuery.execute("SELECT keypointsFile FROM pePhotos WHERE idPhoto = %s", (imgId,))
    keypointsFile = mysqlQuery.fetchone()
    index = cPickle.loads(open("../images-keypoints/"+keypointsFile[0],"rb").read())
    keypoints =[]
    for point in index:
        temp = cv2.KeyPoint(x=point[0][0],y=point[0][1],_size=point[1], _angle=point[2], _response=point[3], _octave=point[4], _class_id=point[5]) 
        keypoints.append(temp)
    return keypoints


mysqlQuery.execute("SELECT * FROM peTags")
tags = []
for tag in mysqlQuery.fetchall():
    tags.append(tag)
   
#print(tags[0][0])
"""
for i in range(0, len(tags)):
    print(tags[i][1])
    mysqlQuery.execute("SELECT pePhotos.* FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[i][0],));
    tagImages = []
    for image in mysqlQuery.fetchall():
        tagImages.append(image)
    print(tagImages)
"""
mysqlQuery.execute("SELECT pePhotos.idPhoto, pePhotos.title, peTags.idTag FROM pePhotos JOIN pePhotoTags ON pePhotos.idPhoto = pePhotoTags.photoId JOIN peTags ON peTags.idTag = pePhotoTags.tagId WHERE peTags.idTag=%s", (tags[4][0],));

images = []
keypoints = []
descriptors = []
for image in mysqlQuery.fetchall():
    images.append(image)
    kp=readKeypointsFromDatabase(image[0], mysqlQuery)
    descp=readDescriptorsFromDatabase(image[0], mysqlQuery)
    keypoints.append(kp)
    descriptors.append(descp)
    print(image[0])


sift = cv2.SIFT_create()
img = cv2.imread("../../api/test-file/grouse-6231844_150.jpg")
imgKeypoints, imgDescriptors = sift.detectAndCompute(img, None)

index_params = dict(algorithm=0, trees=5)
search_params = dict()
flann = cv2.FlannBasedMatcher(index_params, search_params)
results = []
for i in range(0,len(descriptors)):
    matches = flann.knnMatch(descriptors[i], imgDescriptors,k=2)
    goodPoints = []
    for m, n in matches:
        if m.distance > 0.4*n.distance:
            goodPoints.append(m)
    numKeypoints = 0
    if len(keypoints[i]) >= len(imgKeypoints):
        numKeypoints = len(keypoints[i])
    else:
        numKeypoints = len(imgKeypoints)

    similarity = len(goodPoints) / numKeypoints * 100
    result = []
    result.append(images[i][1])
    result.append(similarity)
    results.append(result)

print(results)

cnx.close()

